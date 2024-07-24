import { Logo } from "@/vectors/logo";
import { Elipse, Flags, Hat, Planet } from "@/vectors/miscellaneous";

export default function Hero() {
  return (
    <section className="mt-16 flex flex-wrap justify-center gap-10 md:gap-28 lg:flex-nowrap lg:justify-normal">
      <div className="gradient absolute left-0 top-0" />
      <div className="relative flex w-fit flex-col space-y-6 text-center">
        <div className="flex justify-center">
          <div className="relative pr-10 md:pr-24">
            <Flags className="absolute" />
            <Logo className="mb-6 ms-16 mt-16 h-[214px] w-[227px] fill-primary md:ms-28 md:mt-20 md:h-auto md:w-auto" />
            <Elipse className="fill-primary-100 absolute bottom-0 left-[22%] z-[-1] w-[200px] md:left-[24%] md:w-auto" />
          </div>
        </div>
        <div className="space-y-2 self-center md:w-max">
          <p className="text-primary-900 text-5xl font-bold">
            Global Talk Medallo
          </p>
          <p className="text-primary">YOUR PERSONAL ENGLISH COACHES</p>
        </div>
        <Hat className="fill-primary-100 absolute right-0 top-[-15%] lg:hidden" />
        <Planet className="fill-primary-100 absolute bottom-[-15%] left-[-16%] hidden lg:block" />
      </div>
      <div className="relative mb-20 space-y-3 self-center md:mb-0">
        <Hat className="fill-primary-100 absolute right-0 top-[-15%] hidden lg:block" />
        <Planet className="fill-primary-100 absolute bottom-[-16%] left-[-6%] lg:hidden" />
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
