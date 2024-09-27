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
import { users } from "@/server/db/schema";
import { sendConfirmation } from "@/lib/email-config";

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

      console.log("Creating user...");
      await ctx.db.insert(users).values({
        name: input.firstName,
        lastName: input.lastName,
        email: input.email,
        courseId: input.id_plan,
        ip: input.customerIp,
        subscriptionId: subscriptionId,
        customerId: customerId,
        userType: "RECURRENT",
      });

      console.log("Sending confirmation email...");

      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await sendConfirmation({
        courseName: "De A2 a B1",
        courseValue: "400000",
        sendTo: input.email,
      });

      console.log("Done!");
    }),
});
