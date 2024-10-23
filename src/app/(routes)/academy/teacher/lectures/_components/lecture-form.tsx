"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import type { TeacherLectureSession } from "@/lib/definitions";

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

import Combobox from "@/components/ui/combobox";
import Required from "@/components/ui/required";
import { useRouter } from "next/navigation";
import EndClassDialog from "./end-class-dialog";

export type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  groupId: z.number({
    message: "Campo requerido",
  }),
  programId: z.string({
    message: "Campo requerido",
  }),
  levelId: z.string().uuid({
    message: "Campo requerido",
  }),
  lectureId: z.string().uuid({
    message: "Campo requerido",
  }),
  meetUrl: z
    .string()
    .url({
      message: "Campo requerido",
    })
    .max(255, {
      message: "No puede ser mayor a 255 caracteres",
    }),
  off2classId: z
    .string({
      message: "Campo requerido",
    })
    .max(255, {
      message: "No puede ser mayor a 25 caracteres",
    }),
  date: z.string().date(),
  startTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Campo requerido",
  }),
  endTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Campo requerido",
  }),
});

interface LectureFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  lectureSession: TeacherLectureSession | null;
  setLecture: Dispatch<
    SetStateAction<TeacherLectureSession | undefined | null>
  >;
}

export default function LectureForm({
  open,
  setOpen,
  lectureSession,
  setLecture,
}: LectureFormProps) {
  const router = useRouter();
  const isEditing = Boolean(lectureSession);

  const [staendLectureDialogte, setEndLectureDialog] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programId: lectureSession?.programId ?? "",
      levelId: lectureSession?.levelId ?? "",
      lectureId: lectureSession?.lectureId ?? "",
      groupId: lectureSession?.groupId ?? -1,
      meetUrl: lectureSession?.meetUrl ?? "",
      off2classId: lectureSession?.off2classUrl ?? "",
      date: lectureSession?.date ?? "",
      startTime: lectureSession?.startTime.substring(0, 5) ?? "",
      endTime: lectureSession?.endTime.substring(0, 5) ?? "",
    },
  });

  const onSuccessfulSubmit = () => {
    setOpen(false);
    setLecture(undefined);
    form.reset();
    router.refresh();
  };

  // TODO: Error and loading handling for api calls
  const { data: programs } = api.program.getProgramsIds.useQuery();
  const { data: groups } = api.groups.getgroups.useQuery();

  const { mutate: editLectureSession } =
    api.lectureSession.editLectureSession.useMutation({
      onSuccess: onSuccessfulSubmit,
    });

  const { mutate: createLectureSession } =
    api.lectureSession.createLectureSession.useMutation({
      onSuccess: onSuccessfulSubmit,
    });

  const { mutate: deleteLectureSession } =
    api.lectureSession.deleteLectureSession.useMutation({
      onSuccess: onSuccessfulSubmit,
    });

  const programId = form.watch("programId");

  const { data: levels } = api.level.getProgramLevelIds.useQuery(
    {
      programId,
    },
    {
      enabled: Boolean(programId),
    },
  );

  const levelId = form.watch("levelId");

  const { data: lectures } = api.lectures.getLevelLectureIds.useQuery(
    {
      levelId,
    },
    {
      enabled: Boolean(levelId),
    },
  );

  function onSubmit(values: FormSchema) {
    if (isEditing) {
      editLectureSession({
        id: lectureSession?.id,
        ...values,
      });
    } else {
      createLectureSession(values);
    }
  }

  function onDelete() {
    if (isEditing && lectureSession) {
      deleteLectureSession({
        lectureSessionId: lectureSession.id,
      });
    }
  }

  console.log(form.formState.errors);

  return (
    <>
      <EndClassDialog
        lectureSessionId={lectureSession?.id}
        endLectureDialog={staendLectureDialogte}
        setEndLectureDialog={setEndLectureDialog}
      />
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
                    name="groupId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Grupo <Required /> <FormMessage />
                        </FormLabel>
                        <Combobox
                          fieldName="grupo"
                          values={groups}
                          field={field}
                        />
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
                    name="lectureId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Clase <Required />
                          <FormMessage />
                        </FormLabel>
                        <Combobox
                          fieldName="clase"
                          values={lectures}
                          field={field}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meetUrl"
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
                    name="off2classId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Id de la clase de Off2Class <Required />{" "}
                          <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
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
                      name="startTime"
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
                      name="endTime"
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
                    <Button
                      onClick={() => {
                        setEndLectureDialog(true);
                      }}
                      className="rounded-sm bg-indigo-600 hover:bg-background hover:text-indigo-600 hover:outline hover:outline-1 hover:outline-indigo-600"
                      type="button"
                    >
                      Finalizar clase
                    </Button>
                  )}
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
    </>
  );
}
