import type { Transaction } from "@/lib/definitions";

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
  transaction: Transaction;
  setTransaction: Dispatch<SetStateAction<Transaction | undefined | null>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DataTableActions({
  transaction,
  setTransaction,
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
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(transaction.receipt)}
        >
          Copiar factura
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
