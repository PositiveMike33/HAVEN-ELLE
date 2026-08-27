import { CompanionMemoryProfile, DetailedSafetyPlan } from '../types';

const COMPANION_STORAGE_KEY = 'haven_companion_evolution_v2';

export const INITIAL_COMPANION_PROFILE: CompanionMemoryProfile = {
  relationshipLevel: 2,
  relationshipTitle: 'Sanctuaire de Confiance',
  interactionCount: 3,
  firstMetDate: '2026-08-18',
  lastInteractionDate: new Date().toISOString().split('T')[0],
  resiliencePoints: 140,
  userContext: {
    preferredName: 'Amie',
    situationBrief: 'Recherche de mise en sécurité active et préparation d\'un plan d\'émancipation serein.',
    hasChildren: true,
    identifiedRisks: ['Contrôle téléphonique', 'Menaces verbales', 'Isolement'],
    safetyPlanReady: true,
    lastEmotionalState: 'Déterminée mais vigilante',
    soothingAnchors: ['Respiration 4-7-8', 'Lumière du matin', 'Penser à la sécurité de mes enfants'],
    keyVictories: [
      'Identification de 2 contacts de confiance prêts à réagir',
      'Création du coffre de preuves chiffré',
      'Apprentissage de la cohérence cardiaque anti-panique',
    ],
    notesFromHaven: [
      'Vous avez fait preuve d’un immense courage lors de notre première séance.',
      'Votre réseau d’alerte est prêt, vos preuves sont protégées.',
      'Je veille sur vous sans interruption.',
    ],
  },
  conversationsHistory: [
    {
      date: '2026-08-20',
      topic: 'Préparation du sac de départ d\'urgence',
      emotionalState: 'Inquiétude modérée',
      keyTakeaway: 'Livret de famille et double des clés confiés à Michael Gauthier Guillet.',
    },
    {
      date: '2026-08-22',
      topic: 'Gestion de crise de panique',
      emotionalState: 'Angoisse aiguë -> Apaisement',
      keyTakeaway: 'Exercice 4-7-8 accompli avec succès (3 cycles).',
    },
  ],
};

const RELATIONSHIP_TIERS = [
  { level: 1, title: 'Écoute & Premier Contact', minPoints: 0, minInteractions: 0 },
  { level: 2, title: 'Sanctuaire de Confiance', minPoints: 80, minInteractions: 2 },
  { level: 3, title: 'Alliance Protectrice', minPoints: 200, minInteractions: 5 },
  { level: 4, title: 'Bouclier & Force Intérieure', minPoints: 400, minInteractions: 10 },
  { level: 5, title: 'Harmonie & Renaissance', minPoints: 700, minInteractions: 18 },
];

export const CompanionMemoryService = {
  getProfile(): CompanionMemoryProfile {
    try {
      const data = localStorage.getItem(COMPANION_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(COMPANION_STORAGE_KEY, JSON.stringify(INITIAL_COMPANION_PROFILE));
        return INITIAL_COMPANION_PROFILE;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_COMPANION_PROFILE;
    }
  },

  saveProfile(profile: CompanionMemoryProfile): void {
    localStorage.setItem(COMPANION_STORAGE_KEY, JSON.stringify(profile));
  },

  recordInteraction(topic: string, emotionalTone: string, keyTakeaway: string, noteFromHaven?: string): CompanionMemoryProfile {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];

    const newHistory = [
      {
        date: today,
        topic,
        emotionalState: emotionalTone,
        keyTakeaway,
      },
      ...profile.conversationsHistory.slice(0, 9),
    ];

    const updatedPoints = profile.resiliencePoints + 25;
    const newCount = profile.interactionCount + 1;

    // Calculate tier
    let currentTier = RELATIONSHIP_TIERS[0];
    for (const tier of RELATIONSHIP_TIERS) {
      if (updatedPoints >= tier.minPoints && newCount >= tier.minInteractions) {
        currentTier = tier;
      }
    }

    const updatedNotes = noteFromHaven 
      ? [noteFromHaven, ...(profile.userContext.notesFromHaven || []).slice(0, 4)]
      : profile.userContext.notesFromHaven;

    const updatedProfile: CompanionMemoryProfile = {
      ...profile,
      interactionCount: newCount,
      lastInteractionDate: today,
      resiliencePoints: updatedPoints,
      relationshipLevel: currentTier.level,
      relationshipTitle: currentTier.title,
      userContext: {
        ...profile.userContext,
        lastEmotionalState: emotionalTone,
        notesFromHaven: updatedNotes,
      },
      conversationsHistory: newHistory,
    };

    this.saveProfile(updatedProfile);
    return updatedProfile;
  },

  updateSafetyPlanMilestone(plan: DetailedSafetyPlan): CompanionMemoryProfile {
    const profile = this.getProfile();
    const updatedPoints = profile.resiliencePoints + 60;
    
    const keyVictories = [
      ...new Set([
        'Plan de sécurité interactif personnalisé établi avec succès',
        ...(profile.userContext.keyVictories || []),
      ]),
    ];

    const updatedProfile: CompanionMemoryProfile = {
      ...profile,
      resiliencePoints: updatedPoints,
      userContext: {
        ...profile.userContext,
        safetyPlanReady: true,
        situationBrief: plan.summary || profile.userContext.situationBrief,
        keyVictories,
      },
    };

    this.saveProfile(updatedProfile);
    return updatedProfile;
  },

  recordBreathingCycle(): CompanionMemoryProfile {
    const profile = this.getProfile();
    const updatedPoints = profile.resiliencePoints + 15;
    const updatedProfile: CompanionMemoryProfile = {
      ...profile,
      resiliencePoints: updatedPoints,
    };
    this.saveProfile(updatedProfile);
    return updatedProfile;
  },

  getSystemContextPrompt(): string {
    const p = this.getProfile();
    const ctx = p.userContext;
    return `
    MISSION ET RÔLE : MOTEUR D'ÉVOLUTION ET ACCOMPAGNEMENT HAVEN-ELLE
    Tu agis en tant que Psychanalyste IA et Moteur Fondateur au sein de la plateforme HAVEN-ELLE. Ton objectif est de guider l'utilisatrice dans son cheminement de reconstruction et de résilience relationnelle à travers un cadre adaptatif, éthique et rigoureusement progressif.

    1. LOGIQUE D'INTERFACE ET PROGRESSION PAR NIVEAUX (GAMIFICATION BIENVEILLANTE)
    - Niveaux 1 à 10 (Phase d'Ancrage et Récupération) : Focus sur la respiration, zéro surcharge cognitive, effet placebo positif par des faits scientifiques.
    - Niveau 10 et + (Phase d'Intégration et Sanctuaire) : Accompagnement approfondi, posture synchronisée avec le score.
    (Score actuel de l'utilisatrice : ${p.resiliencePoints} pts - Niveau ${p.relationshipLevel}/5)

    2. PROTOCOLE D'ALIGNEMENT ÉTHIQUE : RÉDUCTION D'ENTROPIE
    - Réduire l'incertitude, le chaos décisionnel et le désalignement interne.
    - Maximiser la sécurité psychologique, la clarté mentale et l'autonomie.
    - Neutralité bienveillante, écoute active sans jugement, rejet des dépendances toxiques. Alliée inébranlable et sécurisante.

    3. FORMAT ET POSTURE DES RÉPONSES
    - Ton : Calme, empathique, scientifique et structuré.
    - Clarté : Vocabulaire simple, accessible, sans jargon abstrait.
    - Feedback de boucle : Mettre en valeur la progression.

    4. PROTOCOLE D'APPRENTISSAGE ET D'ÉVOLUTION (QUIZ & POINTS)
    - **Niveaux Initiaux (Découverte) :** Commence toujours par poser des questions douces et ciblées pour comprendre les réelles blessures et le contexte de la personne.
    - **Niveaux Suivants (Apprentissage) :** Une fois le contexte compris, chaque échange doit inclure une notion d'apprentissage en développement personnel.
    - **Validation des acquis :** À la fin de chaque explication, pose une question de validation. 
      - Si l'utilisatrice répond correctement : félicite-la, ajoute explicitement "Tu gagnes +15 points de résilience", et passe à l'étape suivante.
      - Si la réponse est imprécise ou erronée : ne la blâme jamais. Repousse doucement dans la branche du contexte mal compris, donne des exercices pratiques et de nouveaux exemples jusqu'à ce que la notion soit comprise à 100%.
    - **Objectif Avatar :** Rappelle-lui occasionnellement que l'accumulation de points débloquera bientôt la "Création de son Avatar IA" et d'autres modules réconfortants (jeux, bonus).


    CONTEXTE RELATIONNEL HISTORIQUE AVEC L'UTILISATRICE (MÉMOIRE HAVEN-ELLE):
    - Niveau d'alliance: "${p.relationshipTitle}" (Ensemble depuis le ${p.firstMetDate})
    - Profil de situation: ${ctx.situationBrief || 'En cours de sécurisation'}
    - Présence d'enfants: ${ctx.hasChildren ? 'Oui' : 'Non spécifié'}
    - Risques identifiés: ${(ctx.identifiedRisks || []).join(', ')}
    - Plan de sûreté: ${ctx.safetyPlanReady ? 'Actif' : 'À compléter'}
    - Dernier état émotionnel connu: ${ctx.lastEmotionalState || 'Apaisement'}
    - Victoires & Avancées passées: ${(ctx.keyVictories || []).join(' | ')}
    - Mots d'ancrage apaisants: ${(ctx.soothingAnchors || []).join(', ')}
    `;
  },
};
