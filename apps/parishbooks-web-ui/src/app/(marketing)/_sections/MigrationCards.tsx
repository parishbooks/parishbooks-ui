import { FileArrowUp, ArrowsClockwise, FileText } from "@phosphor-icons/react/ssr";
import { Container, MarketingCard as Card } from "@parishbooks-ui/site-ui";
import { Reveal, Stagger, StaggerItem } from "../_components/Reveal";

const paths = [
  {
    icon: FileArrowUp,
    color: "var(--color-accent-indigo)",
    title: "From spreadsheets",
    description:
      "Import your existing member list and giving history from Excel or Google Sheets — no manual re-entry.",
  },
  {
    icon: ArrowsClockwise,
    color: "var(--color-accent-emerald)",
    title: "From another system",
    description:
      "Bring your data over from another church-management system without losing giving or member history.",
  },
  {
    icon: FileText,
    color: "var(--color-accent-amber)",
    title: "From paper records",
    description:
      "Moving off physical ledgers and paper forms? We help you get your records digitized and into the ledger.",
  },
];

export function MigrationCards() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ color: "var(--color-foreground)" }}>
            Smooth transition, no data loss
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-3">
          {paths.map((path) => (
            <StaggerItem key={path.title}>
              <Card className="h-full p-6">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `color-mix(in srgb, ${path.color} 16%, transparent)` }}
                >
                  <path.icon size={24} weight="regular" aria-hidden="true" style={{ color: path.color }} />
                </span>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: "var(--color-foreground)" }}>
                  {path.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>
                  {path.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
