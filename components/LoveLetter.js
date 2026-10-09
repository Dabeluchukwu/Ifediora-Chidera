"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaEnvelopeOpenText } from "react-icons/fa";

const LETTER_TEXT = `Hey Mami,

Happy birthday, baby. 💙

I've been trying to find the right words for weeks, and honestly, nothing ever felt big enough for what you mean to me. So I'll just say it the way my heart says it every day:

You are my favorite hello, my hardest goodbye, and my best decision.

The way you laugh at my terrible jokes, the way you say my name(sometimes😅), the way you make even the most ordinary day feel like something worth remembering — every single thing about you has quietly become my home.

Today isn't just about celebrating your birthday. It's about celebrating the day the world got brighter, softer, and infinitely more beautiful — because it got you.

Thank you for existing, Dera (Aunty Peku😁). Thank you for giving me a chance.

Here's to more birthdays, more memories, and a lifetime of me being completely obsessed with you.

Forever yours,
Dabi 💙`;

export default function LoveLetter({ onComplete }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < LETTER_TEXT.length) {
        setDisplayed(LETTER_TEXT.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
        onComplete?.();
      }
    }, 13);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 blue-section">
      <div className="relative w-full max-w-3xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <FaEnvelopeOpenText className="text-blue-400 text-xl" />
          <p className="text-blue-300/80 tracking-[0.3em] text-xs uppercase">
            A letter for you
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cursive text-5xl sm:text-6xl text-center gradient-text mb-10"
        >
          From My Heart
        </motion.h2>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-3xl border border-blue-500/30 bg-black/60 backdrop-blur-xl p-8 sm:p-12 shadow-[0_0_60px_rgba(59,130,246,0.2)]"
        >
          {/* Corner hearts */}
          <FaHeart className="absolute top-4 left-4 text-pink-500/30 text-sm" />
          <FaHeart className="absolute top-4 right-4 text-pink-500/30 text-sm" />
          <FaHeart className="absolute bottom-4 left-4 text-pink-500/30 text-sm" />
          <FaHeart className="absolute bottom-4 right-4 text-pink-500/30 text-sm" />

          <div
            className={`whitespace-pre-wrap text-white/90 leading-relaxed text-base sm:text-lg tracking-wide ${
              !done ? "typewriter-cursor" : ""
            }`}
            style={{ fontFamily: "Georgia, serif" }}
          >
            {displayed}
          </div>

          {/* Signature flourish */}
          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mt-8 flex items-center justify-center gap-2 text-pink-400/70"
            >
              <div className="h-px w-12 bg-pink-400/40" />
              <FaHeart className="text-sm" />
              <div className="h-px w-12 bg-pink-400/40" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}