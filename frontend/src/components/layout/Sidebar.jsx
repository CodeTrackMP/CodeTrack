import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Swords,
    User,
    Settings,
    Bell,
    CodeXml
} from "lucide-react";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const getReminderCount = () => {
        try {
            const saved = localStorage.getItem("reminders");
            if (!saved) return 0;
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed.length : 0;
        } catch {
            return 0;
        }
    };

    const reminderCount = getReminderCount();

    const routeByName = {
        "Dashboard": "/dashboard",
        "Battle Arena": "/battle",
        "Profile": "/profile",
        "Settings": "/settings",
        "Reminders": "/reminders"
    };

    const activeByPath = {
        "/dashboard": "Dashboard",
        "/battle": "Battle Arena",
        "/profile": "Profile",
        "/settings": "Settings",
        "/reminders": "Reminders"
    };

    const active = activeByPath[location.pathname] || "Dashboard";

    const sections = [
        {
            label: "TRACKING",
            items: [
                { name: "Dashboard", icon: LayoutDashboard }
            ]
        },
        {
            label: "SOCIAL",
            items: [
                { name: "Battle Arena", icon: Swords }
            ]
        },
        {
            label: "ACCOUNT",
            items: [
                { name: "Reminders", icon: Bell },
                { name: "Profile", icon: User },
                { name: "Settings", icon: Settings }
            ]
        }
    ];

    return (
        <div className="h-screen w-60 bg-slate-50 dark:bg-[#0b0f19] border-r border-slate-200 dark:border-white/10 flex flex-col justify-between transition-colors duration-300">

            {/* TOP */}
            <div>
                {/* Branding */}
                <div className="flex items-center gap-3 px-6 py-6">
                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <CodeXml size={18} strokeWidth={2.2} />
                    </div>
                    <span className="text-slate-900 dark:text-white font-semibold text-lg">
                        CodeTrack
                    </span>
                </div>

                {/* Sections */}
                <div className="px-3 space-y-6">

                    {sections.map((section) => (
                        <div key={section.label}>
                            <p className="text-xs uppercase text-slate-500 dark:text-gray-500 px-3 mb-2">
                                {section.label}
                            </p>

                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = active === item.name;

                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                const route = routeByName[item.name];
                                                if (route) {
                                                    navigate(route);
                                                }
                                            }}
                                            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all duration-200
                      ${isActive
                                                    ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] border-l-4 border-blue-400"
                                                    : "text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                                                }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                <Icon size={18} />
                                                <span>{item.name}</span>
                                            </span>
                                            {item.name === "Reminders" && reminderCount > 0 && (
                                                <span className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-semibold flex items-center justify-center ${
                                                    isActive
                                                        ? "bg-white/20 text-white"
                                                        : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                                                }`}>
                                                    {reminderCount > 99 ? "99+" : reminderCount}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* BOTTOM */}
            <div className="px-6 py-4 text-xs text-slate-500 dark:text-gray-500 opacity-60">
                © 2026 CodeTrack
            </div>

        </div>
    );
}