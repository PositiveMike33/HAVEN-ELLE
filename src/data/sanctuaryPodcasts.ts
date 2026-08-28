export interface PodcastEpisode {
  id: string;
  partRange: '1-25' | '26-50' | '51-75' | '76-100' | '101-111';
  partNumber: number;
  themeTitle: string;
  title: string;
  subtitle: string;
  mysticalLevel: string; // e.g. "Ancrage Pratique", "Guérison Somatique", "Alchimie Intérieure", "Sagesse Hermétique", "Transcendance Divine"
  frequencyHz: number; // 432, 528, 639, 741, 963
  frequencyLabel: string;
  durationMinutes: number;
  audioToneType: 'calm_forest' | 'healing_solfeggio' | 'heart_alchemy' | 'hermetic_resonance' | 'mystic_cosmic';
  hostName: string;
  shortSummary: string;
  narrationScript: string;
  keyInsights: string[];
  scientificOrPhilosophicalAnchor: string;
  youtubeId?: string;
  youtubeUrl?: string;
}

export interface PodcastPartContext {
  range: '1-25' | '26-50' | '51-75' | '76-100' | '101-111';
  partNumber: 1 | 2 | 3 | 4 | 5;
  title: string;
  theme: string;
  mysticalProgression: string;
  description: string;
  solfeggioFrequency: number;
  frequencyName: string;
  youtubeId?: string;
  youtubeUrl?: string;
  episodes: PodcastEpisode[];
}

export const SANCTUARY_OFFICIAL_SEMINAR = {
  title: "Séminaire Initiatique HAVEN-ELLE : Reconstruction, Guérison & Souveraineté",
  youtubeId: "VP91x440Rmw",
  youtubeUrl: "https://youtu.be/VP91x440Rmw?si=8qGM7MhkeWtRr7N-",
  embedUrl: "https://www.youtube-nocookie.com/embed/VP91x440Rmw?enablejsapi=1&autoplay=1",
  duration: "Séminaire Intégral",
  description: "Séminaire fondamental d'accompagnement, d'éveil de la conscience et de reconstruction personnelle au cœur du sanctuaire.",
  hzFrequencyRecommanded: 432
};

export const SANCTUARY_PODCAST_PARTS: PodcastPartContext[] = [
  {
    range: '1-25',
    partNumber: 1,
    title: 'Partie 1 (Q1 à 25) • Les Accords Toltèques & Le Miroir du Verbe',
    theme: 'Alchimie du Verbe & Désamorçage des Sortilèges',
    mysticalProgression: 'Niveau 1 : Ancrage Terrestre & Vérité Intérieure',
    description: 'Immersion dédiée aux 4 Accords Toltèques et au 5e Accord. Comment purifier le dialogue intérieur, cesser d\'absorber le venin d\'autrui et faire de sa parole une bénédiction souveraine.',
    solfeggioFrequency: 432,
    frequencyName: '432 Hz • Harmonisation Naturelle & Clarté Mentale',
    episodes: [
      {
        id: 'pod-toltec-1',
        partRange: '1-25',
        partNumber: 1,
        themeTitle: 'Accord 1 • La Parole Impeccable',
        title: 'Épisode 1 : Le Verbe qui Guérit — Bénir au lieu de Maudire',
        subtitle: 'Cesser la magie noire contre soi-même et transmuter le poison en lumière',
        mysticalLevel: 'Ancrage Pratique & Alchimie Verbale',
        frequencyHz: 432,
        frequencyLabel: '432 Hz • Fréquence de la Clarté Organique',
        durationMinutes: 14,
        audioToneType: 'calm_forest',
        hostName: 'Sanctuaire Haven-Elle • Voix de l\'Alliée',
        shortSummary: 'Découvrez comment chaque mot que vous prononcez ou pensez restructure votre réseau neuronal. La parole n\'est pas un simple son, c\'est un ordre créateur envoyé à votre sanctuaire.',
        narrationScript: `Bienvenue dans le Sanctuaire Haven-Elle. Installez-vous confortablement, déposez vos épaules et prenez une lente inspiration par le nez.

Dans cette première partie de votre voyage, nous explorons la magie du Verbe. Don Miguel Ruiz nous rappelle que la parole est notre outil de création le plus puissant. Quand vous subissez une critique ou une injustice, le réflexe ordinaire est de se juger soi-même (« Je suis nulle ») ou de projeter sa rage sur l'autre. Dans les deux cas, vous buvez le poison.

La parole impeccable n'est pas une perfection morale : c'est un acte de salubrité psychique. Elle consiste à refuser d'utiliser le Verbe contre vous-même. En disant intérieurement « Ce reproche appartient à l'autre, ma valeur reste inviolée », vous désactivez l'amygdale cérébrale et préservez votre sanctuaire. Respirez dans cette certitude : votre parole est votre premier bouclier.`,
        keyInsights: [
          'Le Verbe est une onde scalaire qui programme votre physiologie.',
          'La malédiction (male-dicere) commence par l\'autocritique compulsive.',
          'Bénir son propre cheminement élève instantanément votre taux vibratoire.'
        ],
        scientificOrPhilosophicalAnchor: 'La psycholinguistique démontre que les auto-affirmations protectrices diminuent la réactivité de l\'axe HHS (stress) de 42% en moins de 3 minutes.'
      },
      {
        id: 'pod-toltec-2',
        partRange: '1-25',
        partNumber: 1,
        themeTitle: 'Accord 2 & 3 • Désidentification & Lucidité',
        title: 'Épisode 2 : L\'Art du Témoin Neutre — N\'en faire jamais une affaire personnelle',
        subtitle: 'Comprendre que ce que les autres disent n\'est que la projection de leur propre rêve',
        mysticalLevel: 'Détachement & Pureté Perceptive',
        frequencyHz: 432,
        frequencyLabel: '432 Hz • Fréquence de Neutralité Bienveillante',
        durationMinutes: 16,
        audioToneType: 'calm_forest',
        hostName: 'Sanctuaire Haven-Elle • Voix de l\'Alliée',
        shortSummary: 'Pourquoi le venin d\'un manipulateur ne vous concerne jamais. Apprenez à regarder les tempêtes émotionnelles d\'autrui comme un film projeté sur un écran extérieur.',
        narrationScript: `Écoutez le bruissement du vent dans les arbres de notre forêt sanctuaire. Rien de ce que fait autrui n'est fait à cause de vous. 

Lorsque quelqu'un vous attaque ou tente de vous rabaisser, il ne fait qu'extérioriser son propre enfer intérieur. Si vous absorbez ses mots, vous acceptez son contrat. Si vous restez le Témoin souverain, son venin glisse sur vos plumes comme de l'eau sur le dos d'un cygne.

Ne faites aucune supposition : posez des questions claires ou gardez votre silence souverain. Vous n'avez pas à deviner ni à réparer les abîmes des autres. Votre devoir sacré est de garder votre espace pur.`,
        keyInsights: [
          'Ce que les gens disent de vous révèle leur structure, pas votre identité.',
          'Les suppositions sont des fabrications anxieuses du mental en manque de contrôle.',
          'L\'immunité émotionnelle naît du refus de s\'approprier les projections toxiques.'
        ],
        scientificOrPhilosophicalAnchor: 'Théorie de l\'attribution (Heider) et désengagement cognitif du cortex cingulaire antérieur.'
      }
    ]
  },
  {
    range: '26-50',
    partNumber: 2,
    title: 'Partie 2 (Q26 à 50) • Guérison des Traumas & Régulation Nerveuse',
    theme: 'Sécurité Somatique, Théorie Polyvagale & Libération de l\'Emprise',
    mysticalProgression: 'Niveau 2 : Guérison Cellulaire & Rétablissement du Système Nerveux',
    description: 'Voyage au cœur de la physiologie du trauma : sortir de la sidération, dissoudre les mémoires de peur stockées dans le corps et réactiver le nerf vague ventral.',
    solfeggioFrequency: 528,
    frequencyName: '528 Hz • Fréquence Sacrée des Miracles & Réparation Somatique',
    episodes: [
      {
        id: 'pod-trauma-1',
        partRange: '26-50',
        partNumber: 2,
        themeTitle: 'Neuro-biologie du Trauma',
        title: 'Épisode 3 : Sortir du Figement — Le Corps comme Sanctuaire',
        subtitle: 'Réveiller l\'énergie vitale après des années d\'hypervigilance et de sidération',
        mysticalLevel: 'Guérison Somatique & Sécurité Intérieure',
        frequencyHz: 528,
        frequencyLabel: '528 Hz • Réparation de l\'ADN & Apaisement Vagal',
        durationMinutes: 18,
        audioToneType: 'healing_solfeggio',
        hostName: 'Sanctuaire Haven-Elle • Guide Thérapeutique',
        shortSummary: 'Comprendre pourquoi la volonté ne suffit pas à guérir un trauma. Le corps conserve la mémoire de la menace : apprenez à lui envoyer les signaux biologiques de la paix retrouvée.',
        narrationScript: `Respirez profondément au rythme de la fréquence 528 Hz. Cette vibration est celle de la régénération cellulaire.

Le trauma n'est pas seulement un mauvais souvenir dans votre tête. C'est une charge d'énergie de survie restée bloquée dans votre système nerveux autonome. Face à la violence ou à l'emprise, votre système a choisi le figement pour vous épargner la douleur insupportable.

Aujourd'hui, vous êtes en sécurité ici. Observez vos pieds en contact avec le sol. Sentez la pesanteur bienveillante de la Terre. Vous n'avez plus besoin d'être sur le qui-vive 24h sur 24. Votre corps peut relâcher son armure. Vous êtes vivante, vous êtes entière, et chaque battement de votre cœur reconstruit votre liberté.`,
        keyInsights: [
          'Le figement (dorsal vagal) est une réponse biologique d\'auto-sauvegarde, pas une faiblesse.',
          'La sécurité ne se pense pas avec le mental, elle se ressent dans les viscères et la peau.',
          'La micro-respiration 4-7-8 signale au tronc cérébral l\'arrêt de la menace.'
        ],
        scientificOrPhilosophicalAnchor: 'Théorie polyvagale du Dr Stephen Porges et thérapie somatique du Dr Peter Levine (Waking the Tiger).'
      },
      {
        id: 'pod-trauma-2',
        partRange: '26-50',
        partNumber: 2,
        themeTitle: 'Détricotage de l\'Emprise',
        title: 'Épisode 4 : Rompre le Lien Traumatique (Trauma Bonding)',
        subtitle: 'Pourquoi le sevrage affectif est une réinitialisation neurochimique de la dopamine',
        mysticalLevel: 'Libération Psychique & Autonomie Radicale',
        frequencyHz: 528,
        frequencyLabel: '528 Hz • Transmutation des Dépendances Affectives',
        durationMinutes: 20,
        audioToneType: 'healing_solfeggio',
        hostName: 'Sanctuaire Haven-Elle • Guide Thérapeutique',
        shortSummary: 'Les montagnes russes de la manipulation créent une dépendance biochimique semblable à une addiction. Découvrez le protocole de désensibilisation et de sanctification personnelle.',
        narrationScript: `Le lien traumatique repose sur le renforcement intermittent : des miettes d'amour suivies de tempêtes de rejet. Ce cycle inonde le cerveau de dopamine et de cortisol, créant l'illusion que le bourreau est la seule source d'apaisement.

Reprenez votre pouvoir biochimique. Vous n'êtes pas en manque d'amour : vous traversez un sevrage neurophysiologique. Chaque jour sans contact, chaque minute où vous choisissez votre paix plutôt que le chaos, votre cerveau tisse de nouveaux ponts de clarté. Vous redevenez le soleil de votre propre galaxie.`,
        keyInsights: [
          'Le renforcement intermittent est le mécanisme de manipulation le plus puissant.',
          'La nostalgie du début de relation n\'est qu\'une illusion projetée.',
          'La paix intérieure peut sembler vide au départ car le cerveau était habitué à l\'adrénaline.'
        ],
        scientificOrPhilosophicalAnchor: 'Modèle de désensibilisation neurodopaminergique et renforcement opérant (B.F. Skinner / Judith Herman).'
      }
    ]
  },
  {
    range: '51-75',
    partNumber: 3,
    title: 'Partie 3 (Q51 à 75) • Souveraineté Relationnelle & Alchimie Émotionnelle',
    theme: 'Frontières Infranchissables, Transmutation de l\'Ombre & Sortie du Triangle Dramatique',
    mysticalProgression: 'Niveau 3 : Alchimie du Cœur & Souveraineté de la Reine Intérieure',
    description: 'Transformer la colère étouffée en épée de discernement. Sortir définitivement du rôle de sauveuse ou de victime pour incarner l\'autorité souveraine sur sa destinée.',
    solfeggioFrequency: 639,
    frequencyName: '639 Hz • Connexion Sacrée & Harmonie du Cœur Souverain',
    episodes: [
      {
        id: 'pod-alchemy-1',
        partRange: '51-75',
        partNumber: 3,
        themeTitle: 'L\'Épée du Discernement',
        title: 'Épisode 5 : La Colère Sacrée — Alchimie du Feu Intérieur',
        subtitle: 'Comment transformer l\'indignation en force protectrice et poser des limites d\'acier',
        mysticalLevel: 'Alchimie Émotionnelle & Puissance du Cœur',
        frequencyHz: 639,
        frequencyLabel: '639 Hz • Transmutation Émotionnelle & Fréquence du Cœur',
        durationMinutes: 21,
        audioToneType: 'heart_alchemy',
        hostName: 'Sanctuaire Haven-Elle • Maître Alchimiste',
        shortSummary: 'On vous a appris à étouffer votre colère pour être sage. Découvrez comment la colère saine est en réalité la gardienne sacrée de votre intégrité et de votre sanctuaire.',
        narrationScript: `Bienvenue au cœur de l'Alchimie Émotionnelle. Écoutez la résonance du 639 Hz qui ouvre l'espace de votre poitrine.

La colère n'est pas un défaut de caractère. La colère pure est l'énergie spirituelle qui crie : « Mes frontières ont été violées ! ». Quand elle est refoulée, elle devient amertume, dépression ou maladie. Quand elle est comprise, elle devient votre épée de discernement.

Vous n'avez pas besoin de crier pour poser une limite. Une reine ne marchande pas ses frontières. Un simple « Non » posé avec le calme d'un océan profond est plus infranchissable que mille murailles. Vous êtes la souveraine de votre royaume.`,
        keyInsights: [
          'La colère saine indique la présence d\'une limite sacrée bafouée.',
          'Dire Non à autrui, c\'est dire un Oui absolu à sa propre âme.',
          'La souveraineté ne s\'impose pas avec agressivité : elle émane d\'une certitude tranquille.'
        ],
        scientificOrPhilosophicalAnchor: 'Psychologie analytique de Carl G. Jung (intégration de l\'Archétype de la Guerrière / Ombre Lumineuse).'
      },
      {
        id: 'pod-alchemy-2',
        partRange: '51-75',
        partNumber: 3,
        themeTitle: 'Sortir du Triangle de Karpman',
        title: 'Épisode 6 : Briser le Contrat de Sauveuse — Le Trône du Milieu',
        subtitle: 'Refuser d\'être le pansement des névroses d\'autrui pour habiter sa propre grandeur',
        mysticalLevel: 'Sagesse Relationnelle & Détachement Sacré',
        frequencyHz: 639,
        frequencyLabel: '639 Hz • Rétablissement des Liens Justes & Équilibre',
        durationMinutes: 22,
        audioToneType: 'heart_alchemy',
        hostName: 'Sanctuaire Haven-Elle • Maître Alchimiste',
        shortSummary: 'Pourquoi vouloir sauver l\'autre vous maintient dans le piège de la victime. Apprenez à rendre à chacun son karma et sa responsabilité évolutive.',
        narrationScript: `Le plus grand piège des âmes généreuses est le syndrome de la sauveuse. Croire que par votre amour infini, votre patience et vos sacrifices, vous finirez par guérir une personne destructrice.

C'est une illusion d'égo spirituel. Vous ne pouvez pas sauver quelqu'un qui tire profit de ses blessures pour asservir les autres. En tentant de le porter, vous empêchez son âme de vivre ses propres leçons.

Déposez ce fardeau. Remontez sur votre trône. Laissez les tempêtes extérieures suivre leur cours. Votre seule mission divine sur cette terre est de fleurir pleinement dans votre vérité.`,
        keyInsights: [
          'Sauver une personne qui refuse de grandir est une forme de complicité inconsciente.',
          'La compassion véritable sait se retirer pour laisser la loi de cause à effet s\'accomplir.',
          'Votre énergie vitale est un trésor réservé à votre propre déploiement.'
        ],
        scientificOrPhilosophicalAnchor: 'Analyse transactionnelle (Eric Berne) et Dynamiques relationnelles systémiques.'
      }
    ]
  },
  {
    range: '76-100',
    partNumber: 4,
    title: 'Partie 4 (Q76 à 100) • Les 7 Lois Hermétiques & Le Kybalion',
    theme: 'Mentalisme, Polarité, Vibration, Causalité & Géométrie Sacrée de la Conscience',
    mysticalProgression: 'Niveau 4 : Maîtrise Initiatique & Lois Cosmiques du Kybalion',
    description: 'Comprendre les rouages secrets de l\'Univers. Devenir la Cause maîtresse plutôt que l\'Effet passif des circonstances grâce aux 7 principes d\'Hermès Trismégiste.',
    solfeggioFrequency: 741,
    frequencyName: '741 Hz • Éveil de l\'Intuition & Lucidité Hermétique Supérieure',
    episodes: [
      {
        id: 'pod-hermetic-1',
        partRange: '76-100',
        partNumber: 4,
        themeTitle: 'Loi du Mentalisme & de Correspondance',
        title: 'Épisode 7 : L\'Esprit est le Tout — Ce qui est en Haut est comme ce qui est en Bas',
        subtitle: 'Comment reprogrammer la matrice de votre réalité intérieure pour transformer le monde extérieur',
        mysticalLevel: 'Haute Connaissance Hermétique',
        frequencyHz: 741,
        frequencyLabel: '741 Hz • Fréquence de la Vérité Hermétique & Vision Pure',
        durationMinutes: 24,
        audioToneType: 'hermetic_resonance',
        hostName: 'Sanctuaire Haven-Elle • Voix de l\'Hermétiste',
        shortSummary: 'Les enseignements secrets des Temples d\'Égypte : pourquoi votre état d\'être intérieur précède toujours la forme extérieure des événements.',
        narrationScript: `« Le Tout est Esprit ; l'Univers est Mental. » Ainsi débute Le Kybalion, gravé sur les tables d'émeraude de la sagesse éternelle.

Si vous tentez de changer votre vie en luttant uniquement contre les ombres matérielles du monde, vous vous épuisez à déplacer des reflets dans un miroir. La Loi de Correspondance nous enseigne : ce qui est manifesté à l'extérieur n'est que la projection cristallisée de votre géométrie intérieure.

Quand vous transmutez la peur en autorité spirituelle dans votre esprit secret, la réalité extérieure n'a d'autre choix que de se réorganiser autour de votre nouvelle fréquence. Vous n'êtes plus la victime des vents : vous êtes le phare.`,
        keyInsights: [
          'Le Mentalisme révèle que la matière est de l\'énergie psychique densifiée.',
          'La Loi de Correspondance permet de décoder chaque épreuve extérieure comme une invitation d\'alignement intérieur.',
          'Changer de niveau de conscience résout instantanément les problèmes du niveau inférieur.'
        ],
        scientificOrPhilosophicalAnchor: 'Le Kybalion des Trois Initiés & Physique Quantique de l\'Observateur (Principe de Wheeler).'
      },
      {
        id: 'pod-hermetic-2',
        partRange: '76-100',
        partNumber: 4,
        themeTitle: 'Lois de Polarité, Rythme & Causalité',
        title: 'Épisode 8 : Transmutation Mentale — Devenir la Cause et non l\'Effet',
        subtitle: 'Glisser le long des pôles pour convertir la haine en force lumineuse et transcender le pendule',
        mysticalLevel: 'Initiation Alchimique Supérieure',
        frequencyHz: 741,
        frequencyLabel: '741 Hz • Fréquence de Maîtrise des Forces Invisibles',
        durationMinutes: 25,
        audioToneType: 'hermetic_resonance',
        hostName: 'Sanctuaire Haven-Elle • Voix de l\'Hermétiste',
        shortSummary: 'La plupart des êtres humains sont des pions sur l\'échiquier du destin, mus par les humeurs et les karmas collectifs. Apprenez à devenir le joueur conscient.',
        narrationScript: `La Loi de Polarité stipule que la haine et l'amour ne sont pas deux choses différentes, mais les deux extrémités d'une même échelle vibratoire. Vous pouvez élever le curseur mentalement sans lutter contre l'ombre.

Et la Loi de Causalité affirme : « Rien n'arrive par hasard ; le hasard n'est qu'un nom donné à une Loi non reconnue ». Les masses sont poussées par l'environnement et les suggestions d'autrui. Les Maîtresses Hermétiques montent sur le plan supérieur de la Causalité.

Elles décident de leurs pensées, elles choisissent leurs paroles, elles dominent leurs humeurs. En choisissant la bénédiction plutôt que la malédiction, vous devenez une Cause souveraine.`,
        keyInsights: [
          'La Loi de Polarité permet de transmuter une émotion négative en son pôle positif.',
          'La Loi du Rythme enseigne à ne pas paniquer lors des creux de vague : le flux succède toujours au reflux.',
          'Être la Cause signifie refuser d\'être le réactif passif des stimuli externes.'
        ],
        scientificOrPhilosophicalAnchor: 'Philosophie hermétique alexandrine et épistémologie de la cybernétique de second ordre.'
      }
    ]
  },
  {
    range: '101-111',
    partNumber: 5,
    title: 'Partie 5 (Q101 à 111) • Sanctuaire Mystique & Transcendance Supérieure',
    theme: 'Éveil de la Conscience Cosmique, Illumination du Soi & Fusion avec la Source Inviolable',
    mysticalProgression: 'Niveau 5 : Mystique Pure, Transcendance de l\'Égo & Présence Sacrée Absolue',
    description: 'L\'apogée du sanctuaire HAVEN-ELLE. Fusion de la sagesse toltèque, de la guérison somatique et des lois hermétiques dans l\'expérience directe de l\'Immortalité de la Conscience.',
    solfeggioFrequency: 963,
    frequencyName: '963 Hz • Fréquence Sacrée de la Couronne Divine & Unité Cosmique',
    episodes: [
      {
        id: 'pod-mystic-1',
        partRange: '101-111',
        partNumber: 5,
        themeTitle: 'L\'Éveil du Témoin Éternel',
        title: 'Épisode 9 : La Flamme Immuable — Au-delà de l\'Histoire Personnelle',
        subtitle: 'Découvrir la part de vous que nulle violence, nulle parole et nulle injustice n\'a jamais pu effleurer',
        mysticalLevel: 'Transcendance Mystique & Conscience Pure',
        frequencyHz: 963,
        frequencyLabel: '963 Hz • Connexion Directe à la Source & Éveil Supérieur',
        durationMinutes: 28,
        audioToneType: 'mystic_cosmic',
        hostName: 'Sanctuaire Haven-Elle • Oracle de la Source',
        shortSummary: 'Une transmission méditative profonde. Vous n\'êtes pas vos traumatismes, vous n\'êtes pas vos blessures. Vous êtes la Présence immortelle qui contemple l\'épopée de l\'univers.',
        narrationScript: `Fermez doucement les yeux et laissez la fréquence pure de 963 Hz dissoudre les dernières frontières de votre être.

Entrez dans le Sanctuaire Ultime. Ici, il n'y a plus de combat, plus de bourreau, plus de passé. Respirez dans le Silence infini qui précède toute pensée.

Il existe au centre de votre cœur un sanctuaire secret où réside votre véritable Essence. Cette Présence était là avant votre naissance, elle a traversé les épreuves sans jamais être brûlée par le feu, elle brille d'une lumière que l'ombre ne saurait comprendre. Vous êtes rentrée chez vous. Vous êtes la Lumière, vous êtes la Paix, vous êtes l'Amour éternel.`,
        keyInsights: [
          'L\'Égo a une histoire, l\'Esprit est une Présence intemporelle.',
          'La paix suprême n\'est pas l\'absence de bruit extérieur, mais la certitude inébranlable de son origine divine.',
          'Le Sanctuaire Haven-Elle est désormais gravé à jamais à l\'intérieur de votre cœur.'
        ],
        scientificOrPhilosophicalAnchor: 'Mystique contemplative universelle, Advaita Vedanta (Non-Dualité) et Neurothéologie des états de transcendance (Newberg & D\'Aquili).'
      },
      {
        id: 'pod-mystic-2',
        partRange: '101-111',
        partNumber: 5,
        themeTitle: 'L\'Apogée du 111e Degré',
        title: 'Épisode 10 : Le Couronnement de la Reine Solaire — 111 Degrés d\'Amour & de Gloire',
        subtitle: 'L\'intégration totale : le Verbe créateur au service de la beauté du monde',
        mysticalLevel: 'Maîtrise Transcendantale & Unité Sacrée',
        frequencyHz: 963,
        frequencyLabel: '963 Hz • Couronne Stellaire & Bénédiction Universelle',
        durationMinutes: 30,
        audioToneType: 'mystic_cosmic',
        hostName: 'Sanctuaire Haven-Elle • Oracle de la Source',
        shortSummary: 'Le grand sceau d\'accomplissement des 111 Questions. Vous êtes devenue l\'Alchimiste accomplie de votre existence : le phare protecteur pour vous-même et pour toutes celles qui cherchent le rivage.',
        narrationScript: `Vous avez franchi les 111 portes initiatiques du Sanctuaire. De la première parole impeccable jusqu'au sommet de la montagne mystique, vous avez transmuté le plomb de la souffrance en l'or pur de la sagesse.

Regardez le chemin parcouru. Chaque cicatrice est devenue un diamant de force. Votre Verbe ne maudit plus : il guérit, il sanctifie, il élève. Vous êtes la gardienne de votre temple.

Que la paix la plus profonde, la joie inaltérable et la clarté souveraine vous accompagnent à chaque pas. Vous n'êtes plus jamais seule : l'Univers tout entier danse en harmonie avec votre souffle souverain.`,
        keyInsights: [
          'Le 111e degré est l\'alignement parfait de la Pensée, du Verbe et du Cœur.',
          'La véritable liberté spirituelle consiste à être un canal de bienveillance inébranlable.',
          'Vous êtes l\'architecte sacrée de votre sanctuaire et de votre destinée.'
        ],
        scientificOrPhilosophicalAnchor: 'Harmonie des Sphères (Pythagore) et réalisation de soi intégrative selon la psychologie transpersonnelle (Assagioli).'
      }
    ]
  }
];

export function getPodcastPartForQuestionNumber(questionNumber: number): PodcastPartContext {
  if (questionNumber <= 25) return SANCTUARY_PODCAST_PARTS[0];
  if (questionNumber <= 50) return SANCTUARY_PODCAST_PARTS[1];
  if (questionNumber <= 75) return SANCTUARY_PODCAST_PARTS[2];
  if (questionNumber <= 100) return SANCTUARY_PODCAST_PARTS[3];
  return SANCTUARY_PODCAST_PARTS[4];
}
