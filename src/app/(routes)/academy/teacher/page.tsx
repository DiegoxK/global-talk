import { Lectures, Users } from "@/vectors/miscellaneous";
import Link from "next/link";

export default function Teacher() {
  return (
    <div className="flex h-full flex-wrap items-center justify-center gap-x-14 gap-y-10 py-10">
      <Link href="/academy/teacher/lectures">
        <button className="flex h-[410px] w-[410px] flex-col items-center justify-center rounded-md border shadow-md">
          <Lectures width={280} height={280} />
          <h2 className="text-2xl font-bold text-primary-600">Clases</h2>
          <p>Gestion de mis clases</p>
        </button>
      </Link>
      <Link href="/academy/teacher/lectures">
        <button className="flex h-[410px] w-[410px] flex-col items-center justify-center rounded-md border shadow-md">
          <Users width={280} height={280} />
          <h2 className="text-2xl font-bold text-primary-600">Estudiantes</h2>
          <p>Gestion de estudiantes</p>
        </button>
      </Link>
    </div>
  );
}
