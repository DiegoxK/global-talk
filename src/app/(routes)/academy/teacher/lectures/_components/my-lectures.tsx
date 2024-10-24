"use client";
import type { TeacherLectureSession } from "@/lib/definitions";
import { useState } from "react";
import LectureForm from "./lecture-form";

import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SortedLectures from "./sorted-lectures";

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
        {lectures.length > 0 ? (
          <SortedLectures
            action={() => {
              setOpen(true);
            }}
            state="teacher"
            setLecture={setLecture}
            lectureSessions={lectures}
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
