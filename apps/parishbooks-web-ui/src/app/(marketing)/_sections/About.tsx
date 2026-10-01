import { Container } from "@parishbooks-ui/site-ui";
import { Reveal, Stagger, StaggerItem } from "../_components/Reveal";

const values = [
  {
    title: "Accuracy",
    description: "A double-entry ledger that won't let the books quietly drift out of balance.",
  },
  {
    title: "Transparency",
    description: "Every family and donor can see exactly where their giving went.",
  },
  {
    title: "Accessibility",
    description: "Built for volunteers first — not everyone running a parish office is an accountant.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ color: "var(--color-foreground)" }}>
            Parish bookkeeping deserves dedicated software
          </h2>
          <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>
            Most parish treasurers are volunteers, not accountants, and most of the tools built
            for church finance were designed for someone else&apos;s workflow — a general ledger
            product with a spreadsheet bolted on, or a donation page with no ledger at all.
            ParishBooks starts from the parish&apos;s side of the problem: one system for the
            ledger, the member directory, online giving, and the tax receipts that come out of
            it, built for churches in India and the United States alike.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-8 sm:grid-cols-3">
          {values.map((value) => (
            <StaggerItem key={value.title} className="text-center sm:text-left">
              <h3 className="text-lg font-semibold" style={{ color: "var(--color-foreground)" }}>
                {value.title}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                {value.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
