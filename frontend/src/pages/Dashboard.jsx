import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import StatsOverview from "../components/layout/StatsOverview";
import PlatformSection from "../components/layout/PlatformSection";
import ActivityHeatmap from "../components/layout/ActivityHeatmap";
import TopActivity from "../components/layout/TopActivity";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-[#05070d]">

            <Sidebar />

            <div className="flex flex-col flex-1 bg-[#0b0f19]">

                <Navbar />

                <div className="p-6">
                    <h1 className="text-white mt-6">Dashboard Content</h1>
                    <StatsOverview />
                    <PlatformSection />
                    <ActivityHeatmap/>
                    <TopActivity/>
                    
                </div>

            </div>

        </div>
    );
}