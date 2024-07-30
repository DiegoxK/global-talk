import { api } from "@/trpc/server";
import { Calendar } from "@/components/ui/calendar";
import LectureCard from "../_components/ui/lecture-card";

export default async function Home() {
  const lectures = await api.lecture.getLectures();

  return (
    <div className="flex justify-between gap-2">
      <div className="grid w-full grid-cols-1 gap-3 pb-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {lectures.map(async (lecture) => {
          const scheduleNumber = await api.schedule.scheduleNumber({
            lectureId: lecture.id,
          });

          return (
            <>
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                scheduleCount={scheduleNumber?.count}
              />
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                scheduleCount={scheduleNumber?.count}
              />
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                scheduleCount={scheduleNumber?.count}
              />
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                scheduleCount={scheduleNumber?.count}
              />
            </>
          );
        })}
      </div>
      <div className="sticky top-0 flex max-h-screen w-96 flex-col justify-between rounded-md bg-white p-4">
        <div className="rounded-sm pr-1">
          <p>asdsadsadsa</p>
        </div>
        <Calendar />
      </div>
    </div>
  );
}
