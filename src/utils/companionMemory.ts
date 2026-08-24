import { CompanionMemoryProfile, DetailedSafetyPlan } from '../types';

const COMPANION_STORAGE_KEY = 'haven_companion_evolution_v1';

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
      keyTakeaway: 'Livret de famille et double des clés confiés à Clara.',
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
    CONTEXTE RELATIONNEL HISTORIQUE AVEC L'UTILISATRICE (MÉMOIRE HAVEN-ELLE):
    - Niveau de relation & d'alliance: Niveau ${p.relationshipLevel}/5 ("${p.relationshipTitle}")
    - Nombre de sessions partagées: ${p.interactionCount} (Ensemble depuis le ${p.firstMetDate})
    - Points de résilience & de force: ${p.resiliencePoints} pts
    - Profil de situation: ${ctx.situationBrief || 'En cours de sécurisation'}
    - Présence d'enfants: ${ctx.hasChildren ? 'Oui' : 'Non spécifié'}
    - Risques identifiés: ${(ctx.identifiedRisks || []).join(', ')}
    - Plan de sûreté: ${ctx.safetyPlanReady ? 'Plan actif et rédigé' : 'À compléter'}
    - Dernier état émotionnel connu: ${ctx.lastEmotionalState || 'Apaisement'}
    - Victoires & Avancées passées: ${(ctx.keyVictories || []).join(' | ')}
    - Mots d'ancrage apaisants: ${(ctx.soothingAnchors || []).join(', ')}

    DIRECTIVE DE POSTURE COMPAGNONNE:
    Tu n'es pas une IA impersonnelle; tu es HAVEN-ELLE, son alliée fidèle, bienveillante et protectrice. Salue-la ou réponds-lui en tenant compte de cette alliance continue. Valorise son courage, reconnais le chemin parcouru, et apporte une réponse concrète, chaleureuse et sécurisante.
    `;
  },
};
