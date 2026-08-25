import React, { useState, useEffect, useRef } from 'react';
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
}

export const BackgroundMusicVideo: React.FC<BackgroundMusicVideoProps> = ({
  isPanicOrCamouflage,
  isNightMode = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(() => StorageService.getBgVolume()); // 15% default volume
  const [opacity, setOpacity] = useState<number>(() => StorageService.getVideoOpacity()); // Video opacity
  const [uiOpacity, setUiOpacity] = useState<number>(() => StorageService.getUiOpacity()); // UI cards opacity
  const [showControls, setShowControls] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [isApiReady, setIsApiReady] = useState(false);
  const [trackProgress, setTrackProgress] = useState({ currentTime: 0, duration: 210 });
  const [audioUnlocked, setAudioUnlocked] = useState(false);

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
          mute: 0,
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
            try {
              // Set volume to default (15%) immediately
              event.target.setVolume(volume);
              event.target.unMute();
              if (!isPanicOrCamouflage) {
                event.target.playVideo();
                setIsPlaying(true);
                setIsMuted(false);
              }
            } catch (e) {
              console.warn('Autoplay ready event notice:', e);
            }
          },
          onStateChange: (event: any) => {
            // 0 = YT.PlayerState.ENDED -> Guarantee 100% full song complete loop without cutting
            if (event.data === 0) {
              event.target.seekTo(0, true);
              event.target.setVolume(volume);
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
      console.warn('Failed to initialize YouTube API player:', e);
    }
  }, [isApiReady]);

  // Proactive browser gesture unlocker:
  // Many modern browsers require a first user interaction anywhere on the page to start unmuted sound
  useEffect(() => {
    const tryUnlockAudio = () => {
      if (audioUnlocked) return;
      if (playerRef.current && !isPanicOrCamouflage) {
        try {
          playerRef.current.setVolume(volume);
          playerRef.current.unMute();
          playerRef.current.playVideo();
          setIsPlaying(true);
          setIsMuted(false);
          setAudioUnlocked(true);
        } catch {
          // ignore transient policy errors
        }
      }
    };

    // First user gesture triggers unmuted audio automatically
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
    const handleGlobalSetVolume = (e: Event) => {
      const customEvent = e as CustomEvent<{ volume: number }>;
      if (customEvent.detail && typeof customEvent.detail.volume === 'number') {
        handleVolumeChange(customEvent.detail.volume);
      }
    };
    const handleGlobalToggleVideo = () => {
      setIsVideoVisible((prev) => !prev);
    };
    const handleGlobalUiOpacity = (e: Event) => {
      const customEvent = e as CustomEvent<{ opacity: number }>;
      if (customEvent.detail && typeof customEvent.detail.opacity === 'number') {
        setUiOpacity(customEvent.detail.opacity);
      }
    };

    window.addEventListener('haven-audio-toggle-play', handleGlobalTogglePlay);
    window.addEventListener('haven-audio-toggle-mute', handleGlobalToggleMute);
    window.addEventListener('haven-audio-restart', handleGlobalRestart);
    window.addEventListener('haven-audio-set-opacity', handleGlobalSetOpacity);
    window.addEventListener('haven-audio-set-volume', handleGlobalSetVolume);
    window.addEventListener('haven-audio-toggle-video', handleGlobalToggleVideo);
    window.addEventListener('haven-ui-opacity-changed', handleGlobalUiOpacity);

    return () => {
      window.removeEventListener('haven-audio-toggle-play', handleGlobalTogglePlay);
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

  // Dispatch current state for other UI components
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

  const togglePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (playerRef.current) {
      if (nextState) {
        if (typeof playerRef.current.playVideo === 'function') {
          playerRef.current.setVolume(volume);
          playerRef.current.unMute();
          playerRef.current.playVideo();
          setIsMuted(false);
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
        if (typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(volume || 15);
        }
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

        {/* Ambient gradient overlay to maintain elegance & contrast in both Day and Night modes */}
        <div
          className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
            isNightMode
              ? 'bg-gradient-to-b from-black/40 via-transparent to-black/60 mix-blend-multiply'
              : 'bg-gradient-to-b from-[#F8F7F2]/10 via-transparent to-[#F8F7F2]/40 mix-blend-overlay'
          }`}
        />
      </div>

      {/* Floating Audio & Clip Widget (Bottom Right) */}
      {!isPanicOrCamouflage && (
        <div
          id="music-video-player-bar"
          className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 font-sans"
        >
          {/* Expanded settings menu */}
          {showControls && (
            <div className={`p-3.5 rounded-2xl shadow-2xl border text-xs w-80 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200 backdrop-blur-xl ${
              isNightMode 
                ? 'bg-[#1E201B]/95 border-[#3E4633] text-[#D6D4CD]' 
                : 'bg-white/95 border-[#CED6C1] text-[#3E3B39]'
            }`}>
              <div className="flex items-center justify-between border-b border-inherit/30 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-[#8A9A5B]">
                  <Music className="w-4 h-4" />
                  <span>Ambiance & Clip Vidéo Complet</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowControls(false)}
                  className="opacity-70 hover:opacity-100 text-xs px-1.5 py-0.5 rounded-md hover:bg-black/10"
                >
                  ✕
                </button>
              </div>

              <div>
                <p className="font-semibold truncate">
                  Theory of a Deadman
                </p>
                <p className="text-[11px] opacity-75 truncate flex items-center justify-between">
                  <span>« History of Violence »</span>
                  <span className="text-[#8A9A5B] font-mono font-medium">
                    {formatTrackTime(trackProgress.currentTime)} / {formatTrackTime(trackProgress.duration)}
                  </span>
                </p>
              </div>

              {/* Loop and Status indicator */}
              <div className={`flex items-center justify-between p-2 rounded-xl border text-[11px] ${
                isNightMode ? 'bg-[#2A3122]/60 border-[#3E4633] text-[#C8D8B0]' : 'bg-[#E5EAD9]/60 border-[#CED6C1] text-[#5A5A40]'
              }`}>
                <span className="flex items-center gap-1">
                  <Repeat className="w-3.5 h-3.5 text-[#8A9A5B]" />
                  Boucle infinie intégrale
                </span>
                <button
                  type="button"
                  onClick={restartTrack}
                  className="px-2 py-0.5 bg-black/10 hover:bg-black/20 rounded-md font-medium text-[10px] border border-inherit/40 flex items-center gap-1"
                  title="Recommencer depuis le début"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Rejouer
                </button>
              </div>

              {/* Volume Slider */}
              <div className="space-y-1 bg-black/5 p-2 rounded-xl border border-inherit/30">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-medium flex items-center gap-1">
                    {isMuted || volume === 0 ? <VolumeX className="w-3 h-3 text-[#A64D4D]" /> : <Volume2 className="w-3 h-3 text-[#8A9A5B]" />}
                    Volume sonore
                  </span>
                  <span className="font-bold text-[#8A9A5B]">{isMuted ? 'Muet' : `${volume}%`}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    handleVolumeChange(val);
                  }}
                  className="w-full h-1.5 bg-[#CED6C1]/40 rounded-lg appearance-none cursor-pointer accent-[#8A9A5B]"
                />
                <div className="flex justify-between text-[9px] opacity-75">
                  <button
                    type="button"
                    onClick={() => handleVolumeChange(0)}
                    className="hover:text-[#8A9A5B]"
                  >
                    0%
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVolumeChange(15)}
                    className="font-semibold underline decoration-[#8A9A5B]"
                  >
                    15% (Défaut)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVolumeChange(35)}
                    className="hover:text-[#8A9A5B]"
                  >
                    35%
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVolumeChange(60)}
                    className="hover:text-[#8A9A5B]"
                  >
                    60%
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVolumeChange(100)}
                    className="hover:text-[#8A9A5B]"
                  >
                    100%
                  </button>
                </div>
              </div>

              {/* UI Cards & Buttons Opacity Slider (Transparency) */}
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
                  max="90"
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
                  <span>Intense (85%)</span>
                </div>
              </div>

              {/* Action Buttons inside menu */}
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

