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
  cycleId: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  description: string;
  mantra: string;
  exercise: string;
  benefit: string;
  unlockedReward: string;
}

export interface ResilienceCycle {
  id: 1 | 2 | 3 | 4;
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

export const POINTS_PER_LEVEL = 15; // 15 points per level = 1500 points for level 100. Fast & encouraging!

export function calculateLevelFromPoints(points: number): number {
  if (points <= 0) return 1;
  const level = Math.floor(points / POINTS_PER_LEVEL) + 1;
  return Math.min(100, Math.max(1, level));
}

export function calculatePointsForLevel(level: number): number {
  if (level <= 1) return 0;
  return (Math.min(100, level) - 1) * POINTS_PER_LEVEL;
}

export function getCycleForLevel(level: number): 1 | 2 | 3 | 4 {
  if (level <= 25) return 1;
  if (level <= 50) return 2;
  if (level <= 75) return 3;
  return 4;
}

export const RESILIENCE_CYCLES: ResilienceCycle[] = [
  {
    id: 1,
    title: "Cycle 1 : Niveaux 1 à 25",
    subtitle: "Se construire une liste de valeurs pour se voir avec la plus grande bienveillance",
    theme: "Valeurs Fondatrices, Auto-Compassion & Regard Bienveillant",
    minLevel: 1,
    maxLevel: 25,
    minPoints: 0,
    maxPoints: 375,
    tag: "Valeurs & Regard Bienveillant",
    colorName: "emerald",
    badgeBg: "bg-[#EAF3DE]",
    badgeBorder: "border-[#506B26]",
    badgeText: "text-[#2D450C]",
    icon: Heart,
    coreMantra: "« En définissant mes valeurs fondamentales, je choisis d'honorer qui je suis et de me regarder avec une bienveillance inconditionnelle et infinie. »",
    description: "Ce premier grand cycle pose le socle identitaire de votre renaissance. Vous apprenez à identifier, clarifier et honorer votre propre liste de valeurs fondamentales (dignité, douceur, respect, intégrité, sécurité) afin de transformer radicalement votre regard intérieur et vous voir sous votre jour le plus digne, aimant et bienveillant.",
    scientificFoundation: "La théorie de l'auto-affirmation des valeurs (Dr Claude Steele, Stanford) démontre que la clarification des valeurs fondamentales neutralise les biais d'autodépréciation, réduit l'activation du système de stress et installe un regard d'auto-compassion stable et protecteur.",
    milestones: [
      {
        level: 1,
        points: 0,
        cycleId: 1,
        title: "L'Étincelle de ma Valeur Intrinsèque",
        subtitle: "Prendre conscience de sa valeur fondamentale",
        description: "Reconnaître que votre valeur ne dépend d'aucun jugement extérieur : vous êtes précieuse par essence.",
        mantra: "Ma valeur humaine est sacrée, inviolable et inconditionnelle.",
        exercise: "Posez la main sur le cœur et répétez : 'J'ai une valeur infinie simplement parce que j'existe.'",
        benefit: "Arrêt immédiat de la spirale d'autocritique et sécrétion d'ocytocine.",
        unlockedReward: "Badge : Étincelle de Valeur Intrinsèque"
      },
      {
        level: 3,
        points: 30,
        cycleId: 1,
        title: "La Première Pierre : La Valeur de Sécurité",
        subtitle: "Mon besoin de protection est légitime",
        description: "Ancrer la sécurité comme valeur non négociable pour orienter chaque choix bienveillant.",
        mantra: "La sécurité et la paix sont mes droits fondamentaux.",
        exercise: "Notez 2 actions bienveillantes qui honorent votre sécurité aujourd'hui.",
        benefit: "Rétablissement du sentiment d'auto-protection somatique.",
        unlockedReward: "Outil : Carte de Valeur - Sécurité & Paix"
      },
      {
        level: 5,
        points: 60,
        cycleId: 1,
        title: "La Boussole de mes 5 Valeurs Cardinaux",
        subtitle: "Choisir ses 5 piliers de vie bienveillants",
        description: "Sélectionner les 5 valeurs qui vous font vous sentir respectée, épanouie et aimée.",
        mantra: "Mes valeurs guident mes pas avec clarté et douceur.",
        exercise: "Choisissez 5 valeurs cardinales (ex: Respect, Authenticité, Douceur, Liberté, Courage).",
        benefit: "Renforcement de la cohérence identitaire et de l'alignement intérieur.",
        unlockedReward: "Fiche d'Exercice : Ma Boussole de Valeurs Personnelles"
      },
      {
        level: 8,
        points: 105,
        cycleId: 1,
        title: "Le Prisme du Regard Bienveillant",
        subtitle: "Se contempler à travers ses valeurs",
        description: "Remplacer le filtre du doute et de la culpabilité par le filtre bienveillant de vos nobles valeurs.",
        mantra: "Je me regarde avec les yeux de la compréhension, de la tendresse et du pardon.",
        exercise: "Contemplez votre parcours passé en reconnaissant votre courage et votre fidélité à vos valeurs.",
        benefit: "Diminution significative de l'autocritique destructive.",
        unlockedReward: "Outil : Miroir du Regard Bienveillant"
      },
      {
        level: 10,
        points: 135,
        cycleId: 1,
        title: "Le Sanctuaire d'Auto-Compassion & de Douceur",
        subtitle: "Transformer sa voix intérieure",
        description: "Parler à soi-même avec l'infinie tendresse d'une mère ou d'une amie dévouée.",
        mantra: "La douceur envers moi-même est ma plus noble vertu.",
        exercise: "Offrez-vous 5 minutes d'écoute silencieuse en formulant des mots de réconfort pur.",
        benefit: "Activation du système parasympathique et régénération neuronale.",
        unlockedReward: "Mode Sanctuaire Débloqué (Ambiance zen personnalisée)"
      },
      {
        level: 15,
        points: 210,
        cycleId: 1,
        title: "Le Bouclier des Valeurs Face aux Jugements",
        subtitle: "Immunité contre la dévalorisation",
        description: "Utiliser votre liste de valeurs comme un filtre infranchissable face aux critiques injustes.",
        mantra: "Les jugements d'autrui n'ont aucun pouvoir sur mes valeurs sacrées.",
        exercise: "Formulez mentalement : 'Ce que l'autre projette ne définit pas qui je suis.'",
        benefit: "Protection contre la manipulation et restauration de l'estime de soi.",
        unlockedReward: "Badge : Gardienne des Valeurs Sacrées"
      },
      {
        level: 20,
        points: 285,
        cycleId: 1,
        title: "Pardon Bienveillant & Réconciliation Intérieure",
        subtitle: "Se pardonner d'avoir oublié ses valeurs par le passé",
        description: "Se pardonner avec compassion les moments où la peur ou l'emprise ont fait taire vos valeurs.",
        mantra: "Je me pardonne tout. Chaque instant est une nouvelle chance d'honorer mes valeurs.",
        exercise: "Écrivez une lettre d'absolution et de bienveillance totale à votre soi d'hier.",
        benefit: "Libération des charges émotionnelles de culpabilité et allègement psychologique.",
        unlockedReward: "Guide : Charte de Réconciliation et d'Auto-Bienveillance"
      },
      {
        level: 25,
        points: 360,
        cycleId: 1,
        title: "Le Sceau Sacré des Valeurs & de la Bienveillance",
        subtitle: "Consécration du Cycle 1",
        description: "Validation intégrale du Cycle 1 : Votre liste de valeurs est vivante et votre regard sur vous-même est devenu pur, bienveillant et protecteur.",
        mantra: "Je me vois telle que je suis : digne, précieuse, fidèle à mes valeurs et profondément aimée par moi-même.",
        exercise: "Célébrez votre liste de valeurs en récitant votre manifeste de bienveillance personnelle.",
        benefit: "Ancrage neurobiologique de l'auto-estime inconditionnelle.",
        unlockedReward: "Trophée : Sceau d'Or des Valeurs & du Regard Bienveillant (Cycle 1 Accompli)"
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
  }
];
