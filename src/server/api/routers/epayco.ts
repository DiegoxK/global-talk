import type { PaymentDetails } from "types/epayco";

import { createSession, generateInvoiceCode } from "@/lib/epayco";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { programs, groups, transactions, users } from "@/server/db/schema";
import { sendConfirmation } from "@/lib/email-config";
import { desc, eq } from "drizzle-orm";

type PlanType = "LEVEL" | "COMPLETE" | "EXTERNAL";

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

// function validateTransaction(refPayco: string) {

// }

export const epaycoRouter = createTRPCRouter({
  createSession: publicProcedure
    .input(
      z.object({
        plan: z.string(),
        planType: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        nameBilling: z.string(),
        emailBilling: z.string(),
        addressBilling: z.string(),
        mobilephoneBilling: z.string(),
        numberDocBilling: z.string(),
        city: z.string(),
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
        transactionType: z.string(),
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

      const createUser = async (groupId: number) => {
        const invoice = generateInvoiceCode();
        console.log("Creando usuario ...");

        const user = await ctx.db
          .insert(users)
          .values({
            planType: input.planType as PlanType,
            groupId,
            name: input.first_name,
            lastName: input.last_name,
            phone: input.mobilephoneBilling,
            programId: input.plan,
            email: input.emailBilling,
            city: input.city,
          })
          .returning();

        if (!user?.[0]?.id) throw new Error("Error al obtener el usuario");

        console.log("Creando transaccion ...");

        const transaction = await ctx.db
          .insert(transactions)
          .values({
            userId: user[0].id,
            description: input.description,
            amount: input.amount,
            receipt: invoice,
            date: new Date().toISOString(),
            status: "PENDING",
          })
          .returning();

        const transactionId = transaction[0]?.id;

        if (!transactionId) {
          throw new Error("Error al crear la transacción");
        }

        const programName = await ctx.db.query.programs.findFirst({
          where: eq(programs.id, input.plan),
          columns: {
            name: true,
          },
        });

        if (!programName?.name) throw new Error("Program not found");

        console.log("Creando ePayco session...");
        const sessionId = await createSession({
          ...paymentDetails,
          extra1: programName.name,
          extra2: input.planType,
          extra3: input.mobilephoneBilling,
          extra4: input.emailBilling,
          extra5: transactionId,
          invoice,
        });

        if (!sessionId) {
          throw new Error(
            "Error al crear la session de pago, Intenta de nuevo",
          );
        }
        return sessionId;
      };

      // ========================================================
      const editUser = async (groupId: number, email: string) => {
        const invoice = generateInvoiceCode();
        console.log("Editanto usuario existente ...");

        const user = await ctx.db
          .update(users)
          .set({
            planType: input.planType as PlanType,
            groupId,
            name: input.first_name,
            lastName: input.last_name,
            phone: input.mobilephoneBilling,
            programId: input.plan,
            email: input.emailBilling,
            city: input.city,
          })
          .where(eq(users.email, email))
          .returning();

        console.log("Creando transaccion ...");

        if (!user?.[0]?.id) throw new Error("Error al obtener el usuario");

        const transaction = await ctx.db
          .insert(transactions)
          .values({
            userId: user[0].id,
            description: input.description,
            amount: input.amount,
            receipt: invoice,
            date: new Date().toISOString(),
            status: "PENDING",
          })
          .returning();

        const transactionId = transaction[0]?.id;

        if (!transactionId) {
          throw new Error("Error al crear la transacción");
        }

        const programName = await ctx.db.query.programs.findFirst({
          where: eq(programs.id, input.plan),
          columns: {
            name: true,
          },
        });

        if (!programName?.name) throw new Error("Program not found");

        console.log("Creando ePayco session...");
        const sessionId = await createSession({
          ...paymentDetails,
          extra1: programName.name,
          extra2: input.planType,
          extra3: input.mobilephoneBilling,
          extra4: input.emailBilling,
          extra5: transactionId,
          invoice,
        });

        if (!sessionId) {
          throw new Error(
            "Error al crear la session de pago, Intenta de nuevo",
          );
        }
        return sessionId;
      };

      // ========================================================

      console.log("Verificando si el usuario ya existe...");

      const userExist = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, input.emailBilling),
      });

      if (userExist?.email === input.emailBilling) {
        console.log(
          "Usuario existente, Se reemplazara con la nueva informacion de facturacion",
        );
      }

      console.log("Verificando grupos...");

      const lastAddedGroup = await ctx.db.query.groups.findFirst({
        orderBy: desc(groups.id),
      });

      if (!lastAddedGroup) {
        console.log("No se encontro el grupo, creando uno nuevo ...");

        const currentLastAddedGroup = await ctx.db
          .insert(groups)
          .values({
            name: "Grupo semana #1",
            creationDate: new Date().toISOString(),
            startingDate: getNextWeekTuesday().toISOString(),
            currentLevel: 0,
          })
          .returning();

        if (currentLastAddedGroup?.[0]?.id) {
          if (userExist) {
            return await editUser(
              currentLastAddedGroup[0].id,
              input.emailBilling,
            );
          }

          return await createUser(currentLastAddedGroup[0].id);
        }
      } else {
        console.log(
          "Grupo encontrado, verificando si está en la misma semana ...",
        );

        const today = new Date();

        const isInSameWeek = areDatesInSameWeek(
          new Date(lastAddedGroup.creationDate),
          today,
        );

        if (!isInSameWeek) {
          console.log(
            "Grupo no está en la misma semana, creando uno nuevo ...",
          );

          const groupNumber = lastAddedGroup.name.split("#")[1];

          const currentLastAddedGroup = await ctx.db
            .insert(groups)
            .values({
              name: `Grupo semana #${Number(groupNumber) + 1}`,
              creationDate: new Date().toISOString(),
              startingDate: getNextWeekTuesday().toISOString(),
              currentLevel: 0,
            })
            .returning();

          if (currentLastAddedGroup?.[0]?.id) {
            if (userExist) {
              return await editUser(
                currentLastAddedGroup[0].id,
                input.emailBilling,
              );
            }
            return await createUser(currentLastAddedGroup[0].id);
          }
        } else {
          if (userExist) {
            console.log(
              "El grupo ya está en la misma semana, actualizando el grupo del usuario ...",
            );
            return await editUser(lastAddedGroup.id, input.emailBilling);
          }
          console.log(
            "El grupo ya está en la misma semana, creando usuario ...",
          );
          return await createUser(lastAddedGroup.id);
        }
      }
    }),

  // createSubscription: publicProcedure
  //   .input(
  //     z.object({
  //       id_plan: z.string(),
  //       description: z.string(),
  //       plan_value: z.string(),
  //       customerIp: z.string(),
  //       firstName: z.string(),
  //       lastName: z.string(),
  //       email: z.string(),
  //       phone: z.string(),
  //       city: z.string(),
  //       address: z.string(),
  //       cardNumber: z.string(),
  //       cardExpiryMonth: z.string(),
  //       cardExpiryYear: z.string(),
  //       cardCvc: z.string(),
  //       idType: z.string(),
  //       idNumber: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     const createUser = async (groupId: number) => {
  //       const invoice = generateInvoiceCode();

  //       console.log("Creando card token...");

  //       const credit_info = {
  //         cardNumber: input.cardNumber,
  //         cardExpYear: input.cardExpiryYear,
  //         cardExpMonth: input.cardExpiryMonth,
  //         cardCvc: input.cardCvc,
  //       };

  //       const tokenCardId = await createCardToken(credit_info);

  //       if (!tokenCardId) {
  //         throw new Error("Error al crear el token de tarjeta");
  //       }

  //       // Artificial delay to prevent epayco api rate limit
  //       await new Promise((resolve) => setTimeout(resolve, 3000));

  //       console.log("Creando ePayco customer...");
  //       const customerId = await createCustomer({
  //         docType: input.idType,
  //         docNumber: input.idNumber,
  //         name: input.firstName,
  //         lastName: input.lastName,
  //         email: input.email,
  //         address: input.address,
  //         cellPhone: input.phone,
  //         phone: input.phone,
  //         requireCardToken: true,
  //         cardTokenId: tokenCardId,
  //       });

  //       if (!customerId) {
  //         throw new Error("Error al crear el cliente");
  //       }
  //       // Artificial delay
  //       await new Promise((resolve) => setTimeout(resolve, 3000));

  //       console.log("Creating subscription...");
  //       const subscriptionId = await createSubscription({
  //         id_plan: input.id_plan,
  //         customer: customerId,
  //         token_card: tokenCardId,
  //         doc_type: input.idType,
  //         doc_number: input.idNumber,
  //         extras_epayco: { extra1: invoice },
  //         // TODO: Change in production
  //         test: "TRUE",
  //         url_confirmation:
  //           "https://globtm.vercel.app/api/checkout/confirmacion",
  //         method_confirmation: "POST",
  //         ip: input.customerIp,
  //       });

  //       if (!subscriptionId) {
  //         throw new Error("Error al crear el subscription");
  //       }

  //       console.log("Creando usuario ...");

  //       const user = await ctx.db
  //         .insert(users)
  //         .values({
  //           ip: input.customerIp,
  //           subscriptionId: subscriptionId,
  //           planType: "RECURRENT",
  //           groupId,
  //           customerId: customerId,
  //           name: input.firstName,
  //           lastName: input.lastName,
  //           phone: input.phone,
  //           programId: input.id_plan,
  //           email: input.email,
  //           city: input.city,
  //         })
  //         .returning();

  //       if (!user?.[0]?.id) throw new Error("Error al obtener el usuario");

  //       console.log("Creando transaccion ...");

  //       const transaction = await ctx.db
  //         .insert(transactions)
  //         .values({
  //           userId: user[0].id,
  //           description: input.description,
  //           amount: input.plan_value,
  //           receipt: invoice,
  //           date: new Date().toISOString(),
  //           status: "PENDING",
  //         })
  //         .returning();

  //       const transactionId = transaction[0]?.id;

  //       if (!transactionId) {
  //         throw new Error("Error al crear la transacción");
  //       }
  //     };

  //     // =============================================================

  //     console.log("Verificando si el usuario ya existe...");

  //     const userExist = await ctx.db.query.users.findFirst({
  //       where: (table, funcs) => funcs.eq(table.email, input.email),
  //     });

  //     if (userExist) {
  //       throw new Error("El usuario ya existe");
  //     }

  //     console.log("Verificando si el grupo existe...");

  //     const lastAddedGroup = await ctx.db.query.groups.findFirst({
  //       orderBy: desc(groups.id),
  //     });

  //     if (!lastAddedGroup) {
  //       console.log("No se encontro el grupo, creando uno nuevo ...");

  //       const currentLastAddedGroup = await ctx.db
  //         .insert(groups)
  //         .values({
  //           name: "Grupo semana #1",
  //           creationDate: new Date().toISOString(),
  //           startingDate: getNextWeekTuesday().toISOString(),
  //           currentLevel: 0,
  //         })
  //         .returning();

  //       if (currentLastAddedGroup?.[0]?.id) {
  //         await createUser(currentLastAddedGroup[0].id);
  //       }
  //     } else {
  //       console.log(
  //         "Grupo encontrado, verificando si está en la misma semana ...",
  //       );

  //       const today = new Date();

  //       const isInSameWeek = areDatesInSameWeek(
  //         new Date(lastAddedGroup.creationDate),
  //         today,
  //       );

  //       if (!isInSameWeek) {
  //         console.log(
  //           "Grupo no está en la misma semana, creando uno nuevo ...",
  //         );

  //         const groupNumber = lastAddedGroup.name.split("#")[1];

  //         const currentLastAddedGroup = await ctx.db
  //           .insert(groups)
  //           .values({
  //             name: `Grupo semana #${Number(groupNumber) + 1}`,
  //             creationDate: new Date().toISOString(),
  //             startingDate: getNextWeekTuesday().toISOString(),
  //             currentLevel: 0,
  //           })
  //           .returning();

  //         if (currentLastAddedGroup?.[0]?.id) {
  //           await createUser(currentLastAddedGroup[0].id);
  //         }
  //       } else {
  //         console.log(
  //           "El grupo ya está en la misma semana, creando usuario ...",
  //         );

  //         await createUser(lastAddedGroup.id);
  //       }
  //     }

  //     console.log("Enviando email de confirmación...");

  //     // Artificial delay
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     const programName = await ctx.db.query.programs.findFirst({
  //       where: eq(programs.id, input.id_plan),
  //       columns: {
  //         name: true,
  //       },
  //     });

  //     if (!programName) throw new Error("Program not found");

  //     await sendConfirmation({
  //       programName: programName.name,
  //       programValue: input.plan_value,
  //       sendTo: input.email,
  //     });

  //     console.log("Done!");
  //   }),
});
