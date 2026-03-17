import React, { useMemo } from "react";

export default function ActivityHeatmap() {
  // Generate mock data (365 days)
  const data = useMemo(() => {
    const days = [];
    const start = new Date("2026-01-01");

    for (let i = 0; i < 365; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);

      days.push({
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 5) // 0–4 activity
      });
    }

    return days;
  }, []);

  // Map count → color
  const getColor = (count) => {
    if (count === 0) return "bg-gray-700";
    if (count === 1) return "bg-green-900";
    if (count === 2) return "bg-green-700";
    if (count === 3) return "bg-green-500";
    return "bg-green-400";
  };

  // Group into weeks (columns)
  const weeks = [];
  let week = [];

  data.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % 7 === 0) {
      weeks.push(week);
      week = [];
    }
  });

  // Month labels (approx positions)
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">
          Coding Activity
        </h2>
        <p className="text-sm text-gray-400">
          GitHub-style contribution graph • Hover a day to see details
        </p>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">

        {/* Month labels */}
        <div className="flex ml-8 mb-2 text-xs text-gray-400">
          {months.map((m, i) => (
            <div key={i} className="flex-1 text-center">
              {m}
            </div>
          ))}
        </div>

        <div className="flex">

          {/* Day labels */}
          <div className="flex flex-col justify-between mr-2 text-xs text-gray-500">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className={`w-3 h-3 rounded-sm ${getColor(day.count)}
                    hover:scale-110 transition-all duration-150 relative group`}
                  >
                    {/* Tooltip */}
                    <div className="absolute z-20 hidden group-hover:block -top-10 left-1/2 -translate-x-1/2 bg-black text-xs text-white px-2 py-1 rounded whitespace-nowrap">
                      {day.count} problems on {day.date}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-700 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>

    </div>
  );
}