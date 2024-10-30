import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const plans = [
  {
    href: "/join/beginners_a0",
    name: "Beginners A0",
    description: "Perfecto para iniciar!",
    features: [
      "Introducción a vocabulario básico en inglés",
      "Desarrollo de habilidades auditivas y de pronunciación",
      "Frases comunes para situaciones diarias",
      "Actividades interactivas para principiantes",
      "Seguimiento personalizado por el instructor",
    ],
  },
  {
    href: "/join/pure_a1",
    name: "Pure A1 ",
    description: "Refuerza tus conocimientos!",
    features: [
      "Práctica de conversación en temas cotidianos",
      "Gramática y vocabulario nivel básico",
      "Ejercicios de pronunciación y escucha",
      "Pequeñas evaluaciones para medir progreso",
      "Acceso a recursos digitales de estudio",
    ],
  },
  {
    href: "/join/beginners_plus_pure_a1",
    name: "Beginners + Pure A1 ",
    description: "Comprende el inglés!",
    features: [
      "Refuerzo en estructuras gramaticales clave",
      "Práctica conversacional en situaciones cotidianas",
      "Actividades para mejorar comprensión auditiva",
      "Enfoque en construcción de frases",
      "Guías de autoestudio y material de práctica adicional",
    ],
  },
  {
    href: "/join/from_a2_to_b1",
    name: "From A2 to B1",
    description: "Conversa en inglés!",
    features: [
      "Simulaciones de conversación realista",
      "Gramática y vocabulario de nivel intermedio",
      "Desarrollo de habilidades de escritura y lectura",
      "Actividades de comprensión auditiva avanzadas",
      "Feedback constante de los instructores",
    ],
  },
  {
    href: "/join/from_b1_to_b2",
    name: "From B1 to B2",
    description: "Refuerza a nivel profesional!",
    features: [
      "Mejora de habilidades comunicativas en inglés",
      "Conversación sobre temas complejos y profesionales",
      "Ejercicios avanzados de gramática y vocabulario",
      "Actividades prácticas para mejorar fluidez",
      "Simulaciones de entrevistas y presentaciones",
    ],
  },
  {
    href: "/join/intensive_b2",
    name: "Intensive B2",
    description: "Aprendizaje intensivo",
    features: [
      "Intensivo en habilidades de escucha y conversación",
      "Inmersión en temas actuales y profesionales",
      "Práctica constante de redacción avanzada",
      "Retroalimentación diaria y guía personalizada",
      "Tareas de autoestudio para consolidar aprendizaje",
    ],
  },
  {
    href: "/join/business_english",
    name: "Business English",
    description: "Inglés para tu negocio!",
    features: [
      "Vocabulario y expresiones específicas de negocios",
      "Simulaciones de reuniones y llamadas en inglés",
      "Escritura profesional de correos y documentos",
      "Enfoque en presentaciones y negociaciones",
      "Consejos para mejorar la comunicación en el ámbito laboral",
    ],
  },
];

export default function JoinPage({
  searchParams,
}: {
  searchParams: {
    redirected: string;
  };
}) {
  const userEmail = searchParams.redirected;

  return (
    <>
      <AlertDialog defaultOpen={userEmail !== undefined}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>No se encontro tu usuario.</AlertDialogTitle>
            <AlertDialogDescription>
              No se encontro ningún usuario con el correo electrónico{" "}
              <strong>{userEmail}</strong>. Si crees que es un error, por favor
              contacta a <strong>contacto@academiaglobtm.com</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="join-background relative">
        <div className="absolute h-full w-full bg-primary-700 opacity-50" />
        <div className="text- relative py-56 text-center text-4xl font-bold text-white shadow-sm drop-shadow-2xl"></div>
      </div>
      <div className="container mx-auto flex flex-col items-center gap-12 py-16">
        <h1 className="text-center text-4xl font-bold text-primary">
          Elige tu plan de inglés
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-8">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col p-0 pt-6 md:w-[610px]">
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
                          className="mr-2 mt-2 h-4 min-h-4 w-4 min-w-4 text-primary"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <Link href={plan.href}>
                <Button
                  style={{ backgroundSize: "100px" }}
                  className="bg-pattern mt-6 w-full rounded-t-none text-lg transition-all hover:bg-none"
                >
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
