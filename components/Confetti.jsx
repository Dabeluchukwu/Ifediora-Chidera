"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function Confetti({ run = true, numberOfPieces = 200, colors }) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!run) return null;

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={numberOfPieces}
      recycle={false}
      gravity={0.15}
      colors={
        colors || ["#3b82f6", "#1e3a8a", "#ec4899", "#f9a8d4", "#ffffff"]
      }
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
}