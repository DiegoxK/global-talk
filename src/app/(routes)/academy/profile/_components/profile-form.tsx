"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/lib/definitions";
import { Logo } from "@/vectors/logo";

import Gravatar from "../../../../../../public/gravatar/logo.png";

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import Required from "@/components/ui/required";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, PencilLine } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

interface ProfileFormProps {
  user: User;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(50),
  lastName: z
    .string()
    .min(1, {
      message: "Campo requerido",
    })
    .max(50),
  email: z.string().email({
    message: "Campo requerido",
  }),
});

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [updatingImg, setUpdatingImg] = useState(false);
  const [imageError, setImageError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    },
  });

  const { mutate: updateUser, isPending } = api.user.updateUser.useMutation({
    onSuccess: () => {
      form.control._defaultValues.name = form.getValues("name");
      form.control._defaultValues.lastName = form.getValues("lastName");
      form.control._defaultValues.email = form.getValues("email");

      toast({
        title: "Perfil actualizado",
        description: "Los cambios se han guardado correctamente",
        duration: 4000,
      });

      form.reset();
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error al actualizar perfil",
        description: error.message,
        duration: 4000,
      });
    },
  });

  const {
    mutate: updateProfileImage,
    isSuccess,
    isPending: updateProfileImagePending,
  } = api.user.updateProfileImage.useMutation({
    onSuccess: () => {
      console.log("actualizado");
    },
    onError: (error) => {
      console.error(error);
      setImageError(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Actualizando perfil",
      description:
        "Por favor espera un momento mientras se actualiza el perfil",
      duration: 10000000,
    });

    updateUser({
      name: values.name,
      lastName: values.lastName,
      email: values.email,
    });
  }

  return (
    <>
      <AlertDialog open={updatingImg} onOpenChange={setUpdatingImg}>
        <AlertDialogContent className="w-[470px]">
          {updateProfileImagePending ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Actualizando imagen de perfil
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Por favor espera un momento mientras se busca tu perfil de
                  gravatar
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="loader-the-progress"></div>
            </>
          ) : isSuccess ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Imagen de gravatar encontrada!
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Tu imagen de perfil ha sido actualizada correctamente. Los
                  cambios pueden tardar un momento en reflejarse.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Error al actualizar imagen de perfil
                </AlertDialogTitle>
                {imageError ? (
                  <AlertDialogDescription>{imageError}</AlertDialogDescription>
                ) : (
                  <AlertDialogDescription>
                    Ocurrió un error al intentar actualizar la imagen de perfil.
                    Por favor intenta de nuevo mas tarde.
                  </AlertDialogDescription>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Actualizar imagen de perfil
            </DialogTitle>
            <DialogDescription className="text-center">
              Para actualizar la imagen de perfil, debes crear una cuenta de{" "}
              <Link
                className="font-bold text-primary-600"
                href="https://gravatar.com/profile"
                target="_blank"
              >
                gravatar
              </Link>{" "}
              y subirla a tu perfil.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-4 rounded-md border border-primary-600 bg-primary-50 p-4">
            <Link
              className="text-primary-600"
              href="https://gravatar.com/profile"
              target="_blank"
            >
              <Image
                className="select-none"
                src={Gravatar}
                alt="Gravatar"
                width={120}
                height={120}
              />
            </Link>

            <ArrowRight className="h-20 w-20 text-primary-400" />
            <Logo className="fill-primary" height={120} width={120} />
          </div>
          <p className="px-5 text-center text-sm font-bold text-primary-800">
            Recuerda registrar el mismo correo electrónico que tu cuenta de
            Global Talk.
          </p>
          <Button
            className="w-full"
            onClick={() => {
              updateProfileImage();
              setUpdatingImg(true);
            }}
          >
            Verificar y actualizar
          </Button>
        </DialogContent>
      </Dialog>

      <div className="flex py-5">
        <div>
          <div className="relative flex w-fit flex-col items-center gap-4 rounded-md border px-4 py-6">
            <div
              className="absolute right-3 top-3 cursor-pointer rounded-full bg-primary-600 p-2 text-white hover:bg-primary-700"
              onClick={() => setDialogOpen(true)}
            >
              <PencilLine className="h-5 w-5" />
            </div>
            <Avatar className="mx-6 h-36 w-36 bg-primary">
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback className="bg-transparent">
                <Logo className="fill-white" height={40} width={38} />
              </AvatarFallback>
            </Avatar>
            <Separator />
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-primary">
                {user.name} {user.lastName}
              </h3>
              <p>{user.email}</p>
              <p>{user.city}</p>
            </div>
          </div>
        </div>
        <div className="w-full px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <Required /> <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Jose" {...field} />
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
                      <Input placeholder="Santos" {...field} />
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
                        placeholder="ejemplo@globtm.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  disabled={
                    !form.formState.isValid ||
                    !form.formState.isDirty ||
                    isPending
                  }
                  className="px-14"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
