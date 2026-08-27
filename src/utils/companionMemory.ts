import { CompanionMemoryProfile, DetailedSafetyPlan } from '../types';
import { calculateLevelFromPoints, getCycleForLevel, RESILIENCE_CYCLES } from '../data/resilience100Levels';

const COMPANION_STORAGE_KEY = 'haven_companion_evolution_v2';

export const INITIAL_COMPANION_PROFILE: CompanionMemoryProfile = {
  relationshipLevel: 10, // Level 10 / 100 (140 points)
  relationshipTitle: "Cycle 1 : Se construire une liste de valeurs pour se voir avec la plus grande bienveillance",
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
      'Entrée dans le Cycle 1 : Définition de sa liste de valeurs & Regard bienveillant'
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

function getRelationshipTitleForLevel(level: number): string {
  const cycleId = getCycleForLevel(level);
  const cycle = RESILIENCE_CYCLES.find(c => c.id === cycleId);
  return cycle ? `${cycle.subtitle} (Niveau ${level}/100)` : `Niveau ${level}/100`;
}

export const CompanionMemoryService = {
  getProfile(): CompanionMemoryProfile {
    try {
      const data = localStorage.getItem(COMPANION_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(COMPANION_STORAGE_KEY, JSON.stringify(INITIAL_COMPANION_PROFILE));
        return INITIAL_COMPANION_PROFILE;
      }
      const parsed = JSON.parse(data);
      // Ensure level calculation is accurate based on 100-level system
      const currentLevel = calculateLevelFromPoints(parsed.resiliencePoints || 0);
      parsed.relationshipLevel = currentLevel;
      parsed.relationshipTitle = getRelationshipTitleForLevel(currentLevel);
      return parsed;
    } catch {
      return INITIAL_COMPANION_PROFILE;
    }
  },

  saveProfile(profile: CompanionMemoryProfile): void {
    const currentLevel = calculateLevelFromPoints(profile.resiliencePoints || 0);
    profile.relationshipLevel = currentLevel;
    profile.relationshipTitle = getRelationshipTitleForLevel(currentLevel);
    localStorage.setItem(COMPANION_STORAGE_KEY, JSON.stringify(profile));
  },

  addResiliencePoints(pointsToAdd: number, victoryLabel?: string): CompanionMemoryProfile {
    const profile = this.getProfile();
    const updatedPoints = Math.min(1500, profile.resiliencePoints + pointsToAdd);
    const newLevel = calculateLevelFromPoints(updatedPoints);
    const newTitle = getRelationshipTitleForLevel(newLevel);

    const keyVictories = victoryLabel 
      ? [...new Set([victoryLabel, ...(profile.userContext.keyVictories || [])])].slice(0, 12)
      : profile.userContext.keyVictories;

    const updatedProfile: CompanionMemoryProfile = {
      ...profile,
      resiliencePoints: updatedPoints,
      relationshipLevel: newLevel,
      relationshipTitle: newTitle,
      userContext: {
        ...profile.userContext,
        keyVictories,
      }
    };

    this.saveProfile(updatedProfile);
    window.dispatchEvent(new CustomEvent('haven-resilience-updated', { detail: updatedProfile }));
    return updatedProfile;
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

    const updatedPoints = Math.min(1500, profile.resiliencePoints + 25);
    const newCount = profile.interactionCount + 1;
    const currentLevel = calculateLevelFromPoints(updatedPoints);
    const currentTitle = getRelationshipTitleForLevel(currentLevel);

    const updatedNotes = noteFromHaven 
      ? [noteFromHaven, ...(profile.userContext.notesFromHaven || []).slice(0, 4)]
      : profile.userContext.notesFromHaven;

    const updatedProfile: CompanionMemoryProfile = {
      ...profile,
      interactionCount: newCount,
      lastInteractionDate: today,
      resiliencePoints: updatedPoints,
      relationshipLevel: currentLevel,
      relationshipTitle: currentTitle,
      userContext: {
        ...profile.userContext,
        lastEmotionalState: emotionalTone,
        notesFromHaven: updatedNotes,
      },
      conversationsHistory: newHistory,
    };

    this.saveProfile(updatedProfile);
    window.dispatchEvent(new CustomEvent('haven-resilience-updated', { detail: updatedProfile }));
    return updatedProfile;
  },

  updateSafetyPlanMilestone(plan: DetailedSafetyPlan): CompanionMemoryProfile {
    const profile = this.getProfile();
    const updatedPoints = Math.min(1500, profile.resiliencePoints + 60);
    const newLevel = calculateLevelFromPoints(updatedPoints);
    
    const keyVictories = [
      ...new Set([
        'Plan de sécurité interactif personnalisé validé',
        ...(profile.userContext.keyVictories || []),
      ]),
    ];

    const updatedProfile: CompanionMemoryProfile = {
      ...profile,
      resiliencePoints: updatedPoints,
      relationshipLevel: newLevel,
      relationshipTitle: getRelationshipTitleForLevel(newLevel),
      userContext: {
        ...profile.userContext,
        safetyPlanReady: true,
        situationBrief: plan.summary || profile.userContext.situationBrief,
        keyVictories,
      },
    };

    this.saveProfile(updatedProfile);
    window.dispatchEvent(new CustomEvent('haven-resilience-updated', { detail: updatedProfile }));
    return updatedProfile;
  },

  recordBreathingCycle(): CompanionMemoryProfile {
    return this.addResiliencePoints(15, 'Séance de cohérence cardiaque complétée');
  },

  getSystemContextPrompt(): string {
    const p = this.getProfile();
    const ctx = p.userContext;
    const currentCycleId = getCycleForLevel(p.relationshipLevel);
    const currentCycle = RESILIENCE_CYCLES.find(c => c.id === currentCycleId);

    return `
    MISSION ET RÔLE : MOTEUR D'ÉVOLUTION ET ACCOMPAGNEMENT HAVEN-ELLE
    Tu agis en tant que Psychanalyste IA et Moteur Fondateur au sein de la plateforme HAVEN-ELLE. Ton objectif est de guider l'utilisatrice dans son cheminement de reconstruction et de résilience relationnelle à travers un cadre adaptatif, éthique et rigoureusement progressif.

    1. LOGIQUE D'INTERFACE ET PROGRESSION PAR NIVEAUX (ÉCHELLE 1 À 100 PALIERS)
    L'évolution est découpée en 4 GRANDS CYCLES DE 25 NIVEAUX (15 points par niveau = progression rapide et stimulante pour ne jamais décourager la victime) :
    
    - 🌸 CYCLE 1 (NIVEAUX 1 À 25) : "Se construire une liste de valeurs pour se voir avec la plus grande bienveillance"
      Focus : Clarification des valeurs fondamentales (dignité, paix, respect, intégrité, douceur), auto-affirmation protectrice, transformation du regard intérieur pour se voir avec une bienveillance absolue, déculpabilisation totale.
    
    - 🌿 CYCLE 2 (NIVEAUX 26 À 50) : "Développement personnel, Force & Nouveau contexte"
      Focus : Empowerment, discernement, pose de limites fermes et infranchissables, relire les épreuves passées comme des leviers de lucidité et de puissance.
    
    - 🕊️ CYCLE 3 (NIVEAUX 51 À 75) : "Le pardon à soi pour pardonner à autrui"
      Focus : Pardon libérateur (rompre le poison de la rancœur pour se sauver soi-même), couper les cordes de l'emprise, pacification mémorielle.
    
    - 💫 CYCLE 4 (NIVEAUX 76 À 100) : "L'amour sans condition, Acceptation bienveillante & Guérison totale émotionnelle"
      Focus : Sanctuaire d'amour inconditionnel, plénitude, paix inaltérable, joie pure, accomplissement total.

    ÉTAT ACTUEL DE L'UTILISATRICE :
    - Niveau actuel : ${p.relationshipLevel} / 100
    - Points accumulés : ${p.resiliencePoints} / 1500 pts
    - Cycle actif : Cycle ${currentCycleId} - "${currentCycle?.subtitle}"

    2. PROTOCOLE D'ALIGNEMENT ÉTHIQUE : RÉDUCTION D'ENTROPIE
    - Réduire l'incertitude, le chaos décisionnel et le désalignement interne.
    - Maximiser la sécurité psychologique, la clarté mentale et l'autonomie.
    - Neutralité bienveillante, écoute active sans jugement, rejet des dépendances toxiques. Alliée inébranlable et sécurisante.

    3. FORMAT ET POSTURE DES RÉPONSES
    - Ton : Calme, empathique, scientifique et structuré.
    - Clarté : Vocabulaire simple, accessible, sans jargon abstrait.
    - Feedback de boucle : Mettre en valeur la progression (rappeler les points gagnés et le palier franchi).

    4. PROTOCOLE D'APPRENTISSAGE ET D'ÉVOLUTION (QUIZ & POINTS)
    - Valorise chaque micro-victoire (+15 à +25 points attribués).
    - Adapte les conseils au cycle en cours (${currentCycle?.subtitle}).

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

