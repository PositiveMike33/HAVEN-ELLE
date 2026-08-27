import { HealingQuestion } from './resilience100Levels';

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
export const COMPLETE_100_HEALING_QUESTIONS: Healing100QuestionItem[] = [
  // ==========================================
  // CYCLE 1 : NIVEAUX 1 À 25 (Apprendre & Intégrer les 5 Accords Toltèques)
  // ==========================================

  // --- BLOC 1 : NIVEAUX 1 À 5 • ACCORD 1 : QUE TA PAROLE SOIT IMPECCABLE ---
  {
    level: 1,
    cycleId: 1,
    title: "Étape 1 : Se Parler avec Amour & Tendresse au Quotidien",
    theme: "Accord 1 • Dialogue Intérieur Aimant & Réparateur",
    question: "Face aux doutes et à la vulnérabilité, comment choisissez-vous désormais de vous parler intérieurement ?",
    options: [
      "En m'adressant avec la tendresse inconditionnelle et le respect sacré que j'offrirais à ma meilleure amie.",
      "En remplaçant immédiatement chaque autocritique réflexe par une parole d'encouragement et de douceur.",
      "En reconnaissant que mes mots envers moi-même sont des graines vivantes de guérison et de sécurité."
    ],
    reflectionPrompt: "Quel mot tendre et réconfortant dites-vous à votre cœur en cet instant ?",
    benevolentAffirmation: "« Ma parole envers moi-même est un baume sacré de tendresse, d'amour et de respect inconditionnel. »",
    unlockedRewardBadge: "Badge : Clé de la Parole Aimante"
  },
  {
    level: 2,
    cycleId: 1,
    title: "Étape 2 : Transmutation de la Parole Négative d'Autrui",
    theme: "Accord 1 • Transmutation du Négatif en Affirmation Constructive",
    question: "Lorsqu'une critique blessante, une insulte ou une parole dévalorisante d'autrui tente de vous atteindre, comment transmutez-vous ce négatif en affirmation positive ?",
    options: [
      "Je reconnais que cette parole toxique appartient à l'autre, et je la transmute immédiatement en une affirmation lumineuse de ma vraie valeur.",
      "Je refuse d'absorber ce poison verbal et je proclame intérieurement ma dignité, mon intégrité et ma pureté d'âme.",
      "Je transforme cette attaque en un rappel sacré que nul ne détient le pouvoir de définir qui je suis à part moi-même."
    ],
    reflectionPrompt: "Quelle parole négative passée choisissez-vous de transmuter aujourd'hui en une puissante vérité positive ?",
    benevolentAffirmation: "« Je transforme chaque mot d'ombre en un serment éclatant de lumière, de souveraineté et d'amour-propre. »",
    unlockedRewardBadge: "Badge : Alchimie de la Transmutation Verbale"
  },
  {
    level: 3,
    cycleId: 1,
    title: "Étape 3 : Cesser d'Utiliser la Parole Contre Soi-Même",
    theme: "Accord 1 • Absolution & Non-Jugement Intérieur",
    question: "Après avoir traversé des épreuves ou des relations d'emprise, comment renoncez-vous définitivement à utiliser la parole contre vous-même (cesser de vous traiter de 'naïve', 'coupable' ou 'faible') ?",
    options: [
      "En comprenant qu'avoir fait confiance était une preuve de la grandeur de mon cœur, jamais une faiblesse ni une faute.",
      "En bannissant tout qualificatif destructeur de mon dialogue intime pour honorer mon immense courage de survivante.",
      "En m'accordant une indulgence totale : j'ai agi avec les ressources, la conscience et la force dont je disposais alors."
    ],
    reflectionPrompt: "Quel jugement injuste envers vous-même déposez-vous pour toujours aujourd'hui ?",
    benevolentAffirmation: "« Je ne permets plus jamais à mes mots de me blesser. Je suis ma protectrice et mon alliée la plus loyale. »",
    unlockedRewardBadge: "Badge : Bouclier de Pureté Intérieure"
  },
  {
    level: 4,
    cycleId: 1,
    title: "Étape 4 : Exprimer sa Vérité & ses Limites avec Clarté",
    theme: "Accord 1 • La Parole d'Affirmation et de Frontières",
    question: "Comment manier une parole juste, calme et impeccable pour poser vos limites et faire respecter vos besoins essentiels ?",
    options: [
      "En formulant mes limites avec clarté, fermeté et sérénité, sans agressivité réactive ni soumission coupable.",
      "En affirmant un 'Non' limpide et sans justification excessive face à ce qui blesse ma paix ou ma dignité.",
      "En osant faire entendre ma vérité authentique, car ma voix est précieuse, légitime et digne d'écoute."
    ],
    reflectionPrompt: "Quelle limite protectrice avez-vous le courage de verbaliser avec clarté aujourd'hui ?",
    benevolentAffirmation: "« Ma voix est claire, calme et souveraine. J'exprime ma vérité avec dignité, douceur et fermeté. »",
    unlockedRewardBadge: "Badge : Sceau de la Parole d'Or"
  },
  {
    level: 5,
    cycleId: 1,
    title: "Étape 5 : Le Pouvoir Créateur des Déclarations Positives",
    theme: "Accord 1 • Reprogrammation Bienveillante de l'Esprit",
    question: "De quelle manière utilisez-vous le pouvoir créateur de la parole pour reprogrammer positivement votre esprit et façonner votre avenir ?",
    options: [
      "En répétant chaque matin des affirmations de sécurité, de dignité et de joie qui nourrissent mon système nerveux.",
      "En bénissant mon parcours et en célébrant mes victoires quotidiennes au lieu de ressasser les ombres passées.",
      "En choisissant des mots d'espérance, de gratitude et de bienveillance qui élèvent mon énergie et celle de mon foyer."
    ],
    reflectionPrompt: "Quelle déclaration de triomphe et d'espérance choisissez-vous pour bénir votre journée ?",
    benevolentAffirmation: "« Par mes paroles conscientes et lumineuses, je bâtis un sanctuaire inviolable de paix, d'amour et de renouveau. »",
    unlockedRewardBadge: "Trophée : Maîtrise de la Parole Impeccable (Accord 1 Validé)"
  },

  // --- BLOC 2 : NIVEAUX 6 À 10 • ACCORD 2 : NE RIEN PRENDRE PERSONNELLEMENT ---
  {
    level: 6,
    cycleId: 1,
    title: "Étape 6 : Comprendre le Miroir Projectif de l'Autre",
    theme: "Accord 2 • Décodage des Projections & Venin d'Autrui",
    question: "Face à une personne agressive, méprisante ou critique, pourquoi ses attaques ne parlent-elles que de son propre désordre intérieur ?",
    options: [
      "Parce que chacun ne projette que ses propres blessures, frustrations et croyances toxiques sur le monde.",
      "Parce que son comportement reflète son niveau de souffrance et n'a aucun lien avec ma valeur réelle.",
      "Parce que la colère ou le mépris de l'autre est un poison qui lui appartient à 100% et que je refuse d'avaler."
    ],
    reflectionPrompt: "Quelle attaque passée réalisez-vous aujourd'hui qu'elle n'appartenait qu'au désordre de son auteur ?",
    benevolentAffirmation: "« Je ne suis pas le réceptacle des blessures d'autrui. Les projections des autres leur appartiennent à 100%. »",
    unlockedRewardBadge: "Badge : Miroir Déviateur de Projections"
  },
  {
    level: 7,
    cycleId: 1,
    title: "Étape 7 : Le Bouclier contre la Culpabilisation Toxique",
    theme: "Accord 2 • Immunité Émotionnelle & Non-Absorption",
    question: "Comment ériger une barrière infranchissable lorsque quelqu'un tente de vous faire porter la responsabilité de ses fautes ou de sa colère ?",
    options: [
      "En me répétant calmement : 'Cette culpabilité ne m'appartient pas, je la laisse à son propriétaire légitime'.",
      "En restant ancrée dans ma droiture et mon alignement intérieur sans entrer dans des débats épuisants.",
      "En observant la tentative d'inversion des rôles comme un phénomène extérieur sans laisser le doute s'infiltrer."
    ],
    reflectionPrompt: "Quelle culpabilité injuste rejetée vous procure un soulagement immédiat dans le corps ?",
    benevolentAffirmation: "« Je suis imperméable aux tentatives de culpabilisation. Ma conscience est pure, intègre et apaisée. »",
    unlockedRewardBadge: "Badge : Bouclier d'Immunité Émotionnelle"
  },
  {
    level: 8,
    cycleId: 1,
    title: "Étape 8 : Rester Neutre face au Blâme comme à la Fausse Flatterie",
    theme: "Accord 2 • Équanimité & Ancrage dans sa Vérité",
    question: "Pourquoi est-il tout aussi vital de ne pas prendre personnellement les flatteries excessives et intéressées que les reproches injustes ?",
    options: [
      "Parce que faire dépendre mon estime de la flatterie me rendrait vulnérable à la dépendance et à la manipulation future.",
      "Parce que mon auto-estime repose sur mes propres valeurs stables et non sur le regard versatile d'autrui.",
      "Parce que rester souveraine et équanime me permet de discerner les intentions sincères des pièges séducteurs."
    ],
    reflectionPrompt: "Sur quelle certitude intérieure inébranlable repose votre valeur sacrée aujourd'hui ?",
    benevolentAffirmation: "« Ni les insultes ne me diminuent, ni les louanges intéressées ne me définissent : je connais ma valeur sacrée. »",
    unlockedRewardBadge: "Badge : Balance d'Équanimité"
  },
  {
    level: 9,
    cycleId: 1,
    title: "Étape 9 : Déposer le Fardeau des Émotions des Autres",
    theme: "Accord 2 • Libération de l'Hyper-Responsabilité Émotionnelle",
    question: "Comment vous libérer définitivement de la compulsion de vouloir 'sauver', calmer ou porter les tempêtes émotionnelles d'autrui à vos dépens ?",
    options: [
      "En intégrant avec compassion que chaque être humain adulte est seul responsable de ses propres émotions et comportements.",
      "En cessant d'anticiper les sautes d'humeur des autres et en préservant mon propre équilibre nerveux.",
      "En reconnaissant avec douceur que mon devoir premier est de protéger mon sanctuaire de paix et ma dignité."
    ],
    reflectionPrompt: "Quel fardeau émotionnel qui ne vous appartient pas déposez-vous au sol aujourd'hui ?",
    benevolentAffirmation: "« Je ne suis pas responsable des tempêtes des autres. Ma responsabilité sacrée est de cultiver ma propre paix. »",
    unlockedRewardBadge: "Badge : Fardeau Déposé"
  },
  {
    level: 10,
    cycleId: 1,
    title: "Étape 10 : L'Invulnérabilité du Cœur Guéri",
    theme: "Accord 2 • Consécration de l'Immunité Toltèque (Palier 10)",
    question: "Lorsque vous incarnez pleinement l'accord 'Ne rien prendre personnellement', quel état de sérénité absolue s'installe en vous ?",
    options: [
      "Une paix inébranlable : aucune parole toxique ne peut plus traverser mon armure de sérénité et d'amour-propre.",
      "Une légèreté totale : je chemine dans le monde affranchie de la peur du regard, du jugement ou du rejet d'autrui.",
      "Une souveraineté complète : ma sécurité et ma joie émanent de mon alignement intérieur avec mes valeurs divines."
    ],
    reflectionPrompt: "Comment visualisez-vous votre liberté maintenant que le poison extérieur ne peut plus vous atteindre ?",
    benevolentAffirmation: "« Mon cœur est invulnérable au venin d'autrui. Je marche dans la lumière intouchable de ma paix souveraine. »",
    unlockedRewardBadge: "Trophée : Maîtrise du Non-Personnel (Accord 2 Validé - Palier 10)"
  },

  // --- BLOC 3 : NIVEAUX 11 À 15 • ACCORD 3 : NE FAIRE AUCUNE SUPPOSITION ---
  {
    level: 11,
    cycleId: 1,
    title: "Étape 11 : Stopper l'Entropie des Scénarios Anxiogènes",
    theme: "Accord 3 • Sortie du Poison de l'Interprétation & des Scénarios",
    question: "Pourquoi imaginer ce que l'autre pense ou broder des scénarios catastrophes dans le silence génère-t-il une immense souffrance ?",
    options: [
      "Supposer est facile et c'est toujours mieux d'avoir peur et d'anticiper le pire que d'être calme et reposée.",
      "Il vaut mieux garder ses doutes pour soi et imaginer les pires intentions chez l'autre plutôt que de clarifier la situation.",
      "Parce que supposer au lieu de clarifier draine mon énergie vitale et entretient le chaos mental (l'entropie)."
    ],
    correctOptionIndex: 2,
    explanation: "Supposer ou entretenir la peur draine l'énergie vitale sans résoudre les problèmes. La réponse C est la seule vérité toltèque : clarifier avec bienveillance dissipe l'entropie et protège votre sérénité.",
    reflectionPrompt: "Quel scénario angoissant imaginaire décidez-vous de désamorcer et d'évacuer aujourd'hui ?",
    benevolentAffirmation: "« Je renonce aux suppositions imaginaires. Je choisis la réalité simple et paisible du moment présent. »",
    unlockedRewardBadge: "Badge : Clarté Anti-Scénarios"
  },
  {
    level: 12,
    cycleId: 1,
    title: "Étape 12 : Le Courage de Poser des Questions Claires",
    theme: "Accord 3 • La Communication Directe & Transparente",
    question: "Face au doute, au non-dit ou à l'ambiguïté, quel geste courageux désamorce définitivement toute supposition toxique ?",
    options: [
      "Poser une question directe, limpide et respectueuse pour obtenir des faits vérifiables et dissiper le brouillard.",
      "Exprimer clairement mes besoins au lieu d'attendre que l'autre lise par magie dans mes pensées.",
      "Formuler mes interrogations avec calme et écouter les réponses factuelles sans projeter mes peurs passées."
    ],
    reflectionPrompt: "Quelle question simple, honnête et libératrice aimeriez-vous poser pour clarifier une situation ?",
    benevolentAffirmation: "« J'ai le courage de poser des questions claires et d'exprimer ce que je ressens en toute authenticité. »",
    unlockedRewardBadge: "Badge : Clé de la Question Libératrice"
  },
  {
    level: 13,
    cycleId: 1,
    title: "Étape 13 : Le Piège de Supposer que l'Autre va Changer",
    theme: "Accord 3 • Lucidité face aux Espoirs Illusoires",
    question: "Dans une relation passée sous emprise, quelle supposition sur l'autre vous a le plus longtemps maintenue dans la souffrance ?",
    options: [
      "Supposer qu'avec assez d'amour, de patience et de sacrifices de ma part, il finirait par changer ou guérir.",
      "Supposer qu'il partageait mon code d'honneur, d'empathie et de loyauté humaine.",
      "Supposer que des promesses orales répétées sans aucun acte thérapeutique concret suffisaient à garantir la sécurité."
    ],
    reflectionPrompt: "Quelle illusion sur autrui laissez-vous partir aujourd'hui pour embrasser la vérité qui libère ?",
    benevolentAffirmation: "« Je vois les autres tels qu'ils sont à travers leurs actes réels, sans projeter d'illusions rassurantes. »",
    unlockedRewardBadge: "Badge : Regard de Pure Vérité"
  },
  {
    level: 14,
    cycleId: 1,
    title: "Étape 14 : Distinguer les Faits Observables des Réflexes de Peur",
    theme: "Accord 3 • Ancrage Sensoriel & Faits Tangibles",
    question: "Comment votre cerveau peut-il faire la différence entre une menace réelle actuelle et une supposition issue de traumatismes passés ?",
    options: [
      "En revenant méthodiquement aux faits tangibles et observables ('que s'est-il passé exactement ?') sans inventer d'histoire.",
      "En respirant profondément pour vérifier si mon corps réagit au présent immédiat ou au souvenir d'une ancienne douleur.",
      "En notant par écrit les éléments objectifs pour désactiver l'alarme émotionnelle réflexe de mon cerveau."
    ],
    reflectionPrompt: "Observez votre environnement immédiat : quel fait tangible confirme votre sécurité en cet instant ?",
    benevolentAffirmation: "« Je m'enracine dans les faits réels et vérifiables. Mon esprit est limpide comme une eau de source. »",
    unlockedRewardBadge: "Badge : Boussole des Faits Tangibles"
  },
  {
    level: 15,
    cycleId: 1,
    title: "Étape 15 : La Sérénité de la Transparence Totale",
    theme: "Accord 3 • Clôture Définitive des Non-Dits",
    question: "Comment l'abandon total des suppositions transforme-t-il votre vie quotidienne en une oasis de paix et d'énergie ?",
    options: [
      "Mon esprit est totalement allégé de tout fardeau imaginaire : je vis dans la simplicité et la vérité.",
      "Mes relations deviennent saines, franches et transparentes car tout est communiqué avec droiture et amour.",
      "Je récupère une puissance mentale immense pour me consacrer à ma guérison et à mes projets de vie."
    ],
    reflectionPrompt: "Quelle charge mentale ressentez-vous s'évanouir en cessant de deviner les pensées d'autrui ?",
    benevolentAffirmation: "« Je vis dans la lumière de la vérité et de la clarté. Mon esprit est délivré de tout doute stérile. »",
    unlockedRewardBadge: "Trophée : Maîtrise du Non-Supposé (Accord 3 Validé)"
  },

  // --- BLOC 4 : NIVEAUX 16 À 20 • ACCORD 4 : TOUJOURS FAIRE DE SON MIEUX ---
  {
    level: 16,
    cycleId: 1,
    title: "Étape 16 : La Nature Changeante & Vivante du 'Mieux'",
    theme: "Accord 4 • Auto-Compassion & Écoute des Rythmes Corporels",
    question: "Pourquoi votre 'mieux' n'est-il jamais identique lorsque vous êtes en pleine forme, fatiguée, souffrante ou en convalescence émotionnelle ?",
    options: [
      "Parce que mon énergie fluctue naturellement, et mon mieux du jour doit s'ajuster avec bienveillance à mes capacités réelles.",
      "Parce qu'exiger de moi une performance constante serait une violence que je refuse désormais de m'infliger.",
      "Parce que m'écouter, ralentir et me reposer quand je suis épuisée est précisément la plus noble expression de mon mieux."
    ],
    reflectionPrompt: "Quel niveau d'énergie ressentez-vous aujourd'hui, et comment l'accueillez-vous sans le moindre jugement ?",
    benevolentAffirmation: "« Mon mieux d'aujourd'hui est parfait tel qu'il est. J'honore mon corps et mes limites avec une infinie douceur. »",
    unlockedRewardBadge: "Badge : Fleur d'Adaptabilité & de Douceur"
  },
  {
    level: 17,
    cycleId: 1,
    title: "Étape 17 : Désamorcer le Perfectionnisme Destructeur",
    theme: "Accord 4 • Libération de l'Auto-Exigence Toxique",
    question: "En quoi vouloir 'trop en faire' ou viser une perfection irréaliste est-il un piège qui nourrit l'épuisement et le juge intérieur ?",
    options: [
      "Parce qu'essayer de faire 'mieux que mon mieux' épuise mes réserves vitales et me conduit au découragement.",
      "Parce qu'en faisant simplement mon mieux du moment sans excès, mon Juge intérieur n'a aucune prise sur moi.",
      "Parce que renoncer au perfectionnisme me reconnecte au plaisir d'agir et à la joie pure de l'instant présent."
    ],
    reflectionPrompt: "Quelle exigence démesurée acceptez-vous de relâcher aujourd'hui pour enfin souffler et vous reposer ?",
    benevolentAffirmation: "« Je renonce à la perfection illusoire pour embrasser la justesse, la paix et l'équilibre bienveillant. »",
    unlockedRewardBadge: "Badge : Équilibre d'Or & de Justesse"
  },
  {
    level: 18,
    cycleId: 1,
    title: "Étape 18 : L'Absolution Rétrospective du Passé",
    theme: "Accord 4 • Pardon Total & Compassion pour la Femme d'Hier",
    question: "Comment l'accord 'Toujours faire de son mieux' vous libère-t-il définitivement des regrets et de la culpabilité concernant vos choix passés ?",
    options: [
      "En reconnaissant qu'à chaque seconde de mon histoire, j'ai fait le meilleur choix possible avec la force et les repères que j'avais.",
      "En comprenant que juger mes actes d'hier avec ma conscience d'aujourd'hui est une injustice dont je m'absous totalement.",
      "En serrant la femme courageuse que j'étais dans mes bras avec gratitude, car c'est elle qui m'a menée jusqu'ici vivante."
    ],
    reflectionPrompt: "Quel mot d'amour et de pardon infini soufflez-vous à la femme que vous étiez hier ?",
    benevolentAffirmation: "« J'ai fait de mon mieux à chaque instant de ma vie. Je me pardonne tout et je marche la tête haute et le cœur libre. »",
    unlockedRewardBadge: "Badge : Ailes d'Absolution"
  },
  {
    level: 19,
    cycleId: 1,
    title: "Étape 19 : Agir par Amour de Soi et Non par Peur de Déplaire",
    theme: "Accord 4 • Action Intègre & Motivation Pure",
    question: "Lorsque vous faites de votre mieux par pur amour pour vous-même (et non pour chercher l'approbation ou éviter un conflit), que ressentez-vous ?",
    options: [
      "Chaque geste devient une source de joie profonde, de dignité retrouvée et de fierté personnelle.",
      "Je cesse d'attendre une récompense ou une validation extérieure car l'acte bienveillant est sa propre récompense.",
      "Je me sens alignée avec mes valeurs sacrées, souveraine et totalement libre de toute contrainte servile."
    ],
    reflectionPrompt: "Quelle belle action accomplissez-vous aujourd'hui uniquement pour votre propre bien-être et respect ?",
    benevolentAffirmation: "« J'agis par amour inconditionnel pour moi-même, libre de toute peur du jugement ou du rejet d'autrui. »",
    unlockedRewardBadge: "Badge : Flamme d'Action Sacrée"
  },
  {
    level: 20,
    cycleId: 1,
    title: "Étape 20 : Célébrer Chaque Micro-Victoire Quotidienne",
    theme: "Accord 4 • Récolte de la Gratitude & Estime Indestructible",
    question: "Pourquoi célébrer le moindre petit pas (avoir respiré calmement, posé une limite, pris un thé en paix) est-il la consécration du 4e Accord ?",
    options: [
      "Parce que la reconstruction durable et pérenne est une mosaïque de micro-victoires quotidiennes célébrées avec amour.",
      "Parce que reconnaître mes progrès réactive la dopamine de l'espoir et consolide ma confiance en l'avenir.",
      "Parce que chaque petit pas accompli avec conscience est un triomphe éclatant de ma résilience sur l'adversité."
    ],
    reflectionPrompt: "Quelle micro-victoire d'aujourd'hui mérite toute votre admiration et votre fierté ?",
    benevolentAffirmation: "« Je célèbre chaque respiration et chaque pas comme une victoire éclatante de ma lumière et de ma vie. »",
    unlockedRewardBadge: "Trophée : Maîtrise du Mieux Continu (Accord 4 Validé)"
  },

  // --- BLOC 5 : NIVEAUX 21 À 25 • ACCORD 5 : ÊTRE SCEPTIQUE MAIS APPRENDRE À ÉCOUTER ---
  // (Spécial Fausse Promesse, Love-Bombing, Gaslighting & Manipulation des Femmes Victimes de Maltraitance)
  {
    level: 21,
    cycleId: 1,
    title: "Étape 21 : Le Scepticisme Bienveillant face aux Fausses Promesses",
    theme: "Accord 5 • Scepticisme Protecteur & Sortie de la Naïveté",
    question: "Face à des promesses grandiloquentes et répétées ('je te jure que j'ai changé', 'tu es la femme de ma vie, pardonne-moi'), pourquoi le 5e Accord ('Sois sceptique') est-il votre bouclier vital ?",
    options: [
      "Parce que douter d'un discours séducteur sans preuve concrète n'est pas de la méchanceté, mais de la sagesse et de l'auto-préservation légitime.",
      "Parce que les manipulateurs utilisent les mots comme des miroirs aux alouettes, alors que seuls les actes constants et durables prouvent la vérité.",
      "Parce que le doute bienveillant protège mon cœur des rechutes émotionnelles et me maintient lucide face aux mirages de l'emprise."
    ],
    reflectionPrompt: "Quelle fausse promesse passée reconnaissez-vous aujourd'hui comme un piège de mots creux ?",
    benevolentAffirmation: "« Je suis sceptique face aux belles paroles sans lendemain. J'accorde ma confiance uniquement aux actes concrets, réels et durables. »",
    unlockedRewardBadge: "Badge : Bouclier du Doute Salvateur"
  },
  {
    level: 22,
    cycleId: 1,
    title: "Étape 22 : Décoder le Love-Bombing & Écouter l'Intention Réelle",
    theme: "Accord 5 • Démasquer la Séduction Manipulatrice",
    question: "Que signifie véritablement 'Apprendre à écouter' selon le 5e Accord lorsqu'un individu use d'un charme excessif, de déclarations hâtives ou de cadeaux pour vous séduire rapidement ?",
    options: [
      "Écouter l'intention cachée derrière la mise en scène : cherche-t-il à me valoriser sincèrement ou à m'attacher vite pour contrôler mon espace ?",
      "Observer avec lucidité le gouffre entre la précipitation de ses flatteries passionnées et la lenteur nécessaire à la construction d'un respect mutuel.",
      "Écouter avec mes ressentis corporels et mes yeux plutôt que de me laisser bercer par des paroles enchanteresses."
    ],
    reflectionPrompt: "Quel signal corporel (dans le ventre ou la poitrine) vous avertit immédiatement lorsqu'une personne en fait 'trop' ou va trop vite ?",
    benevolentAffirmation: "« J'écoute au-delà des apparences et des flatteries. Je perçois avec clarté et calme la véritable intention derrière chaque comportement. »",
    unlockedRewardBadge: "Badge : Œil de Lucidité & de Discernement"
  },
  {
    level: 23,
    cycleId: 1,
    title: "Étape 23 : Déjouer le Gaslighting & Ancrer sa Propre Vérité",
    theme: "Accord 5 • Immunité face à la Manipulation & aux Inversions de Réalité",
    question: "Face à une tentative de Gaslighting ('tu es folle', 'tu te fais des films', 'tu inventes tout', 'je n'ai jamais dit ça'), comment le 5e Accord protège-t-il votre santé mentale ?",
    options: [
      "En restant sceptique face à ses mensonges et en accordant une confiance totale et inébranlable à ma mémoire et à mes ressentis.",
      "En refusant d'entrer dans un débat épuisant pour tenter de lui prouver ma réalité : mon vécu est sacré et n'a pas besoin de sa validation.",
      "En reconnaissant que le gaslighting est une tactique de désorientation pour me faire douter de mon propre jugement."
    ],
    reflectionPrompt: "Quelle vérité intime sur ce que vous avez réellement vécu réaffirmez-vous avec force et tranquillité aujourd'hui ?",
    benevolentAffirmation: "« Nul ne peut réécrire ma réalité ni effacer mon vécu. J'ai une foi absolue en ma mémoire, en mes ressentis et en ma vérité. »",
    unlockedRewardBadge: "Badge : Diamant d'Inébranlable Vérité"
  },
  {
    level: 24,
    cycleId: 1,
    title: "Étape 24 : Désamorcer le Cycle de la Violence & la Fausse Lune de Miel",
    theme: "Accord 5 • Rupture Définitive de l'Emprise Cyclique",
    question: "Pourquoi le scepticisme lucide est-il l'arme maîtresse pour briser définitivement le cycle de la maltraitance (tension, agression, justification, fausse réconciliation) ?",
    options: [
      "Parce qu'il me permet de reconnaître la phase de séduction et de larmes comme un rouage mécanique du cycle de l'emprise, et non comme un miracle.",
      "Parce qu'il m'empêche de retomber dans l'amnésie traumatique et m'aide à garder les yeux grands ouverts sur les faits passés et la récidive.",
      "Parce qu'il me donne la force souveraine de choisir ma sécurité et ma liberté plutôt que de rejouer indéfiniment le même piège douloureux."
    ],
    reflectionPrompt: "Quel schéma relationnel toxique répétitif ne vous piégera plus jamais désormais ?",
    benevolentAffirmation: "« Je suis libérée de l'illusion des cycles toxiques. Je choisis la lucidité, la sécurité absolue et la paix durable. »",
    unlockedRewardBadge: "Badge : Clé de Rupture de l'Emprise"
  },
  {
    level: 25,
    cycleId: 1,
    title: "Étape 25 : Couronnement du Cycle 1 • L'Alliance Sacrée des 5 Accords",
    theme: "Grand Bilan Initiatique • Souveraineté, Lucidité & Amour Inconditionnel",
    question: "En intégrant les 5 Accords Toltèques (Parole Impeccable, Non-Personnel, Non-Supposé, Toujours Faire de son Mieux, Scepticisme Lucide), quelle femme souveraine êtes-vous devenue à ce 25e niveau ?",
    options: [
      "Une femme souveraine, bâtie sur ses valeurs inaltérables, immunisée contre l'emprise et la manipulation, et baignée d'un amour inconditionnel pour elle-même.",
      "Une âme lucide et pacifique dont la parole est douce, l'esprit clair et le cœur totalement affranchi de la peur, du doute et de la culpabilité.",
      "La gardienne inébranlable de sa dignité et de son bonheur, prête à franchir la porte du Cycle 2 avec une confiance et une fierté infinies."
    ],
    reflectionPrompt: "Quel serment solennel d'amour, de respect et de fidélité éternelle vous formulez-vous pour couronner ce 1er Cycle ?",
    benevolentAffirmation: "« Je suis couronnée de dignité, de sagesse et de liberté. Les 5 Accords sont vivants en moi. Je m'aime d'un amour infini et inconditionnel. »",
    unlockedRewardBadge: "Trophée Suprême : Grande Couronne des 5 Accords Toltèques (Cycle 1 Accompli)"
  },

  // ==========================================
  // CYCLE 2 : NIVEAUX 26 À 50 (Guérison des Traumas, Neurobiologie & Systèmes Autonomes)
  // ==========================================
  
  // --- BLOC 1 : NEUROBIOLOGIE DU TRAUMA & SYSTÈMES AUTONOMES (Niv. 26 à 30) ---
  {
    level: 26,
    cycleId: 2,
    title: "Étape 26 : La Définition Réelle du Trauma (Événement vs Réaction)",
    theme: "Neurobiologie du Trauma",
    question: "Face à une réaction émotionnelle intense et soudaine, comment devez-vous considérer le trauma ?",
    options: [
      "Comme une faiblesse de caractère qui prouve que je ne suis pas assez forte.",
      "Comme une injustice que je dois combattre avec agressivité pour prouver ma valeur.",
      "Comme une réponse involontaire de mon système nerveux à un événement inattendu que mon corps n'a pas pu traiter sur le moment."
    ],
    correctOptionIndex: 2,
    explanation: "Le trauma n'est pas une faiblesse morale ni une fatalité, mais une réaction neurophysiologique bloquée dans le corps face à l'inattendu. La réponse C est la vérité thérapeutique.",
    reflectionPrompt: "Quel souvenir ou tension corporelle reconnaissez-vous aujourd'hui comme une simple réaction de protection de votre système nerveux ?",
    benevolentAffirmation: "« Je reconnais que mon corps a réagi pour me protéger et non pour me punir. »",
    unlockedRewardBadge: "Badge : Clarté du Trauma & Souveraineté Somatique"
  },
  {
    level: 27,
    cycleId: 2,
    title: "Étape 27 : Le Corps comme Inconscient (L'Insula et le Cortex Cingulaire)",
    theme: "Neurosciences & Conscience Corporelle",
    question: "Pourquoi une simple réflexion mentale ne suffit-elle pas toujours à apaiser une angoisse corporelle ?",
    options: [
      "Parce que mon mental refuse obstinément de lâcher prise.",
      "Parce que mon corps est définitivement abîmé par mon passé.",
      "Parce que 95% des mémoires traumatiques sont stockées dans le corps et s'apaisent par des signaux somatiques de sécurité."
    ],
    correctOptionIndex: 2,
    explanation: "Les sensations sont captées par l'insula et relayées au cortex cingulaire. Le corps garde l'empreinte somatique et nécessite des signaux physiques de sécurité plutôt qu'une analyse mentale forcée.",
    reflectionPrompt: "Quelle zone de votre corps réclame le plus de douceur et de signaux de sécurité aujourd'hui ?",
    benevolentAffirmation: "« J'écoute mon corps avec tendresse. Il est mon allié et s'apaise à travers des signaux concrets de paix. »",
    unlockedRewardBadge: "Badge : Écoute de l'Insula & Apaisement"
  },
  {
    level: 28,
    cycleId: 2,
    title: "Étape 28 : Le Figeage Dorsal (Théorie Polyvagale de Stephen Porges)",
    theme: "Théorie Polyvagale",
    question: "Lorsque vous vous sentez paralysée, coupée de vos émotions ou incapable d'agir face à une pression, comment interpréter cet état ?",
    options: [
      "Comme une preuve de paresse et d'incapacité chronique.",
      "Comme un refus volontaire de faire face à mes responsabilités.",
      "Comme une activation de mon système parasympathique dorsal qui s'est figé pour amortir un choc trop lourd."
    ],
    correctOptionIndex: 2,
    explanation: "La voie parasympathique dorsale ancestrale déclenche la sidération (Freeze). Ce réflexe biologique est un mécanisme d'anesthésie de survie, non de la paresse.",
    reflectionPrompt: "Quel jugement de 'paresse' déposez-vous en comprenant que votre corps était simplement en figeage protecteur ?",
    benevolentAffirmation: "« Je dépose toute honte : mon figeage était un bouclier biologique de survie. Je me réveille pas à pas. »",
    unlockedRewardBadge: "Badge : Sagesse Polyvagale"
  },
  {
    level: 29,
    cycleId: 2,
    title: "Étape 29 : La Désincarnation et la Déconnexion Somatique",
    theme: "Réancrage Sensoriel",
    question: "Pourquoi avez-vous parfois l'impression d'observer votre vie de l'extérieur sans vraiment la ressentir ?",
    options: [
      "Parce que je perds la raison et que je ne reviendrai jamais à la normale.",
      "Parce que je préfère fuir la réalité pour éviter tout effort.",
      "Parce que mon esprit a créé une dissociation protectrice que je peux réintégrer pas à pas dans la douceur."
    ],
    correctOptionIndex: 2,
    explanation: "Se sentir 'hors de son corps' (dissociation/disembodiment) est un réflexe adaptatif pour échapper à la souffrance. On se réincarne en douceur par les 5 sens.",
    reflectionPrompt: "Quel ancrage sensoriel simple (eau chaude, toucher des pieds sur le sol, texture) vous ramène en sécurité dans votre corps ?",
    benevolentAffirmation: "« Je réintègre mon corps dans la douceur et la sécurité. Je suis ici, vivante et protégée. »",
    unlockedRewardBadge: "Badge : Réintégration Somatique"
  },
  {
    level: 30,
    cycleId: 2,
    title: "Étape 30 : Le Trauma Complexe vs le Trauma Simple",
    theme: "Trauma Complexe & Accumulation",
    question: "Pourquoi des micro-tensions répétées du passé peuvent-elles faire autant souffrir qu'un choc unique majeur ?",
    options: [
      "Parce que je suis trop sensible et que j'exagère les détails.",
      "Parce que les autres cherchent délibérément à m'anéantir.",
      "Parce que l'exposition prolongée à l'imprévisibilité use le système d'adaptation et constitue un trauma cumulatif réel."
    ],
    correctOptionIndex: 2,
    explanation: "Le trauma complexe résulte de micro-agressions répétées ou d'insécurité prolongée. Il érode le sentiment de sécurité et est tout aussi réel qu'un choc unique.",
    reflectionPrompt: "Quelle micro-agression répétée du passé reconnaissez-vous aujourd'hui comme un trauma cumulatif légitime ?",
    benevolentAffirmation: "« Je valide la réalité de mon épreuve : l'usure de l'imprévisibilité était réelle, ma reconstruction l'est tout autant. »",
    unlockedRewardBadge: "Trophée : Clarté du Trauma Complexe (Bloc 1 Validé)"
  },

  // --- BLOC 2 : PROTOCOLES DE DÉSENSIBILISATION & REPROGRAMMATION TCC (Niv. 31 à 35) ---
  {
    level: 31,
    cycleId: 2,
    title: "Étape 31 : L'Approche « Bottom-Up » (Du Corps vers le Cerveau)",
    theme: "Thérapie Somatique Bottom-Up",
    question: "Face à une vague d'angoisse panique, quelle est la démarche la plus efficace et respectueuse de votre physiologie ?",
    options: [
      "Analyser intellectuellement toutes les causes de mon stress pour trouver une solution immédiate.",
      "M'imposer le silence et réprimer mes tremblements pour garder le contrôle.",
      "Utiliser des gestes corporels doux (respiration, soupir physiologique, ancrage) pour signaler physiquement la sécurité à mon cerveau."
    ],
    correctOptionIndex: 2,
    explanation: "Dans l'approche 'Bottom-Up' (Bessel van der Kolk), les messages sensoriels montent du corps vers l'amygdale cérébrale pour éteindre l'alarme avant toute rationalisation.",
    reflectionPrompt: "Quel geste corporel bienveillant (main sur le cœur, expiration lente) pouvez-vous offrir à votre corps lors d'un pic de stress ?",
    benevolentAffirmation: "« J'apaise d'abord mon corps. Mon esprit suit naturellement le chemin de la sérénité. »",
    unlockedRewardBadge: "Badge : Maîtrise Somatique Bottom-Up"
  },
  {
    level: 32,
    cycleId: 2,
    title: "Étape 32 : Le Soupir Physiologique et la Régulation Vagale",
    theme: "Frein Vagal & Neurochimie",
    question: "Comment relancer immédiatement votre nerf vague et calmer le cœur qui s'emballe sans médicament ?",
    options: [
      "En retenant ma respiration le plus longtemps possible jusqu'à ce que la panique disparaisse.",
      "En respirant très rapidement pour faire entrer un maximum d'oxygène.",
      "En exécutant 2 ou 3 soupirs physiologiques (double inspiration par le nez suivie d'une longue expiration par la bouche)."
    ],
    correctOptionIndex: 2,
    explanation: "Le soupir physiologique (étudié par le Dr Andrew Huberman) ré-ouvre les alvéoles pulmonaires et stimule le nœud sino-auriculaire pour ralentir le rythme cardiaque en moins de 30 secondes.",
    reflectionPrompt: "Prenez maintenant deux inspirations courtes par le nez puis soupirez longuement par la bouche. Que ressentez-vous ?",
    benevolentAffirmation: "« Mon souffle est ma télécommande biologique de paix intérieure. »",
    unlockedRewardBadge: "Badge : Soupir Physiologique Vagal"
  },
  {
    level: 33,
    cycleId: 2,
    title: "Étape 33 : La Thérapie de Traitement Cognitif (CPT) & Les Points de Blocage",
    theme: "Restructuration Cognitive TCC",
    question: "Comment dissoudre un 'point de blocage' cognitif (ex: 'Si j'avais été plus vigilante, rien ne serait arrivé') ?",
    options: [
      "En me forçant à répéter des phrases positives sans y croire.",
      "En m'isolant pour ne plus jamais être confrontée à ce souvenir.",
      "En séparant les faits objectifs de l'interprétation blessante que mon cerveau traumatisé avait construite."
    ],
    correctOptionIndex: 2,
    explanation: "La thérapie de traitement cognitif (CPT) enseigne que la souffrance chronique naît de l'assimilation erronée ('C'est ma faute') plutôt que des faits bruts.",
    reflectionPrompt: "Quel point de blocage ou fausse culpabilité pouvez-vous dissoudre aujourd'hui en le remplaçant par les faits réels ?",
    benevolentAffirmation: "« Je libère la vérité des faits. Je dépose le fardeau des fausses culpabilités. »",
    unlockedRewardBadge: "Badge : Clarté Cognitive CPT"
  },
  {
    level: 34,
    cycleId: 2,
    title: "Étape 34 : La Réponse de Servilité (Fawn Response) en TCC",
    theme: "Déconditionnement de la Soumission",
    question: "Pourquoi aviez-vous tendance à vous excuser ou à faire plaisir à ceux qui vous faisaient du mal ?",
    options: [
      "Parce que je n'ai aucune personnalité ni colonne vertébrale.",
      "Parce que je suis supérieurement dévouée et que les autres sont incapables.",
      "Parce que mon système nerveux a appris que plaire et anticiper les humeurs d'autrui était mon seul moyen d'assurer ma sécurité."
    ],
    correctOptionIndex: 2,
    explanation: "La réaction de 'Fawn' (amadouer/servilité) est la 4e réponse de survie biologique décrite par Pete Walker. C'est une stratégie adaptative de protection infantile ou relationnelle.",
    reflectionPrompt: "À quelle habitude de sur-adaptation automatique pouvez-vous renoncer aujourd'hui dans votre sanctuaire ?",
    benevolentAffirmation: "« Je n'ai plus besoin d'acheter ma sécurité en m'effaçant. J'ai le droit d'exister pleinement. »",
    unlockedRewardBadge: "Badge : Souveraineté Post-Fawning"
  },
  {
    level: 35,
    cycleId: 2,
    title: "Étape 35 : L'Exposition Graduée et le Réapprentissage de la Tolérance au Stress",
    theme: "Exposition Progressive & Sécurisée",
    question: "Comment réapprendre à faire face à une situation qui vous effrayait jadis ?",
    options: [
      "En m'y plongeant d'un coup brutalement pour « casser » ma peur.",
      "En évitant définitivement tout ce qui me rappelle de près ou de loin mon passé.",
      "En franchissant un micro-pas sécurisé, validé par un temps de repos et d'auto-compassion immédiat."
    ],
    correctOptionIndex: 2,
    explanation: "L'exposition graduée par micro-doses permet d'élargir la fenêtre de tolérance du système nerveux sans le submerger ni provoquer de traumatisme secondaire.",
    reflectionPrompt: "Quel micro-pas minuscule et totalement sécurisé pouvez-vous célébrer cette semaine ?",
    benevolentAffirmation: "« J'avance à mon rythme. Chaque micro-pas courageux reconstruit mon autoroute de confiance. »",
    unlockedRewardBadge: "Trophée : Maîtrise de la Fenêtre de Tolérance (Bloc 2 Validé)"
  },

  // --- BLOC 3 : DÉCONSTRUCTION DES SCHÉMAS INCONSCIENTS DU PASSÉ (Niv. 36 à 40) ---
  {
    level: 36,
    cycleId: 2,
    title: "Étape 36 : L'Intemporalité du Système Limbique",
    theme: "Mémoire Temporelle Limbique",
    question: "Pourquoi une dispute insignifiante d'aujourd'hui vous fait-elle parfois réagir comme si votre survie était en jeu ?",
    options: [
      "Parce que mon cerveau régresse et refuse de grandir.",
      "Parce que je suis maudite à revivre éternellement la même histoire.",
      "Parce que mon cerveau limbique ne lit pas le calendrier et a besoin de preuves sensorielles actuelles pour savoir que « c'est terminé »."
    ],
    correctOptionIndex: 2,
    explanation: "L'amygdale n'a pas de notion du temps. Elle traite un déclencheur actuel comme une réplique directe du danger initial tant que le cortex préfrontal n'a pas réactualisé la date.",
    reflectionPrompt: "Dites à haute voix l'année et l'heure actuelle en posant votre main sur votre poitrine : quel soulagement physique percevez-vous ?",
    benevolentAffirmation: "« Le danger est dans le passé. Ici et maintenant, en cette seconde précise, je suis en totale sécurité. »",
    unlockedRewardBadge: "Badge : Actualisation Temporelle"
  },
  {
    level: 37,
    cycleId: 2,
    title: "Étape 37 : La Chute de l'Adrénaline & L'Effet de Contrecoup (Le Burnout Différé)",
    theme: "Décompression Neurochimique",
    question: "Pourquoi vous sentez-vous souvent épuisée au moment précis où le danger est enfin écarté et que tout redevient calme ?",
    options: [
      "Parce que je suis incapable de profiter du bonheur et de la paix.",
      "Parce que le calme m'affaiblit et me rend vulnérable.",
      "Parce que mon corps se sent enfin assez en sécurité pour relâcher l'hypervigilance et entamer la réparation cellulaire."
    ],
    correctOptionIndex: 2,
    explanation: "Lorsque l'axe hypothalamo-hypophyso-surrénalien (HPA) cesse de pomper du cortisol et de l'adrénaline, le corps bascule en phase de convalescence et réclame un profond repos réparateur.",
    reflectionPrompt: "Quelle sieste, tisane ou moment de doux repos allez-vous vous autoriser sans aucune culpabilité ?",
    benevolentAffirmation: "« Ma fatigue est le signe de ma guérison. Mon corps répare ses tissus dans la paix. »",
    unlockedRewardBadge: "Badge : Réparation Cellulaire"
  },
  {
    level: 38,
    cycleId: 2,
    title: "Étape 38 : Les Ancrages Sensoriels Pavlovien (Triggers Inconscients)",
    theme: "Désamorçage des Déclencheurs",
    question: "Pourquoi une odeur, un ton de voix ou un claquement de porte vous glace-t-il le sang instantanément ?",
    options: [
      "Parce que je suis devenue paranoïaque et méfiante envers tout le monde.",
      "Parce que cette personne est secrètement malveillante à mon égard.",
      "Parce qu'un micro-signal a réveillé un ancrage de défense passé que je peux désactiver en observant la réalité présente."
    ],
    correctOptionIndex: 2,
    explanation: "Le conditionnement pavlovien associe un stimulus neutre à une menace vitale. En nommant le stimulus ('Ce n'est qu'une porte qui claque'), on déconnecte la boucle réflexe.",
    reflectionPrompt: "Quel bruit ou signal habituel pouvez-vous recatégoriser aujourd'hui comme totalement inoffensif ?",
    benevolentAffirmation: "« Je reconnais le signal : c'est un écho d'hier, pas un danger d'aujourd'hui. »",
    unlockedRewardBadge: "Badge : Désamorçage Pavlovien"
  },
  {
    level: 39,
    cycleId: 2,
    title: "Étape 39 : Les Aimants Comportementaux & La Gravité de la Familiarité",
    theme: "Rupture des Répétitions Inconscientes",
    question: "Pourquoi sommes-nous parfois attirées inconsciemment par des personnes qui reproduisent les schémas qui nous ont blessées ?",
    options: [
      "Parce que je mérite d'être maltraitée et que je ne vaux rien de mieux.",
      "Parce que toutes les personnes sur Terre sont toxiques et manipulatrices.",
      "Parce que mon inconscient tente de clore une boucle inachevée du passé en croyant pouvoir rendre le danger sécurisant."
    ],
    correctOptionIndex: 2,
    explanation: "La 'compulsion de répétition' freudienne revisitée par la neurobiologie montre que le cerveau préfère le familier prévisible à l'inconnu, jusqu'à ce qu'on choisisse consciemment la sécurité saine.",
    reflectionPrompt: "Quel critère de paix et de respect mutuel imposez-vous désormais comme règle absolue dans toutes vos relations ?",
    benevolentAffirmation: "« Je renonce à réparer le passé. Je choisis l'inconnu sain et la douceur bienveillante. »",
    unlockedRewardBadge: "Badge : Clôture des Boucles Répétitives"
  },
  {
    level: 40,
    cycleId: 2,
    title: "Étape 40 : La Honte Secrète et le Masque Social",
    theme: "Intégration de l'Ombre & Auto-Amour",
    question: "Que cache réellement le sentiment de devoir paraître 'parfaite' et 'forte' en permanence devant les autres ?",
    options: [
      "Une réelle supériorité morale sur mon entourage.",
      "Une tromperie calculée pour manipuler mon monde.",
      "Une armure forgée par mon enfant intérieur pour cacher une blessure de honte qui a besoin d'amour et de vérité."
    ],
    correctOptionIndex: 2,
    explanation: "La honte toxique internalisée crée une armure de perfectionnisme épuisante. Se montrer authentique et vulnérable dans un cadre sûr brise le pouvoir de la honte.",
    reflectionPrompt: "Quelle imperfection ou fatigue osez-vous accueillir avec tendresse et bienveillance aujourd'hui ?",
    benevolentAffirmation: "« Je dépose l'armure. Je suis digne d'amour exactement telle que je suis, sans condition. »",
    unlockedRewardBadge: "Trophée : Libération de la Honte Toxique (Bloc 3 Validé)"
  },

  // --- BLOC 4 : BIOLOGIE DE LA GUÉRISON & NEUROPLASTICITÉ (Niv. 41 à 45) ---
  {
    level: 41,
    cycleId: 2,
    title: "Étape 41 : Le Cerveau Prédictif : L'Anxiété comme Erreur de Calcul",
    theme: "Cerveau Prédictif & Neurosciences",
    question: "Selon les neurosciences modernes (Lisa Feldman Barrett), comment reprogrammer l'anxiété anticipatoire ?",
    options: [
      "En luttant violemment contre mes pensées chaque seconde.",
      "En attendant passivement que mes circuits cérébraux changent avec l'âge.",
      "En apprenant à mon cerveau à recatégoriser mes battements de cœur non comme de la panique, mais comme de l'énergie mobilisée pour agir."
    ],
    correctOptionIndex: 2,
    explanation: "Le cerveau est une machine prédictive qui interprète les sensations corporelles selon nos croyances. Changer l'étiquette verbale transforme la neurochimie de l'éveil.",
    reflectionPrompt: "Lorsque votre cœur bat un peu vite, dites : 'Mon corps se prépare avec énergie'. Comment cela change-t-il votre ressenti ?",
    benevolentAffirmation: "« Je guide les prédictions de mon cerveau vers la force, le calme et la clarté. »",
    unlockedRewardBadge: "Badge : Maîtrise du Cerveau Prédictif"
  },
  {
    level: 42,
    cycleId: 2,
    title: "Étape 42 : Le Budget Corporel (Allostasie) et l'Épuisement Neurochimique",
    theme: "Charge Allostatique & Énergie Vitale",
    question: "Pourquoi une mauvaise humeur ou une tristesse subite est-elle parfois simplement une dette physiologique de sommeil ou d'eau ?",
    options: [
      "Parce que ma philosophie de vie est intrinsèquement défectueuse.",
      "Parce que les traumatismes détruisent irrévocablement la moralité.",
      "Parce que mon budget corporel est en déficit biologique et que mon cerveau coupe les coûts en générant des humeurs d'alerte."
    ],
    correctOptionIndex: 2,
    explanation: "L'allostasie gère les ressources énergétiques de l'organisme. Un déficit de sommeil, d'hydratation ou de nutriments envoie un signal d'affect négatif que le mental interprète à tort comme un problème existentiel.",
    reflectionPrompt: "De quel soin fondamental (verre d'eau pure, repos, repas nourrissant) votre corps a-t-il besoin en cet instant ?",
    benevolentAffirmation: "« Je recharge mon budget corporel avec respect et attention bienveillante. »",
    unlockedRewardBadge: "Badge : Gardienne de l'Allostasie"
  },
  {
    level: 43,
    cycleId: 2,
    title: "Étape 43 : La Reconsolidation Synaptique & L'Élimination de la Charge Émotionnelle",
    theme: "Reconsolidation Synaptique",
    question: "Est-il scientifiquement possible de se remémorer un souvenir difficile sans ressentir la moindre douleur corporelle ?",
    options: [
      "Non, un souvenir douloureux garde sa souffrance à vie.",
      "Oui, en effaçant totalement la mémoire par l'amnésie volontaire.",
      "Oui, car la reconsolidation neuronale transforme une blessure vive en une cicatrice guérie qui ne fait plus mal."
    ],
    correctOptionIndex: 2,
    explanation: "Lorsqu'un souvenir est réactivé dans un état de calme physiologique et d'auto-compassion, la protéine de mémoire est réenregistrée sans la charge d'effroi (reconsolidation synaptique).",
    reflectionPrompt: "Pensez à un obstacle surmonté avec le recul du présent : constatez que la cicatrice est solide et ne saigne plus.",
    benevolentAffirmation: "« Mes souvenirs deviennent des bibliothèques de sagesse, débarrassés de tout venin. »",
    unlockedRewardBadge: "Badge : Alchimie Synaptique"
  },
  {
    level: 44,
    cycleId: 2,
    title: "Étape 44 : L'Épigénétique : L'Environnement Supérieur aux Gènes (Dr Bruce Lipton)",
    theme: "Épigénétique & Régénération",
    question: "Sommes-nous condamnées par notre hérédité ou les traumas subis dans le passé ?",
    options: [
      "Oui, mon ADN contient la fatalité de ma souffrance.",
      "Non, les gènes n'ont absolument aucune influence sur le corps.",
      "Non, car la modification de mon environnement intérieur et relationnel envoie de nouveaux signaux chimiques qui réparent l'activité cellulaire."
    ],
    correctOptionIndex: 2,
    explanation: "L'épigénétique démontre que les signaux environnementaux (pensées bienveillantes, alimentation, relations sécurisantes) modulent l'expression de nos gènes et favorisent la régénération.",
    reflectionPrompt: "Quel environnement sain et apaisant construisez-vous aujourd'hui pour faire chanter vos cellules ?",
    benevolentAffirmation: "« Je suis l'architecte de mon environnement intérieur. Mes cellules vibrent de renouveau et de vie. »",
    unlockedRewardBadge: "Badge : Épigénétique de Guérison"
  },
  {
    level: 45,
    cycleId: 2,
    title: "Étape 45 : L'Alignement des 3 M (Image, Émotion, Sensation)",
    theme: "Alignement Psycho-Somatique",
    question: "Quelle est la clé pour reprogrammer durablement votre vision d'avenir et attirer des relations saines ?",
    options: [
      "Répéter des mots mécaniques dans ma tête sans rien ressentir dans mon corps.",
      "Attendre qu'un miracle extérieur modifie ma vie sans participation interne.",
      "Visualiser ma liberté en ressentant dès maintenant la paix dans ma poitrine et la détente dans mon diaphragme."
    ],
    correctOptionIndex: 2,
    explanation: "Le cerveau émotionnel apprend lorsque l'image mentale (pensée), l'émotion positive (cœur) et la sensation somatique (corps détendu) sont parfaitement synchronisées.",
    reflectionPrompt: "Fermez les yeux 10 secondes : voyez-vous souriante, libre et épanouie. Ressentez la chaleur dans votre poitrine.",
    benevolentAffirmation: "« Mon esprit, mon cœur et mon corps chantent à l'unisson la symphonie de ma liberté. »",
    unlockedRewardBadge: "Trophée : Triade Psycho-Somatique Validée (Bloc 4)"
  },

  // --- BLOC 5 : LA SOUVERAINETÉ RELATIONNELLE & L'INTÉGRATION FINALE (Niv. 46 à 50) ---
  {
    level: 46,
    cycleId: 2,
    title: "Étape 46 : De la Blessure à la Cicatrice (Sortir du Rôle de Victime Éternelle)",
    theme: "Souveraineté Post-Traumatique",
    question: "Comment regarder son passé sans s'y enfermer ni se définir uniquement par ses souffrances ?",
    options: [
      "Comme un gouffre qui définit mon identité et prouve que je suis fragile.",
      "Comme un prétexte pour justifier mes propres comportements destructeurs.",
      "Comme une épreuve initiatique qui a forgé ma sagesse et dont je suis sortie vivante et souveraine."
    ],
    correctOptionIndex: 2,
    explanation: "La croissance post-traumatique (Tedeschi & Calhoun) transforme la blessure en marque de bravoure et en boussole éthique pour guider sa vie avec une autorité bienveillante.",
    reflectionPrompt: "Quel trésor de discernement et de compassion avez-vous extrait de vos tempêtes passées ?",
    benevolentAffirmation: "« Je ne suis pas ce qui m'est arrivé : je suis ce que j'ai choisi de devenir avec éclat et dignité. »",
    unlockedRewardBadge: "Badge : Alchimie de l'Héroïne"
  },
  {
    level: 47,
    cycleId: 2,
    title: "Étape 47 : L'Intégration des Ombres (Cesser de Combattre ses Parties Blessées)",
    theme: "Intégration des Parties Intérieures (IFS)",
    question: "Que faire de cette voix intérieure qui a parfois peur, doute ou s'emporte sans crier gare ?",
    options: [
      "L'étouffer sous des divertissements ou des dépendances pour ne rien sentir.",
      "La laisser exploser violemment sur les autres sans filtre.",
      "L'écouter comme une messagère intérieure et lui apporter la tendresse qu'elle n'a pas eue jadis."
    ],
    correctOptionIndex: 2,
    explanation: "Selon le modèle IFS (Système Familial Intérieur du Dr Richard Schwartz), chaque part protectrice ou blessée cherche la sécurité. L'accueillir avec compassion apaise la discorde interne.",
    reflectionPrompt: "Prenez dans vos bras mentaux votre partie qui a peur et murmurez-lui : 'Je suis là maintenant, je te protège'.",
    benevolentAffirmation: "« J'accueille toutes mes parts intérieures dans l'amour. Mon sanctuaire est un foyer d'harmonie. »",
    unlockedRewardBadge: "Badge : Réconciliation des Ombres"
  },
  {
    level: 48,
    cycleId: 2,
    title: "Étape 48 : La Rose de Permission & Les Frontières Inviolables",
    theme: "Frontières Émotionnelles Saines",
    question: "Pourquoi poser des limites fermes et dire un 'Non' clair est-il un acte d'amour suprême ?",
    options: [
      "Pour dominer l'autre et lui montrer qui commande.",
      "Parce que je dois rejeter tout le monde pour rester en sécurité.",
      "Pour préserver mon énergie vitale et n'accueillir dans mon sanctuaire que ce qui honore ma dignité."
    ],
    correctOptionIndex: 2,
    explanation: "Les limites saines ne sont pas des murs pour exclure, mais des portes avec serrure pour protéger ce qui est sacré en soi.",
    reflectionPrompt: "Quel 'Non' libérateur avez-vous posé récemment pour préserver votre paix intérieure ?",
    benevolentAffirmation: "« Mon Non est sacré. Il protège mon Oui à la paix, à la dignité et à la joie. »",
    unlockedRewardBadge: "Badge : Gardienne des Frontières d'Or"
  },
  {
    level: 49,
    cycleId: 2,
    title: "Étape 49 : Le Pardon Déconditionné à Son Enfant Intérieur",
    theme: "Auto-Absolution Totale",
    question: "Comment guérir la rancœur que l'on porte parfois contre soi-même pour être 'restée trop longtemps' dans une situation toxique ?",
    options: [
      "En me répétant chaque jour ce que j'aurais dû faire différemment.",
      "En rejetant 100% de la responsabilité sur les autres sans introspection.",
      "En comprenant que j'ai agi avec le niveau de conscience et les ressources dont je disposais alors, et en m'accordant une absolution totale."
    ],
    correctOptionIndex: 2,
    explanation: "Le pardon à soi-même est l'acte thérapeutique suprême. Comprendre la sidération et l'emprise permet de déposer définitivement le fouet de l'autocritique.",
    reflectionPrompt: "Formulez à votre enfant intérieur l'absolution la plus douce et la plus complète de votre vie.",
    benevolentAffirmation: "« Je me pardonne absolument et inconditionnellement. J'ai fait de mon mieux, et aujourd'hui je suis libre. »",
    unlockedRewardBadge: "Badge : Absolution Sacrée"
  },
  {
    level: 50,
    cycleId: 2,
    title: "Étape 50 : Le Couronnement du Cycle 2 : Le Bouclier Doré de Résilience",
    theme: "Consécration du Cycle 2 (Demi-Centenaire de Guérison)",
    question: "Au sommet de ce Cycle 2 (Niveau 50), forte de votre compréhension somatique et neurobiologique, quel est votre engagement souverain ?",
    options: [
      "Surveiller chaque personne avec méfiance pour ne plus jamais souffrir.",
      "Exiger des excuses de tous ceux qui m'ont blessée avant de continuer à vivre.",
      "Devenir la protectrice bienveillante de ma propre paix et poursuivre ma renaissance avec foi et souveraineté."
    ],
    correctOptionIndex: 2,
    explanation: "Félicitations ! Le franchissement du Niveau 50 consacre votre maîtrise des mécanismes du trauma et de la neurobiologie. Vous possédez désormais le Bouclier Doré de Souveraineté (+100 pts).",
    reflectionPrompt: "Écrivez votre proclamation de souveraineté pour célébrer le cap du demi-siècle de guérison (Niveau 50) :",
    benevolentAffirmation: "« Mon corps est mon temple, mon esprit est mon allié. Je suis la reine souveraine de ma paix intérieure. »",
    unlockedRewardBadge: "Trophée Suprême : Bouclier Doré de Souveraineté (Cycle 2 Accompli 🏆)"
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
  },

  // ==========================================
  // CYCLE 5 : NIVEAUX SECRETS BONUS 101 À 111 (Les Mystères du Kybalion & Le Sacre de l'Éveillée)
  // ==========================================
  {
    level: 101,
    cycleId: 5,
    title: "Niveau 101 • Arcane 1 : Le Principe du Mentalisme (« Le Tout est Esprit »)",
    theme: "Hermétisme & Mentalisme",
    question: "Où réside la source véritable de votre réalité et de votre paix inébranlable ?",
    options: [
      "Dans le contrôle et la manipulation des actions des autres.",
      "Dans la fatalité des événements matériels extérieurs.",
      "Dans la maîtrise sereine de mes pensées et de mes représentations intérieures."
    ],
    correctOptionIndex: 2,
    explanation: "« Le Tout est Esprit ; l'Univers est Mental. » Votre univers intérieur est le seul créateur de votre expérience.",
    reflectionPrompt: "Quelle pensée source choisissez-vous de sanctifier en vous aujourd'hui ?",
    benevolentAffirmation: "« Mon esprit est le temple créateur de ma paix et de ma réalité sacrée. »",
    unlockedRewardBadge: "Arcane I : Le Sceptre de l'Esprit Mental"
  },
  {
    level: 102,
    cycleId: 5,
    title: "Niveau 102 • Arcane 2 : Le Principe de Correspondance (« Ce qui est en haut... »)",
    theme: "Hermétisme & Correspondance",
    question: "Comment aligner votre monde extérieur avec votre désir de paix profonde ?",
    options: [
      "En exigeant que le monde change avant de faire le moindre travail intérieur.",
      "En m'isolant totalement de toute interaction humaine.",
      "En cultivant l'amour et l'harmonie en moi pour qu'ils s'expriment naturellement autour de moi."
    ],
    correctOptionIndex: 2,
    explanation: "« Ce qui est en haut est comme ce qui est en bas ; ce qui est au-dedans est comme ce qui est au-dehors. » Le microcosme reflète le macrocosme.",
    reflectionPrompt: "Quel ordre et quelle beauté intérieure installez-vous pour éclairer votre environnement ?",
    benevolentAffirmation: "« Comme en mon cœur, ainsi dans mon monde : tout s'aligne dans l'harmonie. »",
    unlockedRewardBadge: "Arcane II : Le Miroir Céleste de Correspondance"
  },
  {
    level: 103,
    cycleId: 5,
    title: "Niveau 103 • Arcane 3 : Le Principe de Vibration (« Rien n'est immobile »)",
    theme: "Hermétisme & Fréquence Vibratoire",
    question: "Face à une ambiance pesante ou toxique, comment préserver votre état d'être ?",
    options: [
      "En vibrant à la même fréquence de peur et de colère.",
      "En niant ce que je ressens jusqu'à ce que tout disparaisse.",
      "En élevant mon taux vibratoire par la gratitude, la beauté et la présence consciente."
    ],
    correctOptionIndex: 2,
    explanation: "« Rien ne repose ; tout remue ; tout vibre. » Une vibration plus élevée transmute toujours une vibration plus basse.",
    reflectionPrompt: "Quelle pensée de gratitude pure élève immédiatement votre fréquence en cet instant ?",
    benevolentAffirmation: "« Je vibre sur la fréquence inaltérable de la sérénité et de l'amour pur. »",
    unlockedRewardBadge: "Arcane III : Le Diapason d'Or Vibratoire"
  },
  {
    level: 104,
    cycleId: 5,
    title: "Niveau 104 • Arcane 4 : Le Principe de Polarité (« Tout est double »)",
    theme: "Hermétisme & Transmutation des Pôles",
    question: "Comment transmuter une peur persistante en une force protectrice lumineuse ?",
    options: [
      "En la refoulant violemment pour ne jamais la voir.",
      "En m'y complaisant pour nourrir ma rancœur.",
      "En glissant le long du curseur vibratoire pour orienter mon attention vers son pôle lumineux d'auto-amour."
    ],
    correctOptionIndex: 2,
    explanation: "« La peur et le courage ne sont que les deux pôles d'une même énergie. » Transmuter consiste simplement à changer de degré sur l'échelle.",
    reflectionPrompt: "Sur quelle polarité lumineuse orientez-vous votre curseur mental aujourd'hui ?",
    benevolentAffirmation: "« Je transmute l'ombre en lumière. Tout paradoxe se réconcilie en mon centre. »",
    unlockedRewardBadge: "Arcane IV : Le Caducée de la Polarité Unifiée"
  },
  {
    level: 105,
    cycleId: 5,
    title: "Niveau 105 • Arcane 5 : Le Principe de Rythme (« La marée monte et descend »)",
    theme: "Hermétisme & Cycles du Pendule",
    question: "Quand une journée semble plus lente ou introspective, comment accueillir ce flux ?",
    options: [
      "Paniquer en croyant que tous mes progrès sont perdus.",
      "Combattre le cycle naturel en forçant une fausse joie artificielle.",
      "Observer le mouvement du pendule avec calme, sachant que la clarté revient toujours."
    ],
    correctOptionIndex: 2,
    explanation: "« Tout s'écoule, au-dedans et au-dehors ; la mesure du mouvement à droite est la mesure du mouvement à gauche. » Le rythme compense et guérit.",
    reflectionPrompt: "Comment honorez-vous vos temps de repli fécond comme la promesse du renouveau ?",
    benevolentAffirmation: "« Je danse avec les marées de la vie. Rien ne m'emporte, car je suis le roc immobile. »",
    unlockedRewardBadge: "Arcane V : Le Pendule Sacré du Rythme"
  },
  {
    level: 106,
    cycleId: 5,
    title: "Niveau 106 • Arcane 6 : Le Principe de Causalité (« Toute cause a son effet »)",
    theme: "Hermétisme & Maîtrise des Causes",
    question: "Comment cesser d'être le 'jouet des circonstances' pour devenir la cause première de votre destinée ?",
    options: [
      "En accusant le destin et la malchance à chaque contrariété.",
      "En laissant les autres décider à ma place pour éviter les erreurs.",
      "En posant des intentions claires et en assumant la pleine responsabilité de mes choix."
    ],
    correctOptionIndex: 2,
    explanation: "« Le hasard n'est qu'un nom donné à la loi non reconnue. » L'initiée devient la cause au lieu de subir les effets.",
    reflectionPrompt: "Quelle noble cause de paix et de liberté initiez-vous par vos actes aujourd'hui ?",
    benevolentAffirmation: "« Je suis la cause souveraine de mon épanouissement. Mon vouloir est pur et agissant. »",
    unlockedRewardBadge: "Arcane VI : La Clé des Causes Premières"
  },
  {
    level: 107,
    cycleId: 5,
    title: "Niveau 107 • Arcane 7 : Le Principe de Genre (« Le masculin et le féminin créent »)",
    theme: "Hermétisme & Union Alchimique Sacrée",
    question: "Comment manifester votre pleine puissance de création dans le sanctuaire de votre vie ?",
    options: [
      "Utiliser uniquement la force dure et le combat permanent.",
      "Rester dans une passivité totale sans jamais poser de structure.",
      "Marier la bienveillance intuitive du Féminin à la clarté protectrice et structurée du Masculin."
    ],
    correctOptionIndex: 2,
    explanation: "« Le Genre est en tout ; tout a ses principes Masculin et Féminin. » La vraie souveraineté naît du mariage intérieur de la force et de la douceur.",
    reflectionPrompt: "Comment vos intuitions profondes se concrétisent-elles par des actions structurées et nettes ?",
    benevolentAffirmation: "« J'unis en moi la sagesse réceptive et la puissance d'action. Je suis complète et féconde. »",
    unlockedRewardBadge: "Arcane VII : L'Union Alchimique Sacrée"
  },
  {
    level: 108,
    cycleId: 5,
    title: "Niveau 108 • Arcane 8 : La Transmutation Mentale (Changer le plomb en or intérieur)",
    theme: "Alchimie Hermétique Supérieure",
    question: "Que deviennent les épreuves passées lorsque vous pratiquez l'alchimie hermétique ?",
    options: [
      "Elles restent un poison indélébile dans ma mémoire.",
      "Elles sont effacées comme si je n'avais jamais existé.",
      "Elles sont transmutées en un trésor inaltérable de lucidité, de force et de compassion."
    ],
    correctOptionIndex: 2,
    explanation: "« L'Art de la Transmutation Mentale est la véritable Alchimie Hermétique. » La souffrance passée devient le carburant noble de votre lumière.",
    reflectionPrompt: "Quel métal brut de votre passé brille aujourd'hui de l'or de votre sagesse ?",
    benevolentAffirmation: "« Je suis l'alchimiste de mon existence. Tout ce que je touche en moi se transmute en lumière. »",
    unlockedRewardBadge: "Arcane VIII : La Pierre Philosophale d'Or"
  },
  {
    level: 109,
    cycleId: 5,
    title: "Niveau 109 • Arcane 9 : La Neutralisation du Pendule (Rester au centre du cyclone)",
    theme: "Neutralisation & Élévation de Plan",
    question: "Face aux tempêtes du monde extérieur, comment rester parfaitement sereine et imperturbable ?",
    options: [
      "En coupant tout contact avec le monde réel.",
      "En m'agitant au rythme des provocations d'autrui.",
      "En m'ancrant dans mon Sanctuaire intérieur intouchable, au-dessus des oscillations émotionnelles."
    ],
    correctOptionIndex: 2,
    explanation: "« Par l'Élévation de Plan, le Maître neutralise l'oscillation du pendule et demeure fixé au pôle supérieur. »",
    reflectionPrompt: "Ressentez ce point central d'immobilité parfaite au cœur même de votre poitrine.",
    benevolentAffirmation: "« Je réside au centre du cyclone. Le monde s'agite, mais mon sanctuaire reste immaculé. »",
    unlockedRewardBadge: "Arcane IX : L'Axe Immuable du Centre"
  },
  {
    level: 110,
    cycleId: 5,
    title: "Niveau 110 • Arcane 10 : L'Autorité Souveraine de la Volonté Pure",
    theme: "Volonté Hermétique Pure",
    question: "Qu'est-ce que la véritable souveraineté spirituelle et psychique selon la tradition des Mystères ?",
    options: [
      "La domination orgueilleuse sur les faiblesses des autres.",
      "L'illusion de tout contrôler par l'hypervigilance.",
      "La certitude paisible que je suis la créatrice sacrée et protégée de ma propre existence."
    ],
    correctOptionIndex: 2,
    explanation: "La Volonté Pure n'est pas un effort forcé, mais un alignement parfait avec la Vérité, la Justice et l'Amour universel.",
    reflectionPrompt: "Quelle vérité inébranlable proclamez-vous sur votre chemin de vie avec une absolue certitude ?",
    benevolentAffirmation: "« Ma volonté est pure, juste et invincible. Je marche libre sous la voûte des étoiles. »",
    unlockedRewardBadge: "Arcane X : Le Sceau Royal de la Volonté Pure"
  },
  {
    level: 111,
    cycleId: 5,
    title: "Niveau 111 • Arcane 11 : Le Sacre de l'Initiée — L'Éveil Absolu",
    theme: "Sacre Suprême [ÉVEILLÉ]",
    question: "Au 111e et ultime niveau de la sagesse universelle d'HAVEN-ELLE, qui contemplez-vous dans le miroir divin ?",
    options: [
      "Une survivante fragilisée qui craint le lendemain.",
      "Une personne en quête permanente d'approbation extérieure.",
      "Une femme souveraine, éveillée, maîtresse de sa vibration et sanctuaire de bienveillance inconditionnelle."
    ],
    correctOptionIndex: 2,
    explanation: "👑 CONSÉCRATION ULTIME : Vous avez accompli le Grand Œuvre des 111 Niveaux. Vous recevez le Trophée Légendaire [ÉVEILLÉ] et le Grand Sceau Cosmique d'HAVEN-ELLE (+500 pts).",
    reflectionPrompt: "Gravez pour l'éternité votre serment d'Éveillée, maîtresse de son destin et phare de bienveillance :",
    benevolentAffirmation: "« JE SUIS ÉVEILLÉE. Je suis le temple vivant de la sagesse, libre, souveraine et à jamais invulnérable. »",
    unlockedRewardBadge: "🏆 Trophée Suprême Légendaire : [ÉVEILLÉ] — Le Grand Sceau Cosmique d'HAVEN-ELLE (Palier 111)"
  }
];

export function getComplete100HealingQuestion(level: number): Healing100QuestionItem {
  const target = Math.min(111, Math.max(1, level));
  const found = COMPLETE_100_HEALING_QUESTIONS.find(q => q.level === target);
  if (found) return found;
  return COMPLETE_100_HEALING_QUESTIONS[0];
}
