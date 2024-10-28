import Image from "next/image";

import Julio from "../../../../../../public/teachers/julian.jpg";
import Jose from "../../../../../../public/teachers/jose.jpg";
import Luis from "../../../../../../public/teachers/luis.jpg";

import type { StaticImageData } from "next/image";
import { Badge } from "@/components/ui/badge";

export default function Team() {
  const teachers = [
    {
      picture: Jose,
      name: "José Carballido",
      level: "C2",
      experience: 20,
      description:
        "‘‘Me apasiona enseñar, compartir tiempo con mis amigos familia escuchar música y el cine. He enseñado idiomas en Estados Unidos, España y Colombia.’’",
    },
    {
      picture: Luis,
      name: "Luis Samudio",
      level: "C2",
      experience: 20,
      description:
        "‘‘Soy una persona apasionada por el buen vivir, que disfruta del café. Extrovertido, sincero y emprendedor. Amante del séptimo arte como acción retro’’",
    },
    {
      picture: Julio,
      name: "Julián Piedrahita",
      level: "C1",
      experience: 1,
      description:
        "‘‘Soy un joven disciplinado y entusiasta, amante de los retos. Gracias a haber aprendido inglés y certificarlo, pude acceder a excelentes oportunidades laborales a mi edad.’’",
    },
  ];

  return (
    <section id="team" className="space-y-16 md:pb-20 md:pt-16">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-5xl font-semibold text-primary">
          Nuestros profesores
        </h2>
        <p className="self-center md:w-[680px]">
          Nuestros profesores son profesionales altamente experimentados,
          certificados y conocidos por su enfoque amigable.
        </p>
      </div>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {teachers.map((teacher, index) => (
          <Card
            key={index}
            picture={teacher.picture}
            level={teacher.level}
            name={teacher.name}
            experience={teacher.experience}
            description={teacher.description}
          />
        ))}
      </div>
    </section>
  );
}

interface CardProps {
  picture: StaticImageData;
  name: string;
  level: string;
  experience: number;
  description: string;
}

const Card = ({ picture, name, level, experience, description }: CardProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border text-center shadow-md">
      <div
        style={{
          backgroundSize: "100px",
        }}
        className="bg-pattern flex items-center justify-center text-nowrap rounded-t-md py-6 text-xl font-extrabold text-white"
      >
        {name}
      </div>
      <div className="relative">
        <div className="absolute left-[calc(50%-40px)] top-[-2em] h-20 w-20 self-center overflow-hidden rounded-full border border-primary">
          <Image src={picture} alt={name} className="block" />
        </div>
        <div className="mt-14 space-y-6 p-4">
          <p>{description}</p>
          <div className="flex justify-between">
            <Badge className="rounded-md text-sm">
              +{experience} años de experiencia
            </Badge>
            <Badge className="rounded-md text-sm">Nivel {level}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
