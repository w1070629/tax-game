/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmInterval: any = null;
  private bgmStep: number = 0;
  private isBgmPlaying: boolean = false;

  // A warm, beautiful major-pentatonic chord arpeggio loop for our tax game theme
  private bgmNotes: number[] = [
    // C Major
    261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63,
    // G Major
    196.00, 246.94, 293.66, 392.00, 493.88, 392.00, 293.66, 246.94,
    // A Minor
    220.00, 261.63, 329.63, 440.00, 523.25, 440.00, 329.63, 261.63,
    // F Major
    174.61, 220.00, 261.63, 349.23, 440.00, 349.23, 261.63, 220.00
  ];

  constructor() {
    // Lazy initialize to bypass browser autoplay policies
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(mute?: boolean): boolean {
    if (mute !== undefined) {
      this.isMuted = mute;
    } else {
      this.isMuted = !this.isMuted;
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play failure:', e);
    }
  }

  public playClick() {
    // Cute subtle click tone
    this.playTone(600, 'sine', 0.08, 0.12);
  }

  public playCorrect() {
    // Ascending bright chime
    const now = this.isMuted ? 0 : 1;
    if (now === 0) return;
    this.playTone(523.25, 'sine', 0.15, 0.1); // C5
    setTimeout(() => {
      this.playTone(659.25, 'sine', 0.25, 0.1); // E5
    }, 100);
  }

  public playCatchCorrect() {
    // A brilliant, high-pitched sparkle-chime for the marksman channel hit!
    if (this.isMuted) return;
    try {
      this.initContext();
      this.playTone(880, 'sine', 0.1, 0.08); // A5
      setTimeout(() => {
        this.playTone(1320, 'sine', 0.12, 0.08); // E6
      }, 50);
      setTimeout(() => {
        this.playTone(1760, 'sine', 0.2, 0.1); // A6
      }, 100);
    } catch (e) {
      console.warn(e);
    }
  }

  public playWrong() {
    // Low buzzer tone
    this.playTone(220, 'triangle', 0.3, 0.15); // A3
  }

  public playFanfare() {
    // Full positive fanfare chord sequence
    if (this.isMuted) return;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.4, 0.08);
      }, index * 120);
    });
    // Final high bright note
    setTimeout(() => {
      this.playTone(659.25, 'sine', 0.6, 0.1); // E5
    }, 480);
  }

  // Background Music loop playing a lovely soothing lofi-style melody
  public startBGM() {
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    
    this.bgmStep = 0;
    this.bgmInterval = setInterval(() => {
      if (this.isMuted) return;
      try {
        this.initContext();
        if (!this.ctx) return;
        
        const freq = this.bgmNotes[this.bgmStep % this.bgmNotes.length];
        const isAccent = this.bgmStep % 8 === 0;
        // Increased BGM volume to make it clearer and more enjoyable during gameplay
        const volume = isAccent ? 0.08 : 0.05;
        
        this.playTone(freq, 'sine', 0.6, volume);
        this.bgmStep++;
      } catch (err) {
        console.warn('BGM play failed:', err);
      }
    }, 380); // 380ms per note
  }

  public stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.isBgmPlaying = false;
  }
}

export const audioSystem = new AudioSynthesizer();
