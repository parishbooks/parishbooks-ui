import { Check } from 'lucide-react';
import { StepShell } from '../shared';

export function ReadyStep({ churchName, size, role }: { churchName: string; size: string; role: string }) {
    return (
        <StepShell
            eyebrow="You're all set"
            title={`Welcome, ${churchName || 'your church'}.`}
            description="Your church workspace is ready. Invite your team, add your first fund, and start building a clearer picture of your ministry."
        >
            <div className="rounded-2xl border bg-muted/40 p-5">
                <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Check className="size-5" />
                    </span>
                    <div>
                        <p className="font-semibold">Your workspace is ready to explore</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            We&apos;ve prepared church-friendly defaults for {size} weekly attendees and a {role.toLowerCase()}.
                        </p>
                    </div>
                </div>
            </div>
        </StepShell>
    );
}
