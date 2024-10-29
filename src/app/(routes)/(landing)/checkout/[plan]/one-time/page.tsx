"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ChevronsUpDown, Check } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
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

import { cn, getUserIP } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { api, getBaseUrl } from "@/trpc/react";
import Script from "next/script";
import { type Pricing, siteConfig } from "@/config";
import Combobox from "@/components/ui/combobox";

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

  const { mutate: createSession } = api.epayco.createSession.useMutation({
    onSuccess: (sessionId) => {
      setIsLoading(false);

      if (sessionId) {
        setTimeout(() => {
          openCheckout(sessionId);
        }, 5000);
      }
    },
  });

  const openCheckout = (sessionId: string) => {
    const checkout = window.ePayco.checkout;

    const handler = checkout.configure({
      sessionId,
      external: true,
    });

    handler.openNew();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      idType: "",
      idNumber: "",
      city: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setModalOpen(true);
    setIsLoading(true);

    if (typeof window !== "undefined" && window.ePayco) {
      const plan = params.plan as keyof Pricing;

      const ip = await getUserIP();

      if (!ip) {
        throw new Error("Error al obtener valor requerido: ipAddress");
      }

      const paymentDetails = {
        plan,
        planType: "COMPLETE",
        first_name: values.firstName,
        last_name: values.lastName,
        nameBilling: values.firstName + " " + values.lastName,
        emailBilling: values.email,
        addressBilling: values.address,
        mobilephoneBilling: values.phone,
        numberDocBilling: values.idNumber,
        city: values.city,
        typeDocBilling: values.idType,
        name: siteConfig.pricing[plan].name,
        description: siteConfig.pricing[plan].description,
        amount: siteConfig.pricing[plan].price,
        currency: "cop",
        ip,
        lang: "es",
        country: "co",
        transactionType: "COMPLETE",
        // TODO: Change in production to the base url
        confirmation: `https://globtm.vercel.app/api/checkout/confirmation`,
        response: "https://globtm.vercel.app/response",
        test: "true",
      };

      createSession(paymentDetails);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.epayco.co/checkout.js"
        onLoad={() => {
          console.log("ePayco loaded");
        }}
      />
      <div className="container mx-auto border-t py-10">
        <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
          <AlertDialogContent
            onEscapeKeyDown={(event) => {
              event.preventDefault();
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
                    Tu solicitud ha sido enviada correctamente.
                  </AlertDialogDescription>
                  <div className="mt-2 text-center">
                    Seras redirigido a la plataforma de pago en breve.
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  {/* <AlertDialogAction className="w-full">
                    Continuar
                  </AlertDialogAction> */}
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
                  Este plan es recurrente y se cobrará 300.000 pesos
                  mensualmente durante el transcurso del programa (4 meses).
                </p>
              </div>
              <Separator />

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
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
                          <Input
                            type="tel"
                            placeholder="3120000000"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>
                            Ciudad <Required /> <FormMessage />
                          </FormLabel>
                          <Combobox
                            fieldName="ciudad"
                            values={cities}
                            field={field}
                          />
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
    </>
  );
}
