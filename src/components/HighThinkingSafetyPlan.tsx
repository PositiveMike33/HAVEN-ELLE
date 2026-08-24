import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  CheckCircle, 
  RefreshCw, 
  Lock, 
  Printer, 
  Sparkles, 
  PhoneCall, 
  MapPin, 
  MessageSquareLock, 
  HeartHandshake, 
  Luggage, 
  Plus, 
  Trash2, 
  Lightbulb, 
  ExternalLink,
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import { DetailedSafetyPlan } from '../types';
import { StorageService, INITIAL_SAFETY_PLAN } from '../utils/storage';
import { CompanionMemoryService } from '../utils/companionMemory';

interface HighThinkingSafetyPlanProps {
  onNavigateToRelaxation?: () => void;
  onNavigateToContacts?: () => void;
}

export const HighThinkingSafetyPlan: React.FC<HighThinkingSafetyPlanProps> = ({ 
  onNavigateToRelaxation,
  onNavigateToContacts,
}) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<DetailedSafetyPlan>(() => StorageService.getSafetyPlan());
  const [activeTab, setActiveTab] = useState<'all' | 'contacts' | 'locations' | 'comms' | 'coping' | 'checklist'>('all');
  
  // Custom suggestion modal
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [suggestionTitle, setSuggestionTitle] = useState('');
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // New checklist item input
  const [newChecklistTask, setNewChecklistTask] = useState('');
  const [newChecklistCategory, setNewChecklistCategory] = useState<'documents' | 'finances' | 'essentials' | 'children' | 'tech'>('essentials');

  // Input Assessment Form synced with Confidential Assessment Profile if present
  const [formData, setFormData] = useState(() => {
    const assessment = StorageService.getAssessmentProfile();
    const hasChildren = assessment?.childrenInfo?.hasChildren ?? true;
    const selectedRisks: string[] = [];
    if (assessment?.problemTypes?.physicalViolence) selectedRisks.push('Menaces de mort ou de violences physiques');
    if (assessment?.problemTypes?.cyberHarassment) selectedRisks.push('Contrôle des déplacements et du téléphone');
    if (assessment?.problemTypes?.psychologicalAbuse) selectedRisks.push('Isolement des proches et de la famille');
    if (assessment?.problemTypes?.financialControl) selectedRisks.push('Violence économique (privation d’argent, compte bloqué)');
    if (assessment?.problemTypes?.threatsAndBlackmail) selectedRisks.push('Menaces d’enlever les enfants en cas de séparation');

    return {
      livingSituation: assessment?.personalInfo?.livingSituation || 'Cohabitation avec le partenaire violent',
      hasChildren: hasChildren,
      financialDependency: assessment?.problemTypes?.financialControl ?? true,
      techSurveillance: assessment?.problemTypes?.cyberHarassment ?? true,
      selectedRisks: selectedRisks.length > 0 ? selectedRisks : [
        'Menaces de mort ou de violences physiques',
        'Contrôle des déplacements et du téléphone',
        'Isolement des proches et de la famille',
      ],
    };
  });

  const riskOptions = [
    'Menaces de mort ou de violences physiques',
    'Contrôle des déplacements et du téléphone',
    'Isolement des proches et de la famille',
    'Violence économique (privation d’argent, compte bloqué)',
    'Présence d’armes à feu ou d’objets dangereux au domicile',
    'Escalade de la violence sous l’emprise d’alcool ou de drogues',
    'Menaces d’enlever les enfants en cas de séparation',
    'Rapprochement ou filature lors des sorties',
  ];

  useEffect(() => {
    StorageService.saveSafetyPlan(plan);
  }, [plan]);

  const toggleRisk = (risk: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedRisks: prev.selectedRisks.includes(risk)
        ? prev.selectedRisks.filter((r) => r !== risk)
        : [...prev.selectedRisks, risk],
    }));
  };

  const handleToggleChecklistItem = (id: string) => {
    const updatedChecklist = plan.immediateChecklist.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    const updatedPlan = { ...plan, immediateChecklist: updatedChecklist };
    setPlan(updatedPlan);
    StorageService.saveSafetyPlan(updatedPlan);
    CompanionMemoryService.updateSafetyPlanMilestone(updatedPlan);
  };

  const handleAddChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistTask.trim()) return;

    const newItem = {
      id: `chk-${Date.now()}`,
      task: newChecklistTask.trim(),
      category: newChecklistCategory,
      isCompleted: false,
      priority: 'vital' as const,
    };

    const updatedPlan = {
      ...plan,
      immediateChecklist: [...plan.immediateChecklist, newItem],
    };
    setPlan(updatedPlan);
    setNewChecklistTask('');
  };

  const handleDeleteChecklistItem = (id: string) => {
    const updatedPlan = {
      ...plan,
      immediateChecklist: plan.immediateChecklist.filter((item) => item.id !== id),
    };
    setPlan(updatedPlan);
  };

  const generateFullSafetyPlan = async () => {
    setLoading(true);
    try {
      const contacts = StorageService.getContacts();
      const contactsSummary = contacts.map(c => `${c.name} (${c.relationship})`).join(', ');
      const companionContext = CompanionMemoryService.getSystemContextPrompt();

      const response = await fetch('/api/gemini/safety-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          riskFactors: formData.selectedRisks,
          livingSituation: formData.livingSituation,
          hasChildren: formData.hasChildren,
          financialDependency: formData.financialDependency,
          techSurveillance: formData.techSurveillance,
          emergencyContactsSummary: contactsSummary,
          companionContext,
          mode: 'full_plan',
        }),
      });

      const data = await response.json();
      if (data.plan) {
        setPlan(data.plan);
        StorageService.saveSafetyPlan(data.plan);
        CompanionMemoryService.updateSafetyPlanMilestone(data.plan);
      }
    } catch (err) {
      console.error('Error generating safety plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const requestSectionSuggestions = async (sectionName: string, promptText: string) => {
    setSuggestionTitle(sectionName);
    setSuggestionModalOpen(true);
    setLoadingSuggestions(true);
    setSuggestionsList([]);

    try {
      const response = await fetch('/api/gemini/safety-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'section_suggestion',
          targetSection: sectionName,
          userPrompt: promptText,
          riskFactors: formData.selectedRisks,
          hasChildren: formData.hasChildren,
        }),
      });

      const data = await response.json();
      if (data.suggestions) {
        setSuggestionsList(data.suggestions);
      }
    } catch (err) {
      console.error('Error getting section suggestions:', err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const completedChecklistCount = plan.immediateChecklist.filter(i => i.isCompleted).length;
  const totalChecklistCount = plan.immediateChecklist.length;
  const checklistPercent = totalChecklistCount > 0 ? Math.round((completedChecklistCount / totalChecklistCount) * 100) : 0;

  return (
    <div id="safety-plan-main-container" className="space-y-6">
      {/* Assessment & Generation Card */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E5E2D9]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shadow-2xs">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A5B]">
                Protection Personnalisée & Raisonnement Approfondi
              </span>
              <h2 className="text-lg md:text-xl font-bold text-[#3E3B39] font-serif-natural tracking-tight">
                Plan de Sûreté & Protocole de Départ
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Imprimer / PDF
            </button>
          </div>
        </div>

        {/* Risk factors selection */}
        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-[#5A5A40] block mb-2">
              1. Sélectionnez les facteurs de risque présents dans votre situation :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {riskOptions.map((risk, i) => {
                const isSelected = formData.selectedRisks.includes(risk);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleRisk(risk)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2 ${
                      isSelected
                        ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#5A5A40] font-medium'
                        : 'bg-[#F8F7F2] border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F5F2ED]'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-[#8A9A5B] text-white' : 'border border-[#E5E2D9] bg-white'
                    }`}>
                      {isSelected && <CheckCircle className="w-3 h-3" />}
                    </span>
                    <span className="leading-snug text-[#3E3B39] text-[11px]">{risk}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9]">
              <span className="text-xs font-semibold text-[#5A5A40] block mb-1.5">Présence d'enfants</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hasChildren: true })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
                    formData.hasChildren ? 'bg-[#5A5A40] text-white' : 'bg-white border border-[#E5E2D9] text-[#5A5A40]'
                  }`}
                >
                  Oui
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hasChildren: false })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
                    !formData.hasChildren ? 'bg-[#5A5A40] text-white' : 'bg-white border border-[#E5E2D9] text-[#5A5A40]'
                  }`}
                >
                  Non
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9]">
              <span className="text-xs font-semibold text-[#5A5A40] block mb-1.5">Dépendance financière</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, financialDependency: true })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
                    formData.financialDependency ? 'bg-[#5A5A40] text-white' : 'bg-white border border-[#E5E2D9] text-[#5A5A40]'
                  }`}
                >
                  Oui
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, financialDependency: false })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
                    !formData.financialDependency ? 'bg-[#5A5A40] text-white' : 'bg-white border border-[#E5E2D9] text-[#5A5A40]'
                  }`}
                >
                  Non
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9]">
              <span className="text-xs font-semibold text-[#5A5A40] block mb-1.5">Surveillance numérique</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, techSurveillance: true })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
                    formData.techSurveillance ? 'bg-[#5A5A40] text-white' : 'bg-white border border-[#E5E2D9] text-[#5A5A40]'
                  }`}
                >
                  Soupçonnée
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, techSurveillance: false })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
                    !formData.techSurveillance ? 'bg-[#5A5A40] text-white' : 'bg-white border border-[#E5E2D9] text-[#5A5A40]'
                  }`}
                >
                  Non
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              id="generate-safety-plan-btn"
              onClick={generateFullSafetyPlan}
              disabled={loading}
              className="w-full py-3.5 bg-[#8A9A5B] hover:bg-[#78884d] disabled:opacity-50 text-white font-bold text-xs md:text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Gemini 3.1 Pro élabore votre protocole de sécurité et vos 5 piliers de protection...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  GÉNÉRER MON PLAN DE SÛRETÉ COMPLET AVEC L'IA
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'all' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'bg-white border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
          }`}
        >
          Vue Globale
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'contacts' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'bg-white border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" /> 1. Contacts & Alerte
        </button>
        <button
          onClick={() => setActiveTab('locations')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'locations' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'bg-white border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" /> 2. Lieux Sûrs & Refuges
        </button>
        <button
          onClick={() => setActiveTab('comms')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'comms' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'bg-white border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
          }`}
        >
          <MessageSquareLock className="w-3.5 h-3.5" /> 3. Communication & Tech
        </button>
        <button
          onClick={() => setActiveTab('coping')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'coping' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'bg-white border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" /> 4. Apaisement & Mental
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'checklist' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'bg-white border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2]'
          }`}
        >
          <Luggage className="w-3.5 h-3.5" /> 5. Sac de Départ ({completedChecklistCount}/{totalChecklistCount})
        </button>
      </div>

      {/* Main Plan Sections */}
      <div className="space-y-6">
        {/* Threat Level & Summary Banner */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8E8B82]">Niveau d'Urgence Évalué :</span>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#F5E6E0] text-[#A64D4D] border border-[#A64D4D]/30">
                {plan.threatLevel}
              </span>
              <span className="text-[11px] text-[#8E8B82] ml-2">Mis à jour le {plan.lastUpdated}</span>
            </div>
            <p className="text-xs text-[#5A5A40] leading-relaxed">{plan.summary}</p>
          </div>
        </div>

        {/* SECTION 1: Contacts d'Urgence & Protocole d'Alerte */}
        {(activeTab === 'all' || activeTab === 'contacts') && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#3E3B39] font-serif-natural">
                    1. Contacts d'Urgence & Protocole d'Alerte
                  </h3>
                  <p className="text-[11px] text-[#8E8B82]">Réseau de confiance, mots de code et consigne de déclenchement.</p>
                </div>
              </div>

              <button
                onClick={() => requestSectionSuggestions('Mots de code secret & alertes', 'Propose 4 mots de code anodins et efficaces pour alerter mes proches sans éveiller de soupçons.')}
                className="text-xs font-medium text-[#5A5A40] hover:text-[#3E3B39] bg-[#F8F7F2] hover:bg-[#E5EAD9] px-2.5 py-1.5 rounded-xl border border-[#E5E2D9] flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#8A9A5B]" /> Idées de mots codés IA
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="text-xs font-bold text-[#5A5A40] flex items-center justify-between">
                  <span>Organisation des Contacts</span>
                  {onNavigateToContacts && (
                    <button 
                      onClick={onNavigateToContacts}
                      className="text-[11px] text-[#8A9A5B] hover:underline font-semibold"
                    >
                      Gérer mes contacts →
                    </button>
                  )}
                </h4>
                <p className="text-xs text-[#3E3B39] leading-relaxed">
                  {plan.emergencyContactsProtocol.contactsSummary}
                </p>
              </div>

              <div className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="text-xs font-bold text-[#5A5A40]">Mots de Code Secrets Confinés</h4>
                <div className="flex flex-wrap gap-1.5">
                  {plan.emergencyContactsProtocol.secretTriggerWords.map((word, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white rounded-lg border border-[#E5E2D9] text-xs font-mono font-medium text-[#A64D4D]">
                      « {word} »
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-[#8E8B82] pt-1">
                  <strong>Action sur réception :</strong> {plan.emergencyContactsProtocol.actionOnTrigger}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Lieux Sécurisés & Refuges Désignés */}
        {(activeTab === 'all' || activeTab === 'locations') && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#3E3B39] font-serif-natural">
                    2. Lieux Sécurisés & Refuges Désignés
                  </h3>
                  <p className="text-[11px] text-[#8E8B82]">Points de repli immédiat, itinéraire de fuite et gestion des clés.</p>
                </div>
              </div>

              <button
                onClick={() => requestSectionSuggestions('Itinéraires et sécurité des clés', 'Comment organiser la fuite du domicile et cacher un double de clés sans que le partenaire ne s\'en aperçoive ?')}
                className="text-xs font-medium text-[#5A5A40] hover:text-[#3E3B39] bg-[#F8F7F2] hover:bg-[#E5EAD9] px-2.5 py-1.5 rounded-xl border border-[#E5E2D9] flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#8A9A5B]" /> Conseils itinéraire & clés
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="text-xs font-bold text-[#5A5A40]">Hébergements de Repli</h4>
                <div className="space-y-1.5 text-xs text-[#3E3B39]">
                  <div className="p-2 bg-white rounded-lg border border-[#E5E2D9]">
                    <span className="font-semibold text-[#8A9A5B] block text-[11px]">Refuge Principal :</span>
                    {plan.safeLocations.primaryShelter}
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E5E2D9]">
                    <span className="font-semibold text-[#5A5A40] block text-[11px]">Refuge Secondaire / Urgence :</span>
                    {plan.safeLocations.secondaryShelter}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="text-xs font-bold text-[#5A5A40]">Consignes d'Itinéraire & Clés</h4>
                <ul className="space-y-1 text-xs text-[#3E3B39]">
                  {plan.safeLocations.safeRouteGuidelines.map((guideline, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#8A9A5B] shrink-0 mt-0.5" />
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-[#5A5A40] pt-1.5 border-t border-[#E5E2D9]">
                  <strong>Stratégie des clés :</strong> {plan.safeLocations.accessKeysStrategy}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Stratégies de Communication & Hygiène Numérique */}
        {(activeTab === 'all' || activeTab === 'comms') && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
                  <MessageSquareLock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#3E3B39] font-serif-natural">
                    3. Stratégies de Communication & Hygiène Numérique
                  </h3>
                  <p className="text-[11px] text-[#8E8B82]">Phrases anodines camouflées et détection de surveillance.</p>
                </div>
              </div>

              <button
                onClick={() => requestSectionSuggestions('Cybersécurité et surveillance', 'Quelles précautions prendre pour ne laisser aucune trace de communication sur un téléphone partagé ou sous surveillance ?')}
                className="text-xs font-medium text-[#5A5A40] hover:text-[#3E3B39] bg-[#F8F7F2] hover:bg-[#E5EAD9] px-2.5 py-1.5 rounded-xl border border-[#E5E2D9] flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#8A9A5B]" /> Astuces Hygiène Numérique
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="text-xs font-bold text-[#5A5A40]">Phrases Camouflées du Quotidien</h4>
                <div className="space-y-1.5">
                  {plan.communicationStrategies.camouflageKeywords.map((phrase, i) => (
                    <div key={i} className="p-2 bg-white rounded-lg border border-[#E5E2D9] text-xs text-[#3E3B39] font-mono">
                      💬 {phrase}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#8E8B82]">
                  <strong>Plage horaire sûre :</strong> {plan.communicationStrategies.safeCommunicationHours}
                </p>
              </div>

              <div className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="text-xs font-bold text-[#5A5A40]">Règles de Protection des Traces</h4>
                <ul className="space-y-1 text-xs text-[#3E3B39]">
                  {plan.communicationStrategies.digitalHygieneTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8A9A5B] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Mécanismes d'Apaisement & Régulation Émotionnelle */}
        {(activeTab === 'all' || activeTab === 'coping') && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#3E3B39] font-serif-natural">
                    4. Mécanismes d'Apaisement & Régulation Émotionnelle
                  </h3>
                  <p className="text-[11px] text-[#8E8B82]">Désamorçage de la sidération, ancrage sensoriel et affirmations.</p>
                </div>
              </div>

              {onNavigateToRelaxation && (
                <button
                  onClick={onNavigateToRelaxation}
                  className="text-xs font-medium text-white bg-[#5A5A40] hover:bg-[#4a4a35] px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E5EAD9]" /> Séance Anti-Panique Thérapeutique
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="text-xs font-bold text-[#5A5A40]">Exercices du Système Nerveux</h4>
                <ul className="space-y-1.5 text-xs text-[#3E3B39]">
                  {plan.copingMechanisms.nervousSystemExercises.map((ex, i) => (
                    <li key={i} className="p-2 bg-white rounded-lg border border-[#E5E2D9] leading-relaxed">
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="text-xs font-bold text-[#5A5A40]">Points d'Ancrage Sensoriels</h4>
                <ul className="space-y-1.5 text-xs text-[#3E3B39]">
                  {plan.copingMechanisms.groundingAnchors.map((anchor, i) => (
                    <li key={i} className="p-2 bg-white rounded-lg border border-[#E5E2D9] leading-relaxed">
                      🌿 {anchor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#E5EAD9]/40 rounded-2xl border border-[#CED6C1] space-y-2">
                <h4 className="text-xs font-bold text-[#5A5A40]">Affirmations de Force</h4>
                <div className="space-y-1.5 text-xs text-[#3E3B39]">
                  {plan.copingMechanisms.empoweringAffirmations.map((aff, i) => (
                    <div key={i} className="p-2 bg-white rounded-lg border border-[#CED6C1] italic leading-relaxed">
                      « {aff} »
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Checklist Immédiate & Sac de Départ */}
        {(activeTab === 'all' || activeTab === 'checklist') && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
                  <Luggage className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#3E3B39] font-serif-natural">
                    5. Checklist Immédiate & Sac de Départ (Urgence 24h)
                  </h3>
                  <p className="text-[11px] text-[#8E8B82]">
                    Éléments vitaux prêts à être emportés sans délai.
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-bold text-[#5A5A40]">
                    {completedChecklistCount} / {totalChecklistCount} prêts ({checklistPercent}%)
                  </span>
                </div>
                <div className="w-28 h-2.5 bg-[#E5E2D9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#8A9A5B] transition-all duration-300 rounded-full" 
                    style={{ width: `${checklistPercent}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Checklist Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {plan.immediateChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleChecklistItem(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                    item.isCompleted
                      ? 'bg-[#E5EAD9]/50 border-[#CED6C1] text-[#3E3B39]'
                      : 'bg-[#F8F7F2] border-[#E5E2D9] hover:bg-white text-[#3E3B39]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      item.isCompleted ? 'bg-[#8A9A5B] text-white' : 'border border-[#CED6C1] bg-white'
                    }`}>
                      {item.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <span className={`text-xs block leading-snug ${item.isCompleted ? 'line-through text-[#8E8B82]' : 'font-medium'}`}>
                        {item.task}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-[#8E8B82] mt-0.5 block">
                        {item.category} • {item.priority === 'vital' ? 'Priorité vitale' : 'Important'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChecklistItem(item.id);
                    }}
                    className="text-[#8E8B82] hover:text-[#A64D4D] p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Item Form */}
            <form onSubmit={handleAddChecklistItem} className="pt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Ajouter un élément à préparer (ex: Double de carte bancaire, doudou enfant)..."
                value={newChecklistTask}
                onChange={(e) => setNewChecklistTask(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E5E2D9] text-xs text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
              />
              <select
                value={newChecklistCategory}
                onChange={(e: any) => setNewChecklistCategory(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-[#E5E2D9] text-xs text-[#5A5A40] bg-white focus:outline-none"
              >
                <option value="documents">Documents</option>
                <option value="finances">Finances</option>
                <option value="essentials">Essentiels</option>
                <option value="children">Enfants</option>
                <option value="tech">Technologie</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </form>
          </div>
        )}

        {/* Hotlines summary bar */}
        <div className="p-5 rounded-3xl bg-[#5A5A40] text-white text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#E5EAD9] text-sm font-serif-natural">
              Numéros d'Urgence Gratuits & Sans Trace
            </span>
            <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
              Disponibles 24h/7
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {plan.legalAndHotlines?.numbers?.map((num, i) => (
              <span key={i} className="px-3.5 py-1.5 bg-white/15 rounded-xl border border-white/20 text-[#F8F7F2] font-mono text-xs font-semibold">
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestion Modal */}
      {suggestionModalOpen && (
        <div className="fixed inset-0 bg-[#3E3B39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E5E2D9] animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#3E3B39] font-serif-natural">
                Suggestions HAVEN-ELLE • {suggestionTitle}
              </h3>
            </div>

            {loadingSuggestions ? (
              <div className="py-8 text-center space-y-3">
                <RefreshCw className="w-6 h-6 animate-spin text-[#8A9A5B] mx-auto" />
                <p className="text-xs text-[#8E8B82]">Élaboration de suggestions sécurisées...</p>
              </div>
            ) : (
              <div className="space-y-2.5 my-4">
                {suggestionsList.map((sug, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#F8F7F2] border border-[#E5E2D9] text-xs text-[#3E3B39] leading-relaxed">
                    💡 {sug}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setSuggestionModalOpen(false)}
              className="w-full py-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-semibold rounded-xl"
            >
              Fermer les suggestions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
