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
    email: string;
    tier: AlertTier;
  }>;
  location?: LocationData;
  batteryLevel?: number;
  isTest?: boolean;
}

export interface IncidentRecord {
  id: string;
  date: string;
  time: string;
  type: 'physical' | 'psychological' | 'financial' | 'stalking_tech' | 'threat';
  severity: 1 | 2 | 3 | 4 | 5;
  description: string;
  location?: string;
  witnesses?: string;
  evidenceFiles: string[]; // data URLs or Drive URLs
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
