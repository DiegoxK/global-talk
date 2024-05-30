import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Questions() {
  const questions = [
    {
      question: "¿Cómo se compone el horario?",
      answer:
        "Nuestra escuela te ofrece: 4 horas virtuales. Jornadas mañana, tarde o noche. ¡Escoje la que mejor se adapte a tu agenda!",
    },
    {
      question: "¿Qué plataformas usan para enseñar?",
      answer: "Estamos trabajando para darte la mejore experiencia",
    },
    {
      question: "¿Tengo que estar en Medellín?",
      answer: "Estamos trabajando para darte la mejore experiencia",
    },
    {
      question: "¿Qué hacer si cuento con conocimientos previos?",
      answer: "Estamos trabajando para darte la mejore experiencia",
    },
    {
      question: "¿Hay actividades extracurriculares?",
      answer: "Estamos trabajando para darte la mejore experiencia",
    },
    {
      question: "¿Cómo sé si hay cupos disponibles?",
      answer: "Estamos trabajando para darte la mejore experiencia",
    },
    {
      question: "¿En cuanto tiempo se llega a B2?",
      answer: "Estamos trabajando para darte la mejore experiencia",
    },
  ];

  const Column = ({ position }: { position: "left" | "right" }) => {
    const columnQuestions =
      position === "left"
        ? questions.filter((_, index) => index % 2 === 0)
        : questions.filter((_, index) => index % 2 !== 0);

    return (
      <div>
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
    <section className="my-16 gap-28">
      <div>
        <h2>Preguntas frecuentes</h2>
        <p>
          Todo lo que necesitas saber está en nuestra sección de preguntas
          frecuentes, diseñada para resolver tus dudas más comunes.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-10 overflow-hidden">
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
    <Accordion type="single" collapsible>
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger>{question}</AccordionTrigger>
        <AccordionContent>{answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
