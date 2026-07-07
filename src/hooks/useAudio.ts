/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { audioSystem } from '../utils/audio';

export function useAudio() {
  const [isMuted, setIsMuted] = useState<boolean>(() => audioSystem.getMutedState());

  // Keep in sync with backend storage or standard state
  const handleToggleMute = useCallback(() => {
    const newState = audioSystem.toggleMute();
    setIsMuted(newState);
  }, []);

  const playClick = useCallback(() => audioSystem.playClick(), []);
  const playCorrect = useCallback(() => audioSystem.playCorrect(), []);
  const playCatchCorrect = useCallback(() => audioSystem.playCatchCorrect(), []);
  const playWrong = useCallback(() => audioSystem.playWrong(), []);
  const playFanfare = useCallback(() => audioSystem.playFanfare(), []);

  return {
    isMuted,
    toggleMute: handleToggleMute,
    playClick,
    playCorrect,
    playCatchCorrect,
    playWrong,
    playFanfare
  };
}
