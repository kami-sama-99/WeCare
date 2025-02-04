"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function Header() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  // Redirect if user is signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard") // Change to your desired route
    }
  }, [isSignedIn, router])

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          WeCare
        </Link>

        <div className="flex items-center">
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
            <UserButton afterSignOutUrl="/dashboard" />
            {/* Link to Report Issue Form */}
            <Link href="/report-issue" className="ml-4 text-gray-600 hover:text-green-600">
              Report Issue
            </Link>
          </SignedIn>


        </div>
      </nav>
    </header>
  )
}