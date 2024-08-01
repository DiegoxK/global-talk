import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { Plus } from "lucide-react";
import MyLectures from "./_components/my-lectures";

export default async function Teacher() {
  const myLectures = await api.lecture.getMyLectures();

  return (
    <div className="flex w-full flex-col">
      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Crear clase</h1>
        <Separator />
        <div
          style={{
            backgroundSize: "100px",
          }}
          className="bg-pattern mt-4 flex w-fit items-center justify-center rounded-lg px-16 py-24 text-white shadow-md"
        >
          <Plus className="h-16 w-16" />
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Mis clases</h1>
        <Separator />
        <MyLectures lectures={myLectures} />
      </div>
    </div>
  );
}
