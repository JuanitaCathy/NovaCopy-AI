import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const CompleteOnboarding = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const completeOnboarding = async () => {
      if (user) {
        try {
          // Update the publicMetadata to mark onboarding as complete
          await user.update({
            publicMetadata: {
              onboardingComplete: true,
            },
          });

          // Redirect to the dashboard or any other page
          router.push('/dashboard');
        } catch (error) {
          console.error('Failed to complete onboarding:', error);
        }
      }
    };

    completeOnboarding();
  }, [user, router]);

  return (
    <div>
      <p>Completing onboarding...</p>
    </div>
  );
};

export default CompleteOnboarding;
