"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import ReportCard from "../components/ReportCard";
import Header from "../components/Header";
import TopEvents from "../components/TopEvents";
import Profile from "../components/Profile";

export default function Home() {
    const { isSignedIn, user } = useUser(); // Access user object
    const router = useRouter();

    // Redirect logic
    useEffect(() => {
        if (!isSignedIn) {
            router.push("/"); // Redirect to landing page if not signed in
        } else if (user?.unsafeMetadata?.hasCompletedOnboarding !== true) {
            router.push("/onboarding"); // Redirect to onboarding if not completed
        }
    }, [isSignedIn, user, router]);

    // Prevent rendering content if user is not signed in or onboarding not complete
    if (!isSignedIn || user?.unsafeMetadata?.hasCompletedOnboarding !== true) {
        return null;
    }

    return (
        <>
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
    );
}
