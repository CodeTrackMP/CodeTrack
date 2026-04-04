import ParticipantList from "./ParticipantsList";
import Leaderboard from "./Leaderboard";
import InviteUserInput from "./InviteUserInput";
import ActionButtons from "./ActionButtons";

export default function ChallengeDetails({ challenge }) {
  return (
    <div className="space-y-6">

      <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold">{challenge.title}</h2>
        <p className="text-gray-400">{challenge.description}</p>
      </div>

      <InviteUserInput />

      <ParticipantList participants={challenge.participants} />

      <Leaderboard participants={challenge.participants} />

      <ActionButtons challenge={challenge} />

    </div>
  );
}