import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "./_components/sidebar";
import { Logo } from "@/vectors/logo";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex">
      <Sidebar user={session.user} />
      <main className="m-4 w-full">
        <div className="flex w-full items-center justify-center gap-1 rounded-lg bg-primary-700 py-10 text-3xl font-extrabold text-white">
          <Logo className="fill-white" height={40} width={38} />
          lobal talk medallo
        </div>
        {children}
      </main>
    </div>
  );
}
