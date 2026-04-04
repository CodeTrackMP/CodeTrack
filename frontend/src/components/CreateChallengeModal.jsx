import { useState } from "react";

export default function CreateChallengeModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    problems: 70,
    time: 30
  });

  const valid = form.problems + form.time === 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#0b0f19] p-6 rounded-2xl w-100 border border-white/10">
        <h2 className="mb-4">Create Challenge</h2>

        <input
          placeholder="Title"
          className="w-full mb-2 bg-white/5 p-2 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-2 bg-white/5 p-2 rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input type="datetime-local" className="w-full mb-2 bg-white/5 p-2 rounded"
          onChange={(e) => setForm({ ...form, start: e.target.value })} />

        <input type="datetime-local" className="w-full mb-2 bg-white/5 p-2 rounded"
          onChange={(e) => setForm({ ...form, end: e.target.value })} />

        <div className="flex gap-2 mb-2">
          <input type="number" value={form.problems}
            onChange={(e) => setForm({ ...form, problems: +e.target.value })}
            className="w-1/2 bg-white/5 p-2 rounded" />
          <input type="number" value={form.time}
            onChange={(e) => setForm({ ...form, time: +e.target.value })}
            className="w-1/2 bg-white/5 p-2 rounded" />
        </div>

        {!valid && <p className="text-red-400 text-sm">Must total 100</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            disabled={!valid}
            onClick={() => {
              onCreate({ ...form, id: Date.now(), status: "DRAFT", participants: [] });
              onClose();
            }}
            className="bg-blue-600 px-3 py-1 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}