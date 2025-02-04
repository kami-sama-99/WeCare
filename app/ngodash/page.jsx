"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import ReportCard from "../components/ReportCard";
import Header from "../components/Header";
import TopEvents from "../components/TopEvents";

export default function NgoDashboard() {
    const { isSignedIn, user } = useUser(); // Access user object
    const router = useRouter();

    // Redirect logic
    useEffect(() => {
        if (!isSignedIn) {
            router.push("/"); // Redirect to landing page if not signed in
        } else if (user?.unsafeMetadata?.hasCompletedOnboarding !== true) {
            router.push("/onboarding"); // Redirect to onboarding if not completed
        } else if (user?.unsafeMetadata?.role !== "ngo") {
            router.push("/"); // Redirect to home if not an NGO
        }
    }, [isSignedIn, user, router]);

    // Prevent rendering content if user is not signed in or onboarding not complete or not an NGO
    if (!isSignedIn || user?.unsafeMetadata?.hasCompletedOnboarding !== true || user?.unsafeMetadata?.role !== "ngo") {
        return null;
    }

    return (
        <>
            <Header />
            {/*<div className="grid md:grid-cols-4 gap-6 p-6">
                <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center items-center self-start">
                    <NgoProfile /> 
                </div>*/}
                <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 flex justify-center items-center">
                    <ReportCard />
                </div>
                <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center items-center self-start">
                    <TopEvents />
                </div>
                </>
    );
}
