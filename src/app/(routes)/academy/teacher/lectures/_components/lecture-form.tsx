"use client";

import { type Dispatch, type SetStateAction } from "react";
import type { TeacherLecture } from "@/lib/definitions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

import { api } from "@/trpc/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Combobox from "./combobox";
import Required from "@/components/ui/required";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  courseId: z.string().uuid({
    message: "Campo requerido",
  }),
  levelId: z.string().uuid({
    message: "Campo requerido",
  }),
  name: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(25, {
      message: "No puede ser mayor a 25 caracteres",
    }),
  description: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(255, {
      message: "No puede ser mayor a 255 caracteres",
    }),
  meet_url: z
    .string()
    .url({
      message: "Campo requerido",
    })
    .max(255, {
      message: "No puede ser mayor a 255 caracteres",
    }),
  off2class_url: z
    .string()
    .url({
      message: "Campo requerido",
    })
    .max(255, {
      message: "No puede ser mayor a 255 caracteres",
    }),
  date: z.string().date(),

  start_time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Campo requerido",
  }),
  end_time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Campo requerido",
  }),
});

interface LectureFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  lecture: TeacherLecture | null;
  setLecture: Dispatch<SetStateAction<TeacherLecture | undefined | null>>;
}

export default function LectureForm({
  open,
  setOpen,
  lecture,
  setLecture,
}: LectureFormProps) {
  const router = useRouter();
  const isEditing = Boolean(lecture);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: lecture?.courseId ?? "",
      levelId: lecture?.levelId ?? "",
      name: lecture?.name ?? "",
      description: lecture?.description ?? "",
      meet_url: lecture?.meetUrl ?? "",
      off2class_url: lecture?.off2classUrl ?? "",
      date: lecture?.date ?? "",
      start_time: lecture?.startTime.substring(0, 5) ?? "",
      end_time: lecture?.endTime.substring(0, 5) ?? "",
    },
  });

  const onSuccessfulSubmit = () => {
    setOpen(false);
    setLecture(undefined);
    form.reset();
    router.refresh();
  };

  // TODO: Error and loading handling for api calls
  const { data: courses } = api.course.getCoursesIds.useQuery();
  const { mutate: editLecture } = api.lecture.editLecture.useMutation({
    onSuccess: onSuccessfulSubmit,
  });
  const { mutate: createLecture } = api.lecture.createLecture.useMutation({
    onSuccess: onSuccessfulSubmit,
  });
  const { mutate: deleteLecture } = api.lecture.deleteLecture.useMutation({
    onSuccess: onSuccessfulSubmit,
  });

  const courseId = form.watch("courseId");

  const { data: levels } = api.level.getCourseLevelsIds.useQuery(
    {
      courseId,
    },
    {
      enabled: Boolean(courseId),
    },
  );

  function onSubmit(values: FormSchema) {
    if (isEditing) {
      editLecture({
        id: lecture?.id,
        ...values,
      });
    } else {
      createLecture(values);
    }
  }

  function onDelete() {
    if (isEditing && lecture) {
      deleteLecture({
        lectureId: lecture.id,
      });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setLecture(undefined);
            form.reset();
          }, 100);
        }

        setOpen(open);
      }}
    >
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar clase" : "Crear clase"}
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogDescription>
                {isEditing
                  ? "Aqui puedes revisar los detalles de la clase"
                  : "Aqui puedes crear una nueva clase"}
              </DialogDescription>
              <div className="mt-4 max-h-[60vh] space-y-2 overflow-y-auto rounded-sm px-2 pb-2">
                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Curso <Required /> <FormMessage />
                      </FormLabel>
                      <Combobox
                        fieldName="curso"
                        values={courses}
                        field={field}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="levelId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Nivel <Required />
                        <FormMessage />
                      </FormLabel>
                      <Combobox
                        fieldName="nivel"
                        values={levels}
                        field={field}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nombre de la clase <Required /> <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Hobbies e intereses" {...field} />
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
                        Descripcion de la clase <Required />
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Notas o comentarios que deseas compartir con tus estudiantes"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="meet_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        URL de Google Meet <Required /> <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://meet.google.com/..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="off2class_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        URL de Off2Class <Required /> <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://off2class.com/..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Fecha <Required /> <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Hora de inicio <Required /> <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="end_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Hora de finalizacion <Required /> <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4 justify-start">
                {isEditing && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="rounded-sm bg-destructive text-destructive-foreground hover:bg-background hover:text-destructive hover:outline hover:outline-1 hover:outline-destructive"
                        type="button"
                      >
                        Eliminar clase
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[470px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {/* Are you absolutely sure? */}
                          ¿Estás completamente seguro?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará la
                          clase y no se podrá recuperar.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            onClick={onDelete}
                            className="rounded-sm bg-destructive text-destructive-foreground hover:bg-background hover:text-destructive hover:outline hover:outline-1 hover:outline-destructive"
                            type="button"
                          >
                            Continuar
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button
                  disabled={!form.formState.isDirty}
                  className="rounded-sm"
                  type="submit"
                >
                  {isEditing ? "Actualizar clase" : "Crear clase"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
