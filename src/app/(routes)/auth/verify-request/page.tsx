import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { InputOTPForm } from "./_components/otp-form";

import { Fingerprint } from "lucide-react";
import { getServerAuthSession } from "@/server/auth";

export default async function VerificationPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/academy");
  }

  const email = cookies().get("otp-email")?.value;

  if (!email) {
    redirect("/auth/login");
  }

  return (
    <main className="bg-pattern flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-[400px] flex-col items-center text-center">
        <Fingerprint size={80} className="text-white" />
        <h1 className="text-4xl font-bold text-transparent text-white">
          Revisa tu Correo
        </h1>
        <InputOTPForm email={email} />
      </div>
    </main>
  );
}
