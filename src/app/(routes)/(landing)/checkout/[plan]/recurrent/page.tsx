"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ChevronsUpDown, Check } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
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

import { Separator } from "@/components/ui/separator";

import Required from "@/components/ui/required";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn, formatDate, getUserIP } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { api } from "@/trpc/react";
import Link from "next/link";

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

const documentTypes = [
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
  plan: z.string().min(1, {
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

export default function Recurrent({ params }: { params: { plan: string } }) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: createSubscription } =
    api.epayco.createSubscription.useMutation({
      onSuccess: () => {
        setIsLoading(false);
      },
    });

  const { mutate: test } = api.epayco.test.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: params.plan,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setModalOpen(true);

    const ip = await getUserIP();

    if (!ip) {
      throw new Error("Error al obtener valor requerido: ipAddress");
    }

    createSubscription({
      id_plan: params.plan,
      plan_value: "100000",
      customerIp: ip,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      city: values.city,
      address: values.address,
      cardNumber: values.cardNumber,
      cardExpiryMonth: values.cardExpiryMonth,
      cardExpiryYear: values.cardExpiryYear,
      cardCvc: values.cardCvc,
      idType: values.idType,
      idNumber: values.idNumber,
    });
  }

  return (
    <div className="container mx-auto border-t py-10">
      <Button onClick={() => test()}>Test</Button>

      {getNextWeekTuesday(new Date(2024, 8, 29)).toLocaleDateString()}
      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogContent
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
        >
          {isLoading ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Procesando...</AlertDialogTitle>
                <AlertDialogDescription>
                  Por favor espera un momento mientras se procesa la
                  suscripción.
                </AlertDialogDescription>
                <div className="loader-the-progress"></div>
              </AlertDialogHeader>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">
                  ¡Gracias por suscribirte a la mejor academia de inglés!
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Tu cuenta de global talk ha sido creada correctamente.
                </AlertDialogDescription>
                <div className="mt-2 text-center">
                  Ten en cuenta que las clases y el primer cobro daran inicio
                  el: <br /> <br />
                  <span className="text-2xl font-bold text-primary">
                    🎉{" "}
                    {formatDate(
                      getNextWeekTuesday().toISOString().slice(0, 10),
                    )}{" "}
                    🎉
                  </span>
                  <br /> <br />
                  <span className="font-semibold">
                    Te enviaremos un correo con las instrucciones para ingresar
                    a tu cuenta!
                  </span>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Link className="w-full" href="/academy">
                  <Button className="w-full">Continuar</Button>
                </Link>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
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
            <h3 className="text-lg font-semibold">Información de pago</h3>
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
                <div className="grid grid-cols-3 gap-4">
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
                          <Input type="number" placeholder="2023" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

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
                <h3 className="text-lg font-semibold">
                  Información de facturacion
                </h3>
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
                      <FormItem className="flex flex-col gap-2">
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
                                  "justify-between py-5",
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
                                        field.onChange(document.value);
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
                  <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Número de documento <Required /> <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="123456789" {...field} />
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
                        Correo electronico <Required /> <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="ejemplo@globtm.com"
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
                        Número de telefono <Required /> <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="3120000000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ciudad <Required /> <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Medellín" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Dirección <Required /> <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Calle X Nro Y" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  disabled={!form.formState.isDirty}
                  type="submit"
                  className="w-full"
                >
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
