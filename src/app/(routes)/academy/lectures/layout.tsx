import { api } from "@/trpc/server";
import RightSidebar from "../_components/ui/right-sidebar";

export default async function LecturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const levels = await api.level.getUserLevels();

  return (
    <div className="flex justify-between">
      {children}
      <RightSidebar levels={levels} />
    </div>
  );
}
