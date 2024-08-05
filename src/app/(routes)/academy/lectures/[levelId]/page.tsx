import { api } from "@/trpc/server";
import MyLectures from "./_components/my-lectures";

interface LecturesProps {
  params: { levelId: string };
}

export default async function Lectures({ params: { levelId } }: LecturesProps) {
  const [availableLectures, scheduledLectures] = await Promise.all([
    api.lecture.getAvailableLectures({ levelId }),
    api.lecture.getScheduledLectures({ levelId }),
  ]);

  return (
    <div className="flex w-full flex-col">
      <MyLectures
        availableLectures={availableLectures}
        scheduledLectures={scheduledLectures}
      />
    </div>
  );
}
