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
  Zap
} from 'lucide-react';
import { PRESET_CORE_VALUES, BENEVOLENT_SELF_AFFIRMATIONS, CoreValueItem } from '../data/valuesAndBenevolenceData';
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
    // Default 5 foundation values
    return PRESET_CORE_VALUES.slice(0, 5);
  });

  const [customValueName, setCustomValueName] = useState('');
  const [customValueVision, setCustomValueVision] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [activeTab, setActiveTab] = useState<'my_list' | 'preset_gallery' | 'benevolent_mirror'>('my_list');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(USER_VALUES_STORAGE_KEY, JSON.stringify(selectedValues));
    } catch (e) {
      console.error(e);
    }
  }, [selectedValues]);

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
      setActionFeedback(`+15 pts ! Valeur « ${item.name} » intégrée à votre charte de bienveillance.`);
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

  return (
    <div className="bg-[#FAF9F6] rounded-3xl border-2 border-[#CED6C1] p-6 md:p-8 space-y-6 shadow-sm">
      {/* Toast Feedback */}
      {actionFeedback && (
        <div className="bg-[#E5EED6] border-2 border-[#506B26] p-3.5 rounded-2xl flex items-center justify-between text-xs font-bold text-[#18210E] shadow-sm animate-in fade-in">
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
            Cycle 1 (Niveaux 1 à 25) • Socle Fondateur
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#1F201C] flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#385117]" />
            Ma Boussole de Valeurs & Regard Bienveillant
          </h3>
          <p className="text-sm text-[#403E3A] font-medium mt-1 max-w-2xl">
            Construisez votre liste de valeurs sacrées. Elles sont le miroir lumineux à travers lequel vous choisissez désormais de vous contempler : avec douceur, dignité et la plus haute bienveillance.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-[#EAE7DE] p-1 rounded-2xl border border-[#D0CABE] self-start md:self-auto">
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
                ? 'bg-[#385117] text-white shadow-xs'
                : 'text-[#5C5952] hover:text-[#1F201C]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Miroir Bienveillant
          </button>
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

            <button
              onClick={() => setIsAddingCustom(true)}
              className="px-3.5 py-2 rounded-xl bg-[#385117] hover:bg-[#2A3E11] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Ajouter une valeur personnalisée
            </button>
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
                className="bg-white p-5 rounded-2xl border-2 border-[#D5D0C2] hover:border-[#8DA765] transition-all flex flex-col justify-between shadow-xs space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EAF3DE] text-[#2D450C] flex items-center justify-center font-bold text-xs border border-[#506B26]/30">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F4F2EB] text-[#5C5952]">
                          {val.category}
                        </span>
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
                </div>

                <div className="pt-2 border-t border-[#EAE7DE] flex items-center justify-between text-[11px] text-[#403E3A]">
                  <span className="font-medium">🌱 <strong>Micro-Geste :</strong> {val.dailyMicroAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PRESET GALLERY TO CHOOSE FROM */}
      {activeTab === 'preset_gallery' && (
        <div className="space-y-4">
          <div className="bg-[#F4F2EB] p-4 rounded-2xl border border-[#D5D0C2] text-xs text-[#403E3A]">
            <p className="font-bold text-[#1F201C] mb-1">
              Catalogue Thérapeutique des Valeurs de Résilience :
            </p>
            <p>
              Cliquez sur une valeur pour l'ajouter ou la retirer de votre charte personnelle. Choisissez celles qui font vibrer votre cœur et vous rappellent votre noblesse d'âme.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {PRESET_CORE_VALUES.map((item) => {
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

      {/* TAB 3: BENEVOLENT MIRROR (MEDITATION & AFFIRMATIONS) */}
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
                  className="text-left p-4 rounded-2xl bg-white hover:bg-[#EAF3DE] border-2 border-[#D5D0C2] hover:border-[#506B26] transition-all flex flex-col justify-between space-y-3 group shadow-xs cursor-pointer"
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
