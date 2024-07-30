import type { Lecture } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  CirclePlus,
  Clock,
  type LucideIcon,
  UserRound,
} from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

interface LectureCardProps {
  lecture: Lecture;
  scheduleCount?: number;
}

export default function LectureCard({
  lecture,
  scheduleCount,
}: LectureCardProps) {
  const teacher = lecture.teacher;
  const level = lecture.level;

  return (
    <div className="rounded-md border shadow-md">
      <div
        style={{
          backgroundSize: "100px",
        }}
        className="bg-pattern flex items-center justify-center text-nowrap rounded-t-md py-4 text-xl font-extrabold text-white"
      >
        {teacher.name + " " + teacher.lastName}
      </div>
      <div className="relative">
        <Avatar className="absolute left-[calc(50%-24px)] top-[-1em] h-[55px] w-[55px] border border-primary-700">
          <AvatarImage src={teacher.image ?? undefined} />
          <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="p-3">
          <div className="mb-6 flex justify-between">
            <Badge variant="outline">{level.name}</Badge>
            <Badge variant="outline">A1</Badge>
          </div>
          <div className="space-y-3">
            <p className="text-xl font-extrabold">{lecture.name}</p>
            <CardParagraph Icon={Calendar}>
              {formatDate(lecture.date)}
            </CardParagraph>
            <CardParagraph Icon={Clock}>
              {formatTime(lecture.start_time)} - {formatTime(lecture.end_time)}
            </CardParagraph>
            <CardParagraph Icon={UserRound}>
              {scheduleCount} / 5 estudiantes
            </CardParagraph>
          </div>
        </div>
      </div>
      <button className="flex w-full items-center justify-center gap-2 text-nowrap rounded-b-md border-t bg-accent py-2 text-base font-extrabold text-primary-300">
        Agendar
        <CirclePlus className="h-5 w-5" />
      </button>
    </div>
  );
}

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
