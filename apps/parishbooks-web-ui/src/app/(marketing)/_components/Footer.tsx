import Link from "next/link";
import { Container } from "@parishbooks-ui/site-ui";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#get-started" },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--color-inverse-background)" }}>
      <Container className="grid gap-10 py-12 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <span className="text-lg font-semibold" style={{ color: "var(--color-inverse-foreground)" }}>
            ParishBooks
          </span>
          <p className="mt-2 max-w-xs text-sm" style={{ color: "var(--color-inverse-muted)" }}>
            Ledger, CRM, and giving software built for church treasurers.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.heading}>
            <h3 className="text-sm font-semibold" style={{ color: "var(--color-inverse-foreground)" }}>
              {column.heading}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:opacity-70"
                    style={{ color: "var(--color-inverse-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="border-t py-6" style={{ borderColor: "var(--color-inverse-border)" }}>
        <p className="text-xs" style={{ color: "var(--color-inverse-muted)" }}>
          © {new Date().getFullYear()} ParishBooks. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
