import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Award, 
  Heart, 
  ArrowRight, 
  Lock, 
  Unlock, 
  MessageSquareHeart,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  getHealingQuestionForLevel, 
  getCycleForLevel, 
  RESILIENCE_CYCLES, 
  calculatePointsForLevel,
  calculateLevelFromPoints,
  POINTS_PER_LEVEL
} from '../data/resilience100Levels';
import { CompanionMemoryService } from '../utils/companionMemory';
import { CompanionMemoryProfile } from '../types';

interface HealingLevelQuestionCardProps {
  currentValidatedLevel: number;
  resiliencePoints: number;
  onLevelValidated?: (newProfile: CompanionMemoryProfile) => void;
  className?: string;
}

export const HealingLevelQuestionCard: React.FC<HealingLevelQuestionCardProps> = ({
  currentValidatedLevel,
  resiliencePoints,
  onLevelValidated,
  className = ''
}) => {
  const pointsLevel = calculateLevelFromPoints(resiliencePoints);
  const isValidationPending = pointsLevel > currentValidatedLevel;
  const nextTargetLevel = currentValidatedLevel + 1;
  
  // The level of question to show: if validation is pending, show next level; otherwise show current level or allow browsing
  const [selectedLevel, setSelectedLevel] = useState<number>(
    isValidationPending ? nextTargetLevel : Math.max(1, currentValidatedLevel)
  );

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customReflection, setCustomReflection] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const questionData = getHealingQuestionForLevel(selectedLevel);
  const cycleId = getCycleForLevel(selectedLevel);
  const cycle = RESILIENCE_CYCLES.find(c => c.id === cycleId) || RESILIENCE_CYCLES[0];

  const profile = CompanionMemoryService.getProfile();
  const alreadyAnswered = profile.validatedQuestions && profile.validatedQuestions[selectedLevel];

  const pointsRequiredForThisLevel = calculatePointsForLevel(selectedLevel);
  const hasPointsForThisLevel = resiliencePoints >= pointsRequiredForThisLevel;

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setValidationError(null);
  };

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption && !customReflection.trim()) return;

    // Check if question has a specific correct answer
    if (questionData.correctOptionIndex !== undefined) {
      const selectedIndex = questionData.options.indexOf(selectedOption);
      if (selectedIndex !== -1 && selectedIndex !== questionData.correctOptionIndex) {
        setValidationError(
          questionData.explanation || 
          "Cette réponse entretient le piège de la comparaison et du jugement. Pour valider ce niveau, choisissez la réponse C d'auto-compassion et de respect de votre rythme !"
        );
        return;
      }
    }

    setValidationError(null);
    setIsSubmitting(true);
    const reflectionText = customReflection.trim() || selectedOption;
    
    setTimeout(() => {
      const updatedProfile = CompanionMemoryService.validateLevelQuestion(
        selectedLevel, 
        reflectionText, 
        selectedOption
      );

      if (onLevelValidated) {
        onLevelValidated(updatedProfile);
      }

      if (selectedLevel === 111) {
        setCelebrationMessage(`👑 FÉLICITATIONS SUBLIMES ! Vous venez de franchir l'Ultime Arcane 111 et de débloquer le Trophée Légendaire « ÉVEILLÉ » ! 🌟✨`);
      } else {
        setCelebrationMessage(`🎉 Niveau ${selectedLevel} validé avec succès ! +25 points de résilience ajoutés.`);
      }
      setIsSubmitting(false);
      
      setTimeout(() => {
        setCelebrationMessage(null);
        if (selectedLevel < pointsLevel && selectedLevel < 111) {
          setSelectedLevel(selectedLevel + 1);
          setSelectedOption('');
          setCustomReflection('');
        }
      }, 4000);
    }, 600);
  };

  return (
    <div id="healing-level-question-gate" className={`rounded-3xl border-2 overflow-hidden shadow-sm transition-all ${
      isValidationPending 
        ? 'border-[#15803D] bg-white' 
        : 'border-[#CBD5E1] bg-white'
    } ${className}`}>
      
      {/* Top Banner Alert when Validation is Pending */}
      {isValidationPending && (
        <div className="bg-[#15803D] text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#86EFAC]"></span>
            </span>
            <div className="text-xs sm:text-sm font-black tracking-wide">
              🌟 Étape de Guérison Débloquée : Vos points vous permettent de passer au <span className="underline decoration-wavy">Niveau {pointsLevel}</span> !
            </div>
          </div>
          <div className="text-xs bg-white/20 text-white font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Question requise pour valider
          </div>
        </div>
      )}

      {/* Main Question Card Body */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Header & Level Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#E2E8F0]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-black px-3 py-1 rounded-full border-2 ${cycle.badgeBg} ${cycle.badgeBorder} ${cycle.badgeText}`}>
                {cycle.tag} • Cycle {cycleId}
              </span>
              <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1 bg-[#F8FAFC] px-2.5 py-1 rounded-full border-2 border-[#CBD5E1]">
                <HelpCircle className="w-3.5 h-3.5 text-[#15803D]" />
                Question de Guérison du Niveau {selectedLevel}
              </span>
              {alreadyAnswered ? (
                <span className="text-xs font-black text-[#14532D] bg-[#DCFCE7] px-2.5 py-1 rounded-full border-2 border-[#86EFAC] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                  Palier validé
                </span>
              ) : selectedLevel > currentValidatedLevel ? (
                <span className="text-xs font-black text-[#78350F] bg-[#FEF3C7] px-2.5 py-1 rounded-full border-2 border-[#FCD34D] flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                  En attente de réponse
                </span>
              ) : null}
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-black text-[#0F172A] pt-1">
              {questionData.title}
            </h3>
            <p className="text-xs font-bold text-[#334155]">
              Thématique : <span className="text-[#15803D] font-black">{questionData.theme}</span>
            </p>
          </div>

          {/* Level Switcher Micro-Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#F8FAFC] p-1 rounded-2xl border-2 border-[#CBD5E1]">
            <button
              onClick={() => setSelectedLevel(Math.max(1, selectedLevel - 1))}
              disabled={selectedLevel <= 1}
              className="px-2.5 py-1 rounded-xl text-xs font-black text-[#0F172A] hover:bg-white disabled:opacity-30 transition-all"
              title="Niveau précédent"
            >
              ←
            </button>
            <span className="text-xs font-mono font-black px-2 text-[#0F172A]">
              Niveau {selectedLevel} / 111
            </span>
            <button
              onClick={() => setSelectedLevel(Math.min(111, selectedLevel + 1))}
              disabled={selectedLevel >= Math.min(111, Math.max(pointsLevel, currentValidatedLevel + 1))}
              className="px-2.5 py-1 rounded-xl text-xs font-black text-[#0F172A] hover:bg-white disabled:opacity-30 transition-all"
              title="Niveau suivant"
            >
              →
            </button>
          </div>
        </div>

        {/* Celebration Toast */}
        {celebrationMessage && (
          <div className="bg-[#DCFCE7] border-2 border-[#15803D] p-4 rounded-2xl flex items-center gap-3 shadow-md animate-in fade-in zoom-in duration-300">
            <div className="w-10 h-10 rounded-full bg-[#15803D] text-white flex items-center justify-center font-bold shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#14532D]">{celebrationMessage}</h4>
              <p className="text-xs text-[#15803D] font-bold">Votre niveau officiel a été augmenté avec bienveillance.</p>
            </div>
          </div>
        )}

        {/* The Question Box */}
        <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-[#CBD5E1] shadow-2xs space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#14532D] flex items-center justify-center font-bold shrink-0 border border-[#86EFAC]">
              <MessageSquareHeart className="w-4 h-4 text-[#15803D]" />
            </div>
            <div>
              <h4 className="text-base md:text-lg font-black text-[#0F172A] leading-snug">
                {questionData.question}
              </h4>
              <p className="text-xs text-[#334155] font-semibold mt-1 italic">
                Règle éthique HAVEN-ELLE : Chaque niveau requiert votre réflexion sincère pour garantir que votre guérison avance à votre propre rythme.
              </p>
            </div>
          </div>

          {/* Options Selection */}
          <div className="space-y-2.5 pt-2">
            {questionData.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx); // 'A', 'B', 'C'
              const isChecked = selectedOption === option || (alreadyAnswered && alreadyAnswered.answer === option);
              const isCorrectOption = questionData.correctOptionIndex !== undefined && idx === questionData.correctOptionIndex;
              const isWrongOption = questionData.correctOptionIndex !== undefined && idx !== questionData.correctOptionIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                    isChecked
                      ? 'border-[#15803D] bg-[#DCFCE7] text-[#14532D] shadow-xs font-bold'
                      : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#64748B]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 text-xs font-black transition-all ${
                    isChecked 
                      ? 'border-[#15803D] bg-[#15803D] text-white shadow-2xs' 
                      : 'border-[#CBD5E1] bg-[#F1F5F9] text-[#0F172A]'
                  }`}>
                    {letter}
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-xs sm:text-sm font-bold leading-relaxed block">{option}</span>
                    {isChecked && isWrongOption && (
                      <span className="text-xs font-bold text-[#78350F] block flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#D97706]" />
                        🌱 Apprentissage sain : Piège cognitif ou fausse croyance (L'erreur est un tuteur de résilience vers la vérité)
                      </span>
                    )}
                    {isChecked && isCorrectOption && (
                      <span className="text-xs font-black text-[#14532D] block flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#15803D]" />
                        ✨ Réponse constructive et souveraine : Ancrage toltèque de vérité et de paix
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Validation Error / Gentle Guidance Alert */}
          {validationError && (
            <div className="bg-[#FEF3C7] border-2 border-[#D97706] p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-[#78350F] animate-in fade-in duration-200 shadow-2xs">
              <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-black text-[#78350F]">Conseil d'Alignement Éthique HAVEN-ELLE</div>
                <p className="leading-relaxed font-bold">{validationError}</p>
              </div>
            </div>
          )}

          {/* Custom Reflection Text Area */}
          <div className="pt-2">
            <label className="block text-xs font-black text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
              {questionData.reflectionPrompt}
            </label>
            <textarea
              rows={2}
              value={customReflection}
              onChange={(e) => setCustomReflection(e.target.value)}
              placeholder={alreadyAnswered?.reflection ? `Votre réflexion enregistrée : "${alreadyAnswered.reflection}"` : "Exprimez librement vos ressentis ou vos intentions bienveillantes..."}
              className="w-full p-3 bg-white border-2 border-[#CBD5E1] rounded-xl text-xs sm:text-sm font-semibold text-[#0F172A] focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D] focus:outline-none transition-all placeholder:text-[#64748B]"
            />
          </div>

          {/* Benevolent Affirmation Box */}
          <div className="bg-[#F8FAFC] border-2 border-[#CBD5E1] p-3.5 rounded-xl flex items-center gap-3 shadow-2xs">
            <Heart className="w-4 h-4 text-[#15803D] shrink-0" />
            <p className="text-xs font-serif italic text-[#14532D] font-bold leading-relaxed">
              {questionData.benevolentAffirmation}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t-2 border-[#E2E8F0]">
            <div className="text-xs font-black text-[#0F172A] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#15803D]" />
              Récompense : <span className="text-[#14532D] font-black">{questionData.unlockedRewardBadge} (+25 pts)</span>
            </div>

            {alreadyAnswered ? (
              <div className="text-xs font-black text-[#14532D] bg-[#DCFCE7] border-2 border-[#86EFAC] px-4 py-2 rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> Palier Validé le {alreadyAnswered.date}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleValidate}
                disabled={isSubmitting || (!selectedOption && !customReflection.trim())}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#14532D] disabled:bg-[#94A3B8] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>Validation en cours...</>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    Valider mon passage au Niveau {selectedLevel}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
