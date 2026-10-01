"use client";

import { FormEvent, useState } from "react";
import { Container, LinkButton as Button } from "@parishbooks-ui/site-ui";
import { Reveal } from "../_components/Reveal";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // UI-only: not wired to a mailing list provider yet.
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="py-16 sm:py-24" style={{ background: "var(--color-muted)" }}>
      <Container className="max-w-xl text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ color: "var(--color-foreground)" }}>
            Parish finance tips, straight to your inbox
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
            Practical tips for treasurers and church admins. No spam, unsubscribe any time.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          {submitted ? (
            <p className="text-sm font-medium" role="status" style={{ color: "var(--color-primary)" }}>
              Thanks — you&apos;re on the list.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@parish.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-11 flex-1 rounded-lg border px-3 py-2 text-base"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-card)",
                  color: "var(--color-card-foreground)",
                }}
              />
              <Button type="submit">Subscribe</Button>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
