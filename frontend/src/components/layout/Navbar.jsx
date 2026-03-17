import React from "react";
import { Search, Bell, Sun, Moon } from "lucide-react";

export default function Navbar() {
    return (
        <div className="sticky top-0 z-50 h-16 w-full bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between">

            {/* LEFT - SEARCH */}
            <div className="relative w-full max-w-md">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search problems, topics, users..."
                    className="w-full bg-white/5 text-gray-300 text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                />
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-4 ml-6">

                {/* Theme Toggle */}
                <button className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-gray-300">
                    <Sun size={18} />
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-gray-300">
                        <Bell size={18} />
                    </button>

                    {/* Notification Dot */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 ml-2">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="avatar"
                        className="w-9 h-9 rounded-full object-cover"
                    />

                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm text-white font-medium">
                            Alex Chen
                        </span>
                        <span className="text-xs text-gray-400">
                            Pro Member
                        </span>
                    </div>
                </div>

            </div>

        </div>
    );
}