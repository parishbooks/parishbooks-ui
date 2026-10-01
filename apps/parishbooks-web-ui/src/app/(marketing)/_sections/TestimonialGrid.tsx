import { Container, MarketingCard as Card } from "@parishbooks-ui/site-ui";
import { Stagger, StaggerItem } from "../_components/Reveal";

const testimonials = [
  {
    quote:
      "Keeping track of giving used to mean three spreadsheets that never quite agreed with each other. Now it's one ledger, and it always balances.",
    attribution: "A parish treasurer, early access program",
  },
  {
    quote:
      "Our members can see their own giving history without emailing the office. That alone saved us hours a week.",
    attribution: "A parish administrator, early access program",
  },
  {
    quote:
      "Generating tax receipts used to be a January scramble. Now they go out automatically, in the right format.",
    attribution: "A church secretary, early access program",
  },
];

export function TestimonialGrid() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Stagger className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.attribution}>
              <Card className="flex h-full flex-col p-6">
                <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--color-foreground)" }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-4 text-xs font-medium" style={{ color: "var(--color-muted-foreground)" }}>
                  {testimonial.attribution}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
