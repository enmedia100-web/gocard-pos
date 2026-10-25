import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { downloadHref } from "@/lib/downloads";
import { SOURCE_URL, UPSTREAM_NAME, UPSTREAM_URL } from "@/lib/brand";

const columns = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#security", label: "Security" },
      { href: "#get-started", label: "Get started" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: downloadHref("github"), label: "GitHub" },
      { href: "/docs/api", label: "API & MCP" },
      { href: "/docs/accessibility", label: "Accessibility statement" },
      { href: "/docs/compliance-india", label: "India compliance notes" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/signup", label: "Create account" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="text-sm font-semibold text-foreground">GoCard POS</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Offline-first restaurant management for Bangladesh, on your own
              server. Based on{" "}
              <a href={UPSTREAM_URL} className="underline hover:text-foreground">
                {UPSTREAM_NAME}
              </a>{" "}
              by Nodedr Infotech Private Limited.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {col.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            GoCard POS &copy; {new Date().getFullYear()} GoCard BD. Original work &copy; Nodedr Infotech Private
            Limited and Raktim Ranjit. Licensed AGPL-3.0 &middot;{" "}
            <a href={SOURCE_URL} className="underline hover:text-foreground">
              Source code
            </a>
          </p>
          <p className="text-xs text-muted-foreground">Made for Bangladesh.</p>
        </div>
      </div>
    </footer>
  );
}
