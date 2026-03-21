import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import StatsOverview from "../components/layout/StatsOverview";
import PlatformSection from "../components/layout/PlatformSection";
import ActivityHeatmap from "../components/layout/ActivityHeatmap";
import TopActivity from "../components/layout/TopActivity";

export default function Dashboard() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || "dark";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-[#05070d] dark:text-slate-100 transition-colors duration-300">

            <Sidebar />

            <div className="flex flex-col flex-1 bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300">

                <Navbar theme={theme} onThemeToggle={handleThemeToggle} />

                <div className="p-6">
                    <h1 className="mt-6 text-slate-900 dark:text-white">Dashboard Content</h1>
                    <StatsOverview />
                    <PlatformSection />
                    <ActivityHeatmap/>
                    <TopActivity/>
                    
                    
                </div>

            </div>

        </div>
    );
}