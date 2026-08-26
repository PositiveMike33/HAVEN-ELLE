import React, { useState, useEffect } from 'react';
import { Tv, Repeat, RotateCcw, Play, Pause, VolumeX, Volume2 } from 'lucide-react';

export const HistoryOfViolenceVideo: React.FC = () => {
  const [globalPlaying, setGlobalPlaying] = useState(true);
  const [globalMuted, setGlobalMuted] = useState(false);
  const [globalVolume, setGlobalVolume] = useState(50);
  const [trackProgress, setTrackProgress] = useState({ currentTime: 0, duration: 210 });

  useEffect(() => {
    const handleStateChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{
        isPlaying: boolean;
        isMuted: boolean;
        volume?: number;
        trackProgress?: { currentTime: number; duration: number };
      }>;
      if (customEvent.detail) {
        setGlobalPlaying(customEvent.detail.isPlaying);
        setGlobalMuted(customEvent.detail.isMuted);
        if (typeof customEvent.detail.volume === 'number') {
          setGlobalVolume(customEvent.detail.volume);
        }
        if (customEvent.detail.trackProgress) {
          setTrackProgress(customEvent.detail.trackProgress);
        }
      }
    };
    window.addEventListener('haven-audio-state-changed', handleStateChanged);
    return () => window.removeEventListener('haven-audio-state-changed', handleStateChanged);
  }, []);

  const toggleGlobalAudioPlay = () => {
    window.dispatchEvent(new CustomEvent('haven-audio-toggle-play'));
  };
  const toggleGlobalAudioMute = () => {
    window.dispatchEvent(new CustomEvent('haven-audio-toggle-mute'));
  };
  const restartGlobalAudio = () => {
    window.dispatchEvent(new CustomEvent('haven-audio-restart'));
  };
  const formatTrackTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#1E1E1E] text-white rounded-3xl border border-white/10 overflow-hidden shadow-xl max-w-2xl mx-auto">
      {/* Screen Header Bar */}
      <div className="px-4 py-3 bg-[#2A2A2A] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#A64D4D] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5EAD9] flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-[#8A9A5B]" />
            Écran Clip Vidéo Officiel
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8A9A5B]/30 text-[#E5EAD9] font-medium border border-[#8A9A5B]/40">
          Lecture en boucle
        </span>
      </div>

      {/* Main Video Frame (16:9) - Visual playback synced with master audio */}
      <div className="relative w-full aspect-video bg-black overflow-hidden group">
        <iframe
          id="main-screen-youtube-player"
          src="https://www.youtube-nocookie.com/embed/hgHwXM7GYuk?autoplay=1&mute=1&loop=1&playlist=hgHwXM7GYuk&controls=1&showinfo=0&rel=0&modestbranding=1"
          title="Theory of a Deadman - History of Violence"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Video Meta & Master Sound Controller */}
      <div className="p-4 bg-[#242424] border-t border-white/5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white leading-snug">
              Theory of a Deadman — « History of Violence »
            </h3>
            <p className="text-xs text-[#CED6C1] mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A9A5B] inline-block" />
              Son unique continu (actif sur tous les onglets)
            </p>
          </div>
          
          {/* Global Audio Controls */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
            <button
              type="button"
              onClick={restartGlobalAudio}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Recommencer la vidéo & le son depuis le début"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={toggleGlobalAudioPlay}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={globalPlaying ? 'Mettre en pause la musique' : 'Démarrer la musique'}
            >
              {globalPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              type="button"
              onClick={toggleGlobalAudioMute}
              className={`p-1.5 rounded-lg transition-colors ${
                globalMuted ? 'bg-[#A64D4D]/40 text-[#ffaaaa]' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={globalMuted ? 'Activer le son' : 'Couper le son'}
            >
              {globalMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#8A9A5B]" />}
            </button>
          </div>
        </div>

        {/* Status Note ensuring zero cacophony and clear looping */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#E5EAD9] leading-relaxed flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5">
            <Repeat className="w-3 h-3 text-[#8A9A5B]" />
            <span>
              {globalMuted ? 'Audio en sourdine' : `Lecture audio (${globalVolume}%) & vidéo complète en boucle`}
            </span>
          </span>
          <span className="text-[10px] text-[#CED6C1] bg-white/10 px-2 py-0.5 rounded-md font-mono">
            {formatTrackTime(trackProgress.currentTime)} / {formatTrackTime(trackProgress.duration)}
          </span>
        </div>
      </div>
    </div>
  );
};
