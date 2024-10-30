import { api } from "@/trpc/server";
import RightSidebar from "../../_components/ui/right-sidebar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import MobileRightSidebar from "../../_components/ui/mobile-right-sidebar";

export default async function LecturesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { levelId: string };
}) {
  const userInformation = await api.level.getUserLevels();
  const session = await getServerAuthSession();

  if (session?.user?.active === false) return redirect("/academy");

  return (
    <div className="flex flex-col justify-between md:flex-row">
      <MobileRightSidebar
        levelId={params.levelId}
        levels={userInformation.levels}
        currentUserLevel={userInformation.currentUserLevel}
      />
      {children}
      <RightSidebar
        levelId={params.levelId}
        levels={userInformation.levels}
        currentUserLevel={userInformation.currentUserLevel}
      />
    </div>
  );
}
