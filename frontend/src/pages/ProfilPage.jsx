import React, { useRef, useState } from "react";
import { Pencil, LogOut, Trash2, Image } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const username = (localStorage.getItem("username") || "User").trim() || "User";

  // Profile State
  const [profile, setProfile] = useState({
    name: "Alex Chen",
    bio: "Competitive programmer & problem solver",
    birthday: "2000-01-01",
  });
  const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem("profileAvatar") || "");

  // Platform State
  const [platforms, setPlatforms] = useState({
    leetcode: "alex_codes",
    codeforces: "alex_cf",
  });

  const [editing, setEditing] = useState({
    leetcode: false,
    codeforces: false,
  });

  const [passwordOpen, setPasswordOpen] = useState(false);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlatformChange = (platform, value) => {
    setPlatforms((prev) => ({ ...prev, [platform]: value }));
  };

  const disconnectPlatform = (platform) => {
    setPlatforms((prev) => ({ ...prev, [platform]: "" }));
  };

  const handleAvatarEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setAvatarUrl(reader.result);
      localStorage.setItem("profileAvatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-[#05070d] dark:text-slate-100 transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300">
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="max-w-4xl mx-auto py-8 px-6 space-y-6 w-full text-slate-900 dark:text-white">

        {/* SECTION 1 - PROFILE */}
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none">
          <h2 className="text-lg font-semibold mb-4">Profile Info</h2>

          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <p className="text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-2">Profile Picture</p>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 flex items-center justify-center">
                  <Image size={22} className="text-blue-300" />
                </div>
              )}
              <button
                type="button"
                onClick={handleAvatarEditClick}
                className="absolute bottom-0 right-0 bg-blue-600 text-xs px-2 py-1 rounded-md"
              >
                Edit
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Username</p>
              <p className="font-medium">{username}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-1.5">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
                className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-1.5">
                Bio
              </label>
              <textarea
                id="bio"
                rows={2}
                value={profile.bio}
                onChange={(e) => handleProfileChange("bio", e.target.value)}
                className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Write a short bio about yourself"
              />
            </div>

            <div>
              <label htmlFor="birthday" className="block text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-1.5">
                Birthday
              </label>
              <input
                id="birthday"
                type="date"
                value={profile.birthday}
                onChange={(e) => handleProfileChange("birthday", e.target.value)}
                className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2 - PLATFORMS */}
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none">
          <h2 className="text-lg font-semibold mb-4">
            Connected Platforms
          </h2>

          <div className="space-y-3">

            {/* Codeforces */}
            <div className="flex justify-between items-center bg-slate-50 dark:bg-white/5 rounded-lg px-4 py-3 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200">
              <span>Codeforces</span>

              <div className="flex items-center gap-3">
                {editing.codeforces ? (
                  <div>
                    <label htmlFor="codeforcesHandle" className="block text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-1">
                      Handle
                    </label>
                    <input
                      id="codeforcesHandle"
                      value={platforms.codeforces}
                      onChange={(e) =>
                        handlePlatformChange("codeforces", e.target.value)
                      }
                      className="bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded px-2 py-1 text-sm"
                    />
                  </div>
                ) : (
                  <span className="text-slate-500 dark:text-gray-400">
                    {platforms.codeforces || "Not connected"}
                  </span>
                )}

                <button
                  onClick={() =>
                    setEditing((prev) => ({
                      ...prev,
                      codeforces: !prev.codeforces,
                    }))
                  }
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => disconnectPlatform("codeforces")}
                  className="text-red-400 text-sm"
                >
                  Disconnect
                </button>
              </div>
            </div>

            {/* LeetCode */}
            <div className="flex justify-between items-center bg-slate-50 dark:bg-white/5 rounded-lg px-4 py-3 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200">
              <span>LeetCode</span>

              <div className="flex items-center gap-3">
                {editing.leetcode ? (
                  <div>
                    <label htmlFor="leetcodeHandle" className="block text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-1">
                      Username
                    </label>
                    <input
                      id="leetcodeHandle"
                      value={platforms.leetcode}
                      onChange={(e) =>
                        handlePlatformChange("leetcode", e.target.value)
                      }
                      className="bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded px-2 py-1 text-sm"
                    />
                  </div>
                ) : (
                  <span className="text-slate-500 dark:text-gray-400">
                    {platforms.leetcode || "Not connected"}
                  </span>
                )}

                <button
                  onClick={() =>
                    setEditing((prev) => ({
                      ...prev,
                      leetcode: !prev.leetcode,
                    }))
                  }
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => disconnectPlatform("leetcode")}
                  className="text-red-400 text-sm"
                >
                  Disconnect
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3 - SETTINGS */}
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none">
          <h2 className="text-lg font-semibold mb-4">
            Account Settings
          </h2>

          <div className="space-y-4">

            {/* Change Password */}
            <div>
              <button
                onClick={() => setPasswordOpen(!passwordOpen)}
                className="bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200"
              >
                Change Password
              </button>

              {passwordOpen && (
                <div className="mt-3 space-y-2">
                  <div>
                    <label htmlFor="currentPassword" className="block text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-1.5">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      placeholder="Current Password"
                      className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-300 mb-1.5">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      placeholder="New Password"
                      className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Logout */}
            <button className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200">
              <LogOut size={16} />
              Logout
            </button>

            {/* Delete */}
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete your account?")) {
                  console.log("Account deleted");
                }
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <Trash2 size={16} />
              Delete Account
            </button>

          </div>
        </div>

        </div>
      </div>
    </div>
  );
}