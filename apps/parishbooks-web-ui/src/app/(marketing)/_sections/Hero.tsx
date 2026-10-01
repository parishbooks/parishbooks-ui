"use client";

import { motion } from "motion/react";
import { Container, LinkButton as Button } from "@parishbooks-ui/site-ui";
import { DashboardMockup } from "../_components/DashboardMockup";
import { GET_STARTED_HREF } from "../_content/nav";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--color-background)" }}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" animate="show" variants={container}>
            <motion.h1
              variants={item}
              className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl"
              style={{ color: "var(--color-foreground)" }}
            >
              Parish bookkeeping that doesn&apos;t need an accountant.
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-lg leading-relaxed"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              ParishBooks brings your ledger, member directory, online giving, and tax receipts
              into one place — built for church treasurers, most of whom are volunteers.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={GET_STARTED_HREF}>Get Started</Button>
              <Button href="#pricing" variant="secondary">
                See Pricing
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
