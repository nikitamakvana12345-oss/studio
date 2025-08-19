import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center gap-4 py-8">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms-of-service" className="transition-colors hover:text-primary">Terms and Conditions</Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-primary">Privacy and Policy</Link>
            <Link href="/about-us" className="transition-colors hover:text-primary">About Us</Link>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Media Bitesz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
