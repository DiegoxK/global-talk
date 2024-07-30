import { api } from "@/trpc/server";

import LectureCard from "../_components/ui/lecture-card";

import RightSidebar from "../_components/ui/right-sidebar";

export default async function Home() {
  const lectures = await api.lecture.getLectures();

  return (
    <div className="flex justify-between">
      <div className="grid h-fit w-full grid-cols-1 gap-3 pb-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
      <RightSidebar />
    </div>
  );
}
