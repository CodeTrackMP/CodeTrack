export default function ParticipantList({ participants }) {
  return (
    <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
      <h3 className="mb-3">Participants</h3>

      {participants.map((p, i) => (
        <div key={i} className="flex justify-between py-2 text-sm">
          <span>{p.username}</span>
          <span>{p.status}</span>
          <span>{p.problems_solved}</span>
          <span>{p.score}</span>
        </div>
      ))}
    </div>
  );
}