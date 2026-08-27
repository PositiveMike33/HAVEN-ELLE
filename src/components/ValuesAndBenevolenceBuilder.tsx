import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Crown, 
  Compass, 
  Feather, 
  Flame, 
  Sun, 
  Award, 
  Plus, 
  Check, 
  X, 
  Trash2, 
  BookmarkCheck, 
  Eye, 
  BookOpen, 
  HelpCircle,
  Zap,
  Headphones,
  Info,
  CheckCircle2,
  Volume2,
  ExternalLink,
  Play,
  Video
} from 'lucide-react';
import { 
  PRESET_CORE_VALUES, 
  BENEVOLENT_SELF_AFFIRMATIONS, 
  TOLTEC_AGREEMENTS_VALUES,
  TOLTEC_AUDIOBOOKS_INFO,
  TOLTEC_SEMINAR_VIDEO,
  CoreValueItem 
} from '../data/valuesAndBenevolenceData';
import { CompanionMemoryService } from '../utils/companionMemory';

const USER_VALUES_STORAGE_KEY = 'haven_user_selected_values_v1';

interface ValuesBuilderProps {
  onValuesUpdated?: () => void;
  onPointsEarned?: (newTotal: number) => void;
}

export const ValuesAndBenevolenceBuilder: React.FC<ValuesBuilderProps> = ({
  onValuesUpdated,
  onPointsEarned
}) => {
  const [selectedValues, setSelectedValues] = useState<CoreValueItem[]>(() => {
    try {
      const saved = localStorage.getItem(USER_VALUES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    // Default 5 foundation values: The 5 Toltec Agreements
    return TOLTEC_AGREEMENTS_VALUES;
  });

  const [customValueName, setCustomValueName] = useState('');
  const [customValueVision, setCustomValueVision] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [activeTab, setActiveTab] = useState<'my_list' | 'toltec_wisdom' | 'preset_gallery' | 'benevolent_mirror'>('my_list');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedToltecDetail, setSelectedToltecDetail] = useState<CoreValueItem | null>(null);
  const [isVideoExpanded, setIsVideoExpanded] = useState(true);
  const [hasClaimedSeminarPoints, setHasClaimedSeminarPoints] = useState(() => {
    return localStorage.getItem('haven_claimed_toltec_seminar_pts') === 'true';
  });
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(USER_VALUES_STORAGE_KEY, JSON.stringify(selectedValues));
    } catch (e) {
      console.error(e);
    }
  }, [selectedValues]);

  const handleClaimSeminarPoints = () => {
    if (hasClaimedSeminarPoints) {
      setActionFeedback("Points déjà crédités pour ce séminaire ! Bonne écoute.");
      setTimeout(() => setActionFeedback(null), 3000);
      return;
    }
    const updated = CompanionMemoryService.addResiliencePoints(25, 'Séminaire résumé des 2 Livres Audios Toltèques écouté');
    if (onPointsEarned) onPointsEarned(updated.resiliencePoints);
    setHasClaimedSeminarPoints(true);
    localStorage.setItem('haven_claimed_toltec_seminar_pts', 'true');
    setActionFeedback("+25 pts ! Séminaire résumé des 2 Livres Audios Toltèques validé.");
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleApplyAll5Toltec = () => {
    setSelectedValues(TOLTEC_AGREEMENTS_VALUES);
    const updated = CompanionMemoryService.addResiliencePoints(35, 'Les 5 Accords Toltèques intégrés comme charte sacrée');
    if (onPointsEarned) onPointsEarned(updated.resiliencePoints);
    setActionFeedback("+35 pts ! Les 5 Accords Toltèques (2 Livres Audios) ont été activés dans votre charte sacrée.");
    setTimeout(() => setActionFeedback(null), 4000);
    if (onValuesUpdated) onValuesUpdated();
  };

  const handleTogglePreset = (item: CoreValueItem) => {
    const isSelected = selectedValues.some(v => v.id === item.id);
    let newValues: CoreValueItem[];
    if (isSelected) {
      if (selectedValues.length <= 1) {
        alert("Conservez au moins une valeur fondamentale pour maintenir votre boussole de bienveillance.");
        return;
      }
      newValues = selectedValues.filter(v => v.id !== item.id);
    } else {
      if (selectedValues.length >= 8) {
        alert("Pour une clarté maximale de votre esprit, nous recommandons de choisir entre 3 et 7 valeurs fondamentales.");
        return;
      }
      newValues = [...selectedValues, item];
      // Reward points for adding a value
      const updated = CompanionMemoryService.addResiliencePoints(15, `Valeur ajoutée : ${item.name}`);
      if (onPointsEarned) onPointsEarned(updated.resiliencePoints);
      setActionFeedback(`+15 pts ! Valeur « ${item.name} » intégrée à votre charte.`);
      setTimeout(() => setActionFeedback(null), 3500);
    }
    setSelectedValues(newValues);
    if (onValuesUpdated) onValuesUpdated();
  };

  const handleAddCustomValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customValueName.trim()) return;

    const newItem: CoreValueItem = {
      id: `custom_${Date.now()}`,
      name: customValueName.trim(),
      category: 'Dignité & Respect',
      definition: 'Valeur personnalisée essentielle pour mon cheminement.',
      benevolentVision: customValueVision.trim() || `En honorant ${customValueName.trim()}, je choisis de me voir avec respect et profonde bienveillance.`,
      dailyMicroAction: `Prendre un instant pour incarner ${customValueName.trim()} dans mes décisions aujourd'hui.`,
      iconName: 'Sparkles',
      color: '#385117'
    };

    const newValues = [...selectedValues, newItem];
    setSelectedValues(newValues);
    setCustomValueName('');
    setCustomValueVision('');
    setIsAddingCustom(false);

    const updated = CompanionMemoryService.addResiliencePoints(20, `Valeur personnalisée créée : ${newItem.name}`);
    if (onPointsEarned) onPointsEarned(updated.resiliencePoints);
    setActionFeedback(`+20 pts ! Nouvelle valeur sacrée créée : « ${newItem.name} »`);
    setTimeout(() => setActionFeedback(null), 3500);

    if (onValuesUpdated) onValuesUpdated();
  };

  const handleDeleteValue = (id: string, name: string) => {
    if (selectedValues.length <= 1) {
      alert("Conservez au moins une valeur fondamentale pour guider votre regard bienveillant.");
      return;
    }
    const newValues = selectedValues.filter(v => v.id !== id);
    setSelectedValues(newValues);
    if (onValuesUpdated) onValuesUpdated();
  };

  const handleReciteBenevolentMantra = (mantra: string) => {
    const updated = CompanionMemoryService.addResiliencePoints(15, 'Affirmation de Bienveillance Intérieure récitée');
    if (onPointsEarned) onPointsEarned(updated.resiliencePoints);
    setActionFeedback("+15 pts ! Regard bienveillant activé avec succès.");
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const areAll5ToltecSelected = TOLTEC_AGREEMENTS_VALUES.every(tv => selectedValues.some(sv => sv.id === tv.id));

  const filteredPresetValues = categoryFilter === 'all' 
    ? PRESET_CORE_VALUES 
    : categoryFilter === 'toltec'
      ? TOLTEC_AGREEMENTS_VALUES
      : PRESET_CORE_VALUES.filter(v => v.category === categoryFilter);

  return (
    <div className="bg-[#FAF9F6] rounded-3xl border-2 border-[#CED6C1] p-6 md:p-8 space-y-6 shadow-xs">
      {/* Toast Feedback */}
      {actionFeedback && (
        <div className="bg-[#E5EED6] border-2 border-[#506B26] p-3.5 rounded-2xl flex items-center justify-between text-xs font-bold text-[#18210E] shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#385117]" />
            <span>{actionFeedback}</span>
          </div>
          <span className="bg-[#385117] text-white px-2.5 py-0.5 rounded-full text-[11px]">
            Bienveillance Active
          </span>
        </div>
      )}

      {/* Header of the Values Builder Module */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D5D0C2] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EED6] text-[#2E4313] text-xs font-bold uppercase tracking-wider mb-2 border border-[#8DA765]/30">
            <Heart className="w-3.5 h-3.5 text-[#385117]" />
            Cycle 1 (Niveaux 1 à 25) • Socle Fondateur & Sagesse Toltèque
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#1F201C] flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#385117]" />
            Ma Boussole de Valeurs & Les 5 Accords Toltèques
          </h3>
          <p className="text-sm text-[#403E3A] font-medium mt-1 max-w-2xl">
            Construisez votre boussole de valeurs sacrées inspirée des 2 chefs-d'œuvre audio de Don Miguel Ruiz et Don Jose Ruiz. Elles constituent votre bouclier d'amour et de paix intérieure.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center bg-[#EAE7DE] p-1 rounded-2xl border border-[#D0CABE] gap-1 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('my_list')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my_list'
                ? 'bg-white text-[#1F201C] shadow-xs'
                : 'text-[#5C5952] hover:text-[#1F201C]'
            }`}
          >
            Ma Charte ({selectedValues.length})
          </button>
          <button
            onClick={() => setActiveTab('toltec_wisdom')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'toltec_wisdom'
                ? 'bg-[#385117] text-white shadow-xs'
                : 'text-[#5C5952] hover:text-[#1F201C]'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            Les 5 Accords (Livres Audios)
          </button>
          <button
            onClick={() => setActiveTab('preset_gallery')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'preset_gallery'
                ? 'bg-white text-[#1F201C] shadow-xs'
                : 'text-[#5C5952] hover:text-[#1F201C]'
            }`}
          >
            Catalogue des Valeurs
          </button>
          <button
            onClick={() => setActiveTab('benevolent_mirror')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'benevolent_mirror'
                ? 'bg-white text-[#1F201C] shadow-xs'
                : 'text-[#5C5952] hover:text-[#1F201C]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#385117]" />
            Miroir Bienveillant
          </button>
        </div>
      </div>

      {/* Special Toltec Banner Shortcut */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F0F5E8] via-[#E8F0DC] to-[#F8F7F4] border-2 border-[#506B26]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#385117] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#18210E]">
                Les 5 Accords Toltèques (2 Livres Audios Fondateurs)
              </h4>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#385117] text-white">
                Essentiel
              </span>
            </div>
            <p className="text-xs text-[#403E3A] mt-0.5">
              1. Parole impeccable • 2. Rien personnellement • 3. Aucune supposition • 4. Toujours de son mieux • 5. Sceptique avec écoute
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveTab('toltec_wisdom');
              setIsVideoExpanded(true);
            }}
            className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#385117] text-xs font-bold border border-[#CED6C1] flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Séminaire Vidéo Audio</span>
          </button>
          {!areAll5ToltecSelected ? (
            <button
              onClick={handleApplyAll5Toltec}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#385117] hover:bg-[#2A3E11] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Adopter les 5 Accords (+35 pts)</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#385117] bg-white px-3 py-2 rounded-xl border border-[#506B26]/30">
              <CheckCircle2 className="w-4 h-4 text-[#385117]" />
              Charte Toltèque Active
            </span>
          )}
        </div>
      </div>

      {/* TAB 1: MY ACTIVE LIST OF VALUES */}
      {activeTab === 'my_list' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F0EDE3] p-4 rounded-2xl border border-[#D5D0C2]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#385117] flex items-center justify-center border border-[#D5D0C2] font-bold">
                {selectedValues.length}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1F201C]">
                  Vos Piliers Sacrés Actuellement Sélectionnés
                </h4>
                <p className="text-xs text-[#5C5952]">
                  Chaque valeur transforme un ancien doute en une certitude bienveillante.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddingCustom(true)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#385117] border border-[#CED6C1] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                Valeur personnalisée
              </button>
              <button
                onClick={handleApplyAll5Toltec}
                className="px-3.5 py-2 rounded-xl bg-[#385117] hover:bg-[#2A3E11] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Headphones className="w-3.5 h-3.5" />
                Charger les 5 Toltèques
              </button>
            </div>
          </div>

          {/* Modal / Form to Add Custom Value */}
          {isAddingCustom && (
            <form onSubmit={handleAddCustomValue} className="bg-white p-5 rounded-2xl border-2 border-[#385117] space-y-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
                <h4 className="text-sm font-bold text-[#1F201C] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#385117]" />
                  Créer Votre Propre Valeur de Bienveillance (+20 pts)
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingCustom(false)}
                  className="text-[#6A6860] hover:text-[#1F201C]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#403E3A] mb-1">
                    Nom de votre valeur essentielle :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Loyauté envers moi-même, Écoute de mon corps..."
                    value={customValueName}
                    onChange={(e) => setCustomValueName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5D0C2] text-sm focus:outline-none focus:border-[#385117] bg-[#FAF9F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#403E3A] mb-1">
                    Comment cette valeur vous aide à vous voir avec bienveillance ?
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Je me regarde avec tendresse et je refuse de me maltraiter..."
                    value={customValueVision}
                    onChange={(e) => setCustomValueVision(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5D0C2] text-sm focus:outline-none focus:border-[#385117] bg-[#FAF9F6]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCustom(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#5C5952] hover:bg-[#EAE7DE]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#385117] text-white text-xs font-bold hover:bg-[#2A3E11] flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  Enregistrer ma valeur sacrée
                </button>
              </div>
            </form>
          )}

          {/* Cards Grid of Active Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedValues.map((val, idx) => (
              <div 
                key={val.id}
                className="bg-white p-5 rounded-2xl border-2 border-[#D5D0C2] hover:border-[#8DA765] transition-all flex flex-col justify-between shadow-2xs space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EAF3DE] text-[#2D450C] flex items-center justify-center font-bold text-xs border border-[#506B26]/30 shrink-0">
                        {val.toltecAgreementNumber ? `N°${val.toltecAgreementNumber}` : idx + 1}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F4F2EB] text-[#5C5952]">
                            {val.category}
                          </span>
                          {val.audioBookSource && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E5EED6] text-[#2E4313] border border-[#CED6C1] flex items-center gap-1">
                              <Headphones className="w-3 h-3" />
                              {val.audioBookSource.includes('Livre Audio 1') ? 'Livre Audio 1' : 'Livre Audio 2'}
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-[#1F201C] mt-0.5">
                          {val.name}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteValue(val.id, val.name)}
                      className="text-[#9E9B91] hover:text-[#DC2626] p-1 rounded-lg hover:bg-[#FEE2E2] transition-colors"
                      title="Retirer cette valeur de ma charte"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[#5C5952] font-medium mt-2">
                    {val.definition}
                  </p>

                  {/* Benevolent View Container */}
                  <div className="mt-3 p-3 rounded-xl bg-[#F8FAF4] border border-[#CED6C1] text-xs space-y-1">
                    <div className="font-bold text-[#2D450C] flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#385117]" />
                      Mon Regard Bienveillant :
                    </div>
                    <p className="text-[#1F201C] italic font-serif text-[13px] leading-snug">
                      « {val.benevolentVision} »
                    </p>
                  </div>

                  {/* Detailed explanation if Toltec */}
                  {val.detailedAudioExplanation && (
                    <div className="mt-2 p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E2D9] text-[11px] text-[#403E3A] space-y-1">
                      <p><strong>📖 Sagesse Audio :</strong> {val.detailedAudioExplanation}</p>
                      {val.psychologicalEffect && (
                        <p className="text-[#385117] font-semibold">
                          <strong>🧠 Effet Psychologique :</strong> {val.psychologicalEffect}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#EAE7DE] flex items-center justify-between text-[11px] text-[#403E3A]">
                  <span className="font-medium">🌱 <strong>Micro-Geste :</strong> {val.dailyMicroAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LES 5 ACCORDS TOLTÈQUES (AUDIOBOOKS & SEMINAR DEEP DIVE) */}
      {activeTab === 'toltec_wisdom' && (
        <div className="space-y-6">
          {/* SEMINAR VIDEO PLAYER CARD */}
          <div className="rounded-3xl bg-gradient-to-br from-[#18210E] via-[#2A3B14] to-[#1F201C] text-white p-6 md:p-8 shadow-md border-2 border-[#506B26] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#E5EED6] text-[#2E4313] flex items-center justify-center font-bold shrink-0 shadow-xs">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#E5EED6] text-[#18210E]">
                      {TOLTEC_SEMINAR_VIDEO.durationLabel}
                    </span>
                    <span className="text-xs text-white/70 flex items-center gap-1 font-medium">
                      <Headphones className="w-3.5 h-3.5" />
                      Résumé des 2 Livres Audios
                    </span>
                  </div>
                  <h4 className="text-lg md:text-xl font-serif font-bold text-white mt-1">
                    {TOLTEC_SEMINAR_VIDEO.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={TOLTEC_SEMINAR_VIDEO.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/20"
                >
                  <span>Ouvrir sur YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setIsVideoExpanded(!isVideoExpanded)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#E5EED6] hover:bg-[#D5E4C0] text-[#18210E] text-xs font-bold transition-colors"
                >
                  {isVideoExpanded ? 'Réduire' : 'Afficher la vidéo'}
                </button>
              </div>
            </div>

            <p className="text-xs md:text-sm text-white/90 leading-relaxed max-w-3xl">
              {TOLTEC_SEMINAR_VIDEO.description}
            </p>

            {/* Embedded Responsive YouTube Iframe */}
            {isVideoExpanded && (
              <div className="space-y-4">
                <div className="relative w-full overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg bg-black aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${TOLTEC_SEMINAR_VIDEO.youtubeId}?start=${TOLTEC_SEMINAR_VIDEO.startTimeSeconds}&autoplay=0&rel=0`}
                    title={TOLTEC_SEMINAR_VIDEO.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                  />
                </div>

                {/* Key Takeaways Grid */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-xs space-y-2.5">
                  <div className="text-xs font-bold text-[#E5EED6] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Points Clés Transmis dans ce Séminaire :
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90">
                    {TOLTEC_SEMINAR_VIDEO.keyTakeaways.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C1DB99] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar for Resilience Points */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/15">
              <div className="text-xs text-white/80">
                🌱 <em>L'écoute attentive de ce séminaire consolide votre boussole intérieure et votre clarté d'esprit.</em>
              </div>
              <button
                onClick={handleClaimSeminarPoints}
                disabled={hasClaimedSeminarPoints}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  hasClaimedSeminarPoints
                    ? 'bg-white/20 text-white/70 cursor-default border border-white/10'
                    : 'bg-[#C1DB99] hover:bg-[#B0D080] text-[#18210E] shadow-sm'
                }`}
              >
                <Check className="w-4 h-4" />
                {hasClaimedSeminarPoints ? 'Séminaire Validé (+25 pts obtenus)' : 'Valider mon écoute (+25 pts)'}
              </button>
            </div>
          </div>

          {/* Audiobooks Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TOLTEC_AUDIOBOOKS_INFO.map((book) => (
              <div 
                key={book.id}
                className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#F8F7F4] border-2 border-[#D5D0C2] space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E5EED6] text-[#2E4313] border border-[#8DA765]/30">
                    {book.audioBadge}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#5C5952]">
                    Auteur : {book.author}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-serif font-bold text-[#1F201C]">
                    {book.title}
                  </h4>
                  <p className="text-xs font-semibold text-[#385117] mt-0.5">
                    {book.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#403E3A] leading-relaxed">
                  {book.description}
                </p>

                <div className="pt-2 border-t border-[#EAE7DE] flex items-center justify-between text-xs font-bold text-[#385117]">
                  <span>Accords couverts : {book.agreements.map(a => `N°${a}`).join(', ')}</span>
                  <Headphones className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Deep-Dive into the 5 Toltec Agreements */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5D0C2] pb-2">
              <h4 className="text-base font-bold text-[#1F201C] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#385117]" />
                Les 5 Accords Détaillés & Leurs Clés Thérapeutiques
              </h4>
              <button
                onClick={handleApplyAll5Toltec}
                className="text-xs font-bold text-[#385117] hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Activer les 5 dans ma charte personnelle
              </button>
            </div>

            <div className="space-y-4">
              {TOLTEC_AGREEMENTS_VALUES.map((accord) => {
                const isSelected = selectedValues.some(v => v.id === accord.id);
                return (
                  <div
                    key={accord.id}
                    className={`p-5 rounded-2xl border-2 transition-all space-y-4 ${
                      isSelected 
                        ? 'bg-[#F9FAF6] border-[#506B26] shadow-xs' 
                        : 'bg-white border-[#D5D0C2]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#385117] text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {accord.toltecAgreementNumber}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#385117]">
                            {accord.audioBookSource}
                          </span>
                          <h4 className="text-base font-bold text-[#1F201C]">
                            {accord.name}
                          </h4>
                        </div>
                      </div>

                      <button
                        onClick={() => handleTogglePreset(accord)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto ${
                          isSelected
                            ? 'bg-[#E5EED6] text-[#2E4313] border border-[#506B26]/30'
                            : 'bg-[#385117] text-white hover:bg-[#2A3E11]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Dans ma charte</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Ajouter (+15 pts)</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E2D9] space-y-1.5 text-xs">
                        <span className="font-bold text-[#1F201C] flex items-center gap-1.5">
                          <Headphones className="w-3.5 h-3.5 text-[#385117]" />
                          Explication du Livre Audio :
                        </span>
                        <p className="text-[#403E3A] leading-relaxed">
                          {accord.detailedAudioExplanation}
                        </p>
                        <p className="text-[#5C5952] pt-1 border-t border-[#EAE7DE]">
                          {accord.definition}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#F0F5E8] border border-[#CED6C1] space-y-1.5 text-xs">
                        <span className="font-bold text-[#2D450C] flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-[#385117]" />
                          Regard Bienveillant & Guérison :
                        </span>
                        <p className="text-[#18210E] italic font-serif">
                          « {accord.benevolentVision} »
                        </p>
                        <div className="pt-1 border-t border-[#CED6C1]/50 text-[11px] text-[#2D450C]">
                          <strong>🧠 Effet Réducteur d'Entropie :</strong> {accord.psychologicalEffect}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EAE7DE] flex items-center justify-between text-xs text-[#385117] font-semibold">
                      <span>🌱 <strong>Micro-Geste Quotidien :</strong> {accord.dailyMicroAction}</span>
                      <button
                        onClick={() => handleReciteBenevolentMantra(`« ${accord.name} : ${accord.benevolentVision} »`)}
                        className="hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Incarner (+15 pts)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRESET GALLERY TO CHOOSE FROM */}
      {activeTab === 'preset_gallery' && (
        <div className="space-y-4">
          <div className="bg-[#F4F2EB] p-4 rounded-2xl border border-[#D5D0C2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-[#1F201C] mb-0.5">
                Catalogue Thérapeutique des Valeurs de Résilience :
              </p>
              <p className="text-[#5C5952]">
                Explorez l'ensemble des valeurs sacrées et enrichissez votre charte personnelle.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  categoryFilter === 'all' ? 'bg-[#385117] text-white' : 'bg-white text-[#5C5952] border border-[#D5D0C2]'
                }`}
              >
                Toutes ({PRESET_CORE_VALUES.length})
              </button>
              <button
                onClick={() => setCategoryFilter('toltec')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  categoryFilter === 'toltec' ? 'bg-[#385117] text-white' : 'bg-white text-[#5C5952] border border-[#D5D0C2]'
                }`}
              >
                <Headphones className="w-3 h-3" />
                5 Accords Toltèques (5)
              </button>
              <button
                onClick={() => setCategoryFilter('Dignité & Respect')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  categoryFilter === 'Dignité & Respect' ? 'bg-[#385117] text-white' : 'bg-white text-[#5C5952] border border-[#D5D0C2]'
                }`}
              >
                Dignité & Respect
              </button>
              <button
                onClick={() => setCategoryFilter('Sécurité & Paix')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  categoryFilter === 'Sécurité & Paix' ? 'bg-[#385117] text-white' : 'bg-white text-[#5C5952] border border-[#D5D0C2]'
                }`}
              >
                Sécurité & Paix
              </button>
              <button
                onClick={() => setCategoryFilter('Douceur & Soin')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  categoryFilter === 'Douceur & Soin' ? 'bg-[#385117] text-white' : 'bg-white text-[#5C5952] border border-[#D5D0C2]'
                }`}
              >
                Douceur & Soin
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredPresetValues.map((item) => {
              const isSelected = selectedValues.some(v => v.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => handleTogglePreset(item)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-[#EAF3DE] border-[#506B26] shadow-xs' 
                      : 'bg-white border-[#D5D0C2] hover:border-[#8DA765]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C5952]">
                        {item.category}
                      </span>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isSelected 
                          ? 'bg-[#385117] text-white' 
                          : 'bg-[#ECE9DF] text-[#6A6860]'
                      }`}>
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1F201C]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#403E3A] mt-1 font-medium line-clamp-2">
                      {item.definition}
                    </p>

                    <div className="mt-2.5 p-2 rounded-lg bg-white/70 border border-[#CED6C1] text-[11px] italic text-[#2D450C]">
                      « {item.benevolentVision} »
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#CED6C1]/50 flex items-center justify-between text-[11px] font-bold">
                    <span className={isSelected ? 'text-[#2D450C]' : 'text-[#5C5952]'}>
                      {isSelected ? '✓ Dans ma charte' : '+ Ajouter à ma charte'}
                    </span>
                    <span className="text-[#385117]">+15 pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: BENEVOLENT MIRROR (MEDITATION & AFFIRMATIONS) */}
      {activeTab === 'benevolent_mirror' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#EAF3DE] to-[#F8F7F4] p-6 rounded-3xl border-2 border-[#506B26] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#385117] text-white flex items-center justify-center shadow-xs">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-serif font-bold text-[#18210E]">
                  Le Miroir Sacré de l'Auto-Bienveillance
                </h4>
                <p className="text-xs text-[#385117] font-medium">
                  Réciter ces engagements reprogramme votre dialogue intérieur et apaise l'amygdale cérébrale.
                </p>
              </div>
            </div>

            <p className="text-sm text-[#2D450C] font-medium leading-relaxed">
              Regardez-vous à travers la somme de vos valeurs choisies : <strong>{selectedValues.map(v => v.name).join(', ')}</strong>. Vous n'êtes pas vos blessures, vous êtes cette femme courageuse et pleine de dignité qui renaît.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#1F201C] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#385117]" />
              Affirmations Fondatrices du Regard Bienveillant (Cliquez pour intégrer +15 pts) :
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BENEVOLENT_SELF_AFFIRMATIONS.map((affirmation, i) => (
                <button
                  key={i}
                  onClick={() => handleReciteBenevolentMantra(affirmation)}
                  className="text-left p-4 rounded-2xl bg-white hover:bg-[#EAF3DE] border-2 border-[#D5D0C2] hover:border-[#506B26] transition-all flex flex-col justify-between space-y-3 group shadow-2xs cursor-pointer"
                >
                  <p className="text-sm font-serif italic text-[#1F201C] group-hover:text-[#18210E] leading-relaxed">
                    {affirmation}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#385117] pt-2 border-t border-[#EAE7DE] group-hover:border-[#506B26]/30">
                    <span>Incarner cette affirmation</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E5EED6] group-hover:bg-[#385117] group-hover:text-white transition-colors">
                      +15 pts
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

