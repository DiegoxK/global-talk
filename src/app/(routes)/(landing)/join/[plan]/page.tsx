import { Check } from "lucide-react";
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
  const planId = params.plan;

  switch (planId) {
    case "beginners_a0":
      return <BeginnersA0 planId={planId} />;
  }
}

const BeginnersA0 = ({ planId }: { planId: string }) => {
  const plans = [
    {
      href: `/checkout/${planId}/one-time-level`,
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
      href: `/checkout/${planId}/one-time`,
      title: "Programa completo",
      description: "Matrícula individual - Programa completo",
      price: "1 millón COP / programa",
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

  return (
    <div className="container mx-auto flex flex-col items-center gap-12 border-t py-16">
      <h1 className="text-4xl font-bold text-primary">
        Beginners A0 - Matrícula individual
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
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
    </div>
  );
};
