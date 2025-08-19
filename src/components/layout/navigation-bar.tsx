"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms & Condition" },
  { href: "/about-us", label: "About Us" },
];

export function NavigationBar({ onLinkClick, isMobile }: { onLinkClick: () => void, isMobile?: boolean }) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={cn(
            isMobile
              ? "text-base"
              : "transition-colors hover:text-primary whitespace-nowrap",
            pathname === link.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
