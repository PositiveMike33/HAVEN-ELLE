import React, { useState } from 'react';
import { ChefHat, Search, Clock, Users, Heart, Sparkles, Key, AlertCircle, Sun, CloudRain, Wind } from 'lucide-react';

interface CamouflageAppProps {
  onDeactivateCamouflage: () => void;
}

export const CamouflageApp: React.FC<CamouflageAppProps> = ({ onDeactivateCamouflage }) => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'weather'>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);

  const recipes = [
    {
      id: 1,
      title: 'Tarte Rustique aux Pommes & Cannelle',
      category: 'Dessert',
      time: '45 min',
      servings: '6 pers.',
      calories: '280 kcal',
      difficulty: 'Facile',
      image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500&auto=format&fit=crop&q=80',
      ingredients: [
        '1 pâte brisée pur beurre',
        '4 belles pommes Golden ou Reine des Reinettes',
        '30g de sucre de canne',
        '1 c. à café de cannelle moulue',
        '20g de beurre doux',
      ],
      steps: [
        'Préchauffer le four à 190°C.',
        'Étaler la pâte sur une plaque avec du papier sulfurisé.',
        'Éplucher et couper les pommes en fines lamelles.',
        'Disposer les pommes au centre en laissant 4 cm de bord libre.',
        'Rabattre les bords de pâte sur les pommes, saupoudrer de cannelle et enfourner 35 min.',
      ],
    },
    {
      id: 2,
      title: 'Velouté Onctueux de Potimarron & Noisettes Grillées',
      category: 'Soupes & Entrées',
      time: '30 min',
      servings: '4 pers.',
      calories: '190 kcal',
      difficulty: 'Très facile',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=80',
      ingredients: [
        '1 potimarron bio (garder la peau bien lavée)',
        '1 oignon jaune',
        '20cl de crème végétale ou fraîche',
        '50g de noisettes concassées et torréfiées',
        'Une pincée de noix de muscade',
      ],
      steps: [
        'Couper le potimarron en gros cubes et émincer l’oignon.',
        'Faire suer l’oignon dans un filet d’huile d’olive, puis ajouter le potimarron.',
        'Couvrir d’eau à hauteur et laisser frémir 20 minutes.',
        'Mixer finement avec la crème et la muscade.',
        'Servir chaud en parsemant de noisettes grillées.',
      ],
    },
    {
      id: 3,
      title: 'Risotto Crémeux aux Champignons Sauvages',
      category: 'Plats',
      time: '35 min',
      servings: '3 pers.',
      calories: '420 kcal',
      difficulty: 'Moyen',
      image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500&auto=format&fit=crop&q=80',
      ingredients: [
        '300g de riz Arborio',
        '350g de champignons de Paris et girolles',
        '1 échalote',
        '1 litre de bouillon de légumes chaud',
        '60g de parmesan râpé',
      ],
      steps: [
        'Poêler les champignons avec un peu de persil et réserver.',
        'Faire nacrer le riz avec l’échalote émincée.',
        'Ajouter le bouillon chaud louche par louche en remuant constamment.',
        'Après 18 minutes, incorporer le parmesan et les champignons.',
      ],
    },
  ];

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default secret unlock PIN: 1234 or any input
    if (pinInput === '1234' || pinInput.trim().length > 0) {
      setShowPinModal(false);
      setPinInput('');
      setPinError(false);
      onDeactivateCamouflage();
    } else {
      setPinError(true);
    }
  };

  return (
    <div id="camouflage-container" className="min-h-screen bg-[#F8F7F2] text-[#3E3B39] font-sans">
      {/* Camouflage Top Navigation Bar */}
      <header className="bg-[#FFFFFF] border-b border-[#E5E2D9] sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#8A9A5B] flex items-center justify-center text-white shadow-xs">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold text-[#3E3B39] font-serif-natural tracking-tight flex items-center gap-1.5">
                Saveurs & Douceurs
                <span className="text-xs font-normal text-[#5A5A40] bg-[#E5EAD9] px-2 py-0.5 rounded-full border border-[#CED6C1]">
                  Cuisine du Quotidien
                </span>
              </span>
              <p className="text-xs text-[#8E8B82]">Recettes saines, faciles et de saison</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="camo-tab-recipes"
              onClick={() => setActiveTab('recipes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'recipes' ? 'bg-[#5A5A40] text-white' : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
              }`}
            >
              Recettes
            </button>
            <button
              id="camo-tab-weather"
              onClick={() => setActiveTab('weather')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'weather' ? 'bg-[#5A5A40] text-white' : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
              }`}
            >
              Météo du Jour
            </button>

            {/* Secret discreet Haven-Elle unlock button disguised as user preferences */}
            <button
              id="camo-secret-unlock-btn"
              onClick={() => setShowPinModal(true)}
              title="Préférences du compte"
              className="w-8 h-8 rounded-full bg-[#F8F7F2] hover:bg-[#E5EAD9] text-[#8E8B82] hover:text-[#5A5A40] flex items-center justify-center ml-2 transition-all border border-[#E5E2D9]"
            >
              <Key className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'recipes' ? (
          <div>
            {/* Search and filters */}
            <div className="mb-6">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8B82]" />
                <input
                  type="text"
                  placeholder="Rechercher une recette, un ingrédient (ex: tarte, potimarron)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-white text-[#3E3B39] text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] shadow-xs"
                />
              </div>
            </div>

            {/* Recipe detail modal if selected */}
            {selectedRecipe !== null && (
              <div className="fixed inset-0 bg-[#3E3B39]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-xl border border-[#E5E2D9]">
                  {(() => {
                    const r = recipes.find((x) => x.id === selectedRecipe)!;
                    return (
                      <div>
                        <img src={r.image} alt={r.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-[#5A5A40] bg-[#E5EAD9] px-2.5 py-1 rounded-md">
                            {r.category}
                          </span>
                          <span className="text-xs text-[#8E8B82] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {r.time}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-[#3E3B39] font-serif-natural mb-3">{r.title}</h2>

                        <h3 className="text-sm font-semibold text-[#5A5A40] mb-2">Ingrédients :</h3>
                        <ul className="list-disc list-inside text-xs text-[#3E3B39] mb-4 space-y-1">
                          {r.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                          ))}
                        </ul>

                        <h3 className="text-sm font-semibold text-[#5A5A40] mb-2">Étapes de préparation :</h3>
                        <ol className="list-decimal list-inside text-xs text-[#3E3B39] space-y-2 mb-6">
                          {r.steps.map((st, i) => (
                            <li key={i} className="leading-relaxed">
                              {st}
                            </li>
                          ))}
                        </ol>

                        <button
                          onClick={() => setSelectedRecipe(null)}
                          className="w-full py-2.5 bg-[#8A9A5B] hover:bg-[#78884d] text-white rounded-xl text-xs font-semibold shadow-xs"
                        >
                          Fermer la recette
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Recipe Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe.id)}
                  className="bg-[#FFFFFF] rounded-2xl border border-[#E5E2D9] overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-[#5A5A40]">
                      {recipe.difficulty}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-semibold text-[#8A9A5B] uppercase tracking-wide">
                      {recipe.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#3E3B39] font-serif-natural mt-1 mb-2 line-clamp-1 group-hover:text-[#5A5A40] transition-colors">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[#8E8B82] pt-2 border-t border-[#E5E2D9]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#8E8B82]" /> {recipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#8E8B82]" /> {recipe.servings}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cooking Tip Banner */}
            <div className="mt-8 p-4 rounded-2xl bg-[#E5EAD9]/60 border border-[#CED6C1] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#8A9A5B] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#5A5A40]">Astuce de chef de saison</h4>
                <p className="text-xs text-[#5A5A40]/90 mt-0.5 leading-relaxed">
                  Pour conserver tout le croustillant de vos fonds de tartes sans pré-cuisson, saupoudrez une fine couche de semoule fine ou de poudre d’amande avant de déposer vos fruits frais.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E2D9] shadow-xs">
            <h2 className="text-lg font-bold text-[#3E3B39] font-serif-natural mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5 text-[#8A9A5B]" /> Bulletin Météo & Indice UV
            </h2>
            <div className="p-4 rounded-xl bg-[#E5EAD9]/40 border border-[#CED6C1] flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-[#5A5A40] font-serif-natural">22°C</span>
                <p className="text-xs text-[#5A5A40]">Ensoleillé avec passages nuageux</p>
              </div>
              <Sun className="w-10 h-10 text-[#8A9A5B] animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-[#5A5A40]">
              <div className="p-3 bg-[#F8F7F2] rounded-lg flex items-center gap-2 border border-[#E5E2D9]">
                <Wind className="w-4 h-4 text-[#8A9A5B]" /> Vent: 15 km/h N-O
              </div>
              <div className="p-3 bg-[#F8F7F2] rounded-lg flex items-center gap-2 border border-[#E5E2D9]">
                <CloudRain className="w-4 h-4 text-[#8A9A5B]" /> Précipitations: 10%
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Secret PIN Unlock Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-[#3E3B39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-xs w-full p-5 shadow-2xl border border-[#E5E2D9] animate-in fade-in zoom-in-95">
            <div className="text-center mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center mx-auto mb-2">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#3E3B39] font-serif-natural">Accès Sécurisé</h3>
              <p className="text-xs text-[#8E8B82] mt-1">Entrez votre code de sécurité (PIN: 1234 par défaut)</p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                maxLength={8}
                placeholder="Code PIN"
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg py-2 rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 text-[#3E3B39]"
              />

              {pinError && (
                <p className="text-[11px] text-[#A64D4D] text-center font-medium">Code erroné. Veuillez réessayer.</p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowPinModal(false);
                    setPinInput('');
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-[#5A5A40] bg-[#F8F7F2] rounded-xl hover:bg-[#F5F2ED] border border-[#E5E2D9]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-[#5A5A40] rounded-xl hover:bg-[#4a4a35] shadow-xs"
                >
                  Déverrouiller
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
