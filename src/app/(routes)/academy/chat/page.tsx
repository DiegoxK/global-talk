import { api } from "@/trpc/server";
import ChatBot from "./chat-bot";
import { getServerAuthSession } from "@/server/auth";

export default async function Chat() {
  const prompts = await api.prompt.getPrompts();
  const session = await getServerAuthSession();

  // TODO: If user is not active, redirect to the dashboard

  return (
    <div className="bg-pattern my-4 h-[calc(100vh-10.5rem)] rounded-sm">
      <ChatBot
        prompts={prompts}
        userImage={session?.user?.image}
        userName={session?.user?.name}
      />
    </div>
  );
}
