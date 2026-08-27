import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Sparkles, Wind, Play, Pause, RefreshCw, 
  Image as ImageIcon, Video, Volume2, UserCheck, Check, Music, Activity, CalendarPlus
} from 'lucide-react';
import { WellnessCalendarTracker } from './WellnessCalendarTracker';
import { CompanionMemoryService } from '../utils/companionMemory';
import { googleSignIn, initAuth } from '../utils/firebaseAuth';
import { createCalendarEvent } from '../utils/workspaceApi';

interface TherapeuticRelaxationProps {
  isNightMode?: boolean;
}

const SOLFEGGIO_FREQS = [
  { freq: 174, label: '174 Hz' },
  { freq: 285, label: '285 Hz' },
  { freq: 369, label: '369 Hz' },
  { freq: 432, label: '432 Hz' },
  { freq: 528, label: '528 Hz' },
  { freq: 639, label: '639 Hz' },
  { freq: 741, label: '741 Hz' },
  { freq: 852, label: '852 Hz' },
  { freq: 963, label: '963 Hz' },
];

export const TherapeuticRelaxation: React.FC<TherapeuticRelaxationProps> = ({ isNightMode = false }) => {
  // Breathing Coach State (4-7-8 or 5-5 cardiac coherence)
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inspire' | 'hold' | 'expire'>('inspire');
  const [phaseSeconds, setPhaseSeconds] = useState(4);
  const [totalCycles, setTotalCycles] = useState(0);
  const breathingSectionRef = useRef<HTMLDivElement>(null);

  // Pause the background song automatically when this tab is opened
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('haven-audio-pause'));
  }, []);

  // Solfeggio Audio State
  const [activeFreq, setActiveFreq] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (oscRef.current) oscRef.current.stop();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const toggleFrequency = (freq: number) => {
    if (activeFreq === freq) {
      // Stop
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current = null;
      }
      setActiveFreq(null);
    } else {
      // Start or change
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
      if (oscRef.current) {
        oscRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.1);
      } else {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Very soft volume for relaxation
        gain.gain.value = 0.1;
        
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        
        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
      }
      setActiveFreq(freq);
    }
  };

  // Avatar & Art Therapy State
  const [avatarPrompt, setAvatarPrompt] = useState('Portrait aquarelle apaisant, profil doux abstrait en tons lavande et or');
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  // Auth State for Calendar
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    initAuth(
      () => setNeedsAuth(false),
      () => setNeedsAuth(true)
    );
  }, []);

  const handleScheduleBreathing = async () => {
    if (needsAuth) {
      try {
        await googleSignIn();
        setNeedsAuth(false);
      } catch (err) {
        console.error('Erreur de connexion', err);
        return;
      }
    }
    
    setIsScheduling(true);
    const start = new Date();
    start.setMinutes(start.getMinutes() + 15);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 15);

    const link = await createCalendarEvent(
      'Séance de Cohérence Cardiaque - Haven',
      'Une séance de 15 minutes de respiration 4-7-8 pour apaiser le système nerveux.',
      start.toISOString(),
      end.toISOString()
    );

    setIsScheduling(false);
    if (link) {
      alert('Séance planifiée sur Google Calendar avec succès !');
      window.open(link, '_blank');
    } else {
      alert('Erreur lors de la planification.');
    }
  };

  // Calming Video State (Veo 3.1)
  const [videoActive, setVideoActive] = useState(false);
  const companionProfile = CompanionMemoryService.getProfile();
  const isAvatarUnlocked = companionProfile.resiliencePoints >= 200;

  const startBreathingSession = () => {
    setBreathingActive(true);
    setBreathingPhase('inspire');
    setPhaseSeconds(4);
    if (breathingSectionRef.current) {
      breathingSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingActive) {
      interval = setInterval(() => {
        setPhaseSeconds((prev) => {
          if (prev <= 1) {
            // Next phase
            if (breathingPhase === 'inspire') {
              setBreathingPhase('hold');
              return 7;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('expire');
              return 8;
            } else {
              setBreathingPhase('inspire');
              setTotalCycles((c) => {
                const nextC = c + 1;
                // Add points every 2 full breathing cycles to reward resilience
                if (nextC % 2 === 0) {
                  CompanionMemoryService.addResiliencePoints(15, `2 cycles de cohérence cardiaque (${nextC} au total)`);
                }
                return nextC;
              });
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathingPhase]);

  const generateAnonymousAvatar = async () => {
    setLoadingAvatar(true);
    try {
      const res = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: avatarPrompt, type: 'avatar' }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedAvatar(data.imageUrl);
      }
    } catch (err) {
      console.error('Error generating avatar:', err);
    } finally {
      setLoadingAvatar(false);
    }
  };

  return (
    <div id="therapeutic-relaxation-section" className="space-y-6">
      {/* 1. Module de Calendrier de Suivi de Bien-être (Météo Intérieure & Stress) */}
      <WellnessCalendarTracker 
        onStartBreathing={startBreathingSession}
        isNightMode={isNightMode}
      />

      {/* 2. Interactive Breathing Guide (Cardiac Coherence / 4-7-8) */}
      <div 
        ref={breathingSectionRef}
        id="cardiac-coherence-box"
        className="bg-gradient-to-b from-[#5A5A40] to-[#3E3B39] text-white rounded-3xl p-6 md:p-8 shadow-md border border-[#CED6C1]/20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E5EAD9] text-xs font-semibold mb-3 border border-white/10">
              <Wind className="w-3.5 h-3.5" /> Régulation du Système Nerveux
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight font-serif-natural text-[#F8F7F2]">
              Cohérence Cardiaque & Respiration d'Ancrage (4-7-8)
            </h2>
            <p className="text-xs md:text-sm text-[#E5E2D9] mt-2 leading-relaxed">
              En situation de choc, d'angoisse ou de stress aigu, la respiration rythmée active instantanément le système nerveux parasympathique pour apaiser le rythme cardiaque et les tremblements.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setBreathingActive(!breathingActive);
                  if (!breathingActive) {
                    setBreathingPhase('inspire');
                    setPhaseSeconds(4);
                  }
                }}
                className="px-6 py-3 bg-[#8A9A5B] hover:bg-[#78884d] text-white font-bold text-xs md:text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {breathingActive ? 'Suspendre la séance' : 'Démarrer la Respiration'}
              </button>

              <button
                onClick={handleScheduleBreathing}
                disabled={isScheduling}
                className="px-4 py-3 bg-[#333333] hover:bg-[#1a1a1a] border border-[#CED6C1]/20 text-[#E5EAD9] text-xs font-semibold rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {isScheduling ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CalendarPlus className="w-4 h-4" />}
                Planifier une séance
              </button>

              <span className="text-xs text-[#CED6C1] ml-2">
                Cycles accomplis : <strong>{totalCycles}</strong>
              </span>
            </div>

            {/* Solfeggio Frequencies Menu */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <h3 className="text-xs font-bold text-[#E5EAD9] mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                <Music className="w-4 h-4" />
                Fréquences de guérison (Solfeggio)
              </h3>
              <div className="flex flex-wrap gap-2">
                {SOLFEGGIO_FREQS.map((f) => (
                  <button
                    key={f.freq}
                    onClick={() => toggleFrequency(f.freq)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                      activeFreq === f.freq
                        ? 'bg-[#E5EAD9] text-[#3E3B39] border-[#E5EAD9] shadow-sm'
                        : 'bg-white/5 text-[#CED6C1] border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {activeFreq === f.freq ? <Activity className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Breathing Sphere */}
          <div className="relative flex items-center justify-center w-56 h-56">
            <div
              className={`w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-2xl border-4 ${
                breathingPhase === 'inspire'
                  ? 'scale-110 bg-[#8A9A5B]/40 border-[#8A9A5B] shadow-[#8A9A5B]/40'
                  : breathingPhase === 'hold'
                  ? 'scale-105 bg-[#E5EAD9]/30 border-[#CED6C1] shadow-[#CED6C1]/30'
                  : 'scale-90 bg-white/20 border-white/50 shadow-white/20'
              }`}
            >
              <span className="text-xs uppercase font-bold tracking-widest text-[#E5EAD9]">
                {breathingPhase === 'inspire' ? 'Inspirez' : breathingPhase === 'hold' ? 'Bloquez' : 'Expirez'}
              </span>
              <span className="text-4xl font-black mt-1 text-white">{phaseSeconds}s</span>
              <span className="text-[10px] text-[#E5E2D9] mt-1">
                {breathingPhase === 'inspire' ? 'Par le nez' : breathingPhase === 'hold' ? 'Poumons pleins' : 'Par la bouche'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Art-Thérapie & Création d'Avatars Anonymes (Nano Banana 2 / Imagen) */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#3E3B39] font-serif-natural">
              {isAvatarUnlocked ? "Bonus: Art-Thérapie & Avatars Anonymes de Protection" : "Module Verrouillé"}
            </h3>
            <p className="text-xs text-[#8E8B82]">
              {isAvatarUnlocked ? "Bravo ! Vous avez débloqué votre espace Bonus. Générez une identité visuelle artistique." : "Ce module ludique se débloquera lorsque vous aurez accumulé au moins 200 points."}
            </p>
          </div>
        </div>

        {isAvatarUnlocked && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                Description de l'avatar ou de la création apaisante :
              </label>
              <textarea
                rows={3}
                value={avatarPrompt}
                onChange={(e) => setAvatarPrompt(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] bg-[#F8F7F2] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                'Aquarelle douce femme papillon espoir',
                'Oiseau en vol vers la lumière du matin',
                'Fleur de lotus s\'ouvrant sur une eau calme',
              ].map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAvatarPrompt(p)}
                  className="px-2.5 py-1 bg-[#F8F7F2] text-[#5A5A40] hover:bg-[#E5EAD9] rounded-lg text-[11px] font-medium border border-[#E5E2D9] transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={generateAnonymousAvatar}
              disabled={loadingAvatar}
              className="w-full py-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {loadingAvatar ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
              Générer l'Avatar Anonyme
            </button>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] min-h-[220px]">
            {loadingAvatar ? (
              <div className="text-center text-xs text-[#8E8B82]">
                <RefreshCw className="w-6 h-6 animate-spin text-[#8A9A5B] mx-auto mb-2" />
                Création de votre illustration protectrice...
              </div>
            ) : generatedAvatar ? (
              <div className="text-center">
                <img
                  src={generatedAvatar}
                  alt="Avatar anonyme"
                  className="w-36 h-36 rounded-full object-cover shadow-md mx-auto mb-2 border-2 border-[#CED6C1]"
                />
                <span className="text-xs font-semibold text-[#5A5A40] bg-[#E5EAD9] px-3 py-1 rounded-full border border-[#CED6C1] inline-flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#5A5A40]" /> Avatar Protecteur Prêt
                </span>
              </div>
            ) : (
              <div className="text-center text-xs text-[#8E8B82]">
                <ImageIcon className="w-10 h-10 mx-auto mb-1 text-[#8E8B82] opacity-50" />
                Aucun avatar encore généré. Cliquez sur le bouton pour créer le vôtre.
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};