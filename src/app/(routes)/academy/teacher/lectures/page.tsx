import { api } from "@/trpc/server";
import MyLectures from "./_components/my-lectures";

export default async function Teacher() {
  const [myTeacherLectures, finishedLectures] = await Promise.all([
    api.lectureSession.getMyTeacherLectureSessions(),
    api.lectureSession.getMyTeacherFinishedLectureSessions(),
  ]);

  return (
    <div className="flex w-full flex-col">
      <MyLectures
        lectures={myTeacherLectures}
        finishedLectures={finishedLectures}
      />
    </div>
  );
}
