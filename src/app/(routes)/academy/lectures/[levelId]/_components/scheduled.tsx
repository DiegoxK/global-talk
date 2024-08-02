import { api } from "@/trpc/server";
import LectureCard from "../../../_components/ui/lecture-card";

interface ScheduledProps {
  levelId: string;
}

export default async function Scheduled({ levelId }: ScheduledProps) {
  const lectures = await api.lecture.getScheduledLectures({
    levelId,
  });

  return (
    <div className="grid h-fit grid-cols-1 gap-3 pb-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {lectures.map(async (lecture) => {
        return (
          <LectureCard
            state={lecture.isFinished ? "finished" : "available"}
            key={lecture.id}
            lecture={lecture}
            scheduleCount={lecture.schedulesCount}
          />
        );
      })}
    </div>
  );
}
