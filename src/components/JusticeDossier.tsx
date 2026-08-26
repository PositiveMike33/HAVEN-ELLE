import React, { useState } from 'react';
import { Sparkles, Scale, FolderLock } from 'lucide-react';
import { HighThinkingSafetyPlan } from './HighThinkingSafetyPlan';
import { LegalAdvisorSearch } from './LegalAdvisorSearch';
import { EvidenceLocker } from './EvidenceLocker';
import { IncidentRecord } from '../types';

interface JusticeDossierProps {
  incidents: IncidentRecord[];
  onUpdateIncidents: (incidents: IncidentRecord[]) => void;
  onNavigateToRelaxation: () => void;
  onNavigateToContacts: () => void;
  onOpenDetailedAssessment: () => void;
}

export const JusticeDossier: React.FC<JusticeDossierProps> = ({
  incidents,
  onUpdateIncidents,
  onNavigateToRelaxation,
  onNavigateToContacts,
  onOpenDetailedAssessment,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'safety_plan' | 'legal' | 'evidence'>('safety_plan');

  return (
    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
      {/* Sub-Navigation for Justice Dossier */}
      <div className="bg-[#FFFFFF]/92 backdrop-blur-md border border-[#E5E2D9] rounded-2xl p-2 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-sm">
        <button
          onClick={() => setActiveSubTab('safety_plan')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === 'safety_plan'
              ? 'bg-[#8A9A5B] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Plan de Sûreté
        </button>
        <button
          onClick={() => setActiveSubTab('legal')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === 'legal'
              ? 'bg-[#8A9A5B] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
          }`}
        >
          <Scale className="w-4 h-4" />
          Droits & Lois
        </button>
        <button
          onClick={() => setActiveSubTab('evidence')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === 'evidence'
              ? 'bg-[#8A9A5B] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
          }`}
        >
          <FolderLock className="w-4 h-4" />
          Coffre de Preuves
        </button>
      </div>

      {/* Content Area */}
      <div>
        {activeSubTab === 'safety_plan' && (
          <HighThinkingSafetyPlan
            onNavigateToRelaxation={onNavigateToRelaxation}
            onNavigateToContacts={onNavigateToContacts}
            onOpenDetailedAssessment={onOpenDetailedAssessment}
          />
        )}
        {activeSubTab === 'legal' && <LegalAdvisorSearch />}
        {activeSubTab === 'evidence' && (
          <EvidenceLocker
            incidents={incidents}
            onUpdateIncidents={onUpdateIncidents}
          />
        )}
      </div>
    </div>
  );
};
