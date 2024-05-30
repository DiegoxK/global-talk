import Image from "next/image";

import Julio from "../../../../public/teachers/julian.jpg";
import Jose from "../../../../public/teachers/jose.jpg";
import Luis from "../../../../public/teachers/luis.jpg";

import type { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

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
    <section id="team" className="py-16">
      <div>
        <h2>Nuestros profesores</h2>
        <p>
          Nuestros profesores son profesionales altamente experimentados,
          certificados y conocidos por su enfoque amigable.
        </p>
      </div>
      <div className="grid grid-cols-3">
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
      <div className="flex">
        <h2>¡Transforma tu futuro con el poder del inglés!</h2>
        <Button>Registrarme ahora</Button>
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
    <div>
      <div className="h-40 w-40 overflow-hidden rounded-full border border-primary">
        <Image src={picture} alt={name} className="block" />
      </div>
      <h3>{name}</h3>
      <p>{experience}</p>
      <p>{description}</p>
    </div>
  );
};
