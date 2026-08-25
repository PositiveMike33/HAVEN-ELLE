import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Tv,
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
  BookmarkCheck,
  Layers,
  HelpCircle,
  Eye,
  Sliders,
  Maximize2
} from 'lucide-react';
import { StorageService } from '../utils/storage';
import { UserAssessmentProfile } from '../types';

interface MainScreenVideoAndQuestionsProps {
  onPlanGenerated?: () => void;
  onOpenDetailedAssessment?: () => void;
}

export const MainScreenVideoAndQuestions: React.FC<MainScreenVideoAndQuestionsProps> = ({
  onPlanGenerated,
  onOpenDetailedAssessment,
}) => {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSaved, setIsSaved] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Assessment Form Data state synced with storage
  const [profile, setProfile] = useState<UserAssessmentProfile>(() => StorageService.getAssessmentProfile());
  const [livingSituation, setLivingSituation] = useState(
    profile?.personalInfo?.livingSituation || 'Cohabitation sous le même toit'
  );
  const [hasChildren, setHasChildren] = useState(
    profile?.childrenInfo?.hasChildren ?? false
  );
  const [childrenCount, setChildrenCount] = useState(
    profile?.childrenInfo?.childrenCount || 0
  );
  const [financialAutonomy, setFinancialAutonomy] = useState<string>(
    profile?.problemTypes?.financialControl ? 'Contrôle financier sévère' : 'Autonomie financière partielle'
  );
  const [surveillanceLevel, setSurveillanceLevel] = useState<string>(
    profile?.problemTypes?.cyberHarassment ? 'Espionnage numérique actif' : 'Surveillance modérée'
  );
  const [selectedRisks, setSelectedRisks] = useState<string[]>([
    'Menaces de violences ou escalade de tension',
    'Contrôle des communications et du téléphone',
    'Isolement relationnel et familial',
  ]);
  const [primaryGoal, setPrimaryGoal] = useState<string>(
    'Préparer un départ sécurisé et préserver mes droits'
  );

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
    setSelectedRisks((prev) =>
      prev.includes(risk) ? prev.filter((r) => r !== risk) : [...prev, risk]
    );
  };

  const handleSaveAndGenerate = () => {
    setIsGenerating(true);
    const updatedProfile: UserAssessmentProfile = {
      ...profile,
      isCompleted: true,
      lastUpdated: new Date().toISOString(),
      personalInfo: {
        ...profile.personalInfo,
        livingSituation,
      },
      childrenInfo: {
        ...profile.childrenInfo,
        hasChildren,
        childrenCount: hasChildren ? Math.max(1, childrenCount) : 0,
      },
      problemTypes: {
        ...profile.problemTypes,
        physicalViolence: selectedRisks.some((r) => r.includes('violences')),
        psychologicalAbuse: selectedRisks.some((r) => r.includes('Intimidation') || r.includes('Isolement')),
        financialControl: financialAutonomy.includes('Contrôle'),
        cyberHarassment: surveillanceLevel.includes('Espionnage'),
      },
    };

    StorageService.saveAssessmentProfile(updatedProfile);
    setProfile(updatedProfile);

    setTimeout(() => {
      setIsGenerating(false);
      setIsSaved(true);
      if (onPlanGenerated) onPlanGenerated();
      setTimeout(() => setIsSaved(false), 4000);
    }, 800);
  };

  return (
    <div id="main-screen-video-questions-hub" className="space-y-6">
      {/* 2-Column Responsive Screen: Video Screen on Left / Questionnaire on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Official Clip Video Screen (5/12 on LG) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#1E1E1E] text-white rounded-3xl border border-white/10 overflow-hidden shadow-xl">
            {/* Screen Header Bar */}
            <div className="px-4 py-3 bg-[#2A2A2A] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A64D4D] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5EAD9] flex items-center gap-1.5">
                  <Tv className="w-3.5 h-3.5 text-[#8A9A5B]" />
                  Écran Clip Vidéo Officiel
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8A9A5B]/30 text-[#E5EAD9] font-medium border border-[#8A9A5B]/40">
                Lecture en boucle
              </span>
            </div>

            {/* Main Video Frame (16:9) */}
            <div className="relative w-full aspect-video bg-black overflow-hidden group">
              <iframe
                id="main-screen-youtube-player"
                src={`https://www.youtube-nocookie.com/embed/hgHwXM7GYuk?autoplay=1&mute=${videoMuted ? 1 : 0}&loop=1&playlist=hgHwXM7GYuk&controls=1&showinfo=0&rel=0&modestbranding=1`}
                title="Theory of a Deadman - History of Violence"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Meta & Sound Info */}
            <div className="p-4 bg-[#242424] border-t border-white/5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    Theory of a Deadman — « History of Violence »
                  </h3>
                  <p className="text-xs text-[#CED6C1] mt-0.5">
                    Clip officiel de sensibilisation et résilience
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-[#8A9A5B] shrink-0">
                  <Music className="w-4 h-4" />
                </div>
              </div>

              {/* Quick Quote / Awareness context */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#E5EAD9] leading-relaxed">
                « Une œuvre musicale dédiée à la rupture du silence, à la protection des victimes et à la reconstruction de l'autonomie. »
              </div>
            </div>
          </div>

          {/* Quick Support / Safety Pin Box */}
          <div className="bg-[#FFFFFF]/90 backdrop-blur-md rounded-2xl border border-[#E5E2D9] p-4 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#3E3B39]">Protection & Confidentialité</h4>
                <p className="text-[11px] text-[#8E8B82]">Vos réponses restent chiffrées localement</p>
              </div>
            </div>
            {onOpenDetailedAssessment && (
              <button
                type="button"
                onClick={onOpenDetailedAssessment}
                className="px-3 py-1.5 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-medium transition-colors shrink-0 flex items-center gap-1"
              >
                <span>Bilan complet</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Primary Questions Assessment Form (7/12 on LG) */}
        <div className="lg:col-span-7">
          <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-3xl border border-[#CED6C1] p-6 shadow-md space-y-6">
            
            {/* Form Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E2D9]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shadow-2xs">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A5B]">
                    Formulaire Principal d'Évaluation
                  </span>
                  <h2 className="text-lg font-bold text-[#3E3B39]">
                    Questions Clés de Sûreté & Autonomie
                  </h2>
                </div>
              </div>

              {/* Progress steps */}
              <div className="flex items-center gap-1.5 text-xs bg-[#F8F7F2] px-3 py-1.5 rounded-xl border border-[#E5E2D9]">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center transition-colors ${
                    activeStep === 1 ? 'bg-[#5A5A40] text-white' : 'text-[#8E8B82] hover:bg-[#E5EAD9]'
                  }`}
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center transition-colors ${
                    activeStep === 2 ? 'bg-[#5A5A40] text-white' : 'text-[#8E8B82] hover:bg-[#E5EAD9]'
                  }`}
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center transition-colors ${
                    activeStep === 3 ? 'bg-[#5A5A40] text-white' : 'text-[#8E8B82] hover:bg-[#E5EAD9]'
                  }`}
                >
                  3
                </button>
              </div>
            </div>

            {/* STEP 1: Cadre de vie & Logement */}
            {activeStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-bold text-[#5A5A40] mb-2 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#8A9A5B]" />
                    1. Quelle est votre situation de résidence actuelle ?
                  </label>
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
                        onClick={() => setLivingSituation(opt)}
                        className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                          livingSituation === opt
                            ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-bold shadow-xs ring-1 ring-[#8A9A5B]'
                            : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-[#5A5A40] mb-2 flex items-center gap-1.5">
                    <Baby className="w-4 h-4 text-[#8A9A5B]" />
                    2. Y a-t-il des enfants à charge ou des mineurs dans le foyer ?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setHasChildren(false)}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                        !hasChildren
                          ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-bold shadow-xs'
                          : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
                      }`}
                    >
                      <div className="font-bold">Non (Sans enfant)</div>
                      <div className="text-[11px] text-[#8E8B82] mt-0.5">Focus sur l'autonomie personnelle</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setHasChildren(true);
                        if (childrenCount === 0) setChildrenCount(1);
                      }}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                        hasChildren
                          ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-bold shadow-xs'
                          : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
                      }`}
                    >
                      <div className="font-bold">Oui (Avec enfant·s)</div>
                      <div className="text-[11px] text-[#8E8B82] mt-0.5">Protection conjointe requise</div>
                    </button>
                  </div>

                  {hasChildren && (
                    <div className="mt-3 p-3 rounded-2xl bg-[#F8F7F2] border border-[#E5E2D9] flex items-center gap-3">
                      <span className="text-xs text-[#5A5A40] font-medium">Nombre d'enfants :</span>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setChildrenCount(num)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                              childrenCount === num
                                ? 'bg-[#5A5A40] text-white'
                                : 'bg-white border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#E5EAD9]'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="px-4 py-2 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <span>Étape suivante</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Facteurs de risque et surveillance */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-bold text-[#5A5A40] mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#A64D4D]" />
                    3. Sélectionnez les indicateurs ou pressions constatés :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {riskOptions.map((risk) => {
                      const isSelected = selectedRisks.includes(risk);
                      return (
                        <button
                          key={risk}
                          type="button"
                          onClick={() => handleToggleRisk(risk)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2 ${
                            isSelected
                              ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-medium'
                              : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-md mt-0.5 shrink-0 flex items-center justify-center ${
                              isSelected ? 'bg-[#5A5A40] text-white' : 'border border-[#CED6C1]'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                          <span>{risk}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#5A5A40] mb-1.5">
                      Contrôle financier :
                    </label>
                    <select
                      value={financialAutonomy}
                      onChange={(e) => setFinancialAutonomy(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#CED6C1] bg-white text-[#3E3B39] focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                    >
                      <option value="Autonomie financière totale">Autonomie financière totale</option>
                      <option value="Autonomie financière partielle">Autonomie financière partielle</option>
                      <option value="Contrôle financier sévère">Contrôle financier sévère (privation)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5A5A40] mb-1.5">
                      Niveau de surveillance tech :
                    </label>
                    <select
                      value={surveillanceLevel}
                      onChange={(e) => setSurveillanceLevel(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#CED6C1] bg-white text-[#3E3B39] focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                    >
                      <option value="Pas de surveillance détectée">Pas de surveillance détectée</option>
                      <option value="Surveillance modérée">Surveillance modérée</option>
                      <option value="Espionnage numérique actif">Espionnage numérique actif (traque)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="px-3.5 py-2 bg-white border border-[#E5E2D9] hover:bg-[#F8F7F2] text-[#5A5A40] text-xs font-bold rounded-xl transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="px-4 py-2 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <span>Étape suivante</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Objectifs et Validation Immédiate */}
            {activeStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-bold text-[#5A5A40] mb-2 flex items-center gap-1.5">
                    <BookmarkCheck className="w-4 h-4 text-[#8A9A5B]" />
                    4. Quel est votre objectif prioritaire aujourd'hui ?
                  </label>
                  <div className="space-y-2">
                    {[
                      'Préparer un départ sécurisé et préserver mes droits',
                      'Sécuriser mes preuves et documents confidentiels',
                      'Organiser un réseau d’alerte discret avec mes proches',
                      'Évaluer calmement la situation sans action précipitée',
                    ].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setPrimaryGoal(goal)}
                        className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                          primaryGoal === goal
                            ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39] font-bold shadow-xs'
                            : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
                        }`}
                      >
                        <span>{goal}</span>
                        {primaryGoal === goal && <CheckCircle2 className="w-4 h-4 text-[#5A5A40]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary summary pill */}
                <div className="p-3.5 rounded-2xl bg-[#F8F7F2] border border-[#E5E2D9] text-xs text-[#5A5A40] space-y-1.5">
                  <div className="font-bold text-[#3E3B39]">Récapitulatif de votre profil :</div>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#CED6C1]">
                      {livingSituation}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#CED6C1]">
                      {hasChildren ? `${childrenCount} enfant(s)` : 'Sans enfant'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#CED6C1]">
                      {selectedRisks.length} facteur(s) de risque
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="px-3.5 py-2 bg-white border border-[#E5E2D9] hover:bg-[#F8F7F2] text-[#5A5A40] text-xs font-bold rounded-xl transition-colors"
                  >
                    Retour
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAndGenerate}
                    disabled={isGenerating}
                    className="px-5 py-2.5 bg-[#8A9A5B] hover:bg-[#78884d] text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Mise à jour en cours...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Valider et actualiser mon plan de sûreté</span>
                      </>
                    )}
                  </button>
                </div>

                {isSaved && (
                  <div className="p-3 rounded-xl bg-[#E5EAD9] text-[#5A5A40] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-[#8A9A5B]" />
                    <span>Vos réponses ont été enregistrées localement et votre protocole a été actualisé !</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
