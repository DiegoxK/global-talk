import {
  Bulb,
  Certificate,
  MagicHand,
  QualitiesHat,
  Calendar,
  Heart,
} from "@/vectors/miscellaneous";

export default function Qualities() {
  const qualities = [
    {
      title: "Profesores profesionales",
      description:
        "Nuestros profesores, apasionados y bien preparados, establecen un ambiente de aprendizaje estimulante y de apoyo.",
      icon: QualitiesHat,
    },
    {
      title: "Certificación oficial ",
      description:
        "Nuestro compromiso es asegurar que todos nuestros estudiantes obtengan una certificación de mínimo B2 en inglés.",
      icon: Certificate,
    },
    {
      title: "Herramientas innovadoras",
      description:
        "Ofrecemos una experiencia de aprendizaje del inglés impulsada por las tecnologías más avanzadas y modernas.",
      icon: Bulb,
    },
    {
      title: "Horarios flexibles",
      description:
        "Ajustamos nuestros horarios a tu agenda, garantizando flexibilidad para que puedas aprender cómodamente.",
      icon: Calendar,
    },
    {
      title: "Atención individual",
      description:
        "Con grupos pequeños, garantizamos atención individual para maximizar el progreso y la comprensión de cada estudiante.",
      icon: Heart,
    },
    {
      title: "Clases dinámicas",
      description:
        "Fomentamos la participación y el aprendizaje activo a través de nuestras clases dinámicas y envolventes.",
      icon: MagicHand,
    },
  ];

  return (
    <section className="py-16">
      <div>
        <h2>¿Por qué estudiar con nosotros?</h2>
        <p>
          Con un equipo dedicado de profesores experimentados, herramientas
          modernas para la enseñanza y la mejor actitud, te ayudaremos a dominar
          y certificar tu inglés.
        </p>
      </div>
      <div className="grid grid-cols-3">
        {qualities.map((quality, index) => (
          <Card
            key={index}
            title={quality.title}
            description={quality.description}
            Icon={quality.icon}
          />
        ))}
      </div>
    </section>
  );
}

interface CardProps {
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Card = ({ title, description, Icon }: CardProps) => {
  return (
    <div>
      <Icon className="fill-primary stroke-white" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
