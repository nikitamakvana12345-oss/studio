import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 py-6">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <Link href="/about-us" className="transition-colors hover:text-primary">About Us</Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-primary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-primary">Terms of Service</Link>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © 2025 VideoRipper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
