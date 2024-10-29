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

import { Checkbox } from "@/components/ui/checkbox";

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
import Combobox from "@/components/ui/combobox";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
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
  lastName: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(25, {
      message: "No puede ser mayor a 25 caracteres",
    }),
  email: z.string().email({ message: "Campo requerido" }),
  phone: z.string().min(1, { message: "Campo requerido" }),
  city: z.string().min(1, { message: "Campo requerido" }),
  programId: z.string({
    message: "Campo requerido",
  }),
  groupId: z.number({
    message: "Campo requerido",
  }),
  active: z.boolean({
    message: "Campo requerido",
  }),
  role: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(10, {
      message: "No puede ser mayor a 10 caracteres",
    }),
  current_level: z.coerce.number().min(1, { message: "Campo requerido" }),
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

  const { toast } = useToast();

  const { mutate: createUser } = api.user.createUser.useMutation({
    onSuccess: () => {
      setUser(undefined);
      setOpen(false);
      form.reset();

      toast({
        title: "Usuario creado",
        description: "El usuario se ha creado correctamente",
        duration: 4000,
      });

      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Error al crear usuario",
        description: error.message,
        duration: 4000,
      });
    },
  });

  const { mutate: updateUser } = api.user.updateUserAsAdmin.useMutation({
    onSuccess: () => {
      setUser(undefined);
      setOpen(false);
      form.reset();

      toast({
        title: "Usuario actualizado",
        description: "El usuario se ha actualizado correctamente",
        duration: 4000,
      });

      router.refresh();
    },
  });

  const { data: programs } = api.program.getProgramsIds.useQuery();
  const { data: groups } = api.groups.getgroups.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      city: user?.city ?? "",
      programId: user?.program.id ?? "",
      groupId: user?.group.id ?? 0,
      current_level: user?.current_level ?? 0,
      active: user?.active ?? false,
      role: user?.role ?? "student",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isEditing) {
      toast({
        title: "Creando usuario",
        description: "Por favor espera un momento mientras se crea el usuario",
        duration: 10000000,
      });

      createUser(values);
    } else {
      toast({
        title: "Actualizando usuario",
        description:
          "Por favor espera un momento mientras se actualiza el usuario",
        duration: 10000000,
      });

      updateUser(values);
    }
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Numero de telefono <Required /> <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="321000000" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Ciudad <Required /> <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Medellín" {...field} />
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
                      Programa <Required /> <FormMessage />
                    </FormLabel>
                    <Combobox
                      fieldName="programa"
                      values={programs}
                      field={field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groupId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Grupo <Required /> <FormMessage />
                    </FormLabel>
                    <Combobox fieldName="grupo" values={groups} field={field} />
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
              <FormField
                control={form.control}
                name="current_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nivel actual <Required /> <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="ejemplo@globtm.co"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Usuario Activo? <Required /> <FormMessage />
                    </FormLabel>
                    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormDescription>
                          Si el usuario está activo, podrá ingresar a las clases
                          normalmente.
                        </FormDescription>
                      </div>
                    </div>
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
