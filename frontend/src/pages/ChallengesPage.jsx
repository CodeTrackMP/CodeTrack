import React, { useState, useEffect } from "react";
import ChallengeList from "../components/ChallengeList";
import ChallengeDetails from "../components/ChallengeDetails";
import CreateChallengeModal from "../components/CreateChallengeModal";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [challenges, setChallenges] = useState(()=> {
    const saved = localStorage.getItem("challenges");
    if (saved) return JSON.parse(saved);
    return [
    {
      id: 1,
      title: "Weekly Battle",
      description: "Solve problems fast",
      status: "DRAFT",
      starts_at: "2026-04-05",
      ends_at: "2026-04-06",
      weights: { problems: 70, time: 30 },
      participants: [
        { username: "you", status: "ACCEPTED", problems_solved: 5, score: 90 },
        { username: "alex", status: "INVITED", problems_solved: 0, score: 0 }
      ]
    }
  ];
  });

  useEffect(() => {
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }, [challenges]);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-[#05070d] dark:text-slate-100 transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300">
        <Navbar />

        <div className="flex flex-1 text-white">

          {/* LEFT */}
          <div className="w-[30%] border-r border-white/10 overflow-y-auto">
            <div className="p-4 flex justify-between items-center">
              <h2 className="font-semibold">Challenges</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 px-3 py-1 rounded-lg"
              >
                +
              </button>
            </div>

            <ChallengeList
              challenges={challenges}
              selected={selectedChallenge}
              onSelect={setSelectedChallenge}
            />
          </div>

          {/* RIGHT */}
          <div className="w-[70%] p-6">
            {selectedChallenge ? (
              <ChallengeDetails challenge={selectedChallenge} />
            ) : (
              <div className="text-gray-400">Select a challenge</div>
            )}
          </div>
        </div>

      </div>

      {isModalOpen && (
        <CreateChallengeModal
          onClose={() => setIsModalOpen(false)}
          onCreate={(c) => setChallenges([...challenges, c])}
        />
      )}
    </div>
  );
}