"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Lecture } from "@/lib/definitions";
import { formatDate, formatTime } from "@/lib/utils";
import { FileSymlink, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

interface LectureInformationProps {
  open: boolean;
  lecture: Lecture;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LectureInformation({
  open,
  lecture,
  setOpen,
}: LectureInformationProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[90vh] flex-col items-center text-center">
        <DialogHeader>
          <DialogTitle className="text-center">{lecture.name}</DialogTitle>
          <DialogDescription className="text-center">
            {lecture.description}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] w-full space-y-4 overflow-y-auto p-1">
          <div>
            <p className="text-primary">Profesor</p>
            <p>{lecture.teacherName}</p>
          </div>
          <Separator />

          <div>
            <p className="text-primary">Fecha</p>
            <p>{formatDate(lecture.date)}</p>
          </div>
          <Separator />

          <div className="flex justify-center space-x-4">
            <div>
              <p className="text-primary">Hora de inicio</p>
              <p> {formatTime(lecture.startTime)}</p>
            </div>
            <div>
              <p className="text-primary">Hora de fin</p>
              <p>{formatTime(lecture.endTime)}</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-center space-x-4">
            <div>
              <p className="text-primary">Ingresar</p>
              <Link
                href={lecture.meetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-1" size="icon">
                  <SquareArrowOutUpRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div>
              <p className="text-primary">Material</p>
              <Link
                href={lecture.off2classUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-1" size="icon">
                  <FileSymlink className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
