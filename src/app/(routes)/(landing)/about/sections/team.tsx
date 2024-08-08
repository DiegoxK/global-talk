import Image from "next/image";

import Julio from "../../../../../../public/teachers/julian.jpg";
import Jose from "../../../../../../public/teachers/jose.jpg";
import Luis from "../../../../../../public/teachers/luis.jpg";

import type { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Team() {
  const teachers = [
    {
      picture: Jose,
      name: "José Carballido",
      experience: "C2, +20 años de experiencia",
      description:
        "‘‘Me apasiona enseñar, compartir tiempo con mis amigos familia escuchar música y el cine. He enseñado idiomas en Estados Unidos, España y Colombia.’’",
    },
    {
      picture: Luis,
      name: "Luis Samudio",
      experience: "C2, +20 años de experiencia",
      description:
        "‘‘Soy una persona apasionada por el buen vivir, que disfruta del café. Extrovertido, sincero y emprendedor. Amante del séptimo arte como acción retro’’",
    },
    {
      picture: Julio,
      name: "Julián Piedrahita",
      experience: "C1, +1 año de experiencia ",
      description:
        "‘‘Soy un joven disciplinado y entusiasta, amante de los retos. Gracias a haber aprendido inglés y certificarlo, pude acceder a excelentes oportunidades laborales a mi edad.’’",
    },
  ];

  return (
    <section id="team" className="space-y-16 md:pb-20 md:pt-16">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-5xl font-semibold">Nuestros profesores</h2>
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
  experience: string;
  description: string;
}

const Card = ({ picture, name, experience, description }: CardProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border-3 border-primary-900 p-8 text-center shadow-md">
      <div className="h-40 w-40 self-center overflow-hidden rounded-full border-2 border-primary-900">
        <Image src={picture} alt={name} className="block" />
      </div>
      <h3 className="text-xl font-bold text-primary-900">{name}</h3>
      <p className="text-lg font-semibold text-primary-900">{`[ ${experience} ]`}</p>
      <p>{description}</p>
    </div>
  );
};
