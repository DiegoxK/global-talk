"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";

type ContactType = z.infer<typeof contactSchema>;

const contactSchema = z.object({
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

export default function ContactForm() {
  const { toast } = useToast();

  const form = useForm<ContactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      phone: "",
      message: "",
    },
  });

  const { mutate: sendContactEmail } = api.email.sendContactEmail.useMutation({
    onSuccess: () => {
      toast({
        title: "¡Gracias!",
        description:
          "Gracias por contactarnos, te responderemos pronto al correo o numero suministrados.",
        duration: 4000,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "¡Error!",
        description: error.message,
        duration: 4000,
      });
    },
  });

  const onSubmit = (values: ContactType) => {
    toast({
      title: "Enviando mensaje",
      description: "Por favor espera un momento",
      duration: 10000000,
    });

    sendContactEmail(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 pb-8 pt-6 lg:px-4"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tu nombre completo{" "}
                  <span className="text-primary">
                    <span className="text-primary">*</span>
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Juan Pérez" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tu celular <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="321000000" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tu correo <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="alfonso@globtm.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Escoge tu Ciudad <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Medellín" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mensaje <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Tu mensaje" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 rounded-md">
          ¡Enviar Mensaje!
        </Button>
      </form>
    </Form>
  );
}
