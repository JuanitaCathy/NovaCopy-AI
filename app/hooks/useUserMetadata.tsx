import { useUser, updateUser } from '@clerk/nextjs';

const useUserMetadata = () => {
  const { user, isLoaded, isSignedIn } = useUser(); // Ensure user data is being fetched

  // Loadingまたはサインインしていない場合は何もせずに終了
  if (!isLoaded || !isSignedIn) return { needsOnboarding: false };

  // 型アサーションを使用して publicMetadata の存在を仮定
  const userWithMetadata = user as { publicMetadata: { onboardingNeeded?: boolean } };

  // Check if publicMetadata and onboardingNeeded are present
  if (!userWithMetadata.publicMetadata || !('onboardingNeeded' in userWithMetadata.publicMetadata)) {
    // onboardingNeeded がない場合、新しい値を追加
    updateUser({
      publicMetadata: {
        ...userWithMetadata.publicMetadata,
        onboardingNeeded: true // または適切な初期値
      }
    }).then(() => {
      console.log('onboardingNeeded property added to publicMetadata.');
    }).catch((error: Error) => {
      console.error('Failed to update user metadata:', error);
    });
  }

  const needsOnboarding = userWithMetadata.publicMetadata?.onboardingNeeded || false;

  return { needsOnboarding };
};

export default useUserMetadata;
