'use client';

import { useState } from 'react';
import { GoogleButton } from '@/components/auth/shared';
import { googleSignIn } from '@/lib/actions/auth';

export function SignUpOAuth() {
    const [error, setError] = useState<string | null>(null);

    async function onGoogleClick() {
        setError(null);
        const result = await googleSignIn();
        if (!result.success) {
            setError(result.error);
            return;
        }
        window.location.href = result.data.url;
    }

    return (
        <>
            {error ? (
                <p className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : null}
            <GoogleButton onClick={onGoogleClick} />
        </>
    );
}
