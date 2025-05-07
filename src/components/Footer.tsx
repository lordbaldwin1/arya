import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <Link
            prefetch={true}
            href="/"
            className="text-xl font-bold text-foreground hover:text-accent-foreground transition-colors"
          >
            Arya
          </Link>
          <div className="flex gap-6">
            <Link
              prefetch={true}
              href="/all"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              All Items
            </Link>
            <Link
              prefetch={true}
              href="/categories"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Categories
            </Link>
            <Link
              prefetch={true}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </Link>
          </div>
          <div className="text-xs text-muted-foreground">
            © 2025 Arya Jewelry. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
