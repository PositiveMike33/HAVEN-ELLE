import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CamouflageApp } from './components/CamouflageApp';
import { MainScreenVideoAndQuestions } from './components/MainScreenVideoAndQuestions';
import { ContactsEtConsultations } from './components/ContactsEtConsultations';
import { AlertTriggerModal } from './components/AlertTriggerModal';
import { SoutienBienEtre } from './components/SoutienBienEtre';
import { JusticeDossier } from './components/JusticeDossier';
import { UpcomingAppointmentsWidget } from './components/UpcomingAppointmentsWidget';
import { OnboardingModal } from './components/OnboardingModal';
import { ConfidentialAssessmentModal } from './components/ConfidentialAssessmentModal';
import { BackgroundMusicVideo } from './components/BackgroundMusicVideo';
import { PeacefulForest3D } from './components/PeacefulForest3D';
import { ProgressionDashboard } from './components/ProgressionDashboard';
import { ValuesAndBenevolenceBuilder } from './components/ValuesAndBenevolenceBuilder';
import { StorageService } from './utils/storage';
import { TrustedContact, EmergencyAlert, IncidentRecord, DiscreetAppointment, UserAssessmentProfile } from './types';
import { ShieldCheck, Lock, AlertCircle, HeartHandshake, Users, Scale, Calendar } from 'lucide-react';
import { CompanionMemoryService } from './utils/companionMemory';
import { initAuth, getAccessToken, googleSignIn } from './utils/auth';
import { syncToGoogleDrive, loadFromGoogleDrive } from './utils/driveSync';
import { syncToCloudSQL, loadFromCloudSQL } from './utils/cloudSync';

export default function App() {
  const [isCamouflageActive, setIsCamouflageActive] = useState(false);
  const [isNightMode, setIsNightMode] = useState<boolean>(() => {
    return StorageService.isNightMode();
  });
  const [activeTab, setActiveTab] = useState('violentometre');
  const [companionProfile, setCompanionProfile] = useState(() => CompanionMemoryService.getProfile());
  const [securitySubTab, setSecuritySubTab] = useState<'network' | 'justice' | 'appointments'>('network');
  const [showGlobalSOSModal, setShowGlobalSOSModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentProfile, setAssessmentProfile] = useState<UserAssessmentProfile>(() => {
    return StorageService.getAssessmentProfile();
  });
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // App Data State
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [incidents, setIncidents] = useState<IncidentRecord[]>([]);
  const [appointments, setAppointments] = useState<DiscreetAppointment[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    setContacts(StorageService.getContacts());
    setAlerts(StorageService.getAlerts());
    setIncidents(StorageService.getIncidents());
    setAppointments(StorageService.getAppointments());

    if (!StorageService.isOnboardingCompleted()) {
      setShowOnboarding(true);
    }

    const loadCloudData = async () => {
      setIsSyncing(true);
      try {
        let data = await loadFromCloudSQL();
        if (!data) data = await loadFromGoogleDrive();
        
        if (data) {
          if (data.contacts) setContacts(data.contacts);
          if (data.alerts) setAlerts(data.alerts);
          if (data.incidents) setIncidents(data.incidents);
          if (data.appointments) setAppointments(data.appointments);
          if (data.companionProfile) setCompanionProfile(data.companionProfile);
          if (data.assessmentProfile) setAssessmentProfile(data.assessmentProfile);
          
        }
      } catch (err) {
        console.error('Failed to load cloud data:', err);
      } finally {
        setIsSyncing(false);
      }
    };

    const unsubscribe = initAuth(
      (user, token, idToken) => {
        setIsAuthenticated(true);
        loadCloudData();
      },
      () => setIsAuthenticated(false)
    );

    const handleResilienceUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setCompanionProfile(customEvent.detail);
      } else {
        setCompanionProfile(CompanionMemoryService.getProfile());
      }
    };
    const handleContactsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setContacts(customEvent.detail);
      } else {
        setContacts(StorageService.getContacts());
      }
    };
    window.addEventListener('haven-resilience-updated', handleResilienceUpdate);
    window.addEventListener('haven-contacts-updated', handleContactsUpdate);

    return () => {
      unsubscribe();
      window.removeEventListener('haven-resilience-updated', handleResilienceUpdate);
      window.removeEventListener('haven-contacts-updated', handleContactsUpdate);
    };
  }, []);

  // Sync to Cloud SQL and Google Drive whenever data changes
  useEffect(() => {
    if (isAuthenticated && !isSyncing) {
      const stateToSave = {
        contacts, alerts, incidents, appointments, companionProfile, assessmentProfile
      };
      
      const timeout = setTimeout(() => {
         syncToCloudSQL(stateToSave);
         syncToGoogleDrive(stateToSave);
      }, 1000); // Debounce sync
      
      return () => clearTimeout(timeout);
    }
  }, [contacts, alerts, incidents, appointments, companionProfile, assessmentProfile, isAuthenticated, isSyncing]);


  // Sync night mode class with document body and initialize opacity variables
  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
    StorageService.setNightMode(isNightMode);
  }, [isNightMode]);

  useEffect(() => {
    const initialUiOpacity = StorageService.getUiOpacity();
    const root = document.documentElement;
    root.style.setProperty('--ui-surface-opacity', (initialUiOpacity / 100).toFixed(2));
    root.style.setProperty('--ui-bg-opacity', ((initialUiOpacity / 100) * 0.4).toFixed(2));
  }, []);

  const handleToggleNightMode = () => {
    setIsNightMode((prev) => !prev);
  };

  // Panic Mode: Silences sound instantly, closes sensitive modals, and switches to Camouflage
  const handlePanicMode = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setShowGlobalSOSModal(false);
    setShowOnboarding(false);
    setShowAssessmentModal(false);
    setIsCamouflageActive(true);
  };

  // Quick Exit: Instantly redirect to innocent site (Wikipedia Weather)
  const handleQuickExit = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    window.location.replace('https://fr.wikipedia.org/wiki/M%C3%A9t%C3%A9o');
  };

  const handleAlertDispatched = (newAlert: EmergencyAlert) => {
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleUpdateContacts = (updatedContacts: TrustedContact[]) => {
    setContacts(updatedContacts);
    StorageService.saveContacts(updatedContacts);
  };

  // If Camouflage Mode is Active, render the disguised recipe/weather application
  if (isCamouflageActive) {
    return (
      <CamouflageApp
        onDeactivateCamouflage={() => setIsCamouflageActive(false)}
        onTriggerSOS={() => {
          setIsCamouflageActive(false);
          setShowGlobalSOSModal(true);
        }}
      />
    );
  }

  return (
    <div
      id="haven-app-root"
      className={`relative min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isNightMode
          ? 'night-mode text-[#F8FAFC] selection:bg-[#15803D]/40 selection:text-white'
          : 'text-[#0F172A] selection:bg-[#DCFCE7] selection:text-[#14532D]'
      }`}
    >
      {/* 3D Living Peaceful Forest Environment Background */}
      <PeacefulForest3D
        isPanicOrCamouflage={isCamouflageActive}
        isNightMode={isNightMode}
      />

      {/* Background Music & Official Video (Theory of a Deadman - History of Violence) */}
      <BackgroundMusicVideo 
        isPanicOrCamouflage={isCamouflageActive} 
        isNightMode={isNightMode} 
      />

      {/* Top Header & Emergency Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onActivateCamouflage={() => setIsCamouflageActive(true)}
        onTriggerPanic={handlePanicMode}
        onQuickExit={handleQuickExit}
        onTriggerSOS={() => setShowGlobalSOSModal(true)}
        onOpenOnboarding={() => setShowOnboarding(true)}
        onOpenAssessment={() => setShowAssessmentModal(true)}
        isAssessmentCompleted={assessmentProfile.isCompleted}
        contactsCount={contacts.filter((c) => c.isActive).length}
        resiliencePoints={companionProfile.resiliencePoints}
        isNightMode={isNightMode}
        onToggleNightMode={handleToggleNightMode}
        isAuthenticated={isAuthenticated}
        isSyncing={isSyncing}
        onLogin={async () => {
          try { await googleSignIn(); } catch(e) { console.error(e); }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8">
        {/* Upcoming Appointments Widget (Visible on all tabs except appointments itself) */}
        {!(activeTab === 'security' && securitySubTab === 'appointments') && appointments.length > 0 && (
          <UpcomingAppointmentsWidget
            appointments={appointments}
            onNavigateToAppointments={() => {
              setActiveTab('security');
              setSecuritySubTab('appointments');
            }}
          />
        )}

        {/* TAB 1: Violentomètre & 8 Questionnaires Interactifs */}
        {(activeTab === 'violentometre' || activeTab === 'evaluation') && (
          <div className="space-y-6">
            <MainScreenVideoAndQuestions 
              onPlanGenerated={() => setActiveTab('wellness')} 
              onTriggerSOS={() => setShowGlobalSOSModal(true)}
              onTriggerPanic={() => setIsCamouflageActive(true)}
              onPointsEarned={() => setCompanionProfile(CompanionMemoryService.getProfile())}
            />
          </div>
        )}

        {/* TAB 2: Les 111 Vérités (111 Paliers, Flashcards Toltèques, Validation & Progression) */}
        {(activeTab === 'truths111' || activeTab === 'toltec') && (
          <div className="space-y-6">
            <ProgressionDashboard 
              resiliencePoints={companionProfile.resiliencePoints} 
              onPointsEarned={() => setCompanionProfile(CompanionMemoryService.getProfile())}
            />
          </div>
        )}

        {/* TAB 2: Soutien & Bien-Être */}
        {activeTab === 'wellness' && (
          <SoutienBienEtre 
            isNightMode={isNightMode} 
            onPointsEarned={() => setCompanionProfile(CompanionMemoryService.getProfile())}
          />
        )}

        {/* TAB 3: Sécurité & Protection (Unified Network, Justice & Appointments) */}
        {(activeTab === 'security' || activeTab === 'network' || activeTab === 'justice') && (
          <div className="space-y-6">
            {/* Security Sub-Navigation */}
            <div className="bg-white p-2 rounded-2xl border-2 border-[#D5D0C2] flex flex-wrap gap-2 shadow-2xs">
              <button
                onClick={() => setSecuritySubTab('network')}
                className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  securitySubTab === 'network'
                    ? 'bg-[#385117] text-white shadow-xs'
                    : 'text-[#5C5952] hover:bg-[#F4F2EB]'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Réseau de Secours & SOS</span>
                {contacts.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    securitySubTab === 'network' ? 'bg-white/20 text-white' : 'bg-[#E5EED6] text-[#385117]'
                  }`}>
                    {contacts.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setSecuritySubTab('justice')}
                className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  securitySubTab === 'justice'
                    ? 'bg-[#385117] text-white shadow-xs'
                    : 'text-[#5C5952] hover:bg-[#F4F2EB]'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>Dossier Justice & Preuves</span>
                {incidents.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    securitySubTab === 'justice' ? 'bg-white/20 text-white' : 'bg-[#E5EED6] text-[#385117]'
                  }`}>
                    {incidents.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setSecuritySubTab('appointments')}
                className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  securitySubTab === 'appointments'
                    ? 'bg-[#385117] text-white shadow-xs'
                    : 'text-[#5C5952] hover:bg-[#F4F2EB]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Rendez-vous Discrets</span>
              </button>
            </div>

            {/* Sub-view rendering */}
            {securitySubTab === 'justice' ? (
              <JusticeDossier
                incidents={incidents}
                onUpdateIncidents={setIncidents}
                onNavigateToRelaxation={() => setActiveTab('wellness')}
                onNavigateToContacts={() => {
                  setSecuritySubTab('network');
                }}
                onOpenDetailedAssessment={() => setShowAssessmentModal(true)}
              />
            ) : (
              <ContactsEtConsultations
                contacts={contacts}
                onUpdateContacts={handleUpdateContacts}
                alerts={alerts}
                onAlertDispatched={handleAlertDispatched}
                appointments={appointments}
                onUpdateAppointments={setAppointments}
                requestedSubTab={securitySubTab === 'appointments' ? 'appointments' : 'contacts'}
                onSubTabChange={(sub) => setSecuritySubTab(sub as any)}
              />
            )}
          </div>
        )}
      </main>

      {/* Security & Confidentiality Footer */}
      <footer className="bg-[#FFFFFF]/90 backdrop-blur-md border-t border-[#E5E2D9] py-4 px-4 text-center text-xs text-[#8E8B82]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[#3E3B39] font-medium">
            <Lock className="w-3.5 h-3.5 text-[#8A9A5B]" />
            <span>HAVEN-ELLE • Chiffrement local & Zéro traçage • Mode Anonyme</span>
          </div>
          <p className="text-[11px] text-[#8E8B82]">
            En cas de danger immédiat : composez le <strong className="text-[#A64D4D]">911</strong> / <strong className="text-[#A64D4D]">17</strong> ou SMS <strong className="text-[#8A9A5B]">1-438-543-2555</strong>.
          </p>
        </div>
      </footer>

      {/* Global SOS Modal Trigger */}
      <AlertTriggerModal
        contacts={contacts}
        isOpen={showGlobalSOSModal}
        onClose={() => setShowGlobalSOSModal(false)}
        onAlertDispatched={handleAlertDispatched}
        preselectedMode="emergency_sos"
      />

      {/* Skim-able / Skippable Onboarding Walkthrough */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onNavigateToTab={(tab) => {
          if (tab === 'contacts') {
            setActiveTab('security');
            setSecuritySubTab('network');
          } else if (tab === 'safety_plan') {
            setActiveTab('security');
            setSecuritySubTab('justice');
          } else if (tab === 'chat') {
            setActiveTab('wellness');
          } else {
            setActiveTab(tab);
          }
          setShowOnboarding(false);
        }}
        onOpenAssessment={() => {
          setShowOnboarding(false);
          setShowAssessmentModal(true);
        }}
      />

      {/* Confidential Encrypted Diagnostic Assessment Form */}
      <ConfidentialAssessmentModal
        isOpen={showAssessmentModal}
        onClose={() => setShowAssessmentModal(false)}
        onAssessmentCompleted={(updated) => {
          setAssessmentProfile(updated);
        }}
      />
    </div>
  );
}
