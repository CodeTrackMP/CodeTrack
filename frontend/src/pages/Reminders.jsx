import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Bell, Check, X, Plus, Clock, Flame, Sword, HelpCircle } from "lucide-react";

const motivationalMessages = [
  "Keep pushing forward! Every problem solved brings you closer to mastery.",
  "Consistency is key. One problem a day keeps the rust away!",
  "You're building something amazing. Stay focused and keep coding!",
  "Small daily wins lead to big achievements. You've got this!",
  "Code like there's no tomorrow. Your future self will thank you!"
];

const formatDueDate = (dateString) => {
  if (!dateString) return "Not set";
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function Reminders() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  const [reminders, setReminders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    task: "Streak",
    dueDate: ""
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Load reminders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) {
      const parsed = JSON.parse(saved);
      setReminders(parsed);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Set timeouts for notifications
  useEffect(() => {
    const now = new Date();
    reminders.forEach(reminder => {
      const dueTime = new Date(reminder.dueDate);
      if (dueTime > now) {
        const timeoutId = setTimeout(() => {
          showNotification(reminder);
        }, dueTime - now);
        reminder.timeoutId = timeoutId;
      }
    });

    return () => {
      reminders.forEach(reminder => {
        if (reminder.timeoutId) clearTimeout(reminder.timeoutId);
      });
    };
  }, [reminders]);

  const showNotification = (reminder) => {
    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setNotification({
      ...reminder,
      message
    });
  };

  const addReminder = () => {
    if (!formData.dueDate) return;

    const newReminder = {
      id: Date.now(),
      ...formData
    };

    setReminders([...reminders, newReminder]);
    setFormData({ task: "Streak", dueDate: "" });
    setShowAddForm(false);
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const markCompleted = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  const getTaskIcon = (task) => {
    switch (task) {
      case "Streak": return <Flame size={16} className="text-orange-500" />;
      case "Battle": return <Sword size={16} className="text-blue-500" />;
      case "Question": return <HelpCircle size={16} className="text-green-500" />;
      default: return <Clock size={16} className="text-slate-500" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-[#05070d] dark:text-slate-100 transition-colors duration-300">

      <Sidebar />

      <div className="flex flex-col flex-1 bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300">

        <Navbar theme={theme} onThemeToggle={handleThemeToggle} />

        <div className="p-6">
          <h1 className="mt-6 text-slate-900 dark:text-white mb-6">Reminders</h1>

          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell size={20} className="text-blue-500" />
                My Reminders
              </h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <div className="mb-4 p-4 bg-slate-50 dark:bg-white/5 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
                    Task Type
                  </label>
                  <select
                    value={formData.task}
                    onChange={(e) => setFormData({...formData, task: e.target.value})}
                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Streak">Streak 🔥</option>
                    <option value="Battle">Battle ⚔️</option>
                    <option value="Question">Question ❓</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
                    Due Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addReminder}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Add Reminder
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Reminders List */}
            <div className="space-y-3">
              {reminders.length === 0 ? (
                <p className="text-slate-500 dark:text-gray-400 text-sm">No reminders set. Add one to stay on track!</p>
              ) : (
                reminders.map(reminder => (
                  <div key={reminder.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTaskIcon(reminder.task)}
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {reminder.task}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-gray-500">
                          Due: {formatDueDate(reminder.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => markCompleted(reminder.id)}
                        className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Notification Popup */}
      {notification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md mx-4 shadow-xl transition-opacity duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                {getTaskIcon(notification.task)}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Reminder</h3>
            </div>
            <p className="text-slate-600 dark:text-gray-300 mb-4">
              Time to focus on your {notification.task.toLowerCase()}! Keep up the great work.
            </p>
            <p className="text-slate-500 dark:text-gray-400 text-sm italic mb-6">
              {notification.message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  markCompleted(notification.id);
                  dismissNotification();
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Check size={16} />
                Completed
              </button>
              <button
                onClick={dismissNotification}
                className="flex-1 bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <X size={16} />
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
