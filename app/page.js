"use client";

import { useEffect, useState } from "react";
import LoginGate from "@/components/LoginGate";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import HerGallery from "@/components/HerGallery";
import ReasonsCards from "@/components/ReasonsCards";
import Cake from "@/components/Cake";
import Proposal from "@/components/Proposal";

const STORAGE_KEY = "mami-unlocked";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false); // avoid flash of LoginGate

  // On first mount, check sessionStorage
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        setUnlocked(true);
      }
    } catch (e) {
      // sessionStorage might be blocked (private mode, etc.) — just ignore
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

  // Prevent a flash of the login gate while we check storage
  if (!checked) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <>
      {!unlocked && <LoginGate onUnlock={handleUnlock} />}

      {unlocked && (
        <main className="relative w-full overflow-hidden">
          <Hero />
          <LoveLetter />
          <HerGallery />
          <ReasonsCards />
          <Cake />
          <Proposal />

          <footer className="py-12 text-center text-sm text-white/40">
            Made with 💙 just for you, Mami.
          </footer>
        </main>
      )}
    </>
  );
}