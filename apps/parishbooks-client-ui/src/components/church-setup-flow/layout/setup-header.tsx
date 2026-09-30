import { Sparkles } from 'lucide-react';

export function SetupHeader() {
    return (
        <header className="flex items-center justify-between border-b border-border/60 px-6 py-5 sm:px-10">
            <div className="flex items-center gap-3 font-semibold tracking-tight">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Sparkles className="size-4" />
                </span>
                ParishBooks
            </div>
            <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex">
                <span className="size-2 rounded-full bg-emerald-500" /> Your workspace is private
            </div>
        </header>
    );
}
