import type { Prompt } from "@/lib/definitions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
import { useState, type Dispatch, type SetStateAction } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface DataTableActionsProps {
  prompt: Prompt;
  setPrompt: Dispatch<SetStateAction<Prompt | undefined | null>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DataTableActions({
  prompt,
  setPrompt,
  setIsDialogOpen,
}: DataTableActionsProps) {
  const router = useRouter();

  const { toast } = useToast();

  const [openAlert, setOpenAlert] = useState(false);
  const { mutate: deletePrompt } = api.prompt.deletePrompt.useMutation({
    onSuccess: () => {
      toast({
        title: "Prompto eliminado",
        description: "El prompt se ha eliminado correctamente",
        duration: 4000,
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Error al eliminar prompt",
        description: error.message,
        duration: 4000,
      });
    },
  });

  return (
    <>
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará el prompt y no se
              podrá recuperar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toast({
                  title: "Eliminando prompt",
                  description:
                    "Por favor espera un momento mientras se elimina el prompt",
                  duration: 10000000,
                });
                deletePrompt({ id: prompt.id });
                setOpenAlert(false);
              }}
              className="rounded-sm bg-destructive text-destructive-foreground hover:bg-background hover:text-destructive hover:outline hover:outline-1 hover:outline-destructive"
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
              setPrompt(prompt);
              setIsDialogOpen(true);
            }}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:bg-red-100 focus:text-destructive"
            onClick={() => {
              setOpenAlert(true);
            }}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
