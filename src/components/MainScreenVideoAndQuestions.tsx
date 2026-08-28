import React from 'react';
import { InteractiveQuestionnairesHub } from './InteractiveQuestionnairesHub';

interface MainScreenVideoAndQuestionsProps {
  onPlanGenerated?: () => void;
  onOpenDetailedAssessment?: () => void;
  onTriggerSOS?: () => void;
  onTriggerPanic?: () => void;
  onPointsEarned?: () => void;
}

export const MainScreenVideoAndQuestions: React.FC<MainScreenVideoAndQuestionsProps> = ({
  onTriggerSOS,
  onTriggerPanic,
  onPointsEarned,
}) => {
  return (
    <div id="main-screen-video-questions-hub" className="space-y-6">
      {/* 8 Questionnaires Interactifs & Violentomètre - Prioritaire en Première Page */}
      <InteractiveQuestionnairesHub
        onTriggerSOS={onTriggerSOS}
        onTriggerPanic={onTriggerPanic}
        onPointsEarned={onPointsEarned}
      />
    </div>
  );
};
