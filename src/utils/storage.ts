import { TrustedContact, EmergencyAlert, IncidentRecord, DetailedSafetyPlan, DiscreetAppointment, UserAssessmentProfile, VoiceRecordingEvidence, WellnessDailyEntry, VeroCustomQuestion, IntakeQuestionnaireState } from '../types';
import { InteractiveAssessmentsState, QuestionnaireId, UserModuleProgress } from '../data/questionnairesData';

const STORAGE_KEYS = {
  CONTACTS: 'haven_trusted_contacts_v3',
  ALERTS: 'haven_alerts_history_v1',
  INCIDENTS: 'haven_incidents_v1',
  VOICE_RECORDINGS: 'haven_voice_recordings_v1',
  SAFETY_PLAN: 'haven_safety_plan_v3',
  APPOINTMENTS: 'haven_appointments_v1',
  SETTINGS: 'haven_user_settings_v1',
  ONBOARDING: 'haven_onboarding_completed_v1',
  ASSESSMENT: 'haven_confidential_assessment_v1',
  NIGHT_MODE: 'haven_night_mode_v1',
  UI_OPACITY: 'haven_ui_opacity_v1',
  VIDEO_OPACITY: 'haven_video_opacity_v1',
  BG_VOLUME: 'haven_bg_volume_v1',
  WELLNESS_ENTRIES: 'haven_wellness_tracker_entries_v1',
  INTAKE_10Q: 'haven_intake_10questions_v2',
  INTERACTIVE_ASSESSMENTS: 'haven_interactive_assessments_v1',
};

export const DEFAULT_VERO_QUESTIONS: Record<number, VeroCustomQuestion> = {
  5: {
    id: 5,
    title: 'Question 5 (Espace réservé pour Véro)',
    subtitle: 'Emplacement libre pour intégrer la question thérapeutique ou relationnelle de Véro.',
    isConfigured: false,
    questionType: 'multiple_choice',
    options: [
      'Option 1 (À personnaliser selon Véro)',
      'Option 2 (À personnaliser selon Véro)',
      'Option 3 (À personnaliser selon Véro)',
    ],
    userAnswer: '',
    userNote: '',
  },
  6: {
    id: 6,
    title: 'Question 6 (Espace réservé pour Véro)',
    subtitle: 'Emplacement libre pour intégrer la question thérapeutique ou relationnelle de Véro.',
    isConfigured: false,
    questionType: 'text_reflection',
    options: [],
    userAnswer: '',
    userNote: '',
  },
  7: {
    id: 7,
    title: 'Question 7 (Espace réservé pour Véro)',
    subtitle: 'Emplacement libre pour intégrer la question thérapeutique ou relationnelle de Véro.',
    isConfigured: false,
    questionType: 'yes_no',
    options: ['Oui', 'Non', 'Incertain / En réflexion'],
    userAnswer: '',
    userNote: '',
  },
  8: {
    id: 8,
    title: 'Question 8 (Espace réservé pour Véro)',
    subtitle: 'Emplacement libre pour intégrer la question thérapeutique ou relationnelle de Véro.',
    isConfigured: false,
    questionType: 'rating_scale',
    options: ['1 - Très faible', '2 - Faible', '3 - Modéré', '4 - Élevé', '5 - Très intense'],
    userAnswer: 3,
    userNote: '',
  },
  9: {
    id: 9,
    title: 'Question 9 (Espace réservé pour Véro)',
    subtitle: 'Emplacement libre pour intégrer la question thérapeutique ou relationnelle de Véro.',
    isConfigured: false,
    questionType: 'text_reflection',
    options: [],
    userAnswer: '',
    userNote: '',
  },
  10: {
    id: 10,
    title: 'Question 10 (Espace réservé pour Véro)',
    subtitle: 'Emplacement libre pour intégrer la question finale ou de bilan de Véro.',
    isConfigured: false,
    questionType: 'text_reflection',
    options: [],
    userAnswer: '',
    userNote: '',
  },
};

export const DEFAULT_INTAKE_STATE: IntakeQuestionnaireState = {
  currentStep: 1,
  livingSituation: 'Cohabitation sous le même toit',
  hasChildren: false,
  childrenCount: 0,
  selectedRisks: [
    'Menaces de violences ou escalade de tension',
    'Contrôle des communications et du téléphone',
    'Isolement relationnel et familial',
  ],
  financialAutonomy: 'Autonomie financière partielle',
  surveillanceLevel: 'Surveillance modérée',
  toxicRelationshipPatterns: [
    'Emprise psychologique & manipulation (gaslighting)',
    'Imprévisibilité & climat de tension permanente',
  ],
  toxicRelationshipDescription: '',
  toxicRelationshipInsight: 'Reconnaissance des dynamiques d\'emprise pour restaurer ma souveraineté',
  veroQuestions: DEFAULT_VERO_QUESTIONS,
  isCompleted: false,
  lastUpdated: new Date().toISOString(),
};

export const DEFAULT_ASSESSMENT_PROFILE: UserAssessmentProfile = {
  id: 'assessment-default',
  completedAt: '',
  isCompleted: false,
  personalInfo: {
    preferredName: '',
    ageRange: '25-34',
    gender: 'Femme',
    livingSituation: 'Vit avec la personne menaçante',
    postalCodeOrRegion: '',
  },
  childrenInfo: {
    hasChildren: false,
    childrenCount: 0,
    children: [],
    custodyStatus: 'Aucun jugement',
    areChildrenExposedDirectly: false,
    noChildrenSpecifics: {
      cohabitationEnvironment: 'Logement partagé en commun',
      threatFrequencyPattern: 'Tension quotidienne permanente',
      keyTargetedVulnerabilities: ['Autonomie financière & travail', 'Isolement vis-à-vis des proches'],
      evidenceStorageSecurity: 'Fichiers numériques sécurisés',
      objectiveFactsContext: '',
    },
  },
  problemTypes: {
    psychologicalAbuse: true,
    physicalViolence: false,
    financialControl: false,
    cyberHarassment: false,
    threatsAndBlackmail: false,
    sexualViolence: false,
  },
  immediateImpacts: {
    stressLevel: 4,
    dangerLevelPerceived: 'Élevé',
    physicalSymptoms: ['Insomnies ou cauchemars', 'Tension permanente / Épuisement'],
    emotionalSymptoms: ['Peur constante / Hypervigilance', 'Sentiment d\'isolement ou de honte'],
    isolationLevel: 'Quelques proches au courant',
    immediateNeeds: ['Écoute psychologique & déculpabilisation', 'Plan de sécurité pour le départ'],
    urgentSafetyConcerns: '',
  },
  priorActions: {
    hasReportedToPolice: false,
    hasMedicalCertificate: false,
    hasLawyer: false,
    hasTrustedContactsConfigured: false,
  },
};

export const INITIAL_SAFETY_PLAN: DetailedSafetyPlan = {
  threatLevel: 'Élevé',
  summary: 'Plan de sûreté coordonné incluant mise à l\'abri immédiate, déclenchement d\'alerte silencieuse et protection prioritaire des enfants.',
  lastUpdated: '2026-08-24',
  emergencyContactsProtocol: {
    contactsSummary: '2 contacts de confiance principaux (Michael Gauthier Guillet & Sarah) alertés simultanément avec géolocalisation et double des clés disponible.',
    secretTriggerWords: ['Mamadou', 'Rappelle-moi vite', 'Pain complet'],
    actionOnTrigger: 'Appel immédiat du 17 par le contact et mise à disposition du véhicule de secours.',
  },
  safeLocations: {
    primaryShelter: 'Domicile de Michael Gauthier Guillet (Lieu sûr convenu)',
    secondaryShelter: 'Maison des Femmes & Centre d\'Hébergement d\'Urgence CIDFF (Accueil 24/7)',
    safeRouteGuidelines: [
      'Emprunter l\'escalier de service plutôt que l\'ascenseur en cas d\'urgence',
      'Éviter l\'avenue principale si surveillance par véhicule suspectée',
      'Rejoindre la station de métro éclairée ou le commissariat le plus proche',
    ],
    accessKeysStrategy: 'Double des clés de voiture et du domicile déposé dans un endroit sécurisé chez Michael.',
  },
  communicationStrategies: {
    camouflageKeywords: ['Recette tarte aux pommes = Tout va bien', 'Ingrédient manquant = Prépare-toi à m\'accueillir'],
    safeCommunicationHours: 'Entre 09h30 et 11h30 pendant les horaires de travail ou courses quotidiennes.',
    digitalHygieneTips: [
      'Utiliser la navigation privée ou le bouton Sortie Rapide (Échap)',
      'Désactiver la géolocalisation partagée sur les applications courantes',
      'Ne pas enregistrer de mots de passe sensibles dans le navigateur partagé',
    ],
  },
  copingMechanisms: {
    nervousSystemExercises: [
      'Cohérence cardiaque 4-7-8 (4s inspiration, 7s rétention, 8s expiration)',
      'Exercice d\'ancrage sensoriel 5-4-3-2-1 pour stopper la tétanie',
    ],
    groundingAnchors: [
      'Regarder une photo de mes enfants en sécurité',
      'Répéter mentalement: "Je suis digne de respect et de sécurité."',
    ],
    empoweringAffirmations: [
      'Je ne suis pas responsable de la violence d\'autrui.',
      'J\'ai le droit de me protéger et de vivre en paix.',
      'Chaque pas vers ma liberté est une victoire immense.',
    ],
  },
  immediateChecklist: [
    { id: 'chk-1', task: 'Pièces d\'identité (Carte d\'identité, passeports, permis)', category: 'documents', isCompleted: true, priority: 'vital' },
    { id: 'chk-2', task: 'Livret de famille et actes de naissance des enfants', category: 'children', isCompleted: true, priority: 'vital' },
    { id: 'chk-3', task: 'Moyens de paiement personnels (Carte bancaire non conjointe, espèces)', category: 'finances', isCompleted: false, priority: 'vital' },
    { id: 'chk-4', task: 'Double des clés (voiture, domicile, bureau)', category: 'essentials', isCompleted: true, priority: 'important' },
    { id: 'chk-5', task: 'Ordonnances médicales, carnets de santé & traitements vitaux', category: 'essentials', isCompleted: false, priority: 'vital' },
    { id: 'chk-6', task: 'Chargeur de téléphone portable et batterie de secours', category: 'tech', isCompleted: true, priority: 'important' },
    { id: 'chk-7', task: 'Photos des preuves et constats médicaux sauvegardés dans le coffre HAVEN-ELLE', category: 'tech', isCompleted: true, priority: 'vital' },
    { id: 'chk-8', task: 'Vêtements de rechange pour 48h (pour moi et les enfants)', category: 'essentials', isCompleted: false, priority: 'useful' },
  ],
  legalAndHotlines: {
    steps: [
      'Faire constater toute blessure ou retentissement psychologique par un médecin pour certificat ITT.',
      'Déposer une requête en Ordonnance de Protection auprès du Juge aux Affaires Familiales (JAF).',
      'Prendre contact avec une avocate spécialisée en droit de la famille et aide juridictionnelle.',
    ],
    numbers: ['17 (Police Secours)', '114 (SMS Urgence)', '3919 (Écoute & Orientation Femmes)', '01 44 93 44 00 (CIDFF)'],
  },
};

export const INITIAL_CONTACTS: TrustedContact[] = [
  {
    id: 'tc-1',
    name: 'Michael Gauthier Guillet',
    relationship: 'Ami de confiance',
    phone: '1-438-543-2555',
    email: 'mikegauthierguillet@gmail.com',
    tier: 'primary_sos',
    notifyBy: 'all',
    isActive: true,
    secretCodeWord: 'Mamadou',
    notes: 'Possède un double de mes clés et connaît ma situation.',
  },
  {
    id: 'tc-2',
    name: 'Sarah (Soeur)',
    relationship: 'Famille proche',
    phone: '+33 6 98 76 54 32',
    email: 'sarah.famille@haven-safe.org',
    tier: 'primary_sos',
    notifyBy: 'sms',
    isActive: true,
    secretCodeWord: 'Rappelle-moi vite',
    notes: 'Peut m\'héberger d\'urgence avec mes enfants.',
  },
  {
    id: 'tc-3',
    name: 'Me. Valérie Dupont',
    relationship: 'Avocate spécialisée droit de la famille',
    phone: '+33 1 42 68 00 00',
    email: 'cabinet.dupont.juriste@haven-safe.org',
    tier: 'legal',
    notifyBy: 'email',
    isActive: true,
    notes: 'Dossier d\'ordonnance de protection en préparation.',
  },
  {
    id: 'tc-4',
    name: 'Mme Garnier (Intervenante Sociale CIDFF)',
    relationship: 'Travailleuse sociale référente',
    phone: '+33 1 44 93 44 00',
    email: 'social.garnier@cidff-safe.org',
    tier: 'discreet_support',
    notifyBy: 'email',
    isActive: true,
    notes: 'Contact pour demande de logement d\'urgence.',
  },
];

export const INITIAL_INCIDENTS: IncidentRecord[] = [
  {
    id: 'inc-1',
    date: '2026-08-20',
    time: '21:30',
    type: 'psychological',
    severity: 4,
    description: 'Menaces verbales explicites et confiscation de mes clés de voiture et de mon téléphone.',
    location: 'Domicile - Salon',
    witnesses: 'Aucun',
    evidenceFiles: [],
    hasReportedToPolice: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'inc-2',
    date: '2026-08-15',
    time: '18:45',
    type: 'physical',
    severity: 4,
    description: 'Bousculade violente contre le chambranle de la porte, ecchymose au bras droit.',
    location: 'Domicile - Cuisine',
    witnesses: 'Voisine du dessous a entendu les cris',
    evidenceFiles: ['https://images.unsplash.com/photo-1584467735815-f778f274e296?w=400&auto=format&fit=crop&q=80'],
    hasReportedToPolice: false,
    createdAt: new Date().toISOString(),
  }
];

export const StorageService = {
  getContacts(): TrustedContact[] {
    try {
      // Check current key
      let data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (!data) {
        // Check if legacy key existed
        const legacyData = localStorage.getItem('haven_trusted_contacts_v1') || localStorage.getItem('haven_trusted_contacts_v2') || localStorage.getItem('haven_trusted_contacts');
        if (legacyData) {
          data = legacyData;
        }
      }

      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_CONTACTS));
        return INITIAL_CONTACTS;
      }
      const parsed: TrustedContact[] = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  },

  saveContacts(contacts: TrustedContact[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
      window.dispatchEvent(new CustomEvent('haven-contacts-updated', { detail: contacts }));
    } catch (e) {
      console.error('Failed to save contacts', e);
    }
  },

  getAlerts(): EmergencyAlert[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ALERTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveAlert(alert: EmergencyAlert): void {
    const existing = this.getAlerts();
    const updated = [alert, ...existing];
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(updated));
  },

  getIncidents(): IncidentRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(INITIAL_INCIDENTS));
        return INITIAL_INCIDENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_INCIDENTS;
    }
  },

  saveIncidents(incidents: IncidentRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
  },

  getVoiceRecordings(): VoiceRecordingEvidence[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOICE_RECORDINGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveVoiceRecordings(recordings: VoiceRecordingEvidence[]): void {
    localStorage.setItem(STORAGE_KEYS.VOICE_RECORDINGS, JSON.stringify(recordings));
  },

  saveVoiceRecording(recording: VoiceRecordingEvidence): void {
    const existing = this.getVoiceRecordings();
    const updated = [recording, ...existing.filter((r) => r.id !== recording.id)];
    this.saveVoiceRecordings(updated);
  },

  getAppointments(): DiscreetAppointment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      if (!data) {
        const initial: DiscreetAppointment[] = [
          {
            id: 'apt-1',
            professionalName: 'Dr. Sophie Laurent',
            role: 'Psychologue',
            date: '2026-08-26',
            time: '14:00',
            discreetTitle: 'Rendez-vous Bilan Santé',
            meetLink: 'https://meet.google.com/hvn-safe-consult',
            status: 'CONFIRMED',
          },
          {
            id: 'apt-2',
            professionalName: 'Me. Valérie Dupont',
            role: 'Avocate',
            date: '2026-08-28',
            time: '10:30',
            discreetTitle: 'Entretien Démarches Administratives',
            meetLink: 'https://meet.google.com/leg-safe-counsel',
            status: 'CONFIRMED',
          },
        ];
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveAppointments(appointments: DiscreetAppointment[]): void {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  },

  getSafetyPlan(): DetailedSafetyPlan {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAFETY_PLAN);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SAFETY_PLAN, JSON.stringify(INITIAL_SAFETY_PLAN));
        return INITIAL_SAFETY_PLAN;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_SAFETY_PLAN;
    }
  },

  saveSafetyPlan(plan: DetailedSafetyPlan): void {
    localStorage.setItem(STORAGE_KEYS.SAFETY_PLAN, JSON.stringify(plan));
  },

  isOnboardingCompleted(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.ONBOARDING) === 'true';
    } catch {
      return false;
    }
  },

  setOnboardingCompleted(completed: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING, completed ? 'true' : 'false');
    } catch {
      // Ignore
    }
  },

  getAssessmentProfile(): UserAssessmentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT);
      if (!data) {
        return DEFAULT_ASSESSMENT_PROFILE;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_ASSESSMENT_PROFILE;
    }
  },

  saveAssessmentProfile(profile: UserAssessmentProfile): void {
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT, JSON.stringify(profile));
  },

  isNightMode(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.NIGHT_MODE) === 'true';
    } catch {
      return false;
    }
  },

  setNightMode(enabled: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.NIGHT_MODE, enabled ? 'true' : 'false');
    } catch {
      // Ignore
    }
  },

  getUiOpacity(): number {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.UI_OPACITY);
      if (val !== null) {
        const num = Number(val);
        if (!isNaN(num) && num >= 10 && num <= 100) return num;
      }
      return 85; // 85% default balanced transparency
    } catch {
      return 85;
    }
  },

  setUiOpacity(opacity: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.UI_OPACITY, Math.round(opacity).toString());
    } catch {
      // Ignore
    }
  },

  getVideoOpacity(): number {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.VIDEO_OPACITY);
      if (val !== null) {
        const num = Number(val);
        if (!isNaN(num) && num >= 0 && num <= 100) return num;
      }
      return 45; // 45% default video opacity
    } catch {
      return 45;
    }
  },

  setVideoOpacity(opacity: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VIDEO_OPACITY, Math.round(opacity).toString());
    } catch {
      // Ignore
    }
  },

  getBgVolume(): number {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.BG_VOLUME);
      if (val !== null) {
        const num = Number(val);
        if (!isNaN(num) && num >= 0 && num <= 100) return num;
      }
      return 15; // 15% default volume as requested
    } catch {
      return 15;
    }
  },

  setBgVolume(volume: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BG_VOLUME, Math.round(volume).toString());
    } catch {
      // Ignore
    }
  },

  clearAllSensitiveData(): void {
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    localStorage.removeItem(STORAGE_KEYS.ALERTS);
    localStorage.removeItem(STORAGE_KEYS.INCIDENTS);
    localStorage.removeItem(STORAGE_KEYS.SAFETY_PLAN);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENT);
    localStorage.removeItem(STORAGE_KEYS.WELLNESS_ENTRIES);
  },

  getWellnessEntries(): WellnessDailyEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WELLNESS_ENTRIES);
      if (!data) return [];
      return JSON.parse(data) as WellnessDailyEntry[];
    } catch {
      return [];
    }
  },

  getWellnessEntryForDate(dateStr: string): WellnessDailyEntry | undefined {
    const entries = this.getWellnessEntries();
    return entries.find((e) => e.date === dateStr);
  },

  saveWellnessEntry(entry: WellnessDailyEntry): void {
    try {
      const entries = this.getWellnessEntries();
      const existingIdx = entries.findIndex((e) => e.date === entry.date);
      if (existingIdx >= 0) {
        entries[existingIdx] = entry;
      } else {
        entries.push(entry);
      }
      // Sort newest to oldest
      entries.sort((a, b) => b.date.localeCompare(a.date));
      localStorage.setItem(STORAGE_KEYS.WELLNESS_ENTRIES, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save wellness entry', e);
    }
  },

  deleteWellnessEntry(idOrDate: string): void {
    try {
      const entries = this.getWellnessEntries().filter(
        (e) => e.id !== idOrDate && e.date !== idOrDate
      );
      localStorage.setItem(STORAGE_KEYS.WELLNESS_ENTRIES, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to delete wellness entry', e);
    }
  },

  clearWellnessEntries(): void {
    localStorage.removeItem(STORAGE_KEYS.WELLNESS_ENTRIES);
  },

  getIntakeQuestionnaire(): IntakeQuestionnaireState {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTAKE_10Q);
      if (!data) return DEFAULT_INTAKE_STATE;
      const parsed = JSON.parse(data) as IntakeQuestionnaireState;
      // Merge with default vero questions to ensure questions 5-10 exist
      const mergedVero = { ...DEFAULT_VERO_QUESTIONS, ...(parsed.veroQuestions || {}) };
      return {
        ...DEFAULT_INTAKE_STATE,
        ...parsed,
        veroQuestions: mergedVero,
      };
    } catch {
      return DEFAULT_INTAKE_STATE;
    }
  },

  saveIntakeQuestionnaire(state: IntakeQuestionnaireState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INTAKE_10Q, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent('haven-intake-updated', { detail: state }));
    } catch (e) {
      console.error('Failed to save intake questionnaire', e);
    }
  },

  updateVeroQuestion(id: number, questionData: Partial<VeroCustomQuestion>): IntakeQuestionnaireState {
    const current = this.getIntakeQuestionnaire();
    const existing = current.veroQuestions[id] || DEFAULT_VERO_QUESTIONS[id] || {
      id,
      title: `Question ${id}`,
      subtitle: '',
      isConfigured: true,
      questionType: 'text_reflection',
    };

    const updatedVero = {
      ...current.veroQuestions,
      [id]: {
        ...existing,
        ...questionData,
        id,
        isConfigured: true,
        updatedAt: new Date().toISOString(),
      },
    };

    const updatedState: IntakeQuestionnaireState = {
      ...current,
      veroQuestions: updatedVero,
      lastUpdated: new Date().toISOString(),
    };

    this.saveIntakeQuestionnaire(updatedState);
    return updatedState;
  },

  getInteractiveAssessments(): InteractiveAssessmentsState {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTERACTIVE_ASSESSMENTS);
      if (!data) {
        return {
          violentometreSelections: [],
          modulesProgress: {} as Record<QuestionnaireId, UserModuleProgress>,
          lastUpdated: new Date().toISOString(),
        };
      }
      const parsed = JSON.parse(data) as Partial<InteractiveAssessmentsState>;
      return {
        violentometreSelections: parsed.violentometreSelections || [],
        modulesProgress: (parsed.modulesProgress || {}) as Record<QuestionnaireId, UserModuleProgress>,
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      };
    } catch {
      return {
        violentometreSelections: [],
        modulesProgress: {} as Record<QuestionnaireId, UserModuleProgress>,
        lastUpdated: new Date().toISOString(),
      };
    }
  },

  saveInteractiveAssessments(state: InteractiveAssessmentsState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERACTIVE_ASSESSMENTS, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent('haven-assessments-updated', { detail: state }));
    } catch (e) {
      console.error('Failed to save interactive assessments', e);
    }
  },

  toggleViolentometreItem(itemId: string): InteractiveAssessmentsState {
    const current = this.getInteractiveAssessments();
    const exists = current.violentometreSelections.includes(itemId);
    const updated = exists
      ? current.violentometreSelections.filter((id) => id !== itemId)
      : [...current.violentometreSelections, itemId];
    const newState: InteractiveAssessmentsState = {
      ...current,
      violentometreSelections: updated,
      lastUpdated: new Date().toISOString(),
    };
    this.saveInteractiveAssessments(newState);
    return newState;
  },
};
