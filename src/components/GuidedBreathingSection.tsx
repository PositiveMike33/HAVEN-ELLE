import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, 
  Play, 
  Pause, 
  RotateCcw, 
  Heart, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Award, 
  ShieldCheck, 
  Feather, 
  Sun,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { CompanionMemoryService } from '../utils/companionMemory';

export interface BreathingPattern {
  id: 'coherence' | 'anti_panic_478' | 'box_breathing' | 'gentle_46';
  name: string;
  badge: string;
  tagline: string;
  description: string;
  scientificBenefit: string;
  colorTheme: string;
  gradient: string;
  ringColor: string;
  phases: {
    name: 'inspire' | 'hold_in' | 'expire' | 'hold_out';
    label: string;
    subtext: string;
    duration: number; // in seconds
  }[];
}

export const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    id: 'anti_panic_478',
    name: 'Respiration 4-7-8 Anti-Panique',
    badge: 'Urgence Anxiété',
    tagline: 'Arrêt immédiat de la panique et désactivation de l\'adrénaline',
    description: 'Le protocole du Dr Andrew Weil : 4s d\'inspiration, 7s de rétention poumons pleins, et 8s d\'expiration lente.',
    scientificBenefit: 'Active massivement le nerf vague, fait chuter la fréquence cardiaque et calme l\'amygdale cérébrale en moins de 2 minutes.',
    colorTheme: 'from-[#EAF4E8] to-[#D5EAD0]',
    gradient: 'from-[#385117] via-[#506B26] to-[#8DA765]',
    ringColor: '#506B26',
    phases: [
      { name: 'inspire', label: 'Inspirez doucement', subtext: 'Par le nez, gonflez le ventre', duration: 4 },
      { name: 'hold_in', label: 'Retenez l\'air', subtext: 'Sans forcer, dans le calme', duration: 7 },
      { name: 'expire', label: 'Expirez lentement', subtext: 'Par la bouche, comme un soupir libérateur', duration: 8 }
    ]
  },
  {
    id: 'coherence',
    name: 'Cohérence Cardiaque 5-5',
    badge: 'Anti-Stress Fondamental',
    tagline: '6 respirations par minute pour harmoniser le système nerveux',
    description: 'Rythme biologique universel : 5 secondes d\'inspiration et 5 secondes d\'expiration fluide et continue.',
    scientificBenefit: 'Synchronise la variabilité du rythme cardiaque (VRC), diminue le cortisol salivaire et rétablit l\'équilibre autonome.',
    colorTheme: 'from-[#F3F7EE] to-[#DEEAD4]',
    gradient: 'from-[#2F6B4F] via-[#385117] to-[#719641]',
    ringColor: '#2F6B4F',
    phases: [
      { name: 'inspire', label: 'Inspirez avec fluidité', subtext: 'Ouvrez doucement la cage thoracique', duration: 5 },
      { name: 'expire', label: 'Expirez avec douceur', subtext: 'Relâchez les épaules et la nuque', duration: 5 }
    ]
  },
  {
    id: 'box_breathing',
    name: 'Respiration Carrée 4-4-4-4',
    badge: 'Ancrage & Maîtrise',
    tagline: 'Stabilisation mentale et recentrage face au stress aigu',
    description: '4 phases égales de 4 secondes : Inspiration, Pause poumons pleins, Expiration, Pause poumons vides.',
    scientificBenefit: 'Utilisée par les secouristes et thérapeutes pour dissiper la confusion mentale et restaurer le sang-froid.',
    colorTheme: 'from-[#F5F4EE] to-[#E5E2D6]',
    gradient: 'from-[#42542E] via-[#607743] to-[#8E9F6E]',
    ringColor: '#42542E',
    phases: [
      { name: 'inspire', label: '1. Inspirez', subtext: '4 secondes d\'air pur', duration: 4 },
      { name: 'hold_in', label: '2. Bloquez', subtext: 'Gardez le calme intérieur', duration: 4 },
      { name: 'expire', label: '3. Expirez', subtext: 'Videz complètement les poumons', duration: 4 },
      { name: 'hold_out', label: '4. Pause', subtext: 'Détente absolue en vide', duration: 4 }
    ]
  },
  {
    id: 'gentle_46',
    name: 'Respiration Douceur 4-6',
    badge: 'Sommeil & Réconfort',
    tagline: 'Expiration allongée pour inviter la sécurité et le sommeil',
    description: '4 secondes d\'inspiration suivies de 6 secondes d\'expiration douce sans rétention contraignante.',
    scientificBenefit: 'Privilégie l\'expiration pour stimuler le tonus parasympathique et détendre le diaphragme.',
    colorTheme: 'from-[#FBF8F2] to-[#ECE5D8]',
    gradient: 'from-[#5C6E3D] via-[#7B8F55] to-[#A4B57E]',
    ringColor: '#5C6E3D',
    phases: [
      { name: 'inspire', label: 'Inspirez la sérénité', subtext: 'Laissez entrer l\'air frais', duration: 4 },
      { name: 'expire', label: 'Expirez les tensions', subtext: 'Laissez s\'envoler les pensées lourdes', duration: 6 }
    ]
  }
];

interface GuidedBreathingSectionProps {
  onPointsEarned?: (points: number) => void;
}

export const GuidedBreathingSection: React.FC<GuidedBreathingSectionProps> = ({ onPointsEarned }) => {
  const [selectedPatternId, setSelectedPatternId] = useState<BreathingPattern['id']>('anti_panic_478');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [rewardToast, setRewardToast] = useState<string | null>(null);

  const pattern = BREATHING_PATTERNS.find(p => p.id === selectedPatternId) || BREATHING_PATTERNS[0];
  const currentPhase = pattern.phases[phaseIndex] || pattern.phases[0];

  // Audio tone context for gentle chime
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playChime = (type: 'inspire' | 'expire' | 'hold') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      const freq = type === 'inspire' ? 432 : type === 'expire' ? 369 : 528;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

      gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 1.2);
    } catch {
      // Audio context silenced safely
    }
  };

  // Reset counters when pattern changes
  const handleSelectPattern = (id: BreathingPattern['id']) => {
    setSelectedPatternId(id);
    setIsActive(false);
    setPhaseIndex(0);
    const newPattern = BREATHING_PATTERNS.find(p => p.id === id) || BREATHING_PATTERNS[0];
    setSecondsRemaining(newPattern.phases[0].duration);
  };

  // Main Breathing Timer Loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSecondsRemaining((prevSec) => {
          if (prevSec <= 1) {
            // Next phase
            const nextPhaseIndex = (phaseIndex + 1) % pattern.phases.length;
            
            // Completed a full cycle
            if (nextPhaseIndex === 0) {
              const newCycleCount = completedCycles + 1;
              setCompletedCycles(newCycleCount);

              // Reward points every 2 completed cycles
              if (newCycleCount % 2 === 0) {
                const updated = CompanionMemoryService.addResiliencePoints(
                  15, 
                  `Séance de ${pattern.name} (${newCycleCount} cycles complétés)`
                );
                if (onPointsEarned) {
                  onPointsEarned(updated.resiliencePoints);
                }
                setRewardToast(`🌿 +15 Points de Résilience pour votre pratique de respiration !`);
                setTimeout(() => setRewardToast(null), 4000);
              }
            }

            setPhaseIndex(nextPhaseIndex);
            const nextPhaseDuration = pattern.phases[nextPhaseIndex].duration;
            
            // Play gentle transition tone
            const phaseType = pattern.phases[nextPhaseIndex].name.includes('inspire') 
              ? 'inspire' 
              : pattern.phases[nextPhaseIndex].name.includes('expire') 
              ? 'expire' 
              : 'hold';
            playChime(phaseType);

            return nextPhaseDuration;
          }
          return prevSec - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phaseIndex, pattern, completedCycles, soundEnabled]);

  const handleToggleActive = () => {
    if (!isActive) {
      setIsActive(true);
      playChime('inspire');
    } else {
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setSecondsRemaining(pattern.phases[0].duration);
    setCompletedCycles(0);
  };

  // Calculate breathing orb visual scale
  const isInspiring = currentPhase.name === 'inspire';
  const isExpiring = currentPhase.name === 'expire';
  const isHolding = currentPhase.name.includes('hold');

  let orbScale = 1;
  if (isHolding) {
    orbScale = currentPhase.name === 'hold_in' ? 1.35 : 0.85;
  } else if (isInspiring) {
    const elapsed = currentPhase.duration - secondsRemaining;
    orbScale = 0.85 + (elapsed / currentPhase.duration) * 0.5;
  } else if (isExpiring) {
    const elapsed = currentPhase.duration - secondsRemaining;
    orbScale = 1.35 - (elapsed / currentPhase.duration) * 0.5;
  }

  return (
    <div id="guided-breathing-wellness-hub" className="space-y-6">
      {/* Toast Notification */}
      {rewardToast && (
        <div className="bg-[#E5EED6] border-2 border-[#506B26] p-4 rounded-2xl flex items-center justify-between shadow-md animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#385117] text-white flex items-center justify-center font-bold">
              +15
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#18210E]">{rewardToast}</h4>
              <p className="text-xs text-[#385117] font-medium">Points de résilience et apaisement somatique validés.</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-[#385117] text-white rounded-full">
            {completedCycles} cycles
          </span>
        </div>
      )}

      {/* Main Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#CED6C1] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EED6] text-[#2E4313] text-xs font-bold uppercase tracking-wider mb-2 border border-[#8DA765]/30">
              <Wind className="w-3.5 h-3.5 text-[#385117]" />
              Exercices de Respiration Guidée & Régulation Somatique
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1F201C] flex items-center gap-2">
              <Activity className="w-7 h-7 text-[#385117]" />
              Sanctuaire de Respiration Apaisante
            </h2>
            <p className="text-sm text-[#403E3A] font-medium mt-1 max-w-2xl">
              Des animations visuelles fluides et rythmées basées sur les neurosciences pour faire baisser le rythme cardiaque, dissiper la panique et restaurer la clarté intérieure en quelques respirations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                soundEnabled 
                  ? 'bg-[#E5EED6] border-[#506B26] text-[#2E4313]' 
                  : 'bg-[#F4F2EB] border-[#D5D0C2] text-[#6A6860] hover:bg-[#EAE7DC]'
              }`}
              title={soundEnabled ? 'Carillon doux activé' : 'Mode silencieux (Zéro son)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#385117]" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Son doux activé' : 'Mode silencieux'}</span>
            </button>
          </div>
        </div>

        {/* Pattern Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {BREATHING_PATTERNS.map((p) => {
            const isSelected = selectedPatternId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPattern(p.id)}
                className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#506B26] bg-[#F4F9EC] shadow-xs scale-[1.02]'
                    : 'border-[#E0DDD5] bg-[#FAF9F5] hover:bg-white hover:border-[#CED6C1]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-[#385117] text-white' : 'bg-[#EAE7DC] text-[#5A5852]'
                    }`}>
                      {p.badge}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#385117]" />}
                  </div>
                  <h4 className="text-sm font-bold text-[#1F201C] leading-snug">{p.name}</h4>
                  <p className="text-xs text-[#5A5852] mt-1 line-clamp-2 leading-relaxed">{p.tagline}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E5E2D9] text-[11px] font-mono text-[#385117] font-semibold flex items-center justify-between">
                  <span>{p.phases.map(ph => `${ph.duration}s`).join(' - ')}</span>
                  <span>{p.phases.length} phases</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Breathing Stage & Visual Animation */}
      <div className="bg-gradient-to-b from-[#FAF9F5] to-[#EDE9DF] rounded-3xl p-6 md:p-10 border-2 border-[#CED6C1] shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Decorative Calming Background Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-96 h-96 rounded-full border border-[#8DA765]/20 animate-ping duration-[10000ms]" />
          <div className="w-[500px] h-[500px] rounded-full border border-[#8DA765]/10" />
        </div>

        {/* Status Phase Label */}
        <div className="text-center mb-6 z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D5D0C2] text-xs font-extrabold text-[#385117] uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#385117]" />
            {pattern.name}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#1F201C] font-serif pt-1">
            {isActive ? currentPhase.label : "Prête pour un moment de paix ?"}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-[#5A5852]">
            {isActive ? currentPhase.subtext : "Cliquez sur Démarrer et laissez l'orbe respiratoire guider votre souffle."}
          </p>
        </div>

        {/* The Central Visual Animated Breathing Orb */}
        <div className="relative flex items-center justify-center my-6 md:my-10 w-72 h-72 sm:w-80 sm:h-80">
          
          {/* Outer Glowing Ripple Wave */}
          <div 
            className="absolute rounded-full transition-all duration-1000 ease-in-out opacity-25"
            style={{
              width: `${260 * orbScale}px`,
              height: `${260 * orbScale}px`,
              background: `radial-gradient(circle, #506B26 0%, transparent 70%)`
            }}
          />

          {/* Outer Ring with Pulse */}
          <div 
            className="absolute rounded-full border-2 border-dashed border-[#506B26]/40 transition-all duration-1000 ease-in-out"
            style={{
              width: `${220 * orbScale}px`,
              height: `${220 * orbScale}px`
            }}
          />

          {/* Core Fluid Breathing Orb */}
          <div 
            className="rounded-full shadow-2xl flex flex-col items-center justify-center text-white transition-all duration-1000 ease-in-out select-none"
            style={{
              width: `${170 * orbScale}px`,
              height: `${170 * orbScale}px`,
              background: `radial-gradient(circle at 35% 35%, #7CA050 0%, #385117 60%, #20310C 100%)`,
              boxShadow: `0 10px 40px -10px rgba(56, 81, 23, 0.45)`
            }}
          >
            {isActive ? (
              <div className="text-center animate-in fade-in duration-300">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight drop-shadow-sm">
                  {secondsRemaining}
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-wider opacity-90 mt-0.5">
                  secondes
                </span>
              </div>
            ) : (
              <div className="text-center p-3">
                <Wind className="w-10 h-10 mx-auto text-white/90 mb-1" />
                <span className="text-xs font-bold uppercase tracking-wider">Respirer</span>
              </div>
            )}
          </div>
        </div>

        {/* Phase Progress Pills */}
        <div className="flex items-center gap-2 mb-8 z-10">
          {pattern.phases.map((ph, idx) => {
            const isCurrent = isActive && idx === phaseIndex;
            return (
              <div
                key={idx}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#385117] text-white shadow-xs scale-105'
                    : 'bg-white/80 text-[#5A5852] border border-[#D5D0C2]'
                }`}
              >
                <span>{ph.label.split(' ')[0]}</span>
                <span className="font-mono text-[10px] opacity-80">({ph.duration}s)</span>
              </div>
            );
          })}
        </div>

        {/* Main Controls */}
        <div className="flex items-center gap-4 z-10">
          <button
            onClick={handleToggleActive}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              isActive
                ? 'bg-[#C25450] hover:bg-[#A83D39] text-white'
                : 'bg-[#385117] hover:bg-[#283B10] text-white'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" />
                Mettre en pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                Commencer l'exercice
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3.5 rounded-2xl bg-white hover:bg-[#F5F2ED] text-[#403E3A] border-2 border-[#D5D0C2] font-bold text-sm shadow-xs transition-all hover:scale-105 active:scale-95"
            title="Réinitialiser les cycles"
          >
            <RotateCcw className="w-5 h-5 text-[#5A5852]" />
          </button>
        </div>

        {/* Micro-Stats Counter */}
        <div className="mt-8 flex items-center gap-6 text-xs text-[#5A5852] font-semibold bg-white/70 px-5 py-2.5 rounded-2xl border border-[#D5D0C2]">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#385117]" />
            <span>Cycles accomplis : <strong className="text-[#1F201C] font-mono text-sm">{completedCycles}</strong></span>
          </div>
          <div className="w-px h-4 bg-[#D5D0C2]" />
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#385117]" />
            <span>Gain : <strong className="text-[#385117]">+15 pts</strong> tous les 2 cycles</span>
          </div>
        </div>
      </div>

      {/* Scientific Foundation & Somatic Guidance Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#CED6C1] shadow-xs space-y-4">
        <h4 className="text-base font-bold text-[#1F201C] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#385117]" />
          Fondation Scientifique & Neurosciences de la Respiration
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E5E2D9] space-y-1.5">
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#385117]">
              Action Thérapeutique du protocole
            </h5>
            <p className="text-xs text-[#403E3A] leading-relaxed">
              {pattern.scientificBenefit}
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E5E2D9] space-y-1.5">
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#385117]">
              Conseils Somatiques d'Ancrage
            </h5>
            <ul className="text-xs text-[#403E3A] space-y-1 list-disc list-inside leading-relaxed">
              <li>Posez une main sur votre poitrine et une main sur votre bas-ventre.</li>
              <li>Desserrez les dents et relâchez la langue contre le palais.</li>
              <li>Gardez les yeux doucement posés sur l'orbe ou fermez-les si vous préférez.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
