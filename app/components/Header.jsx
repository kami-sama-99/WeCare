"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // usePathname to check the current route
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    if (isSignedIn && isLoaded && pathname === "/") {
      const hasCompletedOnboarding = user?.publicMetadata?.hasCompletedOnboarding;
  
      if (!hasCompletedOnboarding) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isSignedIn, isLoaded, pathname, router, user]);
  

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          WeCare
        </Link>

        <div className="flex items-center gap-2">
          {/* Show Sign In & Sign Up when user is NOT logged in */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="mr-4 text-gray-600 hover:text-green-600">Login</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-gray-600 hover:text-green-600">Signup</button>
            </SignUpButton>
          </SignedOut>

          {/* Show User Button when user IS logged in */}
          <SignedIn>
            <Link href="/report-issue" className="ml-4 text-gray-600 hover:text-green-600">
              Report Issue
            </Link>
            <UserButton afterSignOutUrl="/" /> {/* Redirect to home after sign out */}
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}