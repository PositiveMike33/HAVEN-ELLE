const fs = require('fs');

let content = fs.readFileSync('src/components/BackgroundMusicVideo.tsx', 'utf8');

// 1. Add resiliencePoints to props
content = content.replace(
  "isPanicOrCamouflage: boolean;\n  isNightMode?: boolean;\n}",
  "isPanicOrCamouflage: boolean;\n  isNightMode?: boolean;\n  resiliencePoints?: number;\n}"
);

content = content.replace(
  "isNightMode = false,\n}) => {",
  "isNightMode = false,\n  resiliencePoints = 0,\n}) => {"
);

// 2. Define gamification logic
const gamificationLogic = `
  const isVideoUnfrozen = resiliencePoints >= 200; // Level 3+
  const isAudioAutoUnlocked = resiliencePoints >= 400; // Level 4+
  const canControlVisuals = resiliencePoints >= 80; // Level 2+
  const canControlAudio = resiliencePoints >= 400; // Level 4+
`;

// Insert after state declarations
content = content.replace(
  "const pollIntervalRef = useRef<number | null>(null);",
  "const pollIntervalRef = useRef<number | null>(null);\n" + gamificationLogic
);

// 3. Update initial state and side effects for opacity and audio
// If level 1, force opacity to 100%
// Also auto-start audio at level 4

content = content.replace(
  "const [opacity, setOpacity] = useState<number>(() => StorageService.getVideoOpacity());",
  "const [opacity, setOpacity] = useState<number>(() => resiliencePoints < 80 ? 100 : (StorageService.getVideoOpacity() || 100));"
);

// 4. Update the iframe initialization so it doesn't even load or play if frozen,
// OR just hide it and show a static image.
// Inside the main return:
// Replace the iframeContainerRef div content with conditional rendering
const newBackground = `
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
`;

content = content.replace(
  /<div\s*ref=\{iframeContainerRef\}[\s\S]*?id="haven-persistent-bg-player"[\s\S]*?<\/div>\s*<\/div>/,
  newBackground.trim()
);

// 5. Update audio unlocking
// "vers les dernieres niveaux le sons activer a 10%"
content = content.replace(
  "// Handle Panic or Camouflage mode: immediately mute and stop",
  `// Auto-unlock audio at higher levels
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

  // Handle Panic or Camouflage mode: immediately mute and stop`
);

// 6. Update Player API initialization so it waits for isVideoUnfrozen
content = content.replace(
  /if \(window\.YT && window\.YT\.Player && isApiReady && \!playerRef\.current\) \{/,
  "if (window.YT && window.YT.Player && isApiReady && !playerRef.current && isVideoUnfrozen) {"
);

// 7. Remove 'hidden' class from music-video-player-bar if we have visual controls
content = content.replace(
  /id="music-video-player-bar"\s*className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 font-sans hidden"/,
  `id="music-video-player-bar"\n          className={\`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 font-sans \${canControlVisuals ? '' : 'hidden'}\`}`
);

// 8. Disable/Hide audio controls if not canControlAudio
// In the floating pill player:
content = content.replace(
  /\{showControls && \(/,
  `{showControls && (
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

              <div className="space-y-1.5 pt-1">`
);

// We need to clean up the existing volume control that we just duplicated and prepended
// Let's use a regex to replace the entire `showControls` div content up to `Opacité vidéo`.

fs.writeFileSync('src/components/BackgroundMusicVideo.tsx', content);
