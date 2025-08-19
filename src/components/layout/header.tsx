"use client";

import Link from "next/link";
import { DownloadCloud, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState, Suspense } from "react";
import { NavigationBar } from "./navigation-bar";
import { ThemeToggle } from "../theme-toggle";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 pl-8">
          <DownloadCloud className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Media Bitesz</span>
        </Link>
        
        <div className="flex items-center justify-end gap-4">
           <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Suspense>
              <NavigationBar onLinkClick={() => {}} />
            </Suspense>
          </nav>
           <ThemeToggle />
           <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col p-4">
                  <Link href="/" className="flex items-center gap-2 mb-4">
                    <DownloadCloud className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold">Media Bitesz</span>
                  </Link>
                  <div className="flex flex-col items-start gap-4">
                    <Suspense>
                      <NavigationBar onLinkClick={() => setIsMobileMenuOpen(false)} isMobile />
                    </Suspense>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
           </div>
        </div>
      </div>
    </header>
  );
}
