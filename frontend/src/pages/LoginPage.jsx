import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CodeXml } from "lucide-react";
import useAuthActions from "@/features/auth/hooks/useAuthActions";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -120 : 120,
      opacity: 0
    })
  };

  const direction = isSignup ? 1 : -1;

  // ✅ Handle submit (Login / Signup)
  const { handleLogin, handleSignup, loading, error } = useAuthActions();
const handleSubmit = (e) => {
  e.preventDefault();

  if (isSignup) {
    handleSignup(signupForm);
  } else {
    handleLogin({
      email: loginForm.email,
      password: loginForm.password,
    });
  }
};

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleLoginChange = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignupChange = (field, value) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen flex bg-slate-100 text-slate-900 dark:bg-[#05070d] dark:text-slate-100 transition-colors duration-300">

      <button
        type="button"
        onClick={handleThemeToggle}
        aria-label="Toggle theme"
        className="absolute right-4 top-4 z-20 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>

      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md p-10 rounded-2xl overflow-hidden
        bg-white border border-slate-200 shadow-sm
        dark:bg-white/5 dark:backdrop-blur-xl
        dark:border-white/10
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-colors duration-300">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-md bg-slate-900 dark:bg-white transition-colors duration-300 flex items-center justify-center">
              <CodeXml size={16} className="text-white dark:text-slate-900" strokeWidth={2.3} />
            </div>
            <span className="font-semibold text-lg text-slate-900 dark:text-white">CodeTrack</span>
          </div>

          {/* Toggle */}
          <div className="text-sm text-slate-500 dark:text-gray-400 mb-6">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </div>

          {/* FORM AREA */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>

              {!isSignup ? (
                <motion.form
                  key="login"
                  onSubmit={handleSubmit}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold mb-2">
                    Login to your account
                  </h2>

                  <p className="text-slate-500 dark:text-gray-400 mb-4">
                    Welcome back to CodeTrack
                  </p>

                  <button type="button" className="w-full flex items-center justify-center gap-3 border border-slate-200 bg-white rounded-xl py-3 hover:bg-slate-50 transition-colors dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="google"
                      className="w-5 h-5"
                    />
                    <span className="font-medium">
                      Continue with Google
                    </span>
                  </button>

                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
                    <span className="text-slate-400 dark:text-gray-500 text-sm">
                      or Login with Email
                    </span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={(e) => handleLoginChange("username", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) => handleLoginChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />

                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => handleLoginChange("password", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold py-3 rounded-xl shadow-sm"
                  >
                    Login
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  onSubmit={handleSubmit}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold mb-2">
                    Create your account
                  </h2>

                 

                  <button type="button" className="w-full flex items-center justify-center gap-3 border border-slate-200 bg-white rounded-xl py-3 hover:bg-slate-50 transition-colors dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="google"
                      className="w-5 h-5"
                    />
                    <span className="font-medium">
                      Continue with Google
                    </span>
                  </button>

                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
                    <span className="text-slate-400 dark:text-gray-500 text-sm">
                      or Signup with Email
                    </span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Username"
                    value={signupForm.username}
                    onChange={(e) => handleSignupChange("username", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={signupForm.email}
                    onChange={(e) => handleSignupChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />

                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={signupForm.password}
                    onChange={(e) => handleSignupChange("password", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold py-3 rounded-xl shadow-sm"
                  >
                    Register Now
                  </button>
                </motion.form>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="hidden lg:flex w-1/2 p-6 items-center justify-center relative overflow-hidden">

        <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 top-10 right-20"></div>
        <div className="absolute w-96 h-96 bg-linear-to-br from-slate-400 to-blue-300 dark:from-blue-900 dark:to-slate-800 rounded-full blur-3xl opacity-25 dark:opacity-30 bottom-10 left-10 transition-colors duration-300"></div>

        <motion.img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
          alt="dashboard preview"
          className="w-full h-full object-cover rounded-2xl relative z-10"
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

    </div>
  );
}