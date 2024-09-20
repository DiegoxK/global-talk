"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Required from "@/components/ui/required";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(50),
  lastName: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(50),
  email: z.string().email({
    message: "Campo requerido",
  }),
  phone: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .regex(/^\d+$/, {
      message: "El teléfono solo puede contener números",
    })
    .max(10, {
      message: "Formato de teléfono incorrecto",
    }),
  membershipType: z.string().min(1, {
    message: "Campo requerido",
  }),
});

export default function JoinForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      membershipType: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre <Required /> <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Jose" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Apellido <Required /> <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input placeholder="David" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Correo electronico <Required /> <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jose@globtm.com"
                    {...field}
                  />
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
                  Numero de telefono <Required /> <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="3120000000" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="membershipType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tipo de programa <Required /> <FormMessage />
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo de programa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principiantes">
                        Inglés para principiantes
                      </SelectItem>
                      <SelectItem value="a1">De A2 a B1</SelectItem>
                      <SelectItem value="b1">De B1 a B2</SelectItem>
                      <SelectItem value="exams">
                        Preparación para exámenes oficiales
                      </SelectItem>
                      <SelectItem value="enterprise">
                        Inglés para los negocios
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-2 w-full">
          Únete a nuestra academia!
        </Button>
      </form>
    </Form>
  );
}
