"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

import Header from "./components/Header"
import Hero from "./components/Hero"
import WhoWeAre from "./components/WhoWeAre"
import HowItWorks from "./components/HowItWorks"
import Impact from "./components/Impact"
import Footer from "./components/Footer"
import AOS from "aos"
import "aos/dist/aos.css"

export default function Home() {
  const { isSignedIn, isLoaded } = useUser()  // Ensure user data is loaded
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard") // Redirect if user is signed in
    }
  }, [isLoaded, isSignedIn, router])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  // Prevent flashing of landing page by not rendering until user data is loaded
  if (!isLoaded || isSignedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <Hero />
        <WhoWeAre />
        <HowItWorks />
        <Impact />
      </main>
      <Footer />
    </div>
  )
}
