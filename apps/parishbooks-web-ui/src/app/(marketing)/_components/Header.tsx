"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Container, LinkButton as Button, SiteBrand } from "@parishbooks-ui/site-ui";
import Link from "next/link";
import { NAV_ITEMS, GET_STARTED_HREF } from "../_content/nav";
import { useActiveSection } from "./useActiveSection";
import { MegaMenu } from "./MegaMenu";

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));

export function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  return (
    <header
      className="sticky top-0 z-40 border-b relative"
      style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
    >
      <Container className="flex h-16 items-center justify-between">
        <SiteBrand href="/" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.replace("#", "");
            if (item.type === "menu") {
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="text-sm font-medium transition-colors hover:opacity-70"
                  style={{ color: isActive || menuOpen ? "var(--color-primary)" : "var(--color-foreground)" }}
                >
                  {item.label}
                </button>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: isActive ? "var(--color-primary)" : "var(--color-foreground)" }}
              >
                {item.label}
              </Link>
            );
          })}
          <MegaMenu open={menuOpen} onNavigate={() => setMenuOpen(false)} />
        </nav>

        <div className="hidden md:block">
          <Button href={GET_STARTED_HREF}>Get Started</Button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={24} aria-hidden="true" style={{ color: "var(--color-foreground)" }} />
          ) : (
            <List size={24} aria-hidden="true" style={{ color: "var(--color-foreground)" }} />
          )}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t md:hidden"
          style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium"
                style={{ color: "var(--color-foreground)" }}
              >
                {item.label}
              </Link>
            ))}
            <Button href={GET_STARTED_HREF} className="mt-2 w-full" onClick={() => setOpen(false)}>
              Get Started
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
