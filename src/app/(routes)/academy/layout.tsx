import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "./_components/ui/sidebar";
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
      <div className="mx-4 mt-4 flex w-full flex-col">
        {/* TODO: Imagen? */}
        <div className="flex w-full items-center justify-center gap-1 rounded-lg bg-primary-700 py-10 text-3xl font-extrabold text-white">
          <Logo className="fill-white" height={40} width={38} />
          lobal talk medallo
        </div>
        <main className="relative grow px-0">{children}</main>
      </div>
    </div>
  );
}
