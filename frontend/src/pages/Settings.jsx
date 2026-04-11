import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function Settings() {
  const [active, setActive] = useState("Account");

  const menuItems = [
    "Account",
    "Privacy",
    "Points",
    "Notifications",
    "Profile Settings"
  ];

  const socialAccounts = [
    {
      name: "Google",
      logo: "https://www.svgrepo.com/show/475656/google-color.svg"
    },
    {
      name: "GitHub",
      logo: "https://cdn-icons-png.flaticon.com/512/25/25231.png"
    },
    {
      name: "LinkedIn",
      logo: "https://cdn-icons-png.flaticon.com/512/174/174857.png"
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-[#05070d] dark:text-slate-100 transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300">
        <Navbar />

        <div className="p-6">
          <h1 className="mt-6 mb-6 text-slate-900 dark:text-white">Settings</h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* LEFT SIDEBAR */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 space-y-2 shadow-sm dark:shadow-none">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActive(item)}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200
              ${
                active === item
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                  : "text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10"
              }`}
            >
              {item}
            </div>
          ))}
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-3 space-y-6">

              {/* ABOUT USER */}
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none">
                <h2 className="text-slate-900 dark:text-white font-semibold text-lg">
                  About User
                </h2>

                <input
                  type="text"
                  placeholder="CodeTrack ID"
                  className="w-full bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 border border-slate-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 border border-slate-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 border border-slate-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 border border-slate-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* SOCIAL ACCOUNTS */}
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none">
                <h2 className="text-slate-900 dark:text-white font-semibold text-lg">
                  Social Accounts
                </h2>

                {socialAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={account.logo}
                        alt={account.name}
                        className="w-6 h-6"
                      />
                      <span className="text-slate-700 dark:text-gray-300">
                        {account.name}
                      </span>
                    </div>

                    <button className="text-sm bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>

              {/* DELETE ACCOUNT */}
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-400 rounded-xl p-5 shadow-sm dark:shadow-none">
                <div className="flex items-start gap-4">
                  <Trash2 size={22} />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      Delete Account
                    </h3>

                    <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                      This action is permanent and cannot be undone.
                    </p>

                    <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}