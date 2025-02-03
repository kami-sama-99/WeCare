"use client"

import { useEffect } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import WhoWeAre from "./components/WhoWeAre"
import HowItWorks from "./components/HowItWorks"
import Impact from "./components/Impact"
import Footer from "./components/Footer"
import AOS from "aos"
import "aos/dist/aos.css"

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

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

