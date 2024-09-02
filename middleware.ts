import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/onboarding', '/sign-up']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, user, redirectToSignIn } = auth();

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Check if the user needs onboarding
  if (userId && user) {
    console.log('User:', user);  // デバッグ用のログを追加
    const onboardingComplete = user.publicMetadata.onboardingComplete as boolean | undefined;

    console.log('onboardingComplete:', onboardingComplete);  // デバッグ用のログを追加

    // If onboarding is not complete and not already on the onboarding page, redirect
    if (!onboardingComplete && req.nextUrl.pathname !== '/onboarding') {
      const onboardingUrl = new URL('/onboarding', req.url);
      return NextResponse.redirect(onboardingUrl);
    }

    // If onboarding is complete, redirect to /dashboard
    if (onboardingComplete && req.nextUrl.pathname === '/onboarding') {
      const dashboardUrl = new URL('/dashboard', req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // Allow user to access the page if none of the conditions above are met
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
