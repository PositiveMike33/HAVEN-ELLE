import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Eye, EyeOff, Sliders, Sparkles } from 'lucide-react';

interface BackgroundMusicVideoProps {
  isPanicOrCamouflage: boolean;
}

export const BackgroundMusicVideo: React.FC<BackgroundMusicVideoProps> = ({
  isPanicOrCamouflage,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [opacity, setOpacity] = useState<number>(33); // 33% as requested
  const [showControls, setShowControls] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube Video ID for Theory of a Deadman - History of Violence
  const videoId = 'hgHwXM7GYuk';

  // Handle Panic or Camouflage mode: immediately mute and hide
  useEffect(() => {
    if (isPanicOrCamouflage) {
      setIsPlaying(false);
      setIsMuted(true);
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'mute', args: [] }),
          '*'
        );
      }
    }
  }, [isPanicOrCamouflage]);

  const togglePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = nextState ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: func, args: [] }),
        '*'
      );
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = nextMute ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: func, args: [] }),
        '*'
      );
      if (!nextMute && !isPlaying) {
        setIsPlaying(true);
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*'
        );
      }
    }
  };

  // Embed URL with loop, autoplay, playlist, controls disabled and enablejsapi enabled
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`;

  return (
    <>
      {/* Background Video Layer */}
      {isVideoVisible && !isPanicOrCamouflage && (
        <div
          id="music-video-background-layer"
          className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none transition-opacity duration-700"
          style={{ opacity: opacity / 100 }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title="Theory of a Deadman - History of Violence (Official Video)"
              allow="autoplay; encrypted-media; picture-in-picture"
              className="w-[150vw] h-[150vh] min-w-full min-h-full object-cover scale-[1.3] pointer-events-none border-0"
              style={{
                filter: 'contrast(105%) saturate(110%)',
              }}
            />
          </div>

          {/* Ambient gradient overlay to maintain elegance & contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F7F2]/10 via-transparent to-[#F8F7F2]/40 mix-blend-overlay pointer-events-none" />
        </div>
      )}

      {/* Floating Audio & Clip Widget (Bottom Right) */}
      {!isPanicOrCamouflage && (
        <div
          id="music-video-player-bar"
          className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 font-sans"
        >
          {/* Expanded settings menu */}
          {showControls && (
            <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#CED6C1] text-xs text-[#3E3B39] w-72 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
                <div className="flex items-center gap-1.5 font-bold text-[#5A5A40]">
                  <Music className="w-4 h-4 text-[#8A9A5B]" />
                  <span>Ambiance & Clip Vidéo</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowControls(false)}
                  className="text-[#8E8B82] hover:text-[#3E3B39] text-xs px-1.5 py-0.5 rounded-md hover:bg-[#F5F2ED]"
                >
                  ✕
                </button>
              </div>

              <div>
                <p className="font-semibold text-[#3E3B39] truncate">
                  Theory of a Deadman
                </p>
                <p className="text-[11px] text-[#8E8B82] truncate">
                  « History of Violence » (Clip Officiel en Boucle)
                </p>
              </div>

              {/* Opacity slider */}
              <div className="space-y-1 bg-[#F8F7F2] p-2 rounded-xl border border-[#E5E2D9]">
                <div className="flex justify-between items-center text-[11px] text-[#5A5A40]">
                  <span className="font-medium">Opacité de l'arrière-plan</span>
                  <span className="font-bold text-[#8A9A5B]">{opacity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="1"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#CED6C1] rounded-lg appearance-none cursor-pointer accent-[#8A9A5B]"
                />
                <div className="flex justify-between text-[9px] text-[#8E8B82]">
                  <span>Subtil (10%)</span>
                  <span className="font-semibold text-[#5A5A40]">Recommandé (33%)</span>
                  <span>Intense (80%)</span>
                </div>
              </div>

              {/* Action Buttons inside menu */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setOpacity(33)}
                  className="px-2.5 py-1 text-[11px] bg-[#E5EAD9] hover:bg-[#dbe2ce] text-[#5A5A40] rounded-lg font-medium transition-colors"
                >
                  Réinitialiser (33%)
                </button>

                <button
                  type="button"
                  onClick={() => setIsVideoVisible(!isVideoVisible)}
                  className="px-2.5 py-1 text-[11px] bg-white border border-[#E5E2D9] hover:bg-[#F5F2ED] text-[#3E3B39] rounded-lg font-medium flex items-center gap-1 transition-colors"
                >
                  {isVideoVisible ? <EyeOff className="w-3 h-3 text-[#A64D4D]" /> : <Eye className="w-3 h-3 text-[#8A9A5B]" />}
                  <span>{isVideoVisible ? 'Masquer vidéo' : 'Afficher vidéo'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Floating Pill Player */}
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow-lg border border-[#CED6C1] text-xs text-[#3E3B39] transition-all hover:bg-white">
            {/* Animated equalizer / icon */}
            <div className="w-6 h-6 rounded-full bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shrink-0">
              <Music className={`w-3.5 h-3.5 text-[#8A9A5B] ${isPlaying && !isMuted ? 'animate-bounce' : ''}`} />
            </div>

            {/* Song title short */}
            <div className="flex flex-col text-left pr-1 max-w-[140px] sm:max-w-[200px]">
              <span className="font-bold text-[11px] text-[#3E3B39] truncate leading-tight">
                History of Violence
              </span>
              <span className="text-[9px] text-[#8E8B82] truncate leading-tight">
                Theory of a Deadman • 33% opacité
              </span>
            </div>

            {/* Play / Pause */}
            <button
              type="button"
              onClick={togglePlayPause}
              className="p-1.5 rounded-full hover:bg-[#E5EAD9] text-[#5A5A40] transition-colors"
              title={isPlaying ? 'Mettre en pause' : 'Lire la musique'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            {/* Mute / Unmute */}
            <button
              type="button"
              onClick={toggleMute}
              className={`p-1.5 rounded-full transition-colors ${
                isMuted ? 'bg-[#A64D4D]/15 text-[#A64D4D] hover:bg-[#A64D4D]/25' : 'hover:bg-[#E5EAD9] text-[#5A5A40]'
              }`}
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Open opacity / settings */}
            <button
              type="button"
              onClick={() => setShowControls(!showControls)}
              className={`p-1.5 rounded-full transition-colors ${
                showControls ? 'bg-[#5A5A40] text-white' : 'hover:bg-[#E5EAD9] text-[#8E8B82]'
              }`}
              title="Ajuster l'opacité et les options du clip vidéo"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
