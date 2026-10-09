"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import LoginGate from "@/components/LoginGate";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import HerGallery from "@/components/HerGallery";
import ReasonsCards from "@/components/ReasonsCards";
import Cake from "@/components/Cake";
import Proposal from "@/components/Proposal";

const STORAGE_KEY = "mami-unlocked";

const SECTIONS = [Hero, LoveLetter, HerGallery, ReasonsCards, Cake, Proposal];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  const [sectionIndex, setSectionIndex] = useState(0);
  const [completed, setCompleted] = useState(() => new Set());

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        setUnlocked(true);
      }
    } catch (e) {
      // ignore
    }
    setChecked(true);
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch (e) {
      // ignore
    }
  };

  // Stable onComplete per section
  const completeHandlers = useMemo(
    () =>
      SECTIONS.map((_, index) => () => {
        setCompleted((prev) => {
          if (prev.has(index)) return prev;
          const next = new Set(prev);
          next.add(index);
          return next;
        });
      }),
    []
  );

  const handleContinue = () => {
    setSectionIndex((i) => Math.min(i + 1, SECTIONS.length - 1));
  };

  const handleBack = () => {
    setSectionIndex((i) => Math.max(i - 1, 0));
  };

  if (!checked) {
    return <div className="min-h-screen bg-black" />;
  }

  const Current = SECTIONS[sectionIndex];
  const isLast = sectionIndex === SECTIONS.length - 1;
  const isFirst = sectionIndex === 0;
  const currentCompleted = completed.has(sectionIndex);
  const showContinue = !isLast && currentCompleted;

  return (
    <>
      {!unlocked && <LoginGate onUnlock={handleUnlock} />}

      {unlocked && (
        <main className="relative w-full min-h-screen overflow-hidden">
          {/* Back button */}
          {!isFirst && (
            <motion.button
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={handleBack}
              className="fixed top-6 left-6 z-[200] px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-sm transition-colors"
            >
              ← Back
            </motion.button>
          )}

          {/* Current section */}
          {isLast ? (
            <Current />
          ) : (
            <Current onComplete={completeHandlers[sectionIndex]} />
          )}

          {/* Continue button — animated fade-in + slide-up */}
          {showContinue && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200]">
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={handleContinue}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold text-base sm:text-lg shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:shadow-[0_0_60px_rgba(59,130,246,0.9)] transition-shadow"
              >
                Continue 💙
              </motion.button>
            </div>
          )}
        </main>
      )}
    </>
  );
}