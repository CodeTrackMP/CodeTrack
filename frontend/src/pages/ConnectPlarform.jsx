import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConnectPlatform() {
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state?.username || "User";

  const [selected, setSelected] = useState([]);

  const platforms = [
    { name: "LeetCode", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" },
    { name: "Codeforces", logo: "https://sta.codeforces.com/s/0/images/codeforces-logo-with-telegram.png" },
    { name: "CodeChef", logo: "https://cdn.codechef.com/images/cc-logo.svg" }
  ];

  const togglePlatform = (name) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((p) => p !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0f19] transition-all">

      <div className="w-full max-w-2xl bg-gray-100 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Welcome, {username}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Choose platforms you want to track
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {platforms.map((platform, index) => {
            const isSelected = selected.includes(platform.name);

            return (
              <div
                key={index}
                onClick={() => togglePlatform(platform.name)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col items-center justify-center gap-3
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-500/10 scale-105"
                    : "border-black/10 dark:border-white/10 hover:scale-105 hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {platform.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200"
        >
          Continue
        </button>

      </div>
    </div>
  );
}