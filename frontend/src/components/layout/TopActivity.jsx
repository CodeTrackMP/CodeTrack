import React, { useState, useEffect } from "react";
import Leaderboard from "../Leaderboard";
import { getTopicActivity } from "../../api/dashboardApi";

export default function TopActivity() {
  const [topics, setTopics] = useState([]);
  const [leaderboardParticipants, setLeaderboardParticipants] = useState([]);

  useEffect(() => {
    getTopicActivity()
      .then(res => {
        const data = res.data;
        const max = data.length > 0 ? data[0].count : 1;
        const formatted = data.map(item => ({
          topic: item.topic,
          count: item.count,
          percent: Math.round((item.count / max) * 100),
        }));
        setTopics(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("challenges");
    if (saved) {
      const challenges = JSON.parse(saved);
      if (challenges.length > 0 && challenges[0].participants) {
        setLeaderboardParticipants(challenges[0].participants);
      }
    }
  }, []);

  return (
    <div className="mt-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider">
          INSIGHTS
        </h2>
        <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT CARD - Topic Activity */}
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 transition-colors duration-300">
          <h3 className="text-slate-900 dark:text-white font-semibold mb-1">
            Topic Activity
          </h3>
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">
            Problems solved by topic
          </p>

          <div className="space-y-4">
            {topics.map((item, index) => (
              <div key={index}>
                
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-gray-300">{item.topic}</span>
                  <span className="text-slate-500 dark:text-gray-400">{item.count}</span>
                </div>

                <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD - Leaderboard */}
        <div className="transition-colors duration-300">
          <Leaderboard participants={leaderboardParticipants} />
        </div>

      </div>

    </div>
  );
}