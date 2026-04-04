export default function ChallengeCard({ challenge, active, onClick }) {
  const statusColors = {
    DRAFT: "bg-yellow-500/20 text-yellow-400",
    ACTIVE: "bg-green-500/20 text-green-400",
    COMPLETED: "bg-blue-500/20 text-blue-400",
    CANCELLED: "bg-red-500/20 text-red-400"
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all border
      ${active ? "bg-blue-500/20 border-blue-500" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
    >
      <h3 className="font-medium">{challenge.title}</h3>
      <p className="text-xs text-gray-400">
        {challenge.starts_at} → {challenge.ends_at}
      </p>
      <span className={`text-xs px-2 py-1 rounded ${statusColors[challenge.status]}`}>
        {challenge.status}
      </span>
    </div>
  );
}