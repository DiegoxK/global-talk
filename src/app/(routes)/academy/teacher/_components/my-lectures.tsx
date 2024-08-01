"use client";
import type { Lecture } from "@/lib/definitions";
import { useState } from "react";
import LectureForm from "./lecture-form";
import LectureCard from "../../_components/ui/lecture-card";

interface MyLecturesProps {
  lectures: Lecture[];
}

export default function MyLectures({ lectures }: MyLecturesProps) {
  const [open, setOpen] = useState(false);
  const [lecture, setLecture] = useState<Lecture | null>(null);

  return (
    <>
      {lecture && (
        <LectureForm
          lecture={lecture}
          setLecture={setLecture}
          open={open}
          setOpen={setOpen}
        />
      )}
      <div className="grid h-fit grid-cols-1 gap-3 pb-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {lectures.map((lecture) => (
          <LectureCard
            lecture={lecture}
            setLecture={setLecture}
            setModalState={setOpen}
            key={lecture.id}
            state="teacher"
            scheduleCount={2}
          />
        ))}
      </div>
    </>
  );
}
