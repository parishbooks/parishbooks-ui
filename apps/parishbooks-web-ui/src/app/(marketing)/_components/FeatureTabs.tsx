"use client";

import { useState } from "react";
import { PILLARS } from "../_content/pillars";
import { MarketingCard as Card } from "@parishbooks-ui/site-ui";

export function FeatureTabs() {
  const [activeSlug, setActiveSlug] = useState(PILLARS[0].slug);
  const active = PILLARS.find((pillar) => pillar.slug === activeSlug) ?? PILLARS[0];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Product features">
        {PILLARS.map((pillar) => {
          const isActive = pillar.slug === activeSlug;
          return (
            <button
              key={pillar.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`feature-panel-${pillar.slug}`}
              id={`feature-tab-${pillar.slug}`}
              onClick={() => setActiveSlug(pillar.slug)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{
                background: isActive ? "var(--color-primary)" : "var(--color-muted)",
                color: isActive ? "var(--color-on-primary)" : "var(--color-foreground)",
              }}
            >
              <pillar.icon size={18} weight="regular" aria-hidden="true" />
              {pillar.title}
            </button>
          );
        })}
      </div>

      <Card
        role="tabpanel"
        id={`feature-panel-${active.slug}`}
        aria-labelledby={`feature-tab-${active.slug}`}
        className="mt-8 grid gap-8 p-8 sm:grid-cols-2"
      >
        <div>
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg"
            style={{ backgroundColor: `color-mix(in srgb, ${active.color} 16%, transparent)` }}
          >
            <active.icon size={24} weight="regular" aria-hidden="true" style={{ color: active.color }} />
          </span>
          <h3 className="mt-4 text-xl font-semibold" style={{ color: "var(--color-foreground)" }}>
            {active.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>
            {active.description}
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {active.points.map((point) => (
              <li key={point} className="text-sm" style={{ color: "var(--color-foreground)" }}>
                · {point}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex min-h-40 items-center justify-center rounded-lg p-6"
          style={{ background: "var(--color-muted)" }}
        >
          <span className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
            {active.title} preview
          </span>
        </div>
      </Card>
    </div>
  );
}
