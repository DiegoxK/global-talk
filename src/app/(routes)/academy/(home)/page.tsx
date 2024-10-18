import { getServerAuthSession } from "@/server/auth";
import FirstTimeHome from "./_components/first-time-home";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function Home() {
  const userHomeInfo = await api.user.getUserHomeInfo();

  if (userHomeInfo) {
    return <FirstTimeHome {...userHomeInfo} />;
  }
}
