import React, { useState } from "react";
import { Users, Trophy, Clock, Plus } from "lucide-react";

export default function BattleArenaPage() {
  const [activeTab, setActiveTab] = useState("my");

  // MOCK DATA
  const challenges = [
    {
      id: 1,
      title: "Weekly Coding Battle",
      status: "ACTIVE",
      starts_at: "2026-04-01",
      ends_at: "2026-04-05",
      participants: 5,
      leaderboard: [
        { username: "alex", solved: 5, score: 90 },
        { username: "you", solved: 4, score: 80 },
        { username: "john", solved: 3, score: 60 },
      ],
    },
  ];

  const invitations = [
    {
      id: 1,
      title: "DP Challenge",
      creator: "Sarah",
      starts_at: "2026-04-06",
      status: "INVITED",
    },
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    problems: 50,
    time: 50,
    users: [],
    inputUser: "",
  });

  const handleAddUser = () => {
    if (!form.inputUser) return;
    setForm({
      ...form,
      users: [...form.users, form.inputUser],
      inputUser: "",
    });
  };

  const isValidWeights = form.problems + form.time === 100;

  const statusColors = {
    ACTIVE: "bg-green-500/20 text-green-400",
    DRAFT: "bg-yellow-500/20 text-yellow-400",
    COMPLETED: "bg-blue-500/20 text-blue-400",
    CANCELLED: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6">

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        {["my", "create", "invites"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {tab === "my" && "My Challenges"}
            {tab === "create" && "Create Challenge"}
            {tab === "invites" && "Invitations"}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "my" && (
        <div className="space-y-4">
          {challenges.map((c) => (
            <div
              key={c.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all"
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <span className={`px-2 py-1 rounded-md text-xs ${statusColors[c.status]}`}>
                  {c.status}
                </span>
              </div>

              <div className="text-sm text-gray-400 mb-3 flex gap-4">
                <span><Clock size={14} /> {c.starts_at} → {c.ends_at}</span>
                <span><Users size={14} /> {c.participants}</span>
              </div>

              {/* Leaderboard */}
              <div className="mt-3 space-y-2">
                {c.leaderboard.map((p, i) => (
                  <div
                    key={i}
                    className={`flex justify-between px-3 py-2 rounded-lg ${
                      p.username === "you"
                        ? "bg-blue-500/20"
                        : "bg-white/5"
                    }`}
                  >
                    <span>#{i + 1} {p.username}</span>
                    <span>{p.solved} solved • {p.score} pts</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "create" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-xl">
          <h2 className="text-lg font-semibold mb-4">Create Challenge</h2>

          <div className="space-y-4">
            <input
              placeholder="Title"
              className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input
              type="datetime-local"
              className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
              onChange={(e) => setForm({ ...form, start: e.target.value })}
            />

            <input
              type="datetime-local"
              className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
              onChange={(e) => setForm({ ...form, end: e.target.value })}
            />

            {/* Weights */}
            <div className="flex gap-2">
              <input
                type="number"
                value={form.problems}
                onChange={(e) => setForm({ ...form, problems: +e.target.value })}
                className="w-1/2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
                placeholder="Problems %"
              />
              <input
                type="number"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: +e.target.value })}
                className="w-1/2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
                placeholder="Time %"
              />
            </div>

            {!isValidWeights && (
              <p className="text-red-400 text-sm">Weights must equal 100%</p>
            )}

            {/* Participants */}
            <div className="flex gap-2">
              <input
                placeholder="Add user"
                className="flex-1 bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
                value={form.inputUser}
                onChange={(e) => setForm({ ...form, inputUser: e.target.value })}
              />
              <button
                onClick={handleAddUser}
                className="bg-blue-600 px-3 rounded-lg"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.users.map((u, i) => (
                <span key={i} className="bg-white/10 px-2 py-1 rounded text-sm">
                  {u}
                </span>
              ))}
            </div>

            <button
              disabled={!isValidWeights}
              className={`w-full py-2 rounded-lg ${
                isValidWeights
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-blue-600/40"
              }`}
            >
              Create Challenge
            </button>
          </div>
        </div>
      )}

      {activeTab === "invites" && (
        <div className="space-y-4">
          {invitations.map((inv) => (
            <div
              key={inv.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{inv.title}</h3>
                <p className="text-sm text-gray-400">
                  By {inv.creator} • {inv.starts_at}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="bg-green-500/20 text-green-400 px-3 py-1 rounded">
                  Accept
                </button>
                <button className="bg-red-500/20 text-red-400 px-3 py-1 rounded">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}