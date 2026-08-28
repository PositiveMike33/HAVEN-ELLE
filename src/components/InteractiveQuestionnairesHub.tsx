import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Heart,
  HeartHandshake,
  Lock,
  Brain,
  RotateCcw,
  Activity,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  ChevronDown,
  EyeOff,
  PhoneCall,
  ExternalLink,
  Flame,
  Check,
  ListFilter,
  Layers,
  BookOpen,
  Share2,
  RefreshCw
} from 'lucide-react';
import {
  QuestionnaireId,
  QuestionnaireModule,
  SANCTUARY_QUESTIONNAIRES,
  VIOLENTOMETRE_ITEMS,
  ViolentometreZone,
  ViolentometreItem,
  InteractiveAssessmentsState,
  UserModuleProgress,
  QuestionChoice
} from '../data/questionnairesData';
import { StorageService } from '../utils/storage';
import { CompanionMemoryService } from '../utils/companionMemory';

interface InteractiveQuestionnairesHubProps {
  onTriggerSOS?: () => void;
  onTriggerPanic?: () => void;
  onPointsEarned?: () => void;
}

export const InteractiveQuestionnairesHub: React.FC<InteractiveQuestionnairesHubProps> = ({
  onTriggerSOS,
  onTriggerPanic,
  onPointsEarned,
}) => {
  const [assessmentState, setAssessmentState] = useState<InteractiveAssessmentsState>(() =>
    StorageService.getInteractiveAssessments()
  );

  // Navigation mode: 'hub' (overview) | 'violentometre' | 'module_step' | 'module_summary'
  const [activeModuleId, setActiveModuleId] = useState<QuestionnaireId | null>('violentometre');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [showIdentifiedConcernsModal, setShowIdentifiedConcernsModal] = useState<boolean>(false);
  const [criticalSafetyAlertTriggered, setCriticalSafetyAlertTriggered] = useState<boolean>(false);
  const [criticalAlertReason, setCriticalAlertReason] = useState<string>('');

  // Selected filter for Violentomètre
  const [violentometreFilter, setViolentometreFilter] = useState<'all' | ViolentometreZone>('all');

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<InteractiveAssessmentsState>;
      if (customEvent.detail) {
        setAssessmentState(customEvent.detail);
      }
    };
    window.addEventListener('haven-assessments-updated', handleSync);
    return () => window.removeEventListener('haven-assessments-updated', handleSync);
  }, []);

  const activeModule: QuestionnaireModule | undefined = SANCTUARY_QUESTIONNAIRES.find(
    (m) => m.id === activeModuleId
  );

  const currentModuleProgress: UserModuleProgress | undefined = activeModuleId
    ? assessmentState.modulesProgress[activeModuleId]
    : undefined;

  // Handle choice selection for an active question
  const handleSelectChoice = (choice: QuestionChoice, isMulti: boolean = false) => {
    if (!activeModule) return;
    const currentQ = activeModule.questions[currentQuestionIdx];
    if (!currentQ) return;

    // Check critical safety trigger immediately
    if (choice.isCriticalAlert) {
      setCriticalSafetyAlertTriggered(true);
      setCriticalAlertReason(choice.text);
    }

    const currentAnswers = currentModuleProgress?.answers || {};
    const existingAnswer = currentAnswers[currentQ.id];
    let newChoiceIds: string[] = [];

    if (isMulti) {
      const prevIds = existingAnswer?.selectedChoiceIds || [];
      if (prevIds.includes(choice.id)) {
        newChoiceIds = prevIds.filter((id) => id !== choice.id);
      } else {
        newChoiceIds = [...prevIds, choice.id];
      }
    } else {
      newChoiceIds = [choice.id];
    }

    const updatedAnswers = {
      ...currentAnswers,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedChoiceIds: newChoiceIds,
        answeredAt: new Date().toISOString(),
      },
    };

    // Calculate concerns identified
    const allSelectedChoices: QuestionChoice[] = [];
    activeModule.questions.forEach((q) => {
      const a = updatedAnswers[q.id];
      if (a && a.selectedChoiceIds) {
        a.selectedChoiceIds.forEach((cId) => {
          const found = q.choices.find((c) => c.id === cId);
          if (found) allSelectedChoices.push(found);
        });
      }
    });

    const concernChoices = allSelectedChoices.filter((c) => c.isConcern);
    const uniqueCategories = Array.from(
      new Set(concernChoices.map((c) => c.categoryTag).filter(Boolean) as string[])
    );
    const hasCritical = allSelectedChoices.some((c) => c.isCriticalAlert);

    const isAllQuestionsAnswered = activeModule.questions.every(
      (q) => updatedAnswers[q.id] && updatedAnswers[q.id].selectedChoiceIds.length > 0
    );

    const updatedModuleProgress: UserModuleProgress = {
      moduleId: activeModule.id,
      answers: updatedAnswers,
      isCompleted: isAllQuestionsAnswered,
      completedAt: isAllQuestionsAnswered ? new Date().toISOString() : undefined,
      identifiedConcernsCount: concernChoices.length,
      identifiedConcernCategories: uniqueCategories,
      hasCriticalAlert: hasCritical,
    };

    const newState: InteractiveAssessmentsState = {
      ...assessmentState,
      modulesProgress: {
        ...assessmentState.modulesProgress,
        [activeModule.id]: updatedModuleProgress,
      },
      lastUpdated: new Date().toISOString(),
    };

    setAssessmentState(newState);
    StorageService.saveInteractiveAssessments(newState);

    if (isAllQuestionsAnswered && !currentModuleProgress?.isCompleted) {
      // Award +20 Resilience Points on first completion
      CompanionMemoryService.addResiliencePoints(
        20,
        `Complétion du module d'évaluation : ${activeModule.shortTitle}`
      );
      if (onPointsEarned) onPointsEarned();
    }
  };

  // Toggle selection on Violentomètre item
  const handleToggleViolentometre = (item: ViolentometreItem) => {
    if (item.isCriticalAlert && !assessmentState.violentometreSelections.includes(item.id)) {
      setCriticalSafetyAlertTriggered(true);
      setCriticalAlertReason(item.label);
    }
    const updated = StorageService.toggleViolentometreItem(item.id);
    setAssessmentState(updated);
  };

  // Render icons dynamically
  const renderModuleIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      case 'Lock':
        return <Lock className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'Brain':
        return <Brain className={className} />;
      case 'RotateCcw':
        return <RotateCcw className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'HelpCircle':
        return <HelpCircle className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      default:
        return <ShieldCheck className={className} />;
    }
  };

  // Count total concerns identified across all modules
  const progressList = Object.values(assessmentState.modulesProgress || {}) as UserModuleProgress[];
  const totalIdentifiedConcernsCount = progressList.reduce(
    (acc: number, m: UserModuleProgress) => acc + (m.identifiedConcernsCount || 0),
    0
  );

  const completedModulesCount = progressList.filter(
    (m: UserModuleProgress) => m.isCompleted
  ).length;

  return (
    <div id="interactive-questionnaires-hub" className="space-y-6 animate-in fade-in duration-300">
      {/* QUICK CAMOUFLAGE / DISCREET EXIT BAR */}
      <div className="bg-white rounded-2xl border-2 border-[#CBD5E1] p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#14532D] flex items-center justify-center font-black">
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
          </div>
          <div>
            <div className="text-xs font-black text-[#0F172A]">Espace d'Évaluation & Prise de Conscience Sécurisé</div>
            <div className="text-[11px] text-white font-medium hidden sm:block">
              Aucun résultat stigmatisant • Pédagogie bienveillante • Données chiffrées localement
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onTriggerPanic && (
            <button
              id="questionnaire-quick-exit-btn"
              onClick={onTriggerPanic}
              className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] border border-[#CBD5E1] rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95"
              title="Quitter immédiatement et afficher l'application de camouflage"
            >
              <EyeOff className="w-3.5 h-3.5 text-[#475569]" />
              <span>Quitter rapidement (Échap)</span>
            </button>
          )}

          {onTriggerSOS && (
            <button
              onClick={onTriggerSOS}
              className="px-3 py-1.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS Réseau</span>
            </button>
          )}
        </div>
      </div>

      {/* TOP NAVIGATION TABS / SELECTOR (VIOLENTOMETRE + 8 THEMATIC QUESTIONNAIRES) */}
      <div className="bg-white p-3 rounded-3xl border-2 border-[#CBD5E1] shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              Outils d'Élucidation & Reconstitution
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#0F172A] font-serif">
              Les 8 Questionnaires Interactifs & Le Violentomètre
            </h2>
          </div>

          {/* Overall Stats */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-bold px-3 py-1 bg-[#F8FAFC] border border-[#CBD5E1] text-[#334155] rounded-xl">
              {completedModulesCount}/8 Modules complétés
            </span>
            {totalIdentifiedConcernsCount > 0 && (
              <button
                onClick={() => setShowIdentifiedConcernsModal(true)}
                className="text-xs font-black px-3 py-1 bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] rounded-xl hover:bg-[#FDE68A] transition-colors flex items-center gap-1.5"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>{totalIdentifiedConcernsCount} signaux identifiés</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrolling Modules Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {/* Module 0 : Le Violentomètre Central */}
          <button
            id="tab-btn-violentometre"
            onClick={() => {
              setActiveModuleId('violentometre');
              setCurrentQuestionIdx(0);
            }}
            className={`p-2.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
              activeModuleId === 'violentometre'
                ? 'bg-[#15803D] text-white border-[#15803D] shadow-md ring-2 ring-[#15803D]/40 scale-[1.02]'
                : 'bg-[#F8FAFC] text-[#0F172A] border-[#CBD5E1] hover:bg-[#F1F5F9]'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                activeModuleId === 'violentometre' ? 'bg-white/20 text-white' : 'bg-[#DCFCE7] text-[#14532D]'
              }`}>
                Pilier
              </span>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="mt-2">
              <div className="font-black text-xs leading-tight">Le Violentomètre</div>
              <div className={`text-[10px] font-medium mt-0.5 line-clamp-1 ${
                activeModuleId === 'violentometre' ? 'text-white/80' : 'text-[#475569]'
              }`}>
                Échelle graduelle
              </div>
            </div>
          </button>

          {/* The 8 Interactive Modules */}
          {SANCTUARY_QUESTIONNAIRES.map((mod, index) => {
            const isActive = activeModuleId === mod.id;
            const progress = assessmentState.modulesProgress[mod.id];
            const isCompleted = progress?.isCompleted;
            const concerns = progress?.identifiedConcernsCount || 0;

            return (
              <button
                key={mod.id}
                id={`tab-btn-module-${mod.id}`}
                onClick={() => {
                  setActiveModuleId(mod.id);
                  setCurrentQuestionIdx(0);
                }}
                className={`p-2.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between relative ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md ring-2 ring-[#0F172A]/40 scale-[1.02]'
                    : isCompleted
                    ? 'bg-[#F0FDF4] text-[#14532D] border-[#86EFAC] hover:bg-[#DCFCE7]'
                    : 'bg-[#F8FAFC] text-[#0F172A] border-[#CBD5E1] hover:bg-[#F1F5F9]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isCompleted
                      ? 'bg-[#DCFCE7] text-[#14532D]'
                      : 'bg-[#E2E8F0] text-[#334155]'
                  }`}>
                    {index + 1}/8
                  </span>
                  {renderModuleIcon(mod.iconName, 'w-3.5 h-3.5')}
                </div>

                <div className="mt-2">
                  <div className="font-black text-xs leading-tight line-clamp-1">{mod.shortTitle}</div>
                  <div className={`text-[10px] font-medium mt-0.5 ${
                    isActive ? 'text-white/80' : 'text-[#475569]'
                  }`}>
                    {isCompleted ? (
                      <span className="text-[#15803D] font-bold flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" /> Fait {concerns > 0 && `(${concerns})`}
                      </span>
                    ) : (
                      `${mod.questions.length} questions`
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* VIEW 1: CENTRAL VIOLENTOMÈTRE                           */}
      {/* ======================================================== */}
      {activeModuleId === 'violentometre' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border-2 border-[#CBD5E1] p-5 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#E2E8F0]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Outil Central International de Repérage
                  </span>
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#14532D] border border-[#86EFAC]">
                    Gradation Clinique
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-1 font-serif">
                  Le Violentomètre des Relations Amoureuses
                </h3>
                <p className="text-xs sm:text-sm text-white font-medium mt-1">
                  Cochez les situations qui correspondent à votre quotidien. Cet outil permet d'évaluer la sécurité et l'équilibre de votre couple.
                </p>
              </div>

              {/* Zone Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#CBD5E1] self-start md:self-center">
                <button
                  onClick={() => setViolentometreFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    violentometreFilter === 'all'
                      ? 'bg-[#0F172A] text-white shadow-2xs'
                      : 'text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  Tous ({VIOLENTOMETRE_ITEMS.length})
                </button>
                <button
                  onClick={() => setViolentometreFilter('saine')}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    violentometreFilter === 'saine'
                      ? 'bg-[#15803D] text-white shadow-2xs'
                      : 'text-[#166534] hover:bg-[#DCFCE7]'
                  }`}
                >
                  🟢 Saine
                </button>
                <button
                  onClick={() => setViolentometreFilter('surveiller')}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    violentometreFilter === 'surveiller'
                      ? 'bg-[#D97706] text-white shadow-2xs'
                      : 'text-[#B45309] hover:bg-[#FEF3C7]'
                  }`}
                >
                  🟡 À surveiller
                </button>
                <button
                  onClick={() => setViolentometreFilter('danger_controle')}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    violentometreFilter === 'danger_controle'
                      ? 'bg-[#EA580C] text-white shadow-2xs'
                      : 'text-[#C2410C] hover:bg-[#FFEDD5]'
                  }`}
                >
                  🟠 Violence & Contrôle
                </button>
                <button
                  onClick={() => setViolentometreFilter('danger_majeur')}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    violentometreFilter === 'danger_majeur'
                      ? 'bg-[#DC2626] text-white shadow-2xs'
                      : 'text-[#B91C1C] hover:bg-[#FEE2E2]'
                  }`}
                >
                  🔴 Danger Important
                </button>
              </div>
            </div>

            {/* Visual Color Bar Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <div className="p-3 rounded-2xl bg-[#F0FDF4] border-2 border-[#86EFAC]">
                <div className="text-xs font-black text-[#166534] flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#15803D]" />
                  🟢 RELATION SAINE
                </div>
                <div className="text-[11px] text-[#14532D] font-bold mt-1">Profite • Respect & Confiance mutuelle</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A]">
                <div className="text-xs font-black text-[#92400E] flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#D97706]" />
                  🟡 VIGILANCE
                </div>
                <div className="text-[11px] text-[#78350F] font-bold mt-1">Dis stop • Comportements préoccupants</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFF7ED] border-2 border-[#FED7AA]">
                <div className="text-xs font-black text-[#9A3412] flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#EA580C]" />
                  🟠 VIOLENCE & CONTRÔLE
                </div>
                <div className="text-[11px] text-[#7C2D12] font-bold mt-1">Protège-toi • Demande de l’aide</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FEF2F2] border-2 border-[#FECACA]">
                <div className="text-xs font-black text-[#991B1B] flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#DC2626] animate-pulse" />
                  🔴 DANGER IMPORTANT
                </div>
                <div className="text-[11px] text-[#7F1D1D] font-bold mt-1">Danger de mort • Appelle le 3919 / 17 / SOS</div>
              </div>
            </div>

            {/* List of Violentomètre items */}
            <div className="space-y-2.5">
              {VIOLENTOMETRE_ITEMS.filter(
                (it) => violentometreFilter === 'all' || it.zone === violentometreFilter
              ).map((item) => {
                const isSelected = assessmentState.violentometreSelections.includes(item.id);

                let zoneBorder = 'border-[#E2E8F0]';
                let zoneTag = 'bg-[#F1F5F9] text-[#334155]';
                let zoneLabel = 'Information';

                if (item.zone === 'saine') {
                  zoneBorder = isSelected ? 'border-[#15803D] bg-[#F0FDF4]' : 'border-[#DCFCE7] hover:border-[#86EFAC]';
                  zoneTag = 'bg-[#DCFCE7] text-[#14532D] border border-[#86EFAC]';
                  zoneLabel = '🟢 Relation saine';
                } else if (item.zone === 'surveiller') {
                  zoneBorder = isSelected ? 'border-[#D97706] bg-[#FFFBEB]' : 'border-[#FEF3C7] hover:border-[#FCD34D]';
                  zoneTag = 'bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]';
                  zoneLabel = '🟡 Vigilance';
                } else if (item.zone === 'danger_controle') {
                  zoneBorder = isSelected ? 'border-[#EA580C] bg-[#FFF7ED]' : 'border-[#FFEDD5] hover:border-[#FDBA74]';
                  zoneTag = 'bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74]';
                  zoneLabel = '🟠 Violence & Contrôle';
                } else if (item.zone === 'danger_majeur') {
                  zoneBorder = isSelected ? 'border-[#DC2626] bg-[#FEF2F2]' : 'border-[#FEE2E2] hover:border-[#FCA5A5]';
                  zoneTag = 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]';
                  zoneLabel = '🔴 Danger Majeur';
                }

                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleViolentometre(item)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${zoneBorder}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                          isSelected
                            ? item.zone === 'saine'
                              ? 'bg-[#15803D] border-[#15803D] text-white'
                              : item.zone === 'surveiller'
                              ? 'bg-[#D97706] border-[#D97706] text-white'
                              : item.zone === 'danger_controle'
                              ? 'bg-[#EA580C] border-[#EA580C] text-white'
                              : 'bg-[#DC2626] border-[#DC2626] text-white'
                            : 'border-[#CBD5E1] bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${zoneTag}`}>
                            {zoneLabel}
                          </span>
                          {item.isCriticalAlert && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#DC2626] text-white animate-pulse">
                              Alerte Sécurité Prioritaire
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-black text-[#0F172A] mt-1">{item.label}</p>
                        <p className="text-xs text-white font-medium mt-0.5">{item.scientificNote}</p>
                      </div>
                    </div>

                    <div className="shrink-0 self-end sm:self-center">
                      <span className={`text-xs font-black px-3 py-1.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#0F172A] text-white border-[#0F172A]'
                          : 'bg-white text-[#475569] border-[#CBD5E1]'
                      }`}>
                        {isSelected ? 'Identifié chez moi' : 'Sélectionner'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: INTERACTIVE THEMATIC MODULE (STEP BY STEP)       */}
      {/* ======================================================== */}
      {activeModule && activeModuleId !== 'violentometre' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border-2 border-[#CBD5E1] p-5 sm:p-7 shadow-sm space-y-6">
            {/* Module Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs shrink-0 font-black border-2"
                  style={{
                    backgroundColor: activeModule.colorTheme.bgLight,
                    borderColor: activeModule.colorTheme.border,
                    color: activeModule.colorTheme.accent,
                  }}
                >
                  {renderModuleIcon(activeModule.iconName, 'w-6 h-6')}
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: activeModule.colorTheme.accent }}>
                    {activeModule.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] font-serif">
                    {activeModule.title}
                  </h3>
                </div>
              </div>

              {/* Progress and Question Counter */}
              <div className="flex items-center gap-3 self-end sm:self-center bg-[#F8FAFC] px-4 py-2 rounded-2xl border border-[#CBD5E1]">
                <div className="text-right">
                  <div className="text-xs font-black text-[#0F172A]">
                    Question {currentQuestionIdx + 1} sur {activeModule.questions.length}
                  </div>
                  <div className="text-[11px] text-[#475569] font-medium">
                    Progression du module
                  </div>
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs border"
                  style={{
                    backgroundColor: activeModule.colorTheme.bgLight,
                    color: activeModule.colorTheme.accent,
                    borderColor: activeModule.colorTheme.border,
                  }}
                >
                  {Math.round(((currentQuestionIdx + 1) / activeModule.questions.length) * 100)}%
                </div>
              </div>
            </div>

            {/* Objective & Pedagogical Anchor */}
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#334155] font-medium flex items-center gap-2.5">
              <Info className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>{activeModule.targetObjective}</span>
            </div>

            {/* Stepper Buttons for Questions inside this module */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {activeModule.questions.map((q, idx) => {
                const isAnswered = currentModuleProgress?.answers[q.id]?.selectedChoiceIds?.length > 0;
                const isCurrent = currentQuestionIdx === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIdx(idx)}
                    className={`flex-1 min-w-[50px] py-2 px-1 rounded-xl text-xs font-black border-2 transition-all flex items-center justify-center gap-1 ${
                      isCurrent
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs scale-105'
                        : isAnswered
                        ? 'bg-[#DCFCE7] text-[#14532D] border-[#86EFAC]'
                        : 'bg-[#F8FAFC] text-[#475569] border-[#CBD5E1] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <span>Q{idx + 1}</span>
                    {isAnswered && <Check className="w-3 h-3 text-[#15803D] stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            {/* CURRENT QUESTION CARD */}
            {(() => {
              const q = activeModule.questions[currentQuestionIdx];
              if (!q) return null;
              const currentAnswer = currentModuleProgress?.answers[q.id];
              const selectedIds = currentAnswer?.selectedChoiceIds || [];

              return (
                <div className="space-y-4 pt-1">
                  {/* Scenario Box (if interactive scenario) */}
                  {q.scenarioContext && (
                    <div className="p-4 rounded-2xl bg-[#EFF6FF] border-2 border-[#BFDBFE] text-xs sm:text-sm font-medium text-[#1E40AF]">
                      <div className="font-black text-[#1D4ED8] mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        Scénario concret :
                      </div>
                      « {q.scenarioContext} »
                    </div>
                  )}

                  <div>
                    <h4 className="text-base sm:text-lg font-black text-[#0F172A]">
                      {q.questionNumber}. {q.title}
                    </h4>
                    {q.subtitle && (
                      <p className="text-xs sm:text-sm text-[#475569] font-medium mt-0.5">
                        {q.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Choices list */}
                  <div className="space-y-2.5">
                    {q.choices.map((choice) => {
                      const isSelected = selectedIds.includes(choice.id);
                      return (
                        <div
                          key={choice.id}
                          onClick={() => handleSelectChoice(choice, q.type === 'multiple')}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? choice.isConcern
                                ? 'bg-[#FFFBEB] border-[#D97706] ring-1 ring-[#D97706]/40 shadow-xs'
                                : 'bg-[#F0FDF4] border-[#15803D] ring-1 ring-[#15803D]/40 shadow-xs'
                              : 'bg-white border-[#CBD5E1] hover:bg-[#F8FAFC]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                                isSelected
                                  ? choice.isConcern
                                    ? 'bg-[#D97706] border-[#D97706] text-white'
                                    : 'bg-[#15803D] border-[#15803D] text-white'
                                  : 'border-[#CBD5E1] bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>

                            <div className="flex-1">
                              <div className="text-xs sm:text-sm font-black text-[#0F172A]">
                                {choice.text}
                              </div>
                              {choice.categoryTag && isSelected && (
                                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] mt-1.5">
                                  Signal : {choice.categoryTag}
                                </span>
                              )}
                              {choice.alertExplanation && isSelected && (
                                <p className="text-xs text-[#B45309] font-bold mt-1">
                                  {choice.alertExplanation}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Instant Pedagogical / Empathetic Teaching Card */}
                  {q.immediateTeaching && selectedIds.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#CBD5E1] space-y-1 animate-in fade-in duration-200">
                      <div className="text-xs font-black text-[#15803D] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Éclairage Thérapeutique & Déculpabilisation :
                      </div>
                      <p className="text-xs text-[#334155] font-medium leading-relaxed">
                        {q.immediateTeaching}
                      </p>
                    </div>
                  )}

                  {/* Stepper Navigation Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
                    <button
                      type="button"
                      disabled={currentQuestionIdx === 0}
                      onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-black text-[#0F172A] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Précédente
                    </button>

                    {currentQuestionIdx < activeModule.questions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                        className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-black shadow-xs flex items-center gap-1.5 transition-all hover:scale-105"
                      >
                        Suivante
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          // Module completed
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#14532D] text-white text-xs font-black shadow-xs flex items-center gap-1.5 transition-all hover:scale-105"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Consulter le Bilan du Module
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* ======================================================== */}
            {/* EMPATHETIC SYNTHESIS / BILAN BIENVEILLANT DU MODULE      */}
            {/* ======================================================== */}
            {currentModuleProgress?.isCompleted && (
              <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-[#F8FAFC] border-2 border-[#CBD5E1] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#14532D] flex items-center justify-center font-black">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase text-[#15803D]">
                      Bilan Bienveillant & Personnalisé
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-[#0F172A]">
                      Synthèse de ton exploration
                    </h4>
                  </div>
                </div>

                {/* Nuanced Non-stigmatizing Empathetic Message */}
                <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#334155] leading-relaxed font-medium space-y-2">
                  {currentModuleProgress.identifiedConcernsCount === 0 ? (
                    <p>
                      🌱 <strong>Relation plutôt saine et respectueuse :</strong> Les réponses que tu as partagées indiquent une bonne réciprocité, une écoute mutuelle et un respect de ton espace personnel.
                    </p>
                  ) : (
                    <>
                      <p>
                        🔍 <strong>Plusieurs comportements que tu as identifiés sont préoccupants.</strong>
                      </p>
                      <p className="text-xs text-[#475569]">
                        « Pris séparément, certains peuvent sembler anodins ou excusables. Ensemble, ils peuvent toutefois former une dynamique insidieuse de contrôle ou de violence. Le fait qu'il n'y ait pas de violence physique ne signifie aucunement que la relation est sécuritaire. »
                      </p>
                    </>
                  )}
                </div>

                {/* Final Wisdom Quote for the Module */}
                <div className="p-3.5 rounded-2xl bg-[#FEF3C7] border border-[#FCD34D] text-xs font-bold text-[#78350F] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <span>{activeModule.closingWisdomMessage}</span>
                </div>

                {/* Action Buttons: View Identified Concerns & Next Module */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {currentModuleProgress.identifiedConcernsCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowIdentifiedConcernsModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-white border-2 border-[#CBD5E1] text-xs font-black text-[#0F172A] hover:bg-[#F1F5F9] shadow-2xs flex items-center gap-2"
                    >
                      <ListFilter className="w-4 h-4 text-[#15803D]" />
                      <span>Voir les comportements que j'ai identifiés ({currentModuleProgress.identifiedConcernsCount})</span>
                    </button>
                  )}

                  {/* Switch to Next Module */}
                  {(() => {
                    const currentModIdx = SANCTUARY_QUESTIONNAIRES.findIndex((m) => m.id === activeModule.id);
                    const nextModule = SANCTUARY_QUESTIONNAIRES[currentModIdx + 1];
                    if (!nextModule) return null;
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModuleId(nextModule.id);
                          setCurrentQuestionIdx(0);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#14532D] text-white text-xs font-black shadow-xs flex items-center gap-2 ml-auto"
                      >
                        <span>Passer au Module {currentModIdx + 2} : {nextModule.shortTitle}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: IDENTIFIED CONCERNS DRAWER                      */}
      {/* ======================================================== */}
      {showIdentifiedConcernsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-[#CBD5E1] max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center font-black">
                  <ListFilter className="w-5 h-5 text-[#D97706]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0F172A]">
                    Comportements & Signaux Identifiés
                  </h3>
                  <p className="text-xs text-[#475569] font-medium">
                    Récapitulatif transparent pour t'aider à nommer les faits sans minimisation.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowIdentifiedConcernsModal(false)}
                className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#475569] font-black hover:bg-[#E2E8F0] flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* List of Concerns grouped by Module */}
            <div className="space-y-4">
              {SANCTUARY_QUESTIONNAIRES.map((mod) => {
                const prog = assessmentState.modulesProgress[mod.id];
                if (!prog || prog.identifiedConcernsCount === 0) return null;

                const selectedConcernChoices: { qTitle: string; choiceText: string; tag?: string }[] = [];
                mod.questions.forEach((q) => {
                  const ans = prog.answers[q.id];
                  if (ans && ans.selectedChoiceIds) {
                    ans.selectedChoiceIds.forEach((cId) => {
                      const c = q.choices.find((ch) => ch.id === cId && ch.isConcern);
                      if (c) {
                        selectedConcernChoices.push({
                          qTitle: q.title,
                          choiceText: c.text,
                          tag: c.categoryTag,
                        });
                      }
                    });
                  }
                });

                if (selectedConcernChoices.length === 0) return null;

                return (
                  <div key={mod.id} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-2">
                    <div className="text-xs font-black text-[#0F172A] flex items-center justify-between">
                      <span>{mod.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E]">
                        {selectedConcernChoices.length} signal(aux)
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {selectedConcernChoices.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs">
                          <div className="font-bold text-[#0F172A]">{item.choiceText}</div>
                          {item.tag && (
                            <span className="inline-block text-[9px] font-black px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] mt-1">
                              {item.tag}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Violentomètre selections */}
              {assessmentState.violentometreSelections.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
                  <div className="text-xs font-black text-[#92400E]">
                    Sélections issues du Violentomètre ({assessmentState.violentometreSelections.length})
                  </div>
                  <div className="space-y-1">
                    {assessmentState.violentometreSelections.map((vId) => {
                      const item = VIOLENTOMETRE_ITEMS.find((it) => it.id === vId);
                      if (!item) return null;
                      return (
                        <div key={vId} className="p-2 rounded-xl bg-white border border-[#FDE68A] text-xs font-medium text-[#0F172A]">
                          • {item.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex justify-end">
              <button
                type="button"
                onClick={() => setShowIdentifiedConcernsModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#0F172A] text-white font-black text-xs"
              >
                Fermer la liste
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: CRITICAL SAFETY ALERT (HIGH-RISK TRIGGER)       */}
      {/* ======================================================== */}
      {criticalSafetyAlertTriggered && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-3 border-[#DC2626] max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 pb-3 border-b-2 border-[#FEE2E2]">
              <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-7 h-7 animate-pulse text-[#DC2626]" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#DC2626]">
                  Alerte de Sécurité Immédiate
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#0F172A]">
                  Signal de Danger Critique Identifié
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] space-y-2">
              <div className="text-xs font-bold text-[#991B1B]">
                Comportement signalé :
              </div>
              <p className="text-sm font-black text-[#7F1D1D]">
                « {criticalAlertReason} »
              </p>
              <p className="text-xs text-[#7F1D1D] font-medium leading-relaxed pt-1">
                Ce type de comportement (menaces de mort, étranglement, arme, séquestration ou escalade au moment de partir) est scientifiquement reconnu comme un <strong>facteur de risque létal majeur</strong>.
              </p>
            </div>

            {/* Crucial Immediate Guidelines */}
            <div className="space-y-2 text-xs text-[#334155] font-medium">
              <div className="font-black text-[#0F172A] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#DC2626]" />
                Recommandations de sécurité vitale :
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#475569]">
                <li><strong>Ne prévenez jamais seul(e)</strong> votre partenaire de votre intention de le quitter.</li>
                <li>Conservez un double de vos clés, papiers d'identité et argent en lieu sûr hors du domicile.</li>
                <li>Contactez des professionnelles formées pour préparer un départ sécurisé.</li>
              </ul>
            </div>

            {/* Emergency Hotline Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <a
                href="tel:3919"
                className="p-3 bg-[#DCFCE7] hover:bg-[#BBF7D0] border-2 border-[#86EFAC] text-[#14532D] rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>3919 (Écoute & Orientation 24/7)</span>
              </a>

              <a
                href="tel:17"
                className="p-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>17 / 114 (Police & Urgences)</span>
              </a>
            </div>

            {/* Dismiss & Quick Exit Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setCriticalSafetyAlertTriggered(false)}
                className="px-4 py-2 text-xs font-bold text-[#475569] hover:text-[#0F172A]"
              >
                J'ai compris, poursuivre le questionnaire
              </button>

              {onTriggerPanic && (
                <button
                  type="button"
                  onClick={() => {
                    setCriticalSafetyAlertTriggered(false);
                    onTriggerPanic();
                  }}
                  className="px-4 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] border border-[#CBD5E1] rounded-xl text-xs font-black flex items-center gap-1.5"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Camouflage d'urgence</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
