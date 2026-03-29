import React, { useEffect, useState } from "react";
import { Search, Bell, Sun, Moon, Image } from "lucide-react";

export default function Navbar() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return document.documentElement.classList.contains("dark");
    });
    const [displayName, setDisplayName] = useState(() => {
        const savedName = localStorage.getItem("username");
        return savedName || "User";
    });
    const [avatarUrl, setAvatarUrl] = useState(() => {
        return localStorage.getItem("profileAvatar") || "";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    useEffect(() => {
        const savedName = localStorage.getItem("username");
        if (savedName) {
            setDisplayName(savedName);
        }

        const savedAvatar = localStorage.getItem("profileAvatar") || "";
        setAvatarUrl(savedAvatar);
    }, []);

    const handleThemeToggle = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <div className="sticky top-0 z-50 h-16 w-full bg-slate-50/85 dark:bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-6 flex items-center justify-between transition-colors duration-300">
            {/* LEFT - SEARCH */}
            <div className="relative w-full max-w-md">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search problems, topics, users..."
                    className="w-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-gray-500 transition-colors duration-300"
                />
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-4 ml-6">
                {/* Theme Toggle */}
                <button
                    onClick={handleThemeToggle}
                    aria-label="Toggle theme"
                    className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-200 text-slate-600 dark:text-gray-300"
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-200 text-slate-600 dark:text-gray-300">
                        <Bell size={18} />
                    </button>

                    {/* Notification Dot */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 ml-2">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="w-9 h-9 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full border border-slate-300 dark:border-white/15 bg-slate-200 dark:bg-white/5 flex items-center justify-center">
                            <Image size={14} className="text-slate-500 dark:text-gray-400" />
                        </div>
                    )}

                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm text-slate-900 dark:text-white font-medium">
                            {displayName}
                        </span>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}