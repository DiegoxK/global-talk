import {
  Bulb,
  Certificate,
  MagicHand,
  QualitiesHat,
  Calendar,
  Heart,
  WaveTop,
  WaveBottom,
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
    <>
      <WaveTop className="mb-[-3px] w-[calc(100%+1)] fill-primary-200" />
      <div className="bg-primary-200">
        <section id="qualities" className="pb-48 pt-16">
          <div className="flex flex-col gap-6 text-center">
            <h2 className="text-5xl font-semibold text-primary-900">
              ¿Por qué estudiar con nosotros?
            </h2>
            <p className="w-[840px] self-center text-primary-900">
              Con un equipo dedicado de profesores experimentados, herramientas
              modernas para la enseñanza y la mejor actitud, te ayudaremos a
              dominar y certificar tu inglés.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-3 gap-10">
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
      </div>
      <WaveBottom className="mt-[-1px] w-[calc(100%+1)] fill-primary-200" />
    </>
  );
}

interface CardProps {
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Card = ({ title, description, Icon }: CardProps) => {
  return (
    <div className="border-3 relative flex rounded-xl border-primary-900 bg-white">
      <div className="border-3 absolute left-[20] top-[-30] flex h-16 w-16 items-center justify-center rounded-lg border-primary-900 bg-primary-800">
        <Icon className="fill-white" />
      </div>
      <div className="space-y-1 self-center px-8 pb-10">
        <h3 className="mt-12 text-xl font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
