"use client";

import type { Lecture } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  CircleCheckBig,
  CirclePlus,
  Clock,
  type LucideIcon,
  Pencil,
  UserRound,
} from "lucide-react";
import { cn, formatDate, formatTime } from "@/lib/utils";

interface LectureCardProps {
  state: "available" | "scheduled" | "finished" | "teacher";
  action?: () => void;
  lecture: Lecture;
  scheduleCount: number;
}

export default function LectureCard({
  lecture,
  state,
  action,
  scheduleCount,
}: LectureCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-md border shadow-md">
      <div>
        <div
          style={{
            backgroundSize: "100px",
          }}
          className="bg-pattern flex items-center justify-center text-nowrap rounded-t-md py-4 text-xl font-extrabold text-white"
        >
          {lecture.teacherName}
        </div>
        <div className="relative">
          <Avatar className="absolute left-[calc(50%-24px)] top-[-1em] h-[55px] w-[55px] border border-primary-700">
            <AvatarImage src={lecture.teacherImage ?? undefined} />
            <AvatarFallback>{lecture.teacherName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="p-3">
            <div className="mb-6 flex justify-between">
              <Badge variant="outline">{lecture.levelName}</Badge>
              <Badge variant="outline">{lecture.proficiency}</Badge>
            </div>
            <div className="space-y-3">
              <p className="text-xl font-extrabold">{lecture.name}</p>
              <CardParagraph Icon={Calendar}>
                {formatDate(lecture.date)}
              </CardParagraph>
              <CardParagraph Icon={Clock}>
                {formatTime(lecture.startTime)} - {formatTime(lecture.endTime)}
              </CardParagraph>
              <CardParagraph Icon={UserRound}>
                {scheduleCount} / 5 estudiantes
              </CardParagraph>
            </div>
          </div>
        </div>
      </div>
      {state === "available" ? (
        <CardButton
          disabled={scheduleCount === 5}
          className="disabled:text-primary-100"
          action={action}
          Icon={CirclePlus}
        >
          Agendar
        </CardButton>
      ) : state === "scheduled" ? (
        <CardButton
          action={action}
          className="bg-primary-700 font-semibold text-white"
          Icon={CircleCheckBig}
        >
          Ver Clase
        </CardButton>
      ) : state === "teacher" ? (
        <CardButton action={action} Icon={Pencil}>
          Editar Clase
        </CardButton>
      ) : (
        <CardButton action={action} Icon={CirclePlus}>
          No disponible
        </CardButton>
      )}
    </div>
  );
}

interface CardButtonProps {
  className?: string;
  disabled?: boolean;
  action?: () => void;
  children: React.ReactNode;
  Icon: LucideIcon;
}

const CardButton = ({
  children,
  Icon,
  className,
  disabled,
  action,
}: CardButtonProps) => (
  <button
    disabled={disabled}
    onClick={action}
    className={cn(
      "flex w-full items-center justify-center gap-1 text-nowrap rounded-b-md border-t bg-accent py-2 text-base font-extrabold text-primary-300",
      className,
    )}
  >
    {children}
    <Icon className="h-5 w-5" />
  </button>
);

interface CardParagraphProps {
  children: React.ReactNode;
  Icon: LucideIcon;
}

const CardParagraph = ({ children, Icon }: CardParagraphProps) => (
  <p className="flex items-center gap-2">
    <Icon className="h-5 w-5 text-primary-700" />
    {children}
  </p>
);
