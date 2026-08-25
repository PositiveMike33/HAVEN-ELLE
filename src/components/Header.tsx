import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  LogOut, 
  EyeOff, 
  ShieldAlert, 
  Sparkles, 
  Users, 
  MessageCircle, 
  Compass, 
  Scale, 
  FolderLock, 
  Heart, 
  Video,
  HelpCircle,
  AlertOctagon,
  ClipboardList,
  Lock,
  Moon,
  Sun
} from 'lucide-react';
import { HeaderAudioPlayer } from './HeaderAudioPlayer';
import { QuickLocationShare } from './QuickLocationShare';
import { UiOpacityControl } from './UiOpacityControl';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onActivateCamouflage: () => void;
  onTriggerPanic: () => void;
  onQuickExit: () => void;
  onTriggerSOS: () => void;
  onOpenOnboarding: () => void;
  onOpenAssessment: () => void;
  isAssessmentCompleted?: boolean;
  contactsCount: number;
  isNightMode?: boolean;
  onToggleNightMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onActivateCamouflage,
  onTriggerPanic,
  onQuickExit,
  onTriggerSOS,
  onOpenOnboarding,
  onOpenAssessment,
  isAssessmentCompleted,
  contactsCount,
  isNightMode = false,
  onToggleNightMode,
}) => {
  // Global Esc key listener for instant Panic Mode / Quick Exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onTriggerPanic();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTriggerPanic]);

  const navItems = [
    { id: 'contacts', label: 'Contacts de Confiance', icon: Users, badge: contactsCount > 0 ? `${contactsCount}` : undefined },
    { id: 'chat', label: 'Intelligence Thérapeutique', icon: MessageCircle },
    { id: 'safety_plan', label: 'Plan de Sûreté', icon: Sparkles },
    { id: 'shelters', label: 'Refuges & Soins', icon: Compass },
    { id: 'legal', label: 'Droits & Lois', icon: Scale },
    { id: 'evidence', label: 'Coffre de Preuves', icon: FolderLock },
    { id: 'relaxation', label: 'Respiration & Art', icon: Heart },
    { id: 'appointments', label: 'Téléconsultations', icon: Video },
  ];

  return (
    <header className="bg-[#FFFFFF]/92 backdrop-blur-md text-[#3E3B39] sticky top-0 z-40 shadow-[0_2px_12px_-2px_rgba(90,90,64,0.06)] border-b border-[#E5E2D9]">
      {/* Top Urgent Action Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EEE6]">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-[#8A9A5B] text-white flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-[#3E3B39] font-serif-natural">HAVEN-ELLE</span>
              <span className="text-[10px] bg-[#E5EAD9] text-[#5A5A40] font-semibold px-2.5 py-0.5 rounded-full border border-[#CED6C1]">
                Sanctuaire Sécurisé
              </span>
            </div>
            <p className="text-[11px] text-[#8E8B82] hidden sm:block">Protection, Écoute & Réseau d'Alerte pour Femmes</p>
          </div>
        </div>

        {/* PROMINENT GLOBAL AUDIO & VIDEO CONTROLLER */}
        <div id="header-audio-container" className="flex items-center">
          <HeaderAudioPlayer />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Geolocation Sharing Button */}
          <QuickLocationShare isNightMode={isNightMode} />

          {/* UI & Fiches Transparency Controller */}
          <UiOpacityControl isNightMode={isNightMode} />

          {/* Low-Contrast Night / Discreet Mode Toggle */}
          {onToggleNightMode && (
            <button
              type="button"
              id="header-night-mode-toggle-btn"
              onClick={onToggleNightMode}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
                isNightMode
                  ? 'bg-[#2A2C28] text-[#D8E4C7] border border-[#3E4238] hover:bg-[#343630]'
                  : 'bg-[#F8F7F2] text-[#5A5A40] border border-[#E5E2D9] hover:bg-[#E5EAD9]'
              }`}
              title={isNightMode ? 'Désactiver le Mode Nuit (revenir au thème clair)' : 'Activer le Mode Nuit Discret (contraste réduit pour l\'obscurité)'}
            >
              {isNightMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#E6B800]" />
                  <span className="hidden xl:inline text-[11px]">Jour</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#728642]" />
                  <span className="hidden xl:inline text-[11px]">Nuit</span>
                </>
              )}
            </button>
          )}

          {/* Assessment Form Button */}
          <button
            id="header-assessment-btn"
            onClick={onOpenAssessment}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs ${
              isAssessmentCompleted
                ? 'bg-[#E5EAD9] text-[#5A5A40] border border-[#CED6C1] hover:bg-[#dbe2ce]'
                : 'bg-[#5A5A40] text-white hover:bg-[#4a4a35] animate-pulse'
            }`}
            title="Bilan confidentiel chiffré : enfants, impacts, stress & violences subies"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isAssessmentCompleted ? 'Mon Bilan' : 'Bilan Sûreté'}
            </span>
          </button>

          {/* Guide & Onboarding Button */}
          <button
            id="header-onboarding-btn"
            onClick={onOpenOnboarding}
            className="px-3 py-1.5 bg-[#F8F7F2] hover:bg-[#E5EAD9] text-[#5A5A40] border border-[#E5E2D9] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Ouvrir le guide d'accueil et consignes de sécurité"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#8A9A5B]" />
            <span className="hidden md:inline">Guide Sécurité</span>
          </button>

          {/* Quick Camouflage switch */}
          <button
            id="header-camouflage-btn"
            onClick={onActivateCamouflage}
            className="px-3 py-1.5 bg-[#F5F2ED] hover:bg-[#E5EAD9] text-[#5A5A40] border border-[#D9D4C7] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Masquer immédiatement l'écran sous une fausse application de recettes"
          >
            <EyeOff className="w-3.5 h-3.5 text-[#8A9A5B]" />
            <span className="hidden md:inline">Mode Recettes</span>
          </button>

          {/* Immediate Panic Mode Button */}
          <button
            id="header-panic-mode-btn"
            onClick={onTriggerPanic}
            className="px-3.5 py-1.5 bg-[#A64D4D] hover:bg-[#8F3F3F] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
            title="Basculer instantanément en mode camouflage et couper le son (Touche Échap)"
          >
            <AlertOctagon className="w-3.5 h-3.5 animate-pulse" />
            <span>MODE PANIQUE (Échap)</span>
          </button>

          {/* Quick Alert SOS */}
          <button
            id="header-quick-sos-btn"
            onClick={onTriggerSOS}
            className="px-3.5 py-1.5 bg-[#5A5A40] hover:bg-[#4a4a35] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
            title="Déclencher l'alerte d'urgence aux contacts de confiance"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#E5EAD9]" />
            <span>SOS Réseau</span>
          </button>

          {/* Emergency Quick Exit */}
          <button
            id="header-quick-exit-btn"
            onClick={onQuickExit}
            className="px-2.5 py-1.5 bg-[#F5E6E0] hover:bg-[#EBD3CC] border border-[#A64D4D]/30 text-[#A64D4D] rounded-xl text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
            title="Quitter immédiatement vers un site externe neutre"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Quitter le site</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center space-x-1.5 overflow-x-auto py-2.5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-2 transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#8A9A5B] text-white shadow-xs font-semibold'
                    : 'text-[#5A5A40] hover:bg-[#F5F2ED] hover:text-[#3E3B39]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8A9A5B]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-[#E5EAD9] text-[#5A5A40]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
