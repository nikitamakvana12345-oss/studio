import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 py-8">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/about-us" className="transition-colors hover:text-primary">About Us</Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-primary">Privacy and Policy</Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-primary">Terms and Conditions</Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Media Bitesz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
