"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/lib/definitions";
import { Logo } from "@/vectors/logo";

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

interface ProfileFormProps {
  user: User;
}

const formSchema = z.object({
  imageUrl: z.string().url(),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.image ?? "",
    },
  });

  const { mutate: updateUser, isPending } = api.user.updateUser.useMutation({
    onSuccess: () => {
      form.control._defaultValues.name = form.getValues("name");
      form.control._defaultValues.lastName = form.getValues("lastName");
      form.control._defaultValues.email = form.getValues("email");
      form.control._defaultValues.imageUrl = form.getValues("imageUrl");

      form.reset();
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser({
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      img: values.imageUrl,
    });
  }

  return (
    <div className="flex py-5">
      <div>
        <div className="flex w-fit flex-col items-center gap-4 rounded-md border px-4 py-6">
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
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ( url ) Imagen de perfil <Required /> <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
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
  );
}
