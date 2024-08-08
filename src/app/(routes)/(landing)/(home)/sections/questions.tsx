import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

export default function Questions() {
  const questions = [
    {
      question: "¿Qué cursos ofrecemos?",
      answer:
        "En este momento los siguientes cuatro programas: \n De A2 a B1. \n De B1 a B2. \n Inglés para los negocios. \n Preparación para exámenes oficiales.",
    },
    {
      question: "¿Cómo funciona el programa De A2 a B1?",
      answer:
        "Consta de 5 niveles, con una duración de 1 año y una intensidad de 4 horas semanales.",
    },
    {
      question: "¿Cómo funciona el programa De B1 a B2?",
      answer:
        "Consta de 5 niveles, con una duración de 1 año y una intensidad de 4 horas semanales.",
    },
    {
      question: '¿Cómo funciona el programa "Inglés para los negocios"?',
      answer:
        "Consta de 5 niveles, con una duración de 1 año y una intensidad de 4 horas semanales. \n Prerequisito: B1",
    },
    {
      question:
        '¿Cómo funciona el programa "Preparación para exámenes oficiales"?',
      answer:
        "Te preparamos para los siguientes exámenes: TOEFL, IELTS, APTIS. \n Cursos con intensidad según tus necesidades y disponibilidad. \n Simulador del examen.",
    },
    {
      question: "¿Tengo que estar en Medellín?",
      answer:
        "No, nuestros cursos son virtuales por lo tanto no es necesario que vivas en nuestra ciudad para aprender con Global Talk Medallo.",
    },
    {
      question: "¿Qué sucede si cuento con conocimientos previos?",
      answer:
        "Dentro de nuestra academia, podrás realizar un exámen de nivelación completo para reconocer tu nivel actual. En base a tus resultados te recomendaremos el programa que más se ajuste a tus conocimientos.",
    },
    {
      question: "¿Cómo sé si hay cupos disponibles?",
      answer:
        "Dentro de nuestra sección academia podrás ver los cupos disponibles en diferentes grupos. \n Cada grupo de compone de 5 estudiantes.",
    },
    {
      question: "¿Qué plataformas usan para enseñar?",
      answer:
        "Utilizamos diferentes plataformas para darte la mejor experiencia de aprendizaje, algunas de estas son: \n Google Meet \n Off 2 Class \n Write and Improve \n Globi, ¡nuestra propia IA!",
    },
    {
      question: "¿De qué tamaño son los grupos?",
      answer:
        "Cada grupo se compone de 5 estudiantes, con el fin de brindarte una enseñanza completamente personalizada.",
    },
    {
      question: "¿Dan clases privadas?",
      answer: "Así es, si estás interesado pregunta por su disponibilidad.",
    },
    {
      question: "¿En cuanto tiempo se llega a B2?",
      answer:
        "Depende de tu punto de partida. Por ejemplo, si inicias sin conocimientos previos, llegarás a B2 en 2 años con la intensidad de 4 horas semanales.",
    },
  ];

  const Column = ({ position }: { position: "left" | "right" }) => {
    const columnQuestions =
      position === "left"
        ? questions.filter((_, index) => index % 2 === 0)
        : questions.filter((_, index) => index % 2 !== 0);

    return (
      <div className="space-y-5">
        {columnQuestions.map((question, index) => (
          <Card
            key={index}
            index={index}
            question={question.question}
            answer={question.answer}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="questions" className="mb-20 mt-20 space-y-16 md:mb-40">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-5xl font-semibold text-primary">
          Preguntas frecuentes
        </h2>
        <p className="self-center md:w-[680px]">
          Todo lo que necesitas saber está en nuestra sección de preguntas
          frecuentes, diseñada para resolver tus dudas más comunes.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 overflow-hidden md:grid-cols-2 md:gap-10">
        <Column position="left" />
        <Column position="right" />
      </div>
    </section>
  );
}

interface CardProps {
  index: number;
  question: string;
  answer: string;
}

const Card = ({ index, question, answer }: CardProps) => {
  const paragraphs = answer.split("\n").map((paragraph) => ({ paragraph }));
  const Answer = () => {
    if (paragraphs.length > 1) {
      return (
        <>
          {paragraphs.map((paragraph, index) => {
            if (index === 0) {
              return <p key={index}>{paragraph.paragraph}</p>;
            }
            return (
              <p key={index} className="ml-2">
                • {paragraph.paragraph}
              </p>
            );
          })}
        </>
      );
    }
    return <p>{answer}</p>;
  };

  return (
    <Accordion
      className="rounded-lg border-none bg-primary px-5 py-1 shadow-md transition-colors duration-200 hover:bg-primary-600"
      type="single"
      collapsible
    >
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger className="text-start font-semibold text-white">
          {question}
          <div className="rounded-sm border-none bg-white p-1 [&[data-state=open]>svg]:rotate-180">
            <ChevronDown className="h-4 w-4 shrink-0 text-primary transition-transform duration-200" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="mb-3 rounded-md bg-white/10 px-4 py-3 text-white">
          <Answer />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
