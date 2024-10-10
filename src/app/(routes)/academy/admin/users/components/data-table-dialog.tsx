"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserWithRole } from "@/lib/definitions";
import { type Dispatch, type SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Required from "@/components/ui/required";
import Combobox from "@/components/ui/combobox";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

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
  user?: UserWithRole | null;
  setUser: Dispatch<SetStateAction<UserWithRole | undefined | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DataTableDialog({
  user,
  open,
  setUser,
  setOpen,
}: DataTableDialogProps) {
  const router = useRouter();
  const isEditing = Boolean(user);

  const { data: programs } = api.program.getProgramsIds.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      programId: user?.program.id ?? "",
      role: user?.role ?? "student",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setUser(undefined);
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
                      <Input placeholder="Antonio" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Apellido <Required /> <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Casas" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Correo electronico <Required /> <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ejemplo@globtm.co"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="programId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Curso <Required /> <FormMessage />
                    </FormLabel>
                    <Combobox
                      fieldName="curso"
                      values={programs}
                      field={field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Rol <Required /> <FormMessage />
                    </FormLabel>
                    <Combobox
                      fieldName="Rol"
                      values={[
                        {
                          label: "Admin",
                          value: "Admin",
                        },
                        {
                          label: "Estudiante",
                          value: "Estudiante",
                        },
                        {
                          label: "Profesor",
                          value: "Profesor",
                        },
                      ]}
                      field={field}
                    />
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
                {isEditing ? "Actualizar usuario" : "Crear usuario"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
