import { CompanionMemoryProfile, DetailedSafetyPlan } from '../types';
import { calculateLevelFromPoints, getCycleForLevel, RESILIENCE_CYCLES } from '../data/resilience100Levels';

const COMPANION_STORAGE_KEY = 'haven_companion_evolution_v3';

export const INITIAL_COMPANION_PROFILE: CompanionMemoryProfile = {
  relationshipLevel: 1, // Start cleanly at Level 1 / 111 (0 points)
  validatedLevel: 0, // 0 questions validated initially - ready for Level 1 question
  relationshipTitle: "Cycle 1 : Se construire une liste de valeurs pour se voir avec la plus grande bienveillance",
  interactionCount: 1,
  firstMetDate: new Date().toISOString().split('T')[0],
  lastInteractionDate: new Date().toISOString().split('T')[0],
  resiliencePoints: 0,
  validatedQuestions: {},
  userContext: {
    preferredName: 'Amie',
    situationBrief: 'Recherche de mise en sécurité active et préparation d\'un plan d\'émancipation serein.',
    hasChildren: true,
    identifiedRisks: ['Contrôle téléphonique', 'Menaces verbales', 'Isolement'],
    safetyPlanReady: true,
    lastEmotionalState: 'Déterminée mais vigilante',
    soothingAnchors: ['Respiration 4-7-8', 'Lumière du matin', 'Penser à la sécurité de mes enfants'],
    keyVictories: [
      'Création de votre Sanctuaire de Résilience HAVEN-ELLE',
      'Entrée dans le Cycle 1 : Définition de sa liste de valeurs & Regard bienveillant'
    ],
    notesFromHaven: [
      'Bienvenue dans votre sanctuaire. Vous avancez pas à pas, à votre propre rythme.',
      'Votre réseau d’alerte est prêt, vos preuves sont protégées.',
      'Je veille sur vous sans interruption.',
    ],
  },
  conversationsHistory: [
    {
      date: new Date().toISOString().split('T')[0],
      topic: 'Accueil dans le Sanctuaire HAVEN-ELLE',
      emotionalState: 'Départ du parcours',
      keyTakeaway: 'Engagement envers soi-même et début du cheminement vers la résilience.',
    },
  ],
};

function getRelationshipTitleForLevel(level: number): string {
  const cycleId = getCycleForLevel(level);
  const cycle = RESILIENCE_CYCLES.find(c => c.id === cycleId);
  return cycle ? `${cycle.subtitle} (Niveau ${level}/111)` : `Niveau ${level}/111`;
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
      // Ensure level calculation respects validatedLevel constraint
      const pointsLevel = calculateLevelFromPoints(parsed.resiliencePoints || 0);
      const validatedLevel = typeof parsed.validatedLevel === 'number' ? parsed.validatedLevel : 0;
      
      // Effective level cannot exceed validatedLevel + 1 or pointsLevel
      const effectiveLevel = Math.max(1, Math.min(validatedLevel, pointsLevel));
      
      parsed.validatedLevel = validatedLevel;
      parsed.relationshipLevel = effectiveLevel;
      parsed.relationshipTitle = getRelationshipTitleForLevel(effectiveLevel);
      return parsed;
    } catch {
      return INITIAL_COMPANION_PROFILE;
    }
  },

  saveProfile(profile: CompanionMemoryProfile): void {
    const pointsLevel = calculateLevelFromPoints(profile.resiliencePoints || 0);
    const validatedLevel = typeof profile.validatedLevel === 'number' ? profile.validatedLevel : 0;
    const effectiveLevel = Math.max(1, Math.min(validatedLevel, pointsLevel));
    
    profile.validatedLevel = validatedLevel;
    profile.relationshipLevel = effectiveLevel;
    profile.relationshipTitle = getRelationshipTitleForLevel(effectiveLevel);
    localStorage.setItem(COMPANION_STORAGE_KEY, JSON.stringify(profile));
  },

  resetToLevelOne(): CompanionMemoryProfile {
    localStorage.setItem(COMPANION_STORAGE_KEY, JSON.stringify(INITIAL_COMPANION_PROFILE));
    window.dispatchEvent(new CustomEvent('haven-resilience-updated', { detail: INITIAL_COMPANION_PROFILE }));
    return INITIAL_COMPANION_PROFILE;
  },

  addResiliencePoints(pointsToAdd: number, victoryLabel?: string): CompanionMemoryProfile {
    const profile = this.getProfile();
    const updatedPoints = Math.min(1665, profile.resiliencePoints + pointsToAdd);
    const pointsLevel = calculateLevelFromPoints(updatedPoints);
    const validatedLevel = profile.validatedLevel ?? 0;
    
    // Effective level is strictly bounded by validatedLevel or 1
    const effectiveLevel = Math.max(1, Math.min(validatedLevel, pointsLevel));
    const newTitle = getRelationshipTitleForLevel(effectiveLevel);

    const keyVictories = victoryLabel 
      ? [...new Set([victoryLabel, ...(profile.userContext.keyVictories || [])])].slice(0, 12)
      : profile.userContext.keyVictories;

    const updatedProfile: CompanionMemoryProfile = {
      ...profile,
      resiliencePoints: updatedPoints,
      validatedLevel,
      relationshipLevel: effectiveLevel,
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

  validateLevelQuestion(levelToValidate: number, reflection: string, selectedOption?: string): CompanionMemoryProfile {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];
    const newValidatedLevel = Math.max(profile.validatedLevel || 0, levelToValidate);
    
    // Award +25 bonus resilience points for therapeutic healing question validation
    const updatedPoints = Math.min(1665, profile.resiliencePoints + 25);
    const pointsLevel = calculateLevelFromPoints(updatedPoints);
    const effectiveLevel = Math.max(1, Math.min(newValidatedLevel, pointsLevel));
    const newTitle = getRelationshipTitleForLevel(effectiveLevel);

    const validatedQuestions = {
      ...(profile.validatedQuestions || {}),
      [levelToValidate]: {
        date: today,
        reflection,
        answer: selectedOption
      }
    };

    const victoryLabel = `Étape de Guérison Niveau ${levelToValidate} validée avec succès`;
    const keyVictories = [...new Set([victoryLabel, ...(profile.userContext.keyVictories || [])])].slice(0, 12);

    const updatedProfile: CompanionMemoryProfile = {
      ...profile,
      resiliencePoints: updatedPoints,
      validatedLevel: newValidatedLevel,
      relationshipLevel: effectiveLevel,
      relationshipTitle: newTitle,
      validatedQuestions,
      userContext: {
        ...profile.userContext,
        keyVictories,
      }
    };

    this.saveProfile(updatedProfile);
    window.dispatchEvent(new CustomEvent('haven-resilience-updated', { detail: updatedProfile }));
    return updatedProfile;
  },

  isLevelValidationPending(profile?: CompanionMemoryProfile): boolean {
    const p = profile || this.getProfile();
    const pointsLevel = calculateLevelFromPoints(p.resiliencePoints || 0);
    const validatedLevel = p.validatedLevel ?? 0;
    return pointsLevel > validatedLevel;
  },

  getPendingValidationLevel(profile?: CompanionMemoryProfile): number | null {
    const p = profile || this.getProfile();
    const pointsLevel = calculateLevelFromPoints(p.resiliencePoints || 0);
    const validatedLevel = p.validatedLevel ?? 0;
    if (pointsLevel > validatedLevel) {
      return validatedLevel + 1;
    }
    return null;
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

