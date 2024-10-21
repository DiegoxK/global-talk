"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DoorClosed, UserRoundPen } from "lucide-react";
import Link from "next/link";

export default function UserNav() {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <Link className="w-full" href="/academy/profile">
        <Button
          className="w-full justify-start border-primary text-primary"
          variant="outline"
        >
          <UserRoundPen className="mr-2 h-5 w-5" />
          Mi perfil
        </Button>
      </Link>
      <Button
        className="justify-start border-destructive text-destructive hover:bg-red-50 hover:text-destructive"
        onClick={() => signOut()}
        variant="outline"
      >
        <DoorClosed className="mr-2 h-5 w-5" />
        Cerrar sesión
      </Button>
    </div>
  );
}
