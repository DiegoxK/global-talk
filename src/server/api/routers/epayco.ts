import type { PaymentDetails } from "types/epayco";

import {
  createCardToken,
  createCustomer,
  createSession,
  createSubscription,
  generateInvoiceCode,
  getCustomerById,
  getSubscriptionById,
} from "@/lib/epayco";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { courses, groups, users } from "@/server/db/schema";
import { sendConfirmation } from "@/lib/email-config";
import { asc, desc, eq, is } from "drizzle-orm";

function getNextWeekTuesday(today: Date = new Date()): Date {
  const daysUntilNextTuesday = (9 - today.getDay()) % 7;
  const daysToAdd =
    daysUntilNextTuesday === 0 || daysUntilNextTuesday === 1
      ? daysUntilNextTuesday + 7
      : daysUntilNextTuesday;
  const nextTuesday = new Date(
    today.getTime() + daysToAdd * 24 * 60 * 60 * 1000,
  );
  nextTuesday.setHours(0, 0, 0, 0);
  return nextTuesday;
}

function areDatesInSameWeek(date1: Date, date2: Date): boolean {
  const startOfWeek = (date: Date): Date => {
    const clone = new Date(date);
    const dayOfWeek = clone.getUTCDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // ISO week starts on Monday
    clone.setUTCDate(clone.getUTCDate() - diff);
    return new Date(clone.setUTCHours(0, 0, 0, 0));
  };

  const weekStart1 = startOfWeek(date1);
  const weekStart2 = startOfWeek(date2);

  return weekStart1.getTime() === weekStart2.getTime();
}

export const epaycoRouter = createTRPCRouter({
  createSession: publicProcedure
    .input(
      z.object({
        nameBilling: z.string(),
        emailBilling: z.string(),
        addressBilling: z.string(),
        mobilephoneBilling: z.string(),
        numberDocBilling: z.string(),
        typeDocBilling: z.string(),
        name: z.string(),
        description: z.string(),
        amount: z.string(),
        currency: z.string(),
        test: z.string(),
        ip: z.string(),
        lang: z.string(),
        country: z.string(),
        confirmation: z.string(),
        response: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const paymentDetails: PaymentDetails = {
        nameBilling: input.nameBilling,
        emailBilling: input.emailBilling,
        addressBilling: input.addressBilling,
        mobilephoneBilling: input.mobilephoneBilling,
        numberDocBilling: input.numberDocBilling,
        typeDocBilling: input.typeDocBilling,
        name: input.name,
        description: input.description,
        amount: input.amount,
        currency: input.currency,
        test: input.test,
        ip: input.ip,
        lang: input.lang,
        country: input.country,
        confirmation: input.confirmation,
        response: input.response,
      };

      const sessionId = await createSession(paymentDetails);

      if (sessionId) {
        return sessionId;
      }
    }),

  createSubscription: publicProcedure
    .input(
      z.object({
        id_plan: z.string(),
        plan_value: z.string(),
        customerIp: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        city: z.string(),
        address: z.string(),
        cardNumber: z.string(),
        cardExpiryMonth: z.string(),
        cardExpiryYear: z.string(),
        cardCvc: z.string(),
        idType: z.string(),
        idNumber: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const credit_info = {
        cardNumber: input.cardNumber,
        cardExpYear: input.cardExpiryYear,
        cardExpMonth: input.cardExpiryMonth,
        cardCvc: input.cardCvc,
      };

      console.log("Creating card token...");
      const tokenCardId = await createCardToken(credit_info);

      if (!tokenCardId) {
        throw new Error("Error al crear el token de tarjeta");
      }

      // Artificial delay to prevent epayco api rate limit
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Creating customer...");
      const customerId = await createCustomer({
        docType: input.idType,
        docNumber: input.idNumber,
        name: input.firstName,
        lastName: input.lastName,
        email: input.email,
        address: input.address,
        cellPhone: input.phone,
        phone: input.phone,
        requireCardToken: true,
        cardTokenId: tokenCardId,
      });

      if (!customerId) {
        throw new Error("Error al crear el cliente");
      }
      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log("Creating subscription...");
      const subscriptionId = await createSubscription({
        id_plan: input.id_plan,
        customer: customerId,
        token_card: tokenCardId,
        doc_type: input.idType,
        doc_number: input.idNumber,
        extras_epayco: { extra1: "" },
        url_confirmation: "https://ejemplo.com/confirmacion",
        method_confirmation: "POST",
        ip: input.customerIp,
        // TODO: Change in production
        test: "TRUE",
      });

      if (!subscriptionId) {
        throw new Error("Error al crear el subscription");
      }

      console.log(subscriptionId);

      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log("Checking if user exists...");
      const userExist = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, input.email),
      });

      if (userExist) {
        throw new Error("User already exists");
      }

      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log("Checking if a group already exists...");

      const lastAddedGroup = await ctx.db.query.groups.findFirst({
        orderBy: desc(groups.id),
      });

      if (!lastAddedGroup) {
        console.log("No group found, creating one ...");

        await ctx.db.insert(groups).values({
          name: "Grupo semana #1",
          courseId: input.id_plan,
          creationDate: new Date().toISOString(),
          startingDate: getNextWeekTuesday().toISOString(),
          currentLevel: 0,
        });

        const currentLastAddedGroup = await ctx.db.query.groups.findFirst({
          orderBy: desc(groups.id),
        });

        if (currentLastAddedGroup) {
          console.log("Creating user...");

          await ctx.db.insert(users).values({
            name: input.firstName,
            lastName: input.lastName,
            email: input.email,
            groupId: currentLastAddedGroup.id,
            ip: input.customerIp,
            subscriptionId: subscriptionId,
            customerId: customerId,
            userType: "RECURRENT",
            current_level: 0,
          });
        }
      } else {
        console.log("Group found!, checking if it is in the same week ...");

        const today = new Date();

        const isInSameWeek = areDatesInSameWeek(
          new Date(lastAddedGroup.creationDate),
          today,
        );

        if (!isInSameWeek) {
          console.log("Group is not in the same week, creating a new one ...");

          const groupNumber = lastAddedGroup.name.split("#")[1];

          await ctx.db.insert(groups).values({
            name: `Grupo semana #${Number(groupNumber) + 1}`,
            courseId: input.id_plan,
            creationDate: new Date().toISOString(),
            startingDate: getNextWeekTuesday().toISOString(),
            currentLevel: 0,
          });

          const currentLastAddedGroup = await ctx.db.query.groups.findFirst({
            orderBy: desc(groups.id),
          });

          if (currentLastAddedGroup) {
            console.log("Creating user...");

            await ctx.db.insert(users).values({
              name: input.firstName,
              lastName: input.lastName,
              email: input.email,
              groupId: currentLastAddedGroup.id,
              ip: input.customerIp,
              subscriptionId: subscriptionId,
              customerId: customerId,
              userType: "RECURRENT",
              current_level: 0,
            });
          }
        } else {
          console.log("Group is in the same week, creating user ...");

          await ctx.db.insert(users).values({
            name: input.firstName,
            lastName: input.lastName,
            email: input.email,
            groupId: lastAddedGroup.id,
            ip: input.customerIp,
            subscriptionId: subscriptionId,
            customerId: customerId,
            userType: "RECURRENT",
            current_level: 0,
          });
        }
      }

      console.log("Sending confirmation email...");

      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const courseName = await ctx.db.query.courses.findFirst({
        where: eq(courses.id, input.id_plan),
        columns: {
          name: true,
        },
      });

      if (!courseName) throw new Error("Course not found");

      await sendConfirmation({
        courseName: courseName.name,
        courseValue: input.plan_value,
        sendTo: input.email,
      });

      console.log("Done!");
    }),

  test: publicProcedure.mutation(async ({ ctx }) => {
    // const lastAddedGroup = await ctx.db.query.groups.findFirst({
    //   orderBy: desc(groups.id),
    // });
    // const groupNumber = lastAddedGroup.name.split("#")[1];
    // await ctx.db.insert(groups).values({
    //   name: `Grupo semana #${Number(groupNumber) + 1}`,
    //   courseId: "beginners_a0",
    //   creationDate: new Date().toISOString(),
    //   startingDate: getNextWeekTuesday().toISOString(),
    //   currentLevel: 0,
    // });
    // console.log(lastAddedGroup);
  }),
});
