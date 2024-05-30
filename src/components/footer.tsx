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

export default function Footer() {
  return (
    <footer className="mx-10 py-6">
      <div className="grid grid-cols-2">
        <div>
          <div>
            <p>Global Talk Medallo</p>
            <p>
              Convierte el inglés en una herramienta para alcanzar tus sueños.
            </p>
          </div>
          <div className="flex">
            <Mail />
            <p>contacto@globtm.co</p>
          </div>
          <div className="flex">
            <Phone />
            <p>+57 310 000 0000</p>
          </div>
          <div className="flex">
            <Location />
            <p>Medellín, Colombia.</p>
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
      <Separator />
      <div className="grid grid-cols-2">
        <div className="flex">
          <NavLink href="/t&c">Términos del servicio</NavLink>
          <div>|</div>
          <NavLink href="/t&c#privacy">Política de privacidad</NavLink>
          <div>|</div>
          <NavLink href="/t&c#cookies">Política de Cookies</NavLink>
        </div>

        <div className="flex justify-end">
          <Facebook />
          <Instagram />
          <Linkedin />
        </div>
      </div>
      <Separator />
      <div className="text-center font-extralight">
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
      <NavLink href={url} className="font-extrabold">
        {label}
      </NavLink>
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
