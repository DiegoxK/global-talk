import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { Plus } from "lucide-react";
import MyLectures from "./_components/my-lectures";

export default async function Teacher() {
  const myLectures = await api.lecture.getMyLectures();

  return (
    <div className="flex w-full flex-col">
      <MyLectures lectures={myLectures} />
    </div>
  );
}
