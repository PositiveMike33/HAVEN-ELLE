import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Heart, 
  ShieldCheck, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  BookOpen, 
  Eye, 
  EyeOff, 
  Volume2, 
  ArrowRight,
  TrendingUp,
  Flame,
  Crown,
  Compass,
  MessageSquareHeart,
  Lightbulb,
  Headphones,
  Check,
  RefreshCw,
  Zap
} from 'lucide-react';
import { CompanionMemoryService } from '../utils/companionMemory';

export interface ToltecFlashcardItem {
  id: string;
  agreementNumber: 1 | 2 | 3 | 4 | 5;
  agreementName: string;
  agreementTag: string;
  questionNumberLabel?: string; // e.g. "Question 1 / 111 : Le Miroir du Verbe — Bénir ou Maudire"
  questionContext?: string; // Context intro
  scenarioSubtitle?: string;
  realWorldScenario: string;
  philosophicalFramework?: {
    title: string;
    quoteTitle: string;
    quoteText: string;
    quoteAuthor: string;
    decodingTitle: string;
    macroMicroTitle: string;
    macroMicroDesc: string;
    causeEffectTitle: string;
    causeEffectDesc: string;
    verbVectorTitle: string;
    verbVectorDesc: string;
  };
  alignmentKey?: {
    title: string;
    hiddenPrinciple: string;
    groundingGesture: string;
  };
  question: string;
  options: {
    id: 'A' | 'B' | 'C';
    text: string;
    sublabel?: string;
    isResilientToltec: boolean;
    // The revealed analysis hidden until answered
    revealedTitle: string;
    revealedAnalysis: string;
    growthMindsetForMistake?: string; // Framing failure as healthy continuous learning
    somaticShiftPrompt: string;
  }[];
  scientificGrowthLesson: string;
  toltecMantra: string;
}

export const TOLTEC_FLASHCARD_QUESTIONS: ToltecFlashcardItem[] = [
  // --- ACCORD 1 : PAROLE IMPECCABLE ---
  {
    id: 'flash_toltec_1',
    agreementNumber: 1,
    agreementName: 'Que ta parole soit impeccable',
    agreementTag: 'Accord 1 • Verbe Aimant & Alchimie Intérieure',
    questionNumberLabel: 'Question 1 / 111 : Le Miroir du Verbe — Bénir ou Maudire',
    questionContext: `Dans la tradition toltèque, ta parole est une baguette magique : chaque mot prononcé ou pensé est un ordre créateur envoyé à ton univers intérieur. Selon les enseignements hermétiques, ton esprit est la cause première de ta réalité (Loi du Mentalisme et Loi de Correspondance). Lorsque tu vis une injustice, utiliser des mots destructeurs contre toi ou contre l'autre revient à jeter une malédiction (male-dicere : mal dire) qui empoisonne ta propre souveraineté personnelle. À l'inverse, choisir une parole impeccable revient à poser une bénédiction (bene-dicere : bien dire) qui élève immédiatement ta fréquence et transmute l'épreuve.`,
    scenarioSubtitle: "📌 La Mise en Situation Réelle",
    realWorldScenario: `Tu viens de subir un reproche injuste et blessant d'une personne proche, qui tente de te faire porter le chapeau pour ses propres erreurs et son instabilité émotionnelle. Ton cœur s'accélère, la colère monte, et ton mental veut immédiatement réagir.`,
    philosophicalFramework: {
      title: "Le Principe de Correspondance et la Puissance du Verbe",
      quoteTitle: "1. Fondement Philosophique : Le Principe de Correspondance",
      quoteText: "« Ce qui est en haut est comme ce qui est en bas, et ce qui est en bas est comme ce qui est en haut ; ce qui est en dedans est comme ce qui est en dehors, et ce qui est en dehors est comme ce qui est en dedans. »",
      quoteAuthor: "— Attribué à Hermès Trismégiste (Table d'Émeraude & Kybalion / Tradition Hermétique)",
      decodingTitle: "1.2. Décodage des Plans d'Existence",
      macroMicroTitle: "En Haut / En Bas (Macrocosme & Microcosme)",
      macroMicroDesc: "Les lois qui régissent l'univers, les étoiles et la conscience cosmique sont les mêmes que celles qui régissent l'atome, la cellule et la psyché humaine.",
      causeEffectTitle: "En Dedans / En Dehors (Cause & Effet)",
      causeEffectDesc: "Le monde intérieur (pensées, émotions, croyances, intentions) constitue la cause première, tandis que le monde extérieur (circonstances, relations, événements matériels) n'est que le reflet ou l'effet. On ne manifeste pas ce que l'on veut, on manifeste et attire ce que l'on vibre intérieurement.",
      verbVectorTitle: "2. Le Verbe : Vecteur de Transmutation entre l'Intérieur et l'Extérieur",
      verbVectorDesc: "La parole est le pont dynamique par lequel l'énergie immatérielle (la pensée, l'intention) s'incarne dans le monde physique et vibratoire."
    },
    alignmentKey: {
      title: "🧭 La Clé d'Alignement pour l'Apprentie",
      hiddenPrinciple: "La Loi de Polarité et du Mentalisme (Le Kybalion) — Ce sur quoi tu portes ton verbe et ton attention devient le moule de ta réalité. Ne donne aucun pouvoir aux paroles de destruction.",
      groundingGesture: "Dès qu'une parole toxique t'est lancée, pose une main sur ton plexus ou ton cœur, respire lentement et répète intérieurement : « Ce poison ne m'appartient pas. Ma parole demeure mon bouclier et ma lumière. »"
    },
    question: 'Quelle est la meilleure façon de formuler ta réponse pour créer une rétroaction positive, préserver ton énergie vitale et reprendre ta souveraineté personnelle ?',
    options: [
      {
        id: 'A',
        sublabel: '❌ Le Piège de la Malédiction Intérieure / Soumission Toxique',
        text: '« C\'est encore de ma faute, je ne vaux rien et je gâche toujours tout. De toute façon, je n\'arriverai jamais à me faire respecter, le sort s\'acharne sur moi. »',
        isResilientToltec: false,
        revealedTitle: '🌱 Décodage : Piège de la Malédiction Intérieure (Soumission Toxique)',
        revealedAnalysis: 'Tu utilises le Verbe contre toi-même. En t\'identifiant à l\'étiquette de victime et d\'incapable, tu nourris le Juge intérieur et déclenches une chute vibratoire qui renforce la sidération et l\'impuissance.',
        growthMindsetForMistake: 'Dans le monde réel, se dévaloriser face à l\'injustice nourrit le poison de la soumission. Choisis de ne plus être ton propre bourreau : ton verbe doit d\'abord te protéger et t\'élever.',
        somaticShiftPrompt: 'Pose une main sur ton plexus, respire profondément et rappelle-toi : ce venin ne t\'appartient pas.'
      },
      {
        id: 'B',
        sublabel: '❌ Le Piège du Poison Émotionnel / Escalade Réactive',
        text: '« Tu es un monstre manipulateur et toxique ! Tu détruis ma vie, j\'espère que tu paieras pour tout le mal que tu me fais, je te hais. »',
        isResilientToltec: false,
        revealedTitle: '🌱 Décodage : Piège du Poison Émotionnel (Escalade Réactive)',
        revealedAnalysis: 'Tu prends l\'attaque personnellement et tu projettes un sortilège de haine (male-dicere). En nourrissant la guerre extérieure, tu restes sur le même plan que l\'agresseur (tu es le pion qui subit le choc de la causalité inférieure).',
        growthMindsetForMistake: 'La haine réactive te maintient dans la toile de l\'agresseur. En refusant de projeter du venin, tu gardes ta fréquence pure et ta souveraineté intacte.',
        somaticShiftPrompt: 'Relâche les mâchoires, expire longuement et refuse de descendre dans l\'arène du conflit stérile.'
      },
      {
        id: 'C',
        sublabel: '✨ La Parole Impeccable / Transmutation & Bénédiction Souveraine (RÉPONSE VALIDE)',
        text: '« J\'observe ta colère et tes reproches, mais ils t\'appartiennent et ne définissent pas ma valeur. Je choisis de me traiter avec respect et de poser mes limites avec calme. Je bénis la clarté et la paix dans cet échange. »',
        isResilientToltec: true,
        revealedTitle: '✨ Décodage Initiatique : Transmutation & Bénédiction Souveraine (RÉPONSE VALIDE)',
        revealedAnalysis: `1. Désidentification toltèque : Tu ne prends rien personnellement ; le venin de l'autre reste dans son propre film.

2. Parole Impeccable (Bene-dicere) : Tu refuses la magie noire verbale et affirmes ton intégrité sans attaquer ni te soumettre.

3. Alchimie Hermétique : Tu déplaces la polarité de la dispute vers le pôle de la souveraineté. Tu deviens la Cause maîtresse au lieu d'être l'Effet passif des émotions d'autrui.`,
        somaticShiftPrompt: 'Pose une main sur ton plexus ou ton cœur, respire lentement et répète intérieurement : « Ce poison ne m\'appartient pas. Ma parole demeure mon bouclier et ma lumière. »'
      }
    ],
    scientificGrowthLesson: 'La neuroplasticité montre que le dialogue intérieur bienveillant reprogramme les circuits de résilience (cortex préfrontal) et réduit la sécrétion de cortisol de plus de 30%.',
    toltecMantra: '« Les lèvres de la sagesse restent closes, excepté aux oreilles de la Raison. » — Le Kybalion'
  },

  // --- ACCORD 2 : NE RIEN PRENDRE PERSONNELLEMENT ---
  {
    id: 'flash_toltec_2',
    agreementNumber: 2,
    agreementName: 'Ne prends rien personnellement',
    agreementTag: 'Accord 2 • Immunité Émotionnelle & Bouclier d\'Or',
    realWorldScenario: 'Une personne de votre entourage ou un ex-partenaire vous adresse un message glacial ou vous oppose un refus catégorique en vous accusant d’être « égoïste » et responsable de toutes les tensions.',
    question: 'Face à ce jugement culpabilisant et ce « Non » agressif, quelle est la posture toltèque de souveraineté ?',
    options: [
      {
        id: 'A',
        text: 'Ruminer pendant des heures en cherchant où j’ai fauté et rédiger une longue justification pour le convaincre de ma bonne foi.',
        isResilientToltec: false,
        revealedTitle: '🌱 Opportunité d’Apprentissage : Sortir du Piège de la Justification Perpétuelle',
        revealedAnalysis: 'Prendre l\'attaque personnellement vous rend dépendante de l\'opinion de l\'autre et vous entraîne dans le labyrinthe de la culpabilité imposée.',
        growthMindsetForMistake: 'Vouloir se justifier est un réflexe de survie naturel après des relations d\'emprise. Reconnaître ce réflexe comme une étape d\'apprentissage vous permet de vous entraîner au détachement : vous n\'avez pas besoin de l\'approbation de quelqu\'un qui cherche à vous diminuer.',
        somaticShiftPrompt: 'Prenez conscience du besoin d\'avoir raison et choisissez de privilégier votre paix intérieure.'
      },
      {
        id: 'B',
        text: 'Reconnaître lucidement que ses mots ne parlent que de son propre univers mental, de ses limites et de ses blessures. Rien ne définit ma dignité réelle : je refuse d\'absorber ce venin.',
        isResilientToltec: true,
        revealedTitle: '✨ Posture Toltèque Réussie : Le Bouclier d’Invulnérabilité du Cœur',
        revealedAnalysis: 'Ce que les autres projettent est le reflet de leur propre monde intérieur. En refusant de le prendre pour vous, vous devenez totalement immunisée contre la culpabilisation et la manipulation.',
        somaticShiftPrompt: 'Visualisez un filtre doré entourant votre corps : les jugements extérieurs glissent sans jamais altérer votre souveraineté personnelle.'
      },
      {
        id: 'C',
        text: 'Répondre par une attaque encore plus violente pour lui faire mal en retour.',
        isResilientToltec: false,
        revealedTitle: '🌱 Opportunité d’Apprentissage : Désamorcer l’Escalade Toxique',
        revealedAnalysis: 'Attaquer en retour valide que le poison a touché votre cœur et entretient le cycle du conflit stérile.',
        growthMindsetForMistake: 'L\'agressivité réactive est souvent le masque d\'une blessure. L\'apprentissage réside dans le fait de garder son pouvoir : le silence souverain et la distance protectrice sont infiniment plus puissants que l\'escalade.',
        somaticShiftPrompt: 'Déposez les armes imaginaires, baissez les épaules et ressentez la force du calme.'
      }
    ],
    scientificGrowthLesson: 'La théorie du miroir projectif démontre que 90% des critiques agressives expriment les peurs et la mauvaise régulation émotionnelle de leur émetteur.',
    toltecMantra: '« Mon cœur est invulnérable aux projections d’autrui. Je marche dans la certitude de ma paix. »'
  },

  // --- ACCORD 3 : NE FAIRE AUCUNE SUPPOSITION ---
  {
    id: 'flash_toltec_3',
    agreementNumber: 3,
    agreementName: 'Ne fais aucune supposition',
    agreementTag: 'Accord 3 • Clarté Cognitive & Réduction d\'Entropie',
    realWorldScenario: 'Une demande importante reste sans réponse depuis 48h ou vous recevez une réponse floue. Votre mental s’emballe : « C’est sûr qu’on me rejette », « Ils préparent quelque chose contre moi », « J’ai encore tout gâché ».',
    question: 'Comment neutraliser cette entropie mentale et ces suppositions anxiogènes selon le 3e Accord ?',
    options: [
      {
        id: 'A',
        text: 'Tenir mes scénarios noirs pour certains et couper immédiatement les ponts par fierté ou par peur.',
        isResilientToltec: false,
        revealedTitle: '🌱 Opportunité d’Apprentissage : Déjouer la Dramatisation Anticipatoire',
        revealedAnalysis: 'Agir sur la base d\'hypothèses non vérifiées crée des drames fictifs qui usent votre énergie vitale et abîment vos relations.',
        growthMindsetForMistake: 'Faire des suppositions est le mode par défaut d\'un cerveau en alerte traumatique. Voir ce schéma sans vous juger est le début de la guérison : entraînez-vous à exiger des faits vérifiés avant toute conclusion hâtive.',
        somaticShiftPrompt: 'Ouvrez grand les yeux, regardez autour de vous dans la pièce et nommez 3 objets réels et concrets pour vous ré-ancrer.'
      },
      {
        id: 'B',
        text: 'Distinguer les faits tangibles des inventions du mental : je ne connais pas les raisons réelles. Si nécessaire, je pose une question claire et directe, et dans l\'attente, je reste ancrée dans le présent.',
        isResilientToltec: true,
        revealedTitle: '✨ Posture Toltèque Réussie : La Clarté Libératrice des Faits',
        revealedAnalysis: 'Avoir le courage de vérifier plutôt que de supposer éteint immédiatement l\'anxiété anticipatoire et libère une énergie immense pour vos projets de vie.',
        somaticShiftPrompt: 'Respirez dans le ventre et dites intérieurement : « Je choisis la vérité des faits plutôt que la fiction de la peur. »'
      },
      {
        id: 'C',
        text: 'Demander l’avis de 5 personnes différentes pour imaginer ensemble ce que l’autre a pu vouloir dire.',
        isResilientToltec: false,
        revealedTitle: '🌱 Opportunité d’Apprentissage : Éviter l’Amplification de l’Entropie',
        revealedAnalysis: 'Multiplier les avis externes ne fait qu\'empiler des suppositions sur d\'autres suppositions sans apporter aucune certitude.',
        growthMindsetForMistake: 'Chercher du soutien est sain, mais chercher à décoder des non-dits maintient l\'esprit en ébullition. L\'apprentissage consiste à privilégier la communication limpide ou le lâcher-prise.',
        somaticShiftPrompt: 'Fermez les yeux, coupez les sollicitations et revenez au silence de votre souffle.'
      }
    ],
    scientificGrowthLesson: 'L\'esprit humain fabrique jusqu\'à 70% de pensées négatives automatiques en situation d\'incertitude. Le questionnement socratique et la vérification directe rétablissent la cohérence cognitive.',
    toltecMantra: '« Je renonce aux scénarios imaginaires. Je m’ancre dans la réalité des faits et la communication limpide. »'
  },

  // --- ACCORD 4 : TOUJOURS FAIRE DE SON MIEUX ---
  {
    id: 'flash_toltec_4',
    agreementNumber: 4,
    agreementName: 'Fais toujours de ton mieux',
    agreementTag: 'Accord 4 • Respect des Rythmes & Absolution du Passé',
    realWorldScenario: 'Aujourd\'hui, vous traversez une vague intense de fatigue ou d’émotions douloureuses. Vous n’avez pas accompli votre to-do list et vous vous sentez coupable de ne pas être « plus productive » ou « déjà guérie ».',
    question: 'Que vous enseigne le 4e Accord face à cette baisse d’énergie et ce sentiment d’échec passager ?',
    options: [
      {
        id: 'A',
        text: 'Reconnaître avec infinie douceur que mon « mieux » varie selon mes ressources du jour. Avoir respiré, pris soin de moi et fait une seule chose avec amour était mon 100% aujourd’hui : je m\'absous de toute culpabilité.',
        isResilientToltec: true,
        revealedTitle: '✨ Posture Toltèque Réussie : L’Alliance Sacrée avec son Rythme Naturel',
        revealedAnalysis: 'Votre mieux n\'est jamais une constante rigide : il fluctue quand vous êtes fatiguée, malade ou en guérison. L\'honorer sans jugement désactive le juge intérieur et préserve durablement votre estime de vous-même.',
        somaticShiftPrompt: 'Enveloppez-vous de vos bras (étreinte papillon) et félicitez-vous pour chaque souffle traversé aujourd’hui.'
      },
      {
        id: 'B',
        text: 'Me forcer à travailler jusqu’à l’épuisement total pour me prouver que je ne suis pas paresseuse.',
        isResilientToltec: false,
        revealedTitle: '🌱 Opportunité d’Apprentissage : Désactiver le Perfectionnisme d’Épuisement',
        revealedAnalysis: 'En faire trop par peur du jugement extérieur détruit votre système nerveux et conduit inévitablement au surmenage.',
        growthMindsetForMistake: 'Vouloir en faire trop est souvent un réflexe de sur-adaptation hérité d\'environnements exigeants. Voyez cette fatigue non comme un échec, mais comme un message sacré de votre corps qui réclame du repos réparateur.',
        somaticShiftPrompt: 'Posez la tête en arrière, fermez les yeux 20 secondes et accordez-vous la permission de ralentir.'
      },
      {
        id: 'C',
        text: 'Abandonner totalement tout engagement futur en me disant que je n’y arriverai jamais.',
        isResilientToltec: false,
        revealedTitle: '🌱 Opportunité d’Apprentissage : Éviter la Pensée du Tout ou Rien',
        revealedAnalysis: 'La pensée binaire (« Tout réussir ou tout abandonner ») est un piège cognitif qui paralyse l\'action.',
        growthMindsetForMistake: 'Une journée difficile n\'efface pas des semaines de progrès. La résilience se construit par petits pas réguliers. Célébrez ce que vous avez réussi et recommencez doucement demain.',
        somaticShiftPrompt: 'Nommez une seule petite chose que vous avez réussie aujourd\'hui, aussi minime soit-elle.'
      }
    ],
    scientificGrowthLesson: 'La loi de Yerkes-Dodson prouve que la performance et la régénération s\'optimisent lorsque l\'on respecte ses cycles naturels, évitant l\'hyper-activation chronique.',
    toltecMantra: '« Mon mieux d’aujourd’hui est suffisant et parfait. Je grandis avec patience et bienveillance. »'
  },

  // --- ACCORD 5 : ÊTRE SCEPTIQUE MAIS APPRENDRE À ÉCOUTER ---
  {
    id: 'flash_toltec_5',
    agreementNumber: 5,
    agreementName: 'Sois sceptique, mais apprends à écouter',
    agreementTag: 'Accord 5 • Discernement Lucide & Immunité Anti-Gaslighting',
    realWorldScenario: 'Une personne vous fait des compliments excessifs (« Tu es la femme parfaite ») suivis de promesses grandioses, mais ses actes concrets et passés contredisent systématiquement ses paroles en créant de l\'incohérence.',
    question: 'Face à ce décalage entre paroles séduisantes et réalité des actes, quelle est la posture toltèque du 5e Accord ?',
    options: [
      {
        id: 'A',
        text: 'Croire aveuglément à ses belles promesses car j’ai désespérément besoin d’être rassurée et aimée.',
        isResilientToltec: false,
        revealedTitle: '🌱 Opportunité d’Apprentissage : Reconnaître le Piège de la Fausse Lune de Miel',
        revealedAnalysis: 'Le love-bombing et les promesses verbales sans actes tangibles sont des rouages classiques de séduction et d\'emprise.',
        growthMindsetForMistake: 'Avoir cru aux fausses promesses par le passé n\'était pas de la bêtise, mais une noble soif d\'amour. Voyez cette expérience comme un apprentissage inestimable : désormais, vous observez les actes sur la durée avant d\'accorder votre confiance.',
        somaticShiftPrompt: 'Écoutez la sensation dans votre plexus ou votre ventre : ressent-elle un doute instinctif ? Faites confiance à ce signal.'
      },
      {
        id: 'B',
        text: 'Faire preuve d’un scepticisme bienveillant : écouter ce qu’elle dit pour comprendre son intention, mais juger uniquement sur la cohérence de ses actes tangibles dans la durée.',
        isResilientToltec: true,
        revealedTitle: '✨ Posture Toltèque Réussie : Le Regard d’Or du Discernement Lucide',
        revealedAnalysis: 'Être sceptique ne signifie pas être aigrie ou fermée, mais refuser d\'être dupe des mots. Vous observez la vérité des faits, ce qui vous rend totalement invulnérable au gaslighting et aux faux espoirs.',
        somaticShiftPrompt: 'Ressentez la clarté et l\'autorité tranquille d\'un regard qui voit la réalité sans voile d\'illusion.'
      },
      {
        id: 'C',
        text: 'Entrer dans un débat infini pour lui prouver par A+B qu’il ment et essayer de le changer à tout prix.',
        isResilientToltec: false,
        revealedTitle: '🌱 Opportunité d’Apprentissage : Ne pas s’Épuiser dans les Sables Mouvants du Débat',
        revealedAnalysis: 'Débattre avec quelqu\'un de mauvaise foi vous entraîne sur son terrain et absorbe votre énergie vitale.',
        growthMindsetForMistake: 'Vous n\'avez pas besoin d\'obtenir l\'aveu de l\'autre pour valider ce que vous voyez. Votre lucidité vous suffit pour poser vos limites et vous mettre en sécurité.',
        somaticShiftPrompt: 'Imaginez-vous reculer d\'un pas, respirer et garder votre énergie précieuse pour vos propres rêves.'
      }
    ],
    scientificGrowthLesson: 'Le doute méthodique (scepticisme positif) couplé à l\'écoute active stimule l\'intelligence intuitive et désamorce les manipulations cognitives avant qu\'elles ne fassent de dégâts.',
    toltecMantra: '« J’écoute avec sagesse, je discerne avec lucidité. Mes repères sont fondés sur la vérité des actes. »'
  }
];

interface Props {
  onPointsEarned?: (newTotal: number) => void;
  onNavigateToRoadmap?: () => void;
}

export const ToltecFlashcardQuestionnaire: React.FC<Props> = ({
  onPointsEarned,
  onNavigateToRoadmap
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [completedCards, setCompletedCards] = useState<Record<string, { optionId: string; date: string; isResilient: boolean }>>(() => {
    try {
      const saved = localStorage.getItem('haven_toltec_flashcards_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const card = TOLTEC_FLASHCARD_QUESTIONS[currentCardIndex];
  const totalCards = TOLTEC_FLASHCARD_QUESTIONS.length;
  const isCardCompleted = !!completedCards[card.id];
  const answeredData = completedCards[card.id];

  // Sync state when card index changes
  useEffect(() => {
    if (answeredData) {
      setSelectedOptionId(answeredData.optionId as any);
      setIsAnswerRevealed(true);
    } else {
      setSelectedOptionId(null);
      setIsAnswerRevealed(false);
    }
  }, [currentCardIndex]);

  const handleSelectOption = (optionId: 'A' | 'B' | 'C') => {
    setSelectedOptionId(optionId);
    setIsAnswerRevealed(true);

    const chosenOption = card.options.find(o => o.id === optionId);
    if (!chosenOption) return;

    // Save progress
    const updated = {
      ...completedCards,
      [card.id]: {
        optionId,
        date: new Date().toLocaleDateString('fr-FR'),
        isResilient: chosenOption.isResilientToltec
      }
    };
    setCompletedCards(updated);
    localStorage.setItem('haven_toltec_flashcards_progress', JSON.stringify(updated));

    // Award points (even for learning from mistakes, because growth mindset rewards participation!)
    const pts = chosenOption.isResilientToltec ? 30 : 20;
    const profile = CompanionMemoryService.addResiliencePoints(
      pts, 
      chosenOption.isResilientToltec 
        ? `Maîtrise Toltèque : ${card.agreementName}`
        : `Apprentissage & Croissance : ${card.agreementName}`
    );

    if (onPointsEarned) {
      onPointsEarned(profile.resiliencePoints);
    }
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const selectedOption = selectedOptionId ? card.options.find(o => o.id === selectedOptionId) : null;
  const completedCount = Object.keys(completedCards).length;

  return (
    <div id="toltec-flashcards-questionnaire" className="bg-white border-2 border-[#CBD5E1] rounded-3xl p-5 md:p-8 space-y-6 shadow-sm">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b-2 border-[#E2E8F0]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DCFCE7] text-[#14532D] text-xs font-black uppercase tracking-wider border-2 border-[#86EFAC]">
            <Sparkles className="w-4 h-4 text-[#15803D]" />
            Fiches Interactives des 5 Accords & Mentalité de Croissance
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#0F172A] flex items-center gap-2.5 pt-1">
            <BookOpen className="w-6 h-6 text-[#15803D]" />
            Questionnaire Toltèque : Découverte des Réponses & Résilience au Réel
          </h2>
          <p className="text-sm text-[#334155] max-w-2xl leading-relaxed">
            Testez vos réflexes face aux situations délicates du quotidien et aux refus (« Non ») du monde réel. 
            Les explications et l’alchimie toltèque sont <strong>voilées sous la fiche</strong> : choisissez votre réponse en toute sincérité pour révéler l’analyse et faire de chaque hésitation un <strong>apprentissage sain et valorisant</strong>.
          </p>
        </div>

        {/* Card Progress Stats */}
        <div className="bg-[#F8FAFC] px-4 py-3 rounded-2xl border-2 border-[#CBD5E1] shadow-2xs shrink-0 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#14532D] border-2 border-[#86EFAC] flex items-center justify-center font-black font-mono text-base">
            {currentCardIndex + 1}/{totalCards}
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-black text-[#64748B]">Accords Explorés</div>
            <div className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
              <span className="text-[#15803D] font-extrabold">{completedCount}</span> sur {totalCards} validés
              {completedCount === totalCards && <CheckCircle2 className="w-4 h-4 text-[#15803D]" />}
            </div>
          </div>
        </div>
      </div>

      {/* Accord Navigation Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TOLTEC_FLASHCARD_QUESTIONS.map((item, idx) => {
          const isDone = !!completedCards[item.id];
          const isCurrent = idx === currentCardIndex;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentCardIndex(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer border-2 ${
                isCurrent
                  ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm'
                  : isDone
                  ? 'bg-[#DCFCE7] text-[#14532D] hover:bg-[#BBF7D0] border-[#86EFAC]'
                  : 'bg-[#F8FAFC] text-[#334155] hover:bg-[#F1F5F9] border-[#CBD5E1]'
              }`}
            >
              <span>Accord {item.agreementNumber}</span>
              {isDone && <Check className="w-3.5 h-3.5 text-[#15803D] stroke-[3]" />}
            </button>
          );
        })}
      </div>

      {/* Main Active Flashcard Box */}
      <div className="bg-white rounded-3xl border-2 border-[#CBD5E1] shadow-sm overflow-hidden transition-all">
        {/* Card Header */}
        <div className="bg-[#F8FAFC] px-6 py-4 border-b-2 border-[#CBD5E1] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#15803D] text-white flex items-center justify-center font-black text-sm shadow-xs">
              {card.agreementNumber}
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] font-serif">{card.agreementName}</h3>
              <span className="text-xs font-bold text-[#475569]">{card.agreementTag}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSpeak(`${card.realWorldScenario}. Question : ${card.question}`)}
              className={`p-2.5 rounded-xl border-2 text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isSpeaking ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white hover:bg-[#F1F5F9] text-[#0F172A] border-[#CBD5E1]'
              }`}
              title="Écouter la situation à voix haute"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isSpeaking ? 'Arrêter' : 'Écouter'}</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Question Number Banner if Available */}
          {card.questionNumberLabel && (
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white px-5 py-3 rounded-2xl flex items-center justify-between shadow-xs border border-emerald-500/30">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-extrabold text-sm sm:text-base tracking-wide">
                  {card.questionNumberLabel}
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full font-bold shrink-0 hidden sm:inline-block">
                Souveraineté Haven-Elle
              </span>
            </div>
          )}

          {/* Context of the Question Box if Available */}
          {card.questionContext && (
            <div className="bg-white/95 border-2 border-emerald-200/80 p-5 rounded-2xl space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Le Contexte de la Question</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed italic border-l-2 border-emerald-500 pl-3">
                « {card.questionContext} »
              </p>
            </div>
          )}

          {/* Real-World Scenario Box */}
          <div className="bg-[#FEFCE8] border-2 border-[#EAB308] p-5 rounded-2xl space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#854D0E]">
              <Flame className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>{card.scenarioSubtitle || "Mise en Situation Réelle & Épreuve du « Non »"}</span>
            </div>

            {card.realWorldScenario.includes('\n') ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {card.realWorldScenario.split('\n').filter(line => line.trim().length > 0).map((line, idx) => {
                  const cleaned = line.replace(/^[-•*]\s*/, '').trim();
                  const colonIdx = cleaned.indexOf(':');
                  const title = colonIdx !== -1 ? cleaned.substring(0, colonIdx).trim() : '';
                  const desc = colonIdx !== -1 ? cleaned.substring(colonIdx + 1).trim() : cleaned;
                  const isPositive = title.toLowerCase().includes('bénédiction');

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex flex-col justify-start gap-1.5 shadow-2xs backdrop-blur-xs transition-all ${
                        isPositive
                          ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                          : 'bg-amber-50/90 border-amber-300 text-amber-950'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            isPositive ? 'bg-emerald-600 ring-4 ring-emerald-200' : 'bg-amber-600 ring-4 ring-amber-200'
                          }`}
                        />
                        <span className="font-black text-sm uppercase tracking-wide">
                          {title || cleaned}
                        </span>
                      </div>
                      {desc && (
                        <p className="text-xs sm:text-sm font-semibold leading-relaxed pl-4.5 text-black">
                          {desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm sm:text-base text-black font-black leading-relaxed">
                « {card.realWorldScenario} »
              </p>
            )}

            {/* Philosophical Framework Integration (Kybalion & Correspondence Principle) */}
            {card.philosophicalFramework && (
              <div className="mt-4 pt-4 border-t border-[#EAB308]/40 space-y-3.5 text-black font-sans">
                {/* Header Title */}
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                  <h5 className="text-sm sm:text-base font-black text-[#78350F] tracking-tight">
                    {card.philosophicalFramework.title}
                  </h5>
                </div>

                {/* 1. Fondement Philosophique & Citation */}
                <div className="bg-white/85 p-3.5 rounded-xl border border-[#FDE047] space-y-2">
                  <div className="text-xs font-bold text-[#854D0E] uppercase tracking-wide">
                    {card.philosophicalFramework.quoteTitle}
                  </div>
                  <blockquote className="text-xs sm:text-sm italic font-serif leading-relaxed text-[#1F2937] border-l-3 border-[#D97706] pl-3 py-0.5">
                    {card.philosophicalFramework.quoteText}
                  </blockquote>
                  <p className="text-[11px] font-bold text-[#4B5563] text-right">
                    {card.philosophicalFramework.quoteAuthor}
                  </p>
                </div>

                {/* 1.2 Décodage des Plans d'Existence */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#854D0E] uppercase tracking-wide">
                    {card.philosophicalFramework.decodingTitle}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                    <div className="bg-white/80 p-3 rounded-xl border border-[#CBD5E1] space-y-1">
                      <div className="font-black text-[#15803D]">
                        • {card.philosophicalFramework.macroMicroTitle}
                      </div>
                      <p className="text-xs text-[#1E293B] font-semibold leading-relaxed">
                        {card.philosophicalFramework.macroMicroDesc}
                      </p>
                    </div>

                    <div className="bg-white/80 p-3 rounded-xl border border-[#CBD5E1] space-y-1">
                      <div className="font-black text-[#D97706]">
                        • {card.philosophicalFramework.causeEffectTitle}
                      </div>
                      <p className="text-xs text-[#1E293B] font-semibold leading-relaxed">
                        {card.philosophicalFramework.causeEffectDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Le Verbe : Vecteur de Transmutation */}
                <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 space-y-1">
                  <div className="text-xs font-black text-emerald-900">
                    {card.philosophicalFramework.verbVectorTitle}
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
                    {card.philosophicalFramework.verbVectorDesc}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Question */}
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#15803D]" />
              {card.question}
            </h4>
            <p className="text-xs text-white font-semibold">
              Sélectionnez la posture qui vous inspire pour dévoiler la fiche pédagogique cachée.
            </p>
          </div>

          {/* Options (Hidden answer mechanism until selected) */}
          <div className="space-y-3">
            {card.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? opt.isResilientToltec
                        ? 'border-[#15803D] bg-[#DCFCE7] text-[#14532D] shadow-sm ring-2 ring-[#15803D]/40 font-bold'
                        : 'border-[#D97706] bg-[#FEF3C7] text-[#78350F] shadow-sm ring-2 ring-[#D97706]/40 font-bold'
                      : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#64748B]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center shrink-0 text-sm font-black transition-all ${
                    isSelected
                      ? opt.isResilientToltec
                        ? 'border-[#15803D] bg-[#15803D] text-white'
                        : 'border-[#D97706] bg-[#D97706] text-white'
                      : 'border-[#CBD5E1] bg-[#F1F5F9] text-[#0F172A]'
                  }`}>
                    {opt.id}
                  </div>
                  <div className="flex-1 space-y-1">
                    {opt.sublabel && (
                      <span className={`text-[11px] uppercase tracking-wider font-extrabold block ${
                        isSelected
                          ? opt.isResilientToltec ? 'text-emerald-800' : 'text-amber-800'
                          : 'text-white'
                      }`}>
                        {opt.sublabel}
                      </span>
                    )}
                    <span className="text-xs sm:text-sm font-bold leading-relaxed block text-white">
                      {opt.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* REVEALED CARD (Unveiled when an option is selected) */}
          {isAnswerRevealed && selectedOption && (
            <div className={`p-5 md:p-6 rounded-2xl border-2 space-y-4 shadow-sm animate-in fade-in zoom-in duration-300 ${
              selectedOption.isResilientToltec
                ? 'bg-[#F0FDF4] border-2 border-[#16A34A]'
                : 'bg-[#FFFBEB] border-2 border-[#F59E0B]'
            }`}>
              {/* Badge & Feedback Title */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black ${
                    selectedOption.isResilientToltec
                      ? 'bg-[#DCFCE7] text-[#14532D] border-2 border-[#86EFAC]'
                      : 'bg-[#FEF3C7] text-[#92400E] border-2 border-[#FCD34D]'
                  }`}>
                    {selectedOption.isResilientToltec ? (
                      <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-[#D97706]" />
                    )}
                    {selectedOption.revealedTitle}
                  </div>
                  <h5 className="text-lg font-black text-[#0F172A] pt-1">
                    Analyse Pédagogique & Décodage Toltèque
                  </h5>
                </div>

                <div className="text-xs font-mono font-black px-3.5 py-1.5 bg-white rounded-xl border-2 border-[#CBD5E1] text-[#15803D] shrink-0 shadow-2xs">
                  +{selectedOption.isResilientToltec ? '30' : '20'} pts
                </div>
              </div>

              {/* Analysis Text */}
              <div className="bg-white p-4.5 rounded-2xl border-2 border-[#CBD5E1] shadow-2xs">
                <p className="text-sm sm:text-base text-black font-bold leading-relaxed whitespace-pre-line">
                  {selectedOption.revealedAnalysis}
                </p>
              </div>

              {/* Special Growth Mindset Box if Less Optimal / Mistake */}
              {selectedOption.growthMindsetForMistake && (
                <div className="bg-[#FEF3C7] border-2 border-[#D97706] p-4 rounded-xl space-y-1.5 shadow-2xs">
                  <div className="text-xs font-black text-[#78350F] flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-[#D97706]" />
                    L’Échec & le « Non » comme Enseignement Sain (Mentalité de Croissance)
                  </div>
                  <p className="text-xs sm:text-sm text-[#78350F] font-bold leading-relaxed">
                    {selectedOption.growthMindsetForMistake}
                  </p>
                </div>
              )}

              {/* Somatic Shift Prompt */}
              <div className="bg-white border-2 border-[#86EFAC] p-4 rounded-xl flex items-center gap-3 shadow-2xs">
                <Heart className="w-5 h-5 text-[#15803D] shrink-0" />
                <p className="text-xs sm:text-sm font-bold text-[#14532D] leading-relaxed">
                  <strong>Ancrage Somatique :</strong> {selectedOption.somaticShiftPrompt}
                </p>
              </div>

              {/* Alignment Key for Apprentice if provided */}
              {card.alignmentKey && (
                <div className="bg-gradient-to-br from-amber-50 to-emerald-50 border-2 border-amber-300 p-4.5 rounded-2xl space-y-3 shadow-2xs">
                  <div className="flex items-center gap-2 text-sm font-black text-amber-900 uppercase tracking-wide">
                    <Compass className="w-4.5 h-4.5 text-amber-700" />
                    <span>{card.alignmentKey.title}</span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="bg-white/90 p-3 rounded-xl border border-amber-200">
                      <span className="font-extrabold text-amber-900 block mb-0.5">
                        • Le Principe Caché :
                      </span>
                      <span className="text-slate-800 font-semibold leading-relaxed block">
                        {card.alignmentKey.hiddenPrinciple}
                      </span>
                    </div>
                    <div className="bg-white/90 p-3 rounded-xl border border-emerald-200">
                      <span className="font-extrabold text-emerald-900 block mb-0.5">
                        • Le Geste d'Ancrage :
                      </span>
                      <span className="text-slate-800 font-semibold leading-relaxed block">
                        {card.alignmentKey.groundingGesture}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Scientific Note & Mantra */}
              <div className="pt-2 border-t-2 border-[#CBD5E1] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-white p-4 rounded-xl border-2 border-[#86EFAC] shadow-2xs">
                  <span className="font-black text-[#15803D] block mb-1 text-xs uppercase tracking-wider">🧠 Fait Scientifique :</span>
                  <span className="text-[#0F172A] font-semibold leading-relaxed block">{card.scientificGrowthLesson}</span>
                </div>
                <div className="bg-[#FEFCE8] p-4 rounded-xl border-2 border-[#EAB308] shadow-2xs">
                  <span className="font-black text-[#854D0E] block mb-1 text-xs uppercase tracking-wider">📜 Mantra & Enseignement Sacré :</span>
                  <span className="italic text-black font-serif font-black text-sm sm:text-base leading-relaxed block">{card.toltecMantra}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-[#E2E8F0]">
            <button
              onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
              disabled={currentCardIndex === 0}
              className="px-4 py-2.5 rounded-xl border-2 border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] disabled:opacity-40 text-xs font-bold text-[#334155] flex items-center gap-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Accord Précédent
            </button>

            <div className="flex items-center gap-2">
              {isAnswerRevealed && !selectedOption?.isResilientToltec && (
                <button
                  onClick={() => setIsAnswerRevealed(false)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border-2 border-[#CBD5E1] hover:bg-[#F1F5F9] text-xs font-bold text-[#0F172A] flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Réessayer
                </button>
              )}

              <button
                onClick={() => {
                  if (currentCardIndex < totalCards - 1) {
                    setCurrentCardIndex(currentCardIndex + 1);
                  } else if (onNavigateToRoadmap) {
                    onNavigateToRoadmap();
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#14532D] text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
              >
                {currentCardIndex < totalCards - 1 ? (
                  <>
                    Accord Suivant
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    Explorer le Grand Livre des 100 Étapes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
