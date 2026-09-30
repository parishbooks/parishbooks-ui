'use client';

import { useTransition } from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from '@/lib/actions/auth';

export function SignOutButton() {
    const [pending, startTransition] = useTransition();

    return (
        <button
            type="button"
            disabled={pending}
            onClick={() => startTransition(() => void signOut())}
            className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50"
        >
            <LogOut className="size-4" />
            {pending ? 'Signing out…' : 'Sign out'}
        </button>
    );
}
