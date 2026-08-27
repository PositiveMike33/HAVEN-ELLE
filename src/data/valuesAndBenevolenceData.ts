export interface CoreValueItem {
  id: string;
  name: string;
  category: 'Sécurité & Paix' | 'Dignité & Respect' | 'Douceur & Soin' | 'Liberté & Vérité' | 'Force & Courage';
  definition: string;
  benevolentVision: string; // How this value transforms the view of oneself with extreme benevolence
  dailyMicroAction: string;
  iconName: string;
  color: string;
}

export const PRESET_CORE_VALUES: CoreValueItem[] = [
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
    name: 'Sécurité & Sanctuaire',
    category: 'Sécurité & Paix',
    definition: 'Le droit fondamental de vivre dans la tranquillité, protégé des violences, du contrôle et de la peur.',
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
  "« À travers mes valeurs de dignité et de paix, je refuse désormais toute parole qui tenterait de me diminuer. »",
  "« Je choisis de me voir avec les yeux de la plus tendre bienveillance : j'ai fait de mon mieux avec les armes que j'avais. »",
  "« Mes valeurs sont mon phare inébranlable. Elles éclairent ma beauté intérieure et guident chacun de mes choix. »",
  "« Je suis digne de douceur, d'écoute et de respect infini simplement parce que j'existe. »",
  "« Chaque fois que j'honore une de mes valeurs, je restaure l'amour pur et bienveillant que je me porte. »"
];
