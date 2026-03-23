import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

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
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md p-10 rounded-2xl overflow-hidden
        bg-white/60 backdrop-blur-xl
        border border-white/40
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-black rounded-md"></div>
            <span className="font-semibold text-lg">CodeTrack</span>
          </div>

          {/* Toggle */}
          <div className="text-sm text-gray-500 mb-6">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-lime-500 font-medium hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-lime-500 font-medium hover:underline"
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

                  <p className="text-gray-500 mb-4">
                    Welcome back to CodeTrack
                  </p>

                  <button type="button" className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition">
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
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-gray-400 text-sm">
                      or Login with Email
                    </span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  <input
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />

                  <input
                    type="password"
                    required
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />

                  <button
                    type="submit"
                    className="w-full bg-lime-400 hover:bg-lime-500 transition text-black font-semibold py-3 rounded-xl shadow-md"
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

                 

                  <button type="button" className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition">
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
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-gray-400 text-sm">
                      or Signup with Email
                    </span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Username"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />

                  <input
                    type="password"
                    required
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />

                  <button
                    type="submit"
                    className="w-full bg-lime-400 hover:bg-lime-500 transition text-black font-semibold py-3 rounded-xl shadow-md"
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

        <div className="absolute w-72 h-72 bg-lime-400 rounded-full blur-3xl opacity-30 top-10 right-20"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-br from-blue-900 to-slate-800 rounded-full blur-3xl opacity-30 bottom-10 left-10"></div>

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