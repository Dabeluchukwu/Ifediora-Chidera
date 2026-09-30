"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaHeart, FaUnlock } from "react-icons/fa";

export default function LoginGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Normalize: lowercase, strip everything that isn't a letter
  const normalize = (str) =>
    str.toLowerCase().replace(/[^a-z]/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = normalize(value);

    if (cleaned === "mami") {
      setSuccess(true);
      setError(false);
      // Let the success animation play before handing off
      setTimeout(() => {
        onUnlock();
      }, 1600);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-pink-500/20 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-[90%] max-w-md p-8 rounded-3xl border border-blue-500/30 bg-black/60 backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.3)]"
          >
            {/* Lock icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center glow-blue">
                <FaLock className="text-white text-2xl" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-center text-white mb-2">
              This is private 💙
            </h1>
            <p className="text-center text-blue-300/80 text-sm mb-8">
              Only one person gets in here.
            </p>

            <form onSubmit={handleSubmit}>
              <label className="block text-sm text-blue-200/90 mb-2">
                What do I call you?
              </label>

              <motion.input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type your answer..."
                autoComplete="off"
                animate={error ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-white placeholder-blue-300/40 outline-none transition-all
                  ${
                    error
                      ? "border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                      : "border-blue-500/40 focus:border-blue-400 focus:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  }`}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-pink-400 text-sm mt-3 text-center"
                >
                  Nice try 😏 Psst... it's what I call you.
                </motion.p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium tracking-wide hover:from-blue-500 hover:to-blue-400 transition-all glow-blue"
              >
                Unlock 💙
              </motion.button>
            </form>

            <p className="text-center text-xs text-blue-300/40 mt-6">
              <FaHeart className="inline mr-1 text-pink-400/60" />
              Made just for you
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center glow-pink mb-6"
            >
              <FaUnlock className="text-white text-4xl" />
            </motion.div>
            <h2 className="text-3xl font-semibold gradient-text">
              Welcome, Mami 💙
            </h2>
            <p className="text-blue-300/70 mt-2 text-sm">
              I knew it was you...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}