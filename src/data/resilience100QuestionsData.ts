import { HealingQuestion } from './resilience100Levels';

export interface Healing100QuestionItem {
  level: number;
  cycleId: 1 | 2 | 3 | 4;
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

// 100 Unique, deeply therapeutic questions covering the entire journey from Level 1 to 100
export const COMPLETE_100_HEALING_QUESTIONS: Healing100QuestionItem[] = [
  // ==========================================
  // CYCLE 1 : NIVEAUX 1 À 25 (Valeurs & Regard Bienveillant)
  // ==========================================
  {
    level: 1,
    cycleId: 1,
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
  {
    level: 2,
    cycleId: 1,
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
  {
    level: 3,
    cycleId: 1,
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
  {
    level: 4,
    cycleId: 1,
    title: "Étape 4 : L'Écoute du Corps & Tonus Vagal",
    theme: "Apaisement Somatique",
    question: "Lorsque votre respiration s'apaise, que vous murmure votre corps ?",
    options: [
      "« Tu es en sécurité ici et maintenant, relâche tes épaules. »",
      "« Tu as le droit d'exister sans devoir être constamment sur le qui-vive. »",
      "« Je suis ton allié fidèle, nous allons guérir ensemble. »"
    ],
    reflectionPrompt: "Où ressentez-vous le début d'un soulagement dans votre corps ?",
    benevolentAffirmation: "« Mon corps est un havre de paix qui réapprend le calme et la confiance. »",
    unlockedRewardBadge: "Badge : Souffle d'Ancrage"
  },
  {
    level: 5,
    cycleId: 1,
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
  {
    level: 6,
    cycleId: 1,
    title: "Étape 6 : Désamorcer l'Autocritique Toxique",
    theme: "Bienveillance Psychologique",
    question: "Que répondez-vous à la petite voix intérieure qui vous accuse à tort ?",
    options: [
      "« J'ai fait face avec les moyens et la force que j'avais, je refuse de me juger. »",
      "« Je choisis désormais d'être mon amie la plus protectrice et la plus aimante. »",
      "« La perfection n'existe pas, mais mon courage est bien réel. »"
    ],
    reflectionPrompt: "Quel mot chaleureux dites-vous à votre cœur ?",
    benevolentAffirmation: "« Je fais taire la critique pour laisser chanter l'auto-compassion. »",
    unlockedRewardBadge: "Badge : Épée de Bienveillance"
  },
  {
    level: 7,
    cycleId: 1,
    title: "Étape 7 : Le Droit de Dire Non avec Sérénité",
    theme: "Frontières & Respect de Soi",
    question: "Dire 'Non' à ce qui vous blesse, c'est dire 'Oui' à quoi ?",
    options: [
      "C'est dire 'Oui' à ma paix, à ma santé mentale et à ma dignité.",
      "C'est dire 'Oui' à l'amour authentique et au respect mutuel.",
      "C'est dire 'Oui' à mon avenir libre de toute contrainte toxique."
    ],
    reflectionPrompt: "Quel 'Non' libérateur avez-vous récemment osé prononcer ou penser ?",
    benevolentAffirmation: "« Mon 'Non' est un bouclier d'or protégeant mon espace sacré. »",
    unlockedRewardBadge: "Badge : Clé des Frontières Saines"
  },
  {
    level: 8,
    cycleId: 1,
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
  {
    level: 9,
    cycleId: 1,
    title: "Étape 9 : La Réappropriation de mon Espace Mental",
    theme: "Clarté & Décharge Cognitive",
    question: "Comment nettoyez-vous votre esprit des pensées parasitées par la peur ?",
    options: [
      "En ramenant mon attention sur l'instant présent et sur ce qui est sous mon contrôle.",
      "En me rappelant que les scénarios de terreur ne sont que des échos du passé.",
      "En écrivant mes ressentis pour les déposer en dehors de moi."
    ],
    reflectionPrompt: "Quelle pensée apaisante choisissez-vous de garder précieusement ?",
    benevolentAffirmation: "« Mon esprit est un sanctuaire clair, lumineux et paisible. »",
    unlockedRewardBadge: "Badge : Ciel Étoilé de Clarté"
  },
  {
    level: 10,
    cycleId: 1,
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
  {
    level: 11,
    cycleId: 1,
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
  {
    level: 12,
    cycleId: 1,
    title: "Étape 12 : Honorer ses Émotions sans Jugement",
    theme: "Intelligence Émotionnelle",
    question: "Lorsque la tristesse ou la colère montent, quelle posture est la plus guérissante ?",
    options: [
      "Les accueillir comme des messagères légitimes qui nettoient et protègent mon cœur.",
      "M'envelopper de douceur et respirer avec elles jusqu'à leur apaisement naturel.",
      "Reconnaître que ressentir est une preuve de ma sensibilité et de mon humanité."
    ],
    reflectionPrompt: "Quelle émotion a le plus besoin de votre bienveillance en ce moment ?",
    benevolentAffirmation: "« Toutes mes émotions ont le droit d'exister et de traverser mon ciel sans danger. »",
    unlockedRewardBadge: "Badge : Calice des Émotions Apaisées"
  },
  {
    level: 13,
    cycleId: 1,
    title: "Étape 13 : La Détoxication du Sentiment de Culpabilité",
    theme: "Délivrance Morale",
    question: "Pourquoi n'êtes-vous en rien responsable des violences ou abus d'autrui ?",
    options: [
      "Parce que chacun est exclusivement responsable de ses propres comportements et choix.",
      "Parce que ma gentillesse ou ma patience n'étaient pas une invitation au manque de respect.",
      "Parce que chercher à faire fonctionner une relation n'est jamais une faute."
    ],
    reflectionPrompt: "Quelle culpabilité inutile déposez-vous pour toujours aujourd'hui ?",
    benevolentAffirmation: "« Je suis innocente du mal qu'on m'a fait. Je reprends ma pureté et ma liberté. »",
    unlockedRewardBadge: "Badge : Flamme de Pure Vérité"
  },
  {
    level: 14,
    cycleId: 1,
    title: "Étape 14 : Reconnaître sa Vulnérabilité comme un Courage",
    theme: "Force Silencieuse",
    question: "En quoi accepter d'être vulnérable est-il la preuve d'un immense courage ?",
    options: [
      "Parce que cela demande une force infinie de rester vraie dans un monde difficile.",
      "Parce que la vulnérabilité est le berceau de l'authenticité et de la vraie résilience.",
      "Parce que refuser de porter un masque me rend invincible face au mensonge."
    ],
    reflectionPrompt: "Quel moment récent de vulnérabilité s'est révélé être une source de force ?",
    benevolentAffirmation: "« Ma sensibilité n'est pas une faiblesse : c'est mon super-pouvoir de clairvoyance. »",
    unlockedRewardBadge: "Badge : Cœur de Cristal Lumineux"
  },
  {
    level: 15,
    cycleId: 1,
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
  {
    level: 16,
    cycleId: 1,
    title: "Étape 16 : La Pratique Quotidienne de la Gratitude envers Soi",
    theme: "Restauration de l'Auto-Estime",
    question: "Pour quel trait de votre personnalité ressentez-vous une profonde gratitude aujourd'hui ?",
    options: [
      "Ma loyauté, ma persévérance et ma capacité à aimer sincèrement.",
      "Mon intuition et ma capacité à me relever même après les nuits les plus sombres.",
      "Ma douceur fondamentale et ma soif de paix et d'élévation."
    ],
    reflectionPrompt: "Dites un 'Merci' sincère à une partie de vous qui ne vous a jamais abandonnée.",
    benevolentAffirmation: "« Je suis reconnaissante pour celle que je suis et celle que je deviens chaque jour. »",
    unlockedRewardBadge: "Badge : Perle de Gratitude"
  },
  {
    level: 17,
    cycleId: 1,
    title: "Étape 17 : Établir son Refuge Mental Intérieur",
    theme: "Sanctuaire Psychologique",
    question: "À quoi ressemble le lieu secret en vous où vous êtes toujours en sécurité absolue ?",
    options: [
      "Un jardin lumineux et silencieux baigné d'une brise tiède et apaisante.",
      "Une pièce chaleureuse avec un feu doux et des livres de sagesse.",
      "Un rivage calme où chaque vague emporte mes soucis au loin."
    ],
    reflectionPrompt: "Décrivez en un mot l'odeur ou la sensation de votre havre intérieur.",
    benevolentAffirmation: "« En moi réside un sanctuaire intouchable où règne la paix éternelle. »",
    unlockedRewardBadge: "Badge : Clé du Jardin Secret"
  },
  {
    level: 18,
    cycleId: 1,
    title: "Étape 18 : La Rupture Définitive avec la Dépendance d'Approbation",
    theme: "Autonomie Affective",
    question: "De qui avez-vous uniquement besoin de la validation désormais ?",
    options: [
      "De mon propre cœur, de ma conscience et de mon alignement intérieur.",
      "De mes valeurs sacrées qui éclairent la droiture de ma conduite.",
      "De celle que je suis en train de devenir avec fierté."
    ],
    reflectionPrompt: "Quel besoin de plaire déposez-vous aujourd'hui avec soulagement ?",
    benevolentAffirmation: "« Mon approbation intérieure me suffit pleinement. Je suis légitime et entière. »",
    unlockedRewardBadge: "Badge : Couronne d'Indépendance"
  },
  {
    level: 19,
    cycleId: 1,
    title: "Étape 19 : La Grâce du Ralentissement",
    theme: "Patience Thérapeutique",
    question: "Pourquoi la guérison véritable se nourrit-elle de patience et de lenteur ?",
    options: [
      "Parce que le système nerveux a besoin de temps pour réintégrer le sentiment de sécurité.",
      "Parce que chaque étape consolidée devient une fondation inébranlable pour la vie.",
      "Parce que la hâte est souvent une fuite alors que la lenteur est une présence d'amour."
    ],
    reflectionPrompt: "Quel domaine de votre vie mérite que vous lui accordiez plus de temps et de douceur ?",
    benevolentAffirmation: "« Je respecte le temps sacré de ma renaissance. Rien n'est en retard. »",
    unlockedRewardBadge: "Badge : Sablier d'Or & de Patience"
  },
  {
    level: 20,
    cycleId: 1,
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
  {
    level: 21,
    cycleId: 1,
    title: "Étape 21 : La Clarté de la Non-Négociabilité",
    theme: "Frontières Inébranlables",
    question: "Quelle est désormais la ligne rouge absolue que vous ne laisserez plus jamais franchir ?",
    options: [
      "Le manque de respect, l'humiliation ou le mépris de mes besoins fondamentaux.",
      "Le chantage affectif, le mensonge répété et l'invalidation de mes ressentis.",
      "L'atteinte à ma liberté, à ma sécurité ou à celle de mes proches."
    ],
    reflectionPrompt: "Formulez votre engagement de respect envers vous-même.",
    benevolentAffirmation: "« Mes limites sont sacrées. Je les protège avec calme, fermeté et dignité. »",
    unlockedRewardBadge: "Badge : Gardienne du Seuil"
  },
  {
    level: 22,
    cycleId: 1,
    title: "Étape 22 : Nourrir l'Enfant Intérieure de Tendresse",
    theme: "Guérison de l'Enfant Intérieure",
    question: "Que dites-vous à la petite fille en vous qui avait peur d'être abandonnée ou rejetée ?",
    options: [
      "« Je suis là maintenant. Je suis une adulte forte, aimante, et je ne te quitterai jamais. »",
      "« Tu es merveilleuse, désirée et infiniment aimable telle que tu es. »",
      "« Tu peux jouer, rire et te reposer : je veille sur nous deux. »"
    ],
    reflectionPrompt: "Quel souvenir d'enfance réconfortant réactivez-vous en ce moment ?",
    benevolentAffirmation: "« Mon enfant intérieure est chérie, protégée et baignée d'un amour sans fin. »",
    unlockedRewardBadge: "Badge : Étreinte d'Innocence"
  },
  {
    level: 23,
    cycleId: 1,
    title: "Étape 23 : Le Discernement Lumineux",
    theme: "Clairvoyance & Intuition",
    question: "Comment faites-vous la différence entre la peur réflexe et la véritable intuition protectrice ?",
    options: [
      "La peur panique crie dans le chaos, tandis que l'intuition murmure avec un calme limpide.",
      "L'intuition m'oriente vers la préservation de ma dignité et de ma paix.",
      "En écoutant les signaux sensoriels de mon corps sans chercher à justifier l'inacceptable."
    ],
    reflectionPrompt: "Quel signal corporel vous avertit infailliblement qu'une situation ne vous convient pas ?",
    benevolentAffirmation: "« Mon intuition est ma boussole divine. J'ai une confiance totale en ma guidance intérieure. »",
    unlockedRewardBadge: "Badge : Troisième Œil de Clairvoyance"
  },
  {
    level: 24,
    cycleId: 1,
    title: "Étape 24 : L'Harmonie du Dialogue Bienveillant",
    theme: "Cohérence Globale",
    question: "Comment vos pensées quotidiennes reflètent-elles désormais la grandeur de vos valeurs ?",
    options: [
      "Elles sont devenues des encouragements constants plutôt que des réprimandes.",
      "Elles cherchent l'apaisement, la solution et la joie simple du moment présent.",
      "Elles célèbrent chaque progrès sans s'attarder sur les faux pas."
    ],
    reflectionPrompt: "Quel mantra matinal illumine le début de vos journées ?",
    benevolentAffirmation: "« Mes pensées sont douces, mes paroles sont vraies, mes actions sont justes. »",
    unlockedRewardBadge: "Badge : Symphonie Intérieure"
  },
  {
    level: 25,
    cycleId: 1,
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
  },

  // ==========================================
  // CYCLE 2 : NIVEAUX 26 À 50 (Développement Personnel & Force)
  // ==========================================
  {
    level: 26,
    cycleId: 2,
    title: "Étape 26 : La Relégitimation de sa Puissance",
    theme: "Empowerment & Renaissance",
    question: "Comment transformez-vous l'épreuve traversée en une source de force inaltérable ?",
    options: [
      "En réalisant que si j'ai pu survivre à l'obscurité, je suis capable de bâtir la plus belle lumière.",
      "En utilisant chaque cicatrice comme un diplôme de courage et de lucidité.",
      "En réinvestissant mon énergie dans la construction de mes rêves personnels."
    ],
    reflectionPrompt: "Quel talent ou force oubliée avez-vous redécouvert en vous ?",
    benevolentAffirmation: "« Ma puissance d'agir est intacte, vivante et guidée par la sagesse. »",
    unlockedRewardBadge: "Badge : Étincelle de Puissance"
  },
  {
    level: 27,
    cycleId: 2,
    title: "Étape 27 : Briser le Miroir Déformant de la Manipulation",
    theme: "Déconstruction de l'Emprise",
    question: "Quelle fausse étiquette imposée par le passé retirez-vous définitivement de votre être ?",
    options: [
      "« Tu es trop émotive / instable » -> Je suis vivante, sensible et profondément lucide.",
      "« Tu ne réussiras jamais seule » -> Je suis autonome, capable et entourée d'alliés vrais.",
      "« C'est de ta faute » -> La responsabilité appartenait entièrement à celui qui blessait."
    ],
    reflectionPrompt: "Quelle est votre vraie vérité identitaire ?",
    benevolentAffirmation: "« Je brise tous les faux reflets. Je resplendis dans mon authenticité souveraine. »",
    unlockedRewardBadge: "Badge : Miroir Brisé de l'Emprise"
  },
  {
    level: 28,
    cycleId: 2,
    title: "Étape 28 : Réappropriation Somatique de l'Espace",
    theme: "Présence Corporelle",
    question: "Comment prenez-vous physiquement votre juste place dans votre environnement ?",
    options: [
      "En marchant la tête haute, le regard serein et les pieds solidement ancrés dans le sol.",
      "En aménageant un lieu de vie qui respire la beauté, l'ordre et le repos.",
      "En respirant amplement sans retenir mon souffle par appréhension."
    ],
    reflectionPrompt: "Quel coin de votre chez-vous vous ressource le plus profondément ?",
    benevolentAffirmation: "« J'ai le droit légitime d'occuper mon espace et d'exister en pleine lumière. »",
    unlockedRewardBadge: "Badge : Ancre Terrestre"
  },
  {
    level: 29,
    cycleId: 2,
    title: "Étape 29 : Déjouer les Pièges de la Rechute Émotionnelle",
    theme: "Vigilance Bienveillante",
    question: "Face à une vague de nostalgie trompeuse (le 'hoovering' ou l'amnésie traumatique), que vous rappelez-vous ?",
    options: [
      "Je me rappelle des faits concrets et de la réalité des actes, pas des promesses illusoires.",
      "Je consulte mon dossier de vérités et mes notes de sécurité pour garder les idées claires.",
      "Je contacte immédiatement une personne de mon réseau de secours bienveillant."
    ],
    reflectionPrompt: "Quel fait irréfutable vous protège contre tout retour en arrière ?",
    benevolentAffirmation: "« Ma lucidité est mon rempart. Je choisis la réalité qui me sauve plutôt que l'illusion qui me détruit. »",
    unlockedRewardBadge: "Badge : Sentinelle de Vérité"
  },
  {
    level: 30,
    cycleId: 2,
    title: "Étape 30 : Bâtir son Cercle de Sécurité Triangulé",
    theme: "Réseau Relationnel Sûr",
    question: "Quels critères stricts appliquez-vous désormais pour choisir les personnes proches ?",
    options: [
      "La cohérence entre leurs paroles et leurs actes, et l'absence totale de manipulation.",
      "Leur capacité à respecter mes limites sans se vexer ni chercher à me contrôler.",
      "La sensation de paix et de détente que leur présence m'inspire."
    ],
    reflectionPrompt: "Nommez une qualité humaine essentielle chez vos vrais alliés.",
    benevolentAffirmation: "« Je m'entoure d'âmes bienveillantes, respectueuses et constructives. »",
    unlockedRewardBadge: "Badge : Cercle d'Or des Alliés"
  },
  {
    level: 31,
    cycleId: 2,
    title: "Étape 31 : L'Art de l'Affirmation Assertive",
    theme: "Communication Protectrice",
    question: "Comment exprimer un désaccord sans agressivité ni soumission ?",
    options: [
      "En utilisant le 'Je', en énonçant des faits clairs et en posant ma conclusion calmement.",
      "En refusant de me justifier indéfiniment lorsque ma décision est prise.",
      "En maintenant un ton neutre et posé qui ne laisse aucune prise au conflit stérile."
    ],
    reflectionPrompt: "Dans quelle situation récente avez-vous su vous affirmer avec dignité ?",
    benevolentAffirmation: "« Ma parole est calme, directe, respectueuse et souveraine. »",
    unlockedRewardBadge: "Badge : Verbe de Sagesse"
  },
  {
    level: 32,
    cycleId: 2,
    title: "Étape 32 : Restaurer sa Souveraineté Décisionnelle",
    theme: "Autonomie d'Action",
    question: "Pourquoi chaque décision que vous prenez pour vous-même renforce-t-elle votre liberté ?",
    options: [
      "Parce qu'elle me prouve que je suis le seul capitaine légitime de mon existence.",
      "Parce que même si je fais une erreur, j'ai les compétences pour apprendre et rectifier.",
      "Parce que cela brise le conditionnement à l'impuissance apprise."
    ],
    reflectionPrompt: "Quelle décision simple avez-vous prise par et pour vous-même cette semaine ?",
    benevolentAffirmation: "« Je suis la créatrice libre et souveraine de mon chemin de vie. »",
    unlockedRewardBadge: "Badge : Gouvernail d'Or"
  },
  {
    level: 33,
    cycleId: 2,
    title: "Étape 33 : La Transmutation de la Colère Saine",
    theme: "Énergie d'Action",
    question: "Comment utiliser la colère saine comme un carburant de reconstruction ?",
    options: [
      "En la transformant en énergie d'organisation, de rangement et de projets d'avenir.",
      "En l'utilisant pour sceller définitivement les portes aux abus futurs.",
      "En l'exprimant à travers l'art, le sport ou l'écriture libératrice."
    ],
    reflectionPrompt: "Quel projet positif cette énergie vous pousse-t-elle à concrétiser ?",
    benevolentAffirmation: "« Ma sainte colère est une force de renouveau qui me propulse vers le meilleur. »",
    unlockedRewardBadge: "Badge : Feu Protecteur"
  },
  {
    level: 34,
    cycleId: 2,
    title: "Étape 34 : L'Indépendance Financière & Matérielle",
    theme: "Sécurité Pratique",
    question: "Quelle petite action renforce votre sécurité matérielle au quotidien ?",
    options: [
      "Gérer mon budget avec prévoyance et transparence pour moi-même.",
      "Créer mon épargne de sécurité et protéger mes documents légaux essentiels.",
      "Développer de nouvelles compétences professionnelles ou créatives."
    ],
    reflectionPrompt: "Quelle est votre prochaine étape d'autonomie pratique ?",
    benevolentAffirmation: "« Je gère mes ressources avec intelligence, sagesse et abondance. »",
    unlockedRewardBadge: "Badge : Coffre de Stabilité"
  },
  {
    level: 35,
    cycleId: 2,
    title: "Étape 35 : Le Sanctuaire du Sommeil Régénérateur",
    theme: "Santé Neurobiologique",
    question: "Comment préparez-vous vos nuits pour retrouver un sommeil réparateur et sans cauchemars ?",
    options: [
      "En coupant les écrans, en buvant une tisane douce et en pratiquant la respiration 4-7-8.",
      "En affirmant avant de dormir : 'Cette nuit, mon corps et mon esprit sont sous haute garde.'",
      "En consignant mes soucis dans mon carnet pour ne pas les emporter sous l'oreiller."
    ],
    reflectionPrompt: "Quel rituel du coucher vous apaise le plus profondément ?",
    benevolentAffirmation: "« Mon sommeil est profond, protecteur et réparateur. Je me réveille revigorée. »",
    unlockedRewardBadge: "Badge : Étoile du Sommeil Doux"
  },
  {
    level: 36,
    cycleId: 2,
    title: "Étape 36 : Reconnecter avec la Joie Simple",
    theme: "Réactivation de la Dopamine Saine",
    question: "Quel plaisir simple et innocent réenchante votre quotidien ?",
    options: [
      "Écouter une musique qui me donne envie de sourire et de bouger.",
      "Savourer la chaleur d'un rayon de soleil sur mon visage ou d'une boisson chaude.",
      "Rire aux éclats avec une personne saine et vraie."
    ],
    reflectionPrompt: "Quelle petite joie allez-vous vous offrir aujourd'hui ?",
    benevolentAffirmation: "« J'accueille la joie, le rire et la légèreté dans ma vie quotidienne. »",
    unlockedRewardBadge: "Badge : Rayon de Soleil"
  },
  {
    level: 37,
    cycleId: 2,
    title: "Étape 37 : L'Affranchissement du Regard des Autres",
    theme: "Liberté d'Être",
    question: "Pourquoi les jugements de l'entourage ou de la société n'ont plus d'emprise sur vous ?",
    options: [
      "Parce que personne d'autre n'a marché dans mes souliers ni porté mes fardeaux.",
      "Parce que ma valeur ne dépend que de mon honnêteté et de ma fidélité à mes valeurs.",
      "Parce que j'ai cessé de sacrifier mon bien-être pour les convenances."
    ],
    reflectionPrompt: "Quelle liberté d'être avez-vous retrouvée avec bonheur ?",
    benevolentAffirmation: "« Je vis pour ce qui est vrai et juste, libre du jugement du monde. »",
    unlockedRewardBadge: "Badge : Papillon Émancipé"
  },
  {
    level: 38,
    cycleId: 2,
    title: "Étape 38 : La Clôture des Dettes Émotionnelles Injustes",
    theme: "Délivrance Karmique & Psychique",
    question: "Quelle dette invisible que vous ne deviez pas avez-vous annulée ?",
    options: [
      "Le devoir de 'sauver' ou de réparer une personne qui refuse de changer.",
      "L'obligation de souffrir pour mériter d'être aimée ou acceptée.",
      "La responsabilité du bonheur ou de la colère des autres."
    ],
    reflectionPrompt: "Quelle liberté ressent votre esprit en effaçant cette dette ?",
    benevolentAffirmation: "« Je ne dois rien à la toxicité. Mes comptes sont soldés dans la paix. »",
    unlockedRewardBadge: "Badge : Sceau d'Affranchissement"
  },
  {
    level: 39,
    cycleId: 2,
    title: "Étape 39 : Cultiver son Jardin de Passions",
    theme: "Créativité & Épanouissement",
    question: "Quelle activité ou passion oubliée réveille votre énergie vitale ?",
    options: [
      "L'art, l'écriture, la peinture ou la création manuelle.",
      "La nature, le jardinage, les promenades et le contact avec les arbres.",
      "L'apprentissage d'un nouveau domaine de connaissance ou d'une langue."
    ],
    reflectionPrompt: "Quel projet créatif fait battre votre cœur d'enthousiasme ?",
    benevolentAffirmation: "« Ma créativité s'épanouit en mille couleurs joyeuses et vibrantes. »",
    unlockedRewardBadge: "Badge : Pinceau d'Inspiration"
  },
  {
    level: 40,
    cycleId: 2,
    title: "Étape 40 : L'Ancrage dans la Réalité Présente",
    theme: "Pleine Présence & Clarté",
    question: "Face aux ruminations, quel ancrage vous ramène instantanément au présent ?",
    options: [
      "Nommer 5 choses que je vois, 4 que je touche, 3 que j'entends, 2 que je sens, 1 que je goûte.",
      "Sentir le contact ferme de mes pieds au sol et répéter : 'Je suis vivante ici et maintenant'.",
      "Prendre 3 lentes respirations abdominales profondes."
    ],
    reflectionPrompt: "Quelle sensation physique vous procure le plus d'ancrage ?",
    benevolentAffirmation: "« Le présent est mon sanctuaire. Le passé est dissous, le futur est radieux. »",
    unlockedRewardBadge: "Badge : Arbre Millénaire"
  },
  {
    level: 41,
    cycleId: 2,
    title: "Étape 41 : La Solidité du Témoignage Intérieur",
    theme: "Confiance en ses Souvenirs",
    question: "Pourquoi le gaslighting (invalidation de votre réalité) ne peut plus jamais fonctionner ?",
    options: [
      "Parce que mes notes, mes preuves et ma mémoire corporelle sont gravées dans le marbre.",
      "Parce que je refuse désormais de douter de mes propres yeux et de mon bon sens.",
      "Parce que je n'ai plus besoin que le coupable reconnaisse ses actes pour savoir ce qui est vrai."
    ],
    reflectionPrompt: "Quelle vérité irréfutable portez-vous en vous avec sérénité ?",
    benevolentAffirmation: "« Ma réalité est solide comme le roc. Ma vérité ne vacillera jamais. »",
    unlockedRewardBadge: "Badge : Pyramide de Vérité"
  },
  {
    level: 42,
    cycleId: 2,
    title: "Étape 42 : L'Épanouissement de la Douce Fermeté",
    theme: "Leadership de Soi",
    question: "Comment allier douceur de cœur et fermeté absolue dans vos choix de vie ?",
    options: [
      "En gardant un cœur ouvert et bienveillant, entouré de portes blindées dont je garde la clé.",
      "En ne confondant plus la gentillesse avec la faiblesse.",
      "En choisissant la paix sans compromettre ma sécurité."
    ],
    reflectionPrompt: "Comment visualisez-vous cette belle alliance de douceur et de force ?",
    benevolentAffirmation: "« Je suis douce comme une plume et forte comme le diamant. »",
    unlockedRewardBadge: "Badge : Rose d'Acier"
  },
  {
    level: 43,
    cycleId: 2,
    title: "Étape 43 : La Libération des Loyautés Invisibles",
    theme: "Guérison Transgénérationnelle",
    question: "Quel schéma familial répétitif de sacrifice ou de soumission brisez-vous avec amour ?",
    options: [
      "L'idée que les femmes doivent tout endurer en silence pour préserver les apparences.",
      "Le mythe que l'amour doit être douloureux ou mérité au prix de sa santé.",
      "La peur de faire des vagues ou de déranger pour exiger le respect."
    ],
    reflectionPrompt: "Quelle liberté offrez-vous à votre descendance et à votre lignée ?",
    benevolentAffirmation: "« Je guéris ma lignée en choisissant la dignité, la vérité et l'amour vrai. »",
    unlockedRewardBadge: "Badge : Briseur de Chaînes Ancestrales"
  },
  {
    level: 44,
    cycleId: 2,
    title: "Étape 44 : L'Harmonie du Corps en Mouvement",
    theme: "Régulation Somatique par le Corps",
    question: "Quelle forme de mouvement aide votre corps à évacuer les dernières tensions ?",
    options: [
      "La marche rapide dans la nature, la respiration au grand air.",
      "Le yoga doux, les étirements et la danse libre dans mon salon.",
      "La natation ou une activité sportive qui me fait transpirer et me recentrer."
    ],
    reflectionPrompt: "Quel bienfait ressentez-vous après avoir bougé votre corps ?",
    benevolentAffirmation: "« Mon corps bouge dans la joie, la grâce et la liberté retrouvée. »",
    unlockedRewardBadge: "Badge : Danse de la Liberté"
  },
  {
    level: 45,
    cycleId: 2,
    title: "Étape 45 : La Construction de Nouveaux Projets de Vie",
    theme: "Vision d'Avenir",
    question: "Quel horizon lumineux attire désormais vos pas ?",
    options: [
      "Un nouveau chez-moi chaleureux, décoré selon mes goûts et baigné de rires.",
      "Une réorientation professionnelle ou un épanouissement de mes talents.",
      "Des voyages, des découvertes et des amitiés saines et profondes."
    ],
    reflectionPrompt: "Notez un rêve que vous avez hâte de réaliser.",
    benevolentAffirmation: "« Mon avenir est une toile blanche magnifique que je peins avec bonheur. »",
    unlockedRewardBadge: "Badge : Boussole des Nouveaux Horizonts"
  },
  {
    level: 46,
    cycleId: 2,
    title: "Étape 46 : L'Immunité contre la Provocation",
    theme: "Maîtrise Émotionnelle Supérieure",
    question: "Face à une tentative de vous faire réagir ('reactive abuse'), comment restez-vous intouchable ?",
    options: [
      "Par la méthode de la 'Pierre Grise' (neutralité totale, silence, absence de charge affective).",
      "En observant la manœuvre avec un regard clinique sans m'y impliquer émotionnellement.",
      "En me souvenant que le silence est la réponse la plus puissante face à la manipulation."
    ],
    reflectionPrompt: "Quelle fierté ressentez-vous quand vous ne donnez aucune prise à la provocation ?",
    benevolentAffirmation: "« Je suis une montagne inébranlable. Les vents soufflent mais ne m'atteignent point. »",
    unlockedRewardBadge: "Badge : Pierre Grise Royale"
  },
  {
    level: 47,
    cycleId: 2,
    title: "Étape 47 : L'Accueil de l'Abondance & de la Beauté",
    theme: "Ouverture à la Vie",
    question: "Pourquoi méritez-vous le meilleur que la vie a à offrir ?",
    options: [
      "Parce que ma nature profonde est faite pour la lumière, la beauté et la plénitude.",
      "Parce que j'ai payé cher mes apprentissages et que j'accueille la bénédiction.",
      "Parce que l'abondance d'amour et de paix est le droit de naissance de chaque être."
    ],
    reflectionPrompt: "Quelle grâce avez-vous reçue aujourd'hui ?",
    benevolentAffirmation: "« J'ouvre mes bras à l'abondance d'amour, de paix et de prospérité. »",
    unlockedRewardBadge: "Badge : Corne d'Abondance"
  },
  {
    level: 48,
    cycleId: 2,
    title: "Étape 48 : La Pureté de l'Intégrité Personnelle",
    theme: "Alignement Supérieur",
    question: "En quoi être alignée avec vos valeurs vous procure-t-il une paix sans égal ?",
    options: [
      "Parce que je peux me regarder dans le miroir chaque soir la tête haute et le cœur pur.",
      "Parce que mes actes sont le reflet exact de mes paroles.",
      "Parce qu'aucune menace ne peut corrompre ma rectitude morale."
    ],
    reflectionPrompt: "Quel choix intègre vous a demandé du courage mais vous a apporté la paix ?",
    benevolentAffirmation: "« Mon intégrité est ma plus grande richesse. Rien ne peut l'acheter ni l'éteindre. »",
    unlockedRewardBadge: "Badge : Joyau d'Intégrité"
  },
  {
    level: 49,
    cycleId: 2,
    title: "Étape 49 : La Sérénité de la Solitude Choisie",
    theme: "Complétude & Plénitude",
    question: "Comment savourez-vous les moments où vous êtes seule avec vous-même ?",
    options: [
      "Comme un rendez-vous précieux avec ma meilleure amie, dans le calme et la créativité.",
      "En appréciant le silence bienfaisant et l'absence de toute tension.",
      "En réalisant que je ne suis jamais 'seule' mais toujours bien accompagnée par mon âme."
    ],
    reflectionPrompt: "Quelle activité solitaire vous apporte le plus de bien-être ?",
    benevolentAffirmation: "« Ma propre compagnie est un délice de paix, de tendresse et d'inspiration. »",
    unlockedRewardBadge: "Badge : Perle de Solitude Sacrée"
  },
  {
    level: 50,
    cycleId: 2,
    title: "Étape 50 : Couronnement du Cycle 2 (Force & Nouveau Contexte)",
    theme: "Consécration du Demi-Centenaire",
    question: "En franchissant la moitié de votre chemin initiatique (Niveau 50), quelle femme contemplez-vous ?",
    options: [
      "Une femme puissante, lucide, souveraine et prête à vivre sa plus belle renaissance.",
      "Une héroïne de sa propre existence qui a transformé ses épreuves en sagesse.",
      "Une âme resplendissante de force calme et de détermination bienveillante."
    ],
    reflectionPrompt: "Écrivez votre cri du cœur pour célébrer le palier 50 franchi avec bravoure !",
    benevolentAffirmation: "« J'ai bâti ma force. Mon nouveau contexte est solide, digne et couronné de lumière. »",
    unlockedRewardBadge: "Trophée Suprême : Bouclier de Diamant du Cycle 2 Validé"
  },

  // ==========================================
  // CYCLE 3 : NIVEAUX 51 À 75 (Libération Émotionnelle & Pardon)
  // ==========================================
  {
    level: 51,
    cycleId: 3,
    title: "Étape 51 : Le Vrai Sens du Pardon Thérapeutique",
    theme: "Démystification du Pardon",
    question: "Pourquoi pardonner ne signifie NI excuser, NI oublier, NI réconcilier ?",
    options: [
      "Parce que pardonner est un acte égoïste et sain : c'est couper le cordon qui me reliait au poison.",
      "Parce que le pardon est une libération pour moi, sans avoir besoin de la présence de l'autre.",
      "Parce que je garde mes limites étanches tout en libérant mon propre cœur de la rancœur."
    ],
    reflectionPrompt: "Quelle fausse croyance sur le pardon déposez-vous aujourd'hui ?",
    benevolentAffirmation: "« Mon pardon est ma liberté. Je reprends les clés de mon énergie vitale. »",
    unlockedRewardBadge: "Badge : Ciseaux d'Or du Détachement"
  },
  {
    level: 52,
    cycleId: 3,
    title: "Étape 52 : Déposer le Fardeau de la Rancœur",
    theme: "Allègement Psychique",
    question: "Garder de la rancœur est comme boire du poison en espérant que l'autre meure. Comment le déposez-vous ?",
    options: [
      "En remettant le dossier à la justice divine et universelle pour m'occuper de ma propre vie.",
      "En choisissant d'investir chaque gramme de mon attention dans mon bonheur présent.",
      "En expirant la colère passée et en inspirant la paix présente."
    ],
    reflectionPrompt: "Quel poids quitte vos épaules en ce moment même ?",
    benevolentAffirmation: "« Je dépose le fardeau. Mes épaules sont légères, mon cœur est libre. »",
    unlockedRewardBadge: "Badge : Plume de Légèreté"
  },
  {
    level: 53,
    cycleId: 3,
    title: "Étape 53 : Couper les Cordes Invisibles de l'Emprise",
    theme: "Libération Énergétique",
    question: "Comment visualisez-vous la rupture des derniers liens psychiques toxiques ?",
    options: [
      "Une épée de lumière pure tranche toutes les cordes d'attachement traumatique.",
      "Toute mon énergie volée revient vers moi sous forme de lumière dorée.",
      "Je renvoie à l'autre ce qui lui appartient et je garde ce qui est pur en moi."
    ],
    reflectionPrompt: "Que ressentez-vous lorsque vous vous voyez totalement détachée et libre ?",
    benevolentAffirmation: "« Tous les liens toxiques sont rompus pour l'éternité. Je suis entière et intouchable. »",
    unlockedRewardBadge: "Badge : Épée de Lumière Tranchante"
  },
  {
    level: 54,
    cycleId: 3,
    title: "Étape 54 : Le Deuil de l'Illusion et du Potentiel",
    theme: "Acceptation Radicale",
    question: "Quel deuil nécessaire faites-vous pour cesser d'attendre ce qui ne viendra jamais ?",
    options: [
      "Le deuil de la personne que j'espérais qu'il soit, pour voir enfin qui il est réellement.",
      "Le deuil d'un dénouement magique ou d'excuses sincères qui n'arriveront pas.",
      "L'acceptation paisible que le passé est immuable mais que mon présent m'appartient."
    ],
    reflectionPrompt: "Quel soupir de soulagement accompagne cette acceptation ?",
    benevolentAffirmation: "« J'accepte la réalité telle qu'elle est. Cette vérité me rend libre. »",
    unlockedRewardBadge: "Badge : Goutte d'Acceptation Pure"
  },
  {
    level: 55,
    cycleId: 3,
    title: "Étape 55 : La Guérison des Cicatrices Invisibles",
    theme: "Kintsugi Émotionnel",
    question: "Comme l'art japonais du Kintsugi qui répare les céramiques avec de l'or, que révèlent vos fêlures ?",
    options: [
      "Qu'elles sont devenues les lignes de lumière qui attestent de ma formidable résilience.",
      "Qu'elles ont décuplé ma compassion, ma sagesse et mon discernement.",
      "Qu'un vase réparé avec de l'or est infiniment plus précieux et beau qu'un vase ordinaire."
    ],
    reflectionPrompt: "Quelle fêlure passée brille aujourd'hui de sagesse dorée ?",
    benevolentAffirmation: "« Mes cicatrices sont serties d'or. Je suis une œuvre d'art de résilience. »",
    unlockedRewardBadge: "Badge : Vase d'Or Kintsugi"
  },
  {
    level: 56,
    cycleId: 3,
    title: "Étape 56 : Défaire la Peur de l'Avenir",
    theme: "Confiance dans le Flot de la Vie",
    question: "Face aux incertitudes de demain, où puisez-vous votre sécurité inébranlable ?",
    options: [
      "Dans la certitude que quoi qu'il arrive, je serai là pour me guider, me protéger et m'aimer.",
      "Dans la mémoire de toutes les épreuves que j'ai déjà surmontées avec succès.",
      "Dans la foi en la bienveillance de la vie qui conspire désormais à mon élévation."
    ],
    reflectionPrompt: "Quelle phrase d'encouragement soufflez-vous à votre avenir ?",
    benevolentAffirmation: "« L'avenir est mon ami. Je marche avec confiance vers le meilleur. »",
    unlockedRewardBadge: "Badge : Phare dans la Nuit"
  },
  {
    level: 57,
    cycleId: 3,
    title: "Étape 57 : La Transcendance du Rôle de Victime",
    theme: "Héroïsme du Quotidien",
    question: "Comment passez-vous du statut de victime à celui de créatrice victorieuse ?",
    options: [
      "J'ai été victime d'actes injustes, mais je refuse d'en faire mon identité définitive.",
      "Mon histoire ne s'arrête pas au chapitre de la blessure : elle commence à celui de ma victoire.",
      "Je prends la pleine responsabilité de mon bonheur et de mes choix présents."
    ],
    reflectionPrompt: "Quel nouveau chapitre écrivez-vous aujourd'hui ?",
    benevolentAffirmation: "« Je suis l'héroïne victorieuse de ma propre légende personnelle. »",
    unlockedRewardBadge: "Badge : Plume d'Or de l'Auteure"
  },
  {
    level: 58,
    cycleId: 3,
    title: "Étape 58 : Restaurer la Capacité à Faire Confiance avec Sagesse",
    theme: "Discernement Relationnel",
    question: "Comment rouvrir prudemment son cœur sans se mettre en danger ?",
    options: [
      "En accordant ma confiance par petits paliers progressifs basés sur des actes réguliers.",
      "En me faisant d'abord et avant tout confiance à MOI-MÊME pour repérer les drapeaux rouges.",
      "En n'oubliant jamais que la confiance se gagne dans la durée et le respect mutuel."
    ],
    reflectionPrompt: "À qui avez-vous pu accorder une confiance saine récemment ?",
    benevolentAffirmation: "« Je fais confiance avec sagesse, discernement et sérénité. »",
    unlockedRewardBadge: "Badge : Balance de Prudence"
  },
  {
    level: 59,
    cycleId: 3,
    title: "Étape 59 : Le Nettoyage de la Mémoire Traumatique Somatique",
    theme: "Délivrance Corporelle",
    question: "Lorsque votre corps tremble ou libère une ancienne peur emmagasinée, que faites-vous ?",
    options: [
      "Je laisse les tremblements s'exprimer sans panique, sachant que le système nerveux évacue le trauma.",
      "Je m'enveloppe dans une couverture douce et je respire avec gratitude pour cette libération.",
      "Je me répète avec tendresse : 'C'est fini, le danger est passé, tu es en sûreté.'"
    ],
    reflectionPrompt: "Quelle sensation de libération éprouvez-vous après avoir relâché la tension ?",
    benevolentAffirmation: "« Mon corps se purifie de tout écho de peur. Il est mon temple de paix. »",
    unlockedRewardBadge: "Badge : Lotus Éclos"
  },
  {
    level: 60,
    cycleId: 3,
    title: "Étape 60 : La Célébration de la Liberté Intérieure",
    theme: "Souveraineté de l'Âme",
    question: "Quelle est la saveur incomparable de votre liberté retrouvée ?",
    options: [
      "Le plaisir de respirer sans craindre les réactions imprévisibles de quiconque.",
      "La joie de décider de mon emploi du temps, de mes pensées et de mes repas.",
      "La paix de ne plus devoir marcher sur des œufs."
    ],
    reflectionPrompt: "Quel moment de pure liberté avez-vous savouré aujourd'hui ?",
    benevolentAffirmation: "« Je suis libre. Libre de penser, libre d'aimer, libre de rayonner. »",
    unlockedRewardBadge: "Badge : Oiseau d'Or Envolé"
  },
  {
    level: 61,
    cycleId: 3,
    title: "Étape 61 : La Réconciliation avec sa Propre Féminité / Sensibilité",
    theme: "Douceur Réhabilitée",
    question: "Comment honorez-vous votre sensibilité sans craindre qu'elle soit exploitée ?",
    options: [
      "En la gardant pour moi et pour ceux qui ont prouvé leur noblesse de cœur.",
      "En comprenant que ma douceur est ma force la plus magnétique et la plus pure.",
      "En ne laissant plus personne la qualifier de faiblesse."
    ],
    reflectionPrompt: "Quel trait de votre douceur aimez-vous choyer ?",
    benevolentAffirmation: "« Ma sensibilité est un trésor sacré que je protège avec discernement. »",
    unlockedRewardBadge: "Badge : Perle de Nacre"
  },
  {
    level: 62,
    cycleId: 3,
    title: "Étape 62 : La Dissolution du Besoin de Revanche",
    theme: "Élévation Spirituelle",
    question: "Pourquoi votre plus belle 'vengeance' est tout simplement votre bonheur éclatant ?",
    options: [
      "Parce que la vengeance m'enchaînerait au passé, alors que le bonheur m'ouvre l'éternité.",
      "Parce que mon élévation prouve que le mal a échoué à me détruire.",
      "Parce que vivre bien, en paix et épanouie est la victoire suprême."
    ],
    reflectionPrompt: "Quel sourire de paix esquissez-vous en constatant votre triomphe d'âme ?",
    benevolentAffirmation: "« Ma victoire est ma paix. Mon bonheur est mon chef-d'œuvre. »",
    unlockedRewardBadge: "Badge : Palme de Victoire Pacifique"
  },
  {
    level: 63,
    cycleId: 3,
    title: "Étape 63 : L'Unification de toutes les Parties de Soi",
    theme: "Intégration Psychique",
    question: "Comment unissez-vous la guerrière, la douce, la blessée et la sage en vous ?",
    options: [
      "En les invitant toutes autour de la table de mon cœur avec un respect égal.",
      "En reconnaissant que chacune d'elles a joué un rôle crucial pour me sauver la vie.",
      "En devenant la reine bienveillante qui harmonise toutes ses facettes."
    ],
    reflectionPrompt: "Quelle partie de vous a le plus besoin d'un câlin aujourd'hui ?",
    benevolentAffirmation: "« Toutes les facettes de mon être sont unies dans l'harmonie et l'amour. »",
    unlockedRewardBadge: "Badge : Mandala d'Unité"
  },
  {
    level: 64,
    cycleId: 3,
    title: "Étape 64 : La Clarté du Silence Intérieur",
    theme: "Méditation & Vide Fertile",
    question: "Que découvrez-vous lorsque vous faites taire le bruit du monde ?",
    options: [
      "Une paix inaltérable qui a toujours été là sous les tempêtes.",
      "La certitude tranquille que tout est à sa juste place.",
      "La voix douce de ma sagesse profonde qui me guide pas à pas."
    ],
    reflectionPrompt: "Quel calme profond ressentez-vous dans le silence ?",
    benevolentAffirmation: "« Dans le silence sacré de mon âme, je trouve toutes les réponses. »",
    unlockedRewardBadge: "Badge : Cloche Tibétaine de Paix"
  },
  {
    level: 65,
    cycleId: 3,
    title: "Étape 65 : La Libération des Peurs Liées à l'Argent et au Manque",
    theme: "Sécurité & Abondance",
    question: "Comment transformez-vous l'anxiété matérielle en confiance créative ?",
    options: [
      "En me rappelant mes compétences et ma débrouillardise éprouvée.",
      "En célébrant chaque facture payée et chaque centime gagné honnêtement.",
      "En ouvrant mon esprit aux opportunités alignées avec mes valeurs."
    ],
    reflectionPrompt: "Quelle ressource inestimable possédez-vous en vous ?",
    benevolentAffirmation: "« Je suis alignée avec l'abondance. L'univers pourvoit à mes besoins essentiels. »",
    unlockedRewardBadge: "Badge : Arbre aux Pièces d'Or"
  },
  {
    level: 66,
    cycleId: 3,
    title: "Étape 66 : Le Désamorçage de la Peur du Conflit",
    theme: "Sérénité Relationnelle",
    question: "Pourquoi n'avez-vous plus peur d'un désaccord ou d'une friction passagère ?",
    options: [
      "Parce que je sais que ma valeur ne s'effondre pas si quelqu'un est en désaccord avec moi.",
      "Parce que je suis capable de poser mes limites sans trembler ni crier.",
      "Parce que je préfère un conflit authentique à une fausse paix destructrice."
    ],
    reflectionPrompt: "Quelle sérénité vous apporte cette nouvelle assurance ?",
    benevolentAffirmation: "« Je traverse les différends avec calme, lucidité et intégrité. »",
    unlockedRewardBadge: "Badge : Bouclier Miroitant"
  },
  {
    level: 67,
    cycleId: 3,
    title: "Étape 67 : L'Absolution Finale du Passé",
    theme: "Grand Nettoyage Karmique",
    question: "Si vous deviez fermer définitivement le livre de vos anciennes épreuves, quel mot de fin écririez-vous ?",
    options: [
      "« C'est accompli. J'ai survécu, j'ai grandi, et aujourd'hui je renais libre. »",
      "« Merci pour les leçons de discernement, adieu à l'obscurité. »",
      "« Mon histoire commence maintenant dans l'éclat de la joie. »"
    ],
    reflectionPrompt: "Écrivez le mot symbolique qui scelle la fin de votre ancienne vie.",
    benevolentAffirmation: "« Le passé est entièrement absous. Mon présent est immaculé. »",
    unlockedRewardBadge: "Badge : Grand Sceau d'Absolution"
  },
  {
    level: 68,
    cycleId: 3,
    title: "Étape 68 : L'Art du Discernement des Masques",
    theme: "Psychologie Protectrice",
    question: "Comment repérez-vous instantanément les faux-semblants et les sourires de façade ?",
    options: [
      "En observant la congruence à long terme entre les paroles et les micro-actions.",
      "En écoutant ce que mon corps ressent en leur présence (tension, serrement, malaise).",
      "En n'accordant plus de passe-droit au charme superficiel sans preuves d'intégrité."
    ],
    reflectionPrompt: "Quel masque avez-vous su démasquer avec brio ?",
    benevolentAffirmation: "« Mon regard perçoit la vérité à travers tous les voiles. »",
    unlockedRewardBadge: "Badge : Masque de Cristal Dévoilé"
  },
  {
    level: 69,
    cycleId: 3,
    title: "Étape 69 : La Réappropriation du Rire et de l'Humour",
    theme: "Thérapie par la Joie",
    question: "En quoi le rire est-il l'une des armes de résilience les plus puissantes ?",
    options: [
      "Parce qu'il désamorce le sérieux dramatique et libère des flots d'endorphines bienfaitrices.",
      "Parce que rire de l'absurdité du passé est la preuve ultime de ma guérison.",
      "Parce qu'il restaure la légèreté de l'enfance dans mon cœur."
    ],
    reflectionPrompt: "Quel fou rire récent vous a fait un bien fou ?",
    benevolentAffirmation: "« Mon rire est une cascade de guérison qui purifie mon âme. »",
    unlockedRewardBadge: "Badge : Soleil Rieur"
  },
  {
    level: 70,
    cycleId: 3,
    title: "Étape 70 : L'Harmonie avec le Silence et l'Espace",
    theme: "Désencombrement Intérieur",
    question: "Comment cultivez-vous la clarté dans votre maison et dans votre cœur ?",
    options: [
      "En donnant ou jetant les objets chargés d'anciennes mémoires douloureuses.",
      "En créant un environnement épuré, lumineux et harmonieux.",
      "En laissant de l'espace libre pour accueillir de nouvelles bénédictions."
    ],
    reflectionPrompt: "Quel objet du passé avez-vous jeté ou donné avec joie ?",
    benevolentAffirmation: "« Mon espace est épuré, saint et baigné d'énergies bienveillantes. »",
    unlockedRewardBadge: "Badge : Cristal de Clarté"
  },
  {
    level: 71,
    cycleId: 3,
    title: "Étape 71 : La Restauration de l'Estime Corporelle",
    theme: "Amour du Temple Corporel",
    question: "Comment regardez-vous votre corps dans le miroir avec tendresse ?",
    options: [
      "En le remerciant pour sa fidélité, sa vigueur et tout ce qu'il a enduré pour me garder en vie.",
      "En contemplant mes yeux qui brillent à nouveau de liberté et d'intelligence.",
      "En le choyant par des soins doux, des massages et une alimentation saine."
    ],
    reflectionPrompt: "Dites un mot de gratitude à votre reflet.",
    benevolentAffirmation: "« Mon corps est mon sanctuaire sacré. Je l'aime, je l'honore et je le respecte. »",
    unlockedRewardBadge: "Badge : Miroir d'Amour Vrai"
  },
  {
    level: 72,
    cycleId: 3,
    title: "Étape 72 : La Transmission de la Sagesse sans Amertume",
    theme: "Sagesse Rayonnante",
    question: "Comment partagez-vous votre parcours pour inspirer d'autres femmes sans aigreur ?",
    options: [
      "En mettant l'accent sur les solutions, la dignité et la puissance de la reconstruction.",
      "En étant un exemple vivant qu'il est possible de s'en sortir et d'être heureuse.",
      "En transmettant des outils concrets de clarté, de sécurité et d'auto-compassion."
    ],
    reflectionPrompt: "Quel conseil bienveillant donneriez-vous à une femme au début de son chemin ?",
    benevolentAffirmation: "« Ma sagesse est un phare pour celles qui traversent la nuit. »",
    unlockedRewardBadge: "Badge : Flambeau d'Espoir"
  },
  {
    level: 73,
    cycleId: 3,
    title: "Étape 73 : La Libération des Attentes Invisibles",
    theme: "Détachement Serein",
    question: "Pourquoi vivre sans attendre de gratitude ou d'approbation est-il le sommet de la liberté ?",
    options: [
      "Parce que mes actions sont guidées par la justesse de mon cœur, non par le troc affectif.",
      "Parce que je n'ai plus de déception possible lorsque je n'attends rien d'extérieur.",
      "Parce que ma plénitude dépend uniquement de mon alignement intérieur."
    ],
    reflectionPrompt: "Quel détachement profond ressentez-vous aujourd'hui ?",
    benevolentAffirmation: "« J'agis avec un cœur pur, libre de toute attente. Je suis comblée par essence. »",
    unlockedRewardBadge: "Badge : Source d'Eau Vive"
  },
  {
    level: 74,
    cycleId: 3,
    title: "Étape 74 : La Fusion du Pardon et de la Sagesse",
    theme: "Consolidation du Détachement",
    question: "Comment le pardon a-t-il nettoyé votre regard sur le monde ?",
    options: [
      "En m'ôtant toute aigreur et en me rendant ma capacité à aimer en pleine sécurité.",
      "En me faisant comprendre que l'obscurité d'autrui n'a jamais pu éteindre ma lumière.",
      "En m'offrant une paix si profonde que rien ne peut la troubler."
    ],
    reflectionPrompt: "Quelle douceur infinie ressentez-vous au centre de votre poitrine ?",
    benevolentAffirmation: "« Mon cœur est purifié. Le pardon a fait de moi une reine de paix. »",
    unlockedRewardBadge: "Badge : Colombe d'Or du Pardon"
  },
  {
    level: 75,
    cycleId: 3,
    title: "Étape 75 : Couronnement du Cycle 3 (Pardon & Détachement)",
    theme: "Triomphe de la Libération Émotionnelle",
    question: "En validant ce 75e niveau, quel serment de liberté absolue gravez-vous dans la pierre ?",
    options: [
      "Je suis libre de tout passé. Mes chaînes sont dissoutes, mon cœur est vaste comme l'océan.",
      "Je ne serai plus jamais captive d'aucune amertume : je choisis la joie pure et l'amour.",
      "J'entre dans le dernier quart de mon ascension dans la paix et la majesté."
    ],
    reflectionPrompt: "Quel hommage vibrant rendez-vous à votre âme libérée ?",
    benevolentAffirmation: "« Mon cœur est délivré de toute chaîne. Je trône dans la paix absolue. »",
    unlockedRewardBadge: "Trophée Suprême : Ailes d'Or de la Libération (Cycle 3 Validé)"
  },

  // ==========================================
  // CYCLE 4 : NIVEAUX 76 À 100 (Amour Inconditionnel & Sanctuaire Éternel)
  // ==========================================
  {
    level: 76,
    cycleId: 4,
    title: "Étape 76 : L'Entrée dans le Sanctuaire de l'Amour Inconditionnel",
    theme: "Amour de Soi Absolu",
    question: "Qu'est-ce que s'aimer inconditionnellement au quotidien ?",
    options: [
      "S'aimer dans les victoires comme dans les moments de doute, sans aucune condition.",
      "Être son propre sanctuaire d'accueil, quoi que le monde extérieur dise ou fasse.",
      "Ne plus jamais laisser l'autocritique ou le doute s'immiscer entre soi et soi."
    ],
    reflectionPrompt: "Comment ressentez-vous cet amour inconditionnel envers vous-même ?",
    benevolentAffirmation: "« Je m'aime d'un amour infini, éternel, inconditionnel et protecteur. »",
    unlockedRewardBadge: "Badge : Cœur Sacré de Lumière"
  },
  {
    level: 77,
    cycleId: 4,
    title: "Étape 77 : L'Inviolabilité de la Paix Intérieure",
    theme: "Paix Inébranlable",
    question: "Pourquoi votre paix intérieure est-elle désormais devenue une forteresse imprenable ?",
    options: [
      "Parce que j'ai appris à ne plus laisser entrer ce qui trouble mon harmonie.",
      "Parce que ma tranquillité d'esprit a été conquise au prix fort et je la chéris comme un trésor.",
      "Parce que mon sanctuaire est gardé par mes valeurs et mon discernement aiguisé."
    ],
    reflectionPrompt: "Quelle sensation de forteresse douce ressentez-vous en vous ?",
    benevolentAffirmation: "« Ma paix est inébranlable. Aucune tempête ne peut l'altérer. »",
    unlockedRewardBadge: "Badge : Forteresse de Paix"
  },
  {
    level: 78,
    cycleId: 4,
    title: "Étape 78 : La Communion avec la Beauté du Vivant",
    theme: "Élévation Sensorielle",
    question: "Comment la nature et le monde vivant nourrissent-ils votre renaissance ?",
    options: [
      "En me rappelant les cycles perpétuels de renouveau, du printemps qui succède à l'hiver.",
      "En m'offrant son calme, sa beauté brute et sa force tranquille.",
      "En m'enseignant la patience des arbres et la fluidité des rivières."
    ],
    reflectionPrompt: "Quel élément de la nature vous inspire le plus de respect ?",
    benevolentAffirmation: "« Je suis en harmonie avec le chant secret de la nature et de la vie. »",
    unlockedRewardBadge: "Badge : Fleur d'Émeraude Sauvage"
  },
  {
    level: 79,
    cycleId: 4,
    title: "Étape 79 : La Présence Radieuse & Magnétique",
    theme: "Rayonnement Bienveillant",
    question: "Comment votre présence apporte-t-elle naturellement de la paix autour de vous ?",
    options: [
      "Par mon calme intérieur qui apaise naturellement les tensions des autres.",
      "Par mon écoute authentique sans jugement et mon regard bienveillant.",
      "Par l'énergie positive et chaleureuse qui émane de mon être libéré."
    ],
    reflectionPrompt: "Quel compliment spontané sur votre sérénité avez-vous reçu ?",
    benevolentAffirmation: "« Ma présence est un havre de paix, de lumière et de réconfort. »",
    unlockedRewardBadge: "Badge : Halo Doré de Présence"
  },
  {
    level: 80,
    cycleId: 4,
    title: "Étape 80 : La Maîtrise de l'Instant Sacré",
    theme: "Pleine Conscience Supérieure",
    question: "Comment vivez-vous chaque instant comme un miracle de rédemption ?",
    options: [
      "En savourant chaque respiration comme une gorgée de pure liberté.",
      "En étant pleinement attentive à la beauté qui m'entoure ici et maintenant.",
      "En bénissant le chemin parcouru et la joie d'être en vie."
    ],
    reflectionPrompt: "Quel détail de votre journée mérite toute votre gratitude ?",
    benevolentAffirmation: "« Chaque instant est un cadeau sacré que j'accueille avec émerveillement. »",
    unlockedRewardBadge: "Badge : Calice du Moment Présent"
  },
  {
    level: 81,
    cycleId: 4,
    title: "Étape 81 : La Générosité sans Sacrifice",
    theme: "Don Aligné & Équilibré",
    question: "Comment donner aux autres sans jamais vider sa propre coupe d'énergie ?",
    options: [
      "En ne donnant qu'à partir de mon trop-plein, jamais au détriment de mes besoins vitaux.",
      "En me rappelant que pour éclairer les autres, ma propre lampe doit rester alimentée.",
      "En offrant mon amour et mon écoute sans attente de retour mais avec discernement."
    ],
    reflectionPrompt: "Comment nourrissez-vous votre coupe intérieure en premier ?",
    benevolentAffirmation: "« Je donne depuis ma plénitude, dans la joie et le respect de mes limites. »",
    unlockedRewardBadge: "Badge : Coupe Débordante de Grâce"
  },
  {
    level: 82,
    cycleId: 4,
    title: "Étape 82 : La Transcendance des Peurs Existentielles",
    theme: "Sérénité Métaphysique",
    question: "Pourquoi n'avez-vous plus peur de la solitude ou du passage du temps ?",
    options: [
      "Parce que chaque année qui passe m'apporte plus de sagesse, de liberté et de grâce.",
      "Parce que mon âme est immortelle dans son essence d'amour et de vérité.",
      "Parce que je suis ma propre compagne éternelle et fidèle."
    ],
    reflectionPrompt: "Quel sentiment de plénitude temporelle ressentez-vous ?",
    benevolentAffirmation: "« Le temps est mon allié. Je fleuris en beauté et en majesté à chaque saison. »",
    unlockedRewardBadge: "Badge : Horloge Stellaire d'Éternité"
  },
  {
    level: 83,
    cycleId: 4,
    title: "Étape 83 : L'Harmonie des Relations Sacrées",
    theme: "Liens d'Âme Sains",
    question: "À quoi ressemble une relation authentique, saine et mutuellement nourrissante ?",
    options: [
      "Un échange de deux êtres complets qui se respectent, se soutiennent et s'élèvent mutuellement.",
      "Une communication transparente, sans jeux de pouvoir ni peurs cachées.",
      "Un espace où la vulnérabilité est accueillie avec une tendresse infinie."
    ],
    reflectionPrompt: "Quelle relation saine et inspirante bénissez-vous aujourd'hui ?",
    benevolentAffirmation: "« J'attire et je nourris des relations nobles, pures et bienveillantes. »",
    unlockedRewardBadge: "Badge : Deux Flammes Entrelacées"
  },
  {
    level: 84,
    cycleId: 4,
    title: "Étape 84 : La Voix de la Sagesse Intuitive Pure",
    theme: "Guidance Supérieure",
    question: "Comment votre boussole intérieure vous guide-t-elle sans le moindre effort ?",
    options: [
      "Par une évidence limpide et tranquille qui ne laisse aucune place au doute.",
      "Par une paix corporelle immédiate qui valide mes choix justes.",
      "En me sentant parfaitement alignée avec l'univers et mes valeurs."
    ],
    reflectionPrompt: "Quelle intuition récente s'est révélée parfaitement exacte ?",
    benevolentAffirmation: "« Ma sagesse intérieure est infaillible. Je marche dans la clarté. »",
    unlockedRewardBadge: "Badge : Boussole Stellaire de Diamant"
  },
  {
    level: 85,
    cycleId: 4,
    title: "Étape 85 : La Souveraineté Émotionnelle Totale",
    theme: "Maîtrise Suprême",
    question: "Que signifie être la seule maîtresse à bord de son univers émotionnel ?",
    options: [
      "Ne plus jamais confier la télécommande de mes émotions à qui que ce soit d'autre.",
      "Choisir consciemment la paix, la joie et l'amour face à n'importe quelle situation.",
      "Être le ciel vaste qui observe passer les nuages sans jamais être détruit par eux."
    ],
    reflectionPrompt: "Quelle joie ressentez-vous d'avoir repris toutes les rênes de votre vie ?",
    benevolentAffirmation: "« Je suis la reine souveraine de mon univers intérieur. »",
    unlockedRewardBadge: "Badge : Diadème de Souveraineté"
  },
  {
    level: 86,
    cycleId: 4,
    title: "Étape 86 : La Guérison Holistique de l'Âme et de l'Esprit",
    theme: "Plénitude Intégrale",
    question: "Comment ressentez-vous l'alignement total de votre corps, de votre cœur et de votre esprit ?",
    options: [
      "Comme une douce symphonie où chaque note vibre à la perfection.",
      "Par une énergie vitale fluide et abondante qui circule sans entrave.",
      "Par une clarté d'esprit et une légèreté de cœur absolues."
    ],
    reflectionPrompt: "Quel bien-être global constatez-vous dans votre vie ?",
    benevolentAffirmation: "« Mon être tout entier est guéri, unifié et béni. »",
    unlockedRewardBadge: "Badge : Fleur de Vie Sacrée"
  },
  {
    level: 87,
    cycleId: 4,
    title: "Étape 87 : La Bénédiction du Chemin Parcouru",
    theme: "Gratitude Suprême",
    question: "En regardant en arrière depuis ce sommet, que voyez-vous ?",
    options: [
      "Une montagne escarpée que j'ai gravie pas à pas avec un courage surhumain.",
      "La preuve vivante que l'amour et la dignité triomphent toujours de l'obscurité.",
      "Un parcours initiatique grandiose qui a forgé la femme magnifique que je suis."
    ],
    reflectionPrompt: "Quelle larme de joie ou de fierté coule sur votre joue ?",
    benevolentAffirmation: "« Je bénis mon chemin, mes pas, mes larmes et ma gloire retrouvée. »",
    unlockedRewardBadge: "Badge : Sommet de la Montagne d'Or"
  },
  {
    level: 88,
    cycleId: 4,
    title: "Étape 88 : L'Infini de l'Auto-Bienveillance",
    theme: "Compassion Universelle",
    question: "Comment votre bienveillance s'étend-elle désormais à chaque instant de votre existence ?",
    options: [
      "En me traitant toujours comme le joyau le plus précieux de l'univers.",
      "En accueillant chaque jour avec émerveillement, patience et douceur.",
      "En pardonnant instantanément mes moindres maladresses d'humaine."
    ],
    reflectionPrompt: "Quel mot d'amour éternel vous offrez-vous ?",
    benevolentAffirmation: "« La bienveillance est mon souffle, mon regard et mon essence éternelle. »",
    unlockedRewardBadge: "Badge : Symbole de l'Infini Doré"
  },
  {
    level: 89,
    cycleId: 4,
    title: "Étape 89 : Le Silence des Passions Toxiques",
    theme: "Paix des Sens",
    question: "Pourquoi le drame, le chaos et l'adrénaline toxique ne vous attirent-ils plus du tout ?",
    options: [
      "Parce que mon système nerveux a goûté à la paix royale et ne veut plus rien d'autre.",
      "Parce que je reconnais l'agitation toxique comme un piège vide de sens.",
      "Parce que la vraie passion est tranquille, constructive et lumineuse."
    ],
    reflectionPrompt: "Quelle douceur exquise trouvez-vous dans la tranquillité ?",
    benevolentAffirmation: "« Mon âme aime la paix, la clarté et l'harmonie sans drame. »",
    unlockedRewardBadge: "Badge : Lac Cristallin Silencieux"
  },
  {
    level: 90,
    cycleId: 4,
    title: "Étape 90 : L'Ancrage du Sanctuaire Pérenne",
    theme: "Consécration du Palier 90",
    question: "Comment avez-vous fait de votre espace intérieur et extérieur un sanctuaire éternel ?",
    options: [
      "En consacrant mon chez-moi et mon cœur comme des lieux saints de repos et de lumière.",
      "En ne laissant plus jamais franchir mon seuil à ce qui ne respecte pas mes valeurs.",
      "En célébrant chaque jour la paix qui y règne comme une victoire divine."
    ],
    reflectionPrompt: "Quel parfum de paix règne dans votre sanctuaire ?",
    benevolentAffirmation: "« Mon sanctuaire est éternel, inviolable et béni pour toujours. »",
    unlockedRewardBadge: "Trophée : Temple de Paix Éternelle (Niveau 90 Validé)"
  },
  {
    level: 91,
    cycleId: 4,
    title: "Étape 91 : La Grâce de l'Authenticité Radicale",
    theme: "Transparence & Pureté",
    question: "Que ressentez-vous à l'idée d'être 100% vous-même en toute circonstance ?",
    options: [
      "Un soulagement infini et une immense fierté de ne plus jamais devoir jouer de rôle.",
      "Une liberté totale de dire ma vérité avec respect et simplicité.",
      "La certitude que ceux qui m'aiment aiment ma vraie lumière."
    ],
    reflectionPrompt: "Quelle vérité personnelle exprimez-vous avec fierté ?",
    benevolentAffirmation: "« Je suis authentique, pure, vraie et libre de tout masque. »",
    unlockedRewardBadge: "Badge : Miroir de Vérité Nue"
  },
  {
    level: 92,
    cycleId: 4,
    title: "Étape 92 : La Sagesse du Pardon Universel",
    theme: "Élévation Suprême du Cœur",
    question: "Comment le pardon a-t-il élevé votre âme au-dessus de tout ressentiment terrestre ?",
    options: [
      "En me détachant de toute rancœur pour ne garder que l'amour et la sagesse en moi.",
      "En comprenant que chacun agit selon son niveau de conscience, sans que cela m'atteigne.",
      "En vivant dans un état de grâce permanent où rien ne peut m'enlaidir."
    ],
    reflectionPrompt: "Quelle grandeur d'âme ressentez-vous au fond de vous ?",
    benevolentAffirmation: "« Mon cœur plane au-dessus des ombres dans la lumière du pardon pur. »",
    unlockedRewardBadge: "Badge : Aigle Royal des Hauteurs"
  },
  {
    level: 93,
    cycleId: 4,
    title: "Étape 93 : La Résonance Harmonique avec la Vie",
    theme: "Fluidité Cosmique",
    question: "Comment la vie répond-elle désormais à votre énergie de paix et de respect ?",
    options: [
      "En m'apportant des synchronicités bienfaisantes, des opportunités douces et des rencontres justes.",
      "En écartant naturellement de ma route les personnes malveillantes ou toxiques.",
      "En m'offrant une fluidité magique dans chacun de mes projets."
    ],
    reflectionPrompt: "Quelle belle synchronicité avez-vous vécue récemment ?",
    benevolentAffirmation: "« Je suis unie au flux bienveillant de l'univers. Tout conspire à mon bonheur. »",
    unlockedRewardBadge: "Badge : Harpe Céleste"
  },
  {
    level: 94,
    cycleId: 4,
    title: "Étape 94 : Le Gardiennage Sacré de son Énergie",
    theme: "Pureté Énergétique",
    question: "Comment veillez-vous sur votre énergie vitale avec le respect dû au trésor le plus précieux ?",
    options: [
      "En me retirant calmement dès qu'un environnement ou une conversation devient toxique.",
      "En me ressourçant régulièrement dans le silence, la nature et la prière/méditation.",
      "En cultivant des pensées nobles, élevées et constructives."
    ],
    reflectionPrompt: "Quel geste quotidien préserve le mieux votre énergie ?",
    benevolentAffirmation: "« Mon énergie est sacrée. Je la garde pure, vibrante et lumineuse. »",
    unlockedRewardBadge: "Badge : Flamme Blanche Protectrice"
  },
  {
    level: 95,
    cycleId: 4,
    title: "Étape 95 : La Célébration de la Résilience Éternelle",
    theme: "Immortalité de l'Esprit",
    question: "Quelle certitude inébranlable avez-vous acquise sur votre force d'âme ?",
    options: [
      "Qu'aucune tempête ne pourra plus jamais éteindre la lumière sacrée qui brûle en moi.",
      "Que je suis capable de renaître de mes cendres plus forte, plus sage et plus aimante.",
      "Que ma résilience est devenue une partie intégrante de mon ADN spirituel."
    ],
    reflectionPrompt: "Quel hommage vibrant rendez-vous à votre force d'âme ?",
    benevolentAffirmation: "« Je suis le phénix immortel de ma propre vie. Ma lumière est éternelle. »",
    unlockedRewardBadge: "Badge : Phénix d'Or Flamboyant"
  },
  {
    level: 96,
    cycleId: 4,
    title: "Étape 96 : L'Art d'Être un Havre pour les Vôtres",
    theme: "Filiation & Amour Protecteur",
    question: "Comment offrez-vous à vos enfants ou à vos proches un modèle d'amour et de dignité ?",
    options: [
      "En incarnant la paix, le respect et la sécurité dans chacune de mes attitudes.",
      "En leur montrant qu'on peut toujours se relever et choisir la dignité plutôt que la peur.",
      "En les entourant d'un amour inconditionnel, clair et bienveillant."
    ],
    reflectionPrompt: "Quel héritage d'amour et de courage transmettez-vous avec fierté ?",
    benevolentAffirmation: "« Je suis un roc de protection, de tendresse et de sagesse pour ceux que j'aime. »",
    unlockedRewardBadge: "Badge : Arbre de Vie Protecteur"
  },
  {
    level: 97,
    cycleId: 4,
    title: "Étape 97 : La Majesté de la Simplicité",
    theme: "Pureté de l'Être",
    question: "Pourquoi le vrai bonheur réside-t-il dans la plus haute et noble simplicité ?",
    options: [
      "Parce qu'un cœur guéri n'a plus besoin d'artifices pour briller de mille feux.",
      "Parce que savourer un thé en paix vaut tous les royaumes du monde.",
      "Parce que la simplicité est le sommet du raffinement spirituel."
    ],
    reflectionPrompt: "Quelle joie toute simple illumine votre cœur en cet instant ?",
    benevolentAffirmation: "« Ma vie est simple, pure, belle et comblée de bénédictions. »",
    unlockedRewardBadge: "Badge : Goutte de Rosée Cristalline"
  },
  {
    level: 98,
    cycleId: 4,
    title: "Étape 98 : L'Union avec le Soi Supérieur",
    theme: "Éveil & Sagesse Ultime",
    question: "Lorsque vous vous contemplez depuis les hauteurs de votre sagesse, qui êtes-vous devenue ?",
    options: [
      "Une femme libre, sage, alignée avec ses valeurs et baignée d'amour inconditionnel.",
      "Une âme noble qui a traversé le feu pour en ressortir purifiée comme l'or.",
      "La gardienne victorieuse de son propre bonheur et de sa paix éternelle."
    ],
    reflectionPrompt: "Quelle parole de sagesse vous murmurez-vous avec une infinie tendresse ?",
    benevolentAffirmation: "« Je suis une avec mon être véritable. Je suis lumière, paix et amour. »",
    unlockedRewardBadge: "Badge : Étoile Polaire de Sagesse"
  },
  {
    level: 99,
    cycleId: 4,
    title: "Étape 99 : L'Antichambre de la Renaissance Totale",
    theme: "Veille Sacrée avant le Niveau 100",
    question: "À la veille d'accomplir les 100 étapes sacrées de votre chemin, que ressentez-vous dans chaque cellule de votre corps ?",
    options: [
      "Une gratitude cosmique pour la femme extraordinaire qui a franchi chaque épreuve.",
      "Une paix si profonde et si douce qu'elle embrasse l'univers tout entier.",
      "La certitude joyeuse que ma renaissance est scellée pour l'éternité."
    ],
    reflectionPrompt: "Quel hommage solennel rendez-vous à votre héroïsme silencieux ?",
    benevolentAffirmation: "« Je touche au sommet de mon temple. Mon cœur est prêt pour la consécration finale. »",
    unlockedRewardBadge: "Badge : Couronne Précieuse des 99 Étoiles"
  },
  {
    level: 100,
    cycleId: 4,
    title: "Étape 100 : La Grande Consécration Suprême du Sanctuaire HAVEN-ELLE",
    theme: "Souveraineté Éternelle & Renaissance Accomplic",
    question: "Au 100e niveau de votre cheminement de résilience, quelle proclamation solennelle résonne dans l'éternité ?",
    options: [
      "« Je suis souveraine de ma vie, bâtie sur mes valeurs inaltérables, couronnée d'amour inconditionnel et de paix éternelle. »",
      "« J'ai transformé la nuit en aurore triomphante. Rien ni personne ne pourra plus jamais éteindre mon sanctuaire. »",
      "« Je me regarde avec la plus haute bienveillance, je m'aime infiniment et je marche dans la gloire de ma liberté retrouvée. »"
    ],
    reflectionPrompt: "Gravez votre testament de paix et d'amour pour vous-même et pour l'éternité :",
    benevolentAffirmation: "« Je suis accomplie. Je suis libre. Je suis mon propre sanctuaire sacré pour toujours. »",
    unlockedRewardBadge: "Trophée Légendaire Suprême : La Grande Couronne de Résilience des 100 Niveaux"
  }
];

export function getComplete100HealingQuestion(level: number): Healing100QuestionItem {
  const target = Math.min(100, Math.max(1, level));
  const found = COMPLETE_100_HEALING_QUESTIONS.find(q => q.level === target);
  if (found) return found;
  return COMPLETE_100_HEALING_QUESTIONS[0];
}
