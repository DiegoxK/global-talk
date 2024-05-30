import { Logo } from "@/vectors/logo";
import { Elipse, Flags, Hat, Planet } from "@/vectors/miscellaneous";

export default function Hero() {
  return (
    <section className="mt-16 flex flex-wrap justify-center gap-28 md:flex-nowrap md:justify-normal">
      <div className="gradient absolute left-0 top-0" />
      <div className="relative w-fit space-y-6 text-center">
        <div className="relative flex">
          <Flags className="absolute" />
          <Logo
            className="mb-6 ms-28 mt-20 fill-primary"
            width={274}
            height={291}
          />
          <Elipse className="absolute bottom-0 left-[25%] z-[-1] fill-primary-100" />
        </div>
        <div className="space-y-2 md:w-max">
          <p className="text-5xl font-bold text-primary-900">
            Global Talk Medallo
          </p>
          <p className="text-primary">YOUR PERSONAL ENGLISH COACHES</p>
        </div>
        <Planet className="absolute bottom-[-15%] left-[-16%] fill-primary-100" />
      </div>
      <div className="relative space-y-3 self-center">
        <Hat className="absolute right-0 top-[-15%] fill-primary-100" />
        <p>Bienvenido a la mejor academia de Inglés</p>
        <h1 className="text-5xl font-semibold [&_span]:text-primary">
          Convierte el <span>inglés</span> en una <span>herramienta</span> para
          alcanzar <span>tus sueños</span>.
        </h1>
        <p className="text-lg font-medium">
          Explora con nosotros un espacio educativo único, donde el aprendizaje
          del inglés se fusiona con experiencias enriquecedoras, preparándote
          para un crecimiento personal y profesional continuo.
        </p>
      </div>
    </section>
  );
}
