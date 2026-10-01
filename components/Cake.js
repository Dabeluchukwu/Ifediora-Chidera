"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaBirthdayCake, FaHeart } from "react-icons/fa";
import Confetti from "./Confetti";

const TOTAL_CANDLES = 5;

export default function Cake() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [blown, setBlown] = useState(false);
  const [litCandles, setLitCandles] = useState(TOTAL_CANDLES);
  const [showConfetti, setShowConfetti] = useState(false);

  const allOut = litCandles === 0;

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);

    let count = TOTAL_CANDLES;
    const interval = setInterval(() => {
      count -= 1;
      setLitCandles(count);
      if (count <= 0) {
        clearInterval(interval);
        setTimeout(() => {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }, 300);
      }
    }, 220);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen px-4 py-24 flex flex-col items-center justify-center"
    >
      {showConfetti && <Confetti numberOfPieces={220} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <FaBirthdayCake className="text-blue-400 text-xl" />
        <p className="text-blue-300/80 tracking-[0.3em] text-xs uppercase">
          Make a wish
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-cursive text-5xl sm:text-6xl text-center gradient-text mb-4"
      >
        Your Birthday Cake
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-blue-200/70 text-center mb-16 max-w-md"
      >
        {!blown
          ? "Close your eyes, make a wish, and tap the cake to blow the candles 💙"
          : allOut
          ? "Wish made. I hope every single one comes true, Mami 💗"
          : "Blowing out the candles..."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="relative cursor-pointer select-none"
        onClick={handleBlow}
        whileHover={!blown ? { scale: 1.03 } : {}}
        whileTap={!blown ? { scale: 0.97 } : {}}
      >
        <div className="absolute inset-0 -z-10 blur-[80px] bg-blue-500/30 rounded-full scale-125" />

        {/* CANDLES */}
        <div className="flex justify-center items-end gap-3 sm:gap-4 mb-2 relative z-10">
          {Array.from({ length: TOTAL_CANDLES }).map((_, i) => {
            const isLit = i < litCandles;
            return (
              <div key={i} className="relative flex flex-col items-center">
                <AnimatePresence>
                  {isLit && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: [1, 1.15, 0.95, 1.1, 1],
                        y: [0, -2, 0, -1, 0],
                      }}
                      exit={{ opacity: 0, scale: 0, y: -10 }}
                      transition={{
                        scale: {
                          duration: 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        y: {
                          duration: 0.9,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        opacity: { duration: 0.2 },
                      }}
                      className="w-3 h-4 sm:w-4 sm:h-5 rounded-full mb-1"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 70%, #fde047 0%, #f59e0b 40%, #ec4899 90%)",
                        boxShadow:
                          "0 0 12px rgba(253,224,71,0.9), 0 0 24px rgba(236,72,153,0.6)",
                      }}
                    />
                  )}
                </AnimatePresence>

                {!isLit && blown && (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -30, scale: 1.8 }}
                    transition={{ duration: 1.2 }}
                    className="absolute bottom-full w-3 h-3 rounded-full bg-white/40 blur-sm"
                  />
                )}

                <div className="w-[3px] h-2 bg-gray-700 rounded-sm" />
                <div className="w-3 h-10 sm:w-4 sm:h-12 rounded-sm bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 shadow-md" />
              </div>
            );
          })}
        </div>

        {/* TOP LAYER */}
        <div className="relative w-56 sm:w-72 h-16 sm:h-20 rounded-t-3xl bg-gradient-to-b from-pink-300 via-pink-400 to-pink-500 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.15)] z-10">
          <div className="absolute -bottom-3 left-0 right-0 flex justify-around">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-pink-400"
              />
            ))}
          </div>
        </div>

        {/* MIDDLE LAYER */}
        <div className="w-64 sm:w-80 h-20 sm:h-24 bg-gradient-to-b from-blue-700 to-blue-900 rounded-xl shadow-[inset_0_-10px_20px_rgba(0,0,0,0.3)] relative overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-1 rounded-full"
              style={{
                left: `${(i * 7) % 95}%`,
                top: `${(i * 13) % 80}%`,
                background: i % 2 === 0 ? "#f9a8d4" : "#60a5fa",
                transform: `rotate(${(i * 47) % 180}deg)`,
              }}
            />
          ))}
        </div>

        {/* BOTTOM LAYER */}
        <div className="w-72 sm:w-96 h-24 sm:h-28 bg-gradient-to-b from-blue-900 to-black rounded-xl shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-1 rounded-full"
              style={{
                left: `${(i * 5) % 95}%`,
                top: `${(i * 11) % 80}%`,
                background: i % 3 === 0 ? "#ec4899" : "#93c5fd",
                transform: `rotate(${(i * 63) % 180}deg)`,
              }}
            />
          ))}
        </div>

        <div className="w-[22rem] sm:w-[28rem] h-4 rounded-full bg-gradient-to-b from-blue-200/70 to-blue-500/40 -mt-1 blur-[0.5px]" />
      </motion.div>

      {/* Message area — simplified, no mode="wait" */}
      <div className="mt-32 h-24 flex items-center justify-center px-4 w-full relative">
        <motion.p
          key="hint"
          initial={false}
          animate={{ opacity: allOut ? 0 : [0.4, 1, 0.4] }}
          transition={
            allOut
              ? { duration: 0.3 }
              : { duration: 2, repeat: Infinity }
          }
          className="absolute text-blue-300/70 text-sm tracking-widest uppercase text-center"
          style={{ pointerEvents: "none" }}
        >
          tap the cake ✨
        </motion.p>

        <motion.p
          key="wish"
          initial={{ opacity: 0, y: 20 }}
          animate={
            allOut
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8 }}
          className="absolute font-cursive text-2xl sm:text-4xl gradient-text text-center leading-tight px-4"
          style={{ pointerEvents: "none" }}
        >
          Happy Birthday, Mami{" "}
          <FaHeart className="inline text-pink-400 text-lg sm:text-xl align-middle" />
        </motion.p>
      </div>
    </section>
  );
}