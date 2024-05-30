import Image from "next/image";

import Julio from "../../../../public/teachers/julian.jpg";
import Jose from "../../../../public/teachers/jose.jpg";
import Luis from "../../../../public/teachers/luis.jpg";

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
    <section id="team" className="space-y-24 pb-20 pt-16">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-5xl font-semibold">Nuestros profesores</h2>
        <p className="w-[680px] self-center">
          Nuestros profesores son profesionales altamente experimentados,
          certificados y conocidos por su enfoque amigable.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10">
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
      <div className="flex items-center justify-between rounded-xl bg-primary-700 p-10 text-white">
        <h2 className="text-3xl">
          ¡Transforma tu futuro con el poder del inglés!
        </h2>
        <Link href="/contact">
          <Button className="flex gap-2" variant="secondary">
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

interface CardProps {
  picture: StaticImageData;
  name: string;
  experience: string;
  description: string;
}

const Card = ({ picture, name, experience, description }: CardProps) => {
  return (
    <div className="border-3 flex flex-col gap-3 rounded-lg border-primary-900 p-10 text-center  shadow-md">
      <div className="h-40 w-40 self-center overflow-hidden rounded-full border-2 border-primary-900">
        <Image src={picture} alt={name} className="block" />
      </div>
      <h3 className="text-xl font-bold text-primary-900">{name}</h3>
      <p className="text-lg font-semibold text-primary-900">★ {experience} ★</p>
      <p>{description}</p>
    </div>
  );
};
