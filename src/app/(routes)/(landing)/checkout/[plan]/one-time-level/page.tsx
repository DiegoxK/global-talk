"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import MastercardLogo from "../../../../../../../public/payco/mastercard.png";
import AmericanLogo from "../../../../../../../public/payco/american.png";
import DaviplataLogo from "../../../../../../../public/payco/daviplata.png";
import NequiLogo from "../../../../../../../public/payco/nequi.png";

import VisaLogo from "../../../../../../../public/payco/visa.png";

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

import { cn, formatToCOP, getUserIP } from "@/lib/utils";
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
import Image from "next/image";

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

export default function Level({ params }: { params: { plan: string } }) {
  const plan = params.plan as keyof Pricing;

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
      const ip = await getUserIP();

      if (!ip) {
        throw new Error("Error al obtener valor requerido: ipAddress");
      }

      const paymentDetails = {
        plan,
        planType: "LEVEL",
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
        description: siteConfig.pricing[plan].description.level,
        amount: siteConfig.pricing[plan].price.level,
        currency: "cop",
        ip,
        lang: "es",
        country: "co",
        transactionType: "LEVEL",
        confirmation: `https://www.academiaglobtm.com/api/checkout/confirmation`,
        response: "https://www.academiaglobtm.com/response",
        test: "false",
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
                    Por favor espera un momento mientras se procesa el pago.
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
            <CardTitle>Checkout - Pago de nivel</CardTitle>
            <CardDescription>
              {siteConfig.pricing[plan].description.level}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Detalles del Plan</h3>
                <p className="mt-1 text-sm">
                  Matrícula individual:{" "}
                  <strong>
                    {formatToCOP(siteConfig.pricing[plan].price.level)}
                  </strong>{" "}
                  nivel
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  {siteConfig.pricing[plan].features.level.map(
                    (feature, index) => (
                      <li key={index}>{feature}</li>
                    ),
                  )}
                </ul>
                {siteConfig.pricing[plan].extra?.level && (
                  <p className="mt-2 text-sm font-semibold text-primary">
                    {siteConfig.pricing[plan].extra?.level}
                  </p>
                )}
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
                  <div className="grid gap-4 md:grid-cols-2">
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
                  <div className="grid gap-4 md:grid-cols-2">
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
                  <div className="grid items-center gap-4 md:grid-cols-2">
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
                    Confirmar datos
                  </Button>
                  <Separator />
                  <div className="mt-4 flex flex-wrap justify-center gap-4">
                    <Image
                      src={AmericanLogo}
                      alt="American Express"
                      width={125}
                      height={80}
                    />
                    <Image
                      src={MastercardLogo}
                      alt="Mastercard"
                      width={120}
                      height={120}
                    />
                    <Image
                      src={DaviplataLogo}
                      alt="Daviplata"
                      width={150}
                      height={120}
                    />
                    <Image
                      src={NequiLogo}
                      alt="Nequi"
                      width={190}
                      height={120}
                    />
                    <Image src={VisaLogo} alt="Visa" width={100} height={120} />
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
