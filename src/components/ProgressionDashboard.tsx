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
  ListOrdered
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
  const validatedLevel = profile.validatedLevel ?? 10;
  
  // The effective official level strictly cannot exceed validatedLevel!
  const currentLevel = Math.min(validatedLevel, pointsLevel);
  const isValidationPending = pointsLevel > validatedLevel;
  
  const currentCycleId = getCycleForLevel(currentLevel);
  const [selectedCycleId, setSelectedCycleId] = useState<1 | 2 | 3 | 4>(currentCycleId);
  const [rewardToast, setRewardToast] = useState<{ message: string; points: number } | null>(null);
  
  // Dashboard Sub-View: 'overview' | 'roadmap100' | 'values'
  const [activeDashboardView, setActiveDashboardView] = useState<'overview' | 'roadmap100' | 'values'>('overview');

  const selectedCycle = RESILIENCE_CYCLES.find(c => c.id === selectedCycleId) || RESILIENCE_CYCLES[0];
  const activeCycle = RESILIENCE_CYCLES.find(c => c.id === currentCycleId) || RESILIENCE_CYCLES[0];

  // Current level progress within its 15 pts interval
  const pointsAtStartOfCurrentLevel = calculatePointsForLevel(currentLevel);
  const pointsForNextLevel = calculatePointsForLevel(currentLevel + 1);
  const pointsInCurrentLevel = Math.max(0, resiliencePoints - pointsAtStartOfCurrentLevel);
  const percentToNextLevel = currentLevel >= 100 
    ? 100 
    : Math.min(100, Math.round((pointsInCurrentLevel / POINTS_PER_LEVEL) * 100));

  // Global Progress to 100 levels
  const globalProgress = Math.min(100, Math.round((resiliencePoints / 1500) * 100));

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
            Niveau {calculateLevelFromPoints(resiliencePoints)} / 100
          </span>
        </div>
      )}

      {/* Header: Title & Global Score */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EED6] text-[#2E4313] text-xs font-bold uppercase tracking-wider mb-2 border border-[#8DA765]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#385117]" />
            Évolution Échelonnée en 100 Niveaux
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1F201C] flex items-center gap-2">
            <Trophy className="w-7 h-7 text-[#385117]" />
            Votre Sanctuaire de Résilience
          </h2>
          <p className="text-[#403E3A] font-medium mt-1 text-sm max-w-2xl">
            Un cheminement progressif en 4 grands cycles de 25 niveaux. Chaque micro-action vous apporte une récompense immédiate pour avancer sereinement et sans découragement.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-[#F4F2EB] px-5 py-3 rounded-2xl border-2 border-[#D5D0C2] text-right shadow-xs">
            <div className="text-3xl font-extrabold text-[#385117] font-mono leading-none">
              {resiliencePoints}
              <span className="text-sm text-[#6A6860] font-sans font-medium">/1500</span>
            </div>
            <div className="text-[11px] uppercase font-extrabold tracking-wider text-[#403E3A] mt-1">
              Points de Résilience
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Switcher Tabs between Dashboard Views */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F4F2EB] rounded-2xl border-2 border-[#D5D0C2]">
        <button
          onClick={() => setActiveDashboardView('overview')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeDashboardView === 'overview'
              ? 'bg-white text-[#1F201C] shadow-xs border border-[#CED6C1]'
              : 'text-[#5C5952] hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#385117]" />
          Vue Tableau de Bord
        </button>

        <button
          onClick={() => setActiveDashboardView('roadmap100')}
          className={`flex-1 min-w-[210px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 relative ${
            activeDashboardView === 'roadmap100'
              ? 'bg-[#385117] text-white shadow-xs'
              : 'text-[#5C5952] hover:bg-white/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Grand Livre des 100 Questions</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
            activeDashboardView === 'roadmap100' ? 'bg-white/20 text-white' : 'bg-[#E5EED6] text-[#385117]'
          }`}>
            {validatedLevel}/100
          </span>
        </button>

        <button
          onClick={() => setActiveDashboardView('values')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeDashboardView === 'values'
              ? 'bg-white text-[#1F201C] shadow-xs border border-[#CED6C1]'
              : 'text-[#5C5952] hover:bg-white/50'
          }`}
        >
          <Compass className="w-4 h-4 text-[#385117]" />
          Mes 5 Valeurs Fondatrices
        </button>
      </div>

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
          <div className="bg-gradient-to-br from-[#F8F7F4] to-[#ECE9DF] p-6 rounded-3xl border-2 border-[#D0CABE] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-[#1F201C]">
                    Niveau {currentLevel}
                  </span>
                  <span className="text-sm font-bold text-[#6A6860]">sur 100</span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${activeCycle.badgeBg} ${activeCycle.badgeBorder} ${activeCycle.badgeText}`}>
                    {activeCycle.title} : {activeCycle.tag}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#385117] mt-1 italic">
                  {activeCycle.subtitle}
                </p>
              </div>

              <div className="text-left sm:text-right">
                {currentLevel < 100 ? (
                  <div className="text-xs font-bold text-[#403E3A]">
                    Plus que <strong className="text-[#385117] font-extrabold">{POINTS_PER_LEVEL - pointsInCurrentLevel} pts</strong> pour atteindre le <span className="font-extrabold text-[#1F201C]">Niveau {currentLevel + 1}</span>
                  </div>
                ) : (
                  <div className="text-sm font-extrabold text-[#385117] flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    Guérison & Niveau Suprême Atteints
                  </div>
                )}
              </div>
            </div>

            {/* Level Progress Bar (15 points cycle) */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs font-bold text-[#4A4742]">
                <span>Progression du Niveau {currentLevel}</span>
                <span>{percentToNextLevel}% ({pointsInCurrentLevel}/{POINTS_PER_LEVEL} pts)</span>
              </div>
              <div className="h-4 w-full bg-[#DDD8CC] rounded-full overflow-hidden p-0.5 border border-[#C5BFB0]">
                <div 
                  className="h-full bg-gradient-to-r from-[#4F6927] to-[#718E38] rounded-full transition-all duration-700 ease-out shadow-xs"
                  style={{ width: `${percentToNextLevel}%` }}
                />
              </div>
            </div>

            {/* Global Progress Bar (1500 points) */}
            <div className="pt-2 border-t border-[#D5D0C2] flex items-center justify-between text-xs text-[#5C5952]">
              <span className="font-medium">
                Progression Globale (100 Niveaux) : <strong className="text-[#1F201C] font-bold">{globalProgress}%</strong>
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveDashboardView('roadmap100')}
                  className="text-xs font-bold text-[#385117] hover:underline flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Consulter les 100 questions
                </button>
                <span className="font-mono font-bold text-[#385117]">
                  {resiliencePoints} / 1500 pts totaux
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
                <h3 className="text-base font-bold text-[#1F201C] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#385117]" />
                  Micro-Récompenses Rapides & Exercices Bienveillants
                </h3>
                <p className="text-xs text-[#5C5952]">
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
                    className="group text-left p-4 rounded-2xl bg-[#F8F7F4] hover:bg-[#E5EED6] border-2 border-[#D5D0C2] hover:border-[#506B26] transition-all flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-white group-hover:bg-[#385117] text-[#385117] group-hover:text-white flex items-center justify-center border border-[#D5D0C2] group-hover:border-[#385117] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-extrabold bg-white text-[#385117] border border-[#CED6C1] group-hover:bg-[#385117] group-hover:text-white transition-colors">
                        +{action.points} pts
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1F201C] group-hover:text-[#18210E]">
                        {action.title}
                      </h4>
                      <p className="text-xs text-[#5C5952] mt-0.5 group-hover:text-[#323928]">
                        {action.subtitle}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#E5E2D9] group-hover:border-[#8DA765]/40 flex items-center justify-between text-[11px] font-bold text-[#385117]">
                      <span>Activer l'exercice</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Access Card to the 100 Questions Book */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FAF8F2] to-[#F1EDE2] border-2 border-[#D5D0C2] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#385117] text-white flex items-center justify-center shrink-0 shadow-xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-[#1F201C]">
                  Le Grand Livre des 100 Questions & Réponses
                </h4>
                <p className="text-xs md:text-sm text-[#5C5952] mt-0.5 max-w-2xl">
                  Parcourez la carte complète de vos 100 étapes. Relisez vos anciennes réflexions et découvrez les paliers futurs protégés par le voile de la curiosité.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveDashboardView('roadmap100')}
              className="px-5 py-3 rounded-xl bg-[#385117] hover:bg-[#2D450C] text-white text-xs md:text-sm font-bold transition-all shadow-xs flex items-center gap-2 shrink-0"
            >
              <span>Ouvrir la liste des 100 questions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* The 4 Major Resilience Cycles Tabs (25 levels each) */}
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-serif font-bold text-[#1F201C] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#385117]" />
                Les 4 Grands Cycles d'Ascension (100 Niveaux)
              </h3>
              <p className="text-xs text-[#5C5952]">
                Explorez les 4 piliers de votre transformation et découvrez les paliers et récompenses de chaque étape.
              </p>
            </div>

            {/* Cycle Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
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
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between relative overflow-hidden ${
                      isSelected
                        ? `${cycle.badgeBg} ${cycle.badgeBorder} shadow-md ring-2 ring-[#385117]/20`
                        : isUnlocked
                          ? 'bg-white border-[#D0CABE] hover:border-[#8DA765] hover:bg-[#FAF9F6]'
                          : 'bg-[#F4F2EB] border-[#DDD8CC] opacity-80'
                    }`}
                  >
                    {isCompleted && (
                      <span className="absolute top-2 right-2 text-xs font-bold text-[#385117] flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full border border-[#506B26]/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#385117]" /> Validé
                      </span>
                    )}
                    {isCurrent && !isCompleted && (
                      <span className="absolute top-2 right-2 text-xs font-bold text-[#385117] flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-full border border-[#385117]">
                        <span className="w-2 h-2 rounded-full bg-[#385117] animate-pulse" /> En cours
                      </span>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-[#385117] text-white' : 'bg-[#E5EED6] text-[#385117]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-extrabold text-[#4A4742]">
                          Niv. {cycle.minLevel}-{cycle.maxLevel}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1F201C] line-clamp-1">
                        Cycle {cycle.id}
                      </h4>
                      <p className="text-xs font-semibold text-[#385117] mt-0.5 line-clamp-2">
                        {cycle.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#DDD8CC] text-[11px] font-medium text-[#5C5952]">
                      {cycle.tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Cycle Focus Card */}
            <div className={`p-6 rounded-3xl border-2 ${selectedCycle.badgeBg} ${selectedCycle.badgeBorder} shadow-xs`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#385117] mb-1">
                    <span>Cycle {selectedCycle.id} • Niveaux {selectedCycle.minLevel} à {selectedCycle.maxLevel}</span>
                    <span>({selectedCycle.minPoints} à {selectedCycle.maxPoints} pts)</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#18210E]">
                    {selectedCycle.subtitle}
                  </h3>
                  <p className="text-sm text-[#323928] font-medium mt-1">
                    {selectedCycle.description}
                  </p>
                </div>

                <div className="bg-white/90 p-4 rounded-2xl border border-black/10 max-w-sm shrink-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#385117] mb-1">
                    <Info className="w-4 h-4" />
                    <span>Base Scientifique & Thérapeutique</span>
                  </div>
                  <p className="text-xs text-[#403E3A] leading-relaxed">
                    {selectedCycle.scientificFoundation}
                  </p>
                </div>
              </div>

              {/* Mantra of the Cycle */}
              <div className="bg-white/80 p-4 rounded-2xl border border-black/10 mb-6 text-center">
                <span className="text-xs font-extrabold text-[#385117] uppercase tracking-wider block mb-1">
                  Mantra Thérapeutique du Cycle
                </span>
                <blockquote className="text-sm md:text-base font-serif italic text-[#1F201C] font-semibold">
                  {selectedCycle.coreMantra}
                </blockquote>
              </div>

              {/* Milestones in this Cycle */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#18210E] mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#385117]" />
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
                            ? 'bg-white border-[#506B26] shadow-xs'
                            : isNextInLine
                              ? 'bg-white/95 border-[#385117] ring-1 ring-[#385117]'
                              : 'bg-white/50 border-[#D0CABE]/60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                isReached
                                  ? 'bg-[#385117] text-white'
                                  : isNextInLine
                                    ? 'bg-[#E5EED6] text-[#385117] border border-[#385117]'
                                    : 'bg-[#ECE9DF] text-[#6A6860]'
                              }`}>
                                {milestone.level}
                              </span>
                              <span className="text-xs font-mono font-bold text-[#5C5952]">
                                {milestone.points} pts
                              </span>
                            </div>

                            <div>
                              {isReached ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#385117] bg-[#E5EED6] px-2 py-0.5 rounded-full border border-[#506B26]/30">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Acquis
                                </span>
                              ) : isNextInLine ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#385117] bg-[#FAF9F6] px-2 py-0.5 rounded-full border border-[#385117]">
                                  <Unlock className="w-3.5 h-3.5" /> En approche
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6A6860] bg-[#ECE9DF] px-2 py-0.5 rounded-full">
                                  <Lock className="w-3.5 h-3.5" /> À débloquer
                                </span>
                              )}
                            </div>
                          </div>

                          <h5 className="text-sm font-bold text-[#1F201C]">
                            {milestone.title}
                          </h5>
                          <p className="text-xs text-[#403E3A] mt-0.5 font-medium">
                            {milestone.description}
                          </p>

                          <div className="mt-3 p-2.5 rounded-xl bg-[#F8F7F4] border border-[#E5E2D9] text-xs space-y-1">
                            <div className="font-semibold text-[#1F201C] flex items-center gap-1.5">
                              <span className="text-[#385117]">🌱 Exercice :</span> {milestone.exercise}
                            </div>
                            <div className="text-[#5C5952] text-[11px]">
                              <strong>Effet :</strong> {milestone.benefit}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#E5E2D9] flex items-center justify-between text-xs font-bold text-[#385117]">
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
