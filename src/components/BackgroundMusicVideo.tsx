import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Eye, EyeOff, Sliders, RotateCcw, Repeat } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

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
  const [isApiReady, setIsApiReady] = useState(false);
  const [trackProgress, setTrackProgress] = useState({ currentTime: 0, duration: 210 });

  const playerRef = useRef<any>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const pollIntervalRef = useRef<number | null>(null);

  // YouTube Video ID for Theory of a Deadman - History of Violence
  const videoId = 'hgHwXM7GYuk';

  // Initialize YouTube IFrame API once
  useEffect(() => {
    // Load YouTube API script if not present
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

  // Instantiate persistent YouTube Player when API is ready
  useEffect(() => {
    if (!isApiReady || playerRef.current || !window.YT) return;

    try {
      playerRef.current = new window.YT.Player('haven-persistent-bg-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: isMuted ? 1 : 0,
          loop: 1,
          playlist: videoId,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          iv_load_policy: 3,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            if (isMuted) {
              event.target.mute();
            } else {
              event.target.unMute();
            }
            if (isPlaying && !isPanicOrCamouflage) {
              event.target.playVideo();
            }
          },
          onStateChange: (event: any) => {
            // 0 = YT.PlayerState.ENDED -> Guarantee 100% full song complete loop without cutting
            if (event.data === 0) {
              event.target.seekTo(0, true);
              event.target.playVideo();
            } else if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            }
          },
          onError: (err: any) => {
            console.warn('YouTube Player event notice:', err);
          },
        },
      });
    } catch (e) {
      console.warn('Failed to initialize YouTube API player, using iframe fallback:', e);
    }
  }, [isApiReady]);

  // Keep track of playback duration and enforce complete infinite loop
  useEffect(() => {
    pollIntervalRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const current = playerRef.current.getCurrentTime() || 0;
          const total = playerRef.current.getDuration() || 210;
          setTrackProgress({ currentTime: Math.floor(current), duration: Math.floor(total) });

          // If track reached near end (within 1s) and didn't trigger ended event automatically, loop back to 0
          if (total > 10 && current >= total - 0.5) {
            playerRef.current.seekTo(0, true);
            playerRef.current.playVideo();
          }
        } catch {
          // ignore transient poll error
        }
      }
    }, 1000);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  // Handle Panic or Camouflage mode: immediately mute and stop
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

  // Synchronize global audio events across the entire app
  useEffect(() => {
    const handleGlobalTogglePlay = () => {
      togglePlayPause();
    };
    const handleGlobalToggleMute = () => {
      toggleMute();
    };
    const handleGlobalRestart = () => {
      restartTrack();
    };
    const handleGlobalSetOpacity = (e: Event) => {
      const customEvent = e as CustomEvent<{ opacity: number }>;
      if (customEvent.detail && typeof customEvent.detail.opacity === 'number') {
        setOpacity(customEvent.detail.opacity);
      }
    };

    window.addEventListener('haven-audio-toggle-play', handleGlobalTogglePlay);
    window.addEventListener('haven-audio-toggle-mute', handleGlobalToggleMute);
    window.addEventListener('haven-audio-restart', handleGlobalRestart);
    window.addEventListener('haven-audio-set-opacity', handleGlobalSetOpacity);

    return () => {
      window.removeEventListener('haven-audio-toggle-play', handleGlobalTogglePlay);
      window.removeEventListener('haven-audio-toggle-mute', handleGlobalToggleMute);
      window.removeEventListener('haven-audio-restart', handleGlobalRestart);
      window.removeEventListener('haven-audio-set-opacity', handleGlobalSetOpacity);
    };
  }, [isPlaying, isMuted]);

  // Dispatch current state for other UI components
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('haven-audio-state-changed', {
        detail: { isPlaying, isMuted, opacity, isVideoVisible, trackProgress },
      })
    );
  }, [isPlaying, isMuted, opacity, isVideoVisible, trackProgress]);

  const togglePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (playerRef.current) {
      if (nextState) {
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

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (playerRef.current) {
      if (nextMute) {
        if (typeof playerRef.current.mute === 'function') {
          playerRef.current.mute();
        }
      } else {
        if (typeof playerRef.current.unMute === 'function') {
          playerRef.current.unMute();
        }
        if (!isPlaying) {
          setIsPlaying(true);
          if (typeof playerRef.current.playVideo === 'function') {
            playerRef.current.playVideo();
          }
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
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Background Video Layer - Persistent Container without iframe reloads */}
      <div
        id="music-video-background-layer"
        className={`fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none transition-opacity duration-700 ${
          !isVideoVisible || isPanicOrCamouflage ? 'opacity-0 invisible' : ''
        }`}
        style={{ opacity: isVideoVisible && !isPanicOrCamouflage ? opacity / 100 : 0 }}
        aria-hidden="true"
      >
        <div
          ref={iframeContainerRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
        >
          {/* Permanent static element targeted by YouTube API */}
          <div
            id="haven-persistent-bg-player"
            className="w-[150vw] h-[150vh] min-w-full min-h-full object-cover scale-[1.3] pointer-events-none border-0"
            style={{
              filter: 'contrast(105%) saturate(110%)',
            }}
          />
        </div>

        {/* Ambient gradient overlay to maintain elegance & contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F7F2]/10 via-transparent to-[#F8F7F2]/40 mix-blend-overlay pointer-events-none" />
      </div>

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
                  <span>Ambiance & Clip Vidéo Complet</span>
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
                <p className="text-[11px] text-[#8E8B82] truncate flex items-center justify-between">
                  <span>« History of Violence »</span>
                  <span className="text-[#8A9A5B] font-mono font-medium">
                    {formatTrackTime(trackProgress.currentTime)} / {formatTrackTime(trackProgress.duration)}
                  </span>
                </p>
              </div>

              {/* Loop and Status indicator */}
              <div className="flex items-center justify-between bg-[#E5EAD9]/60 p-2 rounded-xl border border-[#CED6C1] text-[11px] text-[#5A5A40]">
                <span className="flex items-center gap-1">
                  <Repeat className="w-3.5 h-3.5 text-[#8A9A5B]" />
                  Boucle infinie intégrale
                </span>
                <button
                  type="button"
                  onClick={restartTrack}
                  className="px-2 py-0.5 bg-white text-[#5A5A40] rounded-md font-medium text-[10px] hover:bg-[#F5F2ED] border border-[#CED6C1] flex items-center gap-1"
                  title="Recommencer depuis le début"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Rejouer
                </button>
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
              <span className="text-[9px] text-[#8E8B82] truncate leading-tight flex items-center gap-1">
                <span>Theory of a Deadman</span>
                <span className="font-mono text-[#8A9A5B]">• {formatTrackTime(trackProgress.currentTime)}</span>
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

