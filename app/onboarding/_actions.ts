"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function completeOnboarding(formData: FormData) {
  const { userId } = auth();
  console.log('userId:', userId);  // デバッグ用のログを追加
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const applicationName = formData.get('applicationName') as string;
  const applicationType = formData.get('applicationType') as string;

  // ここでユーザーのpublicMetadataを更新する処理を追加
  const user = await clerkClient().users.getUser(userId); // clerkClient()を使用してユーザーを取得
  console.log('User before update:', user);  // デバッグ用のログを追加

  await clerkClient().users.updateUser(userId, {
    publicMetadata: {
      applicationName,
      applicationType,
      onboardingComplete: true,
    },
  });

  const updatedUser = await clerkClient().users.getUser(userId); // 更新後のユーザーを取得
  console.log('User after update:', updatedUser);  // デバッグ用のログを追加

  return { message: 'Onboarding complete' };
}
