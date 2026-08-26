import React, { useState } from 'react';
import { MessageCircle, Compass, Heart } from 'lucide-react';
import { GeminiCrisisChat } from './GeminiCrisisChat';
import { SheltersMapDirectory } from './SheltersMapDirectory';
import { TherapeuticRelaxation } from './TherapeuticRelaxation';
import { HistoryOfViolenceVideo } from './HistoryOfViolenceVideo';

interface SoutienBienEtreProps {
  isNightMode: boolean;
}

export const SoutienBienEtre: React.FC<SoutienBienEtreProps> = ({ isNightMode }) => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'shelters' | 'relaxation'>('chat');

  return (
    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
      {/* Offical Video Clip (Moved from Justice Dossier) */}
      <HistoryOfViolenceVideo />

      {/* Sub-Navigation for Wellness & Support */}
      <div className="bg-[#FFFFFF]/92 backdrop-blur-md border border-[#E5E2D9] rounded-2xl p-2 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-sm">
        <button
          onClick={() => setActiveSubTab('chat')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === 'chat'
              ? 'bg-[#8A9A5B] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          Intelligence Thérapeutique
        </button>
        <button
          onClick={() => setActiveSubTab('shelters')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === 'shelters'
              ? 'bg-[#8A9A5B] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
          }`}
        >
          <Compass className="w-4 h-4" />
          Refuges & Soins
        </button>
        <button
          onClick={() => setActiveSubTab('relaxation')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === 'relaxation'
              ? 'bg-[#8A9A5B] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
          }`}
        >
          <Heart className="w-4 h-4" />
          Respiration & Art
        </button>
      </div>

      {/* Content Area */}
      <div>
        {activeSubTab === 'chat' && <GeminiCrisisChat />}
        {activeSubTab === 'shelters' && <SheltersMapDirectory />}
        {activeSubTab === 'relaxation' && <TherapeuticRelaxation isNightMode={isNightMode} />}
      </div>
    </div>
  );
};
