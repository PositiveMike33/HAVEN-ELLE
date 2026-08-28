import { Healing100QuestionItem } from '../resilience100QuestionsData';

// ============================================================================
// CYCLE 3 : NIVEAUX 51 À 75 (Présence Personnelle, Ici & Maintenant, Lâcher-Prise & Ondes Alpha)
// Répartition aléatoire équilibrée des options correctes (A, B, C)
// ============================================================================
export const CYCLE_3_QUESTIONS: Healing100QuestionItem[] = [
  // --- BLOC 1 : NIVEAUX 51 À 55 • SORTIE DU PILOTE AUTOMATIQUE & PLEINE PRÉSENCE SOMATIQUE ---
  {
    level: 51,
    cycleId: 3,
    title: "Étape 51 : La Sortie du Pilote Automatique",
    theme: "Pleine Présence • Rupture des Automatismes Anxiogènes",
    question: "Lorsque vous réalisez que vous effectuez vos gestes quotidiens en pilotage automatique avec la tête remplie d'anticipations, quel geste de retour à soi posez-vous ?",
    options: [
      "Je m'arrête 10 secondes, je pose les pieds à plat et je ressens la sensation physique de l'air qui entre et sort de mes narines.",
      "J'accélère le rythme de mes mouvements pour faire taire mes pensées par l'hyperactivité.",
      "Je me reproche d'être distraite et je m'énerve contre moi-même."
    ],
    correctOptionIndex: 0, // A
    explanation: "La prise de conscience du pilote automatique et la reconnexion aux sensations tactiles immédiates réengagent le réseau attentionnel ventral.",
    reflectionPrompt: "Quel geste simple du quotidien (boire de l'eau, marcher, respirer) allez-vous vivre en pleine conscience aujourd'hui ?",
    benevolentAffirmation: "« Je quitte le pilote automatique. Je choisis d'habiter chaque seconde de mon existence avec clarté. »",
    unlockedRewardBadge: "Badge : Clé de Présence Immédiate"
  },
  {
    level: 52,
    cycleId: 3,
    title: "Étape 52 : L'Ancrage dans les Sensations Tactiles Réelles",
    theme: "Pleine Présence Somatique • Ancrage Tactile & Proprioception",
    question: "Face à une montée d'angoisse anticipatoire, pourquoi toucher un objet texturé (tissu, bois, galet) ramène-t-il immédiatement la sérénité ?",
    options: [
      "Parce que les objets inanimés absorbent mystiquement toutes les énergies négatives sans que l'on n'ait rien à faire.",
      "Parce que l'information tactile brute monopolise les voies afférentes du thalamus, coupant court à la boucle d'anxiété du cortex préfrontal.",
      "Parce que toucher un objet est une punition corporelle obligatoire."
    ],
    correctOptionIndex: 1, // B
    explanation: "Le cortex somatosensoriel primaire a une priorité de traitement sur les boucles de ruminations abstraites. L'attention sensorielle est un frein immédiat à l'angoisse.",
    reflectionPrompt: "Quel objet ou texture réconfortante gardez-vous à portée de main pour vos moments de réancrage ?",
    benevolentAffirmation: "« Le toucher du réel me rassure. Je m'ancre dans la matière solide et protectrice du présent. »",
    unlockedRewardBadge: "Badge : Galet de Toucher Sacré"
  },
  {
    level: 53,
    cycleId: 3,
    title: "Étape 53 : L'Écoute Sensorielle Pure des Sons Ambiants",
    theme: "Attention Auditive • Sortie du Commentaire Intérieur",
    question: "Comment écouter les sons qui vous entourent (le vent, les oiseaux, un bruit lointain) sans les juger ni leur attribuer d'étiquette mentale ?",
    options: [
      "En cherchant à analyser la cause scientifique de chaque décibel perçu.",
      "En mettant un casque antibruit pour ne plus jamais entendre le monde extérieur.",
      "En recevant chaque vibration sonore comme une onde neutre qui traverse l'espace sans exiger aucune réaction de ma part."
    ],
    correctOptionIndex: 2, // C
    explanation: "L'écoute sans étiquetage intellectuel désactive le réseau du mode par défaut (DMN) et plonge le cerveau dans l'état de contemplation passive bienfaisante.",
    reflectionPrompt: "Fermez les yeux pendant 15 secondes : quel son discret découvrez-vous dans votre environnement immédiat ?",
    benevolentAffirmation: "« J'écoute le chant du monde sans jugement. Les sons passent et glissent sur ma tranquillité intérieure. »",
    unlockedRewardBadge: "Badge : Oreille de Sérénité Auditive"
  },
  {
    level: 54,
    cycleId: 3,
    title: "Étape 54 : La Vue Panoramique et la Détente du Regard",
    theme: "Neuro-Ophtalmologie Somatique • Regard Large vs Regard Tunnel",
    question: "Lorsque vous passez de la vision étroite en 'tunnel de menace' à une vision panoramique et douce, que se passe-t-il dans votre physiologie ?",
    options: [
      "Le tronc cérébral inhibe le tonus sympathique, la fréquence cardiaque ralentit et le corps reçoit l'ordre chimique de se détendre.",
      "Les yeux s'abîment et provoquent un mal de tête immédiat.",
      "La pression artérielle monte en flèche pour réveiller le cerveau."
    ],
    correctOptionIndex: 0, // A
    explanation: "L'ouverture du champ visuel périphérique stimule les neurones du système parasympathique, neutralisant immédiatement le réflexe de fuite ou de combat.",
    reflectionPrompt: "Élargissez votre regard aux deux extrémités de votre champ de vision : que ressentez-vous dans votre nuque et vos épaules ?",
    benevolentAffirmation: "« Mon regard s'élargit, mon horizon s'illumine. Je contemple le monde dans la sécurité et la clarté. »",
    unlockedRewardBadge: "Badge : Regard d'Horizon Paisible"
  },
  {
    level: 55,
    cycleId: 3,
    title: "Étape 55 : Le Corps Vivant Ici et Maintenant (Palier 55)",
    theme: "Consécration du Bloc 1 • Pleine Présence Somatique Intégrale",
    question: "En validant cette 55e étape, quel constat lumineux s'impose à vous concernant l'instant présent ?",
    options: [
      "Le présent est plein de dangers cachés qu'il faut absolument anticiper pour demain.",
      "Dans l'exacte seconde présente où je respire, je suis vivante, entière et en sécurité absolue dans mon corps.",
      "L'instant présent n'a aucune importance comparé aux souvenirs du passé."
    ],
    correctOptionIndex: 1, // B
    explanation: "La souffrance réside dans le regret du passé ou l'angoisse du futur. Dans le pur présent somatique, il n'y a que la vie qui respire en paix.",
    reflectionPrompt: "Quelle sensation de plénitude et de gratitude ressentez-vous à être simplement vivante en cette seconde ?",
    benevolentAffirmation: "« Ici et maintenant, tout est bien. Je suis présente, entière et parfaitement vivante. »",
    unlockedRewardBadge: "Trophée : Sceau de l'Ancrage Présent (Palier 55 Validé)"
  },

  // --- BLOC 2 : NIVEAUX 56 À 60 • CALMER LE DIALOGUE INTÉRIEUR & NEUTRALISER LE DMN ---
  {
    level: 56,
    cycleId: 3,
    title: "Étape 56 : Démasquer le Réseau du Mode par Défaut (DMN)",
    theme: "Neurosciences Cognitives • Le DMN et les Ruminations Automatiques",
    question: "Qu'est-ce que le 'Default Mode Network' (DMN) du cerveau et pourquoi s'emballe-t-il souvent après une relation d'emprise ?",
    options: [
      "C'est un virus informatique cérébral qui supprime la mémoire à long terme.",
      "C'est le circuit des réflexes de digestion qui s'arrête lorsqu'on a peur.",
      "C'est le réseau neuronal actif au repos qui génère les pensées autoréférentielles, les procès intérieurs et les relectures anxieuses du passé."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le DMN s'active dès que notre attention n'est pas fixée sur une tâche concrète. Comprendre qu'il s'agit d'un automatisme neuronal permet de ne plus s'identifier aux histoires qu'il raconte.",
    reflectionPrompt: "Quand votre esprit s'évade dans de vieux scénarios, comment vous rappelez-vous avec douceur : 'C'est juste mon DMN qui s'agite, ce n'est pas ma réalité' ?",
    benevolentAffirmation: "« Je ne suis pas mes ruminations automatiques. Je suis la conscience silencieuse et souveraine qui les observe. »",
    unlockedRewardBadge: "Badge : Calmeur du Réseau par Défaut"
  },
  {
    level: 57,
    cycleId: 3,
    title: "Étape 57 : La Posture de l'Observatrice Silencieuse",
    theme: "Métacognition • Déshypnose des Pensées",
    question: "Comment observer une pensée angoissante sans plonger dedans ni la nourrir d'énergie émotionnelle supplémentaire ?",
    options: [
      "En me plaçant mentalement sur la rive du fleuve et en regardant la pensée passer comme une feuille portée par le courant, sans la retenir.",
      "En débattant rageusement avec la pensée pour lui prouver qu'elle a tort.",
      "En m'enfermant dans une pièce pour crier sur chaque pensée qui surgit."
    ],
    correctOptionIndex: 0, // A
    explanation: "La défusion cognitive et l'observation métacognitive créent un espace salutaire entre le stimulus mental et votre réponse consciente.",
    reflectionPrompt: "Visualisez votre dernière pensée anxieuse s'éloigner sur une feuille d'automne sur l'eau : quel calme ressentez-vous ?",
    benevolentAffirmation: "« Je contemple mes pensées comme des nuages dans le ciel. Mon ciel intérieur reste éternellement vaste et pur. »",
    unlockedRewardBadge: "Badge : Rive de la Conscience Sereine"
  },
  {
    level: 58,
    cycleId: 3,
    title: "Étape 58 : L'Amplification des Ondes Cérébrales Alpha (8-12 Hz)",
    theme: "Neurodynamique • Génération d'Ondes Alpha de Guérison",
    question: "Comment favoriser l'émission d'ondes Alpha (8-12 Hz), associées à l'apprentissage serein, à la régénération et au calme profond ?",
    options: [
      "En regardant des films à suspense violent tard le soir dans le noir.",
      "En fermant les yeux, en relâchant la langue contre le palais et en observant le rythme fluide de ma respiration naturelle.",
      "En buvant cinq tasses de café très fort d'affilée."
    ],
    correctOptionIndex: 1, // B
    explanation: "La détente du visage, de la mâchoire et la fermeture oculaire consciente synchronisent l'activité du cortex occipital et pariétal en rythme Alpha régénérateur.",
    reflectionPrompt: "Relâchez votre mâchoire et décollez votre langue du palais. Ressentez l'onde de détente descendre le long de votre gorge.",
    benevolentAffirmation: "« Mon cerveau vibre au rythme sacré des ondes Alpha. Mon esprit baigne dans une clarté limpide. »",
    unlockedRewardBadge: "Badge : Fréquence Alpha Sanctifiée"
  },
  {
    level: 59,
    cycleId: 3,
    title: "Étape 59 : Le Silence entre Deux Mots (L'Espace Sacré)",
    theme: "Méditation Transcendantale du Silence • Le Gap Mental",
    question: "Que découvrez-vous lorsque vous prêtez attention au silence microscopique qui existe entre deux pensées ou entre deux battements de cœur ?",
    options: [
      "Un vide terrifiant qu'il faut absolument combler avec du bruit.",
      "Une absence de vie qui signifie qu'on a perdu toute énergie vitale.",
      "Une présence paisible, lumineuse, infinie et indestructible : le noyau pur de notre être véritable."
    ],
    correctOptionIndex: 2, // C
    explanation: "L'intervalle de silence ('The Gap') est l'essence même de la conscience éveillée, libre de tout conditionnement et de toute blessure.",
    reflectionPrompt: "Prenez 5 secondes pour goûter à l'espace de silence qui suit la lecture de cette phrase. Qu'y a-t-il ?",
    benevolentAffirmation: "« Dans le silence entre mes pensées réside ma paix éternelle. Je repose en mon centre sacré. »",
    unlockedRewardBadge: "Badge : Espace du Silence Sacré"
  },
  {
    level: 60,
    cycleId: 3,
    title: "Étape 60 : La Neutralisation du Juge et du Critique Intérieur (Palier 60)",
    theme: "Consécration du Bloc 2 • Silence Intérieur & Clarté Mentale",
    question: "Lorsque la voix intérieure critique tente de vous réprimander, quelle réponse souveraine éteint définitivement son autorité ?",
    options: [
      "« Je te remercie de vouloir me protéger, mais aujourd'hui je suis en sécurité, guidée par l'amour et la lucidité. Repose-toi. »",
      "« Tu as raison, je suis nulle et incapable de réussir ma vie. »",
      "« Je vais me punir immédiatement pour te faire plaisir. »"
    ],
    correctOptionIndex: 0, // A
    explanation: "Traiter le critique intérieur avec une compassion ferme plutôt qu'avec de la haine désamorce son carburant conflictuel et rétablit l'harmonie psychique.",
    reflectionPrompt: "Quelle parole de paix bienveillante adressez-vous à cette vieille voix d'alarme pour l'inviter au repos ?",
    benevolentAffirmation: "« Mon esprit est un sanctuaire de paix. Aucune voix accusatrice n'a de prise sur ma dignité retrouvée. »",
    unlockedRewardBadge: "Trophée : Maîtrise du Silence Intérieur (Palier 60 Validé)"
  },

  // --- BLOC 3 : NIVEAUX 61 À 65 • L'ART DU LÂCHER-PRISE & NEUTRALISATION DES RUMINATIONS ---
  {
    level: 61,
    cycleId: 3,
    title: "Étape 61 : La Différence entre Contrôle Illusoire et Maîtrise Réelle",
    theme: "Philosophie Stoïcienne & Neurobiologie • Cercle de Contrôle",
    question: "Sur quel domaine unique possédez-vous une maîtrise réelle et souveraine dans votre existence quotidienne ?",
    options: [
      "Sur les humeurs, les paroles et les décisions futures de mon entourage.",
      "Sur mes propres choix, mes réactions présentes, mes limites et la tendresse que je m'accorde.",
      "Sur la météo, l'économie mondiale et les événements imprévisibles du monde."
    ],
    correctOptionIndex: 1, // B
    explanation: "Épictète et les thérapies modernes s'accordent : la souffrance naît de vouloir contrôler ce qui ne dépend pas de nous. Se concentrer sur son propre axe ramène une force infinie.",
    reflectionPrompt: "Quel élément hors de votre contrôle décidez-vous de relâcher pour réinvestir votre énergie sur vous-même ?",
    benevolentAffirmation: "« Je lâche prise sur ce que je ne peux contrôler. Je règne en souveraine sur mes choix et ma paix intérieure. »",
    unlockedRewardBadge: "Badge : Boussole de Maîtrise Stoïcienne"
  },
  {
    level: 62,
    cycleId: 3,
    title: "Étape 62 : Ouvrir les Mains (Le Geste Somatique du Lâcher-Prise)",
    theme: "Neuro-Mouvements Somatiques • Décontraction Palmaire",
    question: "Lorsque vous ouvrez grand vos mains et desserrez les doigts vers le ciel, quel signal neurochimique est envoyé au cerveau limbique ?",
    options: [
      "Un signal de faiblesse et d'abandon au danger immédiat.",
      "Un signal d'alerte maximale exigeant de fermer les poings pour frapper.",
      "Un signal de désarmement volontaire et de confiance : 'La lutte est terminée, je n'ai plus besoin de m'agripper à la douleur'."
    ],
    correctOptionIndex: 2, // C
    explanation: "Les mains crispées maintiennent le tonus sympathique de combat. Ouvrir les paumes déclenche un réflexe neuro-végétatif de détente et de lâcher-prise immédiat.",
    reflectionPrompt: "Ouvrez grand vos paumes vers le haut pendant 10 secondes et ressentez le relâchement dans vos poignets et vos avant-bras.",
    benevolentAffirmation: "« Mes mains s'ouvrent, mon cœur se libère. Je dépose les armes et j'accueille la grâce du renouveau. »",
    unlockedRewardBadge: "Badge : Paumes de Liberté Ouverte"
  },
  {
    level: 63,
    cycleId: 3,
    title: "Étape 63 : Lâcher le Besoin d'Avoir le Dernier Mot ou d'Être Validée",
    theme: "Détachement Thérapeutique • Sortie de la Justification Épuisante",
    question: "Face à une personne de mauvaise foi ou toxique, pourquoi renoncer à chercher sa validation ou à lui prouver votre valeur est-il le plus grand acte de victoire ?",
    options: [
      "Parce que ma vérité m'appartient et n'a pas besoin de l'accord d'une personne dysfonctionnelle pour exister et briller.",
      "Parce que cela prouve que j'avais tort depuis le début.",
      "Parce qu'il vaut mieux s'avouer vaincue et supplier pour obtenir un pardon immérité."
    ],
    correctOptionIndex: 0, // A
    explanation: "Chercher à convaincre un manipulateur le nourrit en lui donnant le pouvoir de valider votre réalité. S'en détacher conserve votre souveraineté intacte.",
    reflectionPrompt: "Quelle tentative d'explication stérile choisissez-vous d'abandonner aujourd'hui pour garder votre précieuse énergie ?",
    benevolentAffirmation: "« Ma vérité est auto-suffisante. Je ne mendie l'approbation de personne : je suis légitime et entière. »",
    unlockedRewardBadge: "Badge : Sceau du Silence Victorieux"
  },
  {
    level: 64,
    cycleId: 3,
    title: "Étape 64 : La Décharge des Ruminations Nocturnes",
    theme: "Hygiène Mentale du Sommeil • Le Dépôt sur Papier",
    question: "Quelle méthode simple et prouvée permet de libérer le cerveau des ruminations en boucle à l'heure du coucher ?",
    options: [
      "Passer trois heures sur les réseaux sociaux pour s'abrutir les yeux.",
      "Écrire toutes les pensées et préoccupations sur un carnet en disant : 'C'est déposé sur le papier pour cette nuit, mon esprit peut dormir en paix'.",
      "Ressasser chaque détail de la journée jusqu'à l'aube."
    ],
    correctOptionIndex: 1, // B
    explanation: "L'écriture manuscrite (externalisation cognitive) signale à la mémoire de travail que l'information est sauvegardée, permettant la transition vers le sommeil lent profond.",
    reflectionPrompt: "Quelle préoccupation déposez-vous mentalement sur votre feuille pour vous offrir une nuit de régénération profonde ?",
    benevolentAffirmation: "« Je confie mes soucis à la nuit. Mon sommeil est réparateur, profond et baigné de songes bienveillants. »",
    unlockedRewardBadge: "Badge : Plume du Sommeil Paisible"
  },
  {
    level: 65,
    cycleId: 3,
    title: "Étape 65 : La Grâce du Détachement Radicale (Palier 65)",
    theme: "Consécration du Bloc 3 • Maîtrise du Lâcher-Prise Intégral",
    question: "Lorsque vous lâchez prise sur l'issue des événements et la peur du futur, quel sentiment sublime s'éveille en vous ?",
    options: [
      "Une résignation triste et désespérée.",
      "Un sentiment de supériorité sur le reste du monde.",
      "Une confiance inaltérable dans la vie : la certitude que quoi qu'il arrive, je saurai m'accueillir, me protéger et grandir."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le vrai lâcher-prise n'est pas passivité mais foi inébranlable en ses ressources intérieures face à l'inconnu de la vie.",
    reflectionPrompt: "Quel souffle de soulagement ressentez-vous lorsque vous faites confiance à votre sagesse pour demain ?",
    benevolentAffirmation: "« Je fais confiance au flux de la vie. Je lâche prise et je m'élève dans la légèreté de l'être. »",
    unlockedRewardBadge: "Trophée : Colombe d'Argent du Lâcher-Prise (Palier 65 Validé)"
  },

  // --- BLOC 4 : NIVEAUX 66 À 70 • VIVRE « DERRIÈRE SES YEUX » & CONSCIENCE ÉNERGÉTIQUE ---
  {
    level: 66,
    cycleId: 3,
    title: "Étape 66 : Habiter l'Espace « Derrière ses Yeux »",
    theme: "Posture Thérapeutique de Conscience • Habiter sa Tête",
    question: "Que signifie s'installer confortablement 'derrière ses propres yeux' au lieu d'être projetée dans le regard des autres ?",
    options: [
      "Prendre conscience que je suis le sujet qui regarde le monde depuis mon propre centre, et non un objet soumis au regard scrutateur d'autrui.",
      "Regarder les gens méchamment pour leur faire peur.",
      "Porter des lunettes de soleil en permanence pour se cacher."
    ],
    correctOptionIndex: 0, // A
    explanation: "Sous emprise, on vit 'dans la tête de l'autre' à guetter ses réactions. Revenir derrière ses propres yeux restaure le siège royal de la conscience de soi.",
    reflectionPrompt: "Installez votre attention au centre de votre tête, derrière vos yeux : ressentez la puissance calme de votre poste d'observation.",
    benevolentAffirmation: "« Je vis au centre de moi-même. Mes yeux sont les fenêtres souveraines de mon âme guérie. »",
    unlockedRewardBadge: "Badge : Trône de la Vision Intérieure"
  },
  {
    level: 67,
    cycleId: 3,
    title: "Étape 67 : La Frontière Énergétique de l'Aura Protectrice",
    theme: "Psychologie Corporelle • La Bulle d'Espace Personnel (Proxémie)",
    question: "Comment visualiser et matérialiser votre bulle d'espace vital pour ne plus absorber la négativité ambiante dans les lieux publics ?",
    options: [
      "En repoussant agressivement les passants avec les coudes.",
      "En imaginant une sphère de lumière douce et protectrice à un mètre autour de mon corps, laissant passer l'amour et bloquant les toxicités.",
      "En restant cloîtrée chez soi pour ne jamais croiser d'humains."
    ],
    correctOptionIndex: 1, // B
    explanation: "La proxémie et la visualisation somatique d'une frontière protectrice renforcent le sentiment d'invulnérabilité spatiale et réduisent la perméabilité émotionnelle.",
    reflectionPrompt: "Ressentez l'espace d'un mètre qui entoure votre corps en cet instant : cet espace est votre territoire sacré inviolable.",
    benevolentAffirmation: "« Ma bulle de sécurité est impénétrable. Seule la lumière pure nourrit mon champ énergétique. »",
    unlockedRewardBadge: "Badge : Sphère de Lumière Inviolable"
  },
  {
    level: 68,
    cycleId: 3,
    title: "Étape 68 : L'Écoute des Signaux de Déperdition d'Énergie",
    theme: "Gestion de l'Énergie Vitale • Détecteurs de Vampirisme Émotionnel",
    question: "Face à une personne qui monopolise la conversation, se plaint sans cesse ou vous dévalorise, quel signal corporel immédiat vous alerte ?",
    options: [
      "Une envie de rire aux éclats.",
      "Une faim subite de nourriture sucrée.",
      "Une sensation subite de lourdeur dans le plexus, un bâillement de fatigue ou une baisse brutale d'énergie vitale."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le corps détecte instantanément la toxicité relationnelle par des baisses d'énergie. Respecter ces signaux permet de s'éloigner poliment avant l'épuisement.",
    reflectionPrompt: "Quel signal physique vous indique qu'il est temps d'écourter une interaction pour préserver votre batterie intérieure ?",
    benevolentAffirmation: "« J'honore les alertes de mon corps. Mon énergie est précieuse et je la réserve à ce qui m'élève. »",
    unlockedRewardBadge: "Badge : Gardien de l'Énergie Vitale"
  },
  {
    level: 69,
    cycleId: 3,
    title: "Étape 69 : Recharger son Énergie par les Éléments de la Nature",
    theme: "Écothérapie & Régulation Végétale • Connexion à la Terre (Earthing)",
    question: "Pourquoi marcher en forêt, toucher l'écorce d'un arbre ou mettre les pieds nus sur l'herbe produit-il une réparation neurobiologique mesurable ?",
    options: [
      "Parce que le contact avec la terre neutralise les radicaux libres, réduit l'inflammation systémique et régule le rythme circadien.",
      "Parce que les arbres émettent des ondes radio qui effacent les souvenirs négatifs.",
      "Parce que c'est une corvée imposée par les médecins."
    ],
    correctOptionIndex: 0, // A
    explanation: "Les phytoncides des arbres et la mise à la terre (earthing) diminuent les biomarqueurs inflammatoires et renforcent le système immunitaire.",
    reflectionPrompt: "Quel contact avec la nature (plante d'intérieur, ciel, arbre, jardin) allez-vous savourer aujourd'hui ?",
    benevolentAffirmation: "« Je suis reliée aux forces vivantes de la Terre. La nature recharge mon être d'une sève pure et réparatrice. »",
    unlockedRewardBadge: "Badge : Racine d'Or Terrestre"
  },
  {
    level: 70,
    cycleId: 3,
    title: "Étape 70 : L'Harmonisation Cœur-Cerveau et Sons Fréquentiels (Palier 70)",
    theme: "Consécration du Bloc 4 • Résonance Vibratoire & Fréquences Sacrées",
    question: "Pourquoi l'écoute de fréquences harmoniques (comme 432 Hz ou 528 Hz) favorise-t-elle l'apaisement du système nerveux central ?",
    options: [
      "Parce qu'elle force le cerveau à s'endormir pour 48 heures.",
      "Parce que les ondes sinusoïdales pures induisent une synchronisation neuronale, réduisent la tension artérielle et favorisent la cohérence globale.",
      "Parce que la musique est interdite dans les états d'anxiété."
    ],
    correctOptionIndex: 1, // B
    explanation: "Félicitations pour l'atteinte du Niveau 70 ! Les résonances sonores harmoniques rééquilibrent les hémisphères et débloquent l'accès aux ambiances apaisantes de HAVEN-ELLE.",
    reflectionPrompt: "Ressentez la vibration de paix qui s'écoule dans votre colonne vertébrale en franchissant cette 70e étape de sagesse.",
    benevolentAffirmation: "« Tout en moi vibre en parfaite harmonie. Ma fréquence intérieure est celle de la paix inaltérable. »",
    unlockedRewardBadge: "Trophée : Diapason d'Or 432Hz (Palier 70 Validé)"
  },

  // --- BLOC 5 : NIVEAUX 71 À 75 • L'ÉTAT DE FLOW & ANCRAGE DANS LA PAIX INTÉRIEURE ---
  {
    level: 71,
    cycleId: 3,
    title: "Étape 71 : Entrer dans l'État de Flow Régénérateur",
    theme: "Psychologie Positive • L'Expérience Optimale (Csikszentmihalyi)",
    question: "Qu'est-ce que l'état de 'Flow' (flux créatif) et comment guérit-il l'esprit traumatisé ?",
    options: [
      "C'est un état de distraction totale où l'on oublie ses devoirs ménagers.",
      "C'est une immersion totale et joyeuse dans une activité passionnante (art, écriture, jardinage) où le temps disparaît et le trauma est transcendé.",
      "C'est un sommeil profond sous anesthésie générale."
    ],
    correctOptionIndex: 1, // B
    explanation: "Durant le Flow, la 'défocalisation transitoire de l'hypofrontalité' éteint temporairement l'autocritique et inonde le cerveau d'anandamide et d'endorphines.",
    reflectionPrompt: "Quelle activité créative ou manuelle vous fait perdre la notion du temps dans une douce joie ?",
    benevolentAffirmation: "« Je plonge avec délice dans le flot créatif de la vie. Mon esprit s'épanouit dans la beauté de l'action pure. »",
    unlockedRewardBadge: "Badge : Vague du Flow Sacré"
  },
  {
    level: 72,
    cycleId: 3,
    title: "Étape 72 : La Bénédiction du Temps Présent",
    theme: "Spiritualité & Philosophie • Vivre le 'Maintenant'",
    question: "Selon les enseignements sur le pouvoir du moment présent, où se trouve le seul endroit où la vie réelle et la transformation peuvent advenir ?",
    options: [
      "Dans les regrets des occasions manquées d'autrefois.",
      "Dans les plans rigides et angoissés pour les dix prochaines années.",
      "Dans cet instant précis, sous ce souffle unique, où réside l'intégralité de mon pouvoir créateur."
    ],
    correctOptionIndex: 2, // C
    explanation: "Le passé n'a plus d'existence matérielle, le futur est une projection mentale. Seul le présent offre l'opportunité d'agir, de choisir et de guérir.",
    reflectionPrompt: "Savourez l'immense soulagement de savoir que vous n'avez qu'une seule seconde à vivre à la fois : celle-ci.",
    benevolentAffirmation: "« Le présent est mon sanctuaire d'éternité. J'y dépose mes pas avec grâce et sérénité. »",
    unlockedRewardBadge: "Badge : Clé de l'Éternel Présent"
  },
  {
    level: 73,
    cycleId: 3,
    title: "Étape 73 : La Dissolution Définitive de l'Urgence Artificielle",
    theme: "Écologie du Temps • Désamorcer le Faux Sentiment d'Urgence",
    question: "Comment désamorcer le sentiment d'urgence toxique ('vite, vite, tout de suite') hérité de l'emprise ou de l'anxiété chronique ?",
    options: [
      "En me répétant avec calme : 'Il n'y a pas d'urgence vitale en cet instant. J'ai tout le temps nécessaire pour faire les choses avec justesse et paix'.",
      "En courant plus vite pour terminer toutes mes tâches en 5 minutes.",
      "En hurlant sur les personnes qui marchent trop lentement."
    ],
    correctOptionIndex: 0, // A
    explanation: "L'urgence artificielle est un réflexe de survie sympathique. Ralentir délibérément le pas et les gestes rééduque le système nerveux à la sécurité temporelle.",
    reflectionPrompt: "Ralentissez votre prochain geste de moitié : observez la douceur qui s'installe aussitôt dans votre thorax.",
    benevolentAffirmation: "« Je marche à mon rythme divin. Rien ne presse ma paix : j'habite le temps avec aisance et plénitude. »",
    unlockedRewardBadge: "Badge : Sablier de Paix Temporelle"
  },
  {
    level: 74,
    cycleId: 3,
    title: "Étape 74 : Le Rayonnement de la Présence Silencieuse",
    theme: "Posture Existencielle • La Présence qui Apaise sans Parler",
    question: "Quel impact votre calme profond et votre qualité de présence ont-ils désormais sur votre entourage et vos proches bienveillants ?",
    options: [
      "Ils deviennent anxieux car ils ne comprennent pas pourquoi vous êtes si calme.",
      "Votre calme régule par corégulation vagale le système nerveux des autres, diffusant une atmosphère de sécurité sans effort.",
      "Ils essaient immédiatement de vous manipuler à nouveau."
    ],
    correctOptionIndex: 1, // B
    explanation: "La corégulation est biologique : un système nerveux apaisé diffuse des signaux de sécurité perceptibles par les miroirs neuronaux de ceux qui vous entourent.",
    reflectionPrompt: "Comment ressentez-vous la beauté d'être une force tranquille et apaisante pour vos proches ?",
    benevolentAffirmation: "« Ma présence seule est un havre de paix. Je diffuse la sérénité et la douceur autour de moi. »",
    unlockedRewardBadge: "Badge : Phare de Présence Bienveillante"
  },
  {
    level: 75,
    cycleId: 3,
    title: "Étape 75 : L'Envol de la Colombe (Couronnement du Cycle 3)",
    theme: "Consécration du Cycle 3 • Triomphe de la Présence & du Lâcher-Prise",
    question: "En validant ce 75e palier d'exception, quel serment d'or scellez-vous pour couronner votre maîtrise de la Présence et du Lâcher-Prise ?",
    options: [
      "Je promets de retourner aux ruminations dès demain matin.",
      "Je promets de continuer à douter de ma capacité à être libre.",
      "Je suis affranchie des pièges du mental. J'habite le présent, je lâche prise avec sagesse et mon cœur vole libre comme une colombe vers le Cycle 4 !"
    ],
    correctOptionIndex: 2, // C
    explanation: "Triomphe grandiose ! Vous avez achevé les 25 paliers du Cycle 3. Votre esprit est limpide, vos ruminations neutralisées et vous maîtrisez l'art de vivre dans l'ici et maintenant.",
    reflectionPrompt: "Écrivez votre message d'envol pour célébrer l'achèvement du Cycle 3 et votre passage vers l'Amour Inconditionnel du Cycle 4 :",
    benevolentAffirmation: "« Mon esprit est un ciel infini, libre de tout nuage. Je vole de mes propres ailes vers l'Amour Pur et le Sanctuaire Éternel. »",
    unlockedRewardBadge: "Trophée Suprême : Grande Colombe d'Argent du Lâcher-Prise (Cycle 3 Accompli 🏆)"
  }
];
