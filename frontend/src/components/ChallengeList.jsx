import ChallengeCard from "./ChallengeCard";

export default function ChallengeList({ challenges, selected, onSelect }) {
  return (
    <div className="space-y-2 p-3">
      {challenges.map((c) => (
        <ChallengeCard
          key={c.id}
          challenge={c}
          active={selected?.id === c.id}
          onClick={() => onSelect(c)}
        />
      ))}
    </div>
  );
}