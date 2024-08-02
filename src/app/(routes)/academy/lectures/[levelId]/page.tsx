import { Separator } from "@/components/ui/separator";
import Available from "./_components/available";
import Scheduled from "./_components/scheduled";

interface LecturesProps {
  params: { levelId: string };
}

export default function Lectures({ params: { levelId } }: LecturesProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Clases agendadas</h1>
        <Separator />
        <Scheduled levelId={levelId} />
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Clases disponibles</h1>
        <Separator />
        <Available levelId={levelId} />
      </div>
    </div>
  );
}
