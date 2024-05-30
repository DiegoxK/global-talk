import { Logo } from "@/vectors/logo";
import MainNav, { NavLink } from "./navigation/main-nav";
import MobileNav from "./navigation/mobile-nav";

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-6 flex items-center py-6 md:mx-10">
        <div className="flex w-full items-center justify-between">
          <NavLink
            href="/"
            className="mr-6 flex items-center space-x-2 text-3xl font-semibold text-primary"
          >
            <Logo className="me-1 fill-primary" width={38} height={40} />
            lobal Talk Medallo
          </NavLink>
          <MainNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
