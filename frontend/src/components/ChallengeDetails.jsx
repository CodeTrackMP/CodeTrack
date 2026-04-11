import ParticipantList from "./ParticipantsList";
import Leaderboard from "./Leaderboard";
import InviteUserInput from "./InviteUserInput";
import ActionButtons from "./ActionButtons";

export default function ChallengeDetails({ challenge }) {
  return (
    <div className="space-y-6">

      <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors duration-300">
        <h2 className="text-xl font-semibold">{challenge.title}</h2>
        <p className="text-slate-500 dark:text-gray-400">{challenge.description}</p>
      </div>

      <InviteUserInput />

      <ParticipantList participants={challenge.participants} />

      <Leaderboard participants={challenge.participants} />

      <ActionButtons challenge={challenge} />

    </div>
  );
}