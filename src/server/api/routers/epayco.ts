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
        id_plan: z.string(),
        doc_type: z.string(),
        doc_number: z.string(),
        cardNumber: z.string(),
        cardExpiryMonth: z.string(),
        cardExpiryYear: z.string(),
        idType: z.string(),
        idNumber: z.string(),
        city: z.string(),
        address: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const paymentDetails: PaymentDetails = {
        name: "New Checkout",
        description: "Ingreso a la academia",
        currency: "cop",
        amount: "5000",
        country: "CO",
        test: "true",
        ip: "186.97.212.162",
        invoice: generateInvoiceCode(),
      };
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

      // Artificial delay
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
