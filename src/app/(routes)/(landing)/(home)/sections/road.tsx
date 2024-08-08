import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Road() {
  const roads = [
    {
      level: "A2",
      points: [
        "Comunicación básica en situaciones cotidianas.",
        "Puedes entender y usar frases comunes.",
      ],
    },
    {
      level: "B1",
      points: [
        "Conversación fluida en temas comunes.",
        "Capacidad de entender puntos principales de textos sencillos.",
        "Calificación para roles administrativos básicos.",
      ],
    },
    {
      level: "B2",
      points: [
        "Comprensión y producción de textos complejos.",
        "Habilidad para interactuar con fluidez con hablantes nativos.",
        "Estudios universitarios en inglés.",
        "Elegibilidad para trabajos profesionales.",
      ],
    },
    {
      level: "C1 ★",
      points: [
        "Comunicación efectiva en contextos profesionales y académicos.",
        "Comunicación efectiva en contextos profesionales y académicos.",
        "Mayores oportunidades laborales en posiciones de alta responsabilidad.",
        "Acceso a programas de posgrado en universidades de habla inglesa.",
      ],
    },
  ];
  return (
    <section id="road" className="pb-24 md:pt-28">
      <h2 className="mb-20 mt-20 text-center text-5xl font-semibold text-primary">
        Tu camino al éxito en el inglés
      </h2>
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
        {roads.map((road, index) => (
          <RoadCard key={index} level={road.level} points={road.points} />
        ))}
      </div>
      <div className="mt-32 hidden items-center justify-between rounded-full bg-primary px-10 py-8 text-white md:flex">
        <h2 className="text-3xl">
          ¡Transforma tu futuro con el poder del inglés!
        </h2>
        <Link href="/contact">
          <Button className="ms-10 flex gap-2" variant="secondary">
            Registrarme ahora
            <svg
              width="21"
              height="15"
              viewBox="0 0 21 15"
              className="fill-current"
            >
              <path d="M20.7236 8.01862C21.1048 7.619 21.0899 6.98601 20.6903 6.6048L14.1781 0.392536C13.7785 0.0113211 13.1455 0.0262382 12.7643 0.425855C12.3831 0.825471 12.398 1.45846 12.7976 1.83968L18.5862 7.36169L13.0642 13.1502C12.683 13.5499 12.6979 14.1828 13.0975 14.5641C13.4971 14.9453 14.1301 14.9304 14.5113 14.5307L20.7236 8.01862ZM1.02356 8.77585L20.0236 8.32809L19.9764 6.32865L0.976441 6.7764L1.02356 8.77585Z" />
            </svg>
          </Button>
        </Link>
      </div>
    </section>
  );
}

const RoadCard = ({ level, points }: { level: string; points: string[] }) => {
  return (
    <div className="flex flex-col justify-end gap-y-4">
      <h3 className="text-2xl font-bold text-primary md:text-center">
        {level}
      </h3>
      <ul className="space-y-4">
        {points.map((point, index) => (
          <li className="flex gap-2" key={index}>
            <span className="font-bold text-primary">{"★"}</span>{" "}
            <p className="transition-colors hover:text-primary">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
