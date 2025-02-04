"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // usePathname to check the current route
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn, user } = useUser(); // Get the user and signed-in status
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const [scrolling, setScrolling] = useState(false);

  // Track the scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true); // When scrolling 50px or more, set the header to move down
      } else {
        setScrolling(false); // Reset if less than 50px
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  // Redirect based on the user's role after sign-in
  useEffect(() => {
    if (isSignedIn && user?.unsafeMetadata?.role) {
      const role = user.unsafeMetadata.role;

      // Redirect based on role
      if (role === "NGO") {
        router.push("/ngo-dashboard"); // Redirect to NGO dashboard
      } else if (role === "Admin") {
        router.push("/admin-dashboard"); // Redirect to Admin dashboard
      } else {
        router.push("/dashboard"); // Default user dashboard if role is not recognized
      }
    }
  }, [isSignedIn, user, router]);

  // Redirect to /role-assignment if user has no role after sign-in
  useEffect(() => {
    if (isSignedIn && !user?.unsafeMetadata?.role) {
      router.push("/role-assignment"); // Redirect to role assignment page if user has no role
    }
  }, [isSignedIn, user, router]);

  // Redirect only if the user is on the home page and signed in
  useEffect(() => {
    if (isSignedIn && pathname === "/") {
      router.push("/dashboard"); // Redirect only from the home page
    }
  }, [isSignedIn, pathname, router]);

  return (
    <header className={`bg-white shadow-md transition-all ${scrolling ? 'transform translate-y-10' : ''}`}>
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
