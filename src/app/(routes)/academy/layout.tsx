import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "./_components/ui/sidebar";
import { Logo } from "@/vectors/logo";
import { api } from "@/trpc/server";
import MobileSidebar from "./_components/ui/mobile-sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }

  const [program, firstLevel] = await Promise.all([
    api.program.getProgramName(),
    api.level.getFirstLevel(),
  ]);

  return (
    <div className="flex">
      <Sidebar user={session.user} program={program} firstLevel={firstLevel} />

      <div className="flex w-full flex-col md:mx-4 md:mt-4">
        <div
          style={{ backgroundSize: "100px" }}
          className="bg-pattern flex w-full items-center justify-between gap-2 px-7 py-10 text-3xl font-extrabold text-white md:justify-center md:gap-1 md:rounded-lg md:px-0"
        >
          <MobileSidebar
            user={session.user}
            program={program}
            firstLevel={firstLevel}
          />
          <Logo className="hidden fill-white md:block" height={40} width={38} />
          <div className="flex">
            <p className="md:hidden">G</p>
            <p>lobal talk medallo</p>
          </div>
        </div>
        <main className="relative grow px-0">{children}</main>
      </div>
    </div>
  );
}
