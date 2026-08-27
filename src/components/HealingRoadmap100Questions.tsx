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
    <div className="bg-[#FAF9F5] border-2 border-[#D5D0C2] rounded-3xl p-5 md:p-8 space-y-6 shadow-sm">
      {/* Header of the 111 Questions Roadmap */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EED6] text-[#2E4313] text-xs font-bold uppercase tracking-wider mb-2 border border-[#8DA765]/30">
            <BookOpen className="w-3.5 h-3.5 text-[#385117]" />
            Le Grand Livre des 111 Étapes de Guérison & Arcanes Secrets
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1F201C] flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#385117]" />
            Cheminement Initiatique des 111 Niveaux
          </h3>
          <p className="text-xs md:text-sm text-[#5C5952] mt-1 max-w-3xl leading-relaxed">
            Consultez à tout moment l'ensemble des 111 questions et réflexions thérapeutiques, incluant les 11 Arcanes Secrets du Kybalion couronnés par le trophée « ÉVEILLÉ ». 
            Vos anciennes réponses et prises de conscience sont précieusement conservées pour vous servir de rappel d'ancrage.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="bg-white p-4 rounded-2xl border-2 border-[#CED6C1] shadow-2xs shrink-0 text-right min-w-[200px]">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#5C5952]">Étapes Validées</span>
            <span className="text-xs font-mono font-bold text-[#385117] bg-[#E5EED6] px-2 py-0.5 rounded-full">
              {progressPercent}%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#385117] font-mono">
            {validatedCount} <span className="text-sm font-sans font-medium text-[#7A776F]">/ 111</span>
          </div>
          <div className="w-full bg-[#E5E2D9] h-2 rounded-full overflow-hidden mt-2">
            <div 
              className="bg-[#385117] h-full transition-all duration-500 rounded-full"
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
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCycleFilter === 0
                ? 'bg-[#385117] text-white shadow-2xs'
                : 'bg-white text-[#5C5952] border border-[#DDD8CC] hover:bg-[#F2EFE9]'
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
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? `${cycle.badgeBg} ${cycle.badgeBorder} ${cycle.badgeText} border-2 shadow-2xs font-extrabold`
                    : 'bg-white text-[#5C5952] border border-[#DDD8CC] hover:bg-[#F2EFE9]'
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
            <Search className="w-4 h-4 text-[#7A776F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une question, un mot-clé (ex: comparaison, pardon, valeurs, niveau 11)..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D5D0C2] rounded-xl text-xs md:text-sm text-[#1F201C] placeholder-[#8C887F] focus:outline-none focus:border-[#385117] focus:ring-1 focus:ring-[#385117] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7A776F] hover:text-[#1F201C]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#D5D0C2] self-start sm:self-auto overflow-x-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'all' ? 'bg-[#385117] text-white' : 'text-[#5C5952] hover:bg-[#F5F2ED]'
              }`}
            >
              Toutes ({COMPLETE_100_HEALING_QUESTIONS.length})
            </button>
            <button
              onClick={() => setStatusFilter('validated')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                statusFilter === 'validated' ? 'bg-[#385117] text-white' : 'text-[#5C5952] hover:bg-[#F5F2ED]'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-[#506B26]" />
              Validées ({validatedCount})
            </button>
            <button
              onClick={() => setStatusFilter('ready')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                statusFilter === 'ready' ? 'bg-[#385117] text-white' : 'text-[#5C5952] hover:bg-[#F5F2ED]'
              }`}
            >
              <Unlock className="w-3 h-3 text-[#F59E0B]" />
              Débloquée
            </button>
            <button
              onClick={() => setStatusFilter('locked')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                statusFilter === 'locked' ? 'bg-[#385117] text-white' : 'text-[#5C5952] hover:bg-[#F5F2ED]'
              }`}
            >
              <Lock className="w-3 h-3 text-[#7A776F]" />
              Voilées 🔒
            </button>
          </div>
        </div>
      </div>

      {/* Results Count Helper */}
      <div className="flex items-center justify-between text-xs text-[#5C5952] px-1">
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
                  ? 'bg-white border-[#506B26]/40 shadow-xs'
                  : isPendingValidation
                    ? 'bg-gradient-to-r from-[#F7FAF2] to-white border-[#506B26] shadow-md ring-2 ring-[#506B26]/20'
                    : 'bg-[#F4F2EB]/90 border-[#DDD8CC]'
              }`}
            >
              {/* Question Item Header Row */}
              <div 
                onClick={() => toggleExpand(q.level)}
                className="p-4 md:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-black/[0.015] transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  {/* Status Indicator Icon */}
                  <div className="shrink-0 mt-0.5 sm:mt-0">
                    {isValidated ? (
                      <div className="w-9 h-9 rounded-xl bg-[#EAF3DE] border border-[#506B26] text-[#385117] flex items-center justify-center font-bold text-xs shadow-2xs">
                        <CheckCircle2 className="w-5 h-5 text-[#385117]" />
                      </div>
                    ) : isPendingValidation ? (
                      <div className="w-9 h-9 rounded-xl bg-[#FEF3D6] border-2 border-[#D97706] text-[#B45309] flex items-center justify-center font-bold text-xs animate-pulse shadow-xs">
                        <Unlock className="w-5 h-5 text-[#D97706]" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-[#EBE7DC] border border-[#C5BFB0] text-[#7A776F] flex items-center justify-center font-bold text-xs">
                        <Lock className="w-4 h-4 text-[#7A776F]" />
                      </div>
                    )}
                  </div>

                  {/* Title, Level, Theme */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                        isValidated 
                          ? 'bg-[#E5EED6] text-[#2E4313] border border-[#506B26]/30' 
                          : isPendingValidation
                            ? 'bg-[#FEF3D6] text-[#92400E] border border-[#F59E0B]'
                            : 'bg-[#ECE9DF] text-[#6A6860]'
                      }`}>
                        Niveau {q.level} • {pointsRequired} pts
                      </span>

                      <span className="text-[11px] font-semibold text-[#5C5952] flex items-center gap-1">
                        <CycleIcon className="w-3 h-3 text-[#385117]" />
                        Cycle {q.cycleId} : {q.theme}
                      </span>

                      {isValidated && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#385117] bg-[#F2F7EB] px-2 py-0.5 rounded-md">
                          <Trophy className="w-3 h-3 text-[#385117]" /> Validé & Ancré
                        </span>
                      )}

                      {isPendingValidation && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#92400E] bg-[#FEF3D6] px-2 py-0.5 rounded-md animate-pulse">
                          ✨ Étape Débloquée à valider
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm md:text-base font-bold text-[#1F201C] truncate">
                      {q.title}
                    </h4>
                  </div>
                </div>

                {/* Right Action & Expand Trigger */}
                <div className="flex items-center gap-2 shrink-0">
                  {isValidated && pastAnswer && (
                    <span className="hidden md:inline-block text-xs font-semibold text-[#385117] bg-white px-2.5 py-1 rounded-lg border border-[#CED6C1]">
                      Réponse mémorisée
                    </span>
                  )}
                  {isLocked && (
                    <span className="hidden sm:inline-block text-xs font-medium text-[#7A776F] bg-[#ECE9DF] px-2.5 py-1 rounded-lg">
                      🔒 Voilée ({Math.max(0, pointsRequired - resiliencePoints)} pts manquants)
                    </span>
                  )}
                  <button
                    aria-label="Déplier les détails"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5C5952] hover:bg-[#EAE6DC] transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible / Expandable Details Body */}
              {isExpanded && (
                <div className="px-4 md:px-6 pb-5 pt-2 border-t border-[#E5E2D9] space-y-4">
                  {/* CASE 1: ALREADY VALIDATED STEP (SHOW ANCHOR RECALL & ANSWERS) */}
                  {isValidated && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      {/* Question Text */}
                      <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E2D9]">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#385117] block mb-1">
                          Question Thérapeutique de l'Étape
                        </span>
                        <p className="text-sm md:text-base font-serif font-bold text-[#1F201C] leading-relaxed">
                          {q.question}
                        </p>
                      </div>

                      {/* Saved Answer & Personal Reflection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Selected Option Card */}
                        <div className="p-4 rounded-2xl bg-[#F2F7EB] border-2 border-[#506B26]/40 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-[#2D450C]">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-[#385117]" />
                              Votre Réponse d'Ancrage Choisie
                            </span>
                            {pastAnswer?.date && (
                              <span className="font-normal text-[11px] text-[#5C5952] flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {pastAnswer.date}
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm font-semibold text-[#18210E] leading-relaxed">
                            « {pastAnswer?.answer || q.options[q.correctOptionIndex ?? 0]} »
                          </p>
                        </div>

                        {/* Personal Reflection Note */}
                        <div className="p-4 rounded-2xl bg-white border border-[#D5D0C2] space-y-2 shadow-2xs">
                          <span className="text-xs font-bold text-[#403E3A] flex items-center gap-1.5">
                            <MessageSquareHeart className="w-4 h-4 text-[#385117]" />
                            Votre Note Personnelle & Prise de Conscience
                          </span>
                          <p className="text-xs md:text-sm italic text-[#4A4742] leading-relaxed">
                            {pastAnswer?.reflection 
                              ? `« ${pastAnswer.reflection} »` 
                              : "« J'ai ancré cette vérité dans mon sanctuaire intérieur avec gratitude et sérénité. »"}
                          </p>
                        </div>
                      </div>

                      {/* Affirmation & Reward Badge */}
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FAF8F2] to-[#F3EFE6] border border-[#DDD8CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <strong className="text-[#385117] block mb-0.5">Mantra d'Intégration :</strong>
                          <span className="italic font-serif font-medium text-[#1F201C]">
                            {q.benevolentAffirmation}
                          </span>
                        </div>
                        <div className="px-3 py-1.5 bg-white rounded-lg border border-[#CED6C1] font-bold text-[#2E4313] shrink-0 flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-[#385117]" />
                          {q.unlockedRewardBadge}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CASE 2: CURRENT ACTIVE UNLOCKED QUESTION (READY TO VALIDATE) */}
                  {isPendingValidation && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#F59E0B] text-[#92400E] space-y-2">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <Sparkles className="w-4 h-4 text-[#D97706]" />
                          Étape Prête pour Validation Officielle !
                        </div>
                        <p className="text-xs leading-relaxed">
                          Vous avez accumulé les <strong>{pointsRequired} points</strong> nécessaires pour ce palier. 
                          Répondez à cette question pour débloquer officiellement votre Niveau {q.level} et recevoir votre badge de résilience.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-[#CED6C1]">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#385117] block mb-1">
                          Question Thérapeutique
                        </span>
                        <p className="text-sm md:text-base font-serif font-bold text-[#1F201C] leading-relaxed">
                          {q.question}
                        </p>
                      </div>

                      {/* Options Preview */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-[#403E3A]">Choix guidés d'auto-compassion :</span>
                        {q.options.map((opt, i) => (
                          <div 
                            key={i} 
                            className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E2D9] text-xs sm:text-sm text-[#323928] flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-lg bg-[#E5EED6] text-[#385117] font-bold text-xs flex items-center justify-center shrink-0">
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
                          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#385117] hover:bg-[#2D450C] text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
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
                      <div className="p-4 rounded-2xl bg-[#F0EDE4] border border-[#DDD8CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-[#6A6860] font-semibold">
                          <Lock className="w-4 h-4 text-[#7A776F] shrink-0" />
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
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#D5D0C2] text-xs font-bold text-[#403E3A] hover:bg-[#FAF9F5] flex items-center gap-1.5 shrink-0 transition-colors"
                        >
                          {isPeeking ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          {isPeeking ? 'Re-voiler l\'étape' : 'Aperçu de curiosité'}
                        </button>
                      </div>

                      {/* Veiled Content with Frosted Blur Effect to spark curiosity */}
                      <div className="relative rounded-2xl border border-[#DDD8CC] p-4 bg-white/70 overflow-hidden select-none">
                        {/* Frosted Layer */}
                        <div className={`transition-all duration-500 ${
                          isPeeking 
                            ? 'filter blur-[0.8px] opacity-90' 
                            : 'filter blur-[2.5px] opacity-50'
                        }`}>
                          <span className="text-xs font-extrabold uppercase tracking-wider text-[#385117] block mb-1">
                            Thème Initiatique : {q.theme}
                          </span>
                          <p className="text-sm font-serif font-bold text-[#1F201C] mb-3 leading-relaxed">
                            {q.question}
                          </p>
                          <div className="space-y-1.5 text-xs text-[#5C5952]">
                            <div className="p-2 bg-[#F5F2ED] rounded-lg">A. {q.options[0]}</div>
                            <div className="p-2 bg-[#F5F2ED] rounded-lg">B. {q.options[1]}</div>
                            <div className="p-2 bg-[#F5F2ED] rounded-lg">C. {q.options[2]}</div>
                          </div>
                        </div>

                        {/* Floating Mystery Badge Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white/40 backdrop-blur-2xs">
                          <div className="bg-[#1F201C]/90 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md">
                            <Lock className="w-4 h-4 text-[#9FE870]" />
                            <span>Trésor Mystère : {q.unlockedRewardBadge}</span>
                          </div>
                          <span className="text-[11px] text-[#403E3A] font-bold mt-1.5 bg-white/90 px-3 py-0.5 rounded-full border border-[#CED6C1]">
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
