const fs = require('fs');

let content = fs.readFileSync('src/components/BackgroundMusicVideo.tsx', 'utf8');

// Update initial state
content = content.replace("const [isMuted, setIsMuted] = useState(false);", "const [isMuted, setIsMuted] = useState(true);");

// Update playerVars mute
content = content.replace(
  "          autoplay: 1,\n          mute: 0,\n          loop: 1,",
  "          autoplay: 1,\n          mute: 1,\n          loop: 1,"
);

// Update onReady
content = content.replace(
  /event\.target\.setVolume\(volume\);\s*event\.target\.unMute\(\);\s*if \(\!isPanicOrCamouflage\) \{\s*event\.target\.playVideo\(\);\s*setIsPlaying\(true\);\s*setIsMuted\(false\);\s*\}/g,
  `event.target.setVolume(volume);
              event.target.mute();
              if (!isPanicOrCamouflage) {
                event.target.playVideo();
                setIsPlaying(true);
                setIsMuted(true);
              }`
);

// Update tryUnlockAudio
content = content.replace(
  /playerRef\.current\.setVolume\(volume\);\s*playerRef\.current\.unMute\(\);\s*playerRef\.current\.playVideo\(\);\s*setIsPlaying\(true\);\s*setIsMuted\(false\);\s*setAudioUnlocked\(true\);/g,
  `playerRef.current.setVolume(volume);
          // playerRef.current.unMute();
          playerRef.current.playVideo();
          setIsPlaying(true);
          // setIsMuted(false); // Keeps it muted initially
          setAudioUnlocked(true);`
);

fs.writeFileSync('src/components/BackgroundMusicVideo.tsx', content);
