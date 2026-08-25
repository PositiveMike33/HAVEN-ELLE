export type AlertTier = 'primary_sos' | 'medical' | 'discreet_support' | 'legal';
export type NotifyChannel = 'sms' | 'email' | 'call' | 'all';

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  tier: AlertTier;
  notifyBy: NotifyChannel;
  isActive: boolean;
  notes?: string;
  secretCodeWord?: string;
  lastNotifiedAt?: string;
}

export type AlertMode = 'emergency_sos' | 'secret_code' | 'check_in' | 'silent_beacon';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  address?: string;
  mapsUrl: string;
  timestamp: number;
}

export interface EmergencyAlert {
  id: string;
  timestamp: string;
  mode: AlertMode;
  message: string;
  status: 'DISPATCHED' | 'CANCELLED' | 'TEST_SIMULATION';
  recipients: Array<{
    name: string;
    phone: string;
    email?: string;
    tier: AlertTier;
  }>;
  location?: LocationData;
  batteryLevel?: number;
  isTest?: boolean;
}

export interface VoiceRecordingEvidence {
  id: string;
  title: string;
  date: string;
  time: string;
  durationSeconds: number;
  encryptedData: string; // Base64 AES-GCM encrypted payload
  iv: string; // Initialization vector for AES-GCM
  checksumSha256: string; // Cryptographic hash for legal integrity
  mimeType: string;
  fileSizeBytes: number;
  category: 'ambient_sound' | 'testimony' | 'emergency_audio' | 'threat_capture';
  notes?: string;
  location?: string;
  isEncrypted: boolean;
  incidentId?: string;
  createdAt: string;
}

export interface IncidentRecord {
  id: string;
  date: string;
  time: string;
  type: 'physical' | 'psychological' | 'financial' | 'stalking_tech' | 'threat' | 'voice_recording';
  severity: 1 | 2 | 3 | 4 | 5;
  description: string;
  location?: string;
  witnesses?: string;
  evidenceFiles: string[]; // data URLs or Drive URLs
  voiceRecordings?: VoiceRecordingEvidence[];
  hasReportedToPolice: boolean;
  createdAt: string;
}

export interface SafetyPlanSection {
  title: string;
  items: string[];
  tips?: string[];
}

export interface DetailedSafetyPlan {
  threatLevel: 'Modéré' | 'Élevé' | 'Critique / Urgence Absolue';
  summary: string;
  lastUpdated: string;
  emergencyContactsProtocol: {
    contactsSummary: string;
    secretTriggerWords: string[];
    actionOnTrigger: string;
  };
  safeLocations: {
    primaryShelter: string;
    secondaryShelter: string;
    safeRouteGuidelines: string[];
    accessKeysStrategy: string;
  };
  communicationStrategies: {
    camouflageKeywords: string[];
    safeCommunicationHours: string;
    digitalHygieneTips: string[];
  };
  copingMechanisms: {
    nervousSystemExercises: string[];
    groundingAnchors: string[];
    empoweringAffirmations: string[];
  };
  immediateChecklist: Array<{
    id: string;
    task: string;
    category: 'documents' | 'finances' | 'essentials' | 'children' | 'tech';
    isCompleted: boolean;
    priority: 'vital' | 'important' | 'useful';
  }>;
  legalAndHotlines: {
    steps: string[];
    numbers: string[];
  };
}

export interface CompanionMemoryProfile {
  relationshipLevel: number; // 1 to 5
  relationshipTitle: string; // e.g. "Sanctuaire Initial", "Alliée de Confiance", "Bouclier & Force"
  interactionCount: number;
  firstMetDate: string;
  lastInteractionDate: string;
  resiliencePoints: number;
  userContext: {
    preferredName?: string;
    situationBrief?: string;
    hasChildren?: boolean;
    identifiedRisks?: string[];
    safetyPlanReady?: boolean;
    lastEmotionalState?: string;
    soothingAnchors?: string[];
    notesFromHaven?: string[];
    keyVictories?: string[];
  };
  conversationsHistory: Array<{
    date: string;
    topic: string;
    emotionalState: string;
    keyTakeaway: string;
  }>;
}

export interface ChildImpactInfo {
  id: string;
  age: string;
  gender: 'Fille' | 'Garçon' | 'Autre' | 'Préfère ne pas préciser';
  psychologicalImpacts: string[];
  observedBehaviors: string[];
  specialNeedsNotes?: string;
}

export interface UserAssessmentProfile {
  id: string;
  completedAt: string;
  isCompleted: boolean;
  
  // Profil de base
  personalInfo: {
    preferredName?: string;
    ageRange: '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+' | 'Préfère ne pas préciser';
    gender: 'Femme' | 'Homme' | 'Non-binaire' | 'Autre' | 'Préfère ne pas préciser';
    livingSituation: 'Vit avec la personne menaçante' | 'En séparation récente' | 'Hébergée chez des tiers' | 'Logement autonome' | 'Autre';
    postalCodeOrRegion?: string;
  };

  // Enfants & Famille ou Situation Individuelle
  childrenInfo: {
    hasChildren: boolean;
    childrenCount: number;
    children: ChildImpactInfo[];
    custodyStatus?: 'Garde exclusive' | 'Garde alternée' | 'Aucun jugement' | 'Conflit de garde aigu';
    areChildrenExposedDirectly: boolean;
    // Questions spécifiques & neutres quand aucun enfant n'est impliqué (objectives, sans mise en accusation ni mention de noms)
    noChildrenSpecifics?: {
      cohabitationEnvironment?: 'Logement partagé en commun' | 'Bail individuel' | 'Hébergement temporaire' | 'Séparés géographiquement';
      threatFrequencyPattern?: 'Événements sporadiques imprévisibles' | 'Tension quotidienne permanente' | 'Intensification lors des moments de désaccord' | 'Surveillance à distance continue';
      keyTargetedVulnerabilities?: string[]; // ex: Emploi/Revenus, Animaux de compagnie, Isolement relationnel, Logement/Biens matériels, Intimidation psychologique
      evidenceStorageSecurity?: 'Preuves physiques cachées' | 'Fichiers numériques sécurisés' | 'Preuves déjà transmises à un tiers' | 'Aucune trace conservée par crainte';
      objectiveFactsContext?: string; // Description neutre et factuelle des événements sans noms ni jugements
    };
  };

  // Nature de la situation / Problématiques
  problemTypes: {
    psychologicalAbuse: boolean; // Dénigrement, isolement, gaslighting
    physicalViolence: boolean; // Coups, bousculades, menaces d'agression
    financialControl: boolean; // Privation de ressources, contrôle des comptes
    cyberHarassment: boolean; // Traçage GPS, espionnage téléphone, piratage
    threatsAndBlackmail: boolean; // Menaces de mort, chantage aux enfants/suicide
    sexualViolence: boolean; // Consentement bafoué
  };

  // Conséquences immédiates & Stress perçu
  immediateImpacts: {
    stressLevel: 1 | 2 | 3 | 4 | 5; // 1 = faible, 5 = stress extrême / panique
    dangerLevelPerceived: 'Faible' | 'Modéré' | 'Élevé' | 'Danger Mortel / Urgence Vitale';
    physicalSymptoms: string[]; // Insomnies, palpitations, perte d'appétit, tremblements
    emotionalSymptoms: string[]; // Peur constante, culpabilité, honte, dissociation, tristesse profonde
    isolationLevel: 'Très entourée' | 'Quelques proches au courant' | 'Totalement isolée';
    immediateNeeds: string[]; // Hébergement d'urgence, soutien psy, aide juridique, écoute anonyme
    urgentSafetyConcerns?: string;
  };

  // Démarches antérieures
  priorActions: {
    hasReportedToPolice: boolean;
    hasMedicalCertificate: boolean;
    hasLawyer: boolean;
    hasTrustedContactsConfigured: boolean;
  };
}

export interface ShelterResource {
  name: string;
  type: string;
  address: string;
  distance: string;
  phone: string;
  safeAccess: string;
  services: string[];
}

export interface DiscreetAppointment {
  id: string;
  professionalName: string;
  role: 'Psychologue' | 'Avocate' | 'Assistante Sociale' | 'Médecin Légiste';
  date: string;
  time: string;
  discreetTitle: string; // e.g., "Consultation Routine Santé"
  meetLink: string;
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED';
}

export type WellnessMood = 'serene' | 'peaceful' | 'neutral' | 'tired' | 'anxious' | 'fragile';

export interface WellnessDailyEntry {
  id: string;
  date: string; // ISO format 'YYYY-MM-DD'
  mood: WellnessMood;
  stressLevel: 1 | 2 | 3 | 4 | 5; // 1 = minimal / apaisé, 5 = critique / surcharge
  sleepQuality?: 'restful' | 'average' | 'disturbed';
  soothingPractice?: 'breathing' | 'ambient_music' | 'art_avatar' | 'rest' | 'walk' | 'reading';
  discreetNote?: string; // Anonymized, non-compromising brief personal anchor
  createdAt: string;
}

export interface SubstituteAgent {
  id: 'psy_substitute' | 'legal_substitute';
  name: string;
  title: string;
  roleDescription: string;
  specialties: string[];
  avatarIcon: string;
  accentColor: string;
  statusBadge: string;
  systemPrompt: string;
  initialGreeting: string;
  recommendedPrompts: { label: string; text: string }[];
}
