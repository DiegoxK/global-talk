"use client";

import { Separator } from "@/components/ui/separator";
import { NavLink } from "./nav-link";
import { BookOpenCheck } from "lucide-react";

export default function TeacherNav() {
  return (
    <>
      <Separator className="my-2" />
      <NavLink Icon={BookOpenCheck} location="/academy" href="/teacher">
        Profesor
      </NavLink>
    </>
  );
}
