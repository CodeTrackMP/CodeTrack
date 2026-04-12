import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { getPlatformStats } from "../../api/dashboardApi.js";

const PlatformCard = ({ platform }) => {
  const total = platform.easy + platform.medium + platform.hard;
  const easyPercent = total > 0 ? (platform.easy / total) * 100 : 0;
  const mediumPercent = total > 0 ? (platform.medium / total) * 100 : 0;
  const hardPercent = total > 0 ? (platform.hard / total) * 100 : 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src={platform.logo} alt={platform.name} className="w-6 h-6" />
          <span className="font-semibold text-slate-900 dark:text-white">
            {platform.name}
          </span>
          <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
            Platform
          </span>
        </div>
        <ExternalLink size={16} className="text-slate-400" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-slate-500 dark:text-slate-400 text-sm">Total Solved</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {platform.solved}
          </div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400 text-sm">Streak</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {platform.streak} days
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="text-slate-500 dark:text-slate-400 text-sm mb-1">
          Difficulty Distribution
        </div>
        <div className="flex h-2 rounded-full overflow-hidden">
          <div className="bg-green-500" style={{ width: `${easyPercent}%` }} />
          <div className="bg-yellow-500" style={{ width: `${mediumPercent}%` }} />
          <div className="bg-red-500" style={{ width: `${hardPercent}%` }} />
        </div>
        <div className="flex justify-between text-xs mt-1 text-slate-400">
          <span>Easy: {platform.easy}</span>
          <span>Med: {platform.medium}</span>
          <span>Hard: {platform.hard}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {platform.topics.slice(0, 3).map((topic, i) => (
          <span
            key={i}
            className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full"
          >
            {topic}
          </span>
        ))}
        {platform.topics.length > 3 && (
          <span className="text-xs text-slate-400">
            +{platform.topics.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

export default function PlatformSection() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlatformStats()
      .then(res => setPlatforms(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-slate-400">Loading platforms...</div>;

  if (platforms.length === 0) {
    return (
      <div className="text-slate-400 text-sm mt-4">
        No platforms connected yet. Go to Settings to connect LeetCode or Codeforces.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      {platforms.map((platform, index) => (
        <PlatformCard key={index} platform={platform} />
      ))}
    </div>
  );
}