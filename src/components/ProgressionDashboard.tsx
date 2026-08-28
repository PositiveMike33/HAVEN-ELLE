import React, { useState } from 'react';
import { 
  Trophy, 
  Heart, 
  Sparkles, 
  Flame, 
  Feather, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  ChevronRight, 
  Zap, 
  Award, 
  BookOpen, 
  ArrowUpRight,
  Info,
  ShieldCheck,
  Star,
  Wind,
  Compass,
  ListOrdered,
  RotateCcw
} from 'lucide-react';
import { 
  RESILIENCE_CYCLES, 
  calculateLevelFromPoints, 
  calculatePointsForLevel, 
  getCycleForLevel, 
  POINTS_PER_LEVEL,
  QUICK_DAILY_ACTIONS,
  ResilienceCycle
} from '../data/resilience100Levels';
import { CompanionMemoryService } from '../utils/companionMemory';
import { ValuesAndBenevolenceBuilder } from './ValuesAndBenevolenceBuilder';
import { HealingLevelQuestionCard } from './HealingLevelQuestionCard';
import { HealingRoadmap100Questions } from './HealingRoadmap100Questions';
import { ToltecFlashcardQuestionnaire } from './ToltecFlashcardQuestionnaire';
import { CompanionMemoryProfile } from '../types';

interface ProgressionDashboardProps {
  resiliencePoints: number;
  onPointsEarned?: (newTotal: number) => void;
}

export const ProgressionDashboard: React.FC<ProgressionDashboardProps> = ({ 
  resiliencePoints,
  onPointsEarned 
}) => {
  const profile = CompanionMemoryService.getProfile();
  const pointsLevel = calculateLevelFromPoints(resiliencePoints);
  const validatedLevel = typeof profile.validatedLevel === 'number' ? profile.validatedLevel : 0;
  
  // The effective official level strictly cannot exceed validatedLevel!
  const currentLevel = Math.max(1, Math.min(validatedLevel, pointsLevel));
  const isValidationPending = pointsLevel > validatedLevel;
  
  const currentCycleId = getCycleForLevel(currentLevel);
  const [selectedCycleId, setSelectedCycleId] = useState<1 | 2 | 3 | 4 | 5>(currentCycleId);
  const [rewardToast, setRewardToast] = useState<{ message: string; points: number } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Dashboard Sub-View: 'toltec_cards' | 'overview' | 'roadmap100' | 'values'
  const [activeDashboardView, setActiveDashboardView] = useState<'toltec_cards' | 'overview' | 'roadmap100' | 'values'>('toltec_cards');

  const selectedCycle = RESILIENCE_CYCLES.find(c => c.id === selectedCycleId) || RESILIENCE_CYCLES[0];
  const activeCycle = RESILIENCE_CYCLES.find(c => c.id === currentCycleId) || RESILIENCE_CYCLES[0];

  // Current level progress within its 15 pts interval
  const pointsAtStartOfCurrentLevel = calculatePointsForLevel(currentLevel);
  const pointsForNextLevel = calculatePointsForLevel(currentLevel + 1);
  const pointsInCurrentLevel = Math.max(0, resiliencePoints - pointsAtStartOfCurrentLevel);
  const percentToNextLevel = currentLevel >= 111 
    ? 100 
    : Math.min(100, Math.round((pointsInCurrentLevel / POINTS_PER_LEVEL) * 100));

  // Global Progress to 111 levels
  const globalProgress = Math.min(100, Math.round((resiliencePoints / 1665) * 100));

  const handleResetToLevelOne = () => {
    CompanionMemoryService.resetToLevelOne();
    if (onPointsEarned) {
      onPointsEarned(0);
    }
    setShowResetConfirm(false);
    setRewardToast({
      message: 'Réinitialisation au Niveau 1 effectuée avec succès pour vos tests !',
      points: 0,
    });
  };

  const handleExecuteQuickAction = (action: typeof QUICK_DAILY_ACTIONS[0]) => {
    const updated = CompanionMemoryService.addResiliencePoints(action.points, action.title);
    if (onPointsEarned) {
      onPointsEarned(updated.resiliencePoints);
    }
    setRewardToast({
      message: `${action.title} accomplie avec bienveillance !`,
      points: action.points,
    });
    setTimeout(() => {
      setRewardToast(null);
    }, 4000);
  };

  const handleLevelValidated = (updatedProfile: CompanionMemoryProfile) => {
    if (onPointsEarned) {
      onPointsEarned(updatedProfile.resiliencePoints);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-[#CED6C1] space-y-8">
      {/* Toast Notification for Quick Points */}
      {rewardToast && (
        <div className="bg-[#E5EED6] border-2 border-[#506B26] p-4 rounded-2xl flex items-center justify-between shadow-md animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#385117] text-white flex items-center justify-center font-bold">
              +{rewardToast.points}
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#18210E]">{rewardToast.message}</h4>
              <p className="text-xs text-[#385117] font-medium">Points de résilience ajoutés immédiatement.</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-[#385117] text-white rounded-full">
            Niveau {calculateLevelFromPoints(resiliencePoints)} / 111
          </span>
        </div>
      )}

      {/* Header: Title & Global Score */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DCFCE7] text-[#14532D] text-xs font-black uppercase tracking-wider mb-2 border-2 border-[#86EFAC]">
            <Sparkles className="w-4 h-4 text-[#15803D]" />
            Parcours Initiatique en 111 Vérités
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0F172A] flex items-center gap-2.5">
            <Trophy className="w-7 h-7 text-[#15803D]" />
            Les 111 Vérités & Paliers d'Évolution
          </h2>
          <p className="text-[#334155] font-semibold mt-1 text-sm max-w-2xl leading-relaxed">
            Un cheminement progressif en 4 grands cycles de 25 vérités couronnés par le Cycle Secret du Kybalion (Vérités 101 à 111) et le Trophée Légendaire « ÉVEILLÉ ».
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-white px-5 py-3 rounded-2xl border-2 border-[#CBD5E1] text-right shadow-xs">
            <div className="text-3xl font-black text-[#15803D] font-mono leading-none">
              {resiliencePoints}
              <span className="text-sm text-white font-sans font-bold">/1665</span>
            </div>
            <div className="text-[11px] uppercase font-black tracking-wider text-[#0F172A] mt-1">
              Points de Résilience
            </div>
          </div>

          {/* Reset to Level 1 button for Testing & Validation */}
          <div className="relative">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-3 bg-white hover:bg-[#F8FAFC] text-[#0F172A] rounded-2xl border-2 border-[#CBD5E1] transition-colors flex items-center gap-1.5 text-xs font-bold shadow-xs"
              title="Réinitialiser au Niveau 1 (Remise à zéro pour tester le parcours et remplir les 111 questions)"
            >
              <RotateCcw className="w-4 h-4 text-[#15803D]" />
              <span className="hidden sm:inline">Niveau 1</span>
            </button>

            {showResetConfirm && (
              <div className="absolute right-0 top-full mt-2 w-72 p-4 bg-white rounded-2xl shadow-xl border-2 border-[#CBD5E1] z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-start gap-2">
                  <RotateCcw className="w-5 h-5 text-[#854D0E] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-black text-[#0F172A]">Remise à zéro (Niveau 1) ?</h5>
                    <p className="text-xs text-[#334155] mt-1 leading-snug">
                      Voulez-vous remettre votre profil à <strong>0 point et Niveau 1</strong> pour remplir manuellement toutes les 111 questions de guérison ?
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t-2 border-[#E2E8F0]">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 text-xs font-bold text-[#475569] hover:bg-[#F1F5F9] rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleResetToLevelOne}
                    className="px-3.5 py-1.5 text-xs font-black bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg shadow-xs"
                  >
                    Oui, recommencer à 1
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Switcher Tabs between Dashboard Views */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-[#F1F5F9] rounded-2xl border-2 border-[#CBD5E1]">
        <button
          onClick={() => setActiveDashboardView('toltec_cards')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 border-2 ${
            activeDashboardView === 'toltec_cards'
              ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm'
              : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F8FAFC]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Fiches des 5 Accords (Q&A Caché)</span>
        </button>

        <button
          onClick={() => setActiveDashboardView('overview')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 border-2 ${
            activeDashboardView === 'overview'
              ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm'
              : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F8FAFC]'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Vue Tableau de Bord
        </button>

        <button
          onClick={() => setActiveDashboardView('roadmap100')}
          className={`flex-1 min-w-[210px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 relative border-2 ${
            activeDashboardView === 'roadmap100'
              ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm'
              : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F8FAFC]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Grand Livre des 111 Vérités</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-black ${
            activeDashboardView === 'roadmap100' ? 'bg-white/25 text-white' : 'bg-[#DCFCE7] text-[#14532D]'
          }`}>
            {validatedLevel}/111
          </span>
        </button>

        <button
          onClick={() => setActiveDashboardView('values')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 border-2 ${
            activeDashboardView === 'values'
              ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm'
              : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F8FAFC]'
          }`}
        >
          <Compass className="w-4 h-4" />
          Mes 5 Valeurs & Audios
        </button>
      </div>

      {/* VIEW 0: TOLTEC FLASHCARD QUESTIONNAIRE */}
      {activeDashboardView === 'toltec_cards' && (
        <div className="space-y-6">
          <ToltecFlashcardQuestionnaire 
            onPointsEarned={onPointsEarned}
            onNavigateToRoadmap={() => setActiveDashboardView('roadmap100')}
          />
        </div>
      )}

      {/* VIEW 1: ROADMAP 100 QUESTIONS */}
      {activeDashboardView === 'roadmap100' && (
        <div className="space-y-6">
          <HealingRoadmap100Questions
            currentValidatedLevel={validatedLevel}
            resiliencePoints={resiliencePoints}
            onOpenQuestionModal={() => {
              setActiveDashboardView('overview');
            }}
          />
        </div>
      )}

      {/* VIEW 2: CORE VALUES BUILDER */}
      {activeDashboardView === 'values' && (
        <div className="space-y-6">
          <ValuesAndBenevolenceBuilder onPointsEarned={onPointsEarned} />
        </div>
      )}

      {/* VIEW 3: MAIN OVERVIEW DASHBOARD */}
      {activeDashboardView === 'overview' && (
        <>
          {/* Main Status Banner: Current Level & Micro Progress */}
          <div className="bg-[#F8FAFC] p-6 rounded-3xl border-2 border-[#CBD5E1] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-black text-[#0F172A]">
                    Niveau {currentLevel}
                  </span>
                  <span className="text-sm font-black text-[#475569]">sur 111</span>
                  <span className={`text-xs font-black px-3 py-1 rounded-full border-2 ${activeCycle.badgeBg} ${activeCycle.badgeBorder} ${activeCycle.badgeText}`}>
                    {activeCycle.title} : {activeCycle.tag}
                  </span>
                </div>
                <p className="text-sm font-bold text-[#15803D] mt-1 italic">
                  {activeCycle.subtitle}
                </p>
              </div>

              <div className="text-left sm:text-right">
                {currentLevel < 111 ? (
                  <div className="text-xs font-bold text-[#334155]">
                    Plus que <strong className="text-[#15803D] font-black">{POINTS_PER_LEVEL - pointsInCurrentLevel} pts</strong> pour atteindre le <span className="font-black text-[#0F172A]">Niveau {currentLevel + 1}</span>
                  </div>
                ) : (
                  <div className="text-sm font-black text-[#14532D] bg-[#DCFCE7] px-3.5 py-1 rounded-full border-2 border-[#86EFAC] flex items-center gap-1 shadow-xs">
                    <Star className="w-4 h-4 text-[#D97706] fill-[#D97706]" />
                    👑 Trophée Suprême [ÉVEILLÉ] Débloqué
                  </div>
                )}
              </div>
            </div>

            {/* Level Progress Bar (15 points cycle) */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs font-black text-[#0F172A]">
                <span>Progression du Niveau {currentLevel}</span>
                <span>{percentToNextLevel}% ({pointsInCurrentLevel}/{POINTS_PER_LEVEL} pts)</span>
              </div>
              <div className="h-4 w-full bg-[#E2E8F0] rounded-full overflow-hidden p-0.5 border-2 border-[#CBD5E1]">
                <div 
                  className="h-full bg-gradient-to-r from-[#15803D] to-[#22C55E] rounded-full transition-all duration-700 ease-out shadow-xs"
                  style={{ width: `${percentToNextLevel}%` }}
                />
              </div>
            </div>

            {/* Global Progress Bar (1665 points) */}
            <div className="pt-3 border-t-2 border-[#E2E8F0] flex items-center justify-between text-xs text-[#334155] font-bold">
              <span className="font-semibold">
                Progression Globale (111 Niveaux) : <strong className="text-[#0F172A] font-black">{globalProgress}%</strong>
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveDashboardView('roadmap100')}
                  className="text-xs font-black text-[#15803D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Consulter les 111 questions
                </button>
                <span className="font-mono font-black text-[#15803D]">
                  {resiliencePoints} / 1665 pts totaux
                </span>
              </div>
            </div>
          </div>

          {/* QUESTION DE GUÉRISON ET DE VALIDATION DU NIVEAU (STRICT REQUIREMENT) */}
          <HealingLevelQuestionCard 
            currentValidatedLevel={validatedLevel}
            resiliencePoints={resiliencePoints}
            onLevelValidated={handleLevelValidated}
          />

          {/* Quick Positive Actions: Easy points to encourage without stress */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-black text-[#0F172A] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#15803D]" />
                  Micro-Récompenses Rapides & Exercices Bienveillants
                </h3>
                <p className="text-xs text-[#334155] font-bold">
                  Gagnez des points rapidement pour franchir vos étapes en toute légèreté.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {QUICK_DAILY_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleExecuteQuickAction(action)}
                    className="group text-left p-4 rounded-2xl bg-white hover:bg-[#F0FDF4] border-2 border-[#CBD5E1] hover:border-[#15803D] transition-all flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] group-hover:bg-[#15803D] text-[#14532D] group-hover:text-white flex items-center justify-center border-2 border-[#86EFAC] group-hover:border-[#15803D] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-black bg-[#F8FAFC] text-[#15803D] border-2 border-[#CBD5E1] group-hover:bg-[#15803D] group-hover:text-white transition-colors">
                        +{action.points} pts
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#0F172A] group-hover:text-[#14532D]">
                        {action.title}
                      </h4>
                      <p className="text-xs text-[#334155] font-semibold mt-0.5">
                        {action.subtitle}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t-2 border-[#E2E8F0] group-hover:border-[#86EFAC] flex items-center justify-between text-[11px] font-black text-[#15803D]">
                      <span>Activer l'exercice</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Access Card to the 100 Questions Book */}
          <div className="p-6 rounded-3xl bg-[#F8FAFC] border-2 border-[#CBD5E1] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#15803D] text-white flex items-center justify-center shrink-0 shadow-xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-black text-[#0F172A]">
                  Le Grand Livre des 111 Questions & Réponses
                </h4>
                <p className="text-xs md:text-sm text-[#334155] font-semibold mt-0.5 max-w-2xl">
                  Parcourez la carte complète de vos 111 étapes dont les 11 Arcanes Secrets du Kybalion. Relisez vos réflexions et découvrez les paliers futurs.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveDashboardView('roadmap100')}
              className="px-5 py-3 rounded-xl bg-[#15803D] hover:bg-[#14532D] text-white text-xs md:text-sm font-black transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Ouvrir la liste des 111 questions</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* The 5 Resilience Cycles Tabs */}
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-serif font-black text-[#0F172A] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#15803D]" />
                Les 5 Cycles d'Ascension & Mystères du Kybalion (111 Niveaux)
              </h3>
              <p className="text-xs text-[#334155] font-bold">
                Explorez les 4 grands piliers de résilience et le Cycle Secret Bonus de Haute Maîtrise Hermétique.
              </p>
            </div>

            {/* Cycle Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              {RESILIENCE_CYCLES.map((cycle) => {
                const Icon = cycle.icon;
                const isCurrent = currentCycleId === cycle.id;
                const isSelected = selectedCycleId === cycle.id;
                const isCompleted = currentLevel > cycle.maxLevel;
                const isUnlocked = currentLevel >= cycle.minLevel;

                return (
                  <button
                    key={cycle.id}
                    onClick={() => setSelectedCycleId(cycle.id)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? `${cycle.badgeBg} ${cycle.badgeBorder} shadow-md ring-2 ring-[#15803D]/40 font-bold`
                        : isUnlocked
                          ? 'bg-white border-[#CBD5E1] hover:border-[#15803D] hover:bg-[#F8FAFC]'
                          : 'bg-[#F1F5F9] border-[#CBD5E1] opacity-75'
                    }`}
                  >
                    {isCompleted && (
                      <span className="absolute top-2 right-2 text-xs font-black text-[#15803D] flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border-2 border-[#86EFAC]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Validé
                      </span>
                    )}
                    {isCurrent && !isCompleted && (
                      <span className="absolute top-2 right-2 text-xs font-black text-[#15803D] flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border-2 border-[#15803D]">
                        <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" /> En cours
                      </span>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-[#15803D] text-white' : 'bg-[#DCFCE7] text-[#14532D]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-black text-[#0F172A]">
                          Niv. {cycle.minLevel}-{cycle.maxLevel}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-[#0F172A] line-clamp-1">
                        Cycle {cycle.id}
                      </h4>
                      <p className="text-xs font-bold text-[#15803D] mt-0.5 line-clamp-2">
                        {cycle.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t-2 border-[#E2E8F0] text-[11px] font-bold text-[#334155]">
                      {cycle.tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Cycle Focus Card */}
            <div className={`p-6 rounded-3xl border-2 ${selectedCycle.badgeBg} ${selectedCycle.badgeBorder} shadow-xs`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b-2 border-black/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#15803D] mb-1">
                    <span>Cycle {selectedCycle.id} • Niveaux {selectedCycle.minLevel} à {selectedCycle.maxLevel}</span>
                    <span>({selectedCycle.minPoints} à {selectedCycle.maxPoints} pts)</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-black text-[#0F172A]">
                    {selectedCycle.subtitle}
                  </h3>
                  <p className="text-sm text-[#334155] font-bold mt-1">
                    {selectedCycle.description}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border-2 border-[#CBD5E1] max-w-sm shrink-0 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#15803D] mb-1">
                    <Info className="w-4 h-4" />
                    <span>Base Scientifique & Thérapeutique</span>
                  </div>
                  <p className="text-xs text-[#0F172A] font-semibold leading-relaxed">
                    {selectedCycle.scientificFoundation}
                  </p>
                </div>
              </div>

              {/* Mantra of the Cycle */}
              <div className="bg-white p-4 rounded-2xl border-2 border-[#CBD5E1] mb-6 text-center shadow-2xs">
                <span className="text-xs font-black text-[#15803D] uppercase tracking-wider block mb-1">
                  Mantra Thérapeutique du Cycle
                </span>
                <blockquote className="text-sm md:text-base font-serif italic text-[#0F172A] font-black">
                  {selectedCycle.coreMantra}
                </blockquote>
              </div>

              {/* Milestones in this Cycle */}
              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-[#0F172A] mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#15803D]" />
                  Paliers Clés & Récompenses Déblocables (Cycle {selectedCycle.id})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCycle.milestones.map((milestone) => {
                    const isReached = resiliencePoints >= milestone.points;
                    const isNextInLine = !isReached && currentLevel >= (milestone.level - 4);

                    return (
                      <div
                        key={milestone.level}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                          isReached
                            ? 'bg-white border-[#15803D] shadow-xs'
                            : isNextInLine
                              ? 'bg-white border-[#15803D] ring-2 ring-[#15803D]/30'
                              : 'bg-white/80 border-[#CBD5E1]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                                isReached
                                  ? 'bg-[#15803D] text-white'
                                  : isNextInLine
                                    ? 'bg-[#DCFCE7] text-[#14532D] border-2 border-[#86EFAC]'
                                    : 'bg-[#F1F5F9] text-[#475569]'
                              }`}>
                                {milestone.level}
                              </span>
                              <span className="text-xs font-mono font-black text-[#0F172A]">
                                {milestone.points} pts
                              </span>
                            </div>

                            <div>
                              {isReached ? (
                                <span className="inline-flex items-center gap-1 text-xs font-black text-[#14532D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full border-2 border-[#86EFAC]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Acquis
                                </span>
                              ) : isNextInLine ? (
                                <span className="inline-flex items-center gap-1 text-xs font-black text-[#14532D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full border-2 border-[#15803D]">
                                  <Unlock className="w-3.5 h-3.5" /> En approche
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#475569] bg-[#F1F5F9] px-2.5 py-0.5 rounded-full border border-[#CBD5E1]">
                                  <Lock className="w-3.5 h-3.5" /> À débloquer
                                </span>
                              )}
                            </div>
                          </div>

                          <h5 className="text-sm font-black text-[#0F172A]">
                            {milestone.title}
                          </h5>
                          <p className="text-xs text-[#334155] mt-0.5 font-bold">
                            {milestone.description}
                          </p>

                          <div className="mt-3 p-2.5 rounded-xl bg-[#F8FAFC] border-2 border-[#CBD5E1] text-xs space-y-1">
                            <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                              <span className="text-[#15803D] font-black">🌱 Exercice :</span> {milestone.exercise}
                            </div>
                            <div className="text-[#334155] text-[11px] font-semibold">
                              <strong>Effet :</strong> {milestone.benefit}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t-2 border-[#E2E8F0] flex items-center justify-between text-xs font-black text-[#15803D]">
                          <span className="truncate">🎁 {milestone.unlockedReward}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
