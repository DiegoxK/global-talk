import MainNav from "./navigation/main-nav";
import MobileNav from "./navigation/mobile-nav";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="mx-4 flex h-14 items-center">
        <div className="flex w-full items-center justify-between">
          <MainNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
