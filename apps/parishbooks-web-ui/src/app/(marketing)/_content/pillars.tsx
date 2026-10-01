import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import {
  BookOpen,
  Users,
  CurrencyDollar,
  Shield,
  DeviceMobile,
} from "@phosphor-icons/react/ssr";

export type Pillar = {
  slug: string;
  icon: ComponentType<IconProps>;
  color: string;
  title: string;
  menuBlurb: string;
  description: string;
  points: string[];
};

export const PILLARS: Pillar[] = [
  {
    slug: "ledger",
    icon: BookOpen,
    color: "var(--color-accent-indigo)",
    title: "Double-Entry Ledger",
    menuBlurb: "Balanced books, automatically",
    description:
      "Every transaction posts as a balanced set of debits and credits — the ledger is append-only, so nothing gets silently edited after the fact.",
    points: [
      "Debits and credits always reconcile to zero",
      "A full chart of accounts built for church finances",
      "Clean period close instead of a year-end scramble",
    ],
  },
  {
    slug: "crm",
    icon: Users,
    color: "var(--color-accent-emerald)",
    title: "Family & Member CRM",
    menuBlurb: "Directory built around households",
    description:
      "Your directory is built around households, not just individual contacts, matching how a parish actually organizes its congregation.",
    points: [
      "Family units with an optional head-of-household",
      "Ward and prayer-cell mapping",
      "Member census and attendance tracking",
    ],
  },
  {
    slug: "giving",
    icon: CurrencyDollar,
    color: "var(--color-accent-amber)",
    title: "Online Giving",
    menuBlurb: "One-time and recurring gifts",
    description:
      "Accept one-time and recurring gifts without asking donors to leave their preferred payment flow.",
    points: [
      "Stripe for US parishes, Cashfree for Indian parishes",
      "One-time and recurring pledges",
      "A companion mobile app for congregants",
    ],
  },
  {
    slug: "compliance",
    icon: Shield,
    color: "var(--color-accent-sky)",
    title: "Tax Receipts & Compliance",
    menuBlurb: "Receipts in the right format",
    description:
      "Receipts generate automatically in the format your donors and your regulator expect.",
    points: [
      "80G receipts for Indian parishes, PAN capture included",
      "501(c)(3) statements for US parishes",
      "Fund-tagging at the point of donation",
    ],
  },
  {
    slug: "mobile",
    icon: DeviceMobile,
    color: "var(--color-accent-violet)",
    title: "Mobile Giving App",
    menuBlurb: "Giving and history, on the go",
    description:
      "Congregants get a dedicated app for giving and viewing their own family's history.",
    points: [
      "Biometric sign-in",
      "Giving history and family profile in one place",
      "Offline-safe pledges that retry once connectivity returns",
    ],
  },
];
