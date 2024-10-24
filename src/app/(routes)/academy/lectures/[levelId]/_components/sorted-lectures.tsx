import type { LectureSession } from "@/lib/definitions";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LectureCard from "../../../_components/ui/lecture-card";
import { ChevronDown } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface SortedLecturesProps {
  state: "available" | "scheduled" | "finished" | "teacher";
  lectureSessions: LectureSession[];
  action: () => void;
  setLecture: Dispatch<SetStateAction<LectureSession | undefined>>;
}

export default function SortedLectures({
  lectureSessions,
  action,
  state,
  setLecture,
}: SortedLecturesProps) {
  const groupedByTitle = lectureSessions.reduce(
    (acc, lecture) => {
      (acc[lecture.name!] ??= []).push(lecture);
      return acc;
    },
    {} as Record<string, LectureSession[]>,
  );

  return (
    <Accordion
      defaultValue={state === "finished" ? [] : Object.keys(groupedByTitle)}
      className="w-full px-1"
      type="multiple"
    >
      {Object.entries(groupedByTitle).map(([title, lectures]) => (
        <AccordionItem className="w-full" value={title} key={title}>
          <AccordionTrigger className="p-0 py-2 text-start font-semibold text-primary-600">
            {title}{" "}
            <div className="rounded-sm border-none bg-white p-1 [&[data-state=open]>svg]:rotate-180">
              <ChevronDown className="h-4 w-4 shrink-0 text-primary transition-transform duration-200" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex w-full flex-wrap gap-2">
            {lectures.map((lecture) => (
              <LectureCard
                key={lecture.id}
                state={state}
                lecture={lecture}
                action={() => {
                  action();
                  setLecture(lecture);
                }}
                scheduleCount={lecture.schedulesCount}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
