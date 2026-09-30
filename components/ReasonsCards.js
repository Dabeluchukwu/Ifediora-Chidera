"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaHeart, FaStar } from "react-icons/fa";

const REASONS = [
  "Because your laugh is my favorite sound in the whole universe.",
  "Because you make even the most boring days feel like an adventure.",
  "Because you believe in me when I forget to believe in myself.",
  "Because your hugs feel like home.",
  "Because you're beautiful — inside, outside, and in every way that matters.",
  "Because you understand me without me having to explain.",
  "Because you make me want to be a better man every single day.",
  "Because every love song suddenly made sense the day I met you.",
  "Because you're my best friend and my favorite person.",
  "Because you're you, Mami. And that's more than enough.",
];

function FlipCard({ reason, index, inView }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative h-48 w-full cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped(!flipped)}
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

export default function ReasonsCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen px-4 py-24 flex flex-col items-center justify-center blue-section"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
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
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-cursive text-5xl sm:text-6xl text-center gradient-text mb-4"
      >
        Reasons I Love You
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
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
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}