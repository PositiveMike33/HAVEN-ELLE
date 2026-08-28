import { CYCLE_1_QUESTIONS } from './cycles/cycle1ToltecData';
import { CYCLE_2_QUESTIONS } from './cycles/cycle2TraumaData';
import { CYCLE_3_QUESTIONS } from './cycles/cycle3PresenceData';
import { CYCLE_4_QUESTIONS } from './cycles/cycle4LoveSanctuaryData';
import { CYCLE_5_QUESTIONS } from './cycles/cycle5KybalionData';

export interface Healing100QuestionItem {
  level: number;
  cycleId: 1 | 2 | 3 | 4 | 5;
  title: string;
  theme: string;
  question: string;
  options: string[];
  correctOptionIndex?: number;
  explanation?: string;
  reflectionPrompt: string;
  benevolentAffirmation: string;
  unlockedRewardBadge: string;
}

// 111 Unique, deeply therapeutic questions covering the entire journey from Level 1 to 111
// With balanced randomized correct option distribution (A, B, C ~ 33.3% each)
export const COMPLETE_100_HEALING_QUESTIONS: Healing100QuestionItem[] = [
  ...CYCLE_1_QUESTIONS,
  ...CYCLE_2_QUESTIONS,
  ...CYCLE_3_QUESTIONS,
  ...CYCLE_4_QUESTIONS,
  ...CYCLE_5_QUESTIONS,
];

export function getComplete100HealingQuestion(level: number): Healing100QuestionItem {
  const target = Math.min(111, Math.max(1, level));
  const found = COMPLETE_100_HEALING_QUESTIONS.find(q => q.level === target);
  if (found) return found;
  return COMPLETE_100_HEALING_QUESTIONS[0];
}

export {
  CYCLE_1_QUESTIONS,
  CYCLE_2_QUESTIONS,
  CYCLE_3_QUESTIONS,
  CYCLE_4_QUESTIONS,
  CYCLE_5_QUESTIONS
};
