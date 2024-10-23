"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  sessionRecording: z.string().url().min(1, {
    message: "Campo requerido",
  }),
});

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

interface EndClassDialogProps {
  lectureSessionId?: string;
  endLectureDialog: boolean;
  setEndLectureDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EndClassDialog({
  lectureSessionId,
  endLectureDialog,
  setEndLectureDialog,
}: EndClassDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sessionRecording: "",
    },
  });

  const { mutate: endLectureSession } =
    api.lectureSession.endLectureSession.useMutation({
      onSuccess: () => {
        setEndLectureDialog(false);
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (lectureSessionId) {
      endLectureSession({
        lectureSessionId: lectureSessionId,
        sessionRecording: values.sessionRecording,
      });
    }
  }

  return (
    <AlertDialog open={endLectureDialog} onOpenChange={setEndLectureDialog}>
      <AlertDialogContent className="w-[470px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>Alerta!</AlertDialogTitle>
              <AlertDialogDescription>
                Para finalizar la clase debes de tener acceso al enlace de
                acceso a la grabacion.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name="sessionRecording"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>
                    Link de la grabacion <Required /> <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://drive.google.com/file/d/..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button
                className="rounded-sm bg-indigo-600 hover:bg-background hover:text-indigo-600 hover:outline hover:outline-1 hover:outline-indigo-600"
                type="submit"
              >
                Continuar
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
