import { Check, Phone } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { ContactByWhatsApp } from "./_components/contact-by-whatsapp";

export default function Page({ params }: { params: { plan: string } }) {
  const planId = params.plan;

  switch (planId) {
    case "beginners_a0":
      return <BeginnersA0 planId={planId} />;
    case "pure_a1":
      return <PureA1 planId={planId} />;
    case "beginners_plus_pure_a1":
      return <BeginnersPlusPureA1 planId={planId} />;
    case "from_a2_to_b1":
      return <FromA2ToB1 planId={planId} />;
    case "from_b1_to_b2":
      return <FromB1ToB2 planId={planId} />;
    case "intensive_b2":
      return <IntensiveB2 planId={planId} />;
    case "business_english":
      return <BusinessEnglish planId={planId} />;
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
    <>
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Beginners A0 - Matrícula individual
        </h1>
        <div className="flex flex-wrap last:gap-6">
          {plans.map((plan, index) => (
            <div key={index}>
              <Card className="relative flex flex-col">
                {plan.savings && <div className="ribbon">{plan.savings}</div>}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="mb-4 flex-grow">
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

                <Link href={plan.href}>
                  <Button className="mt-1 w-full">Seleccionar Plan</Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Beginners A0 - Matrícula grupal
        </h1>
        <ContactByWhatsApp programName="Beginners A0" />
      </div>
    </>
  );
};
const PureA1 = ({ planId }: { planId: string }) => {
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
    <>
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Pure A1 - Matrícula individual
        </h1>
        <div className="flex flex-wrap last:gap-6">
          {plans.map((plan, index) => (
            <div key={index}>
              <Card className="relative flex flex-col">
                {plan.savings && <div className="ribbon">{plan.savings}</div>}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="mb-4 flex-grow">
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

                <Link href={plan.href}>
                  <Button className="mt-1 w-full">Seleccionar Plan</Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Pure A1 - Matrícula grupal
        </h1>
        <ContactByWhatsApp programName="Pure A1" />
      </div>
    </>
  );
};
const BeginnersPlusPureA1 = ({ planId }: { planId: string }) => {
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
    <>
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Beginners + Pure A1 - Matrícula individual
        </h1>
        <div className="flex flex-wrap last:gap-6">
          {plans.map((plan, index) => (
            <div key={index}>
              <Card className="relative flex flex-col">
                {plan.savings && <div className="ribbon">{plan.savings}</div>}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="mb-4 flex-grow">
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

                <Link href={plan.href}>
                  <Button className="mt-1 w-full">Seleccionar Plan</Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Beginners + Pure A1 - Matrícula grupal
        </h1>
        <ContactByWhatsApp programName="Beginners + Pure A1" />
      </div>
    </>
  );
};
const FromA2ToB1 = ({ planId }: { planId: string }) => {
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
    <>
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          From A2 to B1 - Matrícula individual
        </h1>
        <div className="flex flex-wrap last:gap-6">
          {plans.map((plan, index) => (
            <div key={index}>
              <Card className="relative flex flex-col">
                {plan.savings && <div className="ribbon">{plan.savings}</div>}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="mb-4 flex-grow">
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

                <Link href={plan.href}>
                  <Button className="mt-1 w-full">Seleccionar Plan</Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          From B1 to B2 - Matrícula grupal
        </h1>
        <ContactByWhatsApp programName="From B1 to B2" />
      </div>
    </>
  );
};
const FromB1ToB2 = ({ planId }: { planId: string }) => {
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
    <>
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          From B1 to B2 - Matrícula individual
        </h1>
        <div className="flex flex-wrap last:gap-6">
          {plans.map((plan, index) => (
            <div key={index}>
              <Card className="relative flex flex-col">
                {plan.savings && <div className="ribbon">{plan.savings}</div>}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="mb-4 flex-grow">
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

                <Link href={plan.href}>
                  <Button className="mt-1 w-full">Seleccionar Plan</Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Separator />
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          From B1 to B2 - Matrícula grupal
        </h1>
        <ContactByWhatsApp programName="From B1 to B2" />
      </div>
    </>
  );
};
const IntensiveB2 = ({ planId }: { planId: string }) => {
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
    <>
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Intensive B2 - Matrícula individual
        </h1>
        <div className="flex flex-wrap last:gap-6">
          {plans.map((plan, index) => (
            <div key={index}>
              <Card className="relative flex flex-col">
                {plan.savings && <div className="ribbon">{plan.savings}</div>}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="mb-4 flex-grow">
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

                <Link href={plan.href}>
                  <Button className="mt-1 w-full">Seleccionar Plan</Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Intensive B2 - Matrícula grupal
        </h1>
        <ContactByWhatsApp programName="Intensive B2" />
      </div>
    </>
  );
};
const BusinessEnglish = ({ planId }: { planId: string }) => {
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
    <>
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Business English - Matrícula individual
        </h1>
        <div className="flex flex-wrap last:gap-6">
          {plans.map((plan, index) => (
            <div key={index}>
              <Card className="relative flex flex-col">
                {plan.savings && <div className="ribbon">{plan.savings}</div>}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="mb-4 flex-grow">
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

                <Link href={plan.href}>
                  <Button className="mt-1 w-full">Seleccionar Plan</Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 border-t py-16">
        <h1 className="text-4xl font-bold text-primary">
          Business English - Matrícula grupal
        </h1>
        <ContactByWhatsApp programName="Business English" />
      </div>
    </>
  );
};
