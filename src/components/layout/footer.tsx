import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 py-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground md:order-1">
          © {new Date().getFullYear()} VideoRipper. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground md:order-2">
            <Link href="/about-us" className="transition-colors hover:text-primary">About Us</Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-primary">Privacy and Policy</Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-primary">Terms and Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
