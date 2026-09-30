import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@parishbooks-ui/design-system/ui/button';
import { lastStepIndex } from '../constants';

export function SetupNav({ step, onBack, onNext, onOpenWorkspace }: { step: number; onBack: () => void; onNext: () => void; onOpenWorkspace: () => void }) {
    return (
        <div className="mt-9 flex items-center justify-between gap-3">
            {step > 0 ? (
                <Button type="button" variant="ghost" onClick={onBack} className="h-12 rounded-xl px-4">
                    <ArrowLeft data-icon="inline-start" /> Back
                </Button>
            ) : (
                <span />
            )}
            {step < lastStepIndex ? (
                <Button type="button" onClick={onNext} className="h-14 min-w-40 rounded-xl px-6 text-base font-semibold">
                    Continue <ArrowRight data-icon="inline-end" />
                </Button>
            ) : (
                <Button type="button" onClick={onOpenWorkspace} className="h-14 min-w-40 rounded-xl px-6 text-base font-semibold">
                    Open workspace <ArrowRight data-icon="inline-end" />
                </Button>
            )}
        </div>
    );
}
