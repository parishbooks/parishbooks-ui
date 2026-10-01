import type { Metadata } from "next";
import { Hero } from "./_sections/Hero";
import { Features } from "./_sections/Features";
import { HowItWorks } from "./_sections/HowItWorks";
import { Pricing } from "./_sections/Pricing";
import { MigrationCards } from "./_sections/MigrationCards";
import { SupportSection } from "./_sections/SupportSection";
import { TestimonialGrid } from "./_sections/TestimonialGrid";
import { NewsletterForm } from "./_sections/NewsletterForm";
import { BlogGrid } from "./_sections/BlogGrid";
import { About } from "./_sections/About";
import { GetStarted } from "./_sections/GetStarted";

export const metadata: Metadata = {
  title: "ParishBooks — Ledger, CRM & Giving for Parishes",
  description:
    "Double-entry ledger, family CRM, online giving, and tax receipts — built for church treasurers, not accountants.",
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <MigrationCards />
      <SupportSection />
      <TestimonialGrid />
      <NewsletterForm />
      <BlogGrid />
      <About />
      <GetStarted />
    </>
  );
}
