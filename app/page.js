"use client";

import { useState } from "react";
import LoginGate from "@/components/LoginGate";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import HerGallery from "@/components/HerGallery";
import ReasonsCards from "@/components/ReasonsCards";
import Cake from "@/components/Cake";
import Proposal from "@/components/Proposal";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      {!unlocked && <LoginGate onUnlock={() => setUnlocked(true)} />}

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