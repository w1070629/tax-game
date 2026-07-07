/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GameZone } from './components/GameZone';
import { TaxBento } from './components/TaxBento';
import { TaxCalculator } from './components/TaxCalculator';
import { Footer } from './components/Footer';
import { AudioToggle } from './components/AudioToggle';
import { motion } from 'motion/react';
import { audioSystem } from './utils/audio';

export default function App() {
  useEffect(() => {
    // Attempt to start BGM immediately (in case user already interacted)
    audioSystem.startBGM();

    // Workaround for browser autoplay policy: start BGM on first click or touch
    const handleFirstInteraction = () => {
      audioSystem.startBGM();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      audioSystem.stopBGM();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-slate-800">
      {/* Top Banner Navigation Header */}
      <Header />

      <main>
        {/* Section 1: Hero Banner Header */}
        <Hero />

        {/* Section 2: Gamezone Interactive Console */}
        <div className="bg-gradient-to-b from-white via-slate-50/50 to-white">
          <GameZone />
        </div>

        {/* Section 3: Tax Bento Knowledge Cards */}
        <TaxBento />

        {/* Section 4: Dynamic Tax calculator */}
        <div className="bg-slate-50/40 border-t border-slate-100">
          <TaxCalculator />
        </div>
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Floating Audio System Toggle Controller */}
      <AudioToggle />
    </div>
  );
}
