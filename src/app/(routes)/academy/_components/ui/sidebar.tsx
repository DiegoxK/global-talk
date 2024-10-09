import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/env";
import type { ProgramInfo, Level, User } from "@/lib/definitions";
import { Logo } from "@/vectors/logo";
import { UserRound } from "lucide-react";
import Navigation from "../navigation/navigation";
import UserNav from "../navigation/user-nav";
import AdminNav from "../navigation/admin-nav";
import TeacherNav from "../navigation/teacher-nav";

interface SidebarProps {
  user: User;
  firstLevel?: {
    id: Level["id"];
  };
  program: ProgramInfo;
}

export default function Sidebar({ user, program, firstLevel }: SidebarProps) {
  return (
    <div className="sticky top-0 flex h-screen max-h-screen w-80 min-w-80 flex-col space-y-2 bg-primary-50 p-2">
      <div className="flex flex-col items-center justify-center text-nowrap rounded-md bg-white py-8">
        <Avatar className="h-24 w-24 bg-primary-700">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback className="bg-transparent">
            <Logo className="fill-white" height={40} width={38} />
          </AvatarFallback>
        </Avatar>
        <p className="mt-1 text-lg font-bold">
          {user.name + " " + user.lastName}
        </p>
        <p className="mt-[-5px] font-thin">{user.email}</p>
        <p className="mt-1 flex items-center gap-1 font-semibold text-primary-700">
          <UserRound />
          {user.role === env.STUDENT_ROLE
            ? "Estudiante"
            : user.role === env.TEACHER_ROLE
              ? "Profesor"
              : "Administrador"}
        </p>
        {program && (
          <p className="font-light text-primary-400">
            {program.proficiency}: {program.name}
          </p>
        )}
      </div>
      <nav className="flex grow flex-col justify-between overflow-auto text-nowrap rounded-md bg-white p-4">
        <div className="overflow-auto rounded-sm pr-1">
          <Navigation location={"/academy"} firstLevelId={firstLevel?.id} />
          {user.role === env.TEACHER_ROLE && <TeacherNav />}
          {user.role === env.ADMIN_ROLE && (
            <>
              <TeacherNav />
              <AdminNav />
            </>
          )}
        </div>
        <UserNav />
      </nav>
    </div>
  );
}
