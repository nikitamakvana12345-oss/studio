import Link from "next/link";
import { DownloadCloud } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <div className="flex items-center gap-2">
           <Link href="/" className="flex items-center space-x-2">
              <DownloadCloud className="h-6 w-6 text-primary" />
              <span className="font-bold">VideoRipper</span>
            </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} VideoRipper. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/about-us" className="transition-colors hover:text-primary">About</Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-primary">Privacy</Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-primary">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
