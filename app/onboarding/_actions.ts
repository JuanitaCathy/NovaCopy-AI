'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  try {
    const applicationName = formData.get('applicationName') as string | null
    const applicationType = formData.get('applicationType') as string | null

    if (!applicationName || !applicationType) {
      throw new Error('Form data is missing required fields')
    }

    await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        applicationName,
        applicationType,
      },
    })
    return { message: 'User metadata Updated' }
  } catch (e) {
    console.log('error', e)
    return { message: 'Error Updating User Metadata' }
  }
}
