import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page({ params }: { params: { plan: string } }) {
  console.log(params.plan);

  const individual = [
    {
      href: `/checkout/${params.plan}/recurrent`,
      title: "Pago recurrente",
      description: "Matrícula individual",
      price: "300 mil COP / mes",
      duration: "1 mes",
      features: [
        "16 clases de una hora (4 por semana)",
        "Acceso a la plataforma de aprendizaje",
        "Grabaciones de las clases",
        "Todos los materiales",
        "Evaluación al final del nivel",
        "1 cupo en un grupo de máximo 5 personas",
      ],
      savings: "",
    },
    {
      href: `/checkout/${params.plan}/one-time-level`,
      title: "Pago único por nivel",
      description: "Matrícula individual",
      price: "530 mil COP / nivel",
      duration: "2 meses",
      features: [
        "32 clases de una hora (4 por semana)",
        "Acceso a la plataforma de aprendizaje",
        "Grabaciones de las clases",
        "Todos los materiales",
        "Evaluación al final del nivel",
        "1 cupo en un grupo de máximo 5 personas",
      ],
      savings: "Ahorras 70 mil pesos por nivel",
    },

    {
      href: `/checkout/${params.plan}/one-time`,
      title: "Programa completo",
      description: "Matrícula individual - Programa completo",
      price: "1 millón COP",
      duration: "4 meses (2 niveles)",
      features: [
        "64 clases de una hora (4 por semana)",
        "Acceso a la plataforma de aprendizaje",
        "Grabaciones de las clases",
        "Todos los materiales",
        "Evaluación al final de cada nivel",
        "1 cupo en un grupo de máximo 5 personas",
      ],
      savings: "Ahorras 200 mil pesos",
    },
  ];

  const grupo = [
    {
      title: "Opción 4",
      description: "Matrícula grupo de amigos (3-5 personas)",
      price: "430 mil / nivel por persona",
      duration: "2 meses",
      features: [
        "32 clases de una hora (4 por semana)",
        "Acceso a la plataforma de aprendizaje para ti y tus amigos",
        "Grabaciones de las clases",
        "Todos los materiales",
        "Evaluación al final del nivel",
        "3-5 cupos en un grupo de máximo 5 personas",
      ],
      savings: "Ahorras 170 mil pesos por nivel por persona",
    },
    {
      title: "Opción 3",
      description: "Matrícula grupo de amigos (3-5 personas)",
      price: "250 mil / mes por persona",
      duration: "4 meses",
      features: [
        "16 clases de una hora (4 por semana)",
        "Acceso a la plataforma de aprendizaje para ti y tus amigos",
        "Grabaciones de las clases",
        "Todos los materiales",
        "Evaluación al final del nivel",
        "3-5 cupos en un grupo de máximo 5 personas",
      ],
      savings: "Ahorras 50 mil pesos al mes por persona",
    },
    {
      title: "Opción 6",
      description: "Matrícula grupo de amigos - Programa completo",
      price: "850 mil",
      duration: "4 meses (2 niveles)",
      features: [
        "64 clases de una hora (4 por semana)",
        "Acceso a la plataforma de aprendizaje para ti y tus amigos",
        "Grabaciones de las clases",
        "Todos los materiales",
        "Evaluación al final de cada nivel",
        "3-5 cupos en un grupo de máximo 5 personas",
      ],
      savings: "Ahorras 350 mil pesos por persona",
    },
  ];

  return (
    <div className="container mx-auto flex flex-col items-center gap-12 py-16">
      <h1 className="text-4xl font-bold text-primary">
        Beginners A0 - Matrícula individual
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {individual.map((plan, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2 text-2xl font-bold text-primary">
                {plan.price}
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                Duración: {plan.duration}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="mr-2 mt-0.5 h-5 w-5 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              {plan.savings && (
                <p className="my-2 text-sm font-semibold text-green-600">
                  {plan.savings}
                </p>
              )}
            </CardFooter>
            <Link href={plan.href}>
              <Button className="mt-1 w-full">Seleccionar Plan</Button>
            </Link>
          </Card>
        ))}
      </div>
      {/* <Separator />
      <h1 className="text-4xl font-bold text-primary">
        Beginners A0 - Matrícula grupo de amigos
      </h1> */}
    </div>
  );
}
