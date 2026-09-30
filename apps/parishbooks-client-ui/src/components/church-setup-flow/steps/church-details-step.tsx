import { MapPin } from 'lucide-react';
import { Input } from '@parishbooks-ui/design-system/ui/input';
import { Label } from '@parishbooks-ui/design-system/ui/label';
import { StepShell } from '../shared';

export function ChurchDetailsStep({
    churchName,
    location,
    onChurchNameChange,
    onLocationChange,
}: {
    churchName: string;
    location: string;
    onChurchNameChange: (value: string) => void;
    onLocationChange: (value: string) => void;
}) {
    return (
        <StepShell
            eyebrow="Welcome to ParishBooks"
            title="Tell us about your church"
            description="This is the name your team will see across your ParishBooks workspace."
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="church-name">Church or organization name</Label>
                    <Input
                        id="church-name"
                        value={churchName}
                        onChange={(event) => onChurchNameChange(event.target.value)}
                        placeholder="Grace Community Church"
                        className="h-14 rounded-xl px-4 text-base"
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="location">City and country</Label>
                    <div className="relative">
                        <MapPin className="pointer-events-none absolute left-4 top-4 size-5 text-muted-foreground" />
                        <Input
                            id="location"
                            value={location}
                            onChange={(event) => onLocationChange(event.target.value)}
                            placeholder="Austin, United States"
                            className="h-14 rounded-xl pl-12 text-base"
                        />
                    </div>
                </div>
            </div>
        </StepShell>
    );
}
