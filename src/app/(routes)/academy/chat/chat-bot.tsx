"use client";

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
import { ArrowUp } from "lucide-react";
import Combobox from "@/components/ui/combobox";

const formSchema = z.object({
  userText: z.string(),
  prompt: z.string(),
});

interface ChatBotProps {
  prompts: { label: string; value: string }[];
}

export default function ChatBot({ prompts }: ChatBotProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userText: "",
      prompt: prompts[0]?.value ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col justify-between"
        >
          <div className="flex justify-end p-4">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Combobox
                    className="border-primary-600 bg-primary text-white"
                    fieldName="prompt"
                    values={prompts}
                    field={field}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className="flex">
            <FormField
              control={form.control}
              name="userText"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="w-full rounded-none rounded-bl-sm border-none bg-primary py-6 text-white placeholder-opacity-25 placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Envía un mensaje a Globy!"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="flex h-full w-14 items-center justify-center rounded-none rounded-br-sm"
              size="icon"
              type="submit"
            >
              <ArrowUp />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
