import React from "react";
import { ExternalLink } from "lucide-react";

export default function PlatformSection() {
  const platforms = [
    {
      name: "LeetCode",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      color: "orange",
      solved: 342,
      streak: 23,
      easy: 120,
      medium: 180,
      hard: 42,
      topics: ["Arrays", "Dynamic Programming", "Trees"],
    },
    {
      name: "Codeforces",
      logo: 'https://cdn.iconscout.com/icon/free/png-512/free-code-forces-logo-icon-svg-download-png-2944796.png?f=webp&w=512',
      color: "blue",
      solved: 180,
      streak: 250,
      easy: 80,
      medium: 70,
      hard: 30,
      topics: ["DP", "Graphs", "Math"],
    }
  ]; 

  const PlatformCard = ({ platform }) => {
    const total = platform.easy + platform.medium + platform.hard;
    const easyPercent = (platform.easy / total) * 100;
    const mediumPercent = (platform.medium / total) * 100;
    const hardPercent = (platform.hard / total) * 100;

    const badgeClasses = {
      orange: "bg-orange-500/20 text-orange-400",
      blue: "bg-blue-500/20 text-blue-400"
    };

    return (
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none transition-colors duration-300">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={platform.logo}
              alt={platform.name}
              className="w-12 h-12 rounded-xl object-contain bg-slate-100 dark:bg-white/10 p-1"
            />

            <div>
              <h2 className="text-slate-900 dark:text-white text-lg font-semibold">
                {platform.name}
              </h2>
              <span className={`text-xs px-2 py-1 rounded-md ${badgeClasses[platform.color]}`}>
                Platform
              </span>
            </div>
          </div>

          <ExternalLink className="text-slate-500 dark:text-gray-400 cursor-pointer" size={18} />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-100 dark:bg-white/5 rounded-xl p-4">
            <p className="text-sm text-slate-500 dark:text-gray-400">Total Solved</p>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {platform.solved}
            </h3>
          </div>

          <div className="bg-slate-100 dark:bg-white/5 rounded-xl p-4">
            <p className="text-sm text-slate-500 dark:text-gray-400">Streak</p>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {platform.streak} days
            </h3>
          </div>
        </div>

        {/* DIFFICULTY BAR */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-2">
            Difficulty Distribution
          </p>

          <div className="w-full h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden flex">
            <div
              className="bg-green-500"
              style={{ width: `${easyPercent}%` }}
            ></div>
            <div
              className="bg-yellow-400"
              style={{ width: `${mediumPercent}%` }}
            ></div>
            <div
              className="bg-red-500"
              style={{ width: `${hardPercent}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs mt-2">
            <span className="text-green-400">Easy: {platform.easy}</span>
            <span className="text-yellow-400">Med: {platform.medium}</span>
            <span className="text-red-400">Hard: {platform.hard}</span>
          </div>
        </div>

        {/* TOPICS */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-2">
            Topics Practiced
          </p>

          <div className="flex flex-wrap gap-2">
            {platform.topics.map((topic, i) => (
              <span
                key={i}
                className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-xs"
              >
                {topic}
              </span>
            ))}

            <span className="bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-gray-300 px-3 py-1 rounded-lg text-xs">
              +2 more
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-3 rounded-xl">
          View Detailed Stats
        </button>

      </div>
    );
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {platforms.map((platform, idx) => (
          <PlatformCard key={idx} platform={platform} />
        ))}
      </div>
    </div>
  );
}