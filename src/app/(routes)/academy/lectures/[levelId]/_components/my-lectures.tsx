"use client";

import { Separator } from "@/components/ui/separator";
import type { Lecture } from "@/lib/definitions";

import LectureInformation from "./lecture-information";
import { useState } from "react";
import LectureCard from "../../../_components/ui/lecture-card";

interface ScheduledProps {
  scheduledLectures: Lecture[];
  availableLectures: Lecture[];
}

export default function MyLectures({
  scheduledLectures,
  availableLectures,
}: ScheduledProps) {
  // TODO: optimize re renders
  const [open, setOpen] = useState(true);
  const [state, setState] = useState<"view" | "schedule">("view");
  const [lecture, setLecture] = useState<Lecture>();

  return (
    <>
      <LectureInformation
        state={state}
        lecture={lecture}
        open={open}
        setOpen={setOpen}
      />
      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Clases agendadas</h1>
        <Separator />
        <div className="grid h-fit grid-cols-1 gap-3 pb-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {scheduledLectures.map((lecture) => {
            return (
              <LectureCard
                action={() => {
                  setOpen(true);
                  setState("view");
                  setLecture(lecture);
                }}
                state="scheduled"
                key={lecture.id}
                lecture={lecture}
                scheduleCount={lecture.schedulesCount}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Clases disponibles</h1>
        <Separator />
        <div className="grid h-fit grid-cols-1 gap-3 pb-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {availableLectures.map((lecture) => {
            return (
              <LectureCard
                action={() => {
                  setOpen(true);
                  setState("schedule");
                  setLecture(lecture);
                }}
                state={lecture.isFinished ? "finished" : "available"}
                key={lecture.id}
                lecture={lecture}
                scheduleCount={lecture.schedulesCount}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
