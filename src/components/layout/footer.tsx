import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-center py-6 gap-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © 2025 VideoRipper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
