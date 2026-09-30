import Link from 'next/link';
import { Shell } from '@/components/auth/shared';

export default function OnboardingPage() {
    return (
        <Shell
            eyebrow="Welcome"
            title="Set up your parish"
            description="Create your organization to start using ParishBooks. This flow will collect your church details and compliance information."
        >
            <p className="text-sm text-muted-foreground">
                Organization creation UI is coming next. This page is a static placeholder for the onboarding wizard.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
                Need a different account?{' '}
                <Link href="/sign-in" className="font-medium text-primary hover:underline">
                    Sign in
                </Link>
            </p>
        </Shell>
    );
}
