import type { Metadata } from 'next';
import { SetupAside, SetupHeader } from '@/components/church-setup-flow/layout';

export const metadata: Metadata = {
    title: 'Set up your parish',
    description: 'Create your church workspace in ParishBooks.',
};

export default function OnboardingLayout({ children }: LayoutProps<'/onboarding'>) {
    return (
        <main className="min-h-svh bg-background text-foreground">
            <div className="flex min-h-svh flex-col bg-background">
                <SetupHeader />
                <div className="grid flex-1 lg:grid-cols-[0.72fr_1.28fr]">
                    <SetupAside />
                    <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24">
                        <div className="w-full max-w-2xl">{children}</div>
                    </section>
                </div>
            </div>
        </main>
    );
}
