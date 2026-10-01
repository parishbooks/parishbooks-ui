export type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "menu"; label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { type: "menu", label: "Product", href: "#features" },
  { type: "link", label: "Pricing", href: "#pricing" },
  { type: "link", label: "About", href: "#about" },
];

export const GET_STARTED_HREF = "#get-started";
