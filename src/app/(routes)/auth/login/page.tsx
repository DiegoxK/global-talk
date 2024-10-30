import { Logo } from "@/vectors/logo";
import LoginForm from "./_components/login-form";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/academy");
  }

  return (
    <main className="grid md:grid-cols-2">
      <div className="bg-pattern flex h-screen items-center justify-center">
        <LoginForm />
      </div>
      <div className="login-background relative hidden items-center justify-center text-white md:flex">
        <div className="absolute h-screen w-full bg-primary opacity-65" />
        <div className="relative flex flex-col items-center">
          <Logo className="mb-4 h-48 w-48 fill-white" />
          <h2 className="text-4xl font-bold uppercase">Global Talk Medallo</h2>
          <p className="font-light uppercase">Your personal english coaches</p>
        </div>
      </div>
    </main>
  );
}
