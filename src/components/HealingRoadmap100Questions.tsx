import React, { useState, useMemo } from 'react';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff, 
  BookOpen, 
  Heart, 
  Flame, 
  Shield, 
  Crown, 
  Star, 
  Calendar,
  MessageSquareHeart,
  HelpCircle,
  ArrowUpRight,
  Compass
} from 'lucide-react';
import { 
  COMPLETE_100_HEALING_QUESTIONS, 
  Healing100QuestionItem 
} from '../data/resilience100QuestionsData';
import { 
  RESILIENCE_CYCLES, 
  calculatePointsForLevel, 
  getCycleForLevel 
} from '../data/resilience100Levels';
import { CompanionMemoryProfile } from '../types';
import { CompanionMemoryService } from '../utils/companionMemory';

interface HealingRoadmap100QuestionsProps {
  currentValidatedLevel: number;
  resiliencePoints: number;
  onOpenQuestionModal?: (level: number) => void;
}

export const HealingRoadmap100Questions: React.FC<HealingRoadmap100QuestionsProps> = ({
  currentValidatedLevel,
  resiliencePoints,
  onOpenQuestionModal
}) => {
  const profile: CompanionMemoryProfile = CompanionMemoryService.getProfile();
  
  // State for filters
  const [selectedCycleFilter, setSelectedCycleFilter] = useState<0 | 1 | 2 | 3 | 4 | 5>(0); // 0 = All
  const [statusFilter, setStatusFilter] = useState<'all' | 'validated' | 'ready' | 'locked'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedLevelId, setExpandedLevelId] = useState<number | null>(currentValidatedLevel + 1);
  const [peekLockedId, setPeekLockedId] = useState<number | null>(null);

  // Determine current active unlock level
  const effectiveLevel = typeof profile.validatedLevel === 'number' ? profile.validatedLevel : (currentValidatedLevel ?? 0);
  const nextUnlockableLevel = Math.min(111, effectiveLevel + 1);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return COMPLETE_100_HEALING_QUESTIONS.filter((q) => {
      // Cycle Filter
      if (selectedCycleFilter !== 0 && q.cycleId !== selectedCycleFilter) {
        return false;
      }

      // Status Filter
      const isValidated = (profile.validatedQuestions && !!profile.validatedQuestions[q.level]) || (effectiveLevel > 0 && q.level <= effectiveLevel);
      const isReadyToValidate = !isValidated && (q.level === nextUnlockableLevel || q.level === 1);
      const isLocked = !isValidated && !isReadyToValidate;

      if (statusFilter === 'validated' && !isValidated) return false;
      if (statusFilter === 'ready' && !isReadyToValidate) return false;
      if (statusFilter === 'locked' && !isLocked) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchTheme = q.theme.toLowerCase().includes(query);
        const matchQuestion = q.question.toLowerCase().includes(query);
        const matchBadge = q.unlockedRewardBadge.toLowerCase().includes(query);
        const matchLevel = `niveau ${q.level}`.includes(query) || `étape ${q.level}`.includes(query) || `${q.level}` === query.trim();
        return matchTitle || matchTheme || matchQuestion || matchBadge || matchLevel;
      }

      return true;
    });
  }, [selectedCycleFilter, statusFilter, searchQuery, effectiveLevel, nextUnlockableLevel, resiliencePoints, profile.validatedQuestions]);

  // Statistics
  const validatedCount = Object.keys(profile.validatedQuestions || {}).length;
  const progressPercent = Math.min(100, Math.round((validatedCount / 111) * 100));

  const toggleExpand = (level: number) => {
    setExpandedLevelId(prev => prev === level ? null : level);
  };

  const cycleIcons: Record<number, any> = {
    1: Heart,
    2: Flame,
    3: Shield,
    4: Crown,
    5: Sparkles
  };

  return (
    <div className="bg-[#F8FAFC] border-2 border-[#CBD5E1] rounded-3xl p-5 md:p-8 space-y-6 shadow-sm">
      {/* Header of the 111 Questions Roadmap */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#E2E8F0]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] text-[#14532D] text-xs font-black uppercase tracking-wider mb-2 border-2 border-[#86EFAC]">
            <BookOpen className="w-4 h-4 text-[#15803D]" />
            Le Grand Livre des 111 Étapes de Guérison & Arcanes Secrets
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-black text-[#0F172A] flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#15803D]" />
            Cheminement Initiatique des 111 Niveaux
          </h3>
          <p className="text-xs md:text-sm text-[#334155] font-semibold mt-1 max-w-3xl leading-relaxed">
            Consultez à tout moment l'ensemble des 111 questions et réflexions thérapeutiques, incluant les 11 Arcanes Secrets du Kybalion couronnés par le trophée « ÉVEILLÉ ». 
            Vos anciennes réponses et prises de conscience sont précieusement conservées pour vous servir de rappel d'ancrage.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="bg-white p-4 rounded-2xl border-2 border-[#CBD5E1] shadow-2xs shrink-0 text-right min-w-[200px]">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#334155]">Étapes Validées</span>
            <span className="text-xs font-mono font-black text-[#14532D] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#86EFAC]">
              {progressPercent}%
            </span>
          </div>
          <div className="text-2xl font-black text-[#15803D] font-mono">
            {validatedCount} <span className="text-sm font-sans font-bold text-[#64748B]">/ 111</span>
          </div>
          <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden mt-2">
            <div 
              className="bg-[#15803D] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="space-y-3">
        {/* Cycle Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCycleFilter(0)}
            className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 border-2 ${
              selectedCycleFilter === 0
                ? 'bg-[#15803D] text-white border-[#15803D] shadow-xs'
                : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F1F5F9]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tous les 111 Niveaux
          </button>

          {RESILIENCE_CYCLES.map(cycle => {
            const Icon = cycleIcons[cycle.id] || Sparkles;
            const isSelected = selectedCycleFilter === cycle.id;
            return (
              <button
                key={cycle.id}
                onClick={() => setSelectedCycleFilter(cycle.id as 1 | 2 | 3 | 4 | 5)}
                className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 border-2 ${
                  isSelected
                    ? `${cycle.badgeBg} ${cycle.badgeBorder} ${cycle.badgeText} shadow-xs font-black`
                    : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F1F5F9] font-bold'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                Cycle {cycle.id} ({cycle.minLevel}-{cycle.maxLevel})
              </button>
            );
          })}
        </div>

        {/* Search Bar & Status Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une question, un mot-clé (ex: comparaison, pardon, valeurs, niveau 11)..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-[#CBD5E1] rounded-xl text-xs md:text-sm font-semibold text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#64748B] hover:text-[#0F172A]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border-2 border-[#CBD5E1] self-start sm:self-auto overflow-x-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all ${
                statusFilter === 'all' ? 'bg-[#15803D] text-white shadow-xs' : 'text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
            >
              Toutes ({COMPLETE_100_HEALING_QUESTIONS.length})
            </button>
            <button
              onClick={() => setStatusFilter('validated')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all flex items-center gap-1 ${
                statusFilter === 'validated' ? 'bg-[#15803D] text-white shadow-xs' : 'text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
              Validées ({validatedCount})
            </button>
            <button
              onClick={() => setStatusFilter('ready')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all flex items-center gap-1 ${
                statusFilter === 'ready' ? 'bg-[#15803D] text-white shadow-xs' : 'text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
            >
              <Unlock className="w-3.5 h-3.5 text-[#D97706]" />
              Débloquée
            </button>
            <button
              onClick={() => setStatusFilter('locked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all flex items-center gap-1 ${
                statusFilter === 'locked' ? 'bg-[#15803D] text-white shadow-xs' : 'text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-[#64748B]" />
              Voilées 🔒
            </button>
          </div>
        </div>
      </div>

      {/* Results Count Helper */}
      <div className="flex items-center justify-between text-xs text-[#334155] font-bold px-1">
        <span>Affichage de <strong>{filteredQuestions.length}</strong> étape{filteredQuestions.length > 1 ? 's' : ''} sur 111</span>
        {searchQuery && (
          <span className="italic">Filtré par : "{searchQuery}"</span>
        )}
      </div>

      {/* 100 Questions List Cards */}
      <div className="space-y-3.5">
        {filteredQuestions.map((q) => {
          const cycle = RESILIENCE_CYCLES.find(c => c.id === q.cycleId) || RESILIENCE_CYCLES[0];
          const CycleIcon = cycleIcons[q.cycleId];
          const pointsRequired = calculatePointsForLevel(q.level);
          const hasPoints = resiliencePoints >= pointsRequired;
          
          const pastAnswer = profile.validatedQuestions ? profile.validatedQuestions[q.level] : null;
          const isValidated = !!pastAnswer || q.level <= effectiveLevel;
          const isPendingValidation = !isValidated && q.level === nextUnlockableLevel && hasPoints;
          const isLocked = !isValidated && !isPendingValidation;
          const isExpanded = expandedLevelId === q.level;
          const isPeeking = peekLockedId === q.level;

          return (
            <div
              key={q.level}
              id={`roadmap-question-${q.level}`}
              className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                isValidated
                  ? 'bg-white border-[#86EFAC] shadow-xs'
                  : isPendingValidation
                    ? 'bg-white border-[#15803D] shadow-md ring-2 ring-[#15803D]/20'
                    : 'bg-[#F8FAFC] border-[#CBD5E1]'
              }`}
            >
              {/* Question Item Header Row */}
              <div 
                onClick={() => toggleExpand(q.level)}
                className="p-4 md:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#F1F5F9] transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  {/* Status Indicator Icon */}
                  <div className="shrink-0 mt-0.5 sm:mt-0">
                    {isValidated ? (
                      <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] border-2 border-[#86EFAC] text-[#15803D] flex items-center justify-center font-bold text-xs shadow-2xs">
                        <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                      </div>
                    ) : isPendingValidation ? (
                      <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] border-2 border-[#D97706] text-[#B45309] flex items-center justify-center font-bold text-xs animate-pulse shadow-xs">
                        <Unlock className="w-5 h-5 text-[#D97706]" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] border-2 border-[#CBD5E1] text-[#64748B] flex items-center justify-center font-bold text-xs">
                        <Lock className="w-4 h-4 text-[#64748B]" />
                      </div>
                    )}
                  </div>

                  {/* Title, Level, Theme */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-black border ${
                        isValidated 
                          ? 'bg-[#DCFCE7] text-[#14532D] border-[#86EFAC]' 
                          : isPendingValidation
                            ? 'bg-[#FEF3C7] text-[#78350F] border-[#FCD34D]'
                            : 'bg-[#F1F5F9] text-[#334155] border-[#CBD5E1]'
                      }`}>
                        Niveau {q.level} • {pointsRequired} pts
                      </span>

                      <span className="text-xs font-bold text-[#334155] flex items-center gap-1">
                        <CycleIcon className="w-3.5 h-3.5 text-[#15803D]" />
                        Cycle {q.cycleId} : {q.theme}
                      </span>

                      {isValidated && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-black text-[#14532D] bg-[#DCFCE7] px-2 py-0.5 rounded-md border border-[#86EFAC]">
                          <Trophy className="w-3 h-3 text-[#15803D]" /> Validé & Ancré
                        </span>
                      )}

                      {isPendingValidation && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#78350F] bg-[#FEF3C7] px-2 py-0.5 rounded-md border border-[#FCD34D] animate-pulse">
                          ✨ Étape Débloquée à valider
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm md:text-base font-black text-[#0F172A] truncate">
                      {q.title}
                    </h4>
                  </div>
                </div>

                {/* Right Action & Expand Trigger */}
                <div className="flex items-center gap-2 shrink-0">
                  {isValidated && pastAnswer && (
                    <span className="hidden md:inline-block text-xs font-bold text-[#14532D] bg-[#DCFCE7] px-2.5 py-1 rounded-lg border border-[#86EFAC]">
                      Réponse mémorisée
                    </span>
                  )}
                  {isLocked && (
                    <span className="hidden sm:inline-block text-xs font-bold text-[#334155] bg-[#F1F5F9] px-2.5 py-1 rounded-lg border border-[#CBD5E1]">
                      🔒 Voilée ({Math.max(0, pointsRequired - resiliencePoints)} pts manquants)
                    </span>
                  )}
                  <button
                    aria-label="Déplier les détails"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4 stroke-[3]" /> : <ChevronDown className="w-4 h-4 stroke-[3]" />}
                  </button>
                </div>
              </div>

              {/* Collapsible / Expandable Details Body */}
              {isExpanded && (
                <div className="px-4 md:px-6 pb-5 pt-2 border-t-2 border-[#E2E8F0] space-y-4">
                  {/* CASE 1: ALREADY VALIDATED STEP (SHOW ANCHOR RECALL & ANSWERS) */}
                  {isValidated && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      {/* Question Text */}
                      <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#CBD5E1]">
                        <span className="text-xs font-black uppercase tracking-wider text-[#15803D] block mb-1">
                          Question Thérapeutique de l'Étape
                        </span>
                        <p className="text-sm md:text-base font-serif font-black text-[#0F172A] leading-relaxed">
                          {q.question}
                        </p>
                      </div>

                      {/* Saved Answer & Personal Reflection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Selected Option Card */}
                        <div className="p-4 rounded-2xl bg-[#DCFCE7] border-2 border-[#86EFAC] space-y-2">
                          <div className="flex items-center justify-between text-xs font-black text-[#14532D]">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                              Votre Réponse d'Ancrage Choisie
                            </span>
                            {pastAnswer?.date && (
                              <span className="font-bold text-[11px] text-[#334155] flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {pastAnswer.date}
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm font-bold text-[#14532D] leading-relaxed">
                            « {pastAnswer?.answer || q.options[q.correctOptionIndex ?? 0]} »
                          </p>
                        </div>

                        {/* Personal Reflection Note */}
                        <div className="p-4 rounded-2xl bg-white border-2 border-[#CBD5E1] space-y-2 shadow-2xs">
                          <span className="text-xs font-black text-[#0F172A] flex items-center gap-1.5">
                            <MessageSquareHeart className="w-4 h-4 text-[#15803D]" />
                            Votre Note Personnelle & Prise de Conscience
                          </span>
                          <p className="text-xs md:text-sm font-semibold italic text-[#334155] leading-relaxed">
                            {pastAnswer?.reflection 
                              ? `« ${pastAnswer.reflection} »` 
                              : "« J'ai ancré cette vérité dans mon sanctuaire intérieur avec gratitude et sérénité. »"}
                          </p>
                        </div>
                      </div>

                      {/* Affirmation & Reward Badge */}
                      <div className="p-3.5 rounded-xl bg-white border-2 border-[#CBD5E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <strong className="text-[#15803D] font-black block mb-0.5">Mantra d'Intégration :</strong>
                          <span className="italic font-serif font-bold text-[#0F172A]">
                            {q.benevolentAffirmation}
                          </span>
                        </div>
                        <div className="px-3 py-1.5 bg-[#DCFCE7] rounded-lg border-2 border-[#86EFAC] font-black text-[#14532D] shrink-0 flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-[#15803D]" />
                          {q.unlockedRewardBadge}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CASE 2: CURRENT ACTIVE UNLOCKED QUESTION (READY TO VALIDATE) */}
                  {isPendingValidation && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="p-4 rounded-2xl bg-[#FEF3C7] border-2 border-[#D97706] text-[#78350F] space-y-2">
                        <div className="flex items-center gap-2 font-black text-sm text-[#78350F]">
                          <Sparkles className="w-4 h-4 text-[#D97706]" />
                          Étape Prête pour Validation Officielle !
                        </div>
                        <p className="text-xs font-bold leading-relaxed">
                          Vous avez accumulé les <strong>{pointsRequired} points</strong> nécessaires pour ce palier. 
                          Répondez à cette question pour débloquer officiellement votre Niveau {q.level} et recevoir votre badge de résilience.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border-2 border-[#CBD5E1]">
                        <span className="text-xs font-black uppercase tracking-wider text-[#15803D] block mb-1">
                          Question Thérapeutique
                        </span>
                        <p className="text-sm md:text-base font-serif font-black text-[#0F172A] leading-relaxed">
                          {q.question}
                        </p>
                      </div>

                      {/* Options Preview */}
                      <div className="space-y-2">
                        <span className="text-xs font-black text-[#0F172A]">Choix guidés d'auto-compassion :</span>
                        {q.options.map((opt, i) => (
                          <div 
                            key={i} 
                            className="p-3 rounded-xl bg-white border-2 border-[#CBD5E1] text-xs sm:text-sm font-bold text-[#0F172A] flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-lg bg-[#DCFCE7] text-[#14532D] font-black text-xs flex items-center justify-center shrink-0 border border-[#86EFAC]">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Call to action button */}
                      <div className="pt-2">
                        <a
                          href="#healing-level-question-gate"
                          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#14532D] text-white text-xs sm:text-sm font-black transition-all shadow-sm cursor-pointer"
                        >
                          <Unlock className="w-4 h-4" />
                          Accéder à la carte de validation du Niveau {q.level}
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* CASE 3: LOCKED FUTURE QUESTIONS (VEILED / FROSTED CURIOSITY EFFECT) */}
                  {isLocked && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      {/* Veiled Teaser Banner */}
                      <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#CBD5E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-[#334155] font-bold">
                          <Lock className="w-4 h-4 text-[#64748B] shrink-0" />
                          <span>
                            Cette étape se débloquera lorsque vous atteindrez <strong>{pointsRequired} points</strong> de résilience 
                            (actuellement : {resiliencePoints} pts).
                          </span>
                        </div>

                        {/* Peek button to toggle slight clarity */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPeekLockedId(prev => prev === q.level ? null : q.level);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-white border-2 border-[#CBD5E1] text-xs font-black text-[#0F172A] hover:bg-[#F1F5F9] flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs cursor-pointer"
                        >
                          {isPeeking ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          {isPeeking ? 'Re-voiler l\'étape' : 'Aperçu de curiosité'}
                        </button>
                      </div>

                      {/* Veiled Content with Frosted Blur Effect to spark curiosity */}
                      <div className="relative rounded-2xl border-2 border-[#CBD5E1] p-4 bg-white overflow-hidden select-none">
                        {/* Frosted Layer */}
                        <div className={`transition-all duration-500 ${
                          isPeeking 
                            ? 'filter blur-[0.5px] opacity-90' 
                            : 'filter blur-[2.5px] opacity-50'
                        }`}>
                          <span className="text-xs font-black uppercase tracking-wider text-[#15803D] block mb-1">
                            Thème Initiatique : {q.theme}
                          </span>
                          <p className="text-sm font-serif font-black text-[#0F172A] mb-3 leading-relaxed">
                            {q.question}
                          </p>
                          <div className="space-y-1.5 text-xs text-[#334155] font-bold">
                            <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">A. {q.options[0]}</div>
                            <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">B. {q.options[1]}</div>
                            <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">C. {q.options[2]}</div>
                          </div>
                        </div>

                        {/* Floating Mystery Badge Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white/50 backdrop-blur-2xs">
                          <div className="bg-[#0F172A] text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-md">
                            <Lock className="w-4 h-4 text-[#86EFAC]" />
                            <span>Trésor Mystère : {q.unlockedRewardBadge}</span>
                          </div>
                          <span className="text-xs text-[#0F172A] font-black mt-2 bg-white px-3 py-1 rounded-full border-2 border-[#CBD5E1] shadow-2xs">
                            Continuez vos exercices pour lever le sceau du Niveau {q.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
