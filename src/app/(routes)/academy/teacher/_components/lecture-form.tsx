"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import Combobox from "./combobox";

export type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  levelId: z.string().uuid({
    message: "Nivel de la clase es requerido",
  }),
  courseId: z.string().uuid({
    message: "Un curso es requerido",
  }),
  name: z
    .string()
    .min(1, {
      message: "Nombre de la clase es requerido",
    })
    .max(25, {
      message: "Nombre de la clase no puede ser mayor a 25 caracteres",
    }),
  description: z
    .string()
    .min(1, {
      message: "Descripción de la clase es requerida",
    })
    .max(255, {
      message: "Descripción de la clase no puede ser mayor a 255 caracteres",
    }),
  meet_url: z.string().url({
    message: "URL de la clase de Google Meet es requerida",
  }),
  off2class_url: z.string().url({
    message: "URL del material de Off2Class es requerida",
  }),
  date: z.string().date(),
  start_time: z.string().time({
    message: "Hora de inicio de la clase es requerida",
  }),
  end_time: z.string().time({
    message: "Hora de finalización de la clase es requerida",
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
  const { data: courses } = api.course.getCoursesIds.useQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: lecture?.level.courseId,
      ...lecture,
    },
  });

  const courseId = form.getValues("courseId");

  const { data: levels } = api.level.getCourseLevelsIds.useQuery(
    {
      courseId,
    },
    {
      refetchOnMount: true,
    },
  );

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
                        Curso <span className="text-primary">*</span>
                      </FormLabel>
                      <Combobox
                        fieldName="curso"
                        values={courses}
                        field={field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="levelId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Nivel <span className="text-primary">*</span>
                      </FormLabel>
                      <Combobox
                        fieldName="nivel"
                        values={levels}
                        field={field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la clase</FormLabel>
                      <FormControl>
                        <Input placeholder="Hobbies e intereses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
