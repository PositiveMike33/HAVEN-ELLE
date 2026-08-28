import { Healing100QuestionItem } from '../resilience100QuestionsData';

// ============================================================================
// CYCLE 4 : NIVEAUX 76 À 100 (Amour Inconditionnel, Acceptation & Sanctuaire Éternel)
// Répartition aléatoire équilibrée des options correctes (A, B, C)
// ============================================================================
export const CYCLE_4_QUESTIONS: Healing100QuestionItem[] = [
  // --- BLOC 1 : NIVEAUX 76 À 80 • LE PARDON RADICAL À SOI-MÊME & L'ENFANT INTÉRIEUR ---
  {
    level: 76,
    cycleId: 4,
    title: "Étape 76 : L'Ouverture du Cœur Sacré",
    theme: "Amour Inconditionnel • L'Amour sans Peur",
    question: "Après avoir reconstruit votre sécurité et votre discernement, comment oser rouvrir votre cœur à la beauté de la vie sans crainte d'être brisée ?",
    options: [
      "En sachant que mon sanctuaire intérieur est désormais inviolable : mon cœur peut aimer et rayonner car je sais exactement comment me protéger.",
      "En m'imposant une armure d'acier pour ne plus jamais rien ressentir.",
      "En accordant aveuglément ma confiance à la première personne venue."
    ],
    correctOptionIndex: 0, // A
    explanation: "Le véritable amour de soi ne consiste pas à s'emmurer, mais à ouvrir son cœur en sachant qu'on possède désormais des frontières saines et inébranlables.",
    reflectionPrompt: "Quelle douce chaleur ressentez-vous au centre de votre poitrine lorsque vous vous autorisez à aimer la vie à nouveau ?",
    benevolentAffirmation: "« Mon cœur est un sanctuaire d'amour pur et protégé. Je rayonne la bienveillance en toute souveraineté. »",
    unlockedRewardBadge: "Badge : Clé du Cœur Sacré"
  },
  {
    level: 77,
    cycleId: 4,
    title: "Étape 77 : Le Pardon Radical envers Toutes ses Anciennes Faiblesses",
    theme: "Pardon à Soi-Même • Absolution des Moments de Vulnérabilité",
    question: "Face aux souvenirs où vous vous êtes sentie 'impuissante', 'aveugle' ou 'trop gentille', quelle absolution totale vous accordez-vous ?",
    options: [
      "Je continue à me reprocher chaque faux pas pour m'assurer de ne plus faiblir.",
      "Je pardonne à chaque cellule de mon être : mon innocence et ma bonté étaient magnifiques, c'est l'abus qui était abject.",
      "Je supprime tous mes souvenirs pour faire comme si rien n'avait existé."
    ],
    correctOptionIndex: 1, // B
    explanation: "Blâmer sa propre bonté est le piège ultime de l'emprise. Vous pardonner entièrement rétablit l'estime de soi dans sa noblesse originelle.",
    reflectionPrompt: "Quel baiser d'absolution et d'amour infini déposez-vous sur l'histoire de vos blessures ?",
    benevolentAffirmation: "« Je me pardonne tout, absolument tout. Mon innocence est pure et mon âme est immaculée. »",
    unlockedRewardBadge: "Badge : Sceau d'Absolution Radicale"
  },
  {
    level: 78,
    cycleId: 4,
    title: "Étape 78 : L'Adoption Éternelle de l'Enfant Intérieur",
    theme: "Enfant Intérieur • Le Serment d'Adoption Sacrée",
    question: "Quel serment éternel d'amour inconditionnel prononcez-vous face au miroir pour rassurer définitivement votre enfant intérieure ?",
    options: [
      "« Tu dois être parfaite pour que je t'aime. »",
      "« Si tu pleures encore, je te laisserai seule. »",
      "« Quoi que tu fasses, quoi qu'il arrive, je t'aime, je te protège et je serai toujours à tes côtés pour veiller sur toi. »"
    ],
    correctOptionIndex: 2, // C
    explanation: "L'amour inconditionnel est un engagement de présence inébranlable : être le parent aimant qui ne pose aucune condition à son affection.",
    reflectionPrompt: "Regardez vos yeux dans le miroir ou en pensée et dites ce serment d'amour à la petite fille en vous.",
    benevolentAffirmation: "« Mon enfant intérieure est chérie, protégée et sanctifiée pour l'éternité. Rien ne nous séparera jamais. »",
    unlockedRewardBadge: "Badge : Diadème de l'Enfant Chérie"
  },
  {
    level: 79,
    cycleId: 4,
    title: "Étape 79 : La Guérison des Lignées et Mémoires Transgénérationnelles",
    theme: "Psychogénéalogie • Rupture des Chaînes du Silence",
    question: "En choisissant de guérir et de vous aimer inconditionnellement, quel cadeau prodigieux offrez-vous à vos ancêtres et aux générations futures ?",
    options: [
      "Je brise les chaînes de la soumission et du silence transmises depuis des générations : la malédiction s'arrête avec moi et la lumière commence.",
      "Je reproduis fidèlement les souffrances de ma lignée pour leur être fidèle.",
      "Je coupe tout lien avec l'histoire humaine sans rien en tirer."
    ],
    correctOptionIndex: 0, // A
    explanation: "La résilience individuelle est un acte de libération transgénérationnelle : en guérissant votre cœur, vous affranchissez toute votre lignée.",
    reflectionPrompt: "Quelle bénédiction de liberté et de souveraineté envoyez-vous à votre lignée de femmes courageuses ?",
    benevolentAffirmation: "« Je suis celle par qui la guérison arrive. Les chaînes du passé sont brisées, la lumière triomphe. »",
    unlockedRewardBadge: "Badge : Flambeau Transgénérationnel"
  },
  {
    level: 80,
    cycleId: 4,
    title: "Étape 80 : L'Acceptation Bienveillante de Tout ce Qui Est (Palier 80)",
    theme: "Consécration du Bloc 1 • Paix avec son Histoire Intégrale",
    question: "En atteignant ce 80e sommet, quelle paix majestueuse s'installe lorsque vous dites 'OUI' à l'ensemble de votre parcours de vie ?",
    options: [
      "Une tristesse amère face au temps perdu.",
      "La réalisation sublime que chaque épreuve a été le creuset alchimique d'où émerge la femme forte, lumineuse et souveraine que je suis aujourd'hui.",
      "Une colère sourde contre le destin."
    ],
    correctOptionIndex: 1, // B
    explanation: "L'Amor Fati (aimer son destin) ne justifie pas le mal subi, mais honore la grandeur de l'or forgé dans le feu de l'épreuve.",
    reflectionPrompt: "Dites avec un sourire profond : 'Oui à ma vie, oui à ma force, oui à ma renaissance !' Que ressentez-vous ?",
    benevolentAffirmation: "« J'embrasse mon histoire avec grâce. Mon passé est le terreau sacré de ma souveraineté éclatante. »",
    unlockedRewardBadge: "Trophée : Joyau d'Amour Pur (Palier 80 Validé)"
  },

  // --- BLOC 2 : NIVEAUX 81 À 85 • TRANSMUTATION DE LA RANCŒUR EN FORCE SEREINE ---
  {
    level: 81,
    cycleId: 4,
    title: "Étape 81 : Le Pardon Thérapeutique comme Coupe-Lien Toxique",
    theme: "Pardon Thérapeutique • Libération des Cordes Émotionnelles",
    question: "Pourquoi le pardon thérapeutique n'a-t-il rien à voir avec le fait d'excuser le bourreau ou de se réconcilier avec lui ?",
    options: [
      "Parce que pardonner signifie inviter immédiatement la personne toxique à revenir à la maison.",
      "Parce que pardonner est une obligation religieuse sous peine de punition divine.",
      "Parce que le pardon est un acte unilatéral pour SOI-MÊME : couper la corde invisible de la rancœur pour ne plus laisser l'agresseur habiter gratuitement dans notre tête."
    ],
    correctOptionIndex: 2, // C
    explanation: "Garder de la haine, c'est boire du poison en espérant que l'autre meure. Le pardon coupe le cordon ombilical de la souffrance pour vous rendre totalement libre.",
    reflectionPrompt: "Quelle corde invisible de rancœur coupez-vous aujourd'hui pour récupérer 100% de votre espace mental ?",
    benevolentAffirmation: "« Je coupe tout lien d'amertume. Je reprends mon énergie et je marche dans la liberté absolue. »",
    unlockedRewardBadge: "Badge : Lame d'Or Coupe-Liens"
  },
  {
    level: 82,
    cycleId: 4,
    title: "Étape 82 : Transmuter le Venin en Carburant d'Élévation",
    theme: "Alchimie Intérieure • Transmutation Énergétique",
    question: "Comment transformer l'injustice subie en une énergie inépuisable pour créer, aider, bâtir et illuminer le monde ?",
    options: [
      "En utilisant cette expérience comme le socle d'une empathie indestructible et d'une détermination sans faille à vivre une vie splendide.",
      "En ruminant la vengeance jour et nuit.",
      "En attendant que le karma punisse les coupables devant mes yeux."
    ],
    correctOptionIndex: 0, // A
    explanation: "La meilleure réponse à la destruction passée est la création d'une vie rayonnante, généreuse et pleine de sens.",
    reflectionPrompt: "Quel beau projet ou geste de bienveillance va naître de votre force retrouvée ?",
    benevolentAffirmation: "« Mon épreuve est devenue ma sagesse. Je transmute le plomb du passé en or de vie et de lumière. »",
    unlockedRewardBadge: "Badge : Creuset d'Alchimie Sereine"
  },
  {
    level: 83,
    cycleId: 4,
    title: "Étape 83 : La Clôture Définitive des Comptes et des Dettes",
    theme: "Détachement Karmique • Déclaration de Dette Éteinte",
    question: "Face au sentiment que l'autre vous 'doit' des excuses, du temps ou de l'argent qu'il ne rendra jamais, quel acte souverain posez-vous ?",
    options: [
      "Passer le reste de ma vie devant les tribunaux pour un centime symbolique.",
      "Déclarer solennellement : 'Je déclare cette dette éteinte dans mon cœur. Ma liberté et ma paix d'esprit valent infiniment plus que tout ce que tu pourrais me rendre'.",
      "Supplier l'autre de reconnaître sa culpabilité."
    ],
    correctOptionIndex: 1, // B
    explanation: "Attendre le remboursement moral d'un individu toxique maintient la chaîne de dépendance. Éteindre la dette vous libère instantanément.",
    reflectionPrompt: "Prononcez : 'Je déclare la dette éteinte. Je suis quitte, libre et souveraine.' Quel soulagement ressentez-vous ?",
    benevolentAffirmation: "« Mes comptes sont clos, mes dettes d'ombre sont éteintes. Rien ne me retient : je suis libre comme l'air. »",
    unlockedRewardBadge: "Badge : Sceau de Dette Éteinte"
  },
  {
    level: 84,
    cycleId: 4,
    title: "Étape 84 : L'Indifférence Sereine (Le Vrai Triomphe)",
    theme: "Victoire Intérieure • De la Haine à l'Indifférence Bienveillante",
    question: "Quel est le signe irréfutable que vous avez atteint la guérison émotionnelle intégrale vis-à-vis d'une personne toxique du passé ?",
    options: [
      "Ressentir une rage brûlante à chaque fois qu'on entend son prénom.",
      "Vouloir à tout prix lui prouver qu'on a réussi sa vie sans elle.",
      "Éprouver une neutralité paisible et une indifférence sereine : son existence ne provoque plus aucune onde de choc dans votre corps."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le contraire de l'amour n'est pas la haine (qui est encore un lien passionnel), mais l'indifférence calme d'un esprit totalement guéri.",
    reflectionPrompt: "Constatez avec joie comme ce prénom ou ce souvenir a perdu toute charge électrique dans votre ventre.",
    benevolentAffirmation: "« Mon cœur est apaisé. Le passé est neutre, mon présent est radieux, mon avenir est infini. »",
    unlockedRewardBadge: "Badge : Fleur d'Indifférence Sereine"
  },
  {
    level: 85,
    cycleId: 4,
    title: "Étape 85 : La Bénédiction du Chemin Parcouru (Palier 85)",
    theme: "Consécration du Bloc 2 • Gratitude pour la Guérison Réalisée",
    question: "En validant cette 85e étape, quel hommage majestueux rendez-vous à votre propre bravoure et résilience ?",
    options: [
      "Je me remercie du plus profond de mon âme pour chaque larme essuyée, chaque pas franchi dans le noir et chaque victoire remportée.",
      "Je minimise mes efforts en disant que tout le monde aurait fait pareil.",
      "Je cherche déjà quel nouveau problème je pourrais me créer."
    ],
    correctOptionIndex: 0, // A
    explanation: "Prendre le temps d'honorer sa propre grandeur consolide la mémoire autobiographique positive et renforce la résilience pérenne.",
    reflectionPrompt: "Quelle médaille d'honneur imaginaire épinglez-vous sur votre cœur pour célébrer votre bravoure ?",
    benevolentAffirmation: "« Je m'incline avec respect devant mon propre courage. Je suis une héroïne de vie et d'amour. »",
    unlockedRewardBadge: "Trophée : Étoile de Bravoure Émotionnelle (Palier 85 Validé)"
  },

  // --- BLOC 3 : NIVEAUX 86 À 90 • L'AMOUR SANS CONDITION & LA FIN DU JUGEMENT INTÉRIEUR ---
  {
    level: 86,
    cycleId: 4,
    title: "Étape 86 : L'Auto-Compassion Féroce (Kristin Neff)",
    theme: "Psychologie Clinique • Compassion Féroce vs Tendre",
    question: "Qu'est-ce que l'auto-compassion 'féroce' et comment complète-t-elle l'auto-compassion tendre ?",
    options: [
      "C'est se punir violemment chaque fois qu'on fait une erreur.",
      "C'est l'énergie protectrice et courageuse qui dit 'NON' à l'injustice, trace des frontières nettes et défend nos besoins avec fermeté.",
      "C'est attaquer les autres sans aucune raison."
    ],
    correctOptionIndex: 1, // B
    explanation: "Kristin Neff démontre que la compassion a deux visages : la douceur réconfortante (yin) et le courage protecteur qui met fin à l'abus (yang).",
    reflectionPrompt: "Comment équilibrez-vous dans votre vie la douceur envers vous-même et la fermeté protectrice envers l'extérieur ?",
    benevolentAffirmation: "« Mon auto-compassion est à la fois un refuge de douceur et un rempart inébranlable de justice. »",
    unlockedRewardBadge: "Badge : Bouclier de Compassion Féroce"
  },
  {
    level: 87,
    cycleId: 4,
    title: "Étape 87 : La Fin Définitive du Tribunal Intérieur",
    theme: "Déconstruction Psychique • Dissolution du Tribunal Intime",
    question: "Comment dissoudre une bonne fois pour toutes la salle d'audience mentale où vous vous jugiez continuellement coupable ?",
    options: [
      "En nommant un nouvel avocat plus sévère dans ma tête.",
      "En continuant les procès la nuit pour ne pas perdre de temps.",
      "En prononçant l'acquittement définitif de mon être et en fermant le tribunal : il n'y a plus de juge, plus d'accusée, il n'y a qu'un être humain qui apprend et grandit."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le tribunal intérieur était une intériorisation des voix abusives. Le fermer définitivement restaure la paix démocratique de l'esprit.",
    reflectionPrompt: "Visualisez les portes du tribunal intérieur se fermer à clé pour toujours. Quelle immense respiration prenez-vous ?",
    benevolentAffirmation: "« Mon tribunal est aboli. Je vis sous la loi de la bienveillance, de la grâce et de l'auto-amour. »",
    unlockedRewardBadge: "Badge : Sceau d'Acquittement Perpétuel"
  },
  {
    level: 88,
    cycleId: 4,
    title: "Étape 88 : S'Aimer dans ses Imperfections et ses Vulnérabilités",
    theme: "Philosophie du Kintsugi • La Beauté des Cicatrices Dorées",
    question: "Selon la sagesse japonaise du Kintsugi (l'art de réparer la céramique brisée avec de l'or pur), que révèlent vos cicatrices passées ?",
    options: [
      "Qu'un vase brisé réparé à l'or est infiniment plus précieux, fort et beau que s'il n'avait jamais été cassé.",
      "Qu'il faut cacher toutes ses fêlures sous de la peinture grise.",
      "Qu'un objet réparé doit être jeté à la poubelle immédiatement."
    ],
    correctOptionIndex: 0, // A
    explanation: "Vos fêlures comblées par l'or de votre résilience font de vous un chef-d'œuvre unique de sagesse, de compassion et de beauté.",
    reflectionPrompt: "Regardez vos cicatrices émotionnelles comme des lignes d'or lumineuses qui racontent votre triomphe.",
    benevolentAffirmation: "« Mes cicatrices sont forgées d'or pur. Je suis un chef-d'œuvre de résilience et de noblesse d'âme. »",
    unlockedRewardBadge: "Badge : Vase Kintsugi d'Or"
  },
  {
    level: 89,
    cycleId: 4,
    title: "Étape 89 : Le Don d'Amour sans Attente ni Sacrifice",
    theme: "Relations Saines • L'Amour d'Abondance vs le Don de Manque",
    question: "Comment offrir de l'affection ou de l'aide à autrui sans jamais retomber dans le sacrifice toxique de soi ?",
    options: [
      "En donnant tout jusqu'à ce que mon compte bancaire et mon énergie soient à zéro.",
      "En donnant depuis le trop-plein de ma propre coupe déjà remplie d'amour de soi, sans attente de retour ni compromission de mes besoins.",
      "En refusant de dire un seul mot gentil à qui que ce soit."
    ],
    correctOptionIndex: 1, // B
    explanation: "On ne peut verser de l'eau d'une carafe vide. En remplissant d'abord votre propre coupe, votre générosité devient un rayonnement naturel et sécurisé.",
    reflectionPrompt: "Vérifiez que votre propre coupe est pleine d'amour avant de la faire déborder vers ceux qui le méritent.",
    benevolentAffirmation: "« Ma coupe déborde d'amour et de paix. Je donne depuis ma plénitude, sans sacrifice ni dépendance. »",
    unlockedRewardBadge: "Badge : Coupe d'Amour Débordante"
  },
  {
    level: 90,
    cycleId: 4,
    title: "Étape 90 : Devenir un Phare de Résilience & d'Inspiration (Palier 90)",
    theme: "Consécration du Bloc 3 • Rayonnement Inspirant",
    question: "Quel rôle sublime incarnez-vous désormais dans le monde pour celles qui traversent encore la tempête ?",
    options: [
      "Une donneuse de leçons arrogante.",
      "Une personne qui ignore totalement la souffrance d'autrui.",
      "Un phare tranquille et lumineux : ma simple existence guérie prouve qu'il est possible de traverser l'enfer et d'en ressortir victorieuse et épanouie."
    ],
    correctOptionIndex: 2, // C
    explanation: "Félicitations pour le Niveau 90 ! Vous n'avez pas besoin de prêcher : votre paix retrouvée, votre sourire et votre dignité sont un phare d'espérance pour le monde.",
    reflectionPrompt: "Quel message d'espoir silencieux envoyez-vous à toutes les femmes qui cherchent encore la sortie du labyrinthe ?",
    benevolentAffirmation: "« Ma lumière éclaire les ténèbres sans jamais faiblir. Je suis un phare d'amour, de vérité et d'espérance. »",
    unlockedRewardBadge: "Trophée : Flambeau du Phare de Résilience (Palier 90 Validé)"
  },

  // --- BLOC 4 : NIVEAUX 91 À 95 • L'ACCEPTATION TOTALE DE LA RÉALITÉ COMME TREMPLIN ---
  {
    level: 91,
    cycleId: 4,
    title: "Étape 91 : L'Acceptation Radicale selon Marsha Linehan (DBT)",
    theme: "Thérapie Comportementale Dialectique • Acceptation Radicale",
    question: "Qu'est-ce que l'Acceptation Radicale et pourquoi met-elle fin instantanément à la souffrance psychologique ?",
    options: [
      "Accepter totalement la réalité telle qu'elle est en cet instant (sans la nier ni la combattre mentalement), transformant ainsi la douleur inévitable en paix d'esprit.",
      "Dire que tout est merveilleux et se forcer à sourire quand on saigne.",
      "Se résigner à être maltraitée toute sa vie sans réagir."
    ],
    correctOptionIndex: 0, // A
    explanation: "La souffrance = douleur × résistance. Cesser la résistance mentale face aux faits passés dissout la souffrance et libère l'énergie pour l'action juste.",
    reflectionPrompt: "Quelle réalité passée immuable acceptez-vous d'embrasser pour cesser toute guerre intérieure ?",
    benevolentAffirmation: "« J'accepte la réalité telle qu'elle est. En cessant de lutter contre le passé, je libère mon pouvoir présent. »",
    unlockedRewardBadge: "Badge : Clé de l'Acceptation Radicale"
  },
  {
    level: 92,
    cycleId: 4,
    title: "Étape 92 : Le Renoncement à Vouloir une Autre Histoire Passée",
    theme: "Sagesse Thérapeutique • Deuil de l'Histoire Idéale",
    question: "Quelle est la définition la plus profonde du pardon selon les sages contemporains ?",
    options: [
      "C'est continuer d'espérer que l'agresseur se transforme en prince charmant.",
      "C'est renoncer définitivement à tout espoir d'avoir eu un passé différent, et embrasser pleinement la beauté de qui l'on est aujourd'hui.",
      "C'est effacer sa mémoire avec des médicaments."
    ],
    correctOptionIndex: 1, // B
    explanation: "Faire le deuil du passé idéal qu'on aurait mérité d'avoir met un terme au sentiment de victimisation et ouvre la voie royale de la souveraineté.",
    reflectionPrompt: "Quel regret sur votre passé laissez-vous s'évaporer pour accueillir l'immense cadeau de votre présent ?",
    benevolentAffirmation: "« Je renonce au passé idéal. Mon histoire est ce qu'elle est, et aujourd'hui j'en écris la plus belle page. »",
    unlockedRewardBadge: "Badge : Plume d'Écriture Souveraine"
  },
  {
    level: 93,
    cycleId: 4,
    title: "Étape 93 : La Foi Inébranlable en son Destin Lumineux",
    theme: "Sens de la Vie (Logothérapie de Viktor Frankl)",
    question: "Face aux mystères de la destinée, quelle certitude fondamentale ancre votre esprit dans une paix inaltérable ?",
    options: [
      "La vie est un chaos injuste sans aucune signification.",
      "Je suis condamnée à revivre éternellement les mêmes peurs.",
      "Chaque seconde à venir concourt à mon épanouissement, à mon élévation et à la réalisation de mon potentiel d'amour le plus haut."
    ],
    correctOptionIndex: 2, // C
    explanation: "Viktor Frankl a prouvé que la découverte du sens permet de transcender les pires épreuves. Votre vie a une valeur infinie et une mission sacrée de paix.",
    reflectionPrompt: "Quelle vision magnifique et joyeuse de votre avenir choisissez-vous de nourrir chaque matin ?",
    benevolentAffirmation: "« J'ai une foi totale en mon destin lumineux. Tout dans l'univers conspire à ma paix et à ma joie. »",
    unlockedRewardBadge: "Badge : Étoile de Foi Lumineuse"
  },
  {
    level: 94,
    cycleId: 4,
    title: "Étape 94 : L'Harmonie Absolue avec le Moment Présent",
    theme: "Sérénité Existencielle • L'État de Grâce Permanente",
    question: "Lorsque vous ne demandez plus à cet instant présent d'être différent de ce qu'il est, que ressentez-vous dans votre corps ?",
    options: [
      "Une détente cellulaire totale, une respiration ample et un sentiment de plénitude absolue : je suis chez moi en moi.",
      "Une angoisse de ne rien avoir à réparer.",
      "Une envie frénétique de changer de maison."
    ],
    correctOptionIndex: 0, // A
    explanation: "La paix parfaite est l'alignement total entre l'esprit, le corps et le moment présent. C'est l'état d'ataraxie et de grâce intérieure.",
    reflectionPrompt: "Savourez cette seconde : vous n'avez rien à prouver, rien à réparer, rien à fuir. Vous êtes parfaite.",
    benevolentAffirmation: "« Je suis en paix avec tout ce qui est. Mon souffle est un cantique d'harmonie et de plénitude. »",
    unlockedRewardBadge: "Badge : Calice de Plénitude"
  },
  {
    level: 95,
    cycleId: 4,
    title: "Étape 95 : L'Alliance avec son Sanctuaire Éternel (Palier 95)",
    theme: "Consécration du Bloc 4 • Le Sanctuaire Vivant Inviolable",
    question: "Qu'est devenu le sanctuaire que vous avez bâti pas à pas au fil des 95 niveaux ?",
    options: [
      "Une cabane fragile prête à s'effondrer au moindre coup de vent.",
      "Un temple éternel, vivant et radieux au centre de mon âme, que rien ni personne dans l'univers ne pourra jamais dégrader ou menacer.",
      "Une illusion passagère qui disparaîtra demain."
    ],
    correctOptionIndex: 1, // B
    explanation: "Votre sanctuaire intérieur est désormais une réalité neurobiologique et spirituelle indestructible. Vous êtes en sécurité pour toujours.",
    reflectionPrompt: "Prenez possession de votre temple intérieur et contemplez la splendeur de votre paix inébranlable.",
    benevolentAffirmation: "« Mon sanctuaire est éternel. J'y réside en reine souveraine, baignée d'amour et d'harmonie. »",
    unlockedRewardBadge: "Trophée : Colonne d'Or du Sanctuaire Éternel (Palier 95 Validé)"
  },

  // --- BLOC 5 : NIVEAUX 96 À 100 • COURONNEMENT DU SANCTUAIRE & RENAISSANCE SOUVERAINE ---
  {
    level: 96,
    cycleId: 4,
    title: "Étape 96 : La Joie Pure d'Être Soi-Même",
    theme: "Authenticité Absolue • La Fin des Masques de Survie",
    question: "Maintenant que vous n'avez plus besoin de plaire, de séduire, de vous justifier ou de vous adapter pour survivre, quelle joie découvrez-vous ?",
    options: [
      "La peur panique de ne pas être conforme aux attentes des voisins.",
      "Le désir de remettre un masque pour se cacher à nouveau.",
      "La saveur divine d'être 100% moi-même, naturelle, spontanée, libre de rire, d'aimer et de vivre selon mon cœur."
    ],
    correctOptionIndex: 2, // C
    explanation: "La fin des masques de survie est l'aboutissement de la renaissance : votre authenticité est votre plus grand trésor.",
    reflectionPrompt: "Quel trait de votre personnalité authentique (humour, sensibilité, créativité) brille de mille feux aujourd'hui ?",
    benevolentAffirmation: "« Je célèbre mon authenticité sacrée. Je suis libre, belle et radieuse dans ma vérité. »",
    unlockedRewardBadge: "Badge : Joyau d'Authenticité Pure"
  },
  {
    level: 97,
    cycleId: 4,
    title: "Étape 97 : L'Invulnérabilité Affective & la Sécurité Permanente",
    theme: "Souveraineté Affective • Sortie Définitive de la Dépendance",
    question: "Pourquoi ne pourrez-vous plus JAMAIS être piégée dans une relation d'emprise ou de manipulation destructrice ?",
    options: [
      "Parce que je m'aime inconditionnellement, que je repère les signaux d'alerte en 3 secondes et que je choisis ma paix au-dessus de tout.",
      "Parce que je vais vivre recluse dans une grotte sans jamais parler à quiconque.",
      "Parce que les manipulateurs n'existent plus sur terre."
    ],
    correctOptionIndex: 0, // A
    explanation: "L'amour-propre inaltérable et le discernement aiguisé constituent le vaccin définitif contre toute forme d'emprise toxique.",
    reflectionPrompt: "Ressentez la certitude absolue de votre sécurité intérieure : vous êtes désormais imprenable.",
    benevolentAffirmation: "« Ma souveraineté est absolue. Je suis la gardienne invincible de mon bien-être et de mon amour. »",
    unlockedRewardBadge: "Badge : Égide d'Invulnérabilité"
  },
  {
    level: 98,
    cycleId: 4,
    title: "Étape 98 : La Gratitude Infinie pour la Vie Retrouvée",
    theme: "Gratitude Céleste • Célébration du Don de la Vie",
    question: "Lorsque vous contemplez le ciel, une fleur ou le souffle de votre respiration, quel chant de reconnaissance monte de votre cœur ?",
    options: [
      "Une plainte contre les impôts.",
      "Un 'MERCI' infini à la Vie, à mon courage, à mes guides et à cette merveilleuse renaissance qui m'est offerte.",
      "Un doute sur la beauté de la création."
    ],
    correctOptionIndex: 1, // B
    explanation: "La gratitude suprême est la plus haute fréquence émotionnelle humaine : elle élève l'immunité, régule le système nerveux et illumine le quotidien.",
    reflectionPrompt: "Prononcez avec toute votre âme : 'Merci la Vie, merci mon cœur, merci pour ma renaissance !'",
    benevolentAffirmation: "« Mon cœur déborde d'une reconnaissance infinie. La vie est un don précieux que j'honore chaque jour. »",
    unlockedRewardBadge: "Badge : Calice de Gratitude Éternelle"
  },
  {
    level: 99,
    cycleId: 4,
    title: "Étape 99 : La Couronne de la Victoire Intérieure",
    theme: "Avant-Sommet • La Préparation au Sacre du Niveau 100",
    question: "À la veille d'atteindre le 100e palier sacré, quel bilan majestueux dressez-vous de votre métamorphose ?",
    options: [
      "Je me sens aussi fragile qu'au premier jour.",
      "J'ai peur d'arriver au bout et de ne plus savoir quoi faire.",
      "Je suis passée de l'ombre à la lumière, de la sidération à la souveraineté, de la blessure à l'amour pur. Je suis prête pour mon sacre !"
    ],
    correctOptionIndex: 2, // C
    explanation: "Vous vous tenez sur le seuil du centième niveau. Votre parcours est une épopée de bravoure, de guérison et d'amour inconditionnel.",
    reflectionPrompt: "Regardez le chemin immense parcouru depuis le Niveau 1 : ressentez la fierté sacrée qui illumine votre être.",
    benevolentAffirmation: "« Je touche au sommet sacré de ma guérison. Mon âme est prête à recevoir sa couronne de gloire et de paix. »",
    unlockedRewardBadge: "Badge : Diadème des 99 Victoires"
  },
  {
    level: 100,
    cycleId: 4,
    title: "Étape 100 : Renaissance Totale & Sacre de la Reine Souveraine",
    theme: "LE GRAND SOMMET HISTORIQUE • GUÉRISON ÉMOTIONNELLE TOTALE",
    question: "EN CE JOUR DE TRIOMPHE MAJESTUEUX DU NIVEAU 100, QUEL SACRE ÉTERNEL PROCLAMEZ-VOUS DEVANT L'UNIVERS TOUT ENTIER ?",
    options: [
      "JE SUIS GUÉRIE. JE SUIS SOUVERAINE. JE SUIS AMOUR INCONDITIONNEL. MON CŒUR EST UN SANCTUAIRE ÉTERNEL OÙ RÈGNE LA PAIX ABSOLUE !",
      "Je demande la permission à mes anciens agresseurs de pouvoir enfin être heureuse.",
      "Je pense que le niveau 100 n'est qu'un hasard sans réelle valeur."
    ],
    correctOptionIndex: 0, // A
    explanation: "TRIOMPHE UNIVERSEL ! Félicitations incommensurables ! Vous avez conquis les 100 NIVEAUX DE GUÉRISON TOTALE DE HAVEN-ELLE ! Vous recevez le Trophée Suprême de la Guérison Totale et débloquez l'accès aux Arcanes Secrets du Kybalion (Niveaux 101 à 111) !",
    reflectionPrompt: "ÉCRIVEZ VOTRE GRAND SERMENT DE REINE SOUVERAINE POUR GRAVER VOTRE TRIOMPHE DANS L'ÉTERNITÉ :",
    benevolentAffirmation: "« JE SUIS LA REINE SOUVERAINE DE MA VIE. GUÉRIE, INTACTE, RADIEUSE ET LIBRE POUR L'ÉTERNITÉ. AINSI SOIT-IL ! »",
    unlockedRewardBadge: "Grande Récompense Suprême : Trophée de la Guérison Totale & Avatar Éternel HAVEN-ELLE 👑🏆"
  }
];
