import { api } from "@/trpc/server";
import LectureCard from "../../../_components/ui/lecture-card";

interface LecturesProps {
  levelId: string;
}

export default async function Available({ levelId }: LecturesProps) {
  const lectures = await api.lecture.getLectures({
    levelId,
  });

  return (
    <div className="grid h-fit grid-cols-1 gap-3 pb-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {lectures.map(async (lecture) => {
        const scheduleNumber = lecture.schedules.length;

        return (
          <LectureCard
            state={lecture.finished ? "finished" : "available"}
            key={lecture.id}
            lecture={lecture}
            scheduleCount={scheduleNumber}
          />
        );
      })}
    </div>
  );
}
