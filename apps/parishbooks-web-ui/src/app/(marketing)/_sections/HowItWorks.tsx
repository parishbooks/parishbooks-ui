import { Container } from "@parishbooks-ui/site-ui";
import { Reveal, Stagger, StaggerItem } from "../_components/Reveal";

const steps = [
  {
    number: "1",
    color: "var(--color-accent-indigo)",
    title: "Set up your parish",
    description: "Create your organization, invite your team, and import your existing member list.",
  },
  {
    number: "2",
    color: "var(--color-accent-amber)",
    title: "Track giving & the ledger",
    description: "Every donation posts straight to the ledger — no manual re-entry, no spreadsheets.",
  },
  {
    number: "3",
    color: "var(--color-accent-emerald)",
    title: "Send receipts automatically",
    description: "Donors get a compliant receipt the moment their gift is recorded.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24" style={{ background: "var(--color-background)" }}>
      <Container>
        <Reveal>
          <h2
            className="text-center text-2xl font-semibold sm:text-3xl"
            style={{ color: "var(--color-foreground)" }}
          >
            How it works
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem key={step.number} className="text-center sm:text-left">
              <span className="font-mono text-3xl font-semibold" style={{ color: step.color }}>
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: "var(--color-foreground)" }}>
                {step.title}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
