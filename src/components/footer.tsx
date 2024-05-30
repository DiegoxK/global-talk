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
    <footer className="border-t-3 border-foreground px-10 pb-8 pt-16">
      <div className="mb-10 grid grid-cols-2">
        <div className="space-y-10">
          <div>
            <p className="text-xl font-bold">Global Talk Medallo</p>
            <p>
              Convierte el inglés en una herramienta para alcanzar tus sueños.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="border-3 rounded-md border-primary-900 bg-primary-700 p-1">
                <Mail className="fill-white" />
              </div>
              <p>contacto@globtm.co</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="border-3 rounded-md border-primary-900 bg-primary-700 p-1">
                <Phone className="fill-white" />
              </div>
              <p>+57 310 000 0000</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="border-3 rounded-md border-primary-900 bg-primary-700 p-1">
                <Location className="fill-white" />
              </div>
              <p>Medellín, Colombia.</p>
            </div>
          </div>
        </div>
        <nav>
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
      <Separator className="bg-black" />
      <div className="my-4 grid grid-cols-2">
        <div className="flex items-center gap-2">
          <NavLink href="/t&c">Términos del servicio</NavLink>
          <div>|</div>
          <NavLink href="/t&c#privacy">Política de privacidad</NavLink>
          <div>|</div>
          <NavLink href="/t&c#cookies">Política de Cookies</NavLink>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="border-3 rounded-md border-primary-900 bg-primary-700 p-2">
            <Facebook className="fill-white" />
          </div>
          <div className="border-3 rounded-md border-primary-900 bg-primary-700 p-2">
            <Instagram className="fill-white" />
          </div>
          <div className="border-3 rounded-md border-primary-900 bg-primary-700 p-2">
            <Linkedin className="fill-white" />
          </div>
        </div>
      </div>
      <Separator className="bg-black" />
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
      <Link href={url} className="font-extrabold hover:text-primary">
        {label}
      </Link>
      <div className="flex flex-col">
        {subLinks.map((subLink, index) => (
          <NavLink key={index} href={subLink.url}>
            {subLink.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
