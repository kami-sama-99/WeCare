"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

import ReportCard from "../components/ReportCard";
import Header from "../components/Header";
import TopEvents from "../components/TopEvents";
import Profile from "../components/Profile";

export default function Home() {
    const { isSignedIn } = useUser()  // Access the user's sign-in status
    const router = useRouter()

    // Check if the user is not signed in and redirect
    useEffect(() => {
        if (!isSignedIn) {
        router.push("/") // Redirect to the landing page ("/")
        }
    }, [isSignedIn, router])

    // Render the protected content (e.g., dashboard or restricted page)
    if (!isSignedIn) {
        return null // Prevent rendering content if user is not signed in
    }
    
    return <>
        <Header />
        <div className="grid md:grid-cols-4 gap-6 p-6">
        <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center items-center self-start">
            <Profile />
        </div>
        <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 flex justify-center items-center">
            <ReportCard />
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center items-center self-start">
            <TopEvents />
        </div>
        </div>
    </>
}