import { Building2 } from 'lucide-react';
import { roleOptions } from '../constants';
import { Choice, StepShell } from '../shared';

export function RoleStep({ role, onRoleChange }: { role: string; onRoleChange: (value: string) => void }) {
    return (
        <StepShell eyebrow="Your place on the team" title="What's your role?" description="This helps us personalize your first ParishBooks experience.">
            <div className="grid gap-3 sm:grid-cols-2">
                {roleOptions.map((option) => (
                    <Choice
                        key={option}
                        active={role === option}
                        onClick={() => onRoleChange(option)}
                        icon={Building2}
                        title={option}
                        description="Customize my workspace"
                    />
                ))}
            </div>
        </StepShell>
    );
}
