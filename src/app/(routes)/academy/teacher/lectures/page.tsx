import { api } from "@/trpc/server";
import MyLectures from "./_components/my-lectures";

export default async function Teacher() {
  const myTeacherLectures = await api.lecture.getMyTeacherLectures();

  return (
    <div className="flex w-full flex-col">
      <MyLectures lectures={myTeacherLectures} />
    </div>
  );
}
