import { Healing100QuestionItem } from '../resilience100QuestionsData';

// ============================================================================
// CYCLE 2 : NIVEAUX 26 À 50 (Neurobiologie des Traumas, Théorie Polyvagale & C-PTSD)
// Répartition aléatoire équilibrée des options correctes (A, B, C)
// ============================================================================
export const CYCLE_2_QUESTIONS: Healing100QuestionItem[] = [
  // --- BLOC 1 : NIVEAUX 26 À 30 • DÉCRYPTAGE SOMATIQUE & SYSTÈME NERVEUX ---
  {
    level: 26,
    cycleId: 2,
    title: "Étape 26 : Comprendre le Cerveau Triunique & l'Amygdale",
    theme: "Neurobiologie du Trauma • Cerveau Triunique",
    question: "Face à une menace perçue ou un déclencheur traumatique (trigger), quelle partie de votre cerveau prend immédiatement le contrôle avant la réflexion ?",
    options: [
      "Le néocortex préfrontal, qui analyse avec calme et philosophie les événements.",
      "Le complexe reptilien et l'amygdale, qui déclenchent un réflexe archaïque de survie (Combat, Fuite, Sidération).",
      "Le centre du langage de Broca, qui rédige un discours d'argumentation logique."
    ],
    correctOptionIndex: 1, // B
    explanation: "L'amygdale déclenche la réaction de survie en quelques millisecondes, court-circuitant le néocortex. Ce réflexe n'est pas une faute mais un mécanisme adaptatif de protection.",
    reflectionPrompt: "Quel déclencheur physique reconnaissez-vous aujourd'hui comme un simple réflexe d'alarme de votre amygdale ?",
    benevolentAffirmation: "« Mon système nerveux a cherché à me protéger. Je le remercie et je le rassure avec douceur. »",
    unlockedRewardBadge: "Badge : Clé de l'Amygdale Apaisée"
  },
  {
    level: 27,
    cycleId: 2,
    title: "Étape 27 : La Théorie Polyvagale & l'Échelle de Porges",
    theme: "Théorie Polyvagale • Vagal Dorsal vs Vagal Ventral",
    question: "Lorsque vous ressentez une fatigue écrasante, un engourdissement émotionnel ou une envie de disparaître (sidération), quel état du nerf vague est activé ?",
    options: [
      "Le système vagal ventral de connexion sociale et de sécurité joyeuse.",
      "Le système sympathique d'attaque active et de fuite rapide.",
      "Le système vagal dorsal de figement (freeze), un réflexe archaïque de conservation d'énergie face à une menace écrasante."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le figement vagal dorsal est le mode ultime de survie : votre corps s'anesthésie pour vous préserver. Le reconnaître sans culpabilité permet de remonter doucement vers le vagal ventral.",
    reflectionPrompt: "Comment accueillez-vous ce besoin de repos sans vous juger de 'manquer d'énergie' ?",
    benevolentAffirmation: "« Mon corps sait se mettre en sommeil pour préserver ma vie. J'accueille chaque phase avec tendresse. »",
    unlockedRewardBadge: "Badge : Boussole Polyvagale de Porges"
  },
  {
    level: 28,
    cycleId: 2,
    title: "Étape 28 : La Fenêtre de Tolérance Somatique",
    theme: "Régulation Nerveuse • Fenêtre de Tolérance",
    question: "Comment élargir progressivement votre fenêtre de tolérance émotionnelle lorsque l'anxiété ou l'engourdissement tente de vous submerger ?",
    options: [
      "En pratiquant des micro-ancrages sensoriels (respiration 4-7-8, contact des pieds au sol, auto-étreinte) pour réguler le système nerveux.",
      "En consommant des excitants pour forcer mon corps à rester en hyperactivité permanente.",
      "En m'isolant dans le noir complet pendant plusieurs semaines sans bouger."
    ],
    correctOptionIndex: 0, // A
    explanation: "Les micro-ancrages sensoriels envoient des signaux proprioceptifs au tronc cérébral, réintégrant l'expérience dans la fenêtre de tolérance.",
    reflectionPrompt: "Quel ancrage somatique simple (toucher, regard, souffle) vous ramène instantanément dans votre fenêtre de sécurité ?",
    benevolentAffirmation: "« J'élargis ma fenêtre de tolérance avec douceur. Mon corps est un havre de sécurité stable. »",
    unlockedRewardBadge: "Badge : Fenêtre de Sérénité Élargie"
  },
  {
    level: 29,
    cycleId: 2,
    title: "Étape 29 : Décharge Somatique du Trauma (Méthode Peter Levine)",
    theme: "Somatic Experiencing • Libération de l'Énergie Figée",
    question: "Selon les découvertes de Peter Levine (Somatic Experiencing), pourquoi le corps a-t-il besoin de trembler, soupirer ou bouger après un stress intense ?",
    options: [
      "Parce que les tremblements sont le signe d'une maladie incurable du système nerveux.",
      "Parce que ces réflexes spontanés permettent de décharger l'immense énergie de survie restée prisonnière des muscles lors de la sidération.",
      "Parce que le corps cherche à détruire ses propres réserves de glucose."
    ],
    correctOptionIndex: 1, // B
    explanation: "Les mammifères tremblent spontanément après une menace pour évacuer l'adrénaline et le cortisol. Permettre au corps de soupirer et trembler libère le trauma figé.",
    reflectionPrompt: "Quel grand soupir ou étirement libérateur pouvez-vous offrir à votre corps en cet instant précis ?",
    benevolentAffirmation: "« J'autorise mon corps à relâcher toute tension résiduelle. Je décharge le passé et je redeviens fluide. »",
    unlockedRewardBadge: "Badge : Libération Somatique des Tensions"
  },
  {
    level: 30,
    cycleId: 2,
    title: "Étape 30 : La Neuroception de Sécurité (Palier 30)",
    theme: "Neurobiologie • La Neuroception Inconsciente",
    question: "Comment recalibrer votre 'neuroception' (la capacité inconsciente de votre corps à détecter la sécurité réelle) après des années d'hypervigilance ?",
    options: [
      "En continuant à surveiller chaque bruit et chaque ombre 24h sur 24 par précaution.",
      "En ignorant délibérément les signaux de danger réels même en cas d'urgence absolue.",
      "En nommant consciemment à voix haute 3 éléments de sécurité tangible autour de soi ('Ici, la porte est fermée, mon lit est chaud, je suis libre')."
    ],
    correctOptionIndex: 2, // C
    explanation: "La verbalisation d'indices de sécurité objective rééduque la neuroception en reliant le cortex préfrontal au système limbique.",
    reflectionPrompt: "Nommez 3 preuves concrètes de sécurité qui vous entourent en ce moment même :",
    benevolentAffirmation: "« Ma neuroception s'apaise. Mon corps apprend chaque jour à reconnaître la paix et la vraie sécurité. »",
    unlockedRewardBadge: "Trophée : Sceau de la Neuroception Calibrée (Palier 30 Validé)"
  },

  // --- BLOC 2 : NIVEAUX 31 À 35 • MÉMOIRE TRAUMATIQUE & HYPERVIGILANCE ---
  {
    level: 31,
    cycleId: 2,
    title: "Étape 31 : Dissocier Mémoire Explicite et Mémoire Implicite",
    theme: "Neurobiologie de la Mémoire • Hippocampe vs Amygdale",
    question: "Pourquoi un flashback ou une angoisse soudaine donne-t-elle l'impression que le danger arrive MAINTENANT, alors qu'il appartient au passé ?",
    options: [
      "Parce que lors d'un trauma, l'hippocampe (qui date les souvenirs dans le temps) a été inhibé, stockant l'émotion sans étiquette temporelle.",
      "Parce que le temps n'existe pas et que les traumatismes se reproduisent chaque jour à l'identique.",
      "Parce que notre cerveau n'est pas capable de faire la différence entre un rêve et la réalité."
    ],
    correctOptionIndex: 0, // A
    explanation: "Le stress aigu bloque l'hippocampe. L'émotion stockée dans l'amygdale surgit 'hors du temps'. Se rappeler 'C'est un souvenir, je suis dans le présent' rétablit le repère chronologique.",
    reflectionPrompt: "Quel rappel temporel ('C'était hier, aujourd'hui je suis ici et en sécurité') vous apaise le plus ?",
    benevolentAffirmation: "« Le passé est terminé. Ce que je ressens est un écho d'hier, mais ici et maintenant, je suis en paix. »",
    unlockedRewardBadge: "Badge : Chronomètre de l'Hippocampe"
  },
  {
    level: 32,
    cycleId: 2,
    title: "Étape 32 : Le Sevrage de l'Addiction au Cortisol",
    theme: "Neurochimie du Stress • Boucle Cortisol / Adrénaline",
    question: "Pourquoi les premiers jours de calme et de silence provoquent-ils parfois un inconfort ou un sentiment de manque d'intensité ?",
    options: [
      "Parce que le calme est dangereux et qu'il faut recréer immédiatement des disputes pour se sentir vivante.",
      "Parce que le corps s'était accoutumé à des taux élevés d'adrénaline et de cortisol : le silence est une phase de désintoxication neurobiologique.",
      "Parce que la sérénité n'est pas faite pour les personnes qui ont connu le trauma."
    ],
    correctOptionIndex: 1, // B
    explanation: "Le système nerveux sevré du cycle de tension/soulagement toxique passe par une phase de sevrage chimique. Le calme s'apprend comme une nouvelle fréquence biologique.",
    reflectionPrompt: "Comment accueillez-vous la douceur du calme sans chercher à remplir le vide par de l'anxiété ?",
    benevolentAffirmation: "« J'apprivoise la paix. Mon corps s'habitue à la douceur du repos sans craindre le silence. »",
    unlockedRewardBadge: "Badge : Sevrage Serein du Cortisol"
  },
  {
    level: 33,
    cycleId: 2,
    title: "Étape 33 : La Cartographie des Déclencheurs (Triggers)",
    theme: "Désensibilisation • Cartographie Somatique des Déclencheurs",
    question: "Quelle méthode bienveillante permet de neutraliser l'impact d'une odeur, d'un ton de voix ou d'un lieu qui réactive la panique ?",
    options: [
      "Éviter à tout jamais de sortir de chez soi pour ne croiser aucun déclencheur.",
      "Faire semblant d'être insensible et réprimer l'émotion jusqu'à l'explosion.",
      "Identifier le déclencheur, nommer la sensation corporelle sans paniquer et réassocier ce stimulus à une expérience rassurante et présente."
    ],
    correctOptionIndex: 2, // C
    explanation: "La désensibilisation progressive et le recadrage somatique court-circuitent le conditionnement aversif classique.",
    reflectionPrompt: "Quel déclencheur familier pouvez-vous observer aujourd'hui avec un regard d'observatrice sereine ?",
    benevolentAffirmation: "« Je reconnais mes déclencheurs comme de vieux signaux d'alarme. Je suis au volant de ma vie. »",
    unlockedRewardBadge: "Badge : Carte de Clarté Somatique"
  },
  {
    level: 34,
    cycleId: 2,
    title: "Étape 34 : L'Extinction de l'Hypervigilance Sensorielle",
    theme: "Neurobiologie • Calmer le Scanneur de Menaces",
    question: "Comment aider vos yeux et vos oreilles à cesser de scanner continuellement l'environnement à la recherche de dangers imaginaires ?",
    options: [
      "En orientant délibérément le regard sur des formes douces, des couleurs apaisantes et en élargissant la vision périphérique.",
      "En fermant les yeux en permanence et en mettant des bouchons d'oreilles toute la journée.",
      "En fixant un point avec angoisse pour guetter le moindre mouvement suspect."
    ],
    correctOptionIndex: 0, // A
    explanation: "La vision périphérique active la branche parasympathique ventrale, tandis que la vision fovéale rétrécie entretient le mode alerte sympathique.",
    reflectionPrompt: "Prenez 10 secondes pour élargir votre regard sur les côtés de la pièce et sentez la détente oculaire.",
    benevolentAffirmation: "« Mon regard s'adoucit, mon champ de vision s'élargit. Je peux me détendre en toute sécurité. »",
    unlockedRewardBadge: "Badge : Vision Panoramique Apaisée"
  },
  {
    level: 35,
    cycleId: 2,
    title: "Étape 35 : La Reconnexion Vagal Ventrale (Palier 35)",
    theme: "Neurobiologie • Le Nerf Vague Social",
    question: "Quelles activités activent le plus puissamment le nerf vagal ventral pour restaurer le sentiment de joie et de reliance ?",
    options: [
      "Les jeux vidéo violents et les débats houleux sur les réseaux sociaux.",
      "Le chant doux, les sourires sincères, le contact bienveillant avec un animal ou un proche de confiance, et les expirations longues.",
      "La compétition acharnée et l'isolement complet."
    ],
    correctOptionIndex: 1, // B
    explanation: "Le système vagal ventral innerve le visage, le larynx et le cœur : chantonner, sourire et respirer longuement réactivent le sentiment d'appartenance et de sécurité.",
    reflectionPrompt: "Quel fredonnement, chant ou parole bienveillante pouvez-vous émettre pour masser vos cordes vocales ?",
    benevolentAffirmation: "« Mon nerf vague chante la paix. Je rayonne la sécurité et la bienveillance autour de moi. »",
    unlockedRewardBadge: "Badge : Sceau du Vagal Ventral Épanoui"
  },

  // --- BLOC 3 : NIVEAUX 36 À 40 • DISSOCIATION & INCARNATION SOMATIQUE ---
  {
    level: 36,
    cycleId: 2,
    title: "Étape 36 : Revenir de la Dissociation en Toute Douceur",
    theme: "Intégration Somatique • Sortie du Brouillard Dissociatif",
    question: "Lorsque vous vous sentez 'flotter hors de votre corps' ou absente du monde réel, quel est le protocole de réancrage le plus efficace (Technique 5-4-3-2-1) ?",
    options: [
      "Attendre passivement que les heures passent sans intervenir.",
      "Se fustiger mentalement d'être déconnectée de la réalité.",
      "Nommer 5 objets que je vois, toucher 4 textures réelles, écouter 3 sons, sentir 2 odeurs et savourer 1 goût présent."
    ],
    correctOptionIndex: 2, // C
    explanation: "La méthode 5-4-3-2-1 réactive le cortex somatosensoriel et ramène instantanément la conscience dans le corps physique.",
    reflectionPrompt: "Touchez la surface de votre table ou de votre vêtement : quelle texture tactile ressentez-vous précisément ?",
    benevolentAffirmation: "« Je réintègre mon corps avec amour. Mes pieds foulent la terre ferme, je suis vivante et présente. »",
    unlockedRewardBadge: "Badge : Ancre des 5 Sens"
  },
  {
    level: 37,
    cycleId: 2,
    title: "Étape 37 : L'Auto-Étreinte Papillon (Méthode EMDR / Artigas)",
    theme: "Régulation Bilatérale • L'Étreinte du Papillon",
    question: "Comment l'exercice du 'Hug Papillon' (croiser les bras sur la poitrine et tapoter alternativement chaque épaule) agit-il sur le cerveau ?",
    options: [
      "En stimulant alternativement les hémisphères gauche et droit pour digérer l'émotion traumatique et calmer le système limbique.",
      "En bloquant la circulation sanguine vers les bras pour engourdir la douleur.",
      "En forçant le cerveau à oublier définitivement toute son enfance."
    ],
    correctOptionIndex: 0, // A
    explanation: "La stimulation bilatérale alternée (BLS) synchronise les ondes cérébrales et facilite le retraitement des charges émotionnelles bloquées.",
    reflectionPrompt: "Croisez vos mains sur votre poitrine et pratiquez 10 tapotements lents et alternés. Que ressentez-vous ?",
    benevolentAffirmation: "« Je m'offre une sécurité inconditionnelle. Mes deux hémisphères s'harmonisent dans la paix. »",
    unlockedRewardBadge: "Badge : Ailes du Papillon Bilatéral"
  },
  {
    level: 38,
    cycleId: 2,
    title: "Étape 38 : Honorer le Rôle Historique de la Dissociation",
    theme: "Compassion pour les Mécanismes de Défense",
    question: "Pourquoi devriez-vous remercier avec émotion votre capacité de dissociation passée au lieu de la détester ?",
    options: [
      "Parce que la dissociation prouve qu'on ne ressent aucune douleur réelle.",
      "Parce que cette anesthésie psychique a été votre ange gardien biologique pour supporter des situations intolérables sans que votre psychisme n'éclate.",
      "Parce qu'il faut rester dissociée toute sa vie pour être heureuse."
    ],
    correctOptionIndex: 1, // B
    explanation: "La dissociation a sauvé votre intégrité mentale dans les moments d'impuissance totale. Aujourd'hui, en sécurité, vous pouvez la remercier et réhabiter votre corps.",
    reflectionPrompt: "Quel hommage de gratitude rendez-vous à la force de protection intérieure qui vous a permis de survivre ?",
    benevolentAffirmation: "« Merci à mon esprit de m'avoir protégée quand c'était nécessaire. Aujourd'hui, je peux habiter mon corps en sécurité. »",
    unlockedRewardBadge: "Badge : Hommage à la Protectrice Intérieure"
  },
  {
    level: 39,
    cycleId: 2,
    title: "Étape 39 : Réhabiliter le Sens de l'Intéroception",
    theme: "Intéroception • Écoute Bienveillante des Organes",
    question: "Qu'est-ce que l'intéroception et pourquoi est-elle la clé de voûte de la reconquête de soi ?",
    options: [
      "C'est la capacité d'écouter les ragots des voisins pour anticiper leurs réactions.",
      "C'est le fait d'analyser sans arrêt ses prises de sang médicales.",
      "C'est la perception bienveillante des signaux internes du corps (battements du cœur, respiration, digestion) sans angoisse ni fuite."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le trauma déconnecte l'insula intéroceptive. Réapprendre à ressentir son estomac, sa poitrine ou sa gorge sans panique guérit la relation à soi.",
    reflectionPrompt: "Posez votre main sur votre ventre et écoutez son rythme pendant 3 respirations complètes.",
    benevolentAffirmation: "« Mon corps me parle avec sagesse. J'écoute ses messages avec respect, calme et bienveillance. »",
    unlockedRewardBadge: "Badge : Clé de l'Intéroception Sacrée"
  },
  {
    level: 40,
    cycleId: 2,
    title: "Étape 40 : La Cohérence Cardiaque & le Nerf Vague (Palier 40)",
    theme: "Régulation Neuro-Végétative • Cohérence Cardiaque 365",
    question: "Quel impact précis produit la respiration en rythme 5 secondes d'inspiration / 5 secondes d'expiration (6 cycles/minute) ?",
    options: [
      "Elle harmonise la variabilité de la fréquence cardiaque (VRC), diminue le cortisol et synchronise les ondes cérébrales avec le rythme du cœur.",
      "Elle accélère le rythme cardiaque pour préparer le corps à courir un marathon immédiatement.",
      "Elle bloque complètement la digestion pour économiser les calories."
    ],
    correctOptionIndex: 0, // A
    explanation: "La fréquence de résonance à 0.1 Hz optimise le dialogue bidirectionnel cœur-cerveau et induit un état immédiat de clarté mentale.",
    reflectionPrompt: "Prenez 3 respirations lentes de 5 secondes à l'inspiration et 5 secondes à l'expiration.",
    benevolentAffirmation: "« Mon cœur et mon cerveau battent à l'unisson de la paix. Mon rythme intérieur est parfait. »",
    unlockedRewardBadge: "Trophée : Cœur de Cohérence Sacrée (Palier 40 Validé)"
  },

  // --- BLOC 4 : NIVEAUX 41 À 45 • L'ENFANT INTÉRIEUR & ATTACHEMENT SÉCURISÉ ---
  {
    level: 41,
    cycleId: 2,
    title: "Étape 41 : La Rencontre avec la Petite Fille Intérieure",
    theme: "Enfant Intérieur • Reconnexion & Accueil Empathique",
    question: "Face aux angoisses d'abandon ou de rejet, quelle posture de 'Parent Intérieur Bienveillant' devez-vous adopter envers votre enfant blessée ?",
    options: [
      "Lui ordonner de se taire et de grandir immédiatement pour arrêter de pleurer.",
      "La serrer symboliquement dans ses bras d'adulte et lui dire : 'Je suis là maintenant. Tu es en sécurité, je ne t'abandonnerai plus jamais'.",
      "L'enfermer dans un placard mental pour ne plus voir sa tristesse."
    ],
    correctOptionIndex: 1, // B
    explanation: "L'adulte protectrice que vous êtes devenue offre à l'enfant intérieur le 're-parenting' bienveillant dont elle a toujours eu besoin.",
    reflectionPrompt: "Quelle phrase pleine d'amour et de protection soufflez-vous à la petite fille en vous ?",
    benevolentAffirmation: "« Je suis la protectrice aimante de mon enfant intérieur. Elle est en sécurité dans mes bras pour toujours. »",
    unlockedRewardBadge: "Badge : Refuge de la Petite Fille"
  },
  {
    level: 42,
    cycleId: 2,
    title: "Étape 42 : La Reconstruction de l'Attachement Sécure",
    theme: "Théorie de l'Attachement • Vers l'Attachement Sécure Acquis",
    question: "Comment transformer un attachement anxieux ou évitant issu de relations toxiques en un 'attachement sécure acquis' ?",
    options: [
      "En s'assurant d'être la première personne fiable, fidèle et prévisible pour soi-même dans toutes les circonstances de la vie.",
      "En cherchant désespérément une autre personne pour combler le vide intérieur à n'importe quel prix.",
      "En rejetant tout être humain par crainte de souffrir à nouveau."
    ],
    correctOptionIndex: 0, // A
    explanation: "L'attachement sécure s'ancre d'abord dans la relation avec soi-même : être une alliée stable et prévisible qui ne s'abandonne jamais.",
    reflectionPrompt: "Quel engagement de fidélité absolue envers vos propres besoins prenez-vous aujourd'hui ?",
    benevolentAffirmation: "« Je suis mon propre port d'attache sécurisant. Ma présence à mes côtés est constante et bienveillante. »",
    unlockedRewardBadge: "Badge : Ancre d'Attachement Sécure"
  },
  {
    level: 43,
    cycleId: 2,
    title: "Étape 43 : Dissoudre les Schémas d'Auto-Sabotage",
    theme: "Psychologie Clinique • Comprendre l'Auto-Sabotage",
    question: "Pourquoi l'esprit reproduit-il parfois des schémas d'auto-sabotage ou d'attirance vers le chaos après avoir quitté une situation toxique ?",
    options: [
      "Parce que nous sommes nées pour souffrir et que le bonheur nous est interdit.",
      "Parce que le cerveau traumatisé confond la familiarité du danger avec la sécurité : il répète ce qu'il connaît pour tenter de le maîtriser.",
      "Parce que nous n'avons aucune volonté ni aucune intelligence émotionnelle."
    ],
    correctOptionIndex: 1, // B
    explanation: "La répétition traumatique est une tentative inconsciente du système nerveux de maîtriser le chaos passé. En prendre conscience permet de choisir délibérément la paix.",
    reflectionPrompt: "Quel comportement d'auto-sabotage reconnaissez-vous aujourd'hui avec compassion pour le désamorcer ?",
    benevolentAffirmation: "« Je choisis la nouveauté bienfaisante de la paix. La sérénité est mon nouveau foyer naturel. »",
    unlockedRewardBadge: "Badge : Boussole Anti-Répétition"
  },
  {
    level: 44,
    cycleId: 2,
    title: "Étape 44 : Le Droit Sacré à la Joie Sans Culpabilité",
    theme: "Autorisation du Bonheur • Sortie de la Culpabilité du Survivant",
    question: "Comment vous autoriser à rire, vous réjouir et goûter aux plaisirs simples de la vie sans ressentir de culpabilité ?",
    options: [
      "En me rappelant que ma joie est le plus bel hommage à ma vie retrouvée, et que souffrir ne réparera rien du passé.",
      "En m'imposant des pénitences chaque fois que je ressens du plaisir.",
      "En cachant mon bonheur pour ne pas rendre jaloux ceux qui sont malheureux."
    ],
    correctOptionIndex: 0, // A
    explanation: "La joie et le plaisir stimulent l'ocytocine, la sérotonine et la dopamine, réparant les circuits neuronaux usés par le stress chronique.",
    reflectionPrompt: "Quel petit plaisir simple (musique, tisane, rayon de soleil) vous accordez-vous aujourd'hui avec délice ?",
    benevolentAffirmation: "« J'ai le droit divin d'être heureuse. Ma joie est pure, méritée et sanctifiée. »",
    unlockedRewardBadge: "Badge : Rayon de Joie Sanctifiée"
  },
  {
    level: 45,
    cycleId: 2,
    title: "Étape 45 : La Croissance Post-Traumatique (Palier 45)",
    theme: "Psychologie Positive • Post-Traumatic Growth (PTG)",
    question: "Selon les recherches de Tedeschi & Calhoun sur la Croissance Post-Traumatique, quelle transformation remarquable émerge après avoir surmonté l'épreuve ?",
    options: [
      "Une régression totale de toutes nos capacités cognitives et affectives.",
      "Une indifférence amère envers toute forme de relation humaine.",
      "Un sens aigu des priorités essentielles, une appréciation décuplée de la vie, une force intérieure insoupçonnée et une profonde sagesse relationnelle."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le trauma ne vous définit pas, mais la traversée consciente de l'épreuve a forgé en vous une résilience et une clarté incomparables.",
    reflectionPrompt: "Quelle qualité exceptionnelle (courage, lucidité, empathie profonde) reconnaissez-vous en vous aujourd'hui ?",
    benevolentAffirmation: "« Mes épreuves se sont transmutées en or de sagesse. Je suis plus forte, plus lucide et infiniment libre. »",
    unlockedRewardBadge: "Badge : Lotus de Croissance Post-Traumatique"
  },

  // --- BLOC 5 : NIVEAUX 46 À 50 • COURONNEMENT DE LA FORCE SOUVERAINE ---
  {
    level: 46,
    cycleId: 2,
    title: "Étape 46 : L'Alchimie de la Colère Réparatrice",
    theme: "Émotions Sacrées • La Colère comme Gardienne des Limites",
    question: "Comment utiliser l'énergie puissante de la colère sans qu'elle ne devienne destructive ni toxique pour votre organisme ?",
    options: [
      "En la refoulant complètement jusqu'à ce qu'elle se transforme en maladie physique.",
      "En l'accueillant comme une force sacrée qui me signale qu'une limite a été violée, et en l'utilisant pour bâtir ma protection et mes projets.",
      "En la déversant de façon hystérique sur n'importe quel passant."
    ],
    correctOptionIndex: 1, // B
    explanation: "La saine colère est l'instinct de vie qui protège le territoire. Canalisée de manière constructive, elle devient le moteur de la souveraineté.",
    reflectionPrompt: "Quelle action protectrice concrète votre saine indignation vous pousse-t-elle à poser pour vous respecter ?",
    benevolentAffirmation: "« Ma saine colère est mon bouclier de dignité. Je transmute son feu en force tranquille et constructive. »",
    unlockedRewardBadge: "Badge : Flamme de Protection Souveraine"
  },
  {
    level: 47,
    cycleId: 2,
    title: "Étape 47 : Le Sanctuaire Intérieur Inviolable",
    theme: "Espace Psychique • Construction du Sanctuaire Énergétique",
    question: "Comment concevoir votre sanctuaire intérieur pour que personne ne puisse plus jamais envahir votre paix d'esprit ?",
    options: [
      "En visualisant en moi une forteresse de lumière pure dont je suis l'unique gardienne détenant la clé d'entrée.",
      "En attendant que les autres fassent attention à ne pas me déranger.",
      "En laissant la porte grande ouverte à quiconque passe sans demander de compte."
    ],
    correctOptionIndex: 0, // A
    explanation: "Le sanctuaire intérieur est un espace symbolique et somatique où vous décidez souverainement qui et quoi a le droit d'entrer.",
    reflectionPrompt: "Décrivez en quelques mots la beauté et la sécurité absolue de votre sanctuaire intime :",
    benevolentAffirmation: "« Mon âme est un temple inviolable. Seules la paix, la dignité et la vérité franchissent mon seuil. »",
    unlockedRewardBadge: "Badge : Clé du Sanctuaire d'Or"
  },
  {
    level: 48,
    cycleId: 2,
    title: "Étape 48 : La Fin du Rôle de Sauveteuse / Victime / Bourreau",
    theme: "Analyse Transactionnelle • Sortie du Triangle de Karpman",
    question: "Comment quitter définitivement le Triangle dramatique de Karpman (Victime, Bourreau, Sauveteuse) ?",
    options: [
      "En devenant le bourreau des autres pour se venger des souffrances passées.",
      "En adoptant la posture de la Créatrice Souveraine : responsable de mes choix, respectueuse de mes besoins et détachée des drames d'autrui.",
      "En cherchant une nouvelle personne à sauver pour prouver ma valeur."
    ],
    correctOptionIndex: 1, // B
    explanation: "Sortir du triangle dramatique consiste à passer de 'victime impuissante' ou 'sauveteuse sacrificielle' à 'créatrice autonome et souveraine'.",
    reflectionPrompt: "Quel réflexe de sauveteuse ou de justification abandonnez-vous pour embrasser votre posture de Créatrice ?",
    benevolentAffirmation: "« Je renonce à tous les jeux dramatiques. Je suis la Créatrice souveraine de ma réalité paisible. »",
    unlockedRewardBadge: "Badge : Cercle d'Émancipation de Karpman"
  },
  {
    level: 49,
    cycleId: 2,
    title: "Étape 49 : L'Allostasie & la Résilience Biologique",
    theme: "Physiologie • Réduction de la Charge Allostatique",
    question: "Qu'est-ce que la charge allostatique et comment restaurer l'équilibre biologique de votre corps après l'épreuve ?",
    options: [
      "C'est la liste des dettes financières qu'il faut rembourser à la banque.",
      "C'est un régime alimentaire strict basé uniquement sur les protéines pures.",
      "C'est l'usure physiologique accumulée sous stress chronique ; la réduire passe par le sommeil réparateur, la nutrition bienveillante et l'amour de soi."
    ],
    correctOptionIndex: 2, // C
    explanation: "L'allostasie est la capacité du corps à retrouver la stabilité à travers le changement. Réduire la charge allostatique rajeunit le système immunitaire.",
    reflectionPrompt: "Quel soin bienveillant (sommeil, bain chaud, alimentation saine) offrez-vous à votre biologie aujourd'hui ?",
    benevolentAffirmation: "« Mon corps se régénère à chaque cellule. Ma vitalité fleurit dans la paix et l'harmonie. »",
    unlockedRewardBadge: "Badge : Fontaine de Vitalité Biologique"
  },
  {
    level: 50,
    cycleId: 2,
    title: "Étape 50 : Couronnement du Cycle 2 (La Maîtrise Somato-Émotionnelle)",
    theme: "Consécration du Demi-Siècle de Guérison (Palier 50)",
    question: "En franchissant ce cap historique du Niveau 50, quelle proclamation de souveraineté grave votre renaissance dans le marbre ?",
    options: [
      "Mon corps est mon temple sacré, mon système nerveux est mon allié. Je suis la reine souveraine et intouchable de ma paix retrouvée.",
      "J'exige des excuses publiques de toutes les personnes qui m'ont un jour blessée avant d'avancer.",
      "Je crains que le passé ne me rattrape à chaque instant de ma future vie."
    ],
    correctOptionIndex: 0, // A
    explanation: "Félicitations sublimes ! Le franchissement du Niveau 50 consacre votre maîtrise des mécanismes du trauma et de la neurobiologie. Vous possédez désormais le Bouclier Doré de Souveraineté (+100 pts).",
    reflectionPrompt: "Écrivez votre proclamation de souveraineté pour célébrer le cap du demi-siècle de guérison (Niveau 50) :",
    benevolentAffirmation: "« Mon corps est mon temple, mon esprit est mon allié. Je suis la reine souveraine de ma paix intérieure. »",
    unlockedRewardBadge: "Trophée Suprême : Bouclier Doré de Souveraineté (Cycle 2 Accompli 🏆)"
  }
];
