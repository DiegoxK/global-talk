import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    href: "/join/beginners_a0",
    name: "Beginners A0",
    description: "Perfecto para iniciar!",
    features: [
      "Plataforma en línea",
      "Clases en grupo",
      "Materiales de estudio",
      "Seguimiento de progreso",
      "64 clases de inglés durante 4 meses en el desarrollo de 2 niveles",
    ],
  },
  {
    href: "/join/a1",
    name: "Pure A1 ",
    description: "Refuerza tus conocimientos!",
    features: [
      "Plataforma en línea",
      "Clases en grupo",
      "Materiales de estudio",
      "Seguimiento de progreso",
      "64 clases de inglés durante 4 meses en el desarrollo de 2 niveles",
    ],
  },
  {
    href: "/join/beginers",
    name: "Plan Beginners + Pure A1 ",
    description: "Comprende el inglés!",
    features: [
      "Plataforma en línea",
      "Clases en grupo",
      "Materiales de estudio",
      "Seguimiento de progreso",
      "124 clases de inglés durante 8 meses en el desarrollo de 4 niveles",
    ],
  },
  {
    href: "/join/a2",
    name: "From A2 to B1",
    description: "Conversa en inglés!",
    features: [
      "Plataforma en línea",
      "Clases en grupo",
      "Materiales de estudio",
      "Seguimiento de progreso",
      "128 clases de inglés durante 8 meses en el desarrollo de 2 niveles",
    ],
  },
  {
    href: "/join/b1",
    name: "From B1 to B2",
    description: "Refuerza a nivel profesional!",
    features: [
      "Plataforma en línea",
      "Clases en grupo",
      "Materiales de estudio",
      "Seguimiento de progreso",
      "128 clases de inglés durante 10 meses en el desarrollo de 2 niveles",
    ],
  },
  {
    href: "/join/business",
    name: "Business English",
    description: "Inglés para tu negocio!",
    features: [
      "Plataforma en línea",
      "Clases en grupo",
      "Materiales de estudio",
      "Seguimiento de progreso",
      "160 clases de inglés durante 10 meses en el desarrollo de 5 niveles",
    ],
  },
];

export default function JoinPage() {
  return (
    <>
      <div className="join-background relative">
        <div className="absolute h-full w-full bg-primary-700 opacity-50" />
        <div className="text- relative py-56 text-center text-4xl font-bold text-white shadow-sm drop-shadow-2xl"></div>
      </div>
      <div className="container mx-auto flex flex-col items-center gap-12 py-16">
        <h1 className="text-4xl font-bold text-primary">
          Elige tu plan de inglés
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className="flex w-[322px] flex-col p-0 pt-6">
              <div className="pl-6 pr-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">
                    {plan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4 text-primary-600">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex">
                        <CheckIcon
                          size={16}
                          className="mr-2 h-4 min-h-4 w-4 min-w-4 text-primary"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <Link href={plan.href}>
                <Button className="mt-6 w-full rounded-t-none text-lg">
                  Unete!
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
