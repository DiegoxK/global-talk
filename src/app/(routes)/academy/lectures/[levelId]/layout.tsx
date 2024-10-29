import { api } from "@/trpc/server";
import RightSidebar from "../../_components/ui/right-sidebar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

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
    <div className="flex justify-between">
      {children}
      <RightSidebar
        levelId={params.levelId}
        levels={userInformation.levels}
        currentUserLevel={userInformation.currentUserLevel}
      />
    </div>
  );
}
