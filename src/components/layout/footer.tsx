export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex items-center justify-center py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} VideoRipper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
