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
import type { LectureSession } from "@/lib/definitions";
import { formatDate, formatTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { FileSymlink, LogOut, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

interface LectureInformationProps {
  state: "view" | "schedule";
  open: boolean;
  lecture?: LectureSession;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LectureInformation({
  state,
  open,
  lecture,
  setOpen,
}: LectureInformationProps) {
  const router = useRouter();

  const onSuccessfulSubmit = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {state === "view" && lecture ? (
        <ScheduleInformation lecture={lecture} onSubmit={onSuccessfulSubmit} />
      ) : state === "schedule" && lecture ? (
        <ScheduleLecture lecture={lecture} onSubmit={onSuccessfulSubmit} />
      ) : null}
    </Dialog>
  );
}

interface ScheduleLectureProps {
  lecture: LectureSession;
  onSubmit: () => void;
}

const ScheduleLecture = ({ lecture, onSubmit }: ScheduleLectureProps) => {
  const { mutate: createSchedule } = api.schedule.createSchedule.useMutation({
    onSuccess: onSubmit,
  });

  const createScheduleHandler = () => {
    createSchedule({ lectureId: lecture.id });
  };

  return (
    <DialogContent className="max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>{lecture.name}</DialogTitle>
        <DialogDescription>{lecture.description}</DialogDescription>
      </DialogHeader>
      <div>
        Quieres agendar la clase{" "}
        <span className="font-bold text-primary-600">{lecture.name}</span>?
      </div>
      <DialogFooter>
        <Button className="rounded-sm" onClick={createScheduleHandler}>
          Agendar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

interface ScheduleInformationProps {
  lecture: LectureSession;
  onSubmit: () => void;
}

const ScheduleInformation = ({
  lecture,
  onSubmit,
}: ScheduleInformationProps) => {
  const { mutate: removeSchedule } = api.schedule.removeSchedule.useMutation({
    onSuccess: onSubmit,
  });

  const removeScheduleHandler = () => {
    removeSchedule({ lectureId: lecture.id });
  };

  return (
    <DialogContent className="flex max-h-[90vh] flex-col items-center text-center">
      <DialogHeader>
        <DialogTitle className="text-center">{lecture.name}</DialogTitle>
        <DialogDescription className="text-center">
          {lecture.description}
        </DialogDescription>
      </DialogHeader>

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
              onClick={removeScheduleHandler}
              className="mt-2 bg-destructive text-destructive-foreground hover:bg-background hover:text-destructive hover:outline hover:outline-1 hover:outline-destructive"
              size="icon"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
