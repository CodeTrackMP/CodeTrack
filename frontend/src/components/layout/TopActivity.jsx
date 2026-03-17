import React from "react";
import { ExternalLink } from "lucide-react";

export default function TopActivity() {
  const topics = [
    { topic: "Arrays", count: 145, percent: 100 },
    { topic: "Sorting", count: 98, percent: 70 },
    { topic: "Strings", count: 120, percent: 85 },
    { topic: "Trees", count: 75, percent: 55 },
    { topic: "Graphs", count: 60, percent: 45 }
  ];

  const battles = [
    { opponent: "Sarah_Dev", topic: "DP", result: "Won" },
    { opponent: "CodeMaster99", topic: "Graphs", result: "Lost" },
    { opponent: "AlgoKing", topic: "Trees", result: "Won" },
    { opponent: "BugHunter", topic: "Arrays", result: "Won" }
  ];

  const wins = battles.filter(b => b.result === "Won").length;
  const losses = battles.length - wins;

  return (
    <div className="mt-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-sm font-semibold text-white tracking-wider">
          INSIGHTS
        </h2>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT CARD - Topic Activity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-1">
            Topic Activity
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Problems solved by topic
          </p>

          <div className="space-y-4">
            {topics.map((item, index) => (
              <div key={index}>
                
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.topic}</span>
                  <span className="text-gray-400">{item.count}</span>
                </div>

                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD - Recent Battles */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-1">
            Recent Battles
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Last 4 battles • Win rate: {Math.round((wins / battles.length) * 100)}%
          </p>

          <div className="space-y-2">
            {battles.map((battle, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-white">
                    {battle.opponent}
                  </span>
                  <span className="text-xs text-gray-400">
                    {battle.topic}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      battle.result === "Won"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {battle.result}
                  </span>

                  <ExternalLink size={14} className="text-gray-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1 bg-green-500/10 text-green-400 text-sm text-center py-2 rounded-lg">
              Wins: {wins}
            </div>
            <div className="flex-1 bg-red-500/10 text-red-400 text-sm text-center py-2 rounded-lg">
              Losses: {losses}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}