"use client";

import { type Dispatch, type SetStateAction } from "react";
import type { Lecture } from "@/lib/definitions";

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

import Combobox from "./combobox";
import Required from "@/components/ui/required";
import { Textarea } from "@/components/ui/textarea";

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
  start_time: z.string().time({
    message: "Campo requerido",
  }),
  end_time: z.string().time({
    message: "Campo requerido",
  }),
});

interface LectureFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  lecture: Lecture;
  setLecture: Dispatch<SetStateAction<Lecture | null>>;
}

export default function LectureForm({
  open,
  setOpen,
  lecture,
  setLecture,
}: LectureFormProps) {
  // TODO: Error and loading handling for api calls
  const { data: courses } = api.course.getCoursesIds.useQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: lecture?.level.courseId,
      ...lecture,
    },
  });

  const courseId = form.watch("courseId");

  const { data: levels } = api.level.getCourseLevelsIds.useQuery({
    courseId,
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setLecture(null);
          }, 100);
        }

        setOpen(open);
      }}
    >
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar clase</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogDescription>
                Llena los campos para editar la clase
              </DialogDescription>
              <div className="mt-4 max-h-[60vh] space-y-2 overflow-y-auto rounded-sm px-2 pb-4">
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
                          <Input
                            type="time"
                            {...field}
                            onChange={(e) => {
                              const time = e.currentTarget.value;
                              field.onChange(time + ":00");
                            }}
                          />
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
                          <Input
                            type="time"
                            {...field}
                            onChange={(e) => {
                              const time = e.currentTarget.value;
                              field.onChange(time + ":00");
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={!form.formState.isDirty} type="submit">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
