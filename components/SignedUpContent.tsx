import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

const SignedUpContent = () => {
  const { isSignedIn, isSignedUp } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && isSignedUp) {
      router.push('/onboarding'); // Redirect to onboarding page
    }
  }, [isSignedIn, isSignedUp, router]);

  return <div>Redirecting to onboarding...</div>;
};

export default SignedUpContent;
