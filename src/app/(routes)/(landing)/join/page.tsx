import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "lucide-react";
import JoinForm from "./components/join-form";

const plans = [
  {
    name: "Principiantes",
    price: "$400.000",
    description: "Perfecto para iniciar!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
    ],
  },
  {
    name: "De A2 a B1",
    price: "$400.000",
    description: "Refuerza tus conocimientos!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
    ],
  },
  {
    name: "De B1 a B2",
    price: "$400.000",
    description: "Converza en inglés!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
    ],
  },
  {
    name: "Exámenes oficiales",
    price: "$400.000",
    description: "Preparate para tus exámenes!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
    ],
  },
  {
    name: "Inglés para los negocios",
    price: "$400.000",
    description: "Aprende inglés para tu negocio!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
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
            <Card key={index} className="flex flex-col pr-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">
                  {plan.name}
                </CardTitle>
                <CardDescription className="font-semibold">
                  {plan.price}/Mes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4 text-primary-600">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <Separator />
        <Card className="h-fit w-[500px]">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription className="pb-2">
              Completa el siguiente formulario para hacer parte de la academia!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JoinForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
