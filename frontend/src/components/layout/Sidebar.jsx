import React, { useState } from "react";
import {
    LayoutDashboard,
    BarChart,
    Flame,
    Swords,
    Trophy,
    User,
    Settings
} from "lucide-react";

export default function Sidebar() {
    const [active, setActive] = useState("Dashboard");

    const sections = [
        {
            label: "TRACKING",
            items: [
                { name: "Dashboard", icon: LayoutDashboard },
                { name: "Analytics", icon: BarChart },
                { name: "Streak Tracker", icon: Flame }
            ]
        },
        {
            label: "SOCIAL",
            items: [
                { name: "Battle Arena", icon: Swords },
                { name: "Leaderboard", icon: Trophy }
            ]
        },
        {
            label: "ACCOUNT",
            items: [
                { name: "Profile", icon: User },
                { name: "Settings", icon: Settings }
            ]
        }
    ];

    return (
        <div className="h-screen w-60 bg-[#0b0f19] border-r border-white/10 flex flex-col justify-between">

            {/* TOP */}
            <div>
                {/* Branding */}
                <div className="flex items-center gap-3 px-6 py-6">
                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        C
                    </div>
                    <span className="text-white font-semibold text-lg">
                        CodeTrack
                    </span>
                </div>

                {/* Sections */}
                <div className="px-3 space-y-6">

                    {sections.map((section) => (
                        <div key={section.label}>
                            <p className="text-xs uppercase text-gray-500 px-3 mb-2">
                                {section.label}
                            </p>

                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = active === item.name;

                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => setActive(item.name)}
                                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200
                      ${isActive
                                                    ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] border-l-4 border-blue-400"
                                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <Icon size={18} />
                                            <span>{item.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* BOTTOM */}
            <div className="px-6 py-4 text-xs text-gray-500 opacity-60">
                © 2026 CodeTrack
            </div>

        </div>
    );
}