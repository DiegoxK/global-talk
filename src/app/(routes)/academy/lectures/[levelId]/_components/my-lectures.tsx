"use client";

import { Separator } from "@/components/ui/separator";
import type { LectureSession } from "@/lib/definitions";

import LectureInformation from "./lecture-information";
import { useState } from "react";
import LectureCard from "../../../_components/ui/lecture-card";
import SortedLectures from "./sorted-lectures";

interface ScheduledProps {
  scheduledLectures: LectureSession[];
  availableLectures: LectureSession[];
  finishedLectures: LectureSession[];
}

export default function MyLectures({
  scheduledLectures,
  availableLectures,
  finishedLectures,
}: ScheduledProps) {
  // TODO: optimize re renders
  const [open, setOpen] = useState(true);
  const [state, setState] = useState<"view" | "schedule">("view");
  const [lecture, setLecture] = useState<LectureSession>();

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
        <div className="flex flex-wrap gap-2 py-2">
          {scheduledLectures.length > 0 ? (
            scheduledLectures.map((lecture) => {
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
            })
          ) : (
            <div className="mt-5 flex h-[100px] w-full items-center justify-center text-muted-foreground">
              Aún no has agendado ninguna clase.
            </div>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-primary">Clases disponibles</h1>
        <Separator />
        {availableLectures.length > 0 ? (
          <SortedLectures
            action={() => {
              setOpen(true);
              setState("schedule");
            }}
            state={"available"}
            setLecture={setLecture}
            lectureSessions={availableLectures}
          />
        ) : (
          <div className="mt-5 flex h-[100px] w-full items-center justify-center text-muted-foreground">
            Te encuentras al día!
          </div>
        )}
      </div>
      <div className="mb-2">
        <h1 className="text-xl font-bold text-primary">Clases finalizadas</h1>
        <Separator />
        {finishedLectures.length > 0 ? (
          <SortedLectures
            action={() => {
              setOpen(true);
              setState("view");
            }}
            state={"finished"}
            setLecture={setLecture}
            lectureSessions={finishedLectures}
          />
        ) : (
          <div className="mt-5 flex h-[100px] w-full items-center justify-center text-muted-foreground">
            Aún no se han finalizado clases en este nivel.
          </div>
        )}
      </div>
    </>
  );
}
