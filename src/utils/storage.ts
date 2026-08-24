import { TrustedContact, EmergencyAlert, IncidentRecord, DetailedSafetyPlan, DiscreetAppointment } from '../types';

const STORAGE_KEYS = {
  CONTACTS: 'haven_trusted_contacts_v1',
  ALERTS: 'haven_alerts_history_v1',
  INCIDENTS: 'haven_incidents_v1',
  SAFETY_PLAN: 'haven_safety_plan_v2',
  APPOINTMENTS: 'haven_appointments_v1',
  SETTINGS: 'haven_user_settings_v1',
  ONBOARDING: 'haven_onboarding_completed_v1',
};

export const INITIAL_SAFETY_PLAN: DetailedSafetyPlan = {
  threatLevel: 'Élevé',
  summary: 'Plan de sûreté coordonné incluant mise à l\'abri immédiate, déclenchement d\'alerte silencieuse et protection prioritaire des enfants.',
  lastUpdated: '2026-08-23',
  emergencyContactsProtocol: {
    contactsSummary: '2 contacts de confiance principaux (Clara & Sarah) alertés simultanément avec géolocalisation et double des clés disponible.',
    secretTriggerWords: ['Café annulé', 'Rappelle-moi vite', 'Pain complet'],
    actionOnTrigger: 'Appel immédiat du 17 par le contact et mise à disposition du véhicule de secours.',
  },
  safeLocations: {
    primaryShelter: 'Appartement de Clara (Code porte: 45B8, 3ème étage)',
    secondaryShelter: 'Maison des Femmes & Centre d\'Hébergement d\'Urgence CIDFF (Accueil 24/7)',
    safeRouteGuidelines: [
      'Emprunter l\'escalier de service plutôt que l\'ascenseur en cas d\'urgence',
      'Éviter l\'avenue principale si surveillance par véhicule suspectée',
      'Rejoindre la station de métro éclairée ou le commissariat le plus proche',
    ],
    accessKeysStrategy: 'Double des clés de voiture et du domicile déposé dans un casier sécurisé chez Clara.',
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
    phone: '438-543-2555',
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
      const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_CONTACTS));
        return INITIAL_CONTACTS;
      }
      const parsed: TrustedContact[] = JSON.parse(data);
      // Migrate old default contact name and details if needed
      const updated = parsed.map((c) => {
        if (c.id === 'tc-1') {
          return {
            ...c,
            name: 'Michael Gauthier Guillet',
            relationship: 'Ami de confiance',
            phone: '438-543-2555',
            email: 'mikegauthierguillet@gmail.com',
            secretCodeWord: 'Mamadou',
          };
        }
        return c;
      });
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(updated));
      return updated;
    } catch {
      return INITIAL_CONTACTS;
    }
  },

  saveContacts(contacts: TrustedContact[]): void {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
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

  clearAllSensitiveData(): void {
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    localStorage.removeItem(STORAGE_KEYS.ALERTS);
    localStorage.removeItem(STORAGE_KEYS.INCIDENTS);
    localStorage.removeItem(STORAGE_KEYS.SAFETY_PLAN);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
  },
};
