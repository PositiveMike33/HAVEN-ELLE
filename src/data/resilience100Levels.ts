import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Feather, 
  Sun, 
  Smile, 
  Compass, 
  Flame, 
  Key, 
  Target, 
  Eye, 
  Award, 
  Lightbulb, 
  Crown, 
  Bird, 
  Anchor, 
  Scale, 
  Zap, 
  CheckCircle2, 
  Star, 
  Gift, 
  BookOpen, 
  Flower2, 
  Wind, 
  Droplet,
  Volume2
} from 'lucide-react';

export interface ResilienceMilestone {
  level: number;
  points: number; // point threshold to achieve this level
  cycleId: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  description: string;
  mantra: string;
  exercise: string;
  benefit: string;
  unlockedReward: string;
}

export interface ResilienceCycle {
  id: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  theme: string;
  minLevel: number;
  maxLevel: number;
  minPoints: number;
  maxPoints: number;
  tag: string;
  colorName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
  scientificFoundation: string;
  icon: any;
  coreMantra: string;
  milestones: ResilienceMilestone[];
}

export interface HealingQuestion {
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

export const POINTS_PER_LEVEL = 15; // 15 points per level = 1500 points for level 100, 1665 points for level 111.

export function calculateLevelFromPoints(points: number): number {
  if (points <= 0) return 1;
  const level = Math.floor(points / POINTS_PER_LEVEL) + 1;
  return Math.min(111, Math.max(1, level));
}

export function calculatePointsForLevel(level: number): number {
  if (level <= 1) return 0;
  return (Math.min(111, level) - 1) * POINTS_PER_LEVEL;
}

export function getCycleForLevel(level: number): 1 | 2 | 3 | 4 | 5 {
  if (level <= 25) return 1;
  if (level <= 50) return 2;
  if (level <= 75) return 3;
  if (level <= 100) return 4;
  return 5;
}

// Map of curated therapeutic questions for healing validation across all levels
const CURATED_HEALING_QUESTIONS: Record<number, Partial<HealingQuestion>> = {
  1: {
    title: "Étape 1 : Reconnaissance de ma Valeur Sacrée",
    theme: "Valeur Intrinsèque & Sécurité",
    question: "Quelle vérité essentielle choisissez-vous d'ancrer aujourd'hui au fond de votre cœur ?",
    options: [
      "Ma valeur humaine est absolue, inconditionnelle et ne dépend d'aucun regard extérieur.",
      "J'ai le droit fondamental d'être en sécurité, écoutée et respectée.",
      "Je dépose la culpabilité : j'ai fait de mon mieux pour me protéger."
    ],
    reflectionPrompt: "En quelques mots, comment vous sentez-vous dans votre corps en cet instant ?",
    benevolentAffirmation: "« Je reconnais que j'ai une valeur infinie simplement parce que j'existe. »",
    unlockedRewardBadge: "Badge : Clé de la Valeur Sacrée"
  },
  2: {
    title: "Étape 2 : Le Droit à la Douceur",
    theme: "Auto-Compassion & Ralentissement",
    question: "Face aux exigences ou aux souvenirs douloureux, comment pouvez-vous être plus douce avec vous-même aujourd'hui ?",
    options: [
      "En m'accordant du repos sans culpabilité.",
      "En me parlant avec la tendresse d'une amie dévouée.",
      "En ralentissant mon rythme et en écoutant mes besoins physiques."
    ],
    reflectionPrompt: "Quel geste de tendresse pouvez-vous vous offrir aujourd'hui ?",
    benevolentAffirmation: "« La douceur envers moi-même est le remède le plus puissant à la douleur. »",
    unlockedRewardBadge: "Badge : Goutte de Douceur"
  },
  3: {
    title: "Étape 3 : La Valeur Non Négociable de Sécurité",
    theme: "Sécurité & Frontières",
    question: "Pourquoi votre besoin de sécurité émotionnelle et physique est-il légitime et sacré ?",
    options: [
      "Parce que la paix est le sol fertile où ma reconstruction peut s'épanouir.",
      "Parce que personne n'a le droit de m'intimider ou d'éteindre ma sérénité.",
      "Parce que me protéger est mon premier devoir d'amour envers moi-même."
    ],
    reflectionPrompt: "Quelle limite concrète vous procure le plus de réconfort ?",
    benevolentAffirmation: "« Ma sécurité et ma paix intérieure passent avant toute attente extérieure. »",
    unlockedRewardBadge: "Badge : Sceau de Sécurité"
  },
  5: {
    title: "Étape 5 : La Boussole de mes 5 Valeurs",
    theme: "Identité & Alignement",
    question: "Lorsque vous contemplez votre vie à travers vos valeurs (Dignité, Respect, Liberté...), que découvrez-vous de vous-même ?",
    options: [
      "Que je suis une personne noble, intègre et guidée par le bien.",
      "Que mes choix passés étaient guidés par la recherche d'amour et de paix.",
      "Que je possède une force morale inaltérable qui renaît aujourd'hui."
    ],
    reflectionPrompt: "Quelle est la valeur qui vous inspire le plus de fierté aujourd'hui ?",
    benevolentAffirmation: "« Mes valeurs sont mon phare éternel, elles me guident avec clarté et bienveillance. »",
    unlockedRewardBadge: "Badge : Boussole d'Alignement"
  },
  8: {
    title: "Étape 8 : Le Prisme du Regard Bienveillant",
    theme: "Transformation du Dialogue Intérieur",
    question: "Quand le doute ou l'autocritique surgit, quelle voix amie choisissez-vous d'activer ?",
    options: [
      "« Tu es courageuse, tu as traversé des épreuves immenses et tu es digne d'amour. »",
      "« Ce n'est pas ta faute, tu n'as plus à prouver ta valeur à quiconque. »",
      "« Respire. Tu es en sécurité, et je suis à tes côtés pour toujours. »"
    ],
    reflectionPrompt: "Quelle phrase aimante aimeriez-vous entendre de votre plus proche alliée ?",
    benevolentAffirmation: "« Je me regarde avec les yeux de la bienveillance pure et inconditionnelle. »",
    unlockedRewardBadge: "Badge : Miroir Bienveillant"
  },
  10: {
    title: "Étape 10 : Le Sanctuaire de la Voix Intérieure",
    theme: "Consécration du Palier 10",
    question: "Comment votre relation avec vous-même s'est-elle transformée depuis que vous honorez vos valeurs ?",
    options: [
      "Je me sens plus solide, moins perméable aux jugements et aux critiques injustes.",
      "Je m'accorde enfin le droit de ressentir mes émotions sans les refouler.",
      "Je commence à ressentir une profonde fierté pour le chemin que je parcours chaque jour."
    ],
    reflectionPrompt: "Qu'avez-vous envie de célébrer aujourd'hui dans votre propre courage ?",
    benevolentAffirmation: "« Je suis devenue mon propre refuge protecteur, doux et inviolable. »",
    unlockedRewardBadge: "Trophée : Sanctuaire d'Ancrage (Palier 10 Validé)"
  },
  11: {
    title: "Étape 11 : Défaire le Poison de la Comparaison",
    theme: "Singularité & Bienveillance",
    question: "Comment accueillir votre rythme unique de guérison sans vous comparer aux autres ?",
    options: [
      "En regardant les meilleurs et juger mon parcours singulier ?",
      "En voyant le monde comme des gens faibles et moi comme une personne meilleure ?",
      "En célébrant chaque micro-pas sans exiger une perfection imaginaire et en honorant mon rythme."
    ],
    correctOptionIndex: 2,
    explanation: "La comparaison et le jugement (vers le haut comme vers le bas) nourrissent l'anxiété et le désalignement. Seule l'auto-compassion bienveillante et l'accueil de vos micro-pas honorent votre rythme sacré de guérison.",
    reflectionPrompt: "Quelle est votre plus belle petite victoire de ces derniers jours ?",
    benevolentAffirmation: "« Mon chemin de guérison est unique, sacré et avance à la perfection. »",
    unlockedRewardBadge: "Badge : Fleur de Singularité"
  },
  15: {
    title: "Étape 15 : Le Bouclier Inviolable des Valeurs",
    theme: "Protection Psychologique",
    question: "Face à une tentative de manipulation ou de culpabilisation, comment vos valeurs vous protègent-elles ?",
    options: [
      "Elles me rappellent que les paroles toxiques sont le reflet de l'autre, pas de ma vérité.",
      "Elles me donnent la force de refuser le rôle de coupable qu'on veut m'imposer.",
      "Elles me permettent de garder mon calme et de me mettre à l'abri sans surenchère."
    ],
    reflectionPrompt: "Quel bouclier invisible visualisez-vous autour de votre cœur ?",
    benevolentAffirmation: "« Mes valeurs sont mon armure de lumière, aucune ombre ne peut les altérer. »",
    unlockedRewardBadge: "Badge : Bouclier Doré des Valeurs"
  },
  20: {
    title: "Étape 20 : Réconciliation Intégrale avec Soi",
    theme: "Absolution & Paix du Cœur",
    question: "Quel pardon fondamental accordez-vous à la femme que vous étiez hier ?",
    options: [
      "Je lui pardonne d'avoir fait confiance, car la naïveté était de la générosité de cœur.",
      "Je lui pardonne d'avoir douté d'elle-même sous l'emprise.",
      "Je la serre dans mes bras avec gratitude car c'est elle qui m'a menée jusqu'ici vivante."
    ],
    reflectionPrompt: "Quel mot d'amour infini soufflez-vous à votre passé ?",
    benevolentAffirmation: "« Je me pardonne tout. Je m'aime entièrement et j'embrasse mon présent. »",
    unlockedRewardBadge: "Badge : Ailes de Réconciliation"
  },
  25: {
    title: "Étape 25 : Couronnement du Cycle 1 (Valeurs & Bienveillance)",
    theme: "Grand Bilan Initiatique",
    question: "En validant ce 25e niveau, quelle promesse solennelle faites-vous à votre être tout entier ?",
    options: [
      "Je promets de ne plus jamais m'abandonner ni trahir mes valeurs de dignité et de paix.",
      "Je promets de toujours me regarder avec la plus haute bienveillance, quoi qu'il arrive.",
      "Je promets d'être ma première protectrice, ma plus fidèle alliée et ma source d'amour."
    ],
    reflectionPrompt: "Quel est votre manifeste personnel pour ouvrir la porte du Cycle 2 ?",
    benevolentAffirmation: "« Je suis couronnée de dignité. Mes valeurs sont vivantes et mon regard sur moi est pur amour. »",
    unlockedRewardBadge: "Trophée Suprême : Sceau Sacré du Cycle 1 Validé"
  }
};

import { COMPLETE_100_HEALING_QUESTIONS, getComplete100HealingQuestion } from './resilience100QuestionsData';

export function getHealingQuestionForLevel(level: number): HealingQuestion {
  const targetLevel = Math.min(111, Math.max(1, level));
  return getComplete100HealingQuestion(targetLevel);
}

export { COMPLETE_100_HEALING_QUESTIONS, getComplete100HealingQuestion };


export const RESILIENCE_CYCLES: ResilienceCycle[] = [
  {
    id: 1,
    title: "Cycle 1 : Niveaux 1 à 25",
    subtitle: "Maîtrise des 5 Accords Toltèques & Regard de Bienveillance Inconditionnelle",
    theme: "5 Accords Toltèques, Auto-Compassion & Immunité Relationnelle",
    minLevel: 1,
    maxLevel: 25,
    minPoints: 0,
    maxPoints: 375,
    tag: "5 Accords & Bienveillance",
    colorName: "emerald",
    badgeBg: "bg-[#EAF3DE]",
    badgeBorder: "border-[#506B26]",
    badgeText: "text-[#2D450C]",
    icon: Heart,
    coreMantra: "« En intégrant les 5 Accords Toltèques, je me parle avec amour, je transmute le venin extérieur et je redeviens souveraine et intouchable face à la manipulation. »",
    description: "Ce premier grand cycle pose le socle identitaire et protecteur de votre renaissance. À travers 25 étapes initiatiques (5 questions par Accord), vous maîtrisez la Parole Impeccable (se parler avec amour et transmuter la parole négative), le Non-Personnel (déjouer la culpabilisation), le Non-Supposé (communiquer avec clarté), Faire de son Mieux (auto-compassion) et le Scepticisme Lucide (protection vitale contre les fausses promesses, le love-bombing et la manipulation).",
    scientificFoundation: "La thérapie d'acceptation et d'engagement (ACT) combinée aux principes toltèques de restructuration cognitive neutralise l'entropie émotionnelle, désactive l'hyper-réactivité de l'amygdale et rétablit une sécurité psychologique inviolable.",
    milestones: [
      {
        level: 1,
        points: 0,
        cycleId: 1,
        title: "Accord 1 : L'Étincelle de la Parole Aimante",
        subtitle: "Se parler avec une tendresse infinie",
        description: "Remplacer l'autocritique réflexe par un dialogue intérieur empreint de douceur et d'encouragement.",
        mantra: "Ma parole envers moi-même est un baume sacré de tendresse et de respect inconditionnel.",
        exercise: "Posez la main sur le cœur et formulez une parole de réconfort et d'amour à vous-même.",
        benefit: "Arrêt immédiat de la spirale d'autocritique et libération d'ocytocine.",
        unlockedReward: "Badge : Clé de la Parole Aimante"
      },
      {
        level: 5,
        points: 60,
        cycleId: 1,
        title: "Accord 1 : La Transmutation & le Verbe Créateur",
        subtitle: "Consécration de la Parole Impeccable",
        description: "Transmuter le venin verbal extérieur en affirmations de triomphe et exprimer des limites claires.",
        mantra: "Par mes paroles conscientes, je bâtis un sanctuaire inviolable de paix et de renouveau.",
        exercise: "Formulez à voix haute une affirmation puissante de dignité qui transmute une critique passée.",
        benefit: "Reprogrammation neuronale positive et restauration de la voix souveraine.",
        unlockedReward: "Trophée : Maîtrise de la Parole Impeccable"
      },
      {
        level: 10,
        points: 135,
        cycleId: 1,
        title: "Accord 2 : L'Armure d'Invulnérabilité du Cœur",
        subtitle: "Consécration du Non-Personnel (Palier 10)",
        description: "Reconnaître les attaques d'autrui comme leurs propres projections et rejeter toute culpabilisation.",
        mantra: "Mon cœur est invulnérable au venin d'autrui. Je marche dans la lumière de ma paix souveraine.",
        exercise: "Visualisez un bouclier doré renvoyant chaque critique à son émetteur sans l'absorber.",
        benefit: "Activation du système parasympathique et immunité psychologique contre l'agressivité.",
        unlockedReward: "Trophée : Sanctuaire d'Immunité Émotionnelle (Palier 10 Validé)"
      },
      {
        level: 15,
        points: 210,
        cycleId: 1,
        title: "Accord 3 : La Clarté Absolue contre les Suppositions",
        subtitle: "Consécration du Non-Supposé",
        description: "Arrêter les scénarios anxiogènes, oser poser des questions limpides et voir les faits réels.",
        mantra: "Je renonce aux suppositions. Je m'ancre dans les faits réels et la communication directe.",
        exercise: "Identifiez une incertitude et rédigez une question simple et factuelle pour la clarifier.",
        benefit: "Effondrement immédiat de la charge cognitive et de l'anxiété anticipatoire.",
        unlockedReward: "Trophée : Maîtrise du Non-Supposé"
      },
      {
        level: 20,
        points: 285,
        cycleId: 1,
        title: "Accord 4 : L'Alliance d'Or du 'Faire de son Mieux'",
        subtitle: "Consécration du Mieux Continu & Pardon Rétrospectif",
        description: "Honorer ses rythmes d'énergie, abandonner le perfectionnisme et s'absoudre de tout choix passé.",
        mantra: "Mon mieux d'aujourd'hui est parfait. J'ai fait de mon mieux à chaque instant de ma vie.",
        exercise: "Célébrez 3 micro-victoires accomplies aujourd'hui avec amour et fierté.",
        benefit: "Désactivation complète du Juge intérieur et apaisement durable de l'estime de soi.",
        unlockedReward: "Trophée : Maîtrise du Mieux Continu"
      },
      {
        level: 25,
        points: 360,
        cycleId: 1,
        title: "Accord 5 : Le Couronnement du Scepticisme Lucide",
        subtitle: "Consécration Suprême du Cycle 1",
        description: "Désamorcer les fausses promesses, le love-bombing et le gaslighting. Souveraineté totale des 5 Accords.",
        mantra: "Je suis couronnée de dignité et de lucidité. Les 5 Accords sont vivants en moi. Je m'aime infiniment.",
        exercise: "Récitez votre engagement solennel de fidélité à vos valeurs et à votre liberté.",
        benefit: "Immunité totale contre la manipulation récidivante et entrée triomphale dans le Cycle 2.",
        unlockedReward: "Trophée Suprême : Grande Couronne des 5 Accords Toltèques (Cycle 1 Accompli)"
      }
    ]
  },
  {
    id: 2,
    title: "Cycle 2 : Niveaux 26 à 50",
    subtitle: "Développement personnel, Force & Nouveau contexte",
    theme: "Empowerment, Recadrage Cognitif & Limites Claires",
    minLevel: 26,
    maxLevel: 50,
    minPoints: 375,
    maxPoints: 750,
    tag: "Force & Puissance d'Action",
    colorName: "amber",
    badgeBg: "bg-[#FEF3D6]",
    badgeBorder: "border-[#A16207]",
    badgeText: "text-[#713F12]",
    icon: Flame,
    coreMantra: "« Ce que j'ai traversé n'a pas détruit ma lumière ; cela a affûté ma lucidité, mon discernement et ma puissance. »",
    description: "Ce deuxième grand cycle vous permet de relire les épreuves vécues non pas comme une fatalité mais comme un catalyseur de force. Vous posez des limites inviolables et reprenez les rênes de votre destinée.",
    scientificFoundation: "La croissance post-traumatique (Tedeschi & Calhoun) démontre que 89% des personnes accompagnées développent une force mentale et un sens des priorités supérieur après un recadrage cognitif structuré.",
    milestones: [
      {
        level: 26,
        points: 375,
        cycleId: 2,
        title: "Éveil de la Lucidité",
        subtitle: "Voir la réalité sans illusion",
        description: "Démasquer les mécanismes d'emprise et de manipulation avec un œil d'aigle.",
        mantra: "Mes yeux sont ouverts. Je ne confonds plus le contrôle avec l'amour.",
        exercise: "Listez 3 faits objectifs qui prouvent votre lucidité grandissante.",
        benefit: "Renforcement de la clarté mentale et de la confiance en son intuition.",
        unlockedReward: "Badge : Œil de Lucidité"
      },
      {
        level: 30,
        points: 435,
        cycleId: 2,
        title: "La Frontière Sacrée",
        subtitle: "L'art du 'Non' libérateur",
        description: "Établir des limites infranchissables pour préserver votre énergie vitale.",
        mantra: "Mon 'Non' est un 'Oui' éclatant à ma dignité.",
        exercise: "Entraînez-vous à prononcer 'Non' avec calme, ancrage et sans justification.",
        benefit: "Restauration du sentiment de contrôle territorial et psychique.",
        unlockedReward: "Outil : Générateur de Réponses de Limites Fermes"
      },
      {
        level: 35,
        points: 510,
        cycleId: 2,
        title: "Transmutation de la Vulnérabilité",
        subtitle: "Votre histoire devient votre force",
        description: "Comprendre que vos cicatrices sont le témoin de votre invincibilité.",
        mantra: "Je ne suis pas une victime impuissante, je suis une survivante victorieuse.",
        exercise: "Identifiez 3 compétences exceptionnelles nées de vos défis (courage, vigilance, empathie).",
        benefit: "Effet d'empowerment cognitif validé par l'échelle de résilience de Connor-Davidson.",
        unlockedReward: "Fiche : Matrice de Transmutation des Forces"
      },
      {
        level: 40,
        points: 585,
        cycleId: 2,
        title: "Reprise du Pouvoir Décisionnel",
        subtitle: "Reprendre les commandes",
        description: "Prendre chaque décision de votre vie en parfait accord avec vos valeurs profondes.",
        mantra: "Je suis la seule capitaine de mon existence.",
        exercise: "Prenez une petite décision aujourd'hui uniquement pour votre plaisir personnel.",
        benefit: "Activation du système de récompense dopaminergique endogène.",
        unlockedReward: "Badge : Capitaine de Destinée"
      },
      {
        level: 45,
        points: 660,
        cycleId: 2,
        title: "L'Élévation de Perspective",
        subtitle: "Prendre de la hauteur",
        description: "Observer les épreuves du passé depuis le sommet d'une montagne imaginaire.",
        mantra: "Je vois le chemin parcouru et la grandeur de ma métamorphose.",
        exercise: "Prenez 3 grandes inspirations en vous imaginant contempler votre parcours avec fierté.",
        benefit: "Désensibilisation émotionnelle des souvenirs douloureux.",
        unlockedReward: "Accès : Méditation Panoramique Haute Conscience"
      },
      {
        level: 50,
        points: 735,
        cycleId: 2,
        title: "Le Bouclier de Souveraineté",
        subtitle: "Force inébranlable",
        description: "Validation totale du Cycle 2 : Votre pouvoir personnel est restauré et protégé.",
        mantra: "Rien ne peut éteindre la flamme souveraine qui m'habite.",
        exercise: "Visualisez un cercle doré de protection impénétrable autour de votre corps.",
        benefit: "Ancrage somatique de puissance et de sécurité inviolable.",
        unlockedReward: "Trophée : Bouclier Doré de Souveraineté (Cycle 2 Accompli)"
      }
    ]
  },
  {
    id: 3,
    title: "Cycle 3 : Niveaux 51 à 75",
    subtitle: "Le pardon à soi pour pardonner à autrui",
    theme: "Pardon Libérateur, Coupure des Liens Toxiques & Paix",
    minLevel: 51,
    maxLevel: 75,
    minPoints: 750,
    maxPoints: 1125,
    tag: "Libération & Pardon Pur",
    colorName: "blue",
    badgeBg: "bg-[#E0F2FE]",
    badgeBorder: "border-[#0284C7]",
    badgeText: "text-[#075985]",
    icon: Feather,
    coreMantra: "« Pardonner ne signifie pas excuser ni oublier ; pardonner, c'est couper définitivement la corde de la souffrance pour m'envoler libre. »",
    description: "Ce troisième grand cycle aborde la délivrance suprême : se pardonner d'avoir cru, d'avoir attendu ou d'avoir souffert, afin de libérer l'espace pour un pardon émancipateur qui rompt à jamais l'emprise.",
    scientificFoundation: "Les études de l'Université de Stanford (Forgiveness Project - Dr Fred Luskin) prouvent que le pardon libérateur réduit les symptômes de stress post-traumatique de 40% et diminue la pression artérielle systolique.",
    milestones: [
      {
        level: 51,
        points: 750,
        cycleId: 3,
        title: "Pardonner ses Attentes d'Hier",
        subtitle: "Abandonner l'espoir d'un passé différent",
        description: "Se pardonner d'avoir espéré que l'autre change ou reconnaisse sa faute.",
        mantra: "Je me pardonne d'avoir espéré l'impossible. Je tourne mon espoir vers moi-même.",
        exercise: "Visualisez déposer une clé rouillée sur le sol en signe de détachement.",
        benefit: "Arrêt des ruminations de revanche ou de justification.",
        unlockedReward: "Badge : Clé de Délivrance"
      },
      {
        level: 55,
        points: 810,
        cycleId: 3,
        title: "Rupture des Cordes Toxiques",
        subtitle: "Couper les liens invisibles",
        description: "Couper symboliquement tous les canaux énergétiques et émotionnels d'emprise.",
        mantra: "Je coupe tout lien destructeur. Je récupère mon énergie à 100%.",
        exercise: "Faites le geste physique de trancher l'air devant vous en expirant puissamment.",
        benefit: "Reprise d'autonomie psychique et réduction de l'hypervigilance.",
        unlockedReward: "Exercice : Rituel des Bonhommes Allumettes Guidé"
      },
      {
        level: 60,
        points: 885,
        cycleId: 3,
        title: "Transmutation de la Colère",
        subtitle: "Transformer le poison en carburant de vie",
        description: "Utiliser l'énergie de l'indignation pour bâtir votre vie nouvelle dans la sérénité.",
        mantra: "Ma colère m'a protégée, maintenant ma paix me propulse.",
        exercise: "Inspirez la paix blanche, expirez la fumée grise de la rancœur.",
        benefit: "Diminution des marqueurs inflammatoires (IL-6 et CRP).",
        unlockedReward: "Badge : Alchimiste du Cœur"
      },
      {
        level: 65,
        points: 960,
        cycleId: 3,
        title: "Le Pardon Émancipateur",
        subtitle: "Lâcher le poison",
        description: "Comprendre que garder de la rancœur, c'est boire du poison en espérant que l'autre meure.",
        mantra: "Je refuse de laisser le passé diriger mon présent. Je suis libre.",
        exercise: "Répétez intérieurement : 'Je te rends ton histoire et je reprends la mienne.'",
        benefit: "Restauration de la variabilité de la fréquence cardiaque (VRC optimale).",
        unlockedReward: "Outil : Décharge Émotionnelle Symbolique"
      },
      {
        level: 70,
        points: 1035,
        cycleId: 3,
        title: "La Paix de l'Esprit",
        subtitle: "Silence intérieur retrouvé",
        description: "Expérimenter le silence mental débarrassé des dialogues intérieurs stériles.",
        mantra: "Mon esprit est un lac limpide et calme.",
        exercise: "Écoutez le silence entre deux respirations pendant 2 minutes.",
        benefit: "Amplification des ondes cérébrales Alpha et Thêta apaisantes.",
        unlockedReward: "Accès : Sons Fréquences 432Hz & 528Hz de Réparation"
      },
      {
        level: 75,
        points: 1110,
        cycleId: 3,
        title: "L'Envol de la Colombe",
        subtitle: "Liberté absolue",
        description: "Validation totale du Cycle 3 : Le pardon a nettoyé toute amertume. Vous êtes affranchie.",
        mantra: "Je vole de mes propres ailes, légère, pure et invincible.",
        exercise: "Ouvrez les bras vers le ciel et ressentez l'espace infini devant vous.",
        benefit: "Sentiment profond d'allègement et de régénération existentielle.",
        unlockedReward: "Trophée : Colombe d'Argent du Pardon Libéré (Cycle 3 Accompli)"
      }
    ]
  },
  {
    id: 4,
    title: "Cycle 4 : Niveaux 76 à 100",
    subtitle: "L'amour sans condition & La guérison totale émotionnelle",
    theme: "Amour Inconditionnel, Acceptation Bienveillante & Sanctuaire Éternel",
    minLevel: 76,
    maxLevel: 100,
    minPoints: 1125,
    maxPoints: 1500,
    tag: "Amour Pur & Guérison Totale",
    colorName: "purple",
    badgeBg: "bg-[#F3E8FF]",
    badgeBorder: "border-[#9333EA]",
    badgeText: "text-[#6B21A8]",
    icon: Sparkles,
    coreMantra: "« Je suis guérie, entière, rayonnante. Mon cœur est un sanctuaire d'amour inconditionnel et de paix inaltérable. »",
    description: "Le sommet de votre ascension. Vous atteignez la guérison émotionnelle intégrale, l'amour inconditionnel pour vous-même et le monde, et une paix que rien ne peut plus ébranler.",
    scientificFoundation: "Les neurosciences contemplatives (Dr Richard Davidson) démontrent que la pratique de la bienveillance inconditionnelle restructure durablement l'insula et le cortex cingulaire antérieur, procurant une résilience pérenne.",
    milestones: [
      {
        level: 76,
        points: 1125,
        cycleId: 4,
        title: "Ouverture du Cœur Sacré",
        subtitle: "L'amour sans peur",
        description: "Ouvrir votre cœur à la vie avec confiance, sachant que votre sécurité est désormais inaltérable.",
        mantra: "Mon cœur est ouvert, fort et totalement protégé.",
        exercise: "Ressentez une lumière rose et dorée irradier depuis le centre de votre poitrine.",
        benefit: "Sécrétion maximale d'endorphines de joie et d'harmonie.",
        unlockedReward: "Badge : Rayonnement Cardiaque"
      },
      {
        level: 80,
        points: 1185,
        cycleId: 4,
        title: "L'Acceptation Bienveillante",
        subtitle: "Faire la paix avec la vie",
        description: "Accueillir chaque instant avec gratitude, sans résistance ni lutte inutile.",
        mantra: "J'accueille la vie avec grâce. Tout concourt à mon épanouissement.",
        exercise: "Prononcez avec le cœur : 'Oui à ma vie, Oui à ma renaissance.'",
        benefit: "Harmonisation globale du système neuro-végétatif.",
        unlockedReward: "Ressource : Guide de l'Acceptation Radicale"
      },
      {
        level: 85,
        points: 1260,
        cycleId: 4,
        title: "L'Amour Inconditionnel de Soi",
        subtitle: "L'union sacrée avec son être",
        description: "S'aimer dans toutes ses facettes, sans condition, sans attente et pour toujours.",
        mantra: "Je suis digne du plus grand amour simplement parce que j'existe.",
        exercise: "Regardez vos mains et remerciez votre corps pour toute sa bravoure.",
        benefit: "Sentiment de plénitude auto-suffisante et d'invulnérabilité affective.",
        unlockedReward: "Badge : Joyau d'Amour Pur"
      },
      {
        level: 90,
        points: 1335,
        cycleId: 4,
        title: "Le Rayonnement Protecteur",
        subtitle: "Devenir un phare pour les autres",
        description: "Votre présence seule apaise, inspire et éclaire celles et ceux qui souffrent encore.",
        mantra: "Ma lumière éclaire mon chemin et inspire la paix autour de moi.",
        exercise: "Envoyez une pensée d'amour et de force à toutes les femmes qui luttent en ce moment.",
        benefit: "Renforcement de l'empathie saine sans absorption de la douleur d'autrui.",
        unlockedReward: "Rôle Honorifique : Phare de Résilience"
      },
      {
        level: 95,
        points: 1410,
        cycleId: 4,
        title: "L'Harmonie Absolue",
        subtitle: "L'état de grâce intérieure",
        description: "Vivre dans une sérénité inébranlable où la peur a laissé place à la certitude d'être chez soi en soi.",
        mantra: "Je suis la paix. Je suis la vie. Je suis en sécurité pour l'éternité.",
        exercise: "Savourez la sensation d'être complète et comblée dans l'instant présent.",
        benefit: "Alignement optimal cœur-cerveau (Cohérence cardiaque maximale).",
        unlockedReward: "Déblocage : Mode Sanctuaire Éternel"
      },
      {
        level: 100,
        points: 1485,
        cycleId: 4,
        title: "Niveau 100 : Renaissance Totale & Guérison Parfaite",
        subtitle: "Le sommet de votre accomplissement",
        description: "Félicitations incommensurables. Vous avez franchi les 100 paliers de la résilience, de l'auto-amour, du pardon et de la guérison émotionnelle totale.",
        mantra: "Je suis guérie. Je suis victorieuse. Je suis amour inconditionnel.",
        exercise: "Posez votre couronne symbolique et célébrez votre incroyable triomphe de vie.",
        benefit: "Intégration permanente du schéma de renaissance post-traumatique.",
        unlockedReward: "Grande Récompense : Trophée Suprême de la Guérison Totale & Avatar Éternel HAVEN-ELLE"
      }
    ]
  },
  {
    id: 5,
    title: "Cycle Secret Bonus : Niveaux 101 à 111",
    subtitle: "Les Mystères du Kybalion & Le Sacre de l'Éveillée",
    theme: "Hermétisme Sacré, Transmutation Mentale & Maîtrise Vibratoire",
    minLevel: 101,
    maxLevel: 111,
    minPoints: 1500,
    maxPoints: 1665,
    tag: "Haute Maîtrise Spirituelle",
    colorName: "emerald",
    badgeBg: "bg-[#ECFDF5]",
    badgeBorder: "border-[#059669]",
    badgeText: "text-[#065F46]",
    icon: Crown,
    coreMantra: "« Je suis le Sanctuaire Vivant. Je transmute le plomb en or et je règne sur ma réalité dans la paix absolue. »",
    description: "Ce cycle secret bonus dévoile les 11 Arcanes de l'Hermétisme et du Kybalion appliqués à la souveraineté émotionnelle. L'initiée devient la cause souveraine de son existence et décroche le Trophée Légendaire [ÉVEILLÉ].",
    scientificFoundation: "La métacognition avancée et les principes de cybernétique mentale permettent la neutralisation émotionnelle réflexe et l'alignement des intentions avec une efficacité maximale.",
    milestones: [
      {
        level: 101,
        points: 1500,
        cycleId: 5,
        title: "Arcane I : Le Principe du Mentalisme",
        subtitle: "« Le Tout est Esprit ; l'Univers est Mental »",
        description: "Comprendre que votre univers intérieur crée l'intégralité de votre expérience vécue.",
        mantra: "Mon esprit est le temple créateur de ma paix.",
        exercise: "Fermez les yeux et observez le monde de pensées que vous choisissez de sanctifier.",
        benefit: "Prise de conscience de la matrice de réalité intérieure.",
        unlockedReward: "Arcane I : Le Sceptre de l'Esprit Mental"
      },
      {
        level: 104,
        points: 1545,
        cycleId: 5,
        title: "Arcane IV : Le Principe de Polarité",
        subtitle: "« Les contraires ont la même nature »",
        description: "Transmuter la peur en courage et la peine en gratitude en glissant sur le curseur vibratoire.",
        mantra: "Je transmute l'ombre en lumière. Tout paradoxe se dissout en mon centre.",
        exercise: "Identifiez une crispation et glissez intentionnellement vers son pôle de douceur.",
        benefit: "Maîtrise immédiate de la transmutation des états émotionnels.",
        unlockedReward: "Arcane IV : Le Caducée de la Polarité Unifiée"
      },
      {
        level: 107,
        points: 1590,
        cycleId: 5,
        title: "Arcane VII : Le Principe de Genre & Alchimie",
        subtitle: "« Le masculin et le féminin s'unissent pour créer »",
        description: "Marier l'intuition bienveillante et la structure protectrice pour une souveraineté féconde.",
        mantra: "J'unis en moi la sagesse réceptive et la puissance d'action.",
        exercise: "Posez un geste ferme et protecteur tout en gardant le cœur grand ouvert.",
        benefit: "Équilibre parfait entre réceptivité et décision d'action.",
        unlockedReward: "Arcane VII : L'Union Alchimique Sacrée"
      },
      {
        level: 110,
        points: 1635,
        cycleId: 5,
        title: "Arcane X : La Volonté Pure",
        subtitle: "L'autorité souveraine de l'âme",
        description: "L'alignement sans faille avec la vérité et la justice intérieure, libre de tout doute.",
        mantra: "Ma volonté est pure, juste et invincible.",
        exercise: "Proclamez votre vérité d'âme avec calme et autorité bienveillante.",
        benefit: "Immunité totale contre l'influence et le doute existentiel.",
        unlockedReward: "Arcane X : Le Sceau Royal de la Volonté Pure"
      },
      {
        level: 111,
        points: 1650,
        cycleId: 5,
        title: "Niveau 111 : Le Sacre de l'Initiée — L'Éveil Absolu",
        subtitle: "Consécration Suprême [ÉVEILLÉ]",
        description: "Accomplissement du Grand Œuvre des 111 Niveaux. Vous recevez la Grande Consécration Cosmique d'HAVEN-ELLE.",
        mantra: "JE SUIS ÉVEILLÉE. Je suis le temple vivant de la sagesse, souveraine pour l'éternité.",
        exercise: "Gravez votre serment éternel d'Éveillée dans le Grand Livre d'Or du Sanctuaire.",
        benefit: "Consécration ultime de l'état de résilience, d'amour pur et d'invulnérabilité.",
        unlockedReward: "🏆 Trophée Suprême Légendaire : [ÉVEILLÉ] — Le Grand Sceau Cosmique d'HAVEN-ELLE"
      }
    ]
  }
];

export const QUICK_DAILY_ACTIONS = [
  {
    id: 'respiration',
    title: 'Respiration d\'Auto-Compassion',
    subtitle: 'Cohérence cardiaque (3 min)',
    points: 15,
    icon: Wind,
    cycle: 1,
    actionDesc: 'Calme le système nerveux et libère des endorphines.'
  },
  {
    id: 'values_compassion',
    title: 'Mes 5 Valeurs & Regard Bienveillant',
    subtitle: 'Clarification & Douceur envers soi',
    points: 15,
    icon: Heart,
    cycle: 1,
    actionDesc: 'Active votre liste de valeurs sacrées et renforce l\'auto-bienveillance.'
  },
  {
    id: 'reframing',
    title: 'Recadrage de Force & Clarté',
    subtitle: 'Poser une limite saine',
    points: 20,
    icon: Flame,
    cycle: 2,
    actionDesc: 'Transforme l\'épreuve en lucidité et souveraineté.'
  },
  {
    id: 'forgiveness_note',
    title: 'Lettre de Libération & Pardon',
    subtitle: 'Couper un lien toxique',
    points: 25,
    icon: Feather,
    cycle: 3,
    actionDesc: 'Dépose le fardeau de la rancœur pour s\'envoler libre.'
  },
  {
    id: 'unconditional_love',
    title: 'Rayonnement d\'Amour Inconditionnel',
    subtitle: 'Sanctuaire de plénitude',
    points: 30,
    icon: Sparkles,
    cycle: 4,
    actionDesc: 'Ancre la guérison totale et la paix inaltérable.'
  },
  {
    id: 'kybalion_transmutation',
    title: 'Transmutation Hermétique du Kybalion',
    subtitle: 'Maîtrise de la vibration & Polarité',
    points: 35,
    icon: Crown,
    cycle: 5,
    actionDesc: 'Élève instantanément votre taux vibratoire et transmute le plomb en or.'
  }
];
