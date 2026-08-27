import React, { useState, useEffect } from 'react';
import {
  Brain,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Heart,
  Baby,
  User,
  ArrowRight,
  ArrowLeft,
  BookmarkCheck,
  FileSpreadsheet,
  Edit3,
  Plus,
  Trash2,
  HelpCircle,
  Check,
  RotateCcw,
  Info,
  Layers,
  HeartHandshake,
  MessageSquareHeart,
  Settings
} from 'lucide-react';
import { StorageService } from '../utils/storage';
import { UserAssessmentProfile, VeroCustomQuestion, IntakeQuestionnaireState } from '../types';
import { CompanionMemoryService } from '../utils/companionMemory';
import { googleSignIn, initAuth } from '../utils/firebaseAuth';
import { createGoogleForm } from '../utils/workspaceApi';

interface MainScreenVideoAndQuestionsProps {
  onPlanGenerated?: () => void;
  onOpenDetailedAssessment?: () => void;
}

export const MainScreenVideoAndQuestions: React.FC<MainScreenVideoAndQuestionsProps> = ({
  onPlanGenerated,
  onOpenDetailedAssessment,
}) => {
  const [profile, setProfile] = useState<UserAssessmentProfile>(() => StorageService.getAssessmentProfile());
  const [intakeState, setIntakeState] = useState<IntakeQuestionnaireState>(() => StorageService.getIntakeQuestionnaire());
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [isSaved, setIsSaved] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Auth state for Google Forms export
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isCreatingForm, setIsCreatingForm] = useState(false);

  // Editor Modal for Vero's custom questions (5 to 10)
  const [editingVeroId, setEditingVeroId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editQuestionType, setEditQuestionType] = useState<'multiple_choice' | 'text_reflection' | 'yes_no' | 'rating_scale'>('multiple_choice');
  const [editOptions, setEditOptions] = useState<string[]>([]);
  const [newOptionText, setNewOptionText] = useState('');

  useEffect(() => {
    initAuth(
      () => setNeedsAuth(false),
      () => setNeedsAuth(true)
    );

    const handleIntakeSync = (e: Event) => {
      const customEvent = e as CustomEvent<IntakeQuestionnaireState>;
      if (customEvent.detail) {
        setIntakeState(customEvent.detail);
      }
    };
    window.addEventListener('haven-intake-updated', handleIntakeSync);
    return () => window.removeEventListener('haven-intake-updated', handleIntakeSync);
  }, []);

  const handleLogin = async () => {
    try {
      await googleSignIn();
      setNeedsAuth(false);
    } catch (err) {
      console.error('Erreur lors de la connexion Google', err);
    }
  };

  const handleCreateGoogleForm = async () => {
    setIsCreatingForm(true);
    const formUrl = await createGoogleForm('Dossier d\'Évaluation Sécurisé - HAVEN-ELLE', 'Formulaire des 10 Questions de Sûreté & Autonomie');
    setIsCreatingForm(false);
    if (formUrl) {
      window.open(formUrl, '_blank');
    } else {
      alert('Erreur lors de la création du Google Form.');
    }
  };

  // Synchronize field updates
  const updateState = (partial: Partial<IntakeQuestionnaireState>) => {
    const updated = { ...intakeState, ...partial, lastUpdated: new Date().toISOString() };
    setIntakeState(updated);
    StorageService.saveIntakeQuestionnaire(updated);
  };

  // Risk options for Q3
  const riskOptions = [
    'Menaces de violences ou escalade de tension',
    'Contrôle des communications et du téléphone',
    'Isolement relationnel et familial',
    'Privation de moyens financiers / comptes bloqués',
    'Présence d’armes ou d’objets dangereux au domicile',
    'Intimidation verbale et dénigrement systématique',
    'Peur pour la sécurité personnelle lors des sorties',
    'Filature ou localisation forcée du véhicule / téléphone',
  ];

  const handleToggleRisk = (risk: string) => {
    const current = intakeState.selectedRisks || [];
    const updated = current.includes(risk)
      ? current.filter((r) => r !== risk)
      : [...current, risk];
    updateState({ selectedRisks: updated });
  };

  // Toxic relationship patterns for Q4
  const toxicPatterns = [
    {
      id: 'emprise',
      label: 'Emprise psychologique & manipulation',
      desc: 'Sentiment constant de marcher sur des œufs, déformation des faits (gaslighting) et perte de confiance en sa propre perception.',
    },
    {
      id: 'imprevisibilite',
      label: 'Imprévisibilité & climat de peur',
      desc: 'Alternance imprévisible de phases de séduction/lune de miel et d\'explosions de colère ou silences punitifs.',
    },
    {
      id: 'devalorisation',
      label: 'Dénigrement insidieux & dévalorisation',
      desc: 'Remarques blessantes masquées sous forme d\'humour, critiques répétées sur l\'apparence, l\'intelligence ou la maternité.',
    },
    {
      id: 'isolement',
      label: 'Isolement relationnel & jalousie obsessionnelle',
      desc: 'Critique systématique de vos proches, surveillance des fréquentations et obligation de justifier chaque déplacement.',
    },
    {
      id: 'culpabilisation',
      label: 'Inversion de la culpabilité',
      desc: 'L\'autre se positionne systématiquement en victime et vous rend responsable de tous ses comportements toxiques.',
    },
    {
      id: 'controle_materiel',
      label: 'Contrôle économique & matériel',
      desc: 'Privation de libre accès à l\'argent, dépendance financière organisée ou confiscation des moyens de transport.',
    },
    {
      id: 'effacement_soi',
      label: 'Effacement de soi & épuisement émotionnel',
      desc: 'Extinction progressive de ses propres besoins et passions pour préserver le calme et éviter le conflit.',
    },
    {
      id: 'chantage_menaces',
      label: 'Chantage affectif ou menaces indirectes',
      desc: 'Menaces de se faire du mal, de retirer les enfants ou de détruire votre réputation en cas de désaccord.',
    },
  ];

  const handleToggleToxicPattern = (patternLabel: string) => {
    const current = intakeState.toxicRelationshipPatterns || [];
    const updated = current.includes(patternLabel)
      ? current.filter((p) => p !== patternLabel)
      : [...current, patternLabel];
    updateState({ toxicRelationshipPatterns: updated });
  };

  // Open Editor for Vero question
  const handleOpenVeroEditor = (id: number) => {
    const question = intakeState.veroQuestions[id];
    setEditingVeroId(id);
    setEditTitle(question?.title || `Question ${id}`);
    setEditSubtitle(question?.subtitle || '');
    setEditQuestionType(question?.questionType || 'multiple_choice');
    setEditOptions(question?.options ? [...question.options] : ['Option 1', 'Option 2']);
    setNewOptionText('');
  };

  const handleSaveVeroEditor = () => {
    if (!editingVeroId) return;
    const updated = StorageService.updateVeroQuestion(editingVeroId, {
      title: editTitle.trim() || `Question ${editingVeroId}`,
      subtitle: editSubtitle.trim(),
      questionType: editQuestionType,
      options: editOptions,
      isConfigured: true,
    });
    setIntakeState(updated);
    setEditingVeroId(null);
  };

  const handleAddOption = () => {
    if (!newOptionText.trim()) return;
    setEditOptions([...editOptions, newOptionText.trim()]);
    setNewOptionText('');
  };

  const handleRemoveOption = (index: number) => {
    setEditOptions(editOptions.filter((_, i) => i !== index));
  };

  const handleUpdateVeroAnswer = (id: number, answer: string | string[] | number, note?: string) => {
    const currentVero = intakeState.veroQuestions[id];
    if (!currentVero) return;
    const updated = StorageService.updateVeroQuestion(id, {
      ...currentVero,
      userAnswer: answer,
      userNote: note !== undefined ? note : currentVero.userNote,
    });
    setIntakeState(updated);
  };

  // Save full assessment & earn points
  const handleSaveAndSubmit = () => {
    setIsGenerating(true);

    const updatedProfile: UserAssessmentProfile = {
      ...profile,
      isCompleted: true,
      lastUpdated: new Date().toISOString(),
      personalInfo: {
        ...profile.personalInfo,
        livingSituation: intakeState.livingSituation as any,
      },
      childrenInfo: {
        ...profile.childrenInfo,
        hasChildren: intakeState.hasChildren,
        childrenCount: intakeState.hasChildren ? Math.max(1, intakeState.childrenCount) : 0,
      },
      problemTypes: {
        ...profile.problemTypes,
        physicalViolence: intakeState.selectedRisks.some((r) => r.includes('violences')),
        psychologicalAbuse: intakeState.selectedRisks.some((r) => r.includes('Intimidation') || r.includes('Isolement')) || intakeState.toxicRelationshipPatterns.length > 0,
        financialControl: intakeState.financialAutonomy.includes('Contrôle'),
        cyberHarassment: intakeState.surveillanceLevel.includes('Espionnage'),
      },
    };

    StorageService.saveAssessmentProfile(updatedProfile);
    setProfile(updatedProfile);

    const updatedIntake: IntakeQuestionnaireState = {
      ...intakeState,
      isCompleted: true,
      lastUpdated: new Date().toISOString(),
    };
    StorageService.saveIntakeQuestionnaire(updatedIntake);
    setIntakeState(updatedIntake);

    // Award +25 resilience points for completing the 10 questions questionnaire
    CompanionMemoryService.addResiliencePoints(25, 'Validation du Formulaire des 10 Questions de Sûreté & Autonomie');

    setTimeout(() => {
      setIsGenerating(false);
      setIsSaved(true);
      if (onPlanGenerated) onPlanGenerated();
      setTimeout(() => setIsSaved(false), 4500);
    }, 700);
  };

  // Check if a question is answered
  const isQuestionAnswered = (qNum: number): boolean => {
    switch (qNum) {
      case 1:
        return !!intakeState.livingSituation;
      case 2:
        return true; // Has a default state (either non or oui with count)
      case 3:
        return (intakeState.selectedRisks || []).length > 0;
      case 4:
        return (intakeState.toxicRelationshipPatterns || []).length > 0 || !!intakeState.toxicRelationshipDescription;
      default: {
        const vq = intakeState.veroQuestions[qNum];
        if (!vq) return false;
        return vq.userAnswer !== undefined && vq.userAnswer !== '' && vq.userAnswer !== null;
      }
    }
  };

  const answeredCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((n) => isQuestionAnswered(n)).length;
  const progressPercent = Math.round((answeredCount / 10) * 100);

  return (
    <div id="main-screen-video-questions-hub" className="space-y-6">
      {/* Primary 10-Question Form Card */}
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl border-2 border-[#CBD5E1] p-5 sm:p-7 shadow-sm space-y-6">
          
          {/* Header & Quick Intro */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#E2E8F0]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#14532D] border-2 border-[#86EFAC] flex items-center justify-center shadow-xs shrink-0 font-black">
                <Brain className="w-6 h-6 text-[#15803D]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#15803D]">
                    Page Prioritaire • Formulaire d'Entrée
                  </span>
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#14532D] border-2 border-[#86EFAC]">
                    10 Questions
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-0.5 font-serif">
                  Questionnaire de Sûreté & Reconstruction
                </h2>
              </div>
            </div>

            {/* Answered Counter & Progress */}
            <div className="flex items-center gap-3 self-end sm:self-center bg-[#F8FAFC] px-4 py-2.5 rounded-2xl border-2 border-[#CBD5E1] shadow-2xs">
              <div className="text-right">
                <div className="text-xs font-black text-[#0F172A]">
                  {answeredCount} / 10 complétées
                </div>
                <div className="text-[11px] text-[#334155] font-bold">
                  Progression : {progressPercent}%
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#15803D] flex items-center justify-center font-black text-xs text-[#15803D] shadow-2xs">
                {progressPercent}%
              </div>
            </div>
          </div>

          {/* Stepper Grid (1 to 10 questions) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#334155]">
                Sélectionnez une question pour y répondre ou la configurer :
              </span>
              <span className="text-xs font-black text-[#15803D]">
                Question {activeQuestion} sur 10
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const isActive = activeQuestion === num;
                const isAnswered = isQuestionAnswered(num);
                const isVeroSlot = num >= 5;
                const isVeroConfigured = isVeroSlot && intakeState.veroQuestions[num]?.isConfigured;

                return (
                  <button
                    key={num}
                    id={`intake-question-step-btn-${num}`}
                    type="button"
                    onClick={() => setActiveQuestion(num)}
                    className={`relative py-2.5 px-1 rounded-xl font-black text-xs flex flex-col items-center justify-center gap-0.5 transition-all border-2 ${
                      isActive
                        ? 'bg-[#15803D] text-white border-[#15803D] shadow-md ring-2 ring-[#15803D]/40 scale-105 z-10'
                        : isAnswered
                        ? 'bg-[#DCFCE7] border-[#86EFAC] text-[#14532D] hover:bg-[#BBF7D0]'
                        : isVeroConfigured
                        ? 'bg-[#FEF3C7] border-[#FCD34D] text-[#78350F] hover:bg-[#FDE68A]'
                        : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <span className="text-xs font-black">Q{num}</span>
                    {isAnswered ? (
                      <Check className="w-3.5 h-3.5 text-[#15803D] stroke-[3]" />
                    ) : isVeroConfigured ? (
                      <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                    ) : isVeroSlot ? (
                      <span className="text-[9px] text-[#475569] font-bold">Libre</span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* QUESTION 1: Situation de résidence */}
          {activeQuestion === 1 && (
            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border-2 border-[#CBD5E1] shadow-2xs">
                <label className="block text-base font-black text-black mb-1 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#15803D]" />
                  1. Quelle est votre situation de résidence actuelle ?
                </label>
                <p className="text-xs text-black font-bold mb-3">
                  Cette information permet d'adapter les recommandations de mise en sécurité et les protocoles de sortie discrète.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Cohabitation sous le même toit',
                    'En cours de recherche de logement séparé',
                    'Logement personnel indépendant',
                    'Hébergement temporaire chez des proches',
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateState({ livingSituation: opt })}
                      className={`p-3.5 rounded-2xl border-2 text-left text-xs transition-all ${
                        intakeState.livingSituation === opt
                          ? 'bg-[#DCFCE7] border-[#15803D] text-[#14532D] font-black shadow-xs ring-2 ring-[#15803D]/30'
                          : 'bg-white border-[#CBD5E1] text-black font-black hover:bg-[#F1F5F9]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {intakeState.livingSituation === opt && <CheckCircle2 className="w-4 h-4 text-[#15803D]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* QUESTION 2: Enfants & Personnes à charge */}
          {activeQuestion === 2 && (
            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border-2 border-[#CBD5E1] shadow-2xs">
                <label className="block text-base font-black text-black mb-1 flex items-center gap-2">
                  <Baby className="w-5 h-5 text-[#15803D]" />
                  2. Y a-t-il des enfants à charge ou des mineurs dans le foyer ?
                </label>
                <p className="text-xs text-black font-bold mb-3">
                  La présence d'enfants déclenche des mesures de protection juridique conjointe (JAF, ordonnance de protection).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => updateState({ hasChildren: false, childrenCount: 0 })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      !intakeState.hasChildren
                        ? 'bg-[#DCFCE7] border-[#15803D] text-[#14532D] font-black shadow-xs ring-2 ring-[#15803D]/30'
                        : 'bg-white border-[#CBD5E1] text-black font-black hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <div className="font-black text-sm text-black">Non (Sans enfant)</div>
                    <div className="text-xs text-black font-bold mt-0.5">Focus direct sur l'autonomie et le départ individuel</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateState({ hasChildren: true, childrenCount: Math.max(1, intakeState.childrenCount) })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      intakeState.hasChildren
                        ? 'bg-[#DCFCE7] border-[#15803D] text-[#14532D] font-black shadow-xs ring-2 ring-[#15803D]/30'
                        : 'bg-white border-[#CBD5E1] text-black font-black hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <div className="font-black text-sm text-black">Oui (Avec enfant·s à charge)</div>
                    <div className="text-xs text-black font-bold mt-0.5">Prise en compte des actes de naissance et garde d'urgence</div>
                  </button>
                </div>

                {intakeState.hasChildren && (
                  <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-[#CBD5E1] flex items-center justify-between flex-wrap gap-3 shadow-2xs">
                    <span className="text-xs text-black font-black">
                      Précisez le nombre d'enfants concernés :
                    </span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => updateState({ childrenCount: num })}
                          className={`w-9 h-9 rounded-xl text-xs font-black transition-all border-2 ${
                            intakeState.childrenCount === num
                              ? 'bg-[#15803D] text-white border-[#15803D] shadow-xs'
                              : 'bg-[#F8FAFC] border-[#CBD5E1] text-black hover:bg-[#DCFCE7]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QUESTION 3: Indicateurs de pression & facteurs de risques */}
          {activeQuestion === 3 && (
            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border-2 border-[#CBD5E1] shadow-2xs">
                <label className="block text-base font-black text-black mb-1 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
                  3. Sélectionnez les indicateurs ou pressions constatés :
                </label>
                <p className="text-xs text-black font-bold mb-3">
                  Cochez tous les éléments que vous observez ou subissez dans votre environnement quotidien.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {riskOptions.map((risk) => {
                    const isSelected = (intakeState.selectedRisks || []).includes(risk);
                    return (
                      <button
                        key={risk}
                        type="button"
                        onClick={() => handleToggleRisk(risk)}
                        className={`p-3.5 rounded-2xl border-2 text-left text-xs transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-[#DCFCE7] border-[#15803D] text-[#14532D] font-black ring-2 ring-[#15803D]/30 shadow-xs'
                            : 'bg-white border-[#CBD5E1] text-black font-black hover:bg-[#F1F5F9]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-md mt-0.5 shrink-0 flex items-center justify-center ${
                            isSelected ? 'bg-[#15803D] text-white' : 'border-2 border-[#64748B] bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className="leading-snug">{risk}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t-2 border-[#E2E8F0]">
                  <div>
                    <label className="block text-xs font-black text-black mb-1.5">
                      Contrôle financier :
                    </label>
                    <select
                      value={intakeState.financialAutonomy}
                      onChange={(e) => updateState({ financialAutonomy: e.target.value })}
                      className="w-full text-xs font-black p-3 rounded-xl border-2 border-[#CBD5E1] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#15803D]"
                    >
                      <option value="Autonomie financière totale">Autonomie financière totale</option>
                      <option value="Autonomie financière partielle">Autonomie financière partielle</option>
                      <option value="Contrôle financier sévère">Contrôle financier sévère (privation)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-black mb-1.5">
                      Niveau de surveillance tech :
                    </label>
                    <select
                      value={intakeState.surveillanceLevel}
                      onChange={(e) => updateState({ surveillanceLevel: e.target.value })}
                      className="w-full text-xs font-black p-3 rounded-xl border-2 border-[#CBD5E1] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#15803D]"
                    >
                      <option value="Pas de surveillance détectée">Pas de surveillance détectée</option>
                      <option value="Surveillance modérée">Surveillance modérée</option>
                      <option value="Espionnage numérique actif">Espionnage numérique actif (traque)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* QUESTION 4: Comment décririez-vous une relation toxique ? */}
          {activeQuestion === 4 && (
            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border-2 border-[#CBD5E1] space-y-4 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black text-[#15803D] uppercase tracking-wider mb-1">
                    <HeartHandshake className="w-4 h-4" />
                    Question Thérapeutique Fondatrice
                  </div>
                  <label className="block text-base sm:text-lg font-black text-black mb-1">
                    4. Comment décririez-vous une relation toxique ou votre dynamique relationnelle actuelle ?
                  </label>
                  <p className="text-xs text-black font-bold leading-relaxed">
                    Une relation saine apporte sérénité, sécurité et respect mutuel. Une relation toxique ou dysfonctionnelle installe le doute, la peur constante, la dévalorisation et l'épuisement. Cochez les dynamiques qui résonnent avec votre vécu :
                  </p>
                </div>

                {/* Toxic relationship patterns grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {toxicPatterns.map((pat) => {
                    const isSelected = (intakeState.toxicRelationshipPatterns || []).includes(pat.label);
                    return (
                      <button
                        key={pat.id}
                        type="button"
                        onClick={() => handleToggleToxicPattern(pat.label)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#DCFCE7] border-[#15803D] ring-2 ring-[#15803D]/30 shadow-xs'
                            : 'bg-white border-[#CBD5E1] hover:bg-[#F1F5F9]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="text-xs font-black text-black flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-[#15803D] text-white' : 'border-2 border-[#64748B] bg-white'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                            <span>{pat.label}</span>
                          </div>
                        </div>
                        <p className="text-xs text-black font-bold leading-normal pl-6">
                          {pat.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Free text reflection */}
                <div className="pt-2">
                  <label className="block text-xs font-black text-black mb-1.5 flex items-center gap-1.5">
                    <MessageSquareHeart className="w-4 h-4 text-[#15803D]" />
                    <span>Décrivez avec vos propres mots ce que vous ressentez au quotidien (facultatif mais libérateur) :</span>
                  </label>
                  <textarea
                    rows={3}
                    value={intakeState.toxicRelationshipDescription || ''}
                    onChange={(e) => updateState({ toxicRelationshipDescription: e.target.value })}
                    placeholder="Ex: J'ai l'impression de ne plus avoir le droit d'exprimer mes besoins sans déclencher un drame..."
                    className="w-full text-xs font-bold p-3.5 rounded-2xl border-2 border-[#CBD5E1] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#15803D] placeholder:text-[#64748B]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* QUESTIONS 5 à 10: Espaces réservés pour Véro (Configurables & Personnalisables) */}
          {activeQuestion >= 5 && activeQuestion <= 10 && (() => {
            const qNum = activeQuestion;
            const veroQ = intakeState.veroQuestions[qNum] || {
              id: qNum,
              title: `Question ${qNum} (Espace réservé pour Véro)`,
              subtitle: 'Emplacement libre pour intégrer la question de Véro.',
              isConfigured: false,
              questionType: 'multiple_choice',
              options: ['Option 1', 'Option 2', 'Option 3'],
              userAnswer: '',
            };

            return (
              <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                <div className="bg-[#F8FAFC] p-5 rounded-2xl border-2 border-[#CBD5E1] space-y-4 shadow-2xs">
                  
                  {/* Top Bar for Véro Question with Customize/Edit Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#E2E8F0]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border-2 ${
                          veroQ.isConfigured 
                            ? 'bg-[#DCFCE7] text-[#14532D] border-[#86EFAC]' 
                            : 'bg-[#FEF3C7] text-[#78350F] border-[#FCD34D]'
                        }`}>
                          {veroQ.isConfigured ? '✓ Question de Véro configurée' : 'Espace libre pour Véro'}
                        </span>
                        <span className="text-xs font-black text-black">
                          Slot #{qNum}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-black mt-1 font-serif">
                        {veroQ.title}
                      </h3>
                      {veroQ.subtitle && (
                        <p className="text-xs text-black font-bold mt-0.5">
                          {veroQ.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Button to customize / rename Véro question */}
                    <button
                      id={`edit-vero-question-${qNum}-btn`}
                      type="button"
                      onClick={() => handleOpenVeroEditor(qNum)}
                      className="px-3.5 py-2 bg-white hover:bg-[#F8FAFC] text-[#14532D] border-2 border-[#15803D] rounded-xl text-xs font-black flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#15803D]" />
                      <span>{veroQ.isConfigured ? 'Modifier la question de Véro' : 'Intégrer / Renommer cette question'}</span>
                    </button>
                  </div>

                  {/* Rendering based on Question Type */}
                  {veroQ.questionType === 'multiple_choice' && (
                    <div className="space-y-2.5">
                      <div className="text-xs font-black text-black mb-1">
                        Sélectionnez la réponse appropriée :
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(veroQ.options || ['Option 1', 'Option 2']).map((opt) => {
                          const isSelected = veroQ.userAnswer === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleUpdateVeroAnswer(qNum, opt)}
                              className={`p-3.5 rounded-2xl border-2 text-left text-xs transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#DCFCE7] border-[#15803D] text-[#14532D] font-black shadow-xs ring-2 ring-[#15803D]/30'
                                  : 'bg-white border-[#CBD5E1] text-black font-black hover:bg-[#F1F5F9]'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-[#15803D]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {veroQ.questionType === 'yes_no' && (
                    <div className="space-y-2.5">
                      <div className="text-xs font-black text-black mb-1">
                        Votre réponse :
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {['Oui', 'Non', 'Incertain / En réflexion'].map((opt) => {
                          const isSelected = veroQ.userAnswer === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleUpdateVeroAnswer(qNum, opt)}
                              className={`p-3.5 rounded-2xl border-2 text-center text-xs transition-all ${
                                isSelected
                                  ? 'bg-[#DCFCE7] border-[#15803D] text-[#14532D] font-black shadow-xs ring-2 ring-[#15803D]/30'
                                  : 'bg-white border-[#CBD5E1] text-black font-black hover:bg-[#F1F5F9]'
                              }`}
                            >
                              <div className="font-black">{opt}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {veroQ.questionType === 'rating_scale' && (
                    <div className="space-y-3">
                      <div className="text-xs font-black text-black">
                        Échelle d'évaluation (1 = Très faible, 5 = Très intense) :
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map((val) => {
                          const isSelected = veroQ.userAnswer === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => handleUpdateVeroAnswer(qNum, val)}
                              className={`py-3 rounded-2xl border-2 text-center font-black text-sm transition-all ${
                                isSelected
                                  ? 'bg-[#15803D] text-white border-[#15803D] shadow-xs'
                                  : 'bg-white border-[#CBD5E1] text-black hover:bg-[#DCFCE7]'
                              }`}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {veroQ.questionType === 'text_reflection' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-black">
                        Votre réflexion ou réponse rédigée :
                      </label>
                      <textarea
                        rows={3}
                        value={(veroQ.userAnswer as string) || ''}
                        onChange={(e) => handleUpdateVeroAnswer(qNum, e.target.value)}
                        placeholder="Rédigez votre réponse ici..."
                        className="w-full text-xs font-bold p-3.5 rounded-2xl border-2 border-[#CBD5E1] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#15803D] placeholder:text-[#64748B]"
                      />
                    </div>
                  )}

                  {/* Optional notes */}
                  <div className="pt-2">
                    <label className="block text-xs font-black text-black mb-1">
                      Remarque personnelle ou précision additionnelle (facultatif) :
                    </label>
                    <input
                      type="text"
                      value={veroQ.userNote || ''}
                      onChange={(e) => handleUpdateVeroAnswer(qNum, veroQ.userAnswer || '', e.target.value)}
                      placeholder="Ajouter une note de contexte..."
                      className="w-full text-xs font-bold p-2.5 rounded-xl border-2 border-[#CBD5E1] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#15803D]"
                    />
                  </div>

                  {!veroQ.isConfigured && (
                    <div className="p-3 rounded-xl bg-[#FEF3C7] border-2 border-[#FCD34D] flex items-center justify-between text-xs text-[#78350F] shadow-2xs">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-[#D97706]" />
                        <span className="font-black">Vous recevrez prochainement la question de Véro pour cet emplacement.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenVeroEditor(qNum)}
                        className="text-xs font-black text-[#14532D] underline hover:text-black cursor-pointer"
                      >
                        Configurer maintenant
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Stepper Navigation Buttons (Précédent / Suivant / Valider) */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-[#E2E8F0]">
            <button
              id="intake-prev-question-btn"
              type="button"
              disabled={activeQuestion === 1}
              onClick={() => setActiveQuestion((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2.5 bg-white border-2 border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-black rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>Question précédente</span>
            </button>

            <div className="flex items-center gap-2">
              {activeQuestion < 10 ? (
                <button
                  id="intake-next-question-btn"
                  type="button"
                  onClick={() => setActiveQuestion((prev) => Math.min(10, prev + 1))}
                  className="px-5 py-2.5 bg-[#15803D] hover:bg-[#14532D] text-white text-xs font-black rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Question suivante (Q{activeQuestion + 1})</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              ) : (
                <button
                  id="intake-submit-final-btn"
                  type="button"
                  onClick={handleSaveAndSubmit}
                  disabled={isGenerating}
                  className="px-6 py-2.5 bg-[#15803D] hover:bg-[#14532D] text-white text-xs font-black rounded-xl flex items-center gap-2 shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Enregistrement du Bilan...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Valider les 10 questions (+25 pts)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Export & Google Form Integration */}
          <div className="pt-3 border-t-2 border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#334155] font-bold">
              <span className="font-black text-[#0F172A]">Exportation sécurisée : </span>
              Partagez ou sauvegardez vos réponses confidentielles vers Google Forms / Drive.
            </div>

            {needsAuth ? (
              <button
                onClick={handleLogin}
                className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-black rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                Connexion Google
              </button>
            ) : (
              <button
                onClick={handleCreateGoogleForm}
                disabled={isCreatingForm}
                className="px-3.5 py-2 bg-[#15803D] hover:bg-[#14532D] text-white text-xs font-black rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {isCreatingForm ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
                Exporter vers Google Forms
              </button>
            )}
          </div>

          {isSaved && (
            <div className="p-3.5 rounded-xl bg-[#DCFCE7] border-2 border-[#86EFAC] text-[#14532D] text-xs font-black flex items-center gap-2 animate-in fade-in shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>Vos 10 questions ont été enregistrées localement et votre protocole de sûreté a été actualisé (+25 points) !</span>
            </div>
          )}

        </div>
      </div>

      {/* MODAL: Editor to rename & customize Véro's Questions (5 to 10) */}
      {editingVeroId !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl border-2 border-[#CED6C1] p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-[#E5E2D9]">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#E5EED6] text-[#385117] flex items-center justify-center font-extrabold text-sm">
                  Q{editingVeroId}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#1F201C]">
                    Intégrer / Renommer la Question de Véro
                  </h4>
                  <p className="text-[11px] text-[#5C5952]">
                    Personnalisez l'intitulé, les options et le type de réponse.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingVeroId(null)}
                className="w-8 h-8 rounded-lg text-[#6A6860] hover:bg-[#F4F2EB] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Question Title */}
              <div>
                <label className="block text-xs font-extrabold text-[#1F201C] mb-1">
                  Intitulé de la question :
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Ex: Avez-vous le sentiment d'être écoutée sans jugement ?"
                  className="w-full text-xs font-semibold p-3 rounded-xl border-2 border-[#CED6C1] bg-white text-[#1F201C] focus:outline-none focus:ring-2 focus:ring-[#385117]"
                />
              </div>

              {/* Subtitle / Therapeutic guidance */}
              <div>
                <label className="block text-xs font-extrabold text-[#1F201C] mb-1">
                  Sous-titre / Explication bienveillante (facultatif) :
                </label>
                <input
                  type="text"
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                  placeholder="Ex: Cette question permet d'évaluer la réciprocité relationnelle."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#CED6C1] bg-white text-[#1F201C] focus:outline-none focus:ring-2 focus:ring-[#385117]"
                />
              </div>

              {/* Question Type */}
              <div>
                <label className="block text-xs font-extrabold text-[#1F201C] mb-1.5">
                  Format de réponse :
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'multiple_choice', label: 'Choix multiples' },
                    { id: 'text_reflection', label: 'Texte libre rédigé' },
                    { id: 'yes_no', label: 'Oui / Non / Incertain' },
                    { id: 'rating_scale', label: 'Échelle 1 à 5' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEditQuestionType(t.id as any)}
                      className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                        editQuestionType === t.id
                          ? 'bg-[#E7EEDB] border-[#385117] text-[#121B0A]'
                          : 'bg-[#FAF9F5] border-[#D8D4C7] text-[#55524B] hover:bg-[#F2EFE9]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options list for multiple choice */}
              {editQuestionType === 'multiple_choice' && (
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-[#1F201C]">
                    Options de choix personnalisées :
                  </label>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {editOptions.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-5 text-[11px] font-bold text-[#8A867C]">{idx + 1}.</span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const copy = [...editOptions];
                            copy[idx] = e.target.value;
                            setEditOptions(copy);
                          }}
                          className="flex-1 text-xs p-2 rounded-lg border border-[#CED6C1] bg-white text-[#1F201C]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="p-2 text-[#A64D4D] hover:bg-[#FCE8E8] rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add option */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={newOptionText}
                      onChange={(e) => setNewOptionText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddOption()}
                      placeholder="Ajouter une option..."
                      className="flex-1 text-xs p-2 rounded-lg border border-[#CED6C1] bg-white text-[#1F201C]"
                    />
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="px-3 py-2 bg-[#385117] text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E2D9]">
              <button
                type="button"
                onClick={() => setEditingVeroId(null)}
                className="px-4 py-2 text-xs font-bold text-[#6A6860] hover:bg-[#F4F2EB] rounded-xl"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveVeroEditor}
                className="px-5 py-2.5 bg-[#385117] hover:bg-[#2A3E11] text-white text-xs font-extrabold rounded-xl shadow-xs"
              >
                Enregistrer la question de Véro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
