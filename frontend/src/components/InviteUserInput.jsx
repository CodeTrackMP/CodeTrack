import { useState } from "react";

export default function InviteUserInput() {
  const [user, setUser] = useState("");

  return (
    <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex gap-2">
      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Invite user"
        className="flex-1 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-white/10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-600 text-white px-3 rounded">Invite</button>
    </div>
  );
}