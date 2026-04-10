import React, { useState } from "react";
import { Trash2 } from "lucide-react";

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
    <div className="p-6 bg-[#020617]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT SIDEBAR */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 shadow-lg">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActive(item)}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.01]
              ${
                active === item
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-400 hover:bg-white/10"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3 space-y-6">

          {/* ABOUT USER */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
            <h2 className="text-white font-semibold text-lg">
              About User
            </h2>

            <input
              type="text"
              placeholder="CodeTrack ID"
              className="w-full bg-zinc-900 text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-zinc-900 text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-zinc-900 text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-zinc-900 text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SOCIAL ACCOUNTS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
            <h2 className="text-white font-semibold text-lg">
              Social Accounts
            </h2>

            {socialAccounts.map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={account.logo}
                    alt={account.name}
                    className="w-6 h-6"
                  />
                  <span className="text-gray-300">
                    {account.name}
                  </span>
                </div>

                <button className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-500/30 transition hover:scale-[1.01]">
                  Connect
                </button>
              </div>
            ))}
          </div>

          {/* DELETE ACCOUNT */}
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-5 shadow-lg">
            <div className="flex items-start gap-4">
              <Trash2 size={22} />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  Delete Account
                </h3>

                <p className="text-sm text-red-300 mt-1">
                  This action is permanent and cannot be undone.
                </p>

                <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition hover:scale-[1.01]">
                  Delete Account
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}