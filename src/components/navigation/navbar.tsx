"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import schoolData from "@/data/data.json";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { school, navigation } = schoolData;

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg p-1"
          >
            <Image
              src={school.logo}
              alt={`${school.name} Logo`}
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-bold text-lg tracking-tight text-primary">
              {school.shortName}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={`${navigationMenuTriggerStyle()} focus-visible:ring-2 focus-visible:ring-ring`}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/#about"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          >
            <Button
              variant="default"
              size="sm"
              className="rounded-full px-5 focus-visible:ring-0"
            >
              Contact Us
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-0">
              <SheetHeader className="border-b px-6 py-5">
                <SheetTitle className="flex items-center gap-3 text-lg">
                  <Image
                    src={school.logo}
                    alt={`${school.name} Logo`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col leading-tight text-left">
                    <span className="font-bold text-primary">
                      {school.shortName}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Dharma Bhakti Tomohon
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 py-4 flex-1">
                {navigation.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-[background-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="border-t px-6 py-5">
                <Link
                  href="/#about"
                  onClick={() => setIsOpen(false)}
                  className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Button className="w-full rounded-full">Contact Us</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
