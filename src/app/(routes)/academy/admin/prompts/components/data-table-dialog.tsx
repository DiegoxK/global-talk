"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Prompt } from "@/lib/definitions";
import { type Dispatch, type SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Required from "@/components/ui/required";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(25, {
      message: "No puede ser mayor a 25 caracteres",
    }),
  description: z.string().min(1, {
    message: "Campo requerido",
  }),
  prompt: z.string().min(1, {
    message: "Campo requerido",
  }),
});

interface DataTableDialogProps {
  prompt?: Prompt | null;
  setPrompt: Dispatch<SetStateAction<Prompt | undefined | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DataTableDialog({
  prompt,
  open,
  setPrompt,
  setOpen,
}: DataTableDialogProps) {
  const router = useRouter();
  const isEditing = Boolean(prompt);

  const { toast } = useToast();

  const { mutate: createPrompt } = api.prompt.createPrompt.useMutation({
    onSuccess: () => {
      setPrompt(undefined);
      setOpen(false);
      form.reset();
      toast({
        title: "Prompto creado",
        description: "El prompt se ha creado correctamente",
        duration: 4000,
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Error al crear prompt",
        description: error.message,
        duration: 4000,
      });
    },
  });

  const { mutate: updatePrompt } = api.prompt.updatePrompt.useMutation({
    onSuccess: () => {
      setPrompt(undefined);
      setOpen(false);
      form.reset();
      toast({
        title: "Prompto actualizado",
        description: "El prompt se ha actualizado correctamente",
        duration: 4000,
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Error al actualizar prompt",
        description: error.message,
        duration: 4000,
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: prompt?.name ?? "",
      description: prompt?.description ?? "",
      prompt: prompt?.prompt ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isEditing) {
      toast({
        title: "Creando prompt",
        description: "Por favor espera un momento mientras se crea el prompt",
        duration: 10000000,
      });
      createPrompt(values);
    } else {
      toast({
        title: "Actualizando prompt",
        description:
          "Por favor espera un momento mientras se actualiza el prompt",
        duration: 10000000,
      });

      updatePrompt({
        id: prompt?.id,
        ...values,
      });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setPrompt(undefined);
            form.reset();
          }, 100);
        }

        setOpen(open);
      }}
    >
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar usuario" : "Crear usuario"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Formulario de edicion del usuario."
              : "Formulario de creacion del usuario."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="max-h-[60vh] space-y-2 overflow-y-auto rounded-sm px-2 pb-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nombre <Required /> <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Asistente Gramatica" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Descripcion para el usuario <Required /> <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[200px]"
                        placeholder="Descripcion"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Prompt usado internamente <Required /> <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[200px]"
                        placeholder="Prompt"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-2">
              <Button
                disabled={!form.formState.isDirty}
                className="rounded-sm"
                type="submit"
              >
                {isEditing ? "Actualizar prompt" : "Crear prompt"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
