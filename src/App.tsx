import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CamouflageApp } from './components/CamouflageApp';
import { TrustedContactsManager } from './components/TrustedContactsManager';
import { AlertTriggerModal } from './components/AlertTriggerModal';
import { GeminiCrisisChat } from './components/GeminiCrisisChat';
import { HighThinkingSafetyPlan } from './components/HighThinkingSafetyPlan';
import { SheltersMapDirectory } from './components/SheltersMapDirectory';
import { LegalAdvisorSearch } from './components/LegalAdvisorSearch';
import { EvidenceLocker } from './components/EvidenceLocker';
import { TherapeuticRelaxation } from './components/TherapeuticRelaxation';
import { DiscreetAppointments } from './components/DiscreetAppointments';
import { OnboardingModal } from './components/OnboardingModal';
import { ConfidentialAssessmentModal } from './components/ConfidentialAssessmentModal';
import { StorageService } from './utils/storage';
import { TrustedContact, EmergencyAlert, IncidentRecord, DiscreetAppointment, UserAssessmentProfile } from './types';
import { ShieldCheck, Lock, AlertCircle, HeartHandshake } from 'lucide-react';

export default function App() {
  const [isCamouflageActive, setIsCamouflageActive] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');
  const [showGlobalSOSModal, setShowGlobalSOSModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentProfile, setAssessmentProfile] = useState<UserAssessmentProfile>(() => {
    return StorageService.getAssessmentProfile();
  });

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

    // Show onboarding on first launch
    if (!StorageService.isOnboardingCompleted()) {
      setShowOnboarding(true);
    }
  }, []);

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

  // If Camouflage Mode is Active, render the disguised recipe/weather application
  if (isCamouflageActive) {
    return (
      <CamouflageApp
        onDeactivateCamouflage={() => setIsCamouflageActive(false)}
      />
    );
  }

  return (
    <div id="haven-app-root" className="min-h-screen bg-[#F8F7F2] text-[#3E3B39] flex flex-col font-sans selection:bg-[#E5EAD9] selection:text-[#5A5A40]">
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8">
        {activeTab === 'contacts' && (
          <TrustedContactsManager
            contacts={contacts}
            onUpdateContacts={setContacts}
            alerts={alerts}
            onAlertDispatched={handleAlertDispatched}
          />
        )}

        {activeTab === 'chat' && <GeminiCrisisChat />}

        {activeTab === 'safety_plan' && (
          <HighThinkingSafetyPlan
            onNavigateToRelaxation={() => setActiveTab('relaxation')}
            onNavigateToContacts={() => setActiveTab('contacts')}
          />
        )}

        {activeTab === 'shelters' && <SheltersMapDirectory />}

        {activeTab === 'legal' && <LegalAdvisorSearch />}

        {activeTab === 'evidence' && (
          <EvidenceLocker
            incidents={incidents}
            onUpdateIncidents={setIncidents}
          />
        )}

        {activeTab === 'relaxation' && <TherapeuticRelaxation />}

        {activeTab === 'appointments' && (
          <DiscreetAppointments
            appointments={appointments}
            onUpdateAppointments={setAppointments}
          />
        )}
      </main>

      {/* Security & Confidentiality Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#E5E2D9] py-4 px-4 text-center text-xs text-[#8E8B82]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[#3E3B39] font-medium">
            <Lock className="w-3.5 h-3.5 text-[#8A9A5B]" />
            <span>HAVEN-ELLE • Chiffrement local & Zéro traçage • Mode Anonyme</span>
          </div>
          <p className="text-[11px] text-[#8E8B82]">
            En cas de danger immédiat, composez le <strong className="text-[#A64D4D]">17</strong> (Police) ou le <strong className="text-[#A64D4D]">114</strong> (SMS).
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
          setActiveTab(tab);
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
