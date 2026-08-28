import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Eye, Sparkles, Layers, Trees, Sun, Moon } from 'lucide-react';
import { StorageService } from '../utils/storage';

interface UiOpacityControlProps {
  isNightMode?: boolean;
}

export const UiOpacityControl: React.FC<UiOpacityControlProps> = ({ isNightMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uiOpacity, setUiOpacity] = useState<number>(() => StorageService.getUiOpacity());
  const [videoOpacity, setVideoOpacity] = useState<number>(() => StorageService.getVideoOpacity());
  const menuRef = useRef<HTMLDivElement>(null);

  // Sync state if changed from another component
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
    const clamped = Math.max(0, Math.min(100, Math.round(val)));
    setUiOpacity(clamped);
    StorageService.setUiOpacity(clamped);
    const root = document.documentElement;
    root.style.setProperty('--ui-surface-opacity', (clamped / 100).toFixed(2));
    root.style.setProperty('--ui-bg-opacity', ((clamped / 100) * 0.3).toFixed(2));
    root.style.setProperty('--ui-blur', clamped === 0 ? '0px' : clamped <= 35 ? '8px' : '16px');
    window.dispatchEvent(
      new CustomEvent('haven-ui-opacity-changed', {
        detail: { opacity: clamped },
      })
    );
  };

  const handleVideoOpacityChange = (val: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(val)));
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
            ? 'bg-[#15803D] text-white ring-2 ring-[#15803D]/30'
            : isNightMode
            ? 'bg-[#1E293B] text-[#E2E8F0] border border-[#334155] hover:bg-[#334155]'
            : 'bg-white text-[#0F172A] border border-[#CBD5E1] hover:bg-[#F1F5F9]'
        }`}
        title="Régler la transparence des blocs de contenu pour voir la forêt 3D en profondeur"
      >
        <Trees className="w-3.5 h-3.5 text-[#15803D]" />
        <span className="hidden sm:inline text-[11px]">Profondeur 3D</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold ${
          uiOpacity === 0 ? 'bg-[#15803D] text-white' : 'bg-black/10'
        }`}>
          {uiOpacity === 0 ? '0% (Forêt Pure)' : `${uiOpacity}%`}
        </span>
      </button>

      {/* Popover Panel */}
      {isOpen && (
        <div
          id="ui-transparency-popover"
          className={`absolute right-0 top-full mt-2 w-80 sm:w-92 p-4 rounded-2xl shadow-2xl border z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl ${
            isNightMode
              ? 'bg-[#0F172A]/95 border-[#334155] text-[#F8FAFC]'
              : 'bg-white/95 border-[#CBD5E1] text-[#0F172A]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-inherit/30">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#15803D]/20 text-[#15803D]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs">Transparence & Profondeur Forêt 3D</h4>
                <p className="text-[10px] opacity-75">
                  {uiOpacity === 0
                    ? 'Immersion totale : Blocs flottants à 0% opacité'
                    : 'Ajustez la transparence pour admirer la forêt'}
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

          {/* Slider 1: UI / Cards & Buttons Opacity (from 0% to 100%) */}
          <div className="space-y-2 mb-4 p-3 rounded-xl bg-black/5 border border-inherit/25">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#15803D]" />
                Opacité des Blocs Flottants
              </span>
              <span className={`font-bold font-mono px-2 py-0.5 rounded-md ${
                uiOpacity === 0
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-[#15803D] bg-[#15803D]/15'
              }`}>
                {uiOpacity === 0 ? '0% (Forêt 3D Pure)' : `${uiOpacity}%`}
              </span>
            </div>

            <p className="text-[10px] opacity-80 leading-relaxed">
              Mettez l'opacité à <strong>0%</strong> pour effacer les fonds blancs/gris et faire flotter vos contenus directement au cœur des arbres en 3D.
            </p>

            <input
              id="ui-opacity-range-input"
              type="range"
              min="0"
              max="100"
              step="5"
              value={uiOpacity}
              onChange={(e) => handleUiOpacityChange(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#15803D] bg-[#CBD5E1]/40"
            />

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-1 pt-1.5">
              <button
                type="button"
                onClick={() => handleUiOpacityChange(0)}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-center ${
                  uiOpacity === 0
                    ? 'bg-[#15803D] text-white border-[#15803D] shadow-xs'
                    : 'bg-black/5 hover:bg-black/10 border-inherit/30'
                }`}
                title="Transparence totale pour voir la profondeur 3D de la forêt"
              >
                0% Forêt Pure
              </button>
              <button
                type="button"
                onClick={() => handleUiOpacityChange(25)}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-center ${
                  uiOpacity > 0 && uiOpacity <= 35
                    ? 'bg-[#15803D] text-white border-[#15803D]'
                    : 'bg-black/5 hover:bg-black/10 border-inherit/30'
                }`}
              >
                25% Verre
              </button>
              <button
                type="button"
                onClick={() => handleUiOpacityChange(65)}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-center ${
                  uiOpacity > 35 && uiOpacity <= 80
                    ? 'bg-[#15803D] text-white border-[#15803D]'
                    : 'bg-black/5 hover:bg-black/10 border-inherit/30'
                }`}
              >
                65% Équilibré
              </button>
              <button
                type="button"
                onClick={() => handleUiOpacityChange(100)}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-center ${
                  uiOpacity > 80
                    ? 'bg-[#15803D] text-white border-[#15803D]'
                    : 'bg-black/5 hover:bg-black/10 border-inherit/30'
                }`}
              >
                100% Opaque
              </button>
            </div>
          </div>

          <div className="mt-2 text-[10px] opacity-80 flex items-center gap-1.5 bg-[#15803D]/10 p-2 rounded-xl text-[#15803D]">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Contraste et lisibilité protégés par un filtre de verre poli et ombres douces.</span>
          </div>
        </div>
      )}
    </div>
  );
};
