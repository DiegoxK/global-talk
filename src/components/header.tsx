import MainNav from "./navigation/main-nav";
import MobileNav from "./navigation/mobile-nav";

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-10 flex items-center py-6">
        <div className="flex w-full items-center justify-between">
          <MainNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
