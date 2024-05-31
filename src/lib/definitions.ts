import { z } from "zod";

export type ContactType = z.infer<typeof contactSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "El nombre es requerido",
    })
    .max(50, {
      message: "El nombre debe tener menos de 50 caracteres",
    }),

  phone: z
    .string()
    .regex(/^\d+$/, {
      message: "El teléfono solo puede contener números",
    })
    .min(1, {
      message: "El teléfono es requerido",
    })
    .max(50, {
      message: "El teléfono debe tener menos de 50 caracteres",
    }),

  email: z.string().email({
    message: "El email no es válido",
  }),

  city: z
    .string()
    .min(1, {
      message: "La ciudad es requerida",
    })
    .max(50, {
      message: "La ciudad debe tener menos de 50 caracteres",
    }),

  message: z
    .string()
    .min(1, {
      message: "El mensaje es requerido",
    })
    .max(500, {
      message: "El mensaje debe tener menos de 500 caracteres",
    }),
});
