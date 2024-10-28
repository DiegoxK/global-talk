import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { and, asc, count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { env } from "@/env";
import { createTransport } from "nodemailer";

export const emailRouter = createTRPCRouter({
  sendContactEmail: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        city: z.string(),
        phone: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const transport = createTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: true,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      });

      const mailOptions = {
        // TODO: Change to actual domain
        from: `contact-form@resultadospublicitariosmedellin.com`,
        to: `contacto@resultadospublicitariosmedellin.com`,
        subject: `Mensaje de ${input.name}`,
        text: `
  Nombre: ${input.name}
  Teléfono: ${input.phone}
  Email: ${input.email}
  
  ${input.message}
      `,
        html: `
  <b>Nombre:</b> ${input.name} <br>
  <b>Teléfono:</b> ${input.phone} <br>
  <b>Email:</b> ${input.email} <br>
  <br>
  ${input.message}
      `,
      };

      try {
        const transportResponse = await transport.sendMail(mailOptions);
        console.log(transportResponse);
        return "Mensaje enviado correctamente";
      } catch (error) {
        console.log(error);
        throw new Error("Error al enviar el correo");
      }
    }),
});
