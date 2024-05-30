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
    <section id="road" className="py-16">
      <h2>¿Por qué estudiar con nosotros?</h2>
      <div className="grid grid-cols-4 gap-9">
        {roads.map((road, index) => (
          <RoadCard key={index} level={road.level} points={road.points} />
        ))}
      </div>
    </section>
  );
}

const RoadCard = ({ level, points }: { level: string; points: string[] }) => {
  return (
    <div className="flex flex-col justify-end gap-y-4">
      <h3 className="text-center text-2xl font-bold text-primary">{level}</h3>
      <ul className="space-y-4">
        {points.map((point, index) => (
          <li className="flex gap-2" key={index}>
            <span className="font-bold text-primary">{"★"}</span>{" "}
            <p className="hover:text-primary">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
