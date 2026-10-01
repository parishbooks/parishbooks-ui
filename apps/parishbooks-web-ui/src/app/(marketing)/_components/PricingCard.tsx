import { Check } from "@phosphor-icons/react/ssr";
import { LinkButton as Button } from "@parishbooks-ui/site-ui";
import type { PricingPlan } from "../_content/pricing";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const card = (
    <div
      className="flex h-full flex-col rounded-xl p-6"
      style={{
        background: "var(--color-card)",
        border: plan.highlighted ? "none" : "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold" style={{ color: "var(--color-card-foreground)" }}>
          {plan.name}
        </h3>
        {plan.highlighted && (
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--color-accent-indigo), var(--color-accent-sky))",
            }}
          >
            Most popular
          </span>
        )}
      </div>
      <p className="mt-4">
        <span className="font-mono text-4xl font-semibold" style={{ color: "var(--color-card-foreground)" }}>
          {plan.price}
        </span>
        <span className="ml-2 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          {plan.billingNote}
        </span>
      </p>
      <p className="mt-2 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
        {plan.blurb}
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check
              size={18}
              weight="bold"
              aria-hidden="true"
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-positive)" }}
            />
            <span style={{ color: "var(--color-card-foreground)" }}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href="#get-started"
        variant={plan.highlighted ? "primary" : "secondary"}
        className="mt-6 w-full"
      >
        Get started with {plan.name}
      </Button>
    </div>
  );

  if (!plan.highlighted) {
    return card;
  }

  return (
    <div
      className="rounded-xl p-[2px]"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-sky), var(--color-accent-emerald))",
      }}
    >
      {card}
    </div>
  );
}
