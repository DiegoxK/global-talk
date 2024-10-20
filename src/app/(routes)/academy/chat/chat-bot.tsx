"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";
import Combobox from "@/components/ui/combobox";
import { Logo } from "@/vectors/logo";
import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  userText: z.string(),
  prompt: z.string(),
});

type roles = "system" | "user" | "assistant";

interface ChatBotProps {
  prompts: { label: string; value: string }[];
  userImage?: string | null;
  userName?: string | null;
}

export default function ChatBot({
  prompts,
  userImage,
  userName,
}: ChatBotProps) {
  const [messages, setMessages] = useState<{ role: roles; content: string }[]>(
    [],
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { mutate: getAiResponse } = api.prompt.getAiResponse.useMutation({
    onSuccess: (message) => {
      if (message) {
        setMessages([
          ...messages,
          {
            role: "assistant",
            content: message,
          },
        ]);
      }
    },
  });

  useEffect(() => {
    if (messages[messages.length - 1]?.role === "user") {
      getAiResponse({
        messages,
      });
    }

    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [messages, getAiResponse]);

  const areMessages = Boolean(messages.length);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userText: "",
      prompt: prompts[0]?.value ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (areMessages) {
      setMessages([
        ...messages,
        {
          role: "user",
          content: values.userText,
        },
      ]);
    } else {
      setMessages([
        {
          role: "system",
          content: values.prompt,
        },
        {
          role: "user",
          content: values.userText,
        },
      ]);
    }

    form.resetField("userText");
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col justify-between"
        >
          <div className="flex ps-4 pt-4">
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

          {areMessages ? (
            <ScrollArea className="flex-grow rounded-sm p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex items-start ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="mr-2">
                      <AvatarImage src="/ai/globy.jpg" alt={message.role} />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "system"
                        ? "bg-yellow-100 text-yellow-800"
                        : message.role === "user"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-purple-100 text-stone-800"
                    }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="ml-2">
                      <AvatarImage
                        src={userImage ? userImage : undefined}
                        alt={message.role}
                      />
                      <AvatarFallback>
                        {userName
                          ? userName[0]?.toUpperCase()
                          : message.role[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          ) : (
            <div className="mb-10 flex h-full w-full flex-col items-center justify-center gap-5 self-center">
              <Logo className="fill-white opacity-70" height={70} width={70} />
              <p className="w-[50rem] text-center text-white opacity-70">
                Globy is a smart AI assistant designed to help you improve your
                English skills. Whether you&apos;re practicing grammar,
                expanding your vocabulary, or working on conversation skills,
                Globy provides personalized lessons and instant feedback. It can
                correct your sentences, explain tricky grammar rules, and even
                offer practice exercises tailored to your level. With Globy,
                learning English becomes interactive, fun, and effective!
              </p>
            </div>
          )}
          <div className="flex justify-self-end">
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
