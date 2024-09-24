"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  CreditCard,
  User,
  MapPin,
  Phone,
  ChevronsUpDown,
  Check,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import Required from "@/components/ui/required";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

export const documentTypes = [
  { value: "NIT", label: "Número de identificación tributaria" },
  { value: "CC", label: "Cedula de ciudadanía" },
  { value: "CE", label: "Cedula de extranjería" },
  { value: "TI", label: "Tarjeta de identidad" },
  { value: "PPN", label: "Pasaporte" },
  { value: "SSN", label: "Número de seguridad social" },
  { value: "LIC", label: "Licencia de conducción" },
  { value: "DNI", label: "Documento nacional de identificación" },
];

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(25),
  lastName: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(25),
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
    }),
  membershipType: z.string().min(1, {
    message: "Campo requerido",
  }),
  cardNumber: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .regex(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      {
        message: "El número de tarjeta no es válido",
      },
    ),
  cardExpiryMonth: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .regex(/^[0-9]{1,2}$/, {
      message: "El mes de expiración no es válido",
    }),
  cardExpiryYear: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .regex(/^[0-9]{4}$/, {
      message: "El año de expiración no es válido",
    }),
  cardCvc: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .regex(/^[0-9]{3}$/, {
      message: "El CVC no es válido",
    }),
  idType: z.string().min(1, {
    message: "Campo requerido",
  }),
  idNumber: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .regex(/^\d+$/, {
      message: "El numero de documento solo puede contener números",
    }),
  city: z.string().min(1, {
    message: "Campo requerido",
  }),
  address: z.string().min(1, {
    message: "Campo requerido",
  }),
});

export default function Recurrent() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      membershipType: "",
      cardNumber: "",
      cardExpiryMonth: "",
      cardExpiryYear: "",
      cardCvc: "",
      idType: "",
      idNumber: "",
      city: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto border-t py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Checkout - Pago recurrente</CardTitle>
          <CardDescription>
            Programa Beginners A0 – 2 niveles (4 meses)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Detalles del Plan</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Matrícula individual: 300.000 pesos / mes
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>16 clases de una hora (4 por semana)</li>
                <li>Acceso a la plataforma de aprendizaje</li>
                <li>Grabaciones de las clases</li>
                <li>Todos los materiales</li>
                <li>Evaluación al final del nivel</li>
                <li>1 cupo en un grupo de máximo 5 personas</li>
              </ul>
              <p className="mt-2 text-sm font-semibold text-primary">
                Este plan es recurrente y se cobrará 300.000 pesos mensualmente
                durante el transcurso del programa (4 meses).
              </p>
            </div>
            <Separator />
            <h3 className="text-lg font-semibold">Información de Pago</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Número de Tarjeta <Required /> <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cardExpiryMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Mes de expiración <Required /> <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="12" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardExpiryYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Año de expiración <Required /> <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="2023"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="cardCvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          CVC <Required /> <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Separator />
                <h3 className="text-lg font-semibold">Información de Pago</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
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
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="idType"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Tipo de documento <Required /> <FormMessage />
                        </FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? documentTypes.find(
                                      (document) =>
                                        document.value === field.value,
                                    )?.label
                                  : "Seleccionar documento"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Buscar documento..." />
                              <CommandList>
                                <CommandEmpty>
                                  No se encontro ningún documento.
                                </CommandEmpty>
                                <CommandGroup>
                                  {documentTypes.map((document) => (
                                    <CommandItem
                                      value={document.label}
                                      key={document.value}
                                      onSelect={() => {
                                        setOpen(false);
                                        form.setValue("idType", document.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          document.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {document.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full" type="submit">
                  Confirmar suscripción
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
