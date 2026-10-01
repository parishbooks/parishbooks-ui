"use client";

import Link from "next/link";
import { PILLARS } from "../_content/pillars";

export function MegaMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  if (!open) return null;

  return (
    <div
      className="absolute left-0 top-full w-full border-b shadow-sm"
      style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
      role="menu"
      aria-label="Product"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:px-8">
        {PILLARS.map((pillar) => (
          <Link
            key={pillar.slug}
            href="#features"
            onClick={onNavigate}
            role="menuitem"
            className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-(--color-muted)"
          >
            <span
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `color-mix(in srgb, ${pillar.color} 16%, transparent)` }}
            >
              <pillar.icon size={20} weight="regular" aria-hidden="true" style={{ color: pillar.color }} />
            </span>
            <span>
              <span className="block text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
                {pillar.title}
              </span>
              <span className="block text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                {pillar.menuBlurb}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
