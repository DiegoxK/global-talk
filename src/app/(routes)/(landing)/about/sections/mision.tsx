import Mision from "../../../../../../public/about/mision.png";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MisionSection() {
  return (
    <section className="my-24 flex items-center justify-center gap-10">
      <div className="w-[615px] space-y-6">
        <div className="space-y-4 pr-8">
          <h1 className="text-xl uppercase text-primary">NUESTRA MISIÓN</h1>
          <h2 className="text-4xl font-bold text-primary">
            Impulsar el éxito global con educación de inglés personalizada y
            excepcional
          </h2>
          <p>
            Empoderar a los profesionales y estudiantes universitarios de
            Medellín y resto de Colombia, proporcionando una educación de inglés
            de alta calidad adaptada a sus necesidades corporativas y académicas
            respectivamente. A través de métodos de enseñanza innovadores y
            recursos digitales avanzados, nos dedicamos a ayudar a nuestros
            estudiantes a alcanzar sus metas culturales y lingüísticas en el
            idioma inglés, y a destacarse en el competitivo mercado global.
          </p>
        </div>
        <div className="space-x-4">
          <Button size="lg" className="rounded-md text-lg">
            UNIRME AHORA
          </Button>
          <Button
            size="lg"
            className="rounded-md border border-primary bg-white text-lg text-primary hover:bg-white hover:text-primary"
          >
            IR A INICIO
          </Button>
        </div>
      </div>
      <div>
        <Image src={Mision} alt="Mision" />
      </div>
    </section>
  );
}
