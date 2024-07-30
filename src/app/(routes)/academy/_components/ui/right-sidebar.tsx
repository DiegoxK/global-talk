import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowRightToLine } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="sticky top-0 h-screen max-h-screen w-96 py-4 pl-4">
      <div className="flex h-full flex-col justify-between rounded-md bg-accent p-2">
        <div className="rounded-sm pr-1">
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost">
              <ArrowRightToLine className="h-5 w-5 text-primary-700" />
            </Button>
            <p className="text-xl font-semibold text-primary-700">Niveles</p>
          </div>
        </div>
        <Calendar />
      </div>
    </div>
  );
}
