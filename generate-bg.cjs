const fs = require('fs');
const content = `import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Eye, EyeOff, Sliders, RotateCcw, Repeat, Layers } from 'lucide-react';
import { StorageService } from '../utils/storage';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

interface BackgroundMusicVideoProps {
  isPanicOrCamouflage: boolean;
  isNightMode?: boolean;
  resiliencePoints?: number;
}

export const BackgroundMusicVideo: React.FC<BackgroundMusicVideoProps> = ({
  isPanicOrCamouflage,
  isNightMode = false,
  resiliencePoints = 0,
}) => {
  const isVideoUnfrozen = resiliencePoints >= 200; // Level 3+
  const isAudioAutoUnlocked = resiliencePoints >= 400; // Level 4+
  const canControlVisuals = resiliencePoints >= 80; // Level 2+
  const canControlAudio = resiliencePoints >= 400; // Level 4+

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState<number>(() => StorageService.getBgVolume() || 15);
  const [opacity, setOpacity] = useState<number>(() => resiliencePoints < 80 ? 100 : (StorageService.getVideoOpacity() || 100));
  const [uiOpacity, setUiOpacity] = useState<number>(() => StorageService.getUiOpacity());
  const [showControls, setShowControls] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [isApiReady, setIsApiReady] = useState(false);
  const [trackProgress, setTrackProgress] = useState({ currentTime: 0, duration: 210 });
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const playerRef = useRef<any>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const pollIntervalRef = useRef<number | null>(null);

  const videoId = 'hgHwXM7GYuk';

  useEffect(() => {
    if (!window.YT || !window.YT.Player) {
      const existingScript = document.getElementById('youtube-iframe-api-script');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        setIsApiReady(true);
      };
    } else {
      setIsApiReady(true);
    }
  }, []);

  useEffect(() => {
    if (window.YT && window.YT.Player && isApiReady && !playerRef.current && isVideoUnfrozen) {
      playerRef.current = new window.YT.Player('haven-persistent-bg-player', {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            try {
              event.target.setVolume(volume);
              event.target.mute();
              if (!isPanicOrCamouflage && isAudioAutoUnlocked) {
                event.target.setVolume(10);
                event.target.unMute();
                event.target.playVideo();
                setIsPlaying(true);
                setIsMuted(false);
                setVolume(10);
                setAudioUnlocked(true);
              } else if (!isPanicOrCamouflage) {
                event.target.playVideo();
                setIsPlaying(true);
                setIsMuted(true);
              }
            } catch (e) {
              console.warn('Autoplay ready event notice:', e);
            }
          },
        },
      });
    }
  }, [isApiReady, isPanicOrCamouflage, isVideoUnfrozen]);

  useEffect(() => {
    const tryUnlockAudio = () => {
      if (audioUnlocked) return;
      if (playerRef.current && !isPanicOrCamouflage) {
        try {
          playerRef.current.setVolume(volume);
          playerRef.current.playVideo();
          setIsPlaying(true);
          setAudioUnlocked(true);
        } catch {}
      }
    };

    window.addEventListener('click', tryUnlockAudio, { capture: true, once: true });
    window.addEventListener('pointerdown', tryUnlockAudio, { capture: true, once: true });
    window.addEventListener('touchstart', tryUnlockAudio, { capture: true, once: true });
    window.addEventListener('keydown', tryUnlockAudio, { capture: true, once: true });

    return () => {
      window.removeEventListener('click', tryUnlockAudio, { capture: true });
      window.removeEventListener('pointerdown', tryUnlockAudio, { capture: true });
      window.removeEventListener('touchstart', tryUnlockAudio, { capture: true });
      window.removeEventListener('keydown', tryUnlockAudio, { capture: true });
    };
  }, [audioUnlocked, volume, isPanicOrCamouflage]);

  useEffect(() => {
    pollIntervalRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const current = playerRef.current.getCurrentTime() || 0;
          const total = playerRef.current.getDuration() || 210;
          setTrackProgress({ currentTime: Math.floor(current), duration: Math.floor(total) });

          if (total > 10 && current >= total - 0.5) {
            playerRef.current.seekTo(0, true);
            playerRef.current.playVideo();
          }
        } catch {}
      }
    }, 1000);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isAudioAutoUnlocked && !audioUnlocked) {
      setVolume(10);
      setIsMuted(false);
      setIsPlaying(true);
      setAudioUnlocked(true);
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.setVolume(10);
        playerRef.current.unMute();
        playerRef.current.playVideo();
      }
    }
  }, [isAudioAutoUnlocked, audioUnlocked]);

  useEffect(() => {
    if (isPanicOrCamouflage) {
      setIsPlaying(false);
      setIsMuted(true);
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
        playerRef.current.mute();
      }
    }
  }, [isPanicOrCamouflage]);

  useEffect(() => {
    const handleGlobalTogglePlay = () => togglePlayPause();
    const handleGlobalPause = () => {
      setIsPlaying(false);
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
    };
    const handleGlobalToggleMute = () => toggleMute();
    const handleGlobalRestart = () => restartTrack();
    const handleGlobalSetOpacity = (e: Event) => {
      const customEvent = e as CustomEvent<{ opacity: number }>;
      if (customEvent.detail && typeof customEvent.detail.opacity === 'number') {
        setOpacity(customEvent.detail.opacity);
      }
    };
    const handleGlobalSetVolume = (e: Event) => {
      const customEvent = e as CustomEvent<{ volume: number }>;
      if (customEvent.detail && typeof customEvent.detail.volume === 'number') {
        handleVolumeChange(customEvent.detail.volume);
      }
    };
    const handleGlobalToggleVideo = () => setIsVideoVisible((prev) => !prev);
    const handleGlobalUiOpacity = (e: Event) => {
      const customEvent = e as CustomEvent<{ opacity: number }>;
      if (customEvent.detail && typeof customEvent.detail.opacity === 'number') {
        handleUiOpacitySliderChange(customEvent.detail.opacity);
      }
    };

    window.addEventListener('haven-audio-toggle-play', handleGlobalTogglePlay);
    window.addEventListener('haven-audio-pause', handleGlobalPause);
    window.addEventListener('haven-audio-toggle-mute', handleGlobalToggleMute);
    window.addEventListener('haven-audio-restart', handleGlobalRestart);
    window.addEventListener('haven-audio-set-opacity', handleGlobalSetOpacity);
    window.addEventListener('haven-audio-set-volume', handleGlobalSetVolume);
    window.addEventListener('haven-audio-toggle-video', handleGlobalToggleVideo);
    window.addEventListener('haven-ui-opacity-changed', handleGlobalUiOpacity);

    return () => {
      window.removeEventListener('haven-audio-toggle-play', handleGlobalTogglePlay);
      window.removeEventListener('haven-audio-pause', handleGlobalPause);
      window.removeEventListener('haven-audio-toggle-mute', handleGlobalToggleMute);
      window.removeEventListener('haven-audio-restart', handleGlobalRestart);
      window.removeEventListener('haven-audio-set-opacity', handleGlobalSetOpacity);
      window.removeEventListener('haven-audio-set-volume', handleGlobalSetVolume);
      window.removeEventListener('haven-audio-toggle-video', handleGlobalToggleVideo);
      window.removeEventListener('haven-ui-opacity-changed', handleGlobalUiOpacity);
    };
  }, [isPlaying, isMuted, volume]);

  const handleUiOpacitySliderChange = (newVal: number) => {
    const clamped = Math.max(10, Math.min(100, Math.round(newVal)));
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

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('haven-audio-state-changed', {
        detail: { isPlaying, isMuted, volume, opacity, isVideoVisible, trackProgress },
      })
    );
  }, [isPlaying, isMuted, volume, opacity, isVideoVisible, trackProgress]);

  const handleVolumeChange = (newVolume: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(newVolume)));
    setVolume(clamped);
    StorageService.setBgVolume(clamped);
    if (playerRef.current) {
      if (typeof playerRef.current.setVolume === 'function') {
        playerRef.current.setVolume(clamped);
      }
      if (clamped > 0 && isMuted) {
        setIsMuted(false);
        if (typeof playerRef.current.unMute === 'function') {
          playerRef.current.unMute();
        }
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      if (nextMute) {
        if (typeof playerRef.current.mute === 'function') playerRef.current.mute();
      } else {
        if (typeof playerRef.current.unMute === 'function') playerRef.current.unMute();
        if (volume === 0) {
          handleVolumeChange(15);
        }
      }
    }
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      const nextPlay = !isPlaying;
      setIsPlaying(nextPlay);
      if (nextPlay) {
        if (typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } else {
        if (typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
      }
    }
  };

  const restartTrack = () => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(0, true);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const formatTrackTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
  };

  return (
    <>
      {/* Background Video Layer */}
      <div
        id="music-video-background-layer"
        className={\`fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none transition-opacity duration-700 \${
          !isVideoVisible || isPanicOrCamouflage ? 'opacity-0 invisible' : ''
        }\`}
        style={{ opacity: isVideoVisible && !isPanicOrCamouflage ? opacity / 100 : 0 }}
        aria-hidden="true"
      >
        <div
          ref={iframeContainerRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
        >
          {!isVideoUnfrozen ? (
            <img 
              src="https://img.youtube.com/vi/hgHwXM7GYuk/maxresdefault.jpg" 
              alt="Background" 
              className="w-full h-full object-cover opacity-80" 
              style={{ filter: 'contrast(105%) saturate(110%)' }}
            />
          ) : (
            <div
              id="haven-persistent-bg-player"
              className="w-[150vw] h-[150vh] min-w-full min-h-full object-cover scale-[1.3] pointer-events-none border-0"
              style={{
                filter: 'contrast(105%) saturate(110%)',
              }}
            />
          )}
        </div>

        {/* Ambient gradient overlay */}
        <div
          className={\`absolute inset-0 pointer-events-none transition-colors duration-500 \${
            isNightMode
              ? 'bg-gradient-to-b from-black/40 via-transparent to-black/60 mix-blend-multiply'
              : 'bg-gradient-to-b from-[#F8F7F2]/10 via-transparent to-[#F8F7F2]/40 mix-blend-overlay'
          }\`}
        />
      </div>

      {/* Floating Audio & Clip Widget (Bottom Right) */}
      {!isPanicOrCamouflage && canControlVisuals && (
        <div
          id="music-video-player-bar"
          className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 font-sans"
        >
          {/* Expanded settings menu */}
          {showControls && (
            <div className={\`p-3.5 rounded-2xl shadow-2xl border text-xs w-80 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200 backdrop-blur-xl \${
              isNightMode 
                ? 'bg-[#1E201B]/95 border-[#3E4633] text-[#D6D4CD]' 
                : 'bg-white/95 border-[#CED6C1] text-[#3E3B39]'
            }\`}>
              <div className="flex items-center justify-between border-b border-inherit/30 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-[#8A9A5B]">
                  <Sliders className="w-4 h-4" />
                  <span>Paramètres Visuels {canControlAudio ? '& Sonores' : ''}</span>
                </div>
              </div>

              {canControlAudio && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-[#8E8B82]">
                    <span className="flex items-center gap-1">
                      {isMuted || volume === 0 ? <VolumeX className="w-3 h-3 text-[#A64D4D]" /> : <Volume2 className="w-3 h-3 text-[#8A9A5B]" />}
                      Volume ambiant
                    </span>
                    <span className="font-bold text-[#8A9A5B]">{isMuted ? 'Muet' : \`\${volume}%\`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer accent-[#8A9A5B]"
                  />
                </div>
              )}

              {/* UI Cards Opacity Slider */}
              <div className="space-y-1 bg-black/5 p-2 rounded-xl border border-inherit/30">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-medium flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#8A9A5B]" />
                    Transparence Fiches & Boutons
                  </span>
                  <span className="font-bold text-[#8A9A5B]">{uiOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="5"
                  value={uiOpacity}
                  onChange={(e) => handleUiOpacitySliderChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#CED6C1]/40 rounded-lg appearance-none cursor-pointer accent-[#8A9A5B]"
                />
                <div className="flex justify-between text-[9px] opacity-75">
                  <button type="button" onClick={() => handleUiOpacitySliderChange(25)} className="hover:text-[#8A9A5B]">Translucide (25%)</button>
                  <button type="button" onClick={() => handleUiOpacitySliderChange(65)} className="hover:text-[#8A9A5B]">Équilibré (65%)</button>
                  <button type="button" onClick={() => handleUiOpacitySliderChange(95)} className="hover:text-[#8A9A5B]">Opaque (95%)</button>
                </div>
              </div>

              {/* Video Opacity slider */}
              <div className="space-y-1 bg-black/5 p-2 rounded-xl border border-inherit/30">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-medium flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#8A9A5B]" />
                    Opacité de la vidéo de fond
                  </span>
                  <span className="font-bold text-[#8A9A5B]">{opacity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={opacity}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setOpacity(v);
                    StorageService.setVideoOpacity(v);
                  }}
                  className="w-full h-1.5 bg-[#CED6C1]/40 rounded-lg appearance-none cursor-pointer accent-[#8A9A5B]"
                />
                <div className="flex justify-between text-[9px] opacity-75">
                  <span>Subtil (15%)</span>
                  <span className="font-semibold">Recommandé (45%)</span>
                  <span>Intense (100%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOpacity(45);
                    handleUiOpacitySliderChange(65);
                  }}
                  className="px-2.5 py-1 text-[11px] bg-black/5 hover:bg-black/10 rounded-lg font-medium transition-colors border border-inherit/30"
                >
                  Mode Équilibré
                </button>
                <button
                  type="button"
                  onClick={() => setIsVideoVisible(!isVideoVisible)}
                  className="px-2.5 py-1 text-[11px] bg-black/5 border border-inherit/30 hover:bg-black/10 rounded-lg font-medium flex items-center gap-1 transition-colors"
                >
                  {isVideoVisible ? <EyeOff className="w-3 h-3 text-[#A64D4D]" /> : <Eye className="w-3 h-3 text-[#8A9A5B]" />}
                  <span>{isVideoVisible ? 'Masquer vidéo' : 'Afficher vidéo'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Floating Pill Player */}
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow-lg border border-[#CED6C1] text-xs text-[#3E3B39] transition-all hover:bg-white">
            <div className="w-6 h-6 rounded-full bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shrink-0">
              <Music className={\`w-3.5 h-3.5 text-[#8A9A5B] \${isPlaying && !isMuted ? 'animate-bounce' : ''}\`} />
            </div>

            <div className="flex flex-col text-left pr-1 max-w-[140px] sm:max-w-[200px]">
              <span className="font-bold text-[11px] text-[#3E3B39] truncate leading-tight">
                History of Violence
              </span>
              <span className="text-[9px] text-[#8E8B82] truncate leading-tight flex items-center gap-1">
                <span>Theory of a Deadman</span>
                {isVideoUnfrozen && <span className="font-mono text-[#8A9A5B]">• {formatTrackTime(trackProgress.currentTime)}</span>}
              </span>
            </div>

            {canControlAudio && (
              <>
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="p-1.5 rounded-full hover:bg-[#E5EAD9] text-[#5A5A40] transition-colors"
                  title={isPlaying ? 'Mettre en pause' : 'Lire la musique'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className={\`p-1.5 rounded-full transition-colors \${
                    isMuted ? 'bg-[#A64D4D]/15 text-[#A64D4D] hover:bg-[#A64D4D]/25' : 'hover:bg-[#E5EAD9] text-[#5A5A40]'
                  }\`}
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setShowControls(!showControls)}
              className={\`p-1.5 rounded-full transition-colors \${
                showControls ? 'bg-[#5A5A40] text-white' : 'hover:bg-[#E5EAD9] text-[#8E8B82]'
              }\`}
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
`;
fs.writeFileSync('src/components/BackgroundMusicVideo.tsx', content);
