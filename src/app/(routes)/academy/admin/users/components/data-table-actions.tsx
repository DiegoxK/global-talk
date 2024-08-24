import type { UserWithRole } from "@/lib/definitions";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface DataTableActionsProps {
  user: UserWithRole;
  setUser: Dispatch<SetStateAction<UserWithRole | undefined | null>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DataTableActions({
  user,
  setUser,
  setIsDialogOpen,
}: DataTableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            setUser(user);
            setIsDialogOpen(true);
          }}
        >
          Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:bg-red-100 focus:text-destructive"
          onClick={() => navigator.clipboard.writeText(user.name)}
        >
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
