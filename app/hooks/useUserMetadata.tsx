import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const useUserMetadata = () => {
  const { user } = useUser();
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Fetch user metadata or custom claims
      // Assume metadata contains a field `onboardingComplete` indicating onboarding status
      const isOnboardingComplete = user.metadata?.onboardingComplete || false;
      setNeedsOnboarding(!isOnboardingComplete);
    }
  }, [user]);

  useEffect(() => {
    if (needsOnboarding) {
      router.push('/onboarding'); // Redirect to onboarding page
    }
  }, [needsOnboarding, router]);

  return { needsOnboarding };
};

export default useUserMetadata;
