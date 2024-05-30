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
      question: "¿Cómo se compone el horario?",
      answer:
        "Nuestra escuela te ofrece: 4 horas virtuales. Jornadas mañana, tarde o noche. ¡Escoje la que mejor se adapte a tu agenda!",
    },
    {
      question: "¿Qué plataformas usan para enseñar?",
      answer: "Estamos trabajando para darte la mejor experiencia",
    },
    {
      question: "¿Tengo que estar en Medellín?",
      answer: "Estamos trabajando para darte la mejor experiencia",
    },
    {
      question: "¿De qué tamaño son los grupos?",
      answer: "Estamos trabajando para darte la mejor experiencia",
    },
    {
      question: "¿Qué hacer si cuento con conocimientos previos?",
      answer: "Estamos trabajando para darte la mejor experiencia",
    },
    {
      question: "¿Hay actividades extracurriculares?",
      answer: "Estamos trabajando para darte la mejor experiencia",
    },
    {
      question: "¿Cómo sé si hay cupos disponibles?",
      answer: "Estamos trabajando para darte la mejor experiencia",
    },
    {
      question: "¿En cuanto tiempo se llega a B2?",
      answer: "Estamos trabajando para darte la mejor experiencia",
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
        <h2 className="text-5xl font-semibold">Preguntas frecuentes</h2>
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
  return (
    <Accordion
      className="border-3 rounded-lg border-primary-900 px-5 py-1"
      type="single"
      collapsible
    >
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger className="font-semibold">
          {question}
          <div className="rounded-sm border border-primary-900 bg-primary-800 p-1 [&[data-state=open]>svg]:rotate-180">
            <ChevronDown className="h-4 w-4 shrink-0 text-white transition-transform duration-200 " />
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-t-2 border-primary-900 pt-4">
          {answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
