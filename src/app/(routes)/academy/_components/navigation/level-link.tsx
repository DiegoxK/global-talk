"use client";

import type { Level } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LevelLink({
  level,
  disabled,
}: {
  level: Level;
  disabled?: boolean;
}) {
  const path = usePathname();
  return disabled ? (
    <Link
      className={cn(
        "flex w-full items-center gap-2 rounded-md bg-primary px-4 py-2 text-white",
        path.includes(level.id) && "bg-primary-700",
      )}
      href={`/academy/lectures/${level.id}`}
    >
      <Sparkles className="h-5 w-5" />
      {level.name}
    </Link>
  ) : (
    <div
      className={cn(
        "flex w-full select-none items-center gap-2 rounded-md bg-primary-200 px-4 py-2 text-white",
      )}
    >
      <Sparkles className="h-5 w-5" />
      {level.name}
    </div>
  );
}
