import { Container, MarketingCard as Card } from "@parishbooks-ui/site-ui";
import { Stagger, StaggerItem } from "../_components/Reveal";

const posts = [
  {
    category: "Giving",
    color: "var(--color-accent-amber)",
    title: "Why more parishes are moving giving online",
    excerpt: "Digital giving isn't just convenient for donors — it changes how a parish office tracks fund allocation.",
  },
  {
    category: "Compliance",
    color: "var(--color-accent-sky)",
    title: "A treasurer's checklist for year-end tax receipts",
    excerpt: "What has to be on a compliant receipt, and how to avoid the January scramble.",
  },
  {
    category: "CRM",
    color: "var(--color-accent-emerald)",
    title: "Family units vs. individual contacts: why it matters",
    excerpt: "Most CRMs are built around individuals. Parishes organize around households — here's why that distinction matters.",
  },
];

export function BlogGrid() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-2xl font-semibold sm:text-3xl" style={{ color: "var(--color-foreground)" }}>
          Insights for church finance teams
        </h2>
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.title}>
              <Card className="flex h-full flex-col p-6">
                <span
                  className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${post.color} 16%, transparent)`,
                    color: post.color,
                  }}
                >
                  {post.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: "var(--color-foreground)" }}>
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>
                  {post.excerpt}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
