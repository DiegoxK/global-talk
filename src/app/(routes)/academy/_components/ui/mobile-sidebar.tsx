import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/env";
import type { ProgramInfo, Level, User } from "@/lib/definitions";
import { Logo } from "@/vectors/logo";
import { ArrowRightFromLine, UserRound } from "lucide-react";
import Navigation from "../navigation/navigation";
import UserNav from "../navigation/user-nav";
import AdminNav from "../navigation/admin-nav";
import TeacherNav from "../navigation/teacher-nav";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SidebarProps {
  user: User;
  firstLevel?: {
    id: Level["id"];
  };
  program: ProgramInfo;
}

export default function MobileSidebar({
  user,
  program,
  firstLevel,
}: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <ArrowRightFromLine className="h-10 w-10" />
      </SheetTrigger>
      <SheetContent className="flex flex-col px-0" side="left">
        <div className="flex flex-col items-center justify-center text-nowrap rounded-md bg-white py-4">
          <Avatar className="h-24 w-24 bg-primary">
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
            {user.role === env.ADMIN_ROLE
              ? "Administrador"
              : user.role === env.TEACHER_ROLE
                ? "Profesor"
                : "Estudiante"}
          </p>
          {program && (
            <p className="font-light text-primary-400">
              {program.proficiency}: {program.name}
            </p>
          )}
        </div>
        <nav className="flex grow flex-col justify-between overflow-auto text-nowrap rounded-md bg-white p-4 py-0">
          <div className="overflow-auto rounded-sm pr-1">
            <Navigation
              user={user}
              location={"/academy"}
              firstLevelId={firstLevel?.id}
            />
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
      </SheetContent>
    </Sheet>
  );
}
