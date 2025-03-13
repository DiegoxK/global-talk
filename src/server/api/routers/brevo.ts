// src/server/api/routers/brevo.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { subscribers } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const brevoRouter = createTRPCRouter({
  // Obtener todos los suscriptores desde la tabla `subscribers`
  getSubscribers: publicProcedure.query(async () => {
    const result = await db.select().from(subscribers);
    return result;
  }),

  // Suscribir un nuevo correo y guardarlo en la tabla `subscribers`
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      // Verificar si el correo ya está registrado
      const existingSubscriber = await db
        .select()
        .from(subscribers)
        .where(eq(subscribers.email, email));

      if (existingSubscriber.length > 0) {
        throw new Error("Este correo ya está suscrito.");
      }

      // Insertar el nuevo suscriptor en la tabla
      const newSubscriber = await db
        .insert(subscribers)
        .values({
          email,
        })
        .returning(); // Retorna el registro insertado

      // Agregar el suscriptor a Brevo
      const apiKey = process.env.BREVO_API_KEY;

      if (!apiKey) {
        throw new Error("API Key de Brevo no configurada");
      }

      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          listIds: [2], // ID de la lista en Brevo donde se agregará el suscriptor
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error al agregar el suscriptor a Brevo: ${response.statusText}`,
        );
      }

      return newSubscriber;
    }),

  // Enviar un correo usando Brevo
  sendEmail: publicProcedure
    .input(
      z.object({
        to: z.string().email(),
        subject: z.string(),
        htmlContent: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const apiKey = process.env.BREVO_API_KEY;

      if (!apiKey) {
        throw new Error("API Key de Brevo no configurada");
      }

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            email: "contacto@academiaglobtm.com",
            name: "Academia Global talk medallo",
          },
          to: [{ email: input.to }],
          subject: input.subject,
          htmlContent: input.htmlContent,
        }),
      });

      // TODO: Agregar tipado a la respuesta de Brevo
      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const errorData = await response.json();
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Error al enviar el correo: ${errorData.message || response.statusText}`,
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    }),

  // Eliminar un suscriptor por su ID
  deleteSubscriber: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      try {
        // Eliminar el suscriptor de la tabla
        await db.delete(subscribers).where(eq(subscribers.id, id));
        return { success: true };
      } catch (error) {
        console.error("Error al eliminar el suscriptor:", error);
        throw new Error(
          "Hubo un error al eliminar el suscriptor. Por favor, inténtalo de nuevo.",
        );
      }
    }),
});
