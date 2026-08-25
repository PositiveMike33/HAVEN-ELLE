import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sliders,
  Eye,
  EyeOff,
  Music,
  Repeat,
  Sparkles,
  Layers
} from 'lucide-react';
import { StorageService } from '../utils/storage';

export const HeaderAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(() => StorageService.getBgVolume());
  const [opacity, setOpacity] = useState<number>(() => StorageService.getVideoOpacity());
  const [uiOpacity, setUiOpacity] = useState<number>(() => StorageService.getUiOpacity());
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [trackProgress, setTrackProgress] = useState({ currentTime: 0, duration: 210 });
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Synchronize state with background audio engine and UI opacity events
  useEffect(() => {
    const handleStateChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{
        isPlaying: boolean;
        isMuted: boolean;
        volume?: number;
        opacity?: number;
        isVideoVisible?: boolean;
        trackProgress?: { currentTime: number; duration: number };
      }>;
      if (customEvent.detail) {
        setIsPlaying(customEvent.detail.isPlaying);
        setIsMuted(customEvent.detail.isMuted);
        if (typeof customEvent.detail.volume === 'number') {
          setVolume(customEvent.detail.volume);
        }
        if (typeof customEvent.detail.opacity === 'number') {
          setOpacity(customEvent.detail.opacity);
        }
        if (typeof customEvent.detail.isVideoVisible === 'boolean') {
          setIsVideoVisible(customEvent.detail.isVideoVisible);
        }
        if (customEvent.detail.trackProgress) {
          setTrackProgress(customEvent.detail.trackProgress);
        }
      }
    };

    const handleUiOpacityChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{ opacity: number }>;
      if (customEvent.detail && typeof customEvent.detail.opacity === 'number') {
        setUiOpacity(customEvent.detail.opacity);
      }
    };

    window.addEventListener('haven-audio-state-changed', handleStateChanged);
    window.addEventListener('haven-ui-opacity-changed', handleUiOpacityChanged);

    // Close settings dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('haven-audio-state-changed', handleStateChanged);
      window.removeEventListener('haven-ui-opacity-changed', handleUiOpacityChanged);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePlay = () => {
    window.dispatchEvent(new CustomEvent('haven-audio-toggle-play'));
  };

  const toggleMute = () => {
    window.dispatchEvent(new CustomEvent('haven-audio-toggle-mute'));
  };

  const restartTrack = () => {
    window.dispatchEvent(new CustomEvent('haven-audio-restart'));
  };

  const changeVolume = (newVol: number) => {
    window.dispatchEvent(new CustomEvent('haven-audio-set-volume', { detail: { volume: newVol } }));
  };

  const changeOpacity = (newOpacity: number) => {
    setOpacity(newOpacity);
    StorageService.setVideoOpacity(newOpacity);
    window.dispatchEvent(new CustomEvent('haven-audio-set-opacity', { detail: { opacity: newOpacity } }));
  };

  const changeUiOpacity = (newUiOpacity: number) => {
    const clamped = Math.max(10, Math.min(100, Math.round(newUiOpacity)));
    setUiOpacity(clamped);
    StorageService.setUiOpacity(clamped);
    const root = document.documentElement;
    root.style.setProperty('--ui-surface-opacity', (clamped / 100).toFixed(2));
    root.style.setProperty('--ui-bg-opacity', ((clamped / 100) * 0.4).toFixed(2));
    window.dispatchEvent(new CustomEvent('haven-ui-opacity-changed', { detail: { opacity: clamped } }));
  };

  const toggleVideoVisibility = () => {
    window.dispatchEvent(new CustomEvent('haven-audio-toggle-video'));
  };

  const formatTrackTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative inline-flex items-center" ref={settingsRef}>
      {/* Prominent Header Audio Control Bar */}
      <div
        id="header-global-audio-pill"
        className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 rounded-2xl border transition-all shadow-xs ${
          isPlaying
            ? 'bg-[#EBF1E4] border-[#BDCEAA] text-[#3E3B39]'
            : 'bg-[#F5F2ED] border-[#DDD8CB] text-[#5A5A40]'
        }`}
      >
        {/* BIG PROMINENT PAUSE / PLAY BUTTON */}
        <button
          type="button"
          id="header-audio-play-pause-btn"
          onClick={togglePlay}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold text-xs transition-all shadow-xs active:scale-95 ${
            isPlaying
              ? 'bg-[#8A9A5B] hover:bg-[#78884d] text-white ring-2 ring-[#8A9A5B]/30'
              : 'bg-[#5A5A40] hover:bg-[#464630] text-white'
          }`}
          title={isPlaying ? 'Mettre en PAUSE la musique et le clip vidéo' : 'LANCER la musique et le clip vidéo'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current shrink-0" />
              <span className="font-extrabold tracking-wide">PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current shrink-0" />
              <span className="font-extrabold tracking-wide">LECTURE</span>
            </>
          )}
        </button>

        {/* Live Audio Equalizer Waves & Track Info */}
        <div className="flex items-center gap-2 max-w-[160px] sm:max-w-[210px] md:max-w-[250px] truncate">
          {/* Animated sound wave equalizer indicator */}
          <div className="flex items-end gap-0.5 h-3.5 px-0.5 shrink-0" title={isPlaying ? 'Piste en lecture' : 'En pause'}>
            <span className={`w-1 bg-[#8A9A5B] rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'}`} />
            <span className={`w-1 bg-[#5A5A40] rounded-full transition-all duration-300 ${isPlaying ? 'h-3.5 animate-bounce' : 'h-1 opacity-40'}`} />
            <span className={`w-1 bg-[#8A9A5B] rounded-full transition-all duration-300 ${isPlaying ? 'h-2 animate-pulse' : 'h-1.5 opacity-40'}`} />
          </div>

          <div className="flex flex-col min-w-0 text-left">
            <span className="text-[11px] font-bold truncate leading-tight text-[#3E3B39]">
              History of Violence
            </span>
            <div className="flex items-center gap-1 text-[10px] text-[#716E65] font-mono leading-tight">
              <span className="hidden sm:inline">Theory of a Deadman •</span>
              <span className="font-semibold text-[#5A5A40]">
                {formatTrackTime(trackProgress.currentTime)}
              </span>
              <span className="opacity-60">/ {formatTrackTime(trackProgress.duration)}</span>
              <span className="hidden md:inline text-[#8A9A5B]" title="Boucle infinie active">
                <Repeat className="w-2.5 h-2.5 inline ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Quick Restart from 0:00 Button */}
        <button
          type="button"
          id="header-audio-restart-btn"
          onClick={restartTrack}
          className="p-1.5 rounded-lg hover:bg-black/5 text-[#5A5A40] transition-colors"
          title="Recommencer la vidéo et la musique depuis le début"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Mute / Unmute Quick Button */}
        <button
          type="button"
          id="header-audio-mute-btn"
          onClick={toggleMute}
          className={`p-1.5 rounded-lg transition-colors ${
            isMuted
              ? 'bg-[#F5E6E0] text-[#A64D4D]'
              : 'hover:bg-black/5 text-[#5A5A40]'
          }`}
          title={isMuted ? `Rétablir le son (${volume || 15}%)` : 'Mettre en sourdine'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Settings & Sliders Trigger */}
        <button
          type="button"
          id="header-audio-settings-btn"
          onClick={() => setShowSettings(!showSettings)}
          className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
            showSettings
              ? 'bg-[#8A9A5B] text-white'
              : 'hover:bg-black/5 text-[#5A5A40]'
          }`}
          title="Réglages du volume, de l'opacité et de la vidéo"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold hidden lg:inline">{volume}%</span>
        </button>
      </div>

      {/* Expanded Quick Settings Popover */}
      {showSettings && (
        <div className="absolute right-0 top-full mt-2 z-50 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl border border-[#CED6C1] text-xs text-[#3E3B39] w-76 sm:w-80 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 font-sans">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
            <div className="flex items-center gap-1.5 font-bold text-[#5A5A40]">
              <Music className="w-4 h-4 text-[#8A9A5B]" />
              <span>Contrôle Audio & Visuel</span>
            </div>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="text-[#8E8B82] hover:text-[#3E3B39] text-xs px-1.5 py-0.5 rounded-md hover:bg-[#F5F2ED]"
            >
              ✕
            </button>
          </div>

          {/* Volume Control */}
          <div className="space-y-1.5 bg-[#F8F7F2] p-2.5 rounded-xl border border-[#E5E2D9]">
            <div className="flex justify-between items-center text-[11px] text-[#5A5A40]">
              <span className="font-medium flex items-center gap-1.5">
                {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-[#A64D4D]" /> : <Volume2 className="w-3.5 h-3.5 text-[#8A9A5B]" />}
                <span>Volume Sonore</span>
              </span>
              <span className="font-bold text-[#8A9A5B] font-mono">{isMuted ? 'Muet' : `${volume}%`}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={isMuted ? 0 : volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="w-full h-1.5 bg-[#CED6C1] rounded-lg appearance-none cursor-pointer accent-[#8A9A5B]"
            />
            <div className="flex justify-between text-[9px] text-[#8E8B82]">
              <button type="button" onClick={() => changeVolume(0)} className="hover:text-[#5A5A40]">0%</button>
              <button type="button" onClick={() => changeVolume(15)} className="font-bold text-[#5A5A40] underline decoration-[#8A9A5B]">15% (Défaut)</button>
              <button type="button" onClick={() => changeVolume(35)} className="hover:text-[#5A5A40]">35%</button>
              <button type="button" onClick={() => changeVolume(60)} className="hover:text-[#5A5A40]">60%</button>
              <button type="button" onClick={() => changeVolume(100)} className="hover:text-[#5A5A40]">100%</button>
            </div>
          </div>

          {/* UI Transparency Control */}
          <div className="space-y-1.5 bg-[#F8F7F2] p-2.5 rounded-xl border border-[#E5E2D9]">
            <div className="flex justify-between items-center text-[11px] text-[#5A5A40]">
              <span className="font-medium flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#8A9A5B]" />
                <span>Transparence Fiches & Boutons</span>
              </span>
              <span className="font-bold text-[#8A9A5B] font-mono">{uiOpacity}%</span>
            </div>
            <input
              type="range"
              min="15"
              max="100"
              step="5"
              value={uiOpacity}
              onChange={(e) => changeUiOpacity(Number(e.target.value))}
              className="w-full h-1.5 bg-[#CED6C1] rounded-lg appearance-none cursor-pointer accent-[#8A9A5B]"
            />
            <div className="flex justify-between text-[9px] text-[#8E8B82]">
              <button type="button" onClick={() => changeUiOpacity(25)} className="hover:text-[#5A5A40]">Translucide (25%)</button>
              <button type="button" onClick={() => changeUiOpacity(65)} className="hover:text-[#5A5A40]">Équilibré (65%)</button>
              <button type="button" onClick={() => changeUiOpacity(95)} className="hover:text-[#5A5A40]">Opaque (95%)</button>
            </div>
          </div>

          {/* Opacity Video Control */}
          <div className="space-y-1.5 bg-[#F8F7F2] p-2.5 rounded-xl border border-[#E5E2D9]">
            <div className="flex justify-between items-center text-[11px] text-[#5A5A40]">
              <span className="font-medium flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#8A9A5B]" />
                <span>Intensité Vidéo de Fond</span>
              </span>
              <span className="font-bold text-[#8A9A5B] font-mono">{opacity}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={opacity}
              onChange={(e) => changeOpacity(Number(e.target.value))}
              className="w-full h-1.5 bg-[#CED6C1] rounded-lg appearance-none cursor-pointer accent-[#8A9A5B]"
            />
            <div className="flex justify-between text-[9px] text-[#8E8B82]">
              <button type="button" onClick={() => changeOpacity(20)} className="hover:text-[#5A5A40]">20% Discret</button>
              <button type="button" onClick={() => changeOpacity(45)} className="font-bold text-[#5A5A40] underline decoration-[#8A9A5B]">45% Optimal</button>
              <button type="button" onClick={() => changeOpacity(80)} className="hover:text-[#5A5A40]">80% Immersion</button>
            </div>
          </div>

          {/* Video Toggle & Loop indicator */}
          <div className="flex items-center justify-between pt-1 border-t border-[#E5E2D9]">
            <button
              type="button"
              onClick={toggleVideoVisibility}
              className="flex items-center gap-1.5 text-[11px] text-[#5A5A40] hover:text-[#3E3B39] font-medium py-1 px-2 rounded-lg hover:bg-[#F5F2ED]"
            >
              {isVideoVisible ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#8E8B82]" />
                  <span>Cacher la vidéo</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#8A9A5B]" />
                  <span>Afficher la vidéo</span>
                </>
              )}
            </button>

            <span className="text-[10px] text-[#8A9A5B] font-semibold flex items-center gap-1 bg-[#E5EAD9] px-2 py-0.5 rounded-full">
              <Repeat className="w-2.5 h-2.5" />
              Boucle active
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
