import { PodcastEpisode } from '../data/sanctuaryPodcasts';

class SanctuaryAudioEngine {
  private audioCtx: AudioContext | null = null;
  private primaryGain: GainNode | null = null;
  private solfeggioOsc: OscillatorNode | null = null;
  private solfeggioGain: GainNode | null = null;
  private binauralOsc: OscillatorNode | null = null;
  private binauralGain: GainNode | null = null;
  private harmonicOsc1: OscillatorNode | null = null;
  private harmonicOsc2: OscillatorNode | null = null;
  private padGain: GainNode | null = null;
  private ambientNoiseSource: AudioBufferSourceNode | null = null;
  private ambientGain: GainNode | null = null;

  private isSynthesizerActive: boolean = false;
  private isVoicePlaying: boolean = false;
  private speechUtterance: SpeechSynthesisUtterance | null = null;
  private volume: number = 0.06; // Default to 6% (strictly capped at max 10%)
  private currentFrequencyHz: number = 432;

  // Initialize or get Web Audio Context
  private getContext(): AudioContext {
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setVolume(vol: number) {
    // Strictly capped at maximum 10% (0.10) for pure subliminal subtle background
    this.volume = Math.max(0, Math.min(0.10, vol));
    if (this.primaryGain && this.audioCtx) {
      this.primaryGain.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.05);
    }
  }

  public startSolfeggioAmbience(frequencyHz: number = 432, toneType: string = 'calm_forest') {
    try {
      const ctx = this.getContext();
      this.currentFrequencyHz = frequencyHz;

      this.stopAmbience();

      // Master gain node - strictly capped at max 10%
      this.primaryGain = ctx.createGain();
      const safeVolume = Math.max(0, Math.min(0.10, this.volume));
      this.primaryGain.gain.setValueAtTime(safeVolume, ctx.currentTime);
      this.primaryGain.connect(ctx.destination);

      // 1. Solfeggio Base Pure Sine Wave (Soft & subtle gain)
      this.solfeggioOsc = ctx.createOscillator();
      this.solfeggioGain = ctx.createGain();
      this.solfeggioOsc.type = 'sine';
      this.solfeggioOsc.frequency.setValueAtTime(frequencyHz, ctx.currentTime);

      this.solfeggioGain.gain.setValueAtTime(0, ctx.currentTime);
      this.solfeggioGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.0);

      this.solfeggioOsc.connect(this.solfeggioGain);
      this.solfeggioGain.connect(this.primaryGain);
      this.solfeggioOsc.start();

      // 2. Binaural Delta/Theta Beat (f + 4.5 Hz for deep restorative state)
      this.binauralOsc = ctx.createOscillator();
      this.binauralGain = ctx.createGain();
      this.binauralOsc.type = 'sine';
      this.binauralOsc.frequency.setValueAtTime(frequencyHz + 4.5, ctx.currentTime);

      this.binauralGain.gain.setValueAtTime(0, ctx.currentTime);
      this.binauralGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2.5);

      this.binauralOsc.connect(this.binauralGain);
      this.binauralGain.connect(this.primaryGain);
      this.binauralOsc.start();

      // 3. Mystical harmonic resonance layers depending on frequency
      const harmonicRatio = frequencyHz >= 741 ? 1.5 : (frequencyHz >= 528 ? 1.25 : 0.5);
      this.harmonicOsc1 = ctx.createOscillator();
      this.harmonicOsc2 = ctx.createOscillator();
      this.padGain = ctx.createGain();

      this.harmonicOsc1.type = 'triangle';
      this.harmonicOsc1.frequency.setValueAtTime(frequencyHz * harmonicRatio, ctx.currentTime);

      this.harmonicOsc2.type = 'sine';
      this.harmonicOsc2.frequency.setValueAtTime(frequencyHz * 2, ctx.currentTime);

      this.padGain.gain.setValueAtTime(0, ctx.currentTime);
      this.padGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 3.0);

      this.harmonicOsc1.connect(this.padGain);
      this.harmonicOsc2.connect(this.padGain);
      this.padGain.connect(this.primaryGain);
      this.harmonicOsc1.start();
      this.harmonicOsc2.start();

      // 4. Subtle pink noise / forest breeze filter
      this.generateBreezeStream(ctx, this.primaryGain);

      this.isSynthesizerActive = true;
    } catch (e) {
      console.warn('Audio ambience initialisation note:', e);
    }
  }

  private generateBreezeStream(ctx: AudioContext, destination: GainNode) {
    try {
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.03;
      }

      this.ambientNoiseSource = ctx.createBufferSource();
      this.ambientNoiseSource.buffer = buffer;
      this.ambientNoiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0, ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.0);

      this.ambientNoiseSource.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(destination);
      this.ambientNoiseSource.start();
    } catch (e) {
      console.warn('Breeze stream init note:', e);
    }
  }

  public stopAmbience() {
    try {
      if (this.solfeggioOsc) {
        this.solfeggioOsc.stop();
        this.solfeggioOsc.disconnect();
        this.solfeggioOsc = null;
      }
      if (this.binauralOsc) {
        this.binauralOsc.stop();
        this.binauralOsc.disconnect();
        this.binauralOsc = null;
      }
      if (this.harmonicOsc1) {
        this.harmonicOsc1.stop();
        this.harmonicOsc1.disconnect();
        this.harmonicOsc1 = null;
      }
      if (this.harmonicOsc2) {
        this.harmonicOsc2.stop();
        this.harmonicOsc2.disconnect();
        this.harmonicOsc2 = null;
      }
      if (this.ambientNoiseSource) {
        this.ambientNoiseSource.stop();
        this.ambientNoiseSource.disconnect();
        this.ambientNoiseSource = null;
      }
      this.isSynthesizerActive = false;
    } catch (e) {
      console.warn('Audio stop note:', e);
    }
  }

  // Voice Synthesizer using Web Speech API with therapeutic pacing
  public playVoiceNarration(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: () => void
  ) {
    if (!('speechSynthesis' in window)) {
      if (onError) onError();
      return;
    }

    this.stopVoiceNarration();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.92; // Slightly slowed down for deep calm & therapeutic assimilation
    utterance.pitch = 1.0;

    // Pick best French voice if available
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find(v => v.lang.startsWith('fr') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Amelie') || v.name.includes('Thomas') || v.name.includes('Virginie') || v.name.includes('Aurelie'))) || voices.find(v => v.lang.startsWith('fr'));
    if (frVoice) {
      utterance.voice = frVoice;
    }

    utterance.onstart = () => {
      this.isVoicePlaying = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isVoicePlaying = false;
      this.speechUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isVoicePlaying = false;
      this.speechUtterance = null;
      if (onError) onError();
    };

    this.speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stopVoiceNarration() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.isVoicePlaying = false;
    this.speechUtterance = null;
  }

  public toggleAll(
    episode: PodcastEpisode,
    enableVoice: boolean,
    onVoiceEnd?: () => void
  ): { isAudioActive: boolean } {
    if (this.isSynthesizerActive || this.isVoicePlaying) {
      this.stopAmbience();
      this.stopVoiceNarration();
      return { isAudioActive: false };
    } else {
      this.startSolfeggioAmbience(episode.frequencyHz, episode.audioToneType);
      if (enableVoice) {
        this.playVoiceNarration(episode.narrationScript, undefined, onVoiceEnd);
      }
      return { isAudioActive: true };
    }
  }

  public getIsPlaying(): boolean {
    return this.isSynthesizerActive || this.isVoicePlaying;
  }

  public getIsVoiceActive(): boolean {
    return this.isVoicePlaying;
  }
}

export const SanctuaryAudio = new SanctuaryAudioEngine();
