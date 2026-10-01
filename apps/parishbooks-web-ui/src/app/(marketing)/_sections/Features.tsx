import { Container } from "@parishbooks-ui/site-ui";
import { FeatureTabs } from "../_components/FeatureTabs";
import { Reveal } from "../_components/Reveal";

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <Reveal className="text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ color: "var(--color-foreground)" }}>
            Everything a parish office needs
          </h2>
        </Reveal>
        <div className="mt-10">
          <FeatureTabs />
        </div>
      </Container>
    </section>
  );
}
