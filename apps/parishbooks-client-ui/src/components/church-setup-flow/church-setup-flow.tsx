'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { lastStepIndex } from './constants';
import { SetupNav, StepIndicator } from './layout';
import { AboutChurchStep, ChurchDetailsStep, ReadyStep, RoleStep } from './steps';

export function ChurchSetupFlow() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [churchName, setChurchName] = useState('');
    const [location, setLocation] = useState('');
    const [size, setSize] = useState('50-150');
    const [role, setRole] = useState('Pastor / Lead minister');

    const next = () => setStep((current) => Math.min(current + 1, lastStepIndex));
    const back = () => setStep((current) => Math.max(current - 1, 0));

    return (
        <>
            <StepIndicator currentStep={step} />
            {step === 0 && <ChurchDetailsStep churchName={churchName} location={location} onChurchNameChange={setChurchName} onLocationChange={setLocation} />}
            {step === 1 && <AboutChurchStep size={size} onSizeChange={setSize} />}
            {step === 2 && <RoleStep role={role} onRoleChange={setRole} />}
            {step === 3 && <ReadyStep churchName={churchName} size={size} role={role} />}
            <SetupNav step={step} onBack={back} onNext={next} onOpenWorkspace={() => router.push('/dashboard')} />
        </>
    );
}
