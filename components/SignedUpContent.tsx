import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserMetadata from '../app/hooks/useUserMetadata';

function SignedUpContent() {
  const { needsOnboarding } = useUserMetadata();
  const router = useRouter();

  useEffect(() => {
    if (needsOnboarding) {
      router.push('/app/onboarding'); //redirecting to onboarding page
    }
  }, [needsOnboarding, router]);

  return <div>Redirecting to onboarding...</div>;
}

export default SignedUpContent;
