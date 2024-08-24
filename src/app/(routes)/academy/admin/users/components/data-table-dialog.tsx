import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserWithRole } from "@/lib/definitions";
import { type Dispatch, type SetStateAction } from "react";

interface DataTableDialogProps {
  user?: UserWithRole;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DataTableDialog({
  user,
  open,
  setOpen,
}: DataTableDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {user && (
          <DialogHeader>
            <DialogTitle>{user.name}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}
