export type QuestionnaireId = 
  | 'violentometre'
  | 'relation_saine'
  | 'controle_coercitif'
  | 'formes_de_violence'
  | 'manipulation_psy'
  | 'cycle_de_violence'
  | 'marcher_sur_des_oeufs'
  | 'amour_ou_controle'
  | 'comment_relation_changee';

export type ViolentometreZone = 'saine' | 'surveiller' | 'danger_controle' | 'danger_majeur';

export interface QuestionChoice {
  id: string;
  text: string;
  isConcern?: boolean;
  isCriticalAlert?: boolean; // Immediate high-risk safety trigger (e.g. strangulation, weapons, death threats)
  alertExplanation?: string;
  categoryTag?: string;
  feedbackExplanation?: string;
}

export interface InteractiveQuestionItem {
  id: string;
  questionNumber: number;
  title: string;
  subtitle?: string;
  scenarioContext?: string; // Situational scenario for interactive case studies
  choices: QuestionChoice[];
  type: 'single' | 'multiple' | 'scenario';
  scientificAnchor?: string;
  immediateTeaching?: string; // Instant pedagogical card shown upon choice
  themeTag?: string;
}

export interface QuestionnaireModule {
  id: QuestionnaireId;
  title: string;
  shortTitle: string;
  badge: string;
  iconName: string;
  colorTheme: {
    accent: string;
    bgLight: string;
    border: string;
    text: string;
  };
  targetObjective: string;
  questions: InteractiveQuestionItem[];
  closingWisdomMessage: string;
  educationalAnchor: string;
}

export interface ViolentometreItem {
  id: string;
  label: string;
  zone: ViolentometreZone;
  order: number;
  scientificNote: string;
  isCriticalAlert?: boolean;
}

export const VIOLENTOMETRE_ITEMS: ViolentometreItem[] = [
  // 🟢 Zone Verte : Relation Saine & Égalitaire (Profite)
  {
    id: 'v-1',
    label: "Respecte tes décisions, tes choix de vie et tes désirs.",
    zone: 'saine',
    order: 1,
    scientificNote: "L'autonomie décisionnelle est le premier pilier d'une sécurité relationnelle saine."
  },
  {
    id: 'v-2',
    label: "Accepte spontanément tes refus et respecte quand tu dis « non » sans faire la tête.",
    zone: 'saine',
    order: 2,
    scientificNote: "Le respect inconditionnel du consentement mutuel définit la maturité affective."
  },
  {
    id: 'v-3',
    label: "Respecte tes ami(e)s, ta famille et encourage tes sorties sans lui.",
    zone: 'saine',
    order: 3,
    scientificNote: "Un partenaire sécurisant valorise ton réseau social et ne cherche jamais à le réduire."
  },
  {
    id: 'v-4',
    label: "Te fait confiance, ne fouille pas tes affaires et respecte ton intimité.",
    zone: 'saine',
    order: 4,
    scientificNote: "La confiance réciproque évite tout besoin de contrôle ou d'espionnage."
  },
  {
    id: 'v-5',
    label: "Est heureux(se) de tes réussites et valorise tes projets personnels.",
    zone: 'saine',
    order: 5,
    scientificNote: "L'émulation positive et le soutien renforcent l'estime de soi dans le couple."
  },

  // 🟡 Zone Jaune : Vigilance & Comportements Préoccupants (Dis stop)
  {
    id: 'v-6',
    label: "Fait des scènes de jalousie excessive et te demande des comptes permanents.",
    zone: 'surveiller',
    order: 6,
    scientificNote: "La jalousie pathologique n'est pas une preuve d'amour, mais une tentative d'appropriation."
  },
  {
    id: 'v-7',
    label: "Te culpabilise en disant que si tu l'aimais vraiment, tu agirais autrement.",
    zone: 'surveiller',
    order: 7,
    scientificNote: "Le chantage affectif crée une dette émotionnelle injustifiée et érode tes limites."
  },
  {
    id: 'v-8',
    label: "Fait des remarques dévalorisantes sur tes vêtements, ton physique ou tes compétences.",
    zone: 'surveiller',
    order: 8,
    scientificNote: "Le dénigrement insidieux vise à affaiblir la confiance en soi pour favoriser la dépendance."
  },
  {
    id: 'v-9',
    label: "Boude ou t'impose un silence punitif de plusieurs heures quand tu n'es pas d'accord.",
    zone: 'surveiller',
    order: 9,
    scientificNote: "Le « silent treatment » est une micro-agression psychologique activant les circuits de la douleur."
  },
  {
    id: 'v-10',
    label: "Critique constamment tes proches pour te faire douter de leur bienveillance envers toi.",
    zone: 'surveiller',
    order: 10,
    scientificNote: "C'est l'amorce de la dynamique d'isolement social progressif."
  },

  // 🟠 Zone Orange : Violence & Contrôle (Protège-toi, demande de l'aide)
  {
    id: 'v-11',
    label: "Fouille ton téléphone, exige tes mots de passe ou surveille tes réseaux sociaux.",
    zone: 'danger_controle',
    order: 11,
    scientificNote: "La cyber-surveillance constitue une violation de la vie privée et un contrôle coercitif."
  },
  {
    id: 'v-12',
    label: "Contrôle tes dépenses, tes revenus ou t'interdit de travailler pour t'asservir financièrement.",
    zone: 'danger_controle',
    order: 12,
    scientificNote: "La violence économique prive la personne de son autonomie matérielle fondamentale."
  },
  {
    id: 'v-13',
    label: "T'isole de ta famille et de tes ami(e)s jusqu'à ce que tu ne voies plus personne.",
    zone: 'danger_controle',
    order: 13,
    scientificNote: "L'isolement prive la victime de tout regard extérieur pour verrouiller l'emprise."
  },
  {
    id: 'v-14',
    label: "T'intimide par des gestes brusques, des cris, des regards menaçants ou en cassant des objets.",
    zone: 'danger_controle',
    order: 14,
    scientificNote: "L'intimidation physique installe un état d'hypervigilance traumatique permanent."
  },
  {
    id: 'v-15',
    label: "T'humilie et te rabaisse en public ou devant vos enfants.",
    zone: 'danger_controle',
    order: 15,
    scientificNote: "L'humiliation publique détruit l'image sociale et augmente le sentiment de honte."
  },
  {
    id: 'v-16',
    label: "Menace de se suicider ou de te détruire si tu le quittes.",
    zone: 'danger_controle',
    order: 16,
    scientificNote: "C'est une manipulation émotionnelle grave visant à te retenir en otage psychologique."
  },

  // 🔴 Zone Rouge : Danger Majeur & Urgence (Danger de mort, appelle le 17 / 3919 / SOS Réseau)
  {
    id: 'v-17',
    label: "Menaces de mort directes ou indirectes contre toi ou tes enfants.",
    zone: 'danger_majeur',
    order: 17,
    isCriticalAlert: true,
    scientificNote: "Indicateur critique absolu de dangerosité létale nécessitant une mise en sécurité immédiate."
  },
  {
    id: 'v-18',
    label: "Étranglement, saisie à la gorge ou étouffement (même une seule fois ou sans perte de conscience).",
    zone: 'danger_majeur',
    order: 18,
    isCriticalAlert: true,
    scientificNote: "La strangulation non létale multiplie par plus de 7 le risque de tentative d'homicide ultérieure."
  },
  {
    id: 'v-19',
    label: "Rapports sexuels imposés, attouchements forcés ou chantage sexuel.",
    zone: 'danger_majeur',
    order: 19,
    isCriticalAlert: true,
    scientificNote: "Tout acte sexuel sans consentement plein et entier constitue une agression ou un viol conjugal puni par la loi."
  },
  {
    id: 'v-20',
    label: "Séquestration, t'enferme à clé, confisque tes clés ou tes papiers d'identité.",
    zone: 'danger_majeur',
    order: 20,
    isCriticalAlert: true,
    scientificNote: "Privation illégale de liberté individuelle, infraction pénale majeure."
  },
  {
    id: 'v-21',
    label: "Présence d'armes à feu, couteaux utilisés pour menacer, ou maltraitance d'animaux domestiques.",
    zone: 'danger_majeur',
    order: 21,
    isCriticalAlert: true,
    scientificNote: "L'accès à une arme démultiplie le risque létal lors des montées de tension."
  },
  {
    id: 'v-22',
    label: "Violences physiques directes (coups, gifles, brûlures, traînée par les cheveux).",
    zone: 'danger_majeur',
    order: 22,
    isCriticalAlert: true,
    scientificNote: "Atteinte directe à l'intégrité physique nécessitant constat médical et protection."
  },
  {
    id: 'v-23',
    label: "Violence qui explose ou s'intensifie dès que tu parles de séparation ou cherches à partir.",
    zone: 'danger_majeur',
    order: 23,
    isCriticalAlert: true,
    scientificNote: "La période de séparation est statistiquement la plus dangereuse : le départ doit être préparé avec un plan de sécurité."
  }
];

export const SANCTUARY_QUESTIONNAIRES: QuestionnaireModule[] = [
  // 1. Est-ce que ma relation est saine ?
  {
    id: 'relation_saine',
    title: 'Est-ce que ma relation est saine ?',
    shortTitle: 'Relation Saine ?',
    badge: 'Module 1 • Diagnostic Relationnel',
    iconName: 'HeartHandshake',
    colorTheme: {
      accent: '#15803D',
      bgLight: '#F0FDF4',
      border: '#BBF7D0',
      text: '#166534'
    },
    targetObjective: 'Évaluer la réciprocité, le respect des limites, la confiance et la liberté d’être soi-même au quotidien.',
    educationalAnchor: 'Une relation saine apporte de la sécurité, de la légèreté et élargit ton univers ; elle ne le rétrécit jamais.',
    closingWisdomMessage: 'Dans une relation saine, tu as le droit fondamental d’être imparfaite, d’avoir tes propres amis, de dire non sans drame, et d’exprimer tes sentiments sans peur des représailles.',
    questions: [
      {
        id: 'rs-1',
        questionNumber: 1,
        title: 'Respect de tes limites et de ton intégrité',
        subtitle: 'Quand tu exprimes un désaccord, une fatigue ou un refus :',
        type: 'single',
        themeTag: 'Limites',
        choices: [
          { id: 'rs-1-a', text: 'Il écoute et respecte mon choix avec bienveillance, sans insister ni bouder.', isConcern: false },
          { id: 'rs-1-b', text: 'Il insiste souvent, négocie ou se montre agacé jusqu’à ce que je cède.', isConcern: true, categoryTag: 'Non-respect des limites' },
          { id: 'rs-1-c', text: 'J’ai peur de dire non car cela déclenche des crises, des insultes ou des silences punitifs.', isConcern: true, categoryTag: 'Climat de peur et contrainte' }
        ],
        immediateTeaching: 'Le respect du consentement s’applique aux petites choses du quotidien comme aux décisions majeures. Céder par épuisement n’est pas un accord libre.'
      },
      {
        id: 'rs-2',
        questionNumber: 2,
        title: 'Liberté d’être toi-même sans masque',
        subtitle: 'En sa présence, comment te sens-tu dans ton authenticité ?',
        type: 'single',
        themeTag: 'Authenticité',
        choices: [
          { id: 'rs-2-a', text: 'Je suis totalement libre de m’exprimer, rire, avoir mes opinions et être moi-même.', isConcern: false },
          { id: 'rs-2-b', text: 'Je m’autocensure souvent pour éviter de le contrarier ou de provoquer une critique.', isConcern: true, categoryTag: 'Autocensure par anticipation' },
          { id: 'rs-2-c', text: 'J’ai l’impression d’avoir perdu ma personnalité et de jouer un rôle permanent.', isConcern: true, categoryTag: 'Effacement identitaire' }
        ],
        immediateTeaching: 'Quand on doit constamment surveiller sa voix, ses rires ou ses tenues pour ne pas déclencher la colère de l’autre, l’espace intime est compromis.'
      },
      {
        id: 'rs-3',
        questionNumber: 3,
        title: 'Confiance mutuelle & Vie privée',
        subtitle: 'Comment est gérée votre intimité numérique et personnelle ?',
        type: 'single',
        themeTag: 'Vie Privée',
        choices: [
          { id: 'rs-3-a', text: 'Nous nous faisons confiance ; nos téléphones et courriels restent privés et respectés.', isConcern: false },
          { id: 'rs-3-b', text: 'Il exige de savoir à qui j’écris ou me demande des justifications régulières.', isConcern: true, categoryTag: 'Surveillance insidieuse' },
          { id: 'rs-3-c', text: 'Il fouille mon téléphone, exige mes mots de passe ou m’accuse d’infidélité imaginaire.', isConcern: true, categoryTag: 'Violation d’intimité & Cyber-contrôle' }
        ],
        immediateTeaching: 'L’intimité n’est pas du secret coupable. Exiger la transparence totale sous prétexte d’amour est une technique de contrôle.'
      },
      {
        id: 'rs-4',
        questionNumber: 4,
        title: 'Gestion des conflits et désaccords',
        subtitle: 'Lors d’un différend entre vous :',
        type: 'single',
        themeTag: 'Conflits',
        choices: [
          { id: 'rs-4-a', text: 'Nous échangeons calmement pour trouver une solution équilibrée, même en cas de désaccord.', isConcern: false },
          { id: 'rs-4-b', text: 'La discussion tourne toujours autour de ses reproches et je finis par m’excuser.', isConcern: true, categoryTag: 'Inversion de responsabilité' },
          { id: 'rs-4-c', text: 'Les conflits sont explosifs, menaçants ou accompagnés de dénigrements blessants.', isConcern: true, categoryTag: 'Violence verbale & Intimidation' }
        ],
        immediateTeaching: 'Le désaccord fait partie de la vie. Ce qui n’est jamais normal, c’est l’intimidation, le dénigrement ou la punition lors d’une discussion.'
      },
      {
        id: 'rs-5',
        questionNumber: 5,
        title: 'Autonomie & Vie extérieure',
        subtitle: 'Concernant ton travail, tes ami(e)s et tes loisirs personnels :',
        type: 'single',
        themeTag: 'Autonomie',
        choices: [
          { id: 'rs-5-a', text: 'Il m’encourage dans mes passions, mes amitiés et mon indépendance financière.', isConcern: false },
          { id: 'rs-5-b', text: 'Il tolère mes activités mais fait des remarques passives-agressives quand je sors.', isConcern: true, categoryTag: 'Culpabilisation sociale' },
          { id: 'rs-5-c', text: 'Il m’empêche ou me dissuade de voir mes proches et de développer mes projets.', isConcern: true, categoryTag: 'Isolement social & sabotage' }
        ],
        immediateTeaching: 'L’amour véritable nourrit l’envol de l’autre, il ne lui coupe pas les ailes pour le garder en cage.'
      }
    ]
  },

  // 2. Est-ce du contrôle coercitif ?
  {
    id: 'controle_coercitif',
    title: 'Est-ce du contrôle coercitif ?',
    shortTitle: 'Contrôle Coercitif ?',
    badge: 'Module 2 • Emprise & Liberté',
    iconName: 'Lock',
    colorTheme: {
      accent: '#B45309',
      bgLight: '#FFFBEB',
      border: '#FDE68A',
      text: '#92400E'
    },
    targetObjective: 'Mettre en lumière l’accumulation insidieuse de micro-contraintes et la perte progressive de ta liberté au quotidien.',
    educationalAnchor: 'Le contrôle coercitif est une toile d’araignée invisible : chaque fil pris isolément semble petit, mais ensemble ils forment une prison.',
    closingWisdomMessage: 'Le contrôle coercitif ne commence pas par un coup physique, mais par la confiscation millimètre par millimètre de ton autonomie, de tes choix et de ta voix.',
    questions: [
      {
        id: 'cc-1',
        questionNumber: 1,
        title: 'Obligation de justification et de géolocalisation',
        subtitle: 'Dois-tu expliquer où tu es, avec qui et à quelle minute précise ?',
        type: 'single',
        themeTag: 'Surveillance',
        choices: [
          { id: 'cc-1-a', text: 'Non, nous partageons nos plannings naturellement sans aucune obligation de contrôle.', isConcern: false },
          { id: 'cc-1-b', text: 'Oui, si je ne réponds pas dans les minutes qui suivent un message, il s’énerve ou me bombarde d’appels.', isConcern: true, categoryTag: 'Surveillance permanente des mouvements' },
          { id: 'cc-1-c', text: 'Je dois envoyer des photos de preuve ou activer ma géolocalisation pour prouver où je suis.', isConcern: true, categoryTag: 'Contrôle coercitif sévère de localisation' }
        ],
        immediateTeaching: 'Devoir prouver ses déplacements en temps réel n’est pas de la sollicitude, c’est une privation de liberté de mouvement.'
      },
      {
        id: 'cc-2',
        questionNumber: 2,
        title: 'Restriction des sorties pour préserver le calme',
        subtitle: 'As-tu réduit tes sorties, tes passions ou tes visites à des proches pour éviter des scènes ?',
        type: 'single',
        themeTag: 'Isolement',
        choices: [
          { id: 'cc-2-a', text: 'Non, je conserve pleinement ma vie sociale et mes activités habituelles.', isConcern: false },
          { id: 'cc-2-b', text: 'Oui, j’ai fini par renoncer à certaines sorties parce que le prix émotionnel à payer au retour était trop lourd.', isConcern: true, categoryTag: 'Renoncement progressif par usure' },
          { id: 'cc-2-c', text: 'Je ne vois quasiment plus personne en dehors de lui.', isConcern: true, categoryTag: 'Isolement relationnel installé' }
        ],
        immediateTeaching: 'Quand on renonce à sa vie pour éviter les conflits, le partenaire a réussi à imposer sa volonté sans même avoir besoin de hausser le ton.'
      },
      {
        id: 'cc-3',
        questionNumber: 3,
        title: 'Contrôle matériel, financier ou vestimentaire',
        subtitle: 'Contrôle-t-il ton argent, tes vêtements, ton maquillage ou tes déplacements en voiture ?',
        type: 'single',
        themeTag: 'Ressources',
        choices: [
          { id: 'cc-3-a', text: 'Non, je gère mes finances et mon apparence en toute liberté.', isConcern: false },
          { id: 'cc-3-b', text: 'Il commente négativement mes choix vestimentaires ou surveille mes dépenses personnelles.', isConcern: true, categoryTag: 'Contrôle de l’apparence & finances' },
          { id: 'cc-3-c', text: 'Il contrôle l’accès à mes comptes, bloque mon moyen de transport ou choisit comment je m’habille.', isConcern: true, categoryTag: 'Privation de ressources & contrainte matérielle' }
        ],
        immediateTeaching: 'Le contrôle de l’argent et du corps prive directement la personne de ses moyens de subsistance et d’auto-détermination.'
      },
      {
        id: 'cc-4',
        questionNumber: 4,
        title: 'Sentiment d’avoir besoin de sa permission',
        subtitle: 'Ressens-tu que pour des actes normaux du quotidien, son autorisation tacite ou explicite est requise ?',
        type: 'single',
        themeTag: 'Permission',
        choices: [
          { id: 'cc-4-a', text: 'Non, nous sommes deux adultes égaux prenant des décisions concertées.', isConcern: false },
          { id: 'cc-4-b', text: 'Oui, je ressens le besoin de tester son humeur avant de planifier un achat ou une visite.', isConcern: true, categoryTag: 'Autorisation tacite recherchée' },
          { id: 'cc-4-c', text: 'Oui, si je fais quelque chose sans sa permission explicite, les représailles sont garanties.', isConcern: true, categoryTag: 'Relation asymétrique dominée' }
        ],
        immediateTeaching: 'Dans un couple adulte, personne n’a à demander la permission à l’autre comme un enfant soumis à une tutelle autoritaire.'
      },
      {
        id: 'cc-5',
        questionNumber: 5,
        title: 'Modification du comportement par peur de sa réaction',
        subtitle: 'Modifies-tu ta façon de parler, de marcher, de ranger ou de vivre par crainte de son explosion ?',
        type: 'single',
        themeTag: 'Comportement',
        choices: [
          { id: 'cc-5-a', text: 'Non, mon foyer est un lieu de détente et de sécurité où je respire librement.', isConcern: false },
          { id: 'cc-5-b', text: 'Oui, j’adapte constamment mes gestes pour ne pas lui donner de prétexte.', isConcern: true, categoryTag: 'Conditionnement par la peur' },
          { id: 'cc-5-c', text: 'Je vis dans une tension permanente où chaque faux pas peut déclencher un enfer.', isConcern: true, categoryTag: 'Hypervigilance somatique chronique' }
        ],
        immediateTeaching: 'Quand ton foyer ressemble à un champ de mines où chaque geste doit être calculé, c’est le signe clinique de l’emprise coercitive.'
      }
    ]
  },

  // 3. Quelles formes de violence sont présentes dans ma relation ?
  {
    id: 'formes_de_violence',
    title: 'Quelles formes de violence sont présentes ?',
    shortTitle: 'Formes de Violence',
    badge: 'Module 3 • Typologie des Violences',
    iconName: 'ShieldAlert',
    colorTheme: {
      accent: '#C026D3',
      bgLight: '#FDF4FF',
      border: '#F5D0FE',
      text: '#86198F'
    },
    targetObjective: 'Distinguer et identifier les 10 catégories de violences (visibles et invisibles) pouvant exister dans un foyer.',
    educationalAnchor: 'Certaines formes de violence ne laissent aucune marque physique, mais détruisent la santé psychologique et l’âme avec la même intensité.',
    closingWisdomMessage: 'La violence n’est pas uniquement un œil au beurre noir. Le silence destructeur, le chantage financier, l’intimidation et l’espionnage sont des violences réelles et punies par la loi.',
    questions: [
      {
        id: 'fv-1',
        questionNumber: 1,
        title: 'Violences Psychologiques & Morales',
        subtitle: 'Coche les comportements que tu as subis :',
        type: 'multiple',
        themeTag: 'Psychologique',
        choices: [
          { id: 'fv-1-a', text: 'Dénigrement insidieux, moqueries blessantes sur ton intelligence ou ton corps.', isConcern: true, categoryTag: 'Violence psychologique' },
          { id: 'fv-1-b', text: 'Gaslighting : nie ce qu’il a dit/fait pour te faire douter de ta propre santé mentale.', isConcern: true, categoryTag: 'Gaslighting & déni du réel' },
          { id: 'fv-1-c', text: 'Silence punitif de plusieurs jours pour te contraindre à capituler.', isConcern: true, categoryTag: 'Torture du silence' },
          { id: 'fv-1-d', text: 'Aucun de ces comportements n’est présent.', isConcern: false }
        ],
        immediateTeaching: 'Le dénigrement répété brise l’estime de soi pour installer la dépendance psychique.'
      },
      {
        id: 'fv-2',
        questionNumber: 2,
        title: 'Violences Économiques & Administratives',
        subtitle: 'Coche les situations observées :',
        type: 'multiple',
        themeTag: 'Économique',
        choices: [
          { id: 'fv-2-a', text: 'Refus de te donner accès aux comptes communs ou confiscation de ta carte bancaire.', isConcern: true, categoryTag: 'Violence économique' },
          { id: 'fv-2-b', text: 'Sabotage de ton travail, t’empêche d’aller à un entretien ou de te former.', isConcern: true, categoryTag: 'Sabotage professionnel' },
          { id: 'fv-2-c', text: 'Dettes contractées à ton nom sans ton consentement plein et éclairé.', isConcern: true, categoryTag: 'Abus financier & fraude' },
          { id: 'fv-2-d', text: 'Aucun de ces comportements n’est présent.', isConcern: false }
        ],
        immediateTeaching: 'La violence économique vise à t’enlever tout moyen de fuite matérielle et de logement indépendant.'
      },
      {
        id: 'fv-3',
        questionNumber: 3,
        title: 'Intimidation, Objets & Animaux',
        subtitle: 'Coche les comportements de terreur matérielle :',
        type: 'multiple',
        themeTag: 'Intimidation',
        choices: [
          { id: 'fv-3-a', text: 'Donne des coups de poing dans les murs, claque violemment les portes pour faire peur.', isConcern: true, categoryTag: 'Intimidation physique' },
          { id: 'fv-3-b', text: 'Casse ou jette des objets qui ont une grande valeur sentimentale pour toi.', isConcern: true, categoryTag: 'Destruction symbolique' },
          { id: 'fv-3-c', text: 'Menace de faire du mal à tes animaux de compagnie ou les maltraite devant toi.', isConcern: true, categoryTag: 'Chantage sur les animaux' },
          { id: 'fv-3-d', text: 'Aucun de ces comportements n’est présent.', isConcern: false }
        ],
        immediateTeaching: 'Frapper un mur ou casser un objet chéri est un message implicite : "Regarde ce que je pourrais faire à ton corps".'
      },
      {
        id: 'fv-4',
        questionNumber: 4,
        title: 'Signaux de Violences Physiques & Danger Immédiat',
        subtitle: 'Coche avec honnêteté les actes déjà vécus :',
        type: 'multiple',
        themeTag: 'Physique & Vital',
        choices: [
          { id: 'fv-4-a', text: 'Bousculades, saisies brutales aux bras, tirage de cheveux ou gifles.', isConcern: true, categoryTag: 'Violence physique directe' },
          { id: 'fv-4-b', text: 'Étranglement ou mains posées sur le cou (même brièvement).', isConcern: true, isCriticalAlert: true, categoryTag: 'Strangulation / Risque Vital' },
          { id: 'fv-4-c', text: 'Menaces avec une arme ou un couteau / Menaces de mort explicites.', isConcern: true, isCriticalAlert: true, categoryTag: 'Menaces d’homicide' },
          { id: 'fv-4-d', text: 'Séquestration, blocage de porte pour t’empêcher physiquement de sortir.', isConcern: true, isCriticalAlert: true, categoryTag: 'Séquestration & Enfermement' },
          { id: 'fv-4-e', text: 'Aucun acte physique n’a eu lieu.', isConcern: false }
        ],
        immediateTeaching: 'Toute atteinte physique ou blocage de sortie est une urgence absolue. Il est vital de ne pas rester seule avec ce fardeau.'
      }
    ]
  },

  // 4. Est-ce de la manipulation ? (Gaslighting, DARVO, Love bombing)
  {
    id: 'manipulation_psy',
    title: 'Est-ce de la manipulation ?',
    shortTitle: 'Manipulation & DARVO',
    badge: 'Module 4 • Décryptage Psychologique',
    iconName: 'Brain',
    colorTheme: {
      accent: '#4F46E5',
      bgLight: '#EEF2FF',
      border: '#C7D2FE',
      text: '#3730A3'
    },
    targetObjective: 'Identifier les tactiques de distorsion cognitive : Gaslighting, DARVO, Love Bombing, Triangulation et Culpabilisation.',
    educationalAnchor: 'La manipulation ne fonctionne que dans le brouillard. Nommer précisément chaque technique dissipe immédiatement son pouvoir d’illusion.',
    closingWisdomMessage: 'Quand tu connais les mécanismes du DARVO et du Gaslighting, tu cesses de te demander si tu es folle : tu réalises que ta lucidité est ton plus grand bouclier.',
    questions: [
      {
        id: 'mp-1',
        questionNumber: 1,
        title: 'Le Gaslighting (Déni de la réalité)',
        subtitle: 'Quand tu lui rappelles un fait précis ou une parole blessante qu’il a prononcée :',
        type: 'single',
        themeTag: 'Gaslighting',
        choices: [
          { id: 'mp-1-a', text: 'Il reconnaît ses paroles, s’excuse sincèrement et nous trouvons un terrain d’entente.', isConcern: false },
          { id: 'mp-1-b', text: 'Il répond invariablement : « Tu inventes », « Tu es folle », « Tu te fais des films » ou « Je n’ai jamais dit ça ».', isConcern: true, categoryTag: 'Gaslighting caractéristique' },
          { id: 'mp-1-c', text: 'Il retourne la situation pour prétendre que c’est moi qui perds la tête et qui ai besoin d’un traitement.', isConcern: true, categoryTag: 'Gaslighting destructeur' }
        ],
        immediateTeaching: 'Le Gaslighting a pour but d’altérer ta mémoire et ta confiance en tes 5 sens pour que tu deviennes totalement dépendante de sa version des faits.'
      },
      {
        id: 'mp-2',
        questionNumber: 2,
        title: 'La technique DARVO (Deny, Attack, Reverse Victim & Offender)',
        subtitle: 'Quand tu oses lui faire un reproche légitime sur son comportement :',
        type: 'single',
        themeTag: 'DARVO',
        choices: [
          { id: 'mp-2-a', text: 'Il reste centré sur le problème soulevé sans attaquer ma personne.', isConcern: false },
          { id: 'mp-2-b', text: 'Il nie en bloc, m’attaque sur mes propres défauts du passé, et finit par pleurer en disant que je le maltraite.', isConcern: true, categoryTag: 'Cycle DARVO complet' },
          { id: 'mp-2-c', text: 'C’est systématiquement moi qui finis par le consoler et m’excuser d’avoir osé parler.', isConcern: true, categoryTag: 'Inversion des rôles victime/bourreau' }
        ],
        immediateTeaching: 'Le DARVO est la signature des agresseurs : Nier, Attaquer, et Renverser les rôles pour faire de la victime le coupable désigné.'
      },
      {
        id: 'mp-3',
        questionNumber: 3,
        title: 'Love Bombing & Promesses de changement répétées',
        subtitle: 'Après une crise grave, comment se comporte-t-il ?',
        type: 'single',
        themeTag: 'Love Bombing',
        choices: [
          { id: 'mp-3-a', text: 'Il prend des mesures réelles et durables (thérapie, actes concrets) sans grand spectacle.', isConcern: false },
          { id: 'mp-3-b', text: 'Il devient excessivement mielleux, fait des cadeaux mirobolants, jure sur sa vie qu’il va changer... puis recommence.', isConcern: true, categoryTag: 'Love bombing de réconciliation' },
          { id: 'mp-3-c', text: 'Il promet tout ce que je veux entendre pour que je ne parte pas, mais rien ne change jamais sur la durée.', isConcern: true, categoryTag: 'Promesses manipulatoires récurrentes' }
        ],
        immediateTeaching: 'Les cadeaux et grandes déclarations passionnées ne sont pas des preuves de changement ; seuls les actes constants dans le temps font foi.'
      },
      {
        id: 'mp-4',
        questionNumber: 4,
        title: 'La Triangulation relationnelle',
        subtitle: 'Utilise-t-il d’autres personnes pour susciter ton insécurité ?',
        type: 'single',
        themeTag: 'Triangulation',
        choices: [
          { id: 'mp-4-a', text: 'Non, notre couple est un espace exclusif et sain où les tiers ne sont pas instrumentalisés.', isConcern: false },
          { id: 'mp-4-b', text: 'Il me compare constamment à ses ex, à des collègues ou à sa mère pour me faire sentir insuffisante.', isConcern: true, categoryTag: 'Triangulation & dévalorisation comparée' },
          { id: 'mp-4-c', text: 'Il crée des rumeurs auprès de son entourage pour me faire passer pour une personne instable.', isConcern: true, categoryTag: 'Campagne de diffamation' }
        ],
        immediateTeaching: 'La triangulation active le sentiment de rivalité et d’insécurité affective pour te forcer à redoubler d’efforts pour mériter son attention.'
      }
    ]
  },

  // 5. Suis-je dans le cycle de la violence ?
  {
    id: 'cycle_de_violence',
    title: 'Suis-je dans le cycle de la violence ?',
    shortTitle: 'Cycle de la Violence',
    badge: 'Module 5 • Mécanique du Cycle',
    iconName: 'RotateCcw',
    colorTheme: {
      accent: '#EA580C',
      bgLight: '#FFF7ED',
      border: '#FED7AA',
      text: '#9A3412'
    },
    targetObjective: 'Comprendre l’engrenage cyclique : Tension → Explosion/Agression → Justification → Réconciliation (Lune de miel) → Nouvelle Tension.',
    educationalAnchor: 'Le cycle de la violence n’est pas un problème de communication, c’est une spirale neuro-émotionnelle conçue pour maintenir l’attachement traumatique.',
    closingWisdomMessage: 'La phase de lune de miel n’est pas une preuve d’amour, c’est le carburant qui te fait supporter la prochaine explosion de tension.',
    questions: [
      {
        id: 'cv-1',
        questionNumber: 1,
        title: 'Phase 1 : La Montée de la Tension',
        subtitle: 'Ressens-tu des périodes où l’atmosphère devient lourde, électrique et menaçante sans raison apparente ?',
        type: 'single',
        themeTag: 'Tension',
        choices: [
          { id: 'cv-1-a', text: 'Non, le climat de vie est stable et prévisible.', isConcern: false },
          { id: 'cv-1-b', text: 'Oui, je sens la colère monter chez lui par des soupirs, des regards noirs ou des critiques en chaîne.', isConcern: true, categoryTag: 'Phase 1 du cycle : Climat de tension' },
          { id: 'cv-1-c', text: 'Je sais exactement qu’une explosion approche et je suis terrorisée à l’idée du moindre déclencheur.', isConcern: true, categoryTag: 'Phase 1 avancée : Anticipation traumatique' }
        ],
        immediateTeaching: 'Dans la phase de tension, la victime dépense une énergie colossale pour tenter d’apaiser l’autre et retarder l’explosion inévitable.'
      },
      {
        id: 'cv-2',
        questionNumber: 2,
        title: 'Phase 2 : L’Explosion ou Crise',
        subtitle: 'Lorsque la tension éclate enfin :',
        type: 'single',
        themeTag: 'Agression',
        choices: [
          { id: 'cv-2-a', text: 'Nous ne vivons pas d’explosions de rage ou d’agressions.', isConcern: false },
          { id: 'cv-2-b', text: 'Il éclate en cris, insultes, dénigrements, portes claquées ou menaces.', isConcern: true, categoryTag: 'Phase 2 : Explosion verbale/psychologique' },
          { id: 'cv-2-c', text: 'L’explosion implique des violences physiques, des bousculades, des objets jetés ou des menaces graves.', isConcern: true, categoryTag: 'Phase 2 : Explosion physique/aiguë' }
        ],
        immediateTeaching: 'L’agression n’est jamais une "perte de contrôle", mais une prise de contrôle violente pour dominer la situation.'
      },
      {
        id: 'cv-3',
        questionNumber: 3,
        title: 'Phase 3 : La Justification / Dédouanement',
        subtitle: 'Juste après l’explosion, comment explique-t-il son geste ?',
        type: 'single',
        themeTag: 'Justification',
        choices: [
          { id: 'cv-3-a', text: 'Il assume pleinement ses erreurs sans chercher de bouc émissaire.', isConcern: false },
          { id: 'cv-3-b', text: 'Il dit : « Tu sais bien que je suis stressé par le boulot » ou « Tu m’as poussé à bout, tu sais que ça m’énerve ».', isConcern: true, categoryTag: 'Phase 3 : Dédouanement & Culpabilisation' },
          { id: 'cv-3-c', text: 'Il minimise totalement l’acte : « Ce n’était rien, tu dramatises comme toujours ».', isConcern: true, categoryTag: 'Phase 3 : Minimisation de la gravité' }
        ],
        immediateTeaching: 'Le dédouanement transfère la responsabilité de l’agression sur des facteurs extérieurs ou sur la victime elle-même.'
      },
      {
        id: 'cv-4',
        questionNumber: 4,
        title: 'Phase 4 : Réconciliation & Lune de Miel',
        subtitle: 'Après l’orage, que se passe-t-il ?',
        type: 'single',
        themeTag: 'Lune de miel',
        choices: [
          { id: 'cv-4-a', text: 'Nous guérissons par un dialogue respectueux et des changements durables.', isConcern: false },
          { id: 'cv-4-b', text: 'Il devient particulièrement doux, prévenant, attentionné et me fait croire que le cauchemar est enfin terminé.', isConcern: true, categoryTag: 'Phase 4 : Lune de miel illusoire' },
          { id: 'cv-4-c', text: 'Quelques jours ou semaines plus tard, la tension recommence inévitablement à monter.', isConcern: true, categoryTag: 'Répétition perpétuelle du cycle' }
        ],
        immediateTeaching: 'C’est cette alternance entre violence et douceur qui crée le lien traumatique (Trauma Bonding), agissant sur le cerveau comme une addiction biochimique.'
      }
    ]
  },

  // 6. Est-ce que je marche sur des œufs ?
  {
    id: 'marcher_sur_des_oeufs',
    title: 'Est-ce que je marche sur des œufs ?',
    shortTitle: 'Marcher sur des Œufs ?',
    badge: 'Module 6 • Impact Émotionnel & Somatique',
    iconName: 'Activity',
    colorTheme: {
      accent: '#0D9488',
      bgLight: '#F0FDFA',
      border: '#99F6E4',
      text: '#115E59'
    },
    targetObjective: 'Mesurer la charge mentale d’hypervigilance et l’organisation de ta vie autour de la peur de ses réactions.',
    educationalAnchor: 'Dans une relation saine, tu ne devrais jamais avoir à organiser ta vie, tes mots et tes respirations autour de la peur de la réaction de l’autre.',
    closingWisdomMessage: 'Le soulagement que tu ressens quand il quitte la maison est la preuve viscérale que ton corps sait ce que ton esprit tente parfois encore de rationaliser.',
    questions: [
      {
        id: 'mo-1',
        questionNumber: 1,
        title: 'Formulation millimétrée des phrases',
        subtitle: 'Réfléchis-tu longuement à la façon exacte de formuler tes propos avant de lui adresser la parole ?',
        type: 'single',
        themeTag: 'Communication',
        choices: [
          { id: 'mo-1-a', text: 'Non, je parle avec fluidité, spontanéité et sans aucune crainte.', isConcern: false },
          { id: 'mo-1-b', text: 'Oui, je pèse chaque mot pour éviter de prononcer un mot déclencheur ou d’éveiller sa susceptibilité.', isConcern: true, categoryTag: 'Autocensure par peur' },
          { id: 'mo-1-c', text: 'Je préfère me taire la plupart du temps car tout ce que je dis peut être retenu contre moi.', isConcern: true, categoryTag: 'Silence de survie imposé' }
        ],
        immediateTeaching: 'Quand une simple phrase du quotidien demande une stratégie digne d’un démineur, la sécurité relationnelle a disparu.'
      },
      {
        id: 'mo-2',
        questionNumber: 2,
        title: 'Scanner son humeur en entrant dans une pièce',
        subtitle: 'Lorsque tu rentres chez toi ou qu’il passe la porte :',
        type: 'single',
        themeTag: 'Hypervigilance',
        choices: [
          { id: 'mo-2-a', text: 'Je suis heureuse et sereine de le retrouver.', isConcern: false },
          { id: 'mo-2-b', text: 'Mon premier réflexe automatique est d’analyser son visage, le bruit de ses pas et le ton de sa voix pour deviner son humeur.', isConcern: true, categoryTag: 'Scanner d’humeur automatique' },
          { id: 'mo-2-c', text: 'J’ai une boule au ventre et mon rythme cardiaque s’accélère dès que j’entends la clé dans la serrure.', isConcern: true, categoryTag: 'Réponse somatique d’alarme neurovégétative' }
        ],
        immediateTeaching: 'Le système nerveux en hypervigilance scanne en permanence l’environnement pour détecter le danger et préparer le corps à la fuite ou au figement.'
      },
      {
        id: 'mo-3',
        questionNumber: 3,
        title: 'Cacher des choses pourtant totalement normales',
        subtitle: 'Caches-tu des achats anodins, des messages d’amis ou des opinions banales par crainte de son jugement ?',
        type: 'single',
        themeTag: 'Dissimulation',
        choices: [
          { id: 'mo-3-a', text: 'Non, je partage ma vie en toute transparence sans crainte de reproches irrationnels.', isConcern: false },
          { id: 'mo-3-b', text: 'Oui, je cache des tickets de caisse de courses ordinaires ou j’efface des messages d’amis pour ne pas avoir à me justifier.', isConcern: true, categoryTag: 'Dissimulation de normalité par protection' },
          { id: 'mo-3-c', text: 'J’ai une vie parallèle de secrets sur des choses totalement normales pour échapper à sa police morale.', isConcern: true, categoryTag: 'Double vie de survie psychologique' }
        ],
        immediateTeaching: 'Cacher des éléments sains de sa vie n’est pas de la malhonnêteté, c’est une stratégie d’auto-défense face à une tyrannie domestique.'
      },
      {
        id: 'mo-4',
        questionNumber: 4,
        title: 'S’excuser automatiquement sans avoir fait de mal',
        subtitle: 'T’excuses-tu fréquemment alors que tu as l’intime conviction de n’avoir commis aucune faute ?',
        type: 'single',
        themeTag: 'Apaisement',
        choices: [
          { id: 'mo-4-a', text: 'Non, je ne m’excuse que lorsque j’ai réellement commis une maladresse.', isConcern: false },
          { id: 'mo-4-b', text: 'Oui, je m’excuse constamment juste pour acheter la paix et stopper la crise.', isConcern: true, categoryTag: 'Excuses d’apaisement forcé' },
          { id: 'mo-4-c', text: 'J’en suis venue à croire que tout ce qui ne va pas dans sa vie est réellement de ma faute.', isConcern: true, categoryTag: 'Intériorisation toxique de la faute' }
        ],
        immediateTeaching: 'S’excuser pour calmer l’autre valide son pouvoir abusif et renforce la croyance erronée que tu mérites ses colères.'
      },
      {
        id: 'mo-5',
        questionNumber: 5,
        title: 'Le soulagement profond de l’absence',
        subtitle: 'Lorsque ton partenaire s’absente pour le travail, un week-end ou une soirée :',
        type: 'single',
        themeTag: 'Soulagement',
        choices: [
          { id: 'mo-5-a', text: 'Il me manque doucement, mais je vis bien mon temps pour moi.', isConcern: false },
          { id: 'mo-5-b', text: 'Je ressens un soulagement physique immense, mes épaules se détendent et je peux enfin respirer.', isConcern: true, categoryTag: 'Répit somatique libérateur' },
          { id: 'mo-5-c', text: 'Je redoute le moment exact de son retour comme la fin d’une permission de liberté.', isConcern: true, categoryTag: 'Syndrome du sursis carcéral' }
        ],
        immediateTeaching: 'Le soulagement viscéral en son absence est le baromètre le plus fiable de la toxicité du lien.'
      }
    ]
  },

  // 7. Est-ce vraiment de l'amour ou du contrôle ?
  {
    id: 'amour_ou_controle',
    title: 'Est-ce vraiment de l’amour ou du contrôle ?',
    shortTitle: 'Amour ou Contrôle ?',
    badge: 'Module 7 • Études de Cas & Scénarios',
    iconName: 'HelpCircle',
    colorTheme: {
      accent: '#2563EB',
      bgLight: '#EFF6FF',
      border: '#BFDBFE',
      text: '#1D4ED8'
    },
    targetObjective: 'Distinguer par des scénarios concrets la véritable attention bienveillante, l’inquiétude normale, la jalousie et le contrôle coercitif.',
    educationalAnchor: 'L’amour cherche le bonheur et la liberté de l’autre ; le contrôle cherche la possession et la soumission.',
    closingWisdomMessage: 'La jalousie n’est pas une preuve d’amour, c’est une preuve de possessivité. Quelqu’un qui t’aime veut que tu te sentes forte, entourée et libre.',
    questions: [
      {
        id: 'ac-1',
        questionNumber: 1,
        title: 'Scénario 1 : « Il veut constamment savoir où tu es. »',
        scenarioContext: 'Tu sors pour boire un verre avec une collègue. Il t’appelle 5 fois en une heure et t’envoie des messages exigeant de savoir quand tu rentres.',
        type: 'scenario',
        themeTag: 'Déplacements',
        choices: [
          { 
            id: 'ac-1-a', 
            text: 'A. Il s’inquiète sincèrement parce qu’il m’aime et veut me protéger des dangers.', 
            isConcern: true,
            alertExplanation: 'Attention au piège : déguiser le contrôle sous forme d’inquiétude protectrice est une rationalisation courante.'
          },
          { 
            id: 'ac-1-b', 
            text: 'B. Ça dépend du contexte : un message pour savoir si tout va bien est normal, pas cinq appels insistants.', 
            isConcern: false 
          },
          { 
            id: 'ac-1-c', 
            text: 'C. Il cherche à contrôler mes déplacements, gâcher ma soirée et interrompre mon lien avec autrui.', 
            isConcern: true,
            categoryTag: 'Surveillance déguisée en sollicitude'
          }
        ],
        immediateTeaching: 'Différence clé : L’attention bienveillante te fait confiance et te laisse profiter. Le contrôle cherche à saturer ton espace mental même à distance.'
      },
      {
        id: 'ac-2',
        questionNumber: 2,
        title: 'Scénario 2 : « Il n’aime pas tes ami(e)s proches. »',
        scenarioContext: 'Il te répète que ta meilleure amie est toxique, jalouse de toi et qu’elle a une mauvaise influence sur votre couple.',
        type: 'scenario',
        themeTag: 'Entourage',
        choices: [
          { 
            id: 'ac-2-a', 
            text: 'A. Il voit clair et veut seulement m’éviter d’être déçue par des faux amis.', 
            isConcern: true 
          },
          { 
            id: 'ac-2-b', 
            text: 'B. On peut ne pas apprécier tous les amis de son partenaire sans pour autant exiger de couper les ponts.', 
            isConcern: false 
          },
          { 
            id: 'ac-2-c', 
            text: 'C. Il dénigre systématiquement les personnes qui pourraient me soutenir ou me donner un avis lucide.', 
            isConcern: true,
            categoryTag: 'Stratégie de rupture du tissu de soutien'
          }
        ],
        immediateTeaching: 'L’agresseur isole toujours sa proie de ses témoins de lucidité pour devenir sa seule source d’information et de validation.'
      },
      {
        id: 'ac-3',
        questionNumber: 3,
        title: 'Scénario 3 : « Les mots de passe et réseaux sociaux »',
        scenarioContext: 'Il exige que vous ayez accès aux téléphones et mots de passe l’un de l’autre en disant : "Si on n’a rien à cacher, on n’a pas de secret".',
        type: 'scenario',
        themeTag: 'Transparence forcée',
        choices: [
          { 
            id: 'ac-3-a', 
            text: 'A. C’est la preuve d’une transparence absolue et d’un amour sans mensonge.', 
            isConcern: true 
          },
          { 
            id: 'ac-3-b', 
            text: 'B. Deux personnes qui s’aiment n’ont pas besoin d’espionner leurs messageries pour avoir confiance.', 
            isConcern: false 
          },
          { 
            id: 'ac-3-c', 
            text: 'C. C’est une intrusion autoritaire qui supprime tout droit à la vie privée sous couvert de vertu.', 
            isConcern: true,
            categoryTag: 'Cyber-inquisition et perte d’intimité'
          }
        ],
        immediateTeaching: 'Le slogan "qui ne cache rien ne craint rien" est la devise des régimes totalitaires, pas celle d’un amour sain.'
      },
      {
        id: 'ac-4',
        questionNumber: 4,
        title: 'Scénario 4 : « La scène de jalousie en public »',
        scenarioContext: 'Un serveur ou un passant a été poli avec toi. Il te fait une scène furieuse au restaurant en t’accusant de l’avoir allumé.',
        type: 'scenario',
        themeTag: 'Jalousie',
        choices: [
          { 
            id: 'ac-4-a', 
            text: 'A. C’est flatteur, cela prouve qu’il tient énormément à moi et a peur de me perdre.', 
            isConcern: true 
          },
          { 
            id: 'ac-4-b', 
            text: 'B. C’est disproportionné et désagréable.', 
            isConcern: true 
          },
          { 
            id: 'ac-4-c', 
            text: 'C. C’est une possessivité toxique qui m’objective et m’accuse injustement pour asseoir sa domination.', 
            isConcern: true,
            categoryTag: 'Possessivité pathologique et humiliation'
          }
        ],
        immediateTeaching: 'La jalousie théâtralisée est un acte d’intimidation publique conçu pour te faire baisser les yeux et rétrécir ta présence sociale.'
      }
    ]
  },

  // 8. Comment cette relation m'a-t-elle changée ?
  {
    id: 'comment_relation_changee',
    title: 'Comment cette relation m’a-t-elle changée ?',
    shortTitle: 'Comment j’ai changé ?',
    badge: 'Module 8 • Bilan & Reconstitution',
    iconName: 'Sparkles',
    colorTheme: {
      accent: '#059669',
      bgLight: '#ECFDF5',
      border: '#A7F3D0',
      text: '#065F46'
    },
    targetObjective: 'Porter le regard avec une infinie bienveillance sur toi-même, ton évolution, tes pertes et le chemin de ta renaissance.',
    educationalAnchor: 'La femme joyeuse et lumineuse que tu étais avant n’a pas disparu : elle est simplement en sommeil sous une chape de survie.',
    closingWisdomMessage: 'Reconnaître l’impact de cette relation sur toi n’est pas un aveu de faiblesse, c’est l’acte fondateur de ta liberté et de ta souveraineté retrouvée.',
    questions: [
      {
        id: 'rc-1',
        questionNumber: 1,
        title: 'Confiance en toi et estime personnelle',
        subtitle: 'Comparée à la personne que tu étais avant cette relation :',
        type: 'single',
        themeTag: 'Estime de soi',
        choices: [
          { id: 'rc-1-a', text: 'Je me sens tout aussi confiante, solide et épanouie.', isConcern: false },
          { id: 'rc-1-b', text: 'J’ai perdu beaucoup d’assurance, je doute de mes capacités et de mon attrait.', isConcern: true, categoryTag: 'Érosion de l’estime de soi' },
          { id: 'rc-1-c', text: 'J’en suis venue à croire intimement que je suis nulle et que personne d’autre ne voudrait de moi.', isConcern: true, categoryTag: 'Destruction de la valeur personnelle' }
        ],
        immediateTeaching: 'La croyance que "personne d’autre ne voudra de toi" est une idée toxique implantée sciemment par le partenaire pour t’empêcher de partir.'
      },
      {
        id: 'rc-2',
        questionNumber: 2,
        title: 'Confiance en ton propre jugement et lucidité',
        subtitle: 'Concernant tes perceptions, tes intuitions et ta mémoire :',
        type: 'single',
        themeTag: 'Jugement',
        choices: [
          { id: 'rc-2-a', text: 'Je fais pleinement confiance à mes ressentis et à ma mémoire.', isConcern: false },
          { id: 'rc-2-b', text: 'Je vérifie souvent mes souvenirs ou je me demande si je n’exagère pas tout.', isConcern: true, categoryTag: 'Doute instillé sur sa perception' },
          { id: 'rc-2-c', text: 'Je ne sais plus du tout ce qui est normal ou anormal, vrai ou faux.', isConcern: true, categoryTag: 'Perte de repères de réalité' }
        ],
        immediateTeaching: 'Quand on a été soumise au doute systématique, retrouver son intuition est la première clé de reconstruction.'
      },
      {
        id: 'rc-3',
        questionNumber: 3,
        title: 'Te reconnais-tu encore dans le miroir ?',
        subtitle: 'Quand tu penses à tes rires d’avant, ton énergie et tes rêves :',
        type: 'single',
        themeTag: 'Identité',
        choices: [
          { id: 'rc-3-a', text: 'Oui, je suis fidèle à mes valeurs et à mon énergie vitale.', isConcern: false },
          { id: 'rc-3-b', text: 'J’ai l’impression d’avoir vieilli prématurément et d’avoir éteint ma flamme intérieure.', isConcern: true, categoryTag: 'Épuisement vital' },
          { id: 'rc-3-c', text: 'Je ne me reconnais plus du tout, j’ai l’impression d’être un fantôme qui fonctionne en mode survie.', isConcern: true, categoryTag: 'Dépersonnalisation & mode survie' }
        ],
        immediateTeaching: 'Le mode survie coupe les émotions pour endurer la douleur. Dès que la sécurité revient, la flamme se rallume immédiatement.'
      },
      {
        id: 'rc-4',
        questionNumber: 4,
        title: 'La pensée : « Ce n’est pas assez grave pour être de la violence »',
        subtitle: 'T’est-il déjà arrivé de te dire que tant qu’il n’y avait pas de coups de poing, tu n’avais pas le droit de te plaindre ?',
        type: 'single',
        themeTag: 'Légitimité',
        choices: [
          { id: 'rc-4-a', text: 'Non, je sais que toute violence psychologique ou verbale est intolérable.', isConcern: false },
          { id: 'rc-4-b', text: 'Oui, je me répète souvent qu’il y a pire ailleurs et que je devrais être plus patiente.', isConcern: true, categoryTag: 'Minimisation de sa propre souffrance' },
          { id: 'rc-4-c', text: 'J’ai honte d’en parler parce que j’ai peur qu’on me dise que ce n’est rien.', isConcern: true, categoryTag: 'Honte et peur du rejet' }
        ],
        immediateTeaching: 'Il n’y a pas de "petite" violence. La violence psychologique produit les mêmes traumatismes neurologiques que la violence physique.'
      },
      {
        id: 'rc-5',
        questionNumber: 5,
        title: 'Sentiment de responsabilité envers son bonheur',
        subtitle: 'Te sens-tu responsable de son équilibre mental, de ses colères et de son avenir ?',
        type: 'single',
        themeTag: 'Sauveuse',
        choices: [
          { id: 'rc-5-a', text: 'Non, chacun est responsable de ses émotions et de ses actes.', isConcern: false },
          { id: 'rc-5-b', text: 'Oui, j’ai constamment peur qu’il s’effondre ou fasse une bêtise si je m’éloigne.', isConcern: true, categoryTag: 'Syndrome de l’otage affectif' },
          { id: 'rc-5-c', text: 'Je sacrifie ma propre santé pour le maintenir à flot.', isConcern: true, categoryTag: 'Sacrifice de soi destructeur' }
        ],
        immediateTeaching: 'Tu n’es ni son médecin, ni sa thérapeute, ni son punching-ball émotionnel. Tu es responsable de ta seule vie et de ta sécurité.'
      }
    ]
  }
];

export interface QuestionnaireAnswerState {
  questionId: string;
  selectedChoiceIds: string[];
  answeredAt: string;
}

export interface UserModuleProgress {
  moduleId: QuestionnaireId;
  answers: Record<string, QuestionnaireAnswerState>;
  isCompleted: boolean;
  completedAt?: string;
  identifiedConcernsCount: number;
  identifiedConcernCategories: string[];
  hasCriticalAlert: boolean;
}

export interface InteractiveAssessmentsState {
  violentometreSelections: string[]; // List of selected Violentomètre item IDs
  modulesProgress: Record<QuestionnaireId, UserModuleProgress>;
  lastUpdated: string;
}
