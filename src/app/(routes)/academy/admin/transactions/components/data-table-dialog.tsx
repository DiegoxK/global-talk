"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Transaction } from "@/lib/definitions";
import { type Dispatch, type SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(25, {
      message: "No puede ser mayor a 25 caracteres",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(25, {
      message: "No puede ser mayor a 25 caracteres",
    }),
  email: z.string().email({ message: "Campo requerido" }),
  role: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(10, {
      message: "No puede ser mayor a 10 caracteres",
    }),
  programId: z.string().uuid({
    message: "Campo requerido",
  }),
});

interface DataTableDialogProps {
  transaction?: Transaction | null;
  setTransaction: Dispatch<SetStateAction<Transaction | undefined | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DataTableDialog({
  open,
  setTransaction,
  setOpen,
}: DataTableDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setTransaction(undefined);
            form.reset();
          }, 100);
        }

        setOpen(open);
      }}
    >
      <DialogContent className="max-h-[90vh]"></DialogContent>
    </Dialog>
  );
}
