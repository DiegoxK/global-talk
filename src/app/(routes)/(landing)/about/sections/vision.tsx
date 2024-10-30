import Vision from "../../../../../../public/about/vision.png";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VisionSection() {
  return (
    <section className="my-24 flex items-center justify-center md:gap-x-12">
      <div>
        <Image className="hidden md:block" src={Vision} alt="Mision" />
      </div>
      <div className="w-[615px] space-y-6">
        <div className="space-y-4 pr-8">
          <h1 className="text-xl uppercase text-primary">NUESTRA VISIÓN</h1>
          <h2 className="text-4xl font-bold text-primary">
            Ser posicionados como la principal academia virtual en Medellín y
            Colombia para el aprendizaje del inglés
          </h2>
          <p>
            Ser la academia virtual de referencia en Medellín y Colombia para la
            enseñanza del inglés, reconocida por nuestra excelencia educativa y
            por formar profesionales y estudiantes con habilidades lingüísticas
            que les permitan acceder a oportunidades laborales internacionales.
            Aspiramos a contribuir al desarrollo de una comunidad bilingüe que
            impulse el crecimiento económico y social de nuestra región.
          </p>
        </div>
        <div className="space-x-4">
          <Link href="/contact">
            <Button size="lg" className="w-full rounded-md text-lg md:w-auto">
              CONTÁCTANOS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
