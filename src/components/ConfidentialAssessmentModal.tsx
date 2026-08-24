import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Heart, 
  Baby, 
  AlertTriangle, 
  Brain, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Activity, 
  Sparkles,
  HelpCircle,
  Plus,
  Trash2,
  EyeOff,
  Scale
} from 'lucide-react';
import { UserAssessmentProfile, ChildImpactInfo } from '../types';
import { StorageService, DEFAULT_ASSESSMENT_PROFILE } from '../utils/storage';
import { CompanionMemoryService } from '../utils/companionMemory';

interface ConfidentialAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssessmentCompleted?: (profile: UserAssessmentProfile) => void;
}

export const ConfidentialAssessmentModal: React.FC<ConfidentialAssessmentModalProps> = ({
  isOpen,
  onClose,
  onAssessmentCompleted,
}) => {
  const [profile, setProfile] = useState<UserAssessmentProfile>(() => {
    return StorageService.getAssessmentProfile();
  });
  const [step, setStep] = useState<number>(1);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleUpdatePersonalInfo = (key: keyof UserAssessmentProfile['personalInfo'], val: any) => {
    setProfile((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: val,
      },
    }));
  };

  const handleUpdateChildrenInfo = (key: keyof UserAssessmentProfile['childrenInfo'], val: any) => {
    setProfile((prev) => ({
      ...prev,
      childrenInfo: {
        ...prev.childrenInfo,
        [key]: val,
      },
    }));
  };

  const handleAddChild = () => {
    const newChild: ChildImpactInfo = {
      id: `child-${Date.now()}`,
      age: '5',
      gender: 'Fille',
      psychologicalImpacts: ['Troubles du sommeil ou cauchemars'],
      observedBehaviors: ['Hypervigilance / Peur des bruits forts'],
      specialNeedsNotes: '',
    };
    setProfile((prev) => ({
      ...prev,
      childrenInfo: {
        ...prev.childrenInfo,
        hasChildren: true,
        childrenCount: prev.childrenInfo.children.length + 1,
        children: [...prev.childrenInfo.children, newChild],
      },
    }));
  };

  const handleRemoveChild = (id: string) => {
    setProfile((prev) => {
      const updated = prev.childrenInfo.children.filter((c) => c.id !== id);
      return {
        ...prev,
        childrenInfo: {
          ...prev.childrenInfo,
          hasChildren: updated.length > 0,
          childrenCount: updated.length,
          children: updated,
        },
      };
    });
  };

  const handleUpdateChild = (id: string, updates: Partial<ChildImpactInfo>) => {
    setProfile((prev) => ({
      ...prev,
      childrenInfo: {
        ...prev.childrenInfo,
        children: prev.childrenInfo.children.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      },
    }));
  };

  const toggleChildImpact = (childId: string, impact: string) => {
    const child = profile.childrenInfo.children.find((c) => c.id === childId);
    if (!child) return;
    const exists = child.psychologicalImpacts.includes(impact);
    const updatedImpacts = exists
      ? child.psychologicalImpacts.filter((i) => i !== impact)
      : [...child.psychologicalImpacts, impact];
    handleUpdateChild(childId, { psychologicalImpacts: updatedImpacts });
  };

  const toggleChildBehavior = (childId: string, behavior: string) => {
    const child = profile.childrenInfo.children.find((c) => c.id === childId);
    if (!child) return;
    const exists = child.observedBehaviors.includes(behavior);
    const updatedBehaviors = exists
      ? child.observedBehaviors.filter((b) => b !== behavior)
      : [...child.observedBehaviors, behavior];
    handleUpdateChild(childId, { observedBehaviors: updatedBehaviors });
  };

  const toggleProblemType = (key: keyof UserAssessmentProfile['problemTypes']) => {
    setProfile((prev) => ({
      ...prev,
      problemTypes: {
        ...prev.problemTypes,
        [key]: !prev.problemTypes[key],
      },
    }));
  };

  const handleUpdateImmediateImpacts = (key: keyof UserAssessmentProfile['immediateImpacts'], val: any) => {
    setProfile((prev) => ({
      ...prev,
      immediateImpacts: {
        ...prev.immediateImpacts,
        [key]: val,
      },
    }));
  };

  const toggleSymptom = (type: 'physicalSymptoms' | 'emotionalSymptoms' | 'immediateNeeds', item: string) => {
    const currentList = profile.immediateImpacts[type] || [];
    const exists = currentList.includes(item);
    const updatedList = exists
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];
    handleUpdateImmediateImpacts(type, updatedList);
  };

  const handleSaveAndComplete = () => {
    const completedProfile: UserAssessmentProfile = {
      ...profile,
      isCompleted: true,
      completedAt: new Date().toISOString(),
    };

    StorageService.saveAssessmentProfile(completedProfile);

    // Sync with companion profile
    const currentComp = CompanionMemoryService.getProfile();
    const activeRisks: string[] = [];
    if (completedProfile.problemTypes.psychologicalAbuse) activeRisks.push('Abus psychologique');
    if (completedProfile.problemTypes.physicalViolence) activeRisks.push('Violences physiques');
    if (completedProfile.problemTypes.cyberHarassment) activeRisks.push('Surveillance numérique / cyberharcèlement');
    if (completedProfile.problemTypes.financialControl) activeRisks.push('Contrôle financier');
    if (completedProfile.problemTypes.threatsAndBlackmail) activeRisks.push('Menaces directes / Chantage');

    CompanionMemoryService.saveProfile({
      ...currentComp,
      userContext: {
        ...currentComp.userContext,
        preferredName: completedProfile.personalInfo.preferredName || 'Amie',
        hasChildren: completedProfile.childrenInfo.hasChildren,
        identifiedRisks: activeRisks.length > 0 ? activeRisks : currentComp.userContext.identifiedRisks,
        lastEmotionalState: `Stress: ${completedProfile.immediateImpacts.stressLevel}/5 • Danger: ${completedProfile.immediateImpacts.dangerLevelPerceived}`,
      },
    });

    setIsSavedNotice(true);
    setTimeout(() => {
      setIsSavedNotice(false);
      onAssessmentCompleted?.(completedProfile);
      onClose();
    }, 900);
  };

  const commonChildPsychologicalImpacts = [
    'Troubles du sommeil ou cauchemars fréquents',
    'Régression (énurésie, besoin de présence continue)',
    'Crises d\'angoisse ou mutisme soudain',
    'Baisse brutale des résultats scolaires',
    'Peur disproportionnée des bruits ou cris',
    'Sentiment de responsabilité ou culpabilité',
  ];

  const commonChildBehaviors = [
    'Hypervigilance constante / Guette les humeurs',
    'Position de protecteur envers la mère',
    'Agressivité réactionnelle ou retrait total',
    'Somatisations (maux de ventre récurrents, céphalées)',
  ];

  const commonPhysicalSymptoms = [
    'Insomnies, réveils nocturnes en sursaut',
    'Palpitations cardiaques / Oppression thoracique',
    'Perte d\'appétit ou troubles digestifs',
    'Tremblements / Tétanie sous stress',
    'Épuisement physique et fatigue chronique',
  ];

  const commonEmotionalSymptoms = [
    'Hypervigilance permanente / Peur au moindre bruit',
    'Sentiment de honte ou culpabilité écrasante',
    'Brouillard mental / Perte de concentration',
    'Dissociation (sentiment d\'être coupée de son corps)',
    'Sentiment d\'impuissance ou d\'enfermement',
  ];

  const commonImmediateNeeds = [
    'Conseils juridiques urgents (Garde, plainte, ordonnance)',
    'Lieu d\'hébergement sécurisé & confidentiel',
    'Écoute psychologique sans jugement',
    'Aide à la constitution d\'un sac de départ',
    'Régulation du système nerveux et soulagement du stress',
  ];

  return (
    <div id="confidential-assessment-backdrop" className="fixed inset-0 bg-[#2C2A29]/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div 
        id="confidential-assessment-card"
        className="bg-white rounded-3xl max-w-3xl w-full p-5 md:p-8 shadow-2xl border border-[#E5E2D9] max-h-[92vh] flex flex-col justify-between overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header with Encryption & Confidentiality Badge */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E2D9]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] text-white flex items-center justify-center shadow-xs">
                <Lock className="w-5 h-5 text-[#E5EAD9]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A5B]">
                    Sanctuaire Confidentiel Chiffré • Étape {step} sur {totalSteps}
                  </span>
                  <span className="bg-[#E5EAD9] text-[#5A5A40] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#CED6C1]">
                    <EyeOff className="w-3 h-3" /> Zéro Partage Externe
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-[#3E3B39] font-serif-natural tracking-tight">
                  Bilan Thérapeutique & Diagnostic de Sûreté
                </h2>
              </div>
            </div>

            <button
              id="assessment-close-btn"
              onClick={onClose}
              className="text-xs text-[#8E8B82] hover:text-[#5A5A40] font-medium px-2.5 py-1 rounded-lg hover:bg-[#F8F7F2] transition-colors"
            >
              Fermer
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="w-full bg-[#E5E2D9] h-1.5 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-[#5A5A40] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          <p className="text-xs text-[#8E8B82] mt-3 mb-5 leading-relaxed">
            Ce formulaire confidentiel permet d'ajuster l'Intelligence Thérapeutique, le plan de sûreté et les protocoles de secours à votre réalité exacte. Toutes les réponses restent stockées localement sur votre appareil.
          </p>

          {/* STEP 1: Profil & Identité protégée */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5A5A40] pb-1 border-b border-[#F0EEE6]">
                <User className="w-4 h-4 text-[#8A9A5B]" />
                <span>1. Profil et Situation d'Hébergement</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E3B39] mb-1">
                    Prénom ou pseudonyme d'usage (Optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Sophie, Amie..."
                    value={profile.personalInfo.preferredName || ''}
                    onChange={(e) => handleUpdatePersonalInfo('preferredName', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-[#FDFCF7]"
                  />
                  <p className="text-[10px] text-[#8E8B82] mt-1">Utilisé par l'IA pour s'adresser à vous avec bienveillance.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3E3B39] mb-1">
                    Tranche d'âge
                  </label>
                  <select
                    value={profile.personalInfo.ageRange}
                    onChange={(e) => handleUpdatePersonalInfo('ageRange', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-[#FDFCF7]"
                  >
                    <option value="18-24">18 - 24 ans</option>
                    <option value="25-34">25 - 34 ans</option>
                    <option value="35-44">35 - 44 ans</option>
                    <option value="45-54">45 - 54 ans</option>
                    <option value="55-64">55 - 64 ans</option>
                    <option value="65+">65 ans et plus</option>
                    <option value="Préfère ne pas préciser">Préfère ne pas préciser</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E3B39] mb-1">
                    Genre / Identité
                  </label>
                  <select
                    value={profile.personalInfo.gender}
                    onChange={(e) => handleUpdatePersonalInfo('gender', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-[#FDFCF7]"
                  >
                    <option value="Femme">Femme</option>
                    <option value="Homme">Homme</option>
                    <option value="Non-binaire">Non-binaire</option>
                    <option value="Autre">Autre</option>
                    <option value="Préfère ne pas préciser">Préfère ne pas préciser</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3E3B39] mb-1">
                    Situation actuelle de logement
                  </label>
                  <select
                    value={profile.personalInfo.livingSituation}
                    onChange={(e) => handleUpdatePersonalInfo('livingSituation', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-[#FDFCF7]"
                  >
                    <option value="Vit avec la personne menaçante">Vit actuellement avec la personne menaçante</option>
                    <option value="En séparation récente">En processus de séparation récente</option>
                    <option value="Hébergée chez des tiers">Hébergée temporairement chez des proches / amis</option>
                    <option value="Logement autonome">Logement autonome (mais harcèlement ou visites)</option>
                    <option value="Autre">Autre situation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3B39] mb-1">
                  Département, Ville ou Région (Optionnel - pour les refuges et aides locales)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Paris 11e, Lyon, Marseille, Gironde..."
                  value={profile.personalInfo.postalCodeOrRegion || ''}
                  onChange={(e) => handleUpdatePersonalInfo('postalCodeOrRegion', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-[#FDFCF7]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Enfants & Impacts Psychologiques Détectés */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5A5A40] pb-1 border-b border-[#F0EEE6]">
                <Baby className="w-4 h-4 text-[#8A9A5B]" />
                <span>2. Enfants & Impacts Psychologiques Détectés</span>
              </div>

              {/* Question 1: Avez-vous des enfants ? */}
              <div className="p-3.5 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9]">
                <label className="block text-xs font-bold text-[#3E3B39] mb-2">
                  Avez-vous des enfants ou des mineurs à charge dans votre foyer ?
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateChildrenInfo('hasChildren', true);
                      if (profile.childrenInfo.children.length === 0) {
                        handleAddChild();
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      profile.childrenInfo.hasChildren
                        ? 'bg-[#5A5A40] text-white shadow-2xs'
                        : 'bg-white border border-[#E5E2D9] text-[#5A5A40]'
                    }`}
                  >
                    Oui, j'ai des enfants
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateChildrenInfo('hasChildren', false);
                      handleUpdateChildrenInfo('children', []);
                      handleUpdateChildrenInfo('childrenCount', 0);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      !profile.childrenInfo.hasChildren
                        ? 'bg-[#5A5A40] text-white shadow-2xs'
                        : 'bg-white border border-[#E5E2D9] text-[#5A5A40]'
                    }`}
                  >
                    Non, aucun enfant à charge
                  </button>
                </div>
              </div>

              {profile.childrenInfo.hasChildren ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#5A5A40]">
                      Détails pour chaque enfant ({profile.childrenInfo.children.length} renseigné(s))
                    </p>
                    <button
                      type="button"
                      onClick={handleAddChild}
                      className="px-3 py-1.5 rounded-xl bg-[#E5EAD9] hover:bg-[#d8dfcb] text-[#5A5A40] text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ajouter un enfant
                    </button>
                  </div>

                  {profile.childrenInfo.children.map((child, idx) => (
                    <div key={child.id} className="p-4 rounded-2xl bg-white border border-[#E5E2D9] shadow-2xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0EEE6]">
                        <span className="text-xs font-bold text-[#3E3B39] flex items-center gap-1.5">
                          <Baby className="w-3.5 h-3.5 text-[#8A9A5B]" /> Enfant #{idx + 1}
                        </span>
                        {profile.childrenInfo.children.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveChild(child.id)}
                            className="text-red-500 hover:text-red-700 p-1 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Retirer
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-[#3E3B39] mb-1">
                            Âge de l'enfant
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: 4 ans, 11 ans, 16 ans..."
                            value={child.age}
                            onChange={(e) => handleUpdateChild(child.id, { age: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#E5E2D9] bg-[#FDFCF7]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#3E3B39] mb-1">
                            Sexe / Genre
                          </label>
                          <select
                            value={child.gender}
                            onChange={(e) => handleUpdateChild(child.id, { gender: e.target.value as any })}
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#E5E2D9] bg-[#FDFCF7]"
                          >
                            <option value="Fille">Fille</option>
                            <option value="Garçon">Garçon</option>
                            <option value="Autre">Autre</option>
                            <option value="Préfère ne pas préciser">Préfère ne pas préciser</option>
                          </select>
                        </div>
                      </div>

                      {/* Impacts Psychologiques Détectés chez l'enfant */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#5A5A40] mb-1.5">
                          Impacts psychologiques & symptômes détectés chez cet enfant :
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {commonChildPsychologicalImpacts.map((impact) => {
                            const isSelected = child.psychologicalImpacts.includes(impact);
                            return (
                              <button
                                key={impact}
                                type="button"
                                onClick={() => toggleChildImpact(child.id, impact)}
                                className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] border transition-all flex items-start gap-1.5 ${
                                  isSelected
                                    ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-medium'
                                    : 'bg-[#FDFCF7] border-[#E5E2D9] text-[#8E8B82] hover:border-[#CED6C1]'
                                }`}
                              >
                                <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${isSelected ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                                  {isSelected && <CheckCircle2 className="w-3 h-3" />}
                                </span>
                                <span className="leading-tight">{impact}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Comportements observés */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#5A5A40] mb-1.5">
                          Comportements et réactions protectrices observées :
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {commonChildBehaviors.map((behavior) => {
                            const isSelected = child.observedBehaviors.includes(behavior);
                            return (
                              <button
                                key={behavior}
                                type="button"
                                onClick={() => toggleChildBehavior(child.id, behavior)}
                                className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] border transition-all flex items-start gap-1.5 ${
                                  isSelected
                                    ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-medium'
                                    : 'bg-[#FDFCF7] border-[#E5E2D9] text-[#8E8B82] hover:border-[#CED6C1]'
                                }`}
                              >
                                <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${isSelected ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                                  {isSelected && <CheckCircle2 className="w-3 h-3" />}
                                </span>
                                <span className="leading-tight">{behavior}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-[#3E3B39] mb-1">
                        Statut juridique de la garde
                      </label>
                      <select
                        value={profile.childrenInfo.custodyStatus}
                        onChange={(e) => handleUpdateChildrenInfo('custodyStatus', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#E5E2D9] bg-[#FDFCF7]"
                      >
                        <option value="Aucun jugement">Aucun jugement officiel rendu</option>
                        <option value="Garde exclusive">Garde exclusive actuellement</option>
                        <option value="Garde alternée">Garde alternée ou droit de visite</option>
                        <option value="Conflit de garde aigu">Conflit de garde aigu / Menaces de soustraction</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <input
                        type="checkbox"
                        id="children-exposed"
                        checked={profile.childrenInfo.areChildrenExposedDirectly}
                        onChange={(e) => handleUpdateChildrenInfo('areChildrenExposedDirectly', e.target.checked)}
                        className="rounded border-[#CED6C1] text-[#5A5A40] focus:ring-[#8A9A5B] w-4 h-4"
                      />
                      <label htmlFor="children-exposed" className="text-xs text-[#3E3B39] font-semibold cursor-pointer">
                        Les enfants assistent directement aux violences ou aux disputes violentes
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                /* Situation Individuelle Objective & Précise (Aucun enfant impliqué) */
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-3.5 rounded-2xl bg-[#E5EAD9]/40 border border-[#CED6C1] text-xs text-[#5A5A40] flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#8A9A5B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#3E3B39]">Approche Précise & Sans Jugement Accusatoire</p>
                      <p className="text-[11px] text-[#5A5A40] mt-0.5 leading-relaxed">
                        Aucun enfant n'étant impliqué, l'évaluation se concentre de manière neutre et factuelle sur votre environnement direct, vos besoins d'autonomie et la protection de vos preuves, sans pointer du doigt ni nommer de tiers.
                      </p>
                    </div>
                  </div>

                  {/* Cadre de cohabitation actuel */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E2D9] space-y-3">
                    <label className="block text-xs font-bold text-[#3E3B39]">
                      Configuration spatiale et environnement de résidence :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { val: 'Logement partagé en commun', label: 'Espace de vie partagé en continu', desc: 'Cohabitation sous le même toit' },
                        { val: 'Bail individuel', label: 'Logement avec bail personnel', desc: 'Mais sollicitations ou visites imprévues' },
                        { val: 'Hébergement temporaire', label: 'Hébergement temporaire / Transit', desc: 'Chez un proche ou solution d\'urgence' },
                        { val: 'Séparés géographiquement', label: 'Résidences distinctes séparées', desc: 'Contact à distance ou cyber-interactions' },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => {
                            setProfile((prev) => ({
                              ...prev,
                              childrenInfo: {
                                ...prev.childrenInfo,
                                noChildrenSpecifics: {
                                  ...prev.childrenInfo.noChildrenSpecifics,
                                  cohabitationEnvironment: item.val as any,
                                },
                              },
                            }));
                          }}
                          className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                            profile.childrenInfo.noChildrenSpecifics?.cohabitationEnvironment === item.val
                              ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39]'
                              : 'bg-[#FDFCF7] border-[#E5E2D9] text-[#5A5A40] hover:border-[#CED6C1]'
                          }`}
                        >
                          <div className="font-bold">{item.label}</div>
                          <div className="text-[10px] text-[#8E8B82] mt-0.5">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rythme et Fréquence des tensions */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E2D9] space-y-3">
                    <label className="block text-xs font-bold text-[#3E3B39]">
                      Dynamique temporelle des situations de tension observées :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { val: 'Tension quotidienne permanente', label: 'Climat de tension quotidien régulier' },
                        { val: 'Événements sporadiques imprévisibles', label: 'Épisodes ponctuels imprévisibles' },
                        { val: 'Intensification lors des moments de désaccord', label: 'Pics lors des désaccords ou refus' },
                        { val: 'Surveillance à distance continue', label: 'Interactions et sollicitations à distance' },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => {
                            setProfile((prev) => ({
                              ...prev,
                              childrenInfo: {
                                ...prev.childrenInfo,
                                noChildrenSpecifics: {
                                  ...prev.childrenInfo.noChildrenSpecifics,
                                  threatFrequencyPattern: item.val as any,
                                },
                              },
                            }));
                          }}
                          className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                            profile.childrenInfo.noChildrenSpecifics?.threatFrequencyPattern === item.val
                              ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                              : 'bg-[#FDFCF7] border-[#E5E2D9] text-[#5A5A40] hover:border-[#CED6C1]'
                          }`}
                        >
                          <span className="font-semibold text-[11px]">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Domaines d'impacts personnels et matériels */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E2D9] space-y-2">
                    <label className="block text-xs font-bold text-[#3E3B39]">
                      Facteurs d'autonomie et points de vigilance personnelle :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Autonomie financière & travail',
                        'Isolement vis-à-vis des proches',
                        'Protection des animaux de compagnie',
                        'Documents d\'identité & administratifs',
                        'Sécurité des accès numériques & téléphone',
                        'Tranquillité du lieu de travail',
                      ].map((item) => {
                        const current = profile.childrenInfo.noChildrenSpecifics?.keyTargetedVulnerabilities || [];
                        const isSel = current.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              const updated = isSel ? current.filter((x) => x !== item) : [...current, item];
                              setProfile((prev) => ({
                                ...prev,
                                childrenInfo: {
                                  ...prev.childrenInfo,
                                  noChildrenSpecifics: {
                                    ...prev.childrenInfo.noChildrenSpecifics,
                                    keyTargetedVulnerabilities: updated,
                                  },
                                },
                              }));
                            }}
                            className={`p-2.5 rounded-xl text-left border text-xs transition-all flex items-center gap-2 ${
                              isSel
                                ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-semibold'
                                : 'bg-[#FDFCF7] border-[#E5E2D9] text-[#8E8B82] hover:border-[#CED6C1]'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isSel ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                              {isSel && <CheckCircle2 className="w-3 h-3" />}
                            </span>
                            <span className="text-[11px]">{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Préservation Confidentielle des Éléments de Preuve */}
                  <div className="p-3.5 rounded-2xl bg-[#F8F7F2] border border-[#E5E2D9] space-y-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#8A9A5B]" />
                      <span className="text-xs font-bold text-[#3E3B39]">Sauvegarde Confidentielle des Éléments et Preuves</span>
                    </div>
                    <p className="text-[11px] text-[#8E8B82]">
                      Toutes les preuves, dates et descriptions consignées dans votre coffre HAVEN-ELLE restent chiffrées localement sans aucun transfert non consenti.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {[
                        'Fichiers numériques sécurisés dans le coffre',
                        'Preuves physiques conservées en lieu sûr',
                        'Preuves confiées à un proche de confiance',
                        'Aucune trace conservée pour le moment',
                      ].map((storageMode) => (
                        <button
                          key={storageMode}
                          type="button"
                          onClick={() => {
                            setProfile((prev) => ({
                              ...prev,
                              childrenInfo: {
                                ...prev.childrenInfo,
                                noChildrenSpecifics: {
                                  ...prev.childrenInfo.noChildrenSpecifics,
                                  evidenceStorageSecurity: storageMode as any,
                                },
                              },
                            }));
                          }}
                          className={`p-2 rounded-xl text-left border text-[11px] transition-all ${
                            profile.childrenInfo.noChildrenSpecifics?.evidenceStorageSecurity === storageMode
                              ? 'bg-[#5A5A40] text-white border-[#5A5A40] font-medium'
                              : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:border-[#CED6C1]'
                          }`}
                        >
                          {storageMode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Nature du problème & Formes de violences */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5A5A40] pb-1 border-b border-[#F0EEE6]">
                <AlertTriangle className="w-4 h-4 text-[#8A9A5B]" />
                <span>3. Nature de la Situation & Problématiques Subies</span>
              </div>

              <p className="text-xs text-[#3E3B39]">
                Cochez toutes les formes d'emprise, de violences ou de pressions présentes dans votre quotidien :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => toggleProblemType('psychologicalAbuse')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    profile.problemTypes.psychologicalAbuse
                      ? 'bg-[#E5EAD9]/70 border-[#8A9A5B] shadow-2xs'
                      : 'bg-white border-[#E5E2D9] hover:border-[#CED6C1]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${profile.problemTypes.psychologicalAbuse ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                      {profile.problemTypes.psychologicalAbuse && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#3E3B39]">Emprise & Violence Psychologique</h4>
                      <p className="text-[11px] text-[#8E8B82] mt-0.5">Dénigrement continuel, humiliation, culpabilisation, gaslighting, jalousie maladive.</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => toggleProblemType('physicalViolence')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    profile.problemTypes.physicalViolence
                      ? 'bg-[#E5EAD9]/70 border-[#8A9A5B] shadow-2xs'
                      : 'bg-white border-[#E5E2D9] hover:border-[#CED6C1]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${profile.problemTypes.physicalViolence ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                      {profile.problemTypes.physicalViolence && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#3E3B39]">Violences Physiques</h4>
                      <p className="text-[11px] text-[#8E8B82] mt-0.5">Coups, bousculades, étranglements, saisies brutales, séquestration, objets lancés.</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => toggleProblemType('threatsAndBlackmail')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    profile.problemTypes.threatsAndBlackmail
                      ? 'bg-[#E5EAD9]/70 border-[#8A9A5B] shadow-2xs'
                      : 'bg-white border-[#E5E2D9] hover:border-[#CED6C1]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${profile.problemTypes.threatsAndBlackmail ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                      {profile.problemTypes.threatsAndBlackmail && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#3E3B39]">Menaces Directes & Chantage</h4>
                      <p className="text-[11px] text-[#8E8B82] mt-0.5">Menaces de mort, chantage au suicide, menaces de retirer la garde des enfants ou de détruire vos affaires.</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => toggleProblemType('cyberHarassment')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    profile.problemTypes.cyberHarassment
                      ? 'bg-[#E5EAD9]/70 border-[#8A9A5B] shadow-2xs'
                      : 'bg-white border-[#E5E2D9] hover:border-[#CED6C1]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${profile.problemTypes.cyberHarassment ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                      {profile.problemTypes.cyberHarassment && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#3E3B39]">Cyber-Surveillance & Traçage</h4>
                      <p className="text-[11px] text-[#8E8B82] mt-0.5">Contrôle du téléphone portable, AirTag/GPS caché, piratage de comptes, caméras au domicile.</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => toggleProblemType('financialControl')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    profile.problemTypes.financialControl
                      ? 'bg-[#E5EAD9]/70 border-[#8A9A5B] shadow-2xs'
                      : 'bg-white border-[#E5E2D9] hover:border-[#CED6C1]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${profile.problemTypes.financialControl ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                      {profile.problemTypes.financialControl && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#3E3B39]">Contrôle & Privation Financière</h4>
                      <p className="text-[11px] text-[#8E8B82] mt-0.5">Confiscation de revenus, interdiction de travailler, justification de chaque euro dépensé.</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => toggleProblemType('sexualViolence')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    profile.problemTypes.sexualViolence
                      ? 'bg-[#E5EAD9]/70 border-[#8A9A5B] shadow-2xs'
                      : 'bg-white border-[#E5E2D9] hover:border-[#CED6C1]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${profile.problemTypes.sexualViolence ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                      {profile.problemTypes.sexualViolence && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#3E3B39]">Violences Sexuelles & Atteintes</h4>
                      <p className="text-[11px] text-[#8E8B82] mt-0.5">Rapports imposés, pressions répétées, non-respect du consentement au sein du couple.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Stress perçu & Conséquences Immédiates */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5A5A40] pb-1 border-b border-[#F0EEE6]">
                <Activity className="w-4 h-4 text-[#8A9A5B]" />
                <span>4. Conséquences Immédiates & Niveau de Stress Perçu</span>
              </div>

              {/* Échelle de Stress Perçu */}
              <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-[#E5E2D9] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#3E3B39]">
                    Niveau d'angoisse et de charge de stress actuelle :
                  </label>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#5A5A40] text-white">
                    {profile.immediateImpacts.stressLevel} / 5 • {
                      profile.immediateImpacts.stressLevel === 1 ? 'Calme relatif' :
                      profile.immediateImpacts.stressLevel === 2 ? 'Inquiétude modérée' :
                      profile.immediateImpacts.stressLevel === 3 ? 'Stress élevé' :
                      profile.immediateImpacts.stressLevel === 4 ? 'Angoisse aiguë / Épuisement' :
                      'Crise de panique / Urgence vitale'
                    }
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={profile.immediateImpacts.stressLevel}
                  onChange={(e) => handleUpdateImmediateImpacts('stressLevel', parseInt(e.target.value) as any)}
                  className="w-full accent-[#5A5A40] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8E8B82]">
                  <span>1 - Gérable</span>
                  <span>3 - Pesant</span>
                  <span>5 - Insoutenable</span>
                </div>
              </div>

              {/* Danger Perçu */}
              <div>
                <label className="block text-xs font-bold text-[#3E3B39] mb-1">
                  Niveau de danger physique estimé pour les prochaines 48 heures :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Faible', 'Modéré', 'Élevé', 'Danger Mortel / Urgence Vitale'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleUpdateImmediateImpacts('dangerLevelPerceived', lvl)}
                      className={`p-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                        profile.immediateImpacts.dangerLevelPerceived === lvl
                          ? lvl.includes('Danger Mortel')
                            ? 'bg-[#A64D4D] text-white border-[#A64D4D]'
                            : 'bg-[#5A5A40] text-white border-[#5A5A40]'
                          : 'bg-white border-[#E5E2D9] text-[#5A5A40]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptômes Physiques */}
              <div>
                <label className="block text-[11px] font-bold text-[#5A5A40] mb-1.5">
                  Symptômes physiques récents chez vous :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {commonPhysicalSymptoms.map((symp) => {
                    const isSelected = profile.immediateImpacts.physicalSymptoms.includes(symp);
                    return (
                      <button
                        key={symp}
                        type="button"
                        onClick={() => toggleSymptom('physicalSymptoms', symp)}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] border transition-all flex items-start gap-1.5 ${
                          isSelected
                            ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-medium'
                            : 'bg-[#FDFCF7] border-[#E5E2D9] text-[#8E8B82] hover:border-[#CED6C1]'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${isSelected ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </span>
                        <span className="leading-tight">{symp}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Symptômes Émotionnels */}
              <div>
                <label className="block text-[11px] font-bold text-[#5A5A40] mb-1.5">
                  État émotionnel et psychologique :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {commonEmotionalSymptoms.map((symp) => {
                    const isSelected = profile.immediateImpacts.emotionalSymptoms.includes(symp);
                    return (
                      <button
                        key={symp}
                        type="button"
                        onClick={() => toggleSymptom('emotionalSymptoms', symp)}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] border transition-all flex items-start gap-1.5 ${
                          isSelected
                            ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-medium'
                            : 'bg-[#FDFCF7] border-[#E5E2D9] text-[#8E8B82] hover:border-[#CED6C1]'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${isSelected ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </span>
                        <span className="leading-tight">{symp}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Besoins Prioritaires & Synthèse */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-sm font-bold text-[#5A5A40] pb-1 border-b border-[#F0EEE6]">
                <Sparkles className="w-4 h-4 text-[#8A9A5B]" />
                <span>5. Besoins Prioritaires & Démarches Antérieures</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3B39] mb-1.5">
                  Quels sont vos besoins d'assistance les plus urgents ?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {commonImmediateNeeds.map((need) => {
                    const isSelected = profile.immediateImpacts.immediateNeeds.includes(need);
                    return (
                      <button
                        key={need}
                        type="button"
                        onClick={() => toggleSymptom('immediateNeeds', need)}
                        className={`text-left p-2.5 rounded-xl text-xs border transition-all flex items-start gap-2 ${
                          isSelected
                            ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-semibold'
                            : 'bg-white border-[#E5E2D9] text-[#8E8B82] hover:border-[#CED6C1]'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${isSelected ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'border-[#CED6C1]'}`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </span>
                        <span>{need}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3B39] mb-1">
                  Précisions particulières ou craintes urgentes (Optionnel)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Menaces sur les animaux de compagnie, passeports confisqués, suspicion d'espionnage..."
                  value={profile.immediateImpacts.urgentSafetyConcerns || ''}
                  onChange={(e) => handleUpdateImmediateImpacts('urgentSafetyConcerns', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-[#FDFCF7]"
                />
              </div>

              {/* Récapitulatif de sécurité */}
              <div className="p-3.5 rounded-2xl bg-[#E5EAD9]/60 border border-[#CED6C1] text-xs text-[#5A5A40] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8A9A5B]" />
                  <span>Validation de votre Sanctuaire Thérapeutique</span>
                </div>
                <p className="text-[11px] text-[#5A5A40]/90 leading-relaxed">
                  En validant ce formulaire, vos données permettront d'activer immédiatement les recommandations ciblées, la régulation somato-émotionnelle et la sécurisation juridique de vos démarches.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions & Navigation */}
        <div className="pt-5 mt-5 border-t border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Précédent
              </button>
            ) : (
              <span className="text-[11px] text-[#8E8B82]">Étape 1 sur {totalSteps}</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                Suivant <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveAndComplete}
                className="px-6 py-2.5 rounded-xl bg-[#8A9A5B] hover:bg-[#7b8a4f] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
              >
                {isSavedNotice ? (
                  <>Sanctuaire Configuré ! <CheckCircle2 className="w-4 h-4 text-white" /></>
                ) : (
                  <>Enregistrer & Activer mon Sanctuaire <ShieldCheck className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
