import { BookOpen, Envelope } from "@phosphor-icons/react/ssr";
import { Container } from "@parishbooks-ui/site-ui";
import { Stagger, StaggerItem } from "../_components/Reveal";

const items = [
  {
    icon: BookOpen,
    title: "Documentation & email support",
    description: "Setup guides for every feature, and a support inbox staffed by people who know the product.",
  },
  {
    icon: Envelope,
    title: "Guided onboarding",
    description: "We'll help your treasurer get the chart of accounts and member directory set up correctly from day one.",
  },
];

export function SupportSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Stagger className="grid gap-8 sm:grid-cols-2">
          {items.map((support) => (
            <StaggerItem key={support.title} className="flex items-start gap-4">
              <support.icon
                size={28}
                weight="regular"
                aria-hidden="true"
                style={{ color: "var(--color-primary)" }}
              />
              <div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--color-foreground)" }}>
                  {support.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                  {support.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
