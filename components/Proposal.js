"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaHeart, FaRing } from "react-icons/fa";
import Confetti from "./Confetti";
import { notifySheSaidYes } from "@/lib/discord";

const REASONS = [
  "Because every day with you feels like my favorite day 💙",
  "Because your laugh is my favorite sound in the whole world.",
  "Because you make even the most ordinary moments feel magical, Mami.",
  "Because I can't imagine my future without you in it.",
  "Because you're not just my favorite person — you're my home.",
  "Because I've already told my heart it belongs to you. It's not taking applications. 😌",
  "Because the NO button is getting tired of running... just saying 😏",
  "Because you already know the answer, Mami. Stop playing hard to get 💙",
];

const DODGE_THRESHOLD = 5;
const PROXIMITY = 100;
const SAFE_MARGIN = 24;
const YES_KEEPOUT = 60;

export default function Proposal() {
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [dodging, setDodging] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [saidYes, setSaidYes] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [notified, setNotified] = useState(false);

  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);
  const containerRef = useRef(null);

  // 🆕 Track whether section is on screen — dodge only active here
  const sectionInView = useInView(containerRef, { amount: 0.4 });

  const currentReason = REASONS[Math.min(noCount, REASONS.length - 1)];

  const teleportNo = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const btn = noButtonRef.current.getBoundingClientRect();
    const yesBtn = yesButtonRef.current?.getBoundingClientRect();

    const maxX = Math.max(0, container.width - btn.width - SAFE_MARGIN * 2);
    const maxY = Math.max(0, container.height - btn.height - SAFE_MARGIN * 2);

    let yesZone = null;
    if (yesBtn) {
      yesZone = {
        left: yesBtn.left - container.left - YES_KEEPOUT,
        top: yesBtn.top - container.top - YES_KEEPOUT,
        right: yesBtn.right - container.left + YES_KEEPOUT,
        bottom: yesBtn.bottom - container.top + YES_KEEPOUT,
      };
    }

    const maxTries = 40;
    let newX = SAFE_MARGIN;
    let newY = SAFE_MARGIN;

    for (let i = 0; i < maxTries; i++) {
      newX = SAFE_MARGIN + Math.random() * maxX;
      newY = SAFE_MARGIN + Math.random() * maxY;

      const noRight = newX + btn.width;
      const noBottom = newY + btn.height;

      if (
        yesZone &&
        noRight > yesZone.left &&
        newX < yesZone.right &&
        noBottom > yesZone.top &&
        newY < yesZone.bottom
      ) {
        continue;
      }
      break;
    }

    setNoPos({ x: newX, y: newY });
  }, []);

  // 🆕 Proximity listeners — only active when section in view AND dodging
  useEffect(() => {
    if (!dodging || !sectionInView) return;

    const handleMove = (clientX, clientY) => {
      if (!noButtonRef.current) return;
      const rect = noButtonRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dx = clientX - btnCenterX;
      const dy = clientY - btnCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < PROXIMITY) {
        teleportNo();
      }
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    };
    const onTouchStart = (e) => {
      const t = e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchstart", onTouchStart);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, [dodging, sectionInView, teleportNo]);

  const handleNo = () => {
    const next = noCount + 1;
    setNoCount(next);

    setYesScale((s) => Math.min(s + 0.18, 2.6));
    setNoScale((s) => Math.max(s - 0.15, 0.35));

    if (next >= DODGE_THRESHOLD && !dodging) {
      setDodging(true);
      setTimeout(() => teleportNo(), 50);
    } else if (next > 2) {
      setTimeout(() => teleportNo(), 100);
    }
  };

  const handleYes = async () => {
    setSaidYes(true);
    setShowConfetti(true);

    setTimeout(async () => {
      if (!notified) {
        await notifySheSaidYes();
        setNotified(true);
      }
    }, 1800);

    setTimeout(() => setShowConfetti(false), 8000);
  };

  // 🆕 Dodge button only renders when BOTH dodging AND section in view
  const showDodgeButton = !saidYes && dodging && sectionInView;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen px-4 py-24 flex flex-col items-center justify-center overflow-hidden blue-section"
    >
      {showConfetti && <Confetti numberOfPieces={400} />}

      <AnimatePresence mode="wait">
        {!saidYes ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-2xl flex flex-col items-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaRing className="text-pink-400 text-xl" />
              <p className="text-blue-300/80 tracking-[0.3em] text-xs uppercase">
                One last thing
              </p>
            </div>

            <h2 className="font-cursive text-4xl sm:text-6xl text-center gradient-text mb-4">
              Mami, I have one more question...
            </h2>

            <p className="text-blue-200/70 text-center mb-10 max-w-md">
              (No pressure... but that NO button isn't going to work 😌)
            </p>

            <motion.h3
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-3xl sm:text-5xl font-semibold text-white text-center text-glow mb-6"
            >
              Will you officially be my girlfriend?
            </motion.h3>

            <div className="h-16 sm:h-20 flex items-center justify-center px-4 w-full mb-8">
              <AnimatePresence mode="wait">
                {noCount > 0 && (
                  <motion.p
                    key={noCount}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-pink-300 text-center text-base sm:text-lg max-w-md italic"
                  >
                    {currentReason}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex flex-wrap items-center justify-center gap-6 w-full">
              <motion.button
                ref={yesButtonRef}
                onClick={handleYes}
                animate={{ scale: yesScale }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ scale: yesScale * 1.05 }}
                whileTap={{ scale: yesScale * 0.95 }}
                className="relative z-20 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold text-lg sm:text-xl shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:shadow-[0_0_60px_rgba(59,130,246,0.9)] transition-shadow whitespace-nowrap"
                style={{ transformOrigin: "center" }}
              >
                YES 💙
              </motion.button>

              {!dodging && (
                <motion.button
                  ref={noButtonRef}
                  onClick={handleNo}
                  animate={{ scale: noScale }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative z-20 px-8 py-3 rounded-2xl bg-black border border-pink-500/40 text-pink-300/90 font-medium text-base sm:text-lg whitespace-nowrap"
                >
                  No 🙈
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="yes"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4"
          >
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 180 }}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-pink-500 via-pink-400 to-blue-500 flex items-center justify-center glow-pink mb-8"
            >
              <FaHeart className="text-white text-5xl" />
            </motion.div>

            <h2 className="font-cursive text-5xl sm:text-7xl gradient-text mb-4">
              SHE SAID YES! 💙
            </h2>

            <p className="text-white text-lg sm:text-2xl mb-3">
              Mami, you just made me the happiest man alive.
            </p>

            <p className="text-pink-300/90 font-cursive text-2xl sm:text-3xl mb-8">
              I love you, Ifediora Peculiar Chidera 💗
            </p>

            <p className="text-blue-200/70 text-sm max-w-md">
              Check Discord... someone might already be celebrating over
              there. 😉
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🆕 Dodge button — only visible when section is in view */}
      {showDodgeButton && (
        <motion.button
          ref={noButtonRef}
          onClick={handleNo}
          onMouseEnter={teleportNo}
          onTouchStart={(e) => {
            e.preventDefault();
            teleportNo();
          }}
          animate={{
            scale: Math.max(noScale, 0.5),
            x: noPos.x,
            y: noPos.y,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-0 left-0 z-30 px-6 py-3 rounded-2xl bg-black border border-pink-500/40 text-pink-300/90 font-medium text-sm sm:text-base whitespace-nowrap"
        >
          No 🙈
        </motion.button>
      )}
    </section>
  );
}