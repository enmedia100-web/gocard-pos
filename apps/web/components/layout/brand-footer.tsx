import { Code2, LifeBuoy } from "lucide-react";
import { BRAND_NAME, SOURCE_URL, SUPPORT_URL } from "@/lib/brand";

export function BrandFooter() {
  return (
    <div className="flex flex-col gap-2 border-t border-sidebar-border px-4 py-3">
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 rounded-lg border border-sidebar-border px-3 py-1.5 text-xs font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <LifeBuoy className="h-3.5 w-3.5" />
        Contact support
      </a>
      <div className="flex items-center justify-between gap-2 text-xs font-medium leading-tight text-sidebar-foreground/70">
        <span>{BRAND_NAME}</span>
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-sidebar-foreground hover:underline"
        >
          <Code2 className="h-3.5 w-3.5" />
          Source code (AGPL)
        </a>
      </div>
    </div>
  );
}
