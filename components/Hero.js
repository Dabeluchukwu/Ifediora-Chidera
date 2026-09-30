"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import Confetti from "./Confetti";

export default function Hero() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Floating hearts background
  const hearts = Array.from({ length: 12 });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden blue-section">
      {/* Confetti on load */}
      {showConfetti && <Confetti numberOfPieces={250} />}

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/30"
            style={{
              left: `${(i * 8.5) % 100}%`,
              top: `${(i * 13) % 100}%`,
              fontSize: `${14 + (i % 4) * 8}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            <FaHeart />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-blue-300/80 tracking-[0.3em] text-sm uppercase mb-4"
        >
          A little something for you
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-cursive text-6xl sm:text-7xl md:text-8xl leading-tight text-glow mb-6"
        >
          <span className="gradient-text">Happy Birthday,</span>
          <br />
          <span className="text-white">Mami</span>{" "}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block"
          >
            💙
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-blue-100/80 text-lg sm:text-xl max-w-xl mx-auto mb-4"
        >
          Today the world celebrates my favorite person. And I made this
          little corner of the internet just for you.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-pink-300/90 font-cursive text-2xl"
        >
          Scroll down, my love 💗
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 0.6 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-10 text-blue-300/70 text-2xl"
      >
        <FaChevronDown />
      </motion.div>
    </section>
  );
}