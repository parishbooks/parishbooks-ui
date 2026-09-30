import { Globe2, Users } from 'lucide-react';
import { Input } from '@parishbooks-ui/design-system/ui/input';
import { Label } from '@parishbooks-ui/design-system/ui/label';
import { attendanceOptions } from '../constants';
import { Choice, StepShell } from '../shared';

export function AboutChurchStep({ size, onSizeChange }: { size: string; onSizeChange: (value: string) => void }) {
    return (
        <StepShell
            eyebrow="A little context"
            title="Help us tailor your workspace"
            description="We'll use this to give you the right defaults. Nothing is set in stone."
        >
            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">How many people attend your church?</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {attendanceOptions.map((option) => (
                        <Choice
                            key={option}
                            active={size === option}
                            onClick={() => onSizeChange(option)}
                            icon={Users}
                            title={option}
                            description="Average weekly attendance"
                        />
                    ))}
                </div>
                <div className="mt-3 flex flex-col gap-2.5">
                    <Label htmlFor="website">
                        Church website <span className="font-normal text-muted-foreground">(optional)</span>
                    </Label>
                    <div className="relative">
                        <Globe2 className="pointer-events-none absolute left-4 top-4 size-5 text-muted-foreground" />
                        <Input id="website" placeholder="https://yourchurch.org" className="h-14 rounded-xl pl-12 text-base" />
                    </div>
                </div>
            </div>
        </StepShell>
    );
}
