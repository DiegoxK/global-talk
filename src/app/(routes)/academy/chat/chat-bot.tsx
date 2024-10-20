"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowUp, TimerReset } from "lucide-react";
import Combobox from "@/components/ui/combobox";
import { Logo } from "@/vectors/logo";
import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TypingEffect from "./_components/typing";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  userText: z.string(),
  prompt: z.string(),
});

type roles = "system" | "user" | "assistant";

interface ChatBotProps {
  prompts: { label: string; value: string; description: string }[];
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
  const [isThinking, setIsThinking] = useState(false);

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
        setIsThinking(false);
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
      prompt: "",
    },
  });

  const currentPrompt = form.watch("prompt");
  console.log(currentPrompt);

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

    setIsThinking(true);

    form.resetField("userText");
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex h-full w-full flex-col justify-between"
        >
          <div className="flex justify-between ps-4">
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

            <Button
              className="me-4 border border-primary-600 bg-primary text-white"
              size="icon"
              type="button"
              onClick={() => {
                setMessages([]);
                form.reset();
              }}
            >
              <TimerReset className="h-4 w-4" />
            </Button>
          </div>

          {currentPrompt ? (
            <ScrollArea className="flex-grow rounded-sm p-4">
              <div className="mb-4 flex items-start">
                <div className="rounded-lg bg-yellow-100 px-4 py-2 text-yellow-800">
                  {
                    prompts.find((prompt) => prompt.value === currentPrompt)
                      ?.description
                  }
                </div>
              </div>
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
                    className={`rounded-lg ${
                      message.role === "user"
                        ? "bg-gray-100 px-4 py-2 text-gray-800"
                        : message.role === "assistant" &&
                          "bg-purple-100 px-4 py-2 text-stone-800"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <TypingEffect content={message.content} />
                    ) : (
                      message.role === "user" && message.content
                    )}
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
              {isThinking && (
                <div className="mb-6 mt-10 flex h-full w-full items-center justify-center text-white">
                  <div className="loader"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          ) : (
            <div className="mb-10 flex h-full w-full flex-col items-center justify-center gap-5 self-center">
              <Logo className="fill-white" height={70} width={70} />
              <p className="w-[50rem] text-center text-white">
                Globy es un asistente de IA inteligente diseñado para ayudarte a
                mejorar tus habilidades en inglés. Ya sea que estés practicando
                gramática, ampliando tu vocabulario o trabajando en habilidades
                de conversación, Globy ofrece lecciones personalizadas y
                comentarios instantáneos. Puede corregir tus oraciones, explicar
                reglas gramaticales complicadas e incluso ofrecer ejercicios de
                práctica adaptados a tu nivel. ¡Con Globy, aprender inglés se
                vuelve interactivo, divertido y efectivo!
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
                    <Textarea
                      disabled={!currentPrompt}
                      rows={1}
                      cols={1}
                      className="min-h-12 w-full resize-none rounded-none rounded-bl-sm border-none bg-primary text-white placeholder-opacity-25 placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Envía un mensaje a Globy!"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={!currentPrompt}
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
