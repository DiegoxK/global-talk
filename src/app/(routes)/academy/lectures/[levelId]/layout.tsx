import { api } from "@/trpc/server";
import RightSidebar from "../../_components/ui/right-sidebar";

export default async function LecturesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { levelId: string };
}) {
  const userInformation = await api.level.getUserLevels();

  //TODO: If user is not active, redirect to the dashboard

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
