import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Academy",
  description: "Production SaaS platform for AI education.",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/courses", label: "Courses" },
  { href: "/prompts", label: "Prompts" },
  { href: "/pricing", label: "Pricing" },
  { href: "/certifications", label: "Certs" },
  { href: "/careers", label: "Careers" },
  { href: "/login", label: "Login" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b bg-card">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-base font-semibold">
                AI Academy
              </Link>
              <nav className="flex items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
          <footer className="mx-auto max-w-7xl px-6 pb-8 text-xs text-muted-foreground">
            <Link
              href="/legacy-prototype"
              prefetch={false}
              className="hover:text-foreground"
            >
              Legacy prototype
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
