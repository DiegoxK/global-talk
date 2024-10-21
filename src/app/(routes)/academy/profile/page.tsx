import { getServerAuthSession } from "@/server/auth";
import ProfileForm from "./_components/profile-form";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default async function UserSettings() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  return (
    <div className="my-4">
      <h1 className="text-xl font-bold text-primary">
        Configuracion del perfil
      </h1>
      <Separator />
      <ProfileForm user={session.user} />
    </div>
  );
}
