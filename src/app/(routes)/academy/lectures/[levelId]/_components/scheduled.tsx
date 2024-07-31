import { api } from "@/trpc/server";
import LectureCard from "../../../_components/ui/lecture-card";

export default async function Scheduled() {
  const schedules = await api.schedule.getScheduledLectures();

  return (
    <div className="grid h-fit grid-cols-1 gap-3 pb-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {schedules.map(async (schedule) => {
        const scheduleNumber = schedule.lecture.schedules.length;

        return (
          <LectureCard
            key={schedule.id}
            lecture={schedule.lecture}
            scheduleCount={scheduleNumber}
          />
        );
      })}
    </div>
  );
}
