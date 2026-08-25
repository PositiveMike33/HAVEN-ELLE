import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Eye, Sparkles, Layers, Check, Sun, Moon } from 'lucide-react';
import { StorageService } from '../utils/storage';

interface UiOpacityControlProps {
  isNightMode?: boolean;
}

export const UiOpacityControl: React.FC<UiOpacityControlProps> = ({ isNightMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uiOpacity, setUiOpacity] = useState<number>(() => StorageService.getUiOpacity());
  const [videoOpacity, setVideoOpacity] = useState<number>(() => StorageService.getVideoOpacity());
  const menuRef = useRef<HTMLDivElement>(null);

  // Sync state if changed from another component (e.g. HeaderAudioPlayer or BackgroundVideo)
  useEffect(() => {
    const handleUiChange = (e: Event) => {
      const custom = e as CustomEvent<{ opacity: number }>;
      if (custom.detail && typeof custom.detail.opacity === 'number') {
        setUiOpacity(custom.detail.opacity);
      }
    };
    const handleVideoChange = (e: Event) => {
      const custom = e as CustomEvent<{ opacity: number }>;
      if (custom.detail && typeof custom.detail.opacity === 'number') {
        setVideoOpacity(custom.detail.opacity);
      }
    };

    window.addEventListener('haven-ui-opacity-changed', handleUiChange);
    window.addEventListener('haven-audio-set-opacity', handleVideoChange);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('haven-ui-opacity-changed', handleUiChange);
      window.removeEventListener('haven-audio-set-opacity', handleVideoChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUiOpacityChange = (val: number) => {
    const clamped = Math.max(10, Math.min(100, Math.round(val)));
    setUiOpacity(clamped);
    StorageService.setUiOpacity(clamped);
    const root = document.documentElement;
    root.style.setProperty('--ui-surface-opacity', (clamped / 100).toFixed(2));
    root.style.setProperty('--ui-bg-opacity', ((clamped / 100) * 0.4).toFixed(2));
    window.dispatchEvent(
      new CustomEvent('haven-ui-opacity-changed', {
        detail: { opacity: clamped },
      })
    );
  };

  const handleVideoOpacityChange = (val: number) => {
    const clamped = Math.max(5, Math.min(100, Math.round(val)));
    setVideoOpacity(clamped);
    StorageService.setVideoOpacity(clamped);
    window.dispatchEvent(
      new CustomEvent('haven-audio-set-opacity', {
        detail: { opacity: clamped },
      })
    );
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger Button in Header */}
      <button
        type="button"
        id="header-transparency-control-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
          isOpen
            ? 'bg-[#8A9A5B] text-white ring-2 ring-[#8A9A5B]/30'
            : isNightMode
            ? 'bg-[#2A2C28] text-[#D8E4C7] border border-[#3E4238] hover:bg-[#343630]'
            : 'bg-[#F8F7F2] text-[#5A5A40] border border-[#E5E2D9] hover:bg-[#E5EAD9]'
        }`}
        title="Régler la transparence des fiches et boutons pour voir la vidéo d'arrière-plan"
      >
        <Layers className="w-3.5 h-3.5" />
        <span className="hidden lg:inline text-[11px]">Transparence</span>
        <span className="text-[10px] px-1 py-0.2 bg-black/10 rounded-md font-mono">
          {uiOpacity}%
        </span>
      </button>

      {/* Popover Panel */}
      {isOpen && (
        <div
          id="ui-transparency-popover"
          className={`absolute right-0 top-full mt-2 w-76 sm:w-84 p-4 rounded-2xl shadow-2xl border z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl ${
            isNightMode
              ? 'bg-[#1E201B]/95 border-[#3E4633] text-[#D6D4CD]'
              : 'bg-white/95 border-[#CED6C1] text-[#3E3B39]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-inherit/40">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-[#8A9A5B]/20 text-[#8A9A5B]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs">Transparence & Vidéo de Fond</h4>
                <p className="text-[10px] opacity-75">
                  {isNightMode ? 'Mode Nuit actif' : 'Mode Jour actif'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs opacity-60 hover:opacity-100 p-1 rounded-md"
            >
              ✕
            </button>
          </div>

          {/* Slider 1: UI / Cards & Buttons Opacity */}
          <div className="space-y-2 mb-4 p-2.5 rounded-xl bg-black/5 border border-inherit/30">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#8A9A5B]" />
                Opacité des Fiches & Boutons
              </span>
              <span className="font-bold font-mono text-[#8A9A5B] bg-[#8A9A5B]/10 px-2 py-0.5 rounded-md">
                {uiOpacity}%
              </span>
            </div>

            <p className="text-[10px] opacity-75">
              Descendez l'opacité pour rendre les fiches transparentes et laisser apparaître la vidéo.
            </p>

            <input
              id="ui-opacity-range-input"
              type="range"
              min="15"
              max="100"
              step="5"
              value={uiOpacity}
              onChange={(e) => handleUiOpacityChange(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#8A9A5B] bg-[#CED6C1]/40"
            />

            {/* Quick Presets */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleUiOpacityChange(25)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                  uiOpacity <= 35
                    ? 'bg-[#8A9A5B] text-white border-[#8A9A5B]'
                    : 'bg-black/5 hover:bg-black/10 border-inherit/40'
                }`}
              >
                Translucide (25%)
              </button>
              <button
                type="button"
                onClick={() => handleUiOpacityChange(65)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                  uiOpacity > 35 && uiOpacity <= 75
                    ? 'bg-[#8A9A5B] text-white border-[#8A9A5B]'
                    : 'bg-black/5 hover:bg-black/10 border-inherit/40'
                }`}
              >
                Équilibré (65%)
              </button>
              <button
                type="button"
                onClick={() => handleUiOpacityChange(95)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                  uiOpacity > 75
                    ? 'bg-[#8A9A5B] text-white border-[#8A9A5B]'
                    : 'bg-black/5 hover:bg-black/10 border-inherit/40'
                }`}
              >
                Opaque (95%)
              </button>
            </div>
          </div>

          {/* Slider 2: Video Intensity */}
          <div className="space-y-2 p-2.5 rounded-xl bg-black/5 border border-inherit/30">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#8A9A5B]" />
                Intensité Vidéo Clip en Arrière-plan
              </span>
              <span className="font-bold font-mono text-[#8A9A5B] bg-[#8A9A5B]/10 px-2 py-0.5 rounded-md">
                {videoOpacity}%
              </span>
            </div>

            <input
              id="video-opacity-range-input"
              type="range"
              min="10"
              max="90"
              step="5"
              value={videoOpacity}
              onChange={(e) => handleVideoOpacityChange(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#8A9A5B] bg-[#CED6C1]/40"
            />

            <div className="flex justify-between text-[9px] opacity-70">
              <span>Discret (20%)</span>
              <span>Idéal (45%)</span>
              <span>Vif (80%)</span>
            </div>
          </div>

          <div className="mt-3 pt-2 text-[10px] opacity-70 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#8A9A5B] shrink-0" />
            <span>Effet de verre poli flouté avec lisibilité automatique garantie.</span>
          </div>
        </div>
      )}
    </div>
  );
};
