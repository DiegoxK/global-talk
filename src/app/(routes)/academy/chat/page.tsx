import { api } from "@/trpc/server";
import ChatBot from "./chat-bot";

export default async function Chat() {
  const prompts = await api.prompt.getPrompts();

  return (
    <div className="bg-pattern my-4 h-[calc(100vh-10.5rem)] rounded-sm">
      <ChatBot prompts={prompts} />
    </div>
  );
}
