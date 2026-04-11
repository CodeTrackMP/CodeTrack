export default function Leaderboard({ participants }) {
  const sorted = [...participants].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors duration-300">
      <h3 className="mb-3">Leaderboard</h3>

      {sorted.map((p, i) => (
        <div key={i} className="flex justify-between text-slate-700 dark:text-slate-200">
          <span>#{i + 1} {p.username}</span>
          <span>{p.score}</span>
        </div>
      ))}
    </div>
  );
}