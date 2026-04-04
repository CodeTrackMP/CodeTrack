import { useState } from "react";

export default function InviteUserInput() {
  const [user, setUser] = useState("");

  return (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex gap-2">
      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Invite user"
        className="flex-1 bg-white/5 p-2 rounded"
      />
      <button className="bg-blue-600 px-3 rounded">Invite</button>
    </div>
  );
}