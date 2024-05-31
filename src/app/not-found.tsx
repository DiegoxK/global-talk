import { Logo } from "@/vectors/logo";

export default function NotFound() {
  return (
    <section className="my-10 flex flex-col items-center justify-center gap-8">
      <Logo className="fill-primary" width={250} />
      <p className="text-6xl font-bold text-primary-900">Error: 404</p>
      <p className="text-center">
        Estamos trabajando para darte la mejor experiencia!
      </p>
    </section>
  );
}
