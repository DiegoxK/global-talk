"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
  roleId: z.string().uuid({
    message: "Campo requerido",
  }),
  courseId: z.string().uuid({
    message: "Campo requerido",
  }),
});

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      courseId: user?.courses.id ?? "",
      roleId: user?.role ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh]">
        {user && (
          <DialogHeader>
            <DialogTitle>Editar usuario</DialogTitle>
            <DialogDescription>
              Formulario de edicion del usuario.
            </DialogDescription>
            <div className="mt-4 max-h-[60vh] space-y-2 overflow-y-auto rounded-sm px-2 pb-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}
