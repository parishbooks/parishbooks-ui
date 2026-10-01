import { Container } from "@parishbooks-ui/site-ui";
import { PricingCard } from "../_components/PricingCard";
import { Reveal, Stagger, StaggerItem } from "../_components/Reveal";
import { PRICING_PLANS } from "../_content/pricing";

const faqs = [
  {
    question: "How does billing work?",
    answer:
      "Plans are billed monthly. You can upgrade or downgrade at any time, and the change takes effect on your next billing cycle.",
  },
  {
    question: "What happens if a payment fails?",
    answer:
      "Your parish gets a grace period to update billing details before any features are restricted, so a single failed charge won't interrupt giving or receipts.",
  },
  {
    question: "Do you support giving outside the US and India?",
    answer:
      "Giving currently runs through Stripe (US) or Cashfree (India). Support for other regions is on our roadmap — reach out below to tell us where you're based.",
  },
  {
    question: "Can I switch between Stripe and Cashfree?",
    answer:
      "Yes — your giving processor is a setting on your organization, not tied to your plan tier.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <Reveal className="text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ color: "var(--color-foreground)" }}>
            Simple pricing for parishes of every size
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: "var(--color-muted-foreground)" }}>
            Two plans. No per-transaction fees on top of your payment processor&apos;s own rates.
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {PRICING_PLANS.map((plan) => (
            <StaggerItem key={plan.name}>
              <PricingCard plan={plan} />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          Feature limits above are illustrative and may be refined before general availability.
        </p>

        <Reveal className="mx-auto mt-16 max-w-3xl">
          <h3 className="text-center text-xl font-semibold" style={{ color: "var(--color-foreground)" }}>
            Frequently asked questions
          </h3>
          <dl className="mt-8 flex flex-col gap-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base font-semibold" style={{ color: "var(--color-foreground)" }}>
                  {faq.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
