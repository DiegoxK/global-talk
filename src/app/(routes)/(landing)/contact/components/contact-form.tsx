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
import Required from "@/components/ui/required";
import Combobox from "@/components/ui/combobox";

type ContactType = z.infer<typeof contactSchema>;

const cities = [
  { label: "Bogotá", value: "Bogotá" },
  { label: "Medellín", value: "Medellín" },
  { label: "Cali", value: "Cali" },
  { label: "Barranquilla", value: "Barranquilla" },
  { label: "Cartagena", value: "Cartagena" },
  { label: "Cúcuta", value: "Cúcuta" },
  { label: "Bucaramanga", value: "Bucaramanga" },
  { label: "Pereira", value: "Pereira" },
  { label: "Santa Marta", value: "Santa Marta" },
  { label: "Manizales", value: "Manizales" },
  { label: "Neiva", value: "Neiva" },
  { label: "Valledupar", value: "Valledupar" },
  { label: "Sincelejo", value: "Sincelejo" },
  { label: "Tunja", value: "Tunja" },
  { label: "Armenia", value: "Armenia" },
  { label: "Popayán", value: "Popayán" },
  { label: "Riohacha", value: "Riohacha" },
  { label: "Villavicencio", value: "Villavicencio" },
  { label: "Quibdó", value: "Quibdó" },
  { label: "Ibagué", value: "Ibagué" },
  { label: "Montería", value: "Montería" },
  { label: "San Andrés", value: "San Andrés" },
  { label: "Leticia", value: "Leticia" },
  { label: "Pasto", value: "Pasto" },
  { label: "Yopal", value: "Yopal" },
  { label: "Tulúa", value: "Tulúa" },
  { label: "Turbaco", value: "Turbaco" },
  { label: "Barrancabermeja", value: "Barrancabermeja" },
];

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
                  Tu nombre completo <Required /> <FormMessage />
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
                  Tu celular <Required /> <FormMessage />
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
                Tu correo <Required /> <FormMessage />
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
            <FormItem className="flex flex-col">
              <FormLabel>
                Escoge tu Ciudad <Required /> <FormMessage />
              </FormLabel>
              <Combobox fieldName="ciudad" values={cities} field={field} />
            </FormItem>
          )}
        />
        {/* <FormField
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
        /> */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mensaje <Required /> <FormMessage />
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
