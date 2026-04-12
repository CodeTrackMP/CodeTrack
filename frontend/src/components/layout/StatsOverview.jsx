import React, { useEffect, useState } from "react";
import { Flame, Trophy, BarChart, CheckCircle } from "lucide-react";
import { getStatsOverview } from "../../api/dashboardApi.js";

export default function StatsOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatsOverview()
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      title: "Total Problems Solved",
      value: data?.totalSolved ?? "-",
      icon: CheckCircle,
    },
    {
      title: "Current Streak",
      value: data ? `${data.currentStreak} Days` : "-",
      icon: Flame,
    },
    {
      title: "Ranking",
      value: data?.ranking ? `#${data.ranking}` : "-",
      icon: Trophy,
    },
    {
      title: "Accuracy",
      value: data ? `${data.accuracy}%` : "-",
      icon: BarChart,
    },
  ];

  if (loading) return <div className="text-slate-400">Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 dark:text-slate-400 text-sm">
              {stat.title}
            </span>
            <stat.icon size={18} className="text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}