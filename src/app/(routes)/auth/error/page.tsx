import { Button } from "@/components/ui/button";
import { CircleSlash, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  searchParams: {
    error: "Verification";
  };
}

export default function ErrorPage({ searchParams }: ErrorPageProps) {
  const { error } = searchParams;

  if (error === "Verification") {
    return <VerificationError />;
  }

  return (
    <main className="bg-pattern flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-[480px] flex-col items-center gap-2 rounded-md px-8 py-10 text-center text-white">
        <CircleSlash size={80} />
        <h1 className="text-4xl font-bold">
          {/* Unable to sign in */}
          No se pudo iniciar sesión
        </h1>
        <p className="text-center">
          Ocurrió un error al intentar iniciar sesión. <br />
          <Link href="/auth/login">Por favor intenta de nuevo.</Link>
        </p>
        <p className="text-sm text-primary-800">
          Si el problema persiste, por favor contacta a <br />
          <Link className="font-bold" href="mailto:contact@globtm.co">
            Soporte.
          </Link>
        </p>
        <Link className="w-full" href="/auth/login">
          <Button className="w-full rounded-md bg-primary-800">
            Intenta de nuevo
          </Button>
        </Link>
      </div>
    </main>
  );
}

const VerificationError = () => {
  return (
    <main className="bg-pattern flex min-h-screen flex-col items-center justify-center text-white">
      <div className="flex max-w-[400px] flex-col items-center gap-2 rounded-md px-8 py-10 text-center">
        <ShieldAlert size={80} className="text-white" />
        <h1 className="text-4xl font-bold">No se pudo verificar el acceso.</h1>
        <div className="space-y-1">
          <p className="text-center">El código de acceso no es válido.</p>
          <p className="text-sm font-bold text-primary-800">
            Puede que ya se haya utilizado o haya expirado.
          </p>
        </div>
        <Link replace className="w-full" href="/auth/verify-request">
          <Button className="w-full rounded-md bg-primary-800">
            Intenta de nuevo
          </Button>
        </Link>
      </div>
    </main>
  );
};
