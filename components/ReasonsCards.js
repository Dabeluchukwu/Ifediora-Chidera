"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaStar } from "react-icons/fa";

const REASONS = [
  "Because your voice is my favorite sound in the whole universe.",
  "Because you make even the most boring days feel like an adventure.",
  "Because your lips are so damm sexy🥰 .",
  "Because your smile feels like the early morning sun.",
  "Because you're beautiful — inside, outside, and in every way that matters (especially outside damm!😊).",
  "Because not talking to you make me feel incomplete.",
  "Because you make me want to be a better person every single day.",
  "Because every love song suddenly made sense the day I met you.",
  "Because you're my favorite person.",
  "Because you're you, Mami. And that's more than enough.",
];

const FLIPPED_KEY = "mami-reasons-flipped";
const SEEN_KEY = "mami-reasons-seen";

function readSet(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function writeSet(key, set) {
  try {
    sessionStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

function FlipCard({ reason, index, flipped, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative h-48 w-full cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => onToggle(index)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-400/40 flex flex-col items-center justify-center p-4 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <FaStar className="text-pink-300 text-2xl mb-3" />
          <p className="text-white font-medium text-lg">Reason</p>
          <p className="font-cursive text-4xl text-white mt-1">#{index + 1}</p>
          <p className="text-blue-100/80 text-xs mt-3 uppercase tracking-widest">
            Tap to reveal
          </p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black to-blue-950 border border-pink-400/40 flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(236,72,153,0.3)]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <FaHeart className="text-pink-400 text-lg mb-3" />
          <p className="text-white/95 text-sm leading-relaxed">{reason}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ReasonsCards({ onComplete }) {
  // Indices currently showing their back
  const [flipped, setFlipped] = useState(() => new Set());
  // Indices that have EVER been flipped (never shrinks)
  const [seen, setSeen] = useState(() => new Set());
  // Whether the rule has been satisfied at least once
  const [completed, setCompleted] = useState(false);
  // Have we hydrated from sessionStorage yet?
  const [hydrated, setHydrated] = useState(false);

  // Guard so onComplete fires only once
  const firedRef = useRef(false);

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    const storedFlipped = readSet(FLIPPED_KEY);
    const storedSeen = readSet(SEEN_KEY);
    setFlipped(storedFlipped);
    setSeen(storedSeen);
    if (storedSeen.size === REASONS.length) {
      setCompleted(true);
    }
    setHydrated(true);
  }, []);

  // Fire onComplete when completed first becomes true (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    if (completed && !firedRef.current) {
      firedRef.current = true;
      onComplete?.();
    }
  }, [completed, hydrated, onComplete]);

  const handleToggle = (index) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      writeSet(FLIPPED_KEY, next);
      return next;
    });

    setSeen((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      writeSet(SEEN_KEY, next);
      if (next.size === REASONS.length) {
        setCompleted(true);
      }
      return next;
    });
  };

  return (
    <section className="relative min-h-screen px-4 py-24 flex flex-col items-center justify-center blue-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <FaHeart className="text-pink-400 text-xl" />
        <p className="text-blue-300/80 tracking-[0.3em] text-xs uppercase">
          Just a few of many
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-cursive text-5xl sm:text-6xl text-center gradient-text mb-4"
      >
        Reasons I Love You
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-blue-200/70 text-center mb-16 max-w-md"
      >
        Tap each card to see why, Mami 💙
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {REASONS.map((reason, i) => (
          <FlipCard
            key={i}
            reason={reason}
            index={i}
            flipped={flipped.has(i)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
}