export interface CoreValueItem {
  id: string;
  name: string;
  category: 'Sagesse Toltèque & Clarté' | 'Sécurité & Paix' | 'Dignité & Respect' | 'Douceur & Soin' | 'Liberté & Vérité' | 'Force & Courage';
  definition: string;
  benevolentVision: string; // How this value transforms the view of oneself with extreme benevolence
  dailyMicroAction: string;
  iconName: string;
  color: string;
  audioBookSource?: 'Livre Audio 1 : Les 4 Accords Toltèques (Don Miguel Ruiz)' | 'Livre Audio 2 : Le 5e Accord Toltèque (Don Miguel Ruiz & Don Jose Ruiz)';
  toltecAgreementNumber?: 1 | 2 | 3 | 4 | 5;
  detailedAudioExplanation?: string;
  psychologicalEffect?: string;
}

export interface ToltecAudioBookInfo {
  id: string;
  title: string;
  author: string;
  subtitle: string;
  description: string;
  agreements: number[];
  audioBadge: string;
  isSoonActive?: boolean;
  statusLabel?: string;
  audibleLink?: string;
}

export interface ToltecSeminarVideo {
  id: string;
  title: string;
  subtitle: string;
  youtubeId: string;
  url: string;
  startTimeSeconds: number;
  durationLabel: string;
  description: string;
  keyTakeaways: string[];
}

export const TOLTEC_SEMINAR_VIDEO: ToltecSeminarVideo = {
  id: 'toltec_seminar_full',
  title: 'Séminaire Audio/Vidéo : Résumé des 2 Livres Toltèques',
  subtitle: 'Les 4 Accords Toltèques & Le 5e Accord en conférence intégrale',
  youtubeId: 'VP91x440Rmw',
  url: 'https://www.youtube.com/watch?v=VP91x440Rmw&t=269s',
  startTimeSeconds: 269,
  durationLabel: 'Conférence & Synthèse Gratuite',
  description: 'Ce séminaire audio/vidéo synthétise avec clarté et profondeur les enseignements fondamentaux de Don Miguel Ruiz et Don Jose Ruiz. Une immersion transformatrice pour guérir des conditionnements et retrouver une souveraineté sereine.',
  keyTakeaways: [
    'Comprendre le poison émotionnel et comment s\'en immuniser définitivement',
    'Application concrète des 4 premiers accords pour apaiser les relations',
    'La puissance du discernement et du doute libérateur avec le 5e accord',
    'Sortir du rôle de victime et réactiver l\'amour inconditionnel de soi'
  ]
};

export const TOLTEC_AUDIOBOOKS_INFO: ToltecAudioBookInfo[] = [
  {
    id: 'toltec_book_1',
    title: 'Les Quatre Accords Toltèques',
    author: 'Don Miguel Ruiz',
    subtitle: 'La voie de la liberté personnelle (Livre Audio 1)',
    description: 'Un guide de sagesse pratique pour briser les croyances limitantes, éliminer le poison émotionnel et restaurer la dignité intérieure.',
    agreements: [1, 2, 3, 4],
    audioBadge: '🎧 Livre Audio Fondateur',
    isSoonActive: true,
    statusLabel: 'Bientôt actif'
  },
  {
    id: 'toltec_book_2',
    title: 'Le Cinquième Accord Toltèque',
    author: 'Don Miguel Ruiz & Don Jose Ruiz',
    subtitle: 'Un guide pratique vers la maîtrise de soi (Livre Audio 2)',
    description: 'L\'art du discernement et du doute libérateur : voir la réalité avec les yeux de la vérité, au-delà des mots et des conditionnements.',
    agreements: [5],
    audioBadge: '🎧 Livre Audio Maîtrise de Soi',
    isSoonActive: true,
    statusLabel: 'Bientôt actif'
  }
];

export const TOLTEC_AGREEMENTS_VALUES: CoreValueItem[] = [
  {
    id: 'val_toltec_1',
    name: '1- Que ta parole soit impeccable',
    category: 'Sagesse Toltèque & Clarté',
    definition: 'Parler avec intégrité, vérité et douceur. Ne jamais utiliser la parole contre soi-même (fin de l\'autocritique destructive) ni pour médire ou manipuler.',
    benevolentVision: 'Je choisis de me parler avec une douceur sacrée et une vérité inébranlable. Je refuse que ma voix intérieure reprenne les critiques ou les violences du passé.',
    dailyMicroAction: 'Repérer toute autocritique aujourd\'hui et la remplacer immédiatement par une parole de valorisation aimante.',
    iconName: 'Sparkles',
    color: '#385117',
    audioBookSource: 'Livre Audio 1 : Les 4 Accords Toltèques (Don Miguel Ruiz)',
    toltecAgreementNumber: 1,
    detailedAudioExplanation: 'Le mot « impeccable » signifie « sans péché » contre soi-même. La parole est une énergie créatrice pure. Lorsqu\'elle est impeccable, elle sème la paix et guérit les blessures de l\'âme.',
    psychologicalEffect: 'Éteint le dialogue interne persécuteur et réinstaure un respect inconditionnel envers son propre être.'
  },
  {
    id: 'val_toltec_2',
    name: '2- Ne prend rien personnellement',
    category: 'Sagesse Toltèque & Clarté',
    definition: 'Ce que les autres disent ou font est une projection directe de leur propre rêve, de leurs peurs et de leurs blessures. Rien n\'est dirigé contre votre valeur réelle.',
    benevolentVision: 'Les attaques, colères ou rejets d\'autrui n\'ont jamais défini ma valeur. Je dépose ce fardeau toxique qui ne m\'a jamais appartenu.',
    dailyMicroAction: 'Face à une remarque froide ou blessante, expirer profondément en visualisant qu\'elle glisse sur un bouclier d\'immunité émotionnelle.',
    iconName: 'ShieldCheck',
    color: '#2563EB',
    audioBookSource: 'Livre Audio 1 : Les 4 Accords Toltèques (Don Miguel Ruiz)',
    toltecAgreementNumber: 2,
    detailedAudioExplanation: 'En devenant immunisé contre les opinions et les actes d\'autrui, vous cessez d\'être une victime de la manipulation et vous conservez une paix inaltérable.',
    psychologicalEffect: 'Désactive l\'hypervigilance relationnelle et élimine la culpabilité induite par les comportements d\'autrui.'
  },
  {
    id: 'val_toltec_3',
    name: '3- Ne fais aucune suppositions',
    category: 'Sagesse Toltèque & Clarté',
    definition: 'Avoir le courage de poser des questions claires, de vérifier les faits réels et d\'exprimer ses besoins au lieu d\'inventer des scénarios anxiogènes.',
    benevolentVision: 'Je renonce à deviner les pensées d\'autrui ou à anticiper le pire. Je m\'ancre dans la réalité tangible et je demande ce dont j\'ai besoin.',
    dailyMicroAction: 'Dès qu\'un scénario d\'angoisse surgit, se demander : « Est-ce un fait vérifié à 100% ou une simple supposition de mon mental ? »',
    iconName: 'Compass',
    color: '#7C3AED',
    audioBookSource: 'Livre Audio 1 : Les 4 Accords Toltèques (Don Miguel Ruiz)',
    toltecAgreementNumber: 3,
    detailedAudioExplanation: 'Les suppositions créent du drame imaginaire et des malentendus destructeurs. La communication transparente dissipe instantanément le poison du doute.',
    psychologicalEffect: 'Réduit drastiquement l\'entropie mentale, le stress relationnel et les ruminations post-traumatiques.'
  },
  {
    id: 'val_toltec_4',
    name: '4- Fais toujours de ton mieux',
    category: 'Sagesse Toltèque & Clarté',
    definition: 'Votre « mieux » varie d\'instant en instant selon votre niveau de fatigue, de santé ou de tristesse. Faire simplement de son mieux élimine la culpabilité et les regrets.',
    benevolentVision: 'Je célèbre mes efforts du jour avec fierté. Avoir respiré, tenu bon et avancé d\'un millimètre était déjà mon meilleur absolu.',
    dailyMicroAction: 'Le soir, reconnaître avec tendresse : « J\'ai fait de mon mieux aujourd\'hui avec l\'énergie dont je disposais. »',
    iconName: 'Award',
    color: '#D97706',
    audioBookSource: 'Livre Audio 1 : Les 4 Accords Toltèques (Don Miguel Ruiz)',
    toltecAgreementNumber: 4,
    detailedAudioExplanation: 'Ni plus (pour éviter le surmenage et l\'épuisement), ni moins (pour éviter la culpabilité). En faisant de votre mieux dans l\'instant, vous vivez sans auto-jugement.',
    psychologicalEffect: 'Éradique le perfectionnisme toxique, la honte traumatique et réinstaure une profonde indulgence envers soi.'
  },
  {
    id: 'val_toltec_5',
    name: '5- Soit toujours sceptique, mais prend le temps d\'écouter',
    category: 'Sagesse Toltèque & Clarté',
    definition: 'Utiliser la force du doute bienveillant : ne pas croire aveuglément les récits d\'autrui ni les voix dévalorisantes de son propre mental, tout en écoutant l\'intention réelle avec discernement.',
    benevolentVision: 'Je garde mon esprit souverain et lucide. J\'écoute avec calme et ouverture, mais c\'est mon cœur éclairé et ma vérité qui guident mes pas.',
    dailyMicroAction: 'Prendre 5 secondes de recul avant de réagir : écouter l\'autre attentivement sans absorber son émotion ni céder à la manipulation.',
    iconName: 'Eye',
    color: '#059669',
    audioBookSource: 'Livre Audio 2 : Le 5e Accord Toltèque (Don Miguel Ruiz & Don Jose Ruiz)',
    toltecAgreementNumber: 5,
    detailedAudioExplanation: 'Le doute est un bouclier qui vous protège des mensonges et des illusions. Écouter permet de comprendre autrui sans pour autant accepter son venin.',
    psychologicalEffect: 'Reconstruit une clarté cognitive infaillible, une immunité totale contre le gaslighting et une souveraineté intérieure.'
  }
];

export const PRESET_CORE_VALUES: CoreValueItem[] = [
  ...TOLTEC_AGREEMENTS_VALUES,
  {
    id: 'val_dignite',
    name: 'Dignité Inaliénable',
    category: 'Dignité & Respect',
    definition: 'La certitude que mon être tout entier mérite considération, respect absolu et honneur.',
    benevolentVision: 'Je me regarde comme un être sacré. Rien ni personne ne peut dévaloriser qui je suis au fond de mon cœur.',
    dailyMicroAction: 'Se redresser doucement, respirer amplement et se dire : « Je mérite un respect inconditionnel. »',
    iconName: 'Crown',
    color: '#8A5D18'
  },
  {
    id: 'val_securite',
    name: 'Sécurité & Souveraineté Personnelle',
    category: 'Sécurité & Paix',
    definition: 'Le droit fondamental de reprendre sa souveraineté personnelle et de vivre dans la tranquillité, protégé des violences, du contrôle et de la peur.',
    benevolentVision: 'Je m\'accorde le droit absolu de me mettre à l\'abri et d\'écouter mes signaux d\'alarme sans jamais me juger peureuse.',
    dailyMicroAction: 'Prendre 2 minutes pour vérifier mes repères rassurants et respirer dans le calme.',
    iconName: 'ShieldCheck',
    color: '#2E6930'
  },
  {
    id: 'val_douceur',
    name: 'Douceur & Tendresse Envers Soi',
    category: 'Douceur & Soin',
    definition: 'Remplacer toute sévérité, culpabilité ou exigence par une infinie délicatesse intérieure.',
    benevolentVision: 'Je m\'enveloppe de compassion. Je m\'accorde le droit d\'être fatiguée, d\'avoir pleuré et de guérir à mon rythme.',
    dailyMicroAction: 'Poser les mains sur les épaules (étreinte papillon) et murmurer un mot de pure tendresse.',
    iconName: 'Heart',
    color: '#B83280'
  },
  {
    id: 'val_authenticite',
    name: 'Vérité & Intégrité',
    category: 'Liberté & Vérité',
    definition: 'Être fidèle à mes ressentis réels, refuser le mensonge, la manipulation et la minimisation.',
    benevolentVision: 'Je me vois avec une lucidité aimante : mes perceptions étaient justes, mon intuition est précieuse.',
    dailyMicroAction: 'Exprimer avec sincérité et sans honte une vérité émotionnelle dans mon carnet.',
    iconName: 'Sparkles',
    color: '#3B82F6'
  },
  {
    id: 'val_respect',
    name: 'Respect de mes Limites',
    category: 'Dignité & Respect',
    definition: 'Le pouvoir de dire « non » sans culpabilité et d\'honorer mon espace vital.',
    benevolentVision: 'Mes limites ne sont pas de l\'égoïsme, elles sont la maison sacrée de ma paix intérieure.',
    dailyMicroAction: 'Définir une limite claire aujourd\'hui pour préserver mon énergie.',
    iconName: 'Compass',
    color: '#7C3AED'
  },
  {
    id: 'val_liberte',
    name: 'Liberté & Souveraineté',
    category: 'Liberté & Vérité',
    definition: 'La faculté de décider de ma vie, de mes choix et de mon avenir selon ma volonté propre.',
    benevolentVision: 'Je me vois comme l\'unique capitaine de mon destin, libre d\'écrire mon nouveau chapitre.',
    dailyMicroAction: 'Faire un choix personnel guidé uniquement par mon bien-être.',
    iconName: 'Feather',
    color: '#0D9488'
  },
  {
    id: 'val_courage',
    name: 'Courage & Résilience',
    category: 'Force & Courage',
    definition: 'La force invisible qui m\'a permis de traverser la tempête et de chercher la lumière.',
    benevolentVision: 'Je reconnais mon immense bravoure : j\'ai survécu, j\'avance et chaque pas est une victoire héroïque.',
    dailyMicroAction: 'Célébrer une difficulté surmontée avec fierté et gratitude envers moi-même.',
    iconName: 'Flame',
    color: '#EA580C'
  },
  {
    id: 'val_paix',
    name: 'Sérénité & Paix Intérieure',
    category: 'Sécurité & Paix',
    definition: 'Cultiver un espace de calme inaltérable, loin du chaos et des conflits stériles.',
    benevolentVision: 'Mon esprit mérite le silence, la clarté et l\'harmonie. Je dépose les armes de la rancœur.',
    dailyMicroAction: '3 respirations de cohérence cardiaque en relâchant les mâchoires et le front.',
    iconName: 'Sun',
    color: '#EAB308'
  },
  {
    id: 'val_amour_propre',
    name: 'Auto-Amour Inconditionnel',
    category: 'Douceur & Soin',
    definition: 'S\'aimer pleinement, non pas pour ce que l\'on fait ou produit, mais pour qui l\'on est.',
    benevolentVision: 'Je m\'aime telle que je suis aujourd\'hui, avec mes cicatrices qui témoignent de ma renaissance.',
    dailyMicroAction: 'Se regarder dans un miroir ou fermer les yeux et se dire : « Je t\'aime et je suis fière de toi. »',
    iconName: 'Award',
    color: '#E11D48'
  }
];

export const BENEVOLENT_SELF_AFFIRMATIONS = [
  "« 1- Que ma parole soit impeccable : je m'adresse avec douceur et je bannis l'auto-dénigrement. »",
  "« 2- Je ne prends rien personnellement : les réactions d'autrui reflètent leur propre monde, pas ma valeur. »",
  "« 3- Je ne fais aucune supposition : j'ose communiquer avec clarté et sérénité. »",
  "« 4- Je fais toujours de mon mieux : chaque instant fait avec cœur est une victoire complète. »",
  "« 5- Je reste sceptique avec bienveillance, mais j'écoute avec discernement et paix. »",
  "« À travers mes valeurs de dignité et de paix, je refuse désormais toute parole qui tenterait de me diminuer. »",
  "« Je choisis de me voir avec les yeux de la plus tendre bienveillance : j'ai fait de mon mieux avec les armes que j'avais. »",
  "« Mes valeurs sont mon phare inébranlable. Elles éclairent ma beauté intérieure et guident chacun de mes choix. »",
  "« Je suis digne de douceur, d'écoute et de respect infini simplement parce que j'existe. »",
  "« Chaque fois que j'honore une de mes valeurs, je restaure l'amour pur et bienveillant que je me porte. »"
];

export interface ToltecExamOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  entropyReductionFeedback: string;
}

export interface ToltecExamQuestion {
  id: string;
  agreementNumber: 1 | 2 | 3 | 4 | 5;
  agreementTitle: string;
  audioBookSource: string;
  situation: string;
  promptQuestion: string;
  options: ToltecExamOption[];
  summaryKey: string;
  dailyApplication: string;
}

export const TOLTEC_EXAM_QUESTIONS: ToltecExamQuestion[] = [
  {
    id: 'exam_toltec_1',
    agreementNumber: 1,
    agreementTitle: 'Que ta parole soit impeccable',
    audioBookSource: 'Livre Audio 1 (Don Miguel Ruiz)',
    situation: 'Après une journée éprouvante, une petite erreur survient et une pensée surgit dans votre tête : « Tu es nulle, tu ne réussiras jamais rien ». Selon le 1er Accord Toltèque, quelle réaction réduit immédiatement l\'entropie interne ?',
    promptQuestion: 'Comment appliquez-vous concrètement l\'Accord 1 (Parole Impeccable) face à cette situation ?',
    options: [
      {
        id: 'opt_1_a',
        text: 'Interrompre immédiatement ce poison verbal : refuser d\'utiliser la parole contre moi-même et me dire avec douceur : « J\'ai fait face avec courage, cette erreur est humaine et je mérite mon propre respect. »',
        isCorrect: true,
        explanation: 'La parole impeccable signifie ne jamais diriger l\'énergie des mots contre soi-même. Éteindre l\'autocritique désamorce le traumatisme et restaure la sécurité interne.',
        entropyReductionFeedback: 'Excellente réduction d\'entropie : le persécuteur intérieur est désactivé au profit de l\'auto-compassion.'
      },
      {
        id: 'opt_1_b',
        text: 'Répéter cette phrase en cherchant à punir mes faiblesses pour être plus performante à l\'avenir.',
        isCorrect: false,
        explanation: 'C\'est l\'opposé de la parole impeccable : c\'est injecter du poison émotionnel et renforcer la culpabilité.',
        entropyReductionFeedback: 'Augmentation du stress et du désalignement intérieur.'
      },
      {
        id: 'opt_1_c',
        text: 'Accuser quelqu\'un d\'autre avec colère pour me décharger du sentiment d\'échec.',
        isCorrect: false,
        explanation: 'Médire ou projeter sur autrui disperse le poison sans guérir la blessure.',
        entropyReductionFeedback: 'Crée du conflit relationnel et entretient l\'agitation.'
      }
    ],
    summaryKey: 'Parler avec vérité, amour et intégrité. Bannir toute violence verbale dirigée contre soi-même ou autrui.',
    dailyApplication: 'Repérer chaque jugement interne négatif et le transformer en parole de protection aimante.'
  },
  {
    id: 'exam_toltec_2',
    agreementNumber: 2,
    agreementTitle: 'Ne prends rien personnellement',
    audioBookSource: 'Livre Audio 1 (Don Miguel Ruiz)',
    situation: 'Une personne de votre entourage ou un ex-partenaire vous envoie un message froid et dévalorisant affirmant que vous êtes responsable de tous ses malheurs. Selon le 2e Accord Toltèque, quelle est la vérité lucide ?',
    promptQuestion: 'Quelle posture mentale neutralise ce poison selon le 2e Accord ?',
    options: [
      {
        id: 'opt_2_a',
        text: 'Reconnaître que ses propos ne parlent que de son propre univers, de ses blessures et de sa programmation. Rien n\'est dirigé contre ma valeur réelle : je n\'absorbe pas son venin.',
        isCorrect: true,
        explanation: 'Ce que les autres disent et font est une projection de leur propre rêve. En ne prenant rien personnellement, vous devenez totalement immunisée contre la manipulation.',
        entropyReductionFeedback: 'Immunité émotionnelle totale : vous conservez votre calme sans entrer dans la culpabilité imposée.'
      },
      {
        id: 'opt_2_b',
        text: 'Ruminer le message pendant des heures en cherchant où j\'ai commis une faute impardonnable.',
        isCorrect: false,
        explanation: 'Prendre les attaques d\'autrui personnellement vous rend dépendante de leur validation et valide leur emprise.',
        entropyReductionFeedback: 'Augmente le sentiment de culpabilité et l\'hypervigilance.'
      },
      {
        id: 'opt_2_c',
        text: 'Rédiger une lettre de 5 pages pour lui prouver à tout prix que j\'ai raison et qu\'il a tort.',
        isCorrect: false,
        explanation: 'Vouloir convaincre à tout prix montre qu\'on a mordu à l\'hameçon du poison personnel.',
        entropyReductionFeedback: 'Perte massive d\'énergie et escalade inutile.'
      }
    ],
    summaryKey: 'Ce que disent ou font les autres est un reflet de leur propre monde, jamais de votre dignité.',
    dailyApplication: 'Visualiser les reproches injustifiés comme des nuages qui glissent sur un bouclier de sérénité.'
  },
  {
    id: 'exam_toltec_3',
    agreementNumber: 3,
    agreementTitle: 'Ne fais aucune supposition',
    audioBookSource: 'Livre Audio 1 (Don Miguel Ruiz)',
    situation: 'Quelqu\'un ne répond pas à votre message depuis 24h. Votre mental commence à échafauder des scénarios catastrophiques : « Il m\'en veut », « J\'ai encore tout gâché ». Selon le 3e Accord Toltèque, comment agir ?',
    promptQuestion: 'Quelle est la méthode toltèque pour couper court au drame imaginaire ?',
    options: [
      {
        id: 'opt_3_a',
        text: 'Distinguer les faits réels des suppositions : je n\'ai aucun élément vérifié. Si nécessaire, je pose une question claire et directe, sans m\'inventer un scénario anxiogène.',
        isCorrect: true,
        explanation: 'Les suppositions créent du poison émotionnel et des drames fictifs. Avoir le courage de vérifier les faits et de communiquer avec clarté dissout l\'illusion.',
        entropyReductionFeedback: 'Clarté cognitive rétablie : fin du chaos décisionnel et des ruminations prédictives.'
      },
      {
        id: 'opt_3_b',
        text: 'Considérer que mes scénarios noirs sont obligatoirement réels et me préparer au pire en coupant tout contact.',
        isCorrect: false,
        explanation: 'Faire des suppositions et y croire aveuglément est le mécanisme premier de la souffrance relationnelle.',
        entropyReductionFeedback: 'Crée un stress d\'anticipation majeur et une anxiété non fondée.'
      },
      {
        id: 'opt_3_c',
        text: 'Demander l\'avis de dix personnes pour savoir ce qu\'elles supposent à leur tour.',
        isCorrect: false,
        explanation: 'Empiler des suppositions extérieures ne remplace jamais une vérification directe ou un retour au calme intérieur.',
        entropyReductionFeedback: 'Multiplie l\'incertitude et la confusion.'
      }
    ],
    summaryKey: 'Exprimer ses besoins réels, vérifier les faits tangibles et refuser de vivre dans les scénarios inventés.',
    dailyApplication: 'Se demander systématiquement : « Est-ce un fait avéré à 100% ou une supposition de mon esprit ? »'
  },
  {
    id: 'exam_toltec_4',
    agreementNumber: 4,
    agreementTitle: 'Fais toujours de ton mieux',
    audioBookSource: 'Livre Audio 1 (Don Miguel Ruiz)',
    situation: 'Aujourd\'hui, vous vous sentez épuisée et vous n\'avez réussi à accomplir qu\'une seule tâche simple. Une voix commence à vous culpabiliser. Que vous enseigne le 4e Accord Toltèque ?',
    promptQuestion: 'Comment honorer la juste mesure de « votre mieux » aujourd\'hui ?',
    options: [
      {
        id: 'opt_4_a',
        text: 'Reconnaître avec gratitude que « mon mieux » fluctue selon ma fatigue ou ma douleur. Avoir respiré et fait ce geste était mon 100% du jour : je vis sans auto-jugement ni honte.',
        isCorrect: true,
        explanation: 'Faire de son mieux évite à la fois le surmenage (en voulant trop en faire) et la culpabilité (en se dévalorisant). Votre mieux dans la maladie ou l\'épuisement n\'est pas le même que dans la pleine forme.',
        entropyReductionFeedback: 'Libération du perfectionnisme toxique : acceptation inconditionnelle du moment présent.'
      },
      {
        id: 'opt_4_b',
        text: 'Me forcer à travailler jusqu\'à l\'épuisement total pour me prouver que je suis courageuse.',
        isCorrect: false,
        explanation: 'Vouloir faire plus que son mieux mène à l\'épuisement, à la blessure et au ressentiment.',
        entropyReductionFeedback: 'Épuisement du système nerveux et risque de rechute somatique.'
      },
      {
        id: 'opt_4_c',
        text: 'Abandonner tout effort futur en me disant que je ne suis bonne à rien.',
        isCorrect: false,
        explanation: 'Faire moins que son mieux entraîne la frustration et le regret.',
        entropyReductionFeedback: 'Sentiment d\'impuissance acquise et découragement.'
      }
    ],
    summaryKey: 'Faire simplement de son mieux à l\'instant T : ni plus (surmenage), ni moins (regrets).',
    dailyApplication: 'Chaque soir, poser une main sur le cœur et dire : « J\'ai fait de mon mieux aujourd\'hui, et cela suffit amplement. »'
  },
  {
    id: 'exam_toltec_5',
    agreementNumber: 5,
    agreementTitle: 'Sois sceptique, mais apprends à écouter',
    audioBookSource: 'Livre Audio 2 (Don Miguel Ruiz & Don Jose Ruiz)',
    situation: 'Face à un discours culpabilisant, un mensonge évident ou un conditionnement passé qui tente de vous dicter ce que vous devez être, quelle est la posture de souveraineté enseignée par le 5e Accord ?',
    promptQuestion: 'Comment exercer le doute libérateur tout en maintenant une écoute sereine ?',
    options: [
      {
        id: 'opt_5_a',
        text: 'Utiliser le doute comme un bouclier lucide : ne pas croire aveuglément les mots ni les jugements d\'autrui, tout en écoutant calmement l\'intention sans me laisser intoxiquer.',
        isCorrect: true,
        explanation: 'Le 5e Accord utilise le scepticisme bienveillant. Vous ne croyez pas vos propres pensées toxiques ni les récits manipulatoires d\'autrui, mais vous écoutez avec respect pour discerner la réalité profonde.',
        entropyReductionFeedback: 'Souveraineté et clarté d\'esprit inébranlables : immunité absolue contre le gaslighting.'
      },
      {
        id: 'opt_5_b',
        text: 'Croire aveuglément tout ce que dit la personne par peur d\'un conflit ou d\'un rejet.',
        isCorrect: false,
        explanation: 'Céder à l\'illusion et au conditionnement aliène votre libre arbitre et votre discernement.',
        entropyReductionFeedback: 'Perte de souveraineté personnelle et soumission à l\'illusion.'
      },
      {
        id: 'opt_5_c',
        text: 'Boucher ses oreilles avec agressivité en refusant d\'entendre quoi que ce soit.',
        isCorrect: false,
        explanation: 'Le 5e accord demande d\'apprendre à écouter avec discernement, et non de réagir avec fermeture ou panique.',
        entropyReductionFeedback: 'Réaction de défense rigide sans clarté introspective.'
      }
    ],
    summaryKey: 'Ne pas croire aveuglément les mots ou les récits (y compris ses propres doutes), mais écouter avec sagesse pour voir la vérité.',
    dailyApplication: 'Face à une affirmation troublante, se répéter : « Je doute avec sagesse, j\'observe les actes réels et je garde mon discernement. »'
  }
];
