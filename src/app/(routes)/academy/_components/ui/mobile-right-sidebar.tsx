import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import type { Level } from "@/lib/definitions";
import { Book, ChartNoAxesColumnIncreasing } from "lucide-react";

import LevelLink from "../navigation/level-link";
import { api } from "@/trpc/server";

interface RightSidebarProps {
  levels: Level[];
  currentUserLevel: number;
  levelId: string;
}
export default async function MobileRightSidebar({
  levels,
  currentUserLevel,
  levelId,
}: RightSidebarProps) {
  const finishedLectures = await api.lectures.getLecturesFromLevel({
    levelId,
  });

  return (
    <Sheet>
      <SheetTrigger className="mt-6 w-full rounded-md bg-primary-700 py-3 font-semibold text-white md:hidden">
        Mas informacion
      </SheetTrigger>
      <SheetContent className="w-full">
        <div className="grid h-full grid-rows-2 rounded-md bg-accent p-4">
          <div className="overflow-auto rounded-sm pr-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <ChartNoAxesColumnIncreasing className="h-5 w-5 text-primary-700" />
                <p className="text-xl font-semibold text-primary-700">
                  Niveles
                </p>
              </div>
              <div className="flex flex-col gap-2 overflow-auto pe-1">
                {levels.map((level) => (
                  <LevelLink
                    disabled={currentUserLevel >= level.level}
                    key={level.id}
                    level={level}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 w-full overflow-auto rounded-sm pr-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <Book className="h-5 w-5 text-primary-700" />
                <p className="rounded-sm text-xl font-semibold text-primary-700">
                  Clases de este nivel
                </p>
              </div>
              <div className="bg-pattern flex h-full w-full flex-col gap-2 overflow-auto rounded-md p-4">
                {finishedLectures.map((lecture) => (
                  <div key={lecture.lectureName}>
                    <p className="text-sm font-semibold text-primary-700 text-white">
                      {lecture.lectureName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
