"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Lecture } from "@/lib/definitions";
import { cn, formatDate, formatTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { FileSymlink, LogOut, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

interface LectureInformationProps {
  state: "view" | "schedule";
  open: boolean;
  lecture: Lecture;
  setLecture: Dispatch<SetStateAction<Lecture | undefined>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LectureInformation({
  state,
  open,
  lecture,
  setLecture,
  setOpen,
}: LectureInformationProps) {
  const router = useRouter();
  const { mutate: createSchedule } = api.schedule.createSchedule.useMutation();
  const { mutate: removeSchedule } = api.schedule.removeSchedule.useMutation();

  const createScheduleHandler = () => {
    createSchedule({ lectureId: lecture.id });
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setLecture(undefined);
          }, 100);
        }

        setOpen(open);
      }}
    >
      <DialogContent
        className={cn(
          "max-h-[90vh]",
          state === "view" && "flex flex-col items-center text-center",
        )}
      >
        <DialogHeader>
          <DialogTitle className={cn(state === "view" && "text-center")}>
            {lecture.name}
          </DialogTitle>
          <DialogDescription className={cn(state === "view" && "text-center")}>
            {lecture.description}
          </DialogDescription>
        </DialogHeader>
        {state === "view" ? (
          <div className="max-h-[70vh] w-full space-y-4 overflow-y-auto p-1">
            <div>
              <p className="text-primary-700">Profesor</p>
              <p>{lecture.teacherName}</p>
            </div>
            <Separator />

            <div>
              <p className="text-primary-700">Fecha</p>
              <p>{formatDate(lecture.date)}</p>
            </div>
            <Separator />

            <div className="flex justify-center space-x-4">
              <div>
                <p className="text-primary-700">Hora de inicio</p>
                <p> {formatTime(lecture.startTime)}</p>
              </div>
              <div>
                <p className="text-primary-700">Hora de fin</p>
                <p>{formatTime(lecture.endTime)}</p>
              </div>
            </div>
            <Separator />
            <div className="mx-auto grid w-fit grid-cols-3 gap-x-4">
              <div className="m-0">
                <p className="text-primary-700">Ingresar</p>
                <Link href={lecture.meetUrl} target="_blank">
                  <Button className="mt-2" size="icon">
                    <SquareArrowOutUpRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="m-0">
                <p className="text-primary-700">Material</p>
                <Link href={lecture.off2classUrl} target="_blank">
                  <Button className="mt-2" size="icon">
                    <FileSymlink className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="m-0">
                <p className="text-destructive">Desagendar</p>
                <Button
                  onClick={() => {
                    removeSchedule({ lectureId: lecture.id });
                    router.refresh();
                  }}
                  className="mt-2 bg-destructive text-destructive-foreground hover:bg-background hover:text-destructive hover:outline hover:outline-1 hover:outline-destructive"
                  size="icon"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              Quieres agendar la clase{" "}
              <span className="font-bold text-primary-600">{lecture.name}</span>
              ?
            </div>
            <DialogFooter>
              <Button className="rounded-sm" onClick={createScheduleHandler}>
                Agendar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
