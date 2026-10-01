export type PricingPlan = {
  name: string;
  price: string;
  billingNote: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
};

// Bullets mirror the plan -> feature matrix in
// docs/architecture/subscription-entitlements.md, which that doc itself
// calls an illustrative starting matrix, not a confirmed SLA.
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "$49",
    billingNote: "per month",
    blurb: "For a single parish getting its books and giving online.",
    features: [
      "Up to 500 members in the family & member directory",
      "Full double-entry ledger",
      "Online giving via Cashfree or Stripe",
      "Standard tax receipts",
    ],
  },
  {
    name: "Pro",
    price: "$149",
    billingNote: "per month",
    blurb: "For dioceses and larger parishes with reporting needs.",
    features: [
      "Unlimited members",
      "Full double-entry ledger",
      "Online giving via Cashfree or Stripe",
      "Multi-fund reporting",
      "FCRA fund segregation module",
      "Priority support",
    ],
    highlighted: true,
  },
];
