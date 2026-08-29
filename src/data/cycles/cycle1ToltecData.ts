import { Healing100QuestionItem } from '../resilience100QuestionsData';

// ============================================================================
// CYCLE 1 : NIVEAUX 1 À 25 (Les 5 Accords Toltèques, Valeurs & Immunité Relationnelle)
// Répartition aléatoire équilibrée des options correctes (A, B, C)
// ============================================================================
export const CYCLE_1_QUESTIONS: Healing100QuestionItem[] = [
  // --- ACCORD 1 : QUE TA PAROLE SOIT IMPECCABLE (Niv 1 - 5) ---
  {
    level: 1,
    cycleId: 1,
    title: "Étape 1 : Le Verbe Aimant envers Soi-Même",
    theme: "Accord 1 • Dialogue Intérieur Aimant",
    question: "Face aux doutes et à la vulnérabilité, comment choisissez-vous désormais de vous parler intérieurement ?",
    options: [
      "En m'adressant avec la tendresse inconditionnelle et le respect sacré que j'offrirais à ma plus chère amie.",
      "En me critiquant durement pour me forcer à réagir plus vite.",
      "En ignorant mes émotions pour faire semblant que tout va bien."
    ],
    correctOptionIndex: 0, // A
    explanation: "La parole impeccable commence par le dialogue intime : remplacer l'autocritique réflexe par la tendresse désactive l'amygdale et libère de l'ocytocine.",
    reflectionPrompt: "Quel mot doux et réconfortant dites-vous à votre cœur en cet instant ?",
    benevolentAffirmation: "« Ma parole envers moi-même est un baume sacré de tendresse et de respect inconditionnel. »",
    unlockedRewardBadge: "Badge : Clé de la Parole Aimante"
  },
  {
    level: 2,
    cycleId: 1,
    title: "Étape 2 : Transmutation de la Parole Négative d'Autrui",
    theme: "Accord 1 • Alchimie Verbale & Rejet du Venin",
    question: "Lorsqu'une critique blessante ou dévalorisante d'autrui tente de vous atteindre, comment réagissez-vous de manière souveraine ?",
    options: [
      "Je rumine cette critique pendant des jours en me demandant comment lui faire plaisir.",
      "Je reconnais que cette parole toxique appartient à l'autre et je la transmute en affirmation de ma vraie valeur.",
      "Je contre-attaque violemment avec les mêmes insultes."
    ],
    correctOptionIndex: 1, // B
    explanation: "Transmuter la parole d'ombre d'autrui permet de ne pas avaler son poison tout en restant ancrée dans sa propre droiture.",
    reflectionPrompt: "Quelle parole négative passée choisissez-vous de transmuter aujourd'hui en vérité lumineuse ?",
    benevolentAffirmation: "« Je transforme chaque mot d'ombre en un serment éclatant de souveraineté et d'amour-propre. »",
    unlockedRewardBadge: "Badge : Alchimie de la Transmutation Verbale"
  },
  {
    level: 3,
    cycleId: 1,
    title: "Étape 3 : Cesser d'Utiliser la Parole Contre Soi-Même",
    theme: "Accord 1 • Absolution & Non-Jugement",
    question: "Après avoir traversé des épreuves d'emprise, comment renoncez-vous à vous qualifier de « naïve » ou « coupable » ?",
    options: [
      "En me rappelant chaque jour mes erreurs pour ne plus jamais faire confiance à quiconque.",
      "En reportant la faute sur le destin sans tirer de leçons d'apprentissage.",
      "En comprenant qu'avoir fait confiance était la noblesse de mon cœur, et que j'ai agi avec les ressources dont je disposais alors."
    ],
    correctOptionIndex: 2, // C
    explanation: "Faire confiance n'est jamais une faute. S'absoudre avec compassion restaure l'estime de soi fondamentale.",
    reflectionPrompt: "Quel jugement injuste envers vous-même déposez-vous pour toujours aujourd'hui ?",
    benevolentAffirmation: "« Je ne permets plus jamais à mes mots de me blesser. Je suis mon alliée la plus loyale. »",
    unlockedRewardBadge: "Badge : Bouclier de Pureté Intérieure"
  },
  {
    level: 4,
    cycleId: 1,
    title: "Étape 4 : Exprimer sa Vérité & ses Limites avec Clarté",
    theme: "Accord 1 • La Parole d'Affirmation et de Frontières",
    question: "Comment manier une parole juste et calme pour poser vos limites indispensables sans agressivité ?",
    options: [
      "En formulant un 'Non' limpide et serein face à ce qui blesse ma paix ou ma dignité, sans justification excessive.",
      "En me taisant pour éviter le conflit et en espérant que l'autre comprenne seul.",
      "En criant pour imposer mon autorité par la force."
    ],
    correctOptionIndex: 0, // A
    explanation: "Un 'Non' calme et sans justification superflue pose une frontière protectrice inviolable.",
    reflectionPrompt: "Quelle limite protectrice avez-vous le courage de verbaliser avec clarté aujourd'hui ?",
    benevolentAffirmation: "« Ma voix est claire, calme et souveraine. J'exprime ma vérité avec dignité et douceur. »",
    unlockedRewardBadge: "Badge : Sceau de la Parole d'Or"
  },
  {
    level: 5,
    cycleId: 1,
    title: "Étape 5 : Le Pouvoir Créateur des Déclarations Positives",
    theme: "Accord 1 • Reprogrammation Bienveillante de l'Esprit",
    question: "De quelle manière utilisez-vous la parole pour reprogrammer positivement votre esprit et façonner votre avenir ?",
    options: [
      "En attendant que les circonstances extérieures changent d'elles-mêmes.",
      "En répétant chaque matin des affirmations de sécurité, de dignité et de joie qui nourrissent mon système nerveux.",
      "En ressassant les paroles du passé pour vérifier si j'ai bien guéri."
    ],
    correctOptionIndex: 1, // B
    explanation: "L'auto-affirmation positive répétée active la neuroplasticité et renforce l'axe préfrontal de régulation émotionnelle.",
    reflectionPrompt: "Quelle déclaration de triomphe et d'espérance choisissez-vous pour bénir votre journée ?",
    benevolentAffirmation: "« Par mes paroles conscientes et lumineuses, je bâtis un espace inviolable de paix, de renouveau et de souveraineté personnelle. »",
    unlockedRewardBadge: "Trophée : Maîtrise de la Parole Impeccable (Accord 1 Validé)"
  },

  // --- ACCORD 2 : NE RIEN PRENDRE PERSONNELLEMENT (Niv 6 - 10) ---
  {
    level: 6,
    cycleId: 1,
    title: "Étape 6 : Le Miroir Projectif d'Autrui",
    theme: "Accord 2 • Décodage des Projections & Venin d'Autrui",
    question: "Face à une personne agressive ou méprisante, pourquoi ses attaques ne parlent-elles que de son propre désordre intérieur ?",
    options: [
      "Parce que j'ai certainement provoqué sa colère sans m'en rendre compte.",
      "Parce que le monde est méchant et qu'il faut se méfier de tout le monde.",
      "Parce que chacun ne projette que ses propres blessures, frustrations et croyances toxiques sur le monde."
    ],
    correctOptionIndex: 2, // C
    explanation: "Ce que les autres projettent est 100% le reflet de leur structure psychique interne. Rien ne définit votre vraie valeur.",
    reflectionPrompt: "Quelle attaque passée réalisez-vous aujourd'hui qu'elle n'appartenait qu'au désordre de son auteur ?",
    benevolentAffirmation: "« Je ne suis pas le réceptacle des blessures d'autrui. Les projections des autres leur appartiennent. »",
    unlockedRewardBadge: "Badge : Miroir Déviateur de Projections"
  },
  {
    level: 7,
    cycleId: 1,
    title: "Étape 7 : Le Bouclier contre la Culpabilisation Toxique",
    theme: "Accord 2 • Immunité Émotionnelle & Non-Absorption",
    question: "Comment ériger une barrière infranchissable lorsque quelqu'un tente de vous faire porter la responsabilité de ses fautes ?",
    options: [
      "En me répétant calmement : 'Cette culpabilité ne m'appartient pas, je la laisse à son propriétaire légitime'.",
      "En m'excusant immédiatement pour ramener le calme au détriment de ma vérité.",
      "En argumentant pendant des heures pour prouver mon innocence."
    ],
    correctOptionIndex: 0, // A
    explanation: "Refuser d'avaler la culpabilité inversée désamorce le mécanisme d'emprise et conserve votre énergie vitale intacte.",
    reflectionPrompt: "Quelle culpabilité injuste rejetée vous procure un soulagement immédiat dans le corps ?",
    benevolentAffirmation: "« Je suis imperméable aux tentatives de culpabilisation. Ma conscience est pure et intègre. »",
    unlockedRewardBadge: "Badge : Bouclier d'Immunité Émotionnelle"
  },
  {
    level: 8,
    cycleId: 1,
    title: "Étape 8 : Équanimité face au Blâme comme à la Fausse Flatterie",
    theme: "Accord 2 • Équanimité & Ancrage dans sa Vérité",
    question: "Pourquoi est-il tout aussi vital de ne pas prendre personnellement les flatteries excessives que les reproches injustes ?",
    options: [
      "Parce qu'il ne faut jamais accepter aucun compliment de personne.",
      "Parce que faire dépendre mon estime de l'opinion d'autrui me rendrait vulnérable à la dépendance et à la séduction manipulatrice.",
      "Parce que la flatterie est toujours un signe d'agression physique."
    ],
    correctOptionIndex: 1, // B
    explanation: "L'estime de soi souveraine s'ancre dans ses propres valeurs stables et ne dépend ni du blâme ni de la flatterie intéressée.",
    reflectionPrompt: "Sur quelle certitude intérieure inébranlable repose votre valeur sacrée aujourd'hui ?",
    benevolentAffirmation: "« Ni les insultes ne me diminuent, ni les louanges intéressées ne me définissent : je connais ma valeur. »",
    unlockedRewardBadge: "Badge : Balance d'Équanimité"
  },
  {
    level: 9,
    cycleId: 1,
    title: "Étape 9 : Libération de l'Hyper-Responsabilité Émotionnelle",
    theme: "Accord 2 • Autonomie des Tempêtes d'Autrui",
    question: "Comment vous libérer de la compulsion de vouloir 'sauver' ou calmer les tempêtes émotionnelles d'autrui à vos dépens ?",
    options: [
      "En prenant sur moi toutes les colères familiales pour maintenir la paix de façade.",
      "En coupant tout contact avec la terre entière de façon paniquée.",
      "En intégrant avec compassion que chaque adulte est seul responsable de ses propres émotions et comportements."
    ],
    correctOptionIndex: 2, // C
    explanation: "Lâcher l'illusion de contrôle sur autrui libère un espace immense pour soigner sa propre régulation nerveuse.",
    reflectionPrompt: "Quel fardeau émotionnel qui ne vous appartient pas déposez-vous au sol aujourd'hui ?",
    benevolentAffirmation: "« Je ne suis pas responsable des tempêtes des autres. Mon devoir sacré est de cultiver ma paix. »",
    unlockedRewardBadge: "Badge : Fardeau Déposé"
  },
  {
    level: 10,
    cycleId: 1,
    title: "Étape 10 : L'Invulnérabilité du Cœur Guéri",
    theme: "Accord 2 • Consécration de l'Immunité Toltèque (Palier 10)",
    question: "Lorsque vous incarnez pleinement l'accord 'Ne rien prendre personnellement', quel état s'installe en vous ?",
    options: [
      "Une paix inébranlable : aucune parole toxique ne peut plus traverser mon armure de sérénité et d'amour-propre.",
      "Une indifférence totale et cruelle envers la souffrance du monde.",
      "Un sentiment de supériorité hautain sur tous les autres êtres humains."
    ],
    correctOptionIndex: 0, // A
    explanation: "L'immunité toltèque n'est ni insensibilité ni arrogance, mais la paix d'un cœur aligné avec ses valeurs sacrées.",
    reflectionPrompt: "Comment visualisez-vous votre liberté maintenant que le poison extérieur ne peut plus vous atteindre ?",
    benevolentAffirmation: "« Mon cœur est invulnérable au venin d'autrui. Je marche dans la lumière de ma paix souveraine. »",
    unlockedRewardBadge: "Trophée : Maîtrise du Non-Personnel (Accord 2 Validé - Palier 10)"
  },

  // --- ACCORD 3 : NE FAIS AUCUNE SUPPOSITION (Niv 11 - 15) ---
  {
    level: 11,
    cycleId: 1,
    title: "Étape 11 : Stopper l'Entropie des Scénarios Anxiogènes",
    theme: "Accord 3 • Sortie du Poison de l'Interprétation",
    question: "Pourquoi imaginer ce que l'autre pense ou broder des scénarios catastrophes dans le silence génère-t-il une immense souffrance ?",
    options: [
      "Parce que les scénarios catastrophes permettent d'anticiper le pire et sont toujours vrais.",
      "Parce que supposer au lieu de clarifier draine mon énergie vitale et entretient le chaos mental (l'entropie).",
      "Parce que le silence est toujours la preuve d'un rejet définitif."
    ],
    correctOptionIndex: 1, // B
    explanation: "Supposer amplifie l'entropie psychique. Remplacer les projections anxieuses par des questions factuelles ramène la clarté.",
    reflectionPrompt: "Quel scénario imaginaire angoissant décidez-vous de désamorcer et d'évacuer aujourd'hui ?",
    benevolentAffirmation: "« Je renonce aux suppositions imaginaires. Je choisis la réalité simple et paisible du moment présent. »",
    unlockedRewardBadge: "Badge : Clarté Anti-Scénarios"
  },
  {
    level: 12,
    cycleId: 1,
    title: "Étape 12 : Le Courage de Poser des Questions Claires",
    theme: "Accord 3 • La Communication Directe & Transparente",
    question: "Face au doute ou à l'ambiguïté relationnelle, quel geste courageux désamorce toute supposition toxique ?",
    options: [
      "Espionner les messages de l'autre pour trouver des indices secrets.",
      "Attendre des semaines en faisant la tête pour voir si l'autre s'en aperçoit.",
      "Poser une question directe, limpide et respectueuse pour obtenir des faits vérifiables et dissiper le brouillard."
    ],
    correctOptionIndex: 2, // C
    explanation: "La communication directe et factuelle coupe court aux fantasmes anxiogènes et protège le système nerveux.",
    reflectionPrompt: "Quelle question simple, honnête et libératrice aimeriez-vous poser pour clarifier une situation ?",
    benevolentAffirmation: "« J'ai le courage de poser des questions claires et d'exprimer ce que je ressens en toute authenticité. »",
    unlockedRewardBadge: "Badge : Clé de la Question Libératrice"
  },
  {
    level: 13,
    cycleId: 1,
    title: "Étape 13 : Le Piège de Supposer que l'Autre va Changer",
    theme: "Accord 3 • Lucidité face aux Espoirs Illusoires",
    question: "Quelle supposition sur un individu manipulateur maintient le plus longtemps sous emprise ?",
    options: [
      "Supposer qu'avec assez de patience et d'amour, il finira par changer magiquement sans thérapie ni remise en cause.",
      "Supposer qu'il est indispensable de mettre en place un plan de sûreté juridique.",
      "Supposer qu'il faut préserver ses économies personnelles."
    ],
    correctOptionIndex: 0, // A
    explanation: "L'espoir illusoire sans actes concrets prolonge l'exposition au danger. La lucidité factuelle restaure la sécurité.",
    reflectionPrompt: "Quelle fausse attente déposez-vous pour accueillir la réalité objective de la situation ?",
    benevolentAffirmation: "« Je regarde les actes réels et non les promesses creuses. Ma lucidité me rend libre. »",
    unlockedRewardBadge: "Badge : Œil de Vérité Objective"
  },
  {
    level: 14,
    cycleId: 1,
    title: "Étape 14 : Cesser de Supposer que les Autres Pensent comme Nous",
    theme: "Accord 3 • Différenciation des Systèmes de Valeurs",
    question: "Pourquoi est-il dangereux de supposer qu'autrui possède automatiquement la même empathie et loyauté que vous ?",
    options: [
      "Parce que tout le monde est naturellement bon et dévoué.",
      "Parce que cette projection nous rend aveugle aux tactiques de manipulation et au manque d'empathie d'autrui.",
      "Parce qu'il faut immédiatement rejeter toute relation humaine."
    ],
    correctOptionIndex: 1, // B
    explanation: "Comprendre que certains individus fonctionnent sans empathie permet d'activer un discernement protecteur sans naïveté.",
    reflectionPrompt: "Quel discernement sain adoptez-vous désormais pour évaluer les intentions réelles ?",
    benevolentAffirmation: "« J'honore ma pureté d'âme tout en gardant un discernement aiguisé face à la réalité d'autrui. »",
    unlockedRewardBadge: "Badge : Prisme de Discernement"
  },
  {
    level: 15,
    cycleId: 1,
    title: "Étape 15 : La Paix de l'Esprit Débarrassé des Suppositions",
    theme: "Accord 3 • Consécration du Non-Supposé (Palier 15)",
    question: "Quel immense soulagement ressentez-vous lorsque vous cessez de deviner et de supposer pour vous ancrer dans le réel ?",
    options: [
      "Une angoisse terrible de ne plus contrôler les pensées des autres.",
      "Un désir de retourner immédiatement dans l'incertitude.",
      "Un allègement mental spectaculaire, une fin des ruminations et une présence apaisée à ma propre vie."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le désengagement des suppositions stoppe le vagabondage mental anxiogène et rétablit l'homéostasie nerveuse.",
    reflectionPrompt: "Quelle paix profonde s'installe dans votre esprit lorsque vous vivez dans le concret ?",
    benevolentAffirmation: "« Je vis dans la vérité du moment présent. Je ne suppose rien, je clarifie et je respire en paix. »",
    unlockedRewardBadge: "Trophée : Maîtrise du Non-Supposé (Accord 3 Validé - Palier 15)"
  },

  // --- ACCORD 4 : FAIS TOUJOURS DE TON MIEUX (Niv 16 - 20) ---
  {
    level: 16,
    cycleId: 1,
    title: "Étape 16 : Le « Mieux » Fluctuant & le Respect des Cycles d'Énergie",
    theme: "Accord 4 • Écoute Bienveillante des Ressources Internes",
    question: "Pourquoi votre 'mieux' aujourd'hui dans la fatigue n'a-t-il pas à être identique à votre 'mieux' dans un jour de pleine énergie ?",
    options: [
      "Parce que mon énergie varie naturellement : faire de son mieux signifie respecter son niveau de ressources sans s'épuiser.",
      "Parce que la fatigue est un manque de volonté qu'il faut combattre par la force.",
      "Parce qu'il faut toujours performer à 100% même malade."
    ],
    correctOptionIndex: 0, // A
    explanation: "Le 'mieux' toltèque est dynamique : respecter son état somatique empêche le burn-out et honore l'auto-compassion.",
    reflectionPrompt: "Quel niveau d'énergie ressentez-vous aujourd'hui et comment l'accueillez-vous sans jugement ?",
    benevolentAffirmation: "« Mon mieux change d'un instant à l'autre. J'honore mon corps et mes rythmes sacrés avec tendresse. »",
    unlockedRewardBadge: "Badge : Rythme Sacré de l'Énergie"
  },
  {
    level: 17,
    cycleId: 1,
    title: "Étape 17 : L'Abandon du Perfectionnisme Destructeur",
    theme: "Accord 4 • Sortie de l'Exigence Tyrannique",
    question: "Comment le piège du perfectionnisme ('en faire trop') nourrit-il la culpabilité et l'auto-jugement ?",
    options: [
      "Le perfectionnisme est la seule manière d'être digne d'amour.",
      "En cherchant la perfection impossible, on s'épuise, on s'autocritique et on ne s'accorde jamais de repos mérité.",
      "Le perfectionnisme protège de toutes les erreurs de la vie."
    ],
    correctOptionIndex: 1, // B
    explanation: "Faire plus que son mieux épuise le corps ; faire moins génère la culpabilité. Faire juste son mieux apporte la paix.",
    reflectionPrompt: "Quelle exigence irréaliste choisissez-vous d'abandonner aujourd'hui ?",
    benevolentAffirmation: "« Je renonce à la perfection stérile. Je choisis l'authenticité bienveillante et le juste effort. »",
    unlockedRewardBadge: "Badge : Libération du Perfectionnisme"
  },
  {
    level: 18,
    cycleId: 1,
    title: "Étape 18 : L'Absolution Totale des Choix Passés",
    theme: "Accord 4 • Pardon Rétrospectif Inconditionnel",
    question: "Face aux décisions difficiles de votre passé, quelle vérité toltèque vous apporte une paix définitive ?",
    options: [
      "Je dois continuer à regretter mes choix pour m'assurer de ne plus recommencer.",
      "Il n'y a aucun moyen de guérir du passé.",
      "À chaque seconde de ma vie, j'ai fait de mon mieux avec le niveau de conscience, de stress et d'information que j'avais."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le regard rétrospectif bienveillant reconnaît la bravoure de la survivante qui a cherché la survie et la sécurité.",
    reflectionPrompt: "Quel acte de pardon offrez-vous à la femme que vous étiez hier ?",
    benevolentAffirmation: "« J'ai fait de mon mieux à chaque instant de mon histoire. Je m'absous et j'avance en paix. »",
    unlockedRewardBadge: "Badge : Sceau d'Absolution Rétrospective"
  },
  {
    level: 19,
    cycleId: 1,
    title: "Étape 19 : Célébrer les Micro-Victoires Quotidiennes",
    theme: "Accord 4 • Joie de l'Action Présente & Gratitude",
    question: "Comment ancrer la sensation de réussite lorsque vous accomplissez un petit geste de soin pour vous-même ?",
    options: [
      "En célébrant chaque micro-pas (boire de l'eau, respirer, poser une limite) comme une éclatante victoire de résilience.",
      "En minimisant mes réussites sous prétexte qu'elles ne sont pas extraordinaires.",
      "En attendant que les autres me félicitent pour me sentir fière."
    ],
    correctOptionIndex: 0, // A
    explanation: "Valider les micro-victoires active la dopamine saine et reconstruit la confiance en soi pas à pas.",
    reflectionPrompt: "Quelle micro-victoire d'aujourd'hui célébrez-vous avec fierté et sourire ?",
    benevolentAffirmation: "« Chaque geste d'amour envers moi est une grande victoire. Je célèbre mon cheminement pas à pas. »",
    unlockedRewardBadge: "Badge : Coupe des Micro-Victoires"
  },
  {
    level: 20,
    cycleId: 1,
    title: "Étape 20 : L'Alliance d'Or du « Faire de son Mieux »",
    theme: "Accord 4 • Consécration du Mieux Toltèque (Palier 20)",
    question: "Lorsque vous appliquez l'accord 'Fais toujours de ton mieux', pourquoi le Juge intérieur perd-il tout pouvoir ?",
    options: [
      "Parce que le Juge devient simplement plus agressif.",
      "Parce qu'en sachant sincèrement que j'ai fait de mon mieux, aucun reproche ni culpabilité ne peut plus s'accrocher à moi.",
      "Parce que je refuse désormais d'écouter quiconque sur terre."
    ],
    correctOptionIndex: 1, // B
    explanation: "Faire de son mieux désarme le juge intérieur et dissout l'auto-flagellation à la racine.",
    reflectionPrompt: "Quelle liberté ressentez-vous lorsque vous êtes totalement en paix avec votre investissement sincère ?",
    benevolentAffirmation: "« Je fais de mon mieux, ni plus ni moins. Mon cœur est léger et libre de tout regret. »",
    unlockedRewardBadge: "Trophée : Maîtrise du Mieux Continu (Accord 4 Validé - Palier 20)"
  },

  // --- ACCORD 5 : SOIS SCEPTIQUE, MAIS APPRENDS À ÉCOUTER (Niv 21 - 25) ---
  {
    level: 21,
    cycleId: 1,
    title: "Étape 21 : Le Scepticisme Protecteur face aux Paroles Séductrices",
    theme: "Accord 5 • Détection du Love-Bombing & Paroles Enchanteresses",
    question: "Face à des déclarations grandiloquentes ou du 'love-bombing' précipité, quelle posture toltèque protège votre intégrité ?",
    options: [
      "Croire immédiatement chaque promesse sans observer les actes dans la durée.",
      "Rejeter agressivement toute marque de gentillesse par paranoïa.",
      "Rester sceptique avec douceur : écouter la musique des mots tout en observant patiemment l'alignement des actes dans le temps."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le scepticisme lucide permet d'écouter sans se faire hypnotiser, en attendant la preuve par les actes concrets.",
    reflectionPrompt: "Quel réflexe de temporisation protectrice mettez-vous en place face aux promesses trop belles ?",
    benevolentAffirmation: "« Je suis sceptique avec sagesse. J'écoute avec attention et j'observe les actes réels dans la durée. »",
    unlockedRewardBadge: "Badge : Bouclier de Scepticisme Lucide"
  },
  {
    level: 22,
    cycleId: 1,
    title: "Étape 22 : Douter des Croyances Limitantes de son Propre Esprit",
    theme: "Accord 5 • Déprogrammation des Croyances d'Impuissance",
    question: "Pourquoi est-il libérateur d'appliquer le scepticisme à ses propres pensées anxieuses ou dévalorisantes ?",
    options: [
      "Parce que mes pensées réflexes ne sont pas toutes vraies : douter des récits d'échec me permet de choisir des croyances vivantes.",
      "Parce qu'il ne faut faire confiance à rien, pas même à sa propre existence.",
      "Parce que douter de soi prouve qu'on est incapable de progresser."
    ],
    correctOptionIndex: 0, // A
    explanation: "L'esprit conditionné par le trauma produit des pensées de peur. Douter de ces automatismes libère la conscience.",
    reflectionPrompt: "Quelle pensée réflexe négative sur vous-même choisissez-vous de remettre en doute aujourd'hui ?",
    benevolentAffirmation: "« Je ne crois pas aveuglément les peurs de mon esprit. Je choisis la foi en ma force et en ma paix. »",
    unlockedRewardBadge: "Badge : Déboulonneur de Fausses Croyances"
  },
  {
    level: 23,
    cycleId: 1,
    title: "Étape 23 : Écouter l'Intention Profonde derrière les Mots",
    theme: "Accord 5 • L'Art de l'Écoute Subtile & du Décryptage Énergétique",
    question: "Comment écouter quelqu'un sans absorber ses émotions ni se laisser manipuler par ses discours ?",
    options: [
      "En coupant la parole sans cesse pour ne pas être influencée.",
      "En écoutant ce que la personne transmet réellement au-delà de son vernis verbal, tout en restant fermement ancrée chez soi.",
      "En buvant chaque parole comme une vérité absolue."
    ],
    correctOptionIndex: 1, // B
    explanation: "Écouter avec scepticisme permet de percevoir l'intention réelle (peur, contrôle, sincérité) sans s'y identifier.",
    reflectionPrompt: "Comment ressentez-vous la différence entre un discours manipulateur et une parole sincère ?",
    benevolentAffirmation: "« J'écoute avec clarté et sérénité. Mon discernement pénètre la réalité au-delà des illusions. »",
    unlockedRewardBadge: "Badge : Oreille de Sagesse Toltèque"
  },
  {
    level: 24,
    cycleId: 1,
    title: "Étape 24 : L'Immunité Absolue contre le Gaslighting",
    theme: "Accord 5 • Souveraineté de sa Mémoire & de son Ressenti",
    question: "Quand un manipulateur nie vos souvenirs ou prétend que vous 'imaginez des choses', quelle réponse toltèque scelle votre souveraineté ?",
    options: [
      "Douter de ma propre santé mentale et lui donner raison.",
      "Perdre mon calme et crier pour tenter de le convaincre de ma réalité.",
      "Rester inébranlable : 'Je sais ce que j'ai vu, entendu et ressenti. Ma réalité est légitime et je n'ai pas à te la prouver'."
    ],
    correctOptionIndex: 2, // C
    explanation: "Face au gaslighting, le scepticisme envers les mensonges de l'autre et la foi en sa propre expérience restaure la souveraineté.",
    reflectionPrompt: "Quelle certitude intime sur votre vécu réaffirmez-vous avec force et tranquillité ?",
    benevolentAffirmation: "« Ma réalité est solide, claire et inaltérable. Nul ne peut réécrire mon histoire ni ébranler ma vérité. »",
    unlockedRewardBadge: "Badge : Ancre d'Inviolabilité Réelle"
  },
  {
    level: 25,
    cycleId: 1,
    title: "Étape 25 : Couronnement du Cycle 1 (Les 5 Accords Toltèques)",
    theme: "Consécration des 5 Accords Toltèques & Entrée dans le Cycle 2",
    question: "En complétant ce 25e niveau, quelle promesse sacrée scellez-vous avec votre âme pour la suite de votre parcours ?",
    options: [
      "Je promets d'incarner la parole aimante, l'immunité au venin d'autrui, la clarté factuelle, la douceur du mieux et le scepticisme lucide.",
      "Je promets de ne plus jamais faire d'efforts car tout est déjà parfait.",
      "Je promets de rester figée dans le passé pour ne pas risquer de nouveaux défis."
    ],
    correctOptionIndex: 0, // A
    explanation: "Félicitations ! Vous avez intégré les 5 piliers toltèques : votre parole est pure, votre cœur immunisé, votre esprit limpide et souverain.",
    reflectionPrompt: "Quel message d'amour et de gratitude rédigez-vous pour célébrer l'achèvement triomphal du Cycle 1 ?",
    benevolentAffirmation: "« Je suis couronnée de dignité, de paix et de lucidité. Les 5 Accords Toltèques sont vivants en moi pour toujours. »",
    unlockedRewardBadge: "Trophée Suprême : Grande Couronne des 5 Accords Toltèques (Cycle 1 Accompli 🏆)"
  }
];
