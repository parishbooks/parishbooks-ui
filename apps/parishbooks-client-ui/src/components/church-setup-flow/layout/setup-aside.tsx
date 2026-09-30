import { WalletCards } from 'lucide-react';

export function SetupAside() {
    return (
        <aside className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div>
                <p className="text-sm font-medium text-primary-foreground/70">Let&apos;s make it yours</p>
                <h1 className="mt-5 max-w-md text-4xl font-semibold leading-[1.08] tracking-tighter xl:text-5xl">A calmer way to run your church.</h1>
                <p className="mt-6 max-w-sm text-base leading-7 text-primary-foreground/70">
                    Set up your church workspace in a few quick steps. You can change everything later.
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5">
                    <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15">
                            <WalletCards className="size-5" />
                        </span>
                        <div>
                            <p className="text-sm font-semibold">Built for ministry</p>
                            <p className="mt-1 text-xs text-primary-foreground/65">Giving, people, funds, and more.</p>
                        </div>
                    </div>
                </div>
                <p className="text-xs leading-5 text-primary-foreground/55">
                    Your data belongs to your church. ParishBooks keeps your team aligned and your records organized.
                </p>
            </div>
        </aside>
    );
}
