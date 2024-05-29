"use client";
import { useState } from "react";
import { NavLink } from "./main-nav";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { siteConfig } from "@/config";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu size={22} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <NavLink
          href="/"
          toggleOpen={setOpen}
          className="mr-6 flex items-center space-x-2"
        >
          G
        </NavLink>
        <ScrollArea className="my-4 h-[calc(100vh-6rem)] pl-6">
          <nav className="flex flex-col space-y-3">
            {siteConfig.navigation.map((link) => (
              <NavLink
                key={link.url}
                href={link.url}
                toggleOpen={setOpen}
                className="w-full"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
