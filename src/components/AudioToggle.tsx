/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { motion } from 'motion/react';
import { audioSystem } from '../utils/audio';

export function AudioToggle() {
  const { isMuted, toggleMute, playClick } = useAudio();

  const handleToggle = () => {
    toggleMute();
    // Play a tiny feedback sound after unmuting
    setTimeout(() => {
      if (isMuted) {
        audioSystem.playClick();
      }
    }, 50);
  };

  return (
    <motion.button
      id="audio-toggle-btn"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${
        isMuted
          ? 'border-rose-200 bg-rose-50/90 text-rose-500 hover:bg-rose-100 shadow-rose-200/50'
          : 'border-emerald-200 bg-emerald-50/90 text-emerald-600 hover:bg-emerald-100 shadow-emerald-200/50'
      }`}
      title={isMuted ? '開啟音效' : '關閉音效'}
    >
      {isMuted ? (
        <VolumeX className="h-6 w-6 stroke-[2.5]" />
      ) : (
        <Volume2 className="h-6 w-6 stroke-[2.5]" />
      )}
    </motion.button>
  );
}
