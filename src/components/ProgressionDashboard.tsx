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
    <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#CED6C1]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#1F201C] flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#385117]" />
            Votre Évolution
          </h2>
          <p className="text-[#403E3A] font-medium mt-1 text-sm">
            Chaque action positive renforce votre ancrage. Avancez à votre rythme.
          </p>
        </div>
        <div className="text-right bg-[#F4F2EB] px-4 py-2 rounded-2xl border border-[#D5D0C2]">
          <div className="text-3xl font-extrabold text-[#385117] font-mono">{resiliencePoints}</div>
          <div className="text-[11px] uppercase font-extrabold tracking-wider text-[#403E3A]">Points</div>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="mb-10 bg-[#F4F2EB] p-5 rounded-2xl border-2 border-[#D5D0C2]">
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-xs font-extrabold text-[#403E3A] uppercase tracking-wider mb-1">Niveau Actuel</div>
            <div className="text-lg font-extrabold text-[#1F201C]">Niveau {currentLevel + 1}</div>
          </div>
          <div className="text-right">
            {!isMaxLevel && (
              <>
                <div className="text-xs font-extrabold text-[#385117] uppercase tracking-wider mb-1">Prochain Palier</div>
                <div className="text-sm font-extrabold text-[#1F201C]">{nextMilestone.points} pts</div>
              </>
            )}
            {isMaxLevel && (
              <div className="text-sm font-extrabold text-[#385117]">Harmonie Atteinte</div>
            )}
          </div>
        </div>
        <div className="h-3.5 w-full bg-[#DDD8CC] rounded-full overflow-hidden relative border border-[#C5BFB0]">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4F6927] to-[#718E38] transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
        {!isMaxLevel && (
          <p className="text-xs text-[#383632] text-center mt-3 font-medium">
            Encore <strong className="text-[#1F201C] font-extrabold">{nextMilestone.points - resiliencePoints} points</strong> pour débloquer : <span className="font-bold text-[#385117]">{nextMilestone.title}</span>
          </p>
        )}
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-4 relative">
        <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-[#4F6927]/30 rounded-full" />
        
        {milestones.map((milestone, index) => {
          const isUnlocked = resiliencePoints >= milestone.points;
          const isNext = !isUnlocked && (index === 0 || resiliencePoints >= milestones[index - 1].points);
          
          return (
            <div 
              key={milestone.points} 
              className={`relative flex items-center gap-4 p-4 rounded-2xl transition-all ${
                isUnlocked 
                  ? 'bg-[#E5EED6] border-2 border-[#506B26] shadow-sm' 
                  : isNext 
                    ? 'bg-white border-2 border-[#385117] shadow-md ring-2 ring-[#385117]/20' 
                    : 'bg-[#F8F7F4] border-2 border-[#DDD8CC]'
              }`}
            >
              <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center z-10 ${
                isUnlocked 
                  ? 'bg-[#385117] text-white shadow-md' 
                  : isNext
                    ? 'bg-[#F4F2EB] border-2 border-[#385117] text-[#385117]'
                    : 'bg-[#ECE9DF] border-2 border-[#D0CABE] text-[#6A6860]'
              }`}>
                <milestone.icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className={`font-bold text-sm truncate ${
                    isUnlocked 
                      ? 'text-[#18210E]' 
                      : isNext 
                        ? 'text-[#1F201C]' 
                        : 'text-[#45433E]'
                  }`}>
                    {milestone.title}
                  </h4>
                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono font-extrabold">
                    <span className={isUnlocked ? 'text-[#385117]' : isNext ? 'text-[#385117]' : 'text-[#6A6860]'}>
                      {milestone.points}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-[#6A6860]">pts</span>
                  </div>
                </div>
                <p className={`text-xs truncate font-medium ${
                  isUnlocked 
                    ? 'text-[#323928]' 
                    : isNext 
                      ? 'text-[#3E3C37]' 
                      : 'text-[#5C5952]'
                }`}>
                  {milestone.description}
                </p>
              </div>

              <div className="shrink-0 pl-2">
                {isUnlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-[#385117]" />
                ) : isNext ? (
                  <Unlock className="w-4 h-4 text-[#385117]" />
                ) : (
                  <Lock className="w-4 h-4 text-[#7A776E]" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
