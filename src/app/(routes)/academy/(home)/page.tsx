import { api } from "@/trpc/server";
import LectureCard from "../_components/ui/lecture-card";

export default async function Home() {
  const lectures = await api.lecture.getLectures();

  return (
    <div className="flex gap-4">
      {lectures.map(async (lecture) => {
        const scheduleNumber = await api.schedule.scheduleNumber({
          lectureId: lecture.id,
        });

        return (
          <LectureCard
            key={lecture.id}
            lecture={lecture}
            scheduleCount={scheduleNumber?.count}
          />
        );
      })}
    </div>
  );
}
