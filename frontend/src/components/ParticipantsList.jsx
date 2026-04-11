export default function ParticipantList({ participants }) {
  return (
    <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors duration-300">
      <h3 className="mb-3">Participants</h3>

      {participants.map((p, i) => (
        <div key={i} className="flex justify-between py-2 text-sm text-slate-700 dark:text-slate-200">
          <span>{p.username}</span>
          <span>{p.status}</span>
          <span>{p.problems_solved}</span>
          <span>{p.score}</span>
        </div>
      ))}
    </div>
  );
}