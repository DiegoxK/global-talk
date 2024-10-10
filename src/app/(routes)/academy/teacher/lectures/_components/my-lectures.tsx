"use client";
import type { TeacherLectureSession } from "@/lib/definitions";
import { useState } from "react";
import LectureForm from "./lecture-form";
import LectureCard from "../../../_components/ui/lecture-card";

import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MyLecturesProps {
  lectures: TeacherLectureSession[];
}

export default function MyLectures({ lectures }: MyLecturesProps) {
  const [open, setOpen] = useState(false);
  const [lecture, setLecture] = useState<
    TeacherLectureSession | undefined | null
  >(undefined);

  return (
    <>
      {lecture !== undefined && (
        <LectureForm
          lectureSession={lecture}
          setLecture={setLecture}
          open={open}
          setOpen={setOpen}
        />
      )}

      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Crear clase</h1>
        <Separator />
        <div
          style={{
            backgroundSize: "100px",
          }}
          onClick={() => {
            setOpen(true);
            setLecture(null);
          }}
          className="bg-pattern mt-4 flex w-fit cursor-pointer items-center justify-center rounded-lg px-16 py-24 text-white shadow-md"
        >
          <Plus className="h-16 w-16" />
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Mis clases</h1>
        <Separator />
        <div className="grid h-fit grid-cols-1 gap-3 pb-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {lectures.map((lecture) => (
            <LectureCard
              lecture={lecture}
              action={() => {
                setOpen(true);
                setLecture(lecture);
              }}
              key={lecture.id}
              state="teacher"
              scheduleCount={lecture.schedulesCount}
            />
          ))}
        </div>
      </div>
    </>
  );
}
