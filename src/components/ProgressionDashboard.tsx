import React from 'react';
import { Trophy, Heart, Users, Sliders, Scale, Eye, Volume2, Lock, Unlock, CheckCircle2 } from 'lucide-react';

interface ProgressionDashboardProps {
  resiliencePoints: number;
}

export const ProgressionDashboard: React.FC<ProgressionDashboardProps> = ({ resiliencePoints }) => {
  const milestones = [
    { points: 20, title: 'Soutien & Apprentissage', description: 'Ressources de psychologie positive', icon: Heart },
    { points: 50, title: 'Réseau de Secours', description: 'Contacts et alertes de confiance', icon: Users },
    { points: 80, title: 'Contrôle Visuel', description: 'Ajustement de l\'opacité et du confort', icon: Sliders },
    { points: 100, title: 'Dossier Justice', description: 'Outils de documentation sécurisée', icon: Scale },
    { points: 200, title: 'Immersion Visuelle', description: 'Environnement vidéo dynamique', icon: Eye },
    { points: 400, title: 'Expérience Sensorielle', description: 'Ambiance sonore apaisante', icon: Volume2 },
  ];

  // Find current and next milestones
  const nextMilestone = milestones.find(m => resiliencePoints < m.points) || milestones[milestones.length - 1];
  const isMaxLevel = resiliencePoints >= milestones[milestones.length - 1].points;
  
  const currentLevel = milestones.filter(m => resiliencePoints >= m.points).length;

  const progressToNext = isMaxLevel 
    ? 100 
    : (() => {
        const previousPoints = currentLevel === 0 ? 0 : milestones[currentLevel - 1].points;
        const totalReq = nextMilestone.points - previousPoints;
        const currentProg = resiliencePoints - previousPoints;
        return Math.min(100, Math.max(0, (currentProg / totalReq) * 100));
      })();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-[#CED6C1]/50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E3B39] flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#8A9A5B]" />
            Votre Évolution
          </h2>
          <p className="text-[#8E8B82] mt-1 text-sm">
            Chaque action positive renforce votre ancrage. Avancez à votre rythme.
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#8A9A5B] font-mono">{resiliencePoints}</div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#8E8B82]">Points</div>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="mb-10 bg-[#F8F7F2] p-5 rounded-2xl border border-[#E5EAD9]">
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-xs font-bold text-[#8E8B82] uppercase tracking-wider mb-1">Niveau Actuel</div>
            <div className="text-lg font-bold text-[#3E3B39]">Niveau {currentLevel + 1}</div>
          </div>
          <div className="text-right">
            {!isMaxLevel && (
              <>
                <div className="text-xs font-bold text-[#8A9A5B] uppercase tracking-wider mb-1">Prochain Palier</div>
                <div className="text-sm font-bold text-[#3E3B39]">{nextMilestone.points} pts</div>
              </>
            )}
            {isMaxLevel && (
              <div className="text-sm font-bold text-[#8A9A5B]">Harmonie Atteinte</div>
            )}
          </div>
        </div>
        <div className="h-3 w-full bg-black/5 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-[#8A9A5B] transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
        {!isMaxLevel && (
          <p className="text-xs text-[#8E8B82] text-center mt-3 font-medium">
            Encore <strong className="text-[#5A5A40]">{nextMilestone.points - resiliencePoints} points</strong> pour débloquer : {nextMilestone.title}
          </p>
        )}
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-4 relative">
        <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-[#8A9A5B] to-black/5" />
        
        {milestones.map((milestone, index) => {
          const isUnlocked = resiliencePoints >= milestone.points;
          const isNext = !isUnlocked && (index === 0 || resiliencePoints >= milestones[index - 1].points);
          
          return (
            <div 
              key={milestone.points} 
              className={`relative flex items-center gap-4 p-4 rounded-2xl transition-all ${
                isUnlocked 
                  ? 'bg-[#E5EAD9]/30 border border-[#CED6C1]/50' 
                  : isNext 
                    ? 'bg-white border-2 border-[#8A9A5B]/30 shadow-sm' 
                    : 'opacity-50 grayscale'
              }`}
            >
              <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center z-10 ${
                isUnlocked 
                  ? 'bg-[#8A9A5B] text-white shadow-md' 
                  : 'bg-[#F8F7F2] border-2 border-inherit text-[#8E8B82]'
              }`}>
                <milestone.icon className={`w-5 h-5 ${isNext ? 'text-[#8A9A5B]' : ''}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className={`font-bold text-sm truncate ${isUnlocked ? 'text-[#3E3B39]' : 'text-[#8E8B82]'}`}>
                    {milestone.title}
                  </h4>
                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono font-bold text-[#8E8B82]">
                    <span>{milestone.points}</span>
                    <span className="text-[9px] uppercase">pts</span>
                  </div>
                </div>
                <p className="text-xs text-[#8E8B82] truncate">
                  {milestone.description}
                </p>
              </div>

              <div className="shrink-0 pl-2">
                {isUnlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-[#8A9A5B]" />
                ) : isNext ? (
                  <Unlock className="w-4 h-4 text-[#8A9A5B]/50" />
                ) : (
                  <Lock className="w-4 h-4 text-black/15" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
