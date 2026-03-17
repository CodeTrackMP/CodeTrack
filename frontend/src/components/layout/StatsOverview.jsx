import React from "react";
import { Flame, Trophy, BarChart, CheckCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatsOverview() {
  const stats = [
    {
      title: "Total Problems Solved",
      value: "1,248",
      change: "+12%",
      positive: true,
      icon: CheckCircle
    },
    {
      title: "Current Streak",
      value: "24 Days",
      change: "+5%",
      positive: true,
      icon: Flame
    },
    {
      title: "Ranking",
      value: "#342",
      change: "-3%",
      positive: false,
      icon: Trophy
    },
    {
      title: "Accuracy",
      value: "92%",
      change: "+2%",
      positive: true,
      icon: BarChart
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm
            hover:bg-white/10 hover:-translate-y-1 transition-all duration-200"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">
                {stat.title}
              </p>

              <div className="p-2 rounded-lg bg-white/5">
                <Icon size={18} className="text-gray-300" />
              </div>
            </div>

            {/* Value */}
            <h3 className="text-3xl font-semibold text-white mb-2">
              {stat.value}
            </h3>

            {/* Change */}
            <div className="flex items-center gap-1">
              {stat.positive ? (
                <ArrowUpRight size={16} className="text-green-400" />
              ) : (
                <ArrowDownRight size={16} className="text-red-400" />
              )}

              <span
                className={`text-sm ${
                  stat.positive ? "text-green-400" : "text-red-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}