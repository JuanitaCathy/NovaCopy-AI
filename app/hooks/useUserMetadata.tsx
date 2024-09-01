import { useUser } from '@clerk/nextjs';

const useUserMetadata = () => {
  const { user } = useUser(); // Ensure user data is being fetched

  // inspect userdata
  console.log('User data:', user);

  // Assuming user contains metadata or you have to handle it differently
  const needsOnboarding = user?.publicMetadata?.onboardingNeeded || false;

  return { needsOnboarding };
};

export default useUserMetadata;
