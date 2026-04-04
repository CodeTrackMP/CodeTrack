export default function Leaderboard({ participants }) {
  const sorted = [...participants].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
      <h3 className="mb-3">Leaderboard</h3>

      {sorted.map((p, i) => (
        <div key={i} className="flex justify-between">
          <span>#{i + 1} {p.username}</span>
          <span>{p.score}</span>
        </div>
      ))}
    </div>
  );
}