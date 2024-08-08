import {
  Facebook,
  Instagram,
  Linkedin,
  Location,
  Mail,
  Phone,
} from "@/vectors/miscellaneous";
import { NavLink } from "@/components/navigation/main-nav";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border px-10 pb-8 pt-16">
      <div className="mb-10 grid md:grid-cols-2">
        <div className="space-y-10">
          <div className="md:me-10">
            <p className="text-xl font-bold text-primary">
              Global Talk Medallo
            </p>
            <p>
              Convierte el inglés en una herramienta para alcanzar tus sueños.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-2">
                <Mail className="fill-white" />
              </div>
              <p>contacto@globtm.co</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-2">
                <Phone className="fill-white" />
              </div>
              <p>+57 310 000 0000</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-2">
                <Location className="fill-white" />
              </div>
              <p>Medellín, Colombia.</p>
            </div>
          </div>
        </div>
        <nav className="hidden md:block">
          <div className="grid grid-cols-4">
            {siteConfig.navigation.map((link) => (
              <FooterLinks
                key={link.url}
                label={link.label}
                url={link.url}
                subLinks={link.subLinks}
              />
            ))}
          </div>
        </nav>
      </div>
      <Separator />
      <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="flex items-center justify-center gap-2 text-center text-black/60 md:col-span-3 md:justify-start">
          <NavLink className="text-black/60" href="/t&c">
            Términos del servicio
          </NavLink>
          <div>|</div>
          <NavLink className="text-black/60" href="/t&c#privacy">
            Política de privacidad
          </NavLink>
          <div>|</div>
          <NavLink className="text-black/60" href="/t&c#cookies">
            Política de Cookies
          </NavLink>
        </div>

        <div className="flex items-center justify-center gap-2 md:col-span-1 md:justify-end">
          <div className="rounded-md bg-primary p-3">
            <Facebook className="fill-white" />
          </div>
          <div className="rounded-md bg-primary p-3">
            <Instagram className="fill-white" />
          </div>
          <div className="rounded-md bg-primary p-3">
            <Linkedin className="fill-white" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="mt-8 text-center font-extralight">
        <p>Copyright &copy; [2024] Global Talk Medallo. All rights reserved.</p>
      </div>
    </footer>
  );
}

interface NavigationLink {
  label: string;
  url: string;
}

interface FooterLinksProps extends NavigationLink {
  subLinks: NavigationLink[];
}

const FooterLinks = ({ label, url, subLinks }: FooterLinksProps) => {
  return (
    <div>
      <Link
        href={url}
        className="font-extrabold text-primary hover:text-primary-600"
      >
        {label}
      </Link>
      <div className="flex flex-col">
        {subLinks.map((subLink, index) => (
          <NavLink
            className="w-[150px] text-black/60"
            key={index}
            href={subLink.url}
          >
            {subLink.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
