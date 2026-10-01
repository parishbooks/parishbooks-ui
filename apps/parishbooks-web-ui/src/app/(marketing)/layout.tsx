import { ReactNode } from "react";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { MotionProvider } from "./_components/MotionProvider";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </MotionProvider>
  );
}
