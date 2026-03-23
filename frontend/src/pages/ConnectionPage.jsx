import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PLATFORM_CONFIG = {
  leetcode: {
    label: "LeetCode",
    icon: "💻",
    placeholder: "Enter LeetCode username",
    helper: "Use letters, numbers, underscore, or hyphen.",
    regex: /^[A-Za-z0-9_-]{1,30}$/,
    error: "Enter a valid LeetCode username.",
  },
  codeforces: {
    label: "Codeforces",
    icon: "🚀",
    placeholder: "Enter Codeforces handle",
    helper: "Use 3-24 characters, letters, numbers, underscore.",
    regex: /^[A-Za-z0-9_]{3,24}$/,
    error: "Enter a valid Codeforces handle.",
  },
};

export default function ConnectionPage() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState({
    leetcode: false,
    codeforces: false,
  });

  const [usernames, setUsernames] = useState({
    leetcode: "",
    codeforces: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const togglePlatform = (platform) => {
    setSelected((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const handleChange = (platform, value) => {
    setUsernames((prev) => ({
      ...prev,
      [platform]: value,
    }));
    if (submitError) {
      setSubmitError("");
    }
  };

  const trimmedUsernames = {
    leetcode: usernames.leetcode.trim(),
    codeforces: usernames.codeforces.trim(),
  };

  const getFieldError = (platform) => {
    if (!selected[platform]) return "";
    const value = trimmedUsernames[platform];
    if (!value) return "Username is required.";
    if (!PLATFORM_CONFIG[platform].regex.test(value)) {
      return PLATFORM_CONFIG[platform].error;
    }
    return "";
  };

  const fieldErrors = {
    leetcode: getFieldError("leetcode"),
    codeforces: getFieldError("codeforces"),
  };

  const hasSelection = selected.leetcode || selected.codeforces;
  const hasErrors = Boolean(fieldErrors.leetcode || fieldErrors.codeforces);
  const isValid = hasSelection && !hasErrors;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitError("");
    setIsSubmitting(true);

    try {
      // Simulate a backend call; replace with actual API integration.
      await new Promise((resolve) => setTimeout(resolve, 700));
      navigate("/dashboard");
    } catch {
      setSubmitError("We could not connect your platforms. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg"
      >

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Connect Your Platforms
          </h2>
          <p className="text-sm text-gray-400">
            Link your accounts to track your progress
          </p>
        </div>

        {/* Platforms */}
        <div className="space-y-4 mb-6">
          {Object.keys(PLATFORM_CONFIG).map((platform) => {
            const cfg = PLATFORM_CONFIG[platform];
            const fieldError = fieldErrors[platform];

            return (
              <div key={platform}>
                <button
                  type="button"
                  aria-pressed={selected[platform]}
                  disabled={isSubmitting}
                  onClick={() => togglePlatform(platform)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200
                  ${
                    selected[platform]
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }
                  ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <span className="text-white font-medium">{cfg.label}</span>
                  <span className="text-sm text-gray-400">{cfg.icon}</span>
                </button>

                {selected[platform] && (
                  <div className="mt-3">
                    <label
                      htmlFor={`${platform}-username`}
                      className="block text-sm text-gray-300 mb-1"
                    >
                      {cfg.label} Username
                    </label>
                    <input
                      id={`${platform}-username`}
                      type="text"
                      placeholder={cfg.placeholder}
                      value={usernames[platform]}
                      onChange={(e) => handleChange(platform, e.target.value)}
                      aria-invalid={Boolean(fieldError)}
                      aria-describedby={`${platform}-help ${platform}-error`}
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p
                      id={`${platform}-help`}
                      className="mt-1 text-xs text-gray-400"
                    >
                      {cfg.helper}
                    </p>
                    {fieldError && (
                      <p
                        id={`${platform}-error`}
                        className="mt-1 text-xs text-red-400"
                      >
                        {fieldError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!hasSelection && (
          <p className="mb-4 text-sm text-amber-300">
            Select at least one platform to continue.
          </p>
        )}

        {submitError && (
          <p className="mb-4 text-sm text-red-400" role="alert">
            {submitError}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-2 rounded-lg font-medium transition-all duration-200
          ${
            isValid && !isSubmitting
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-600/40 text-white/50 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Connecting..." : "Connect"}
        </button>

      </form>
    </div>
  );
}