import React, { useEffect, useState, useRef } from 'react';
import { 
  ShieldCheck, 
  LogOut,
  Cloud,
  CloudOff,
  RefreshCw, 
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
  Sun,
  ChevronDown,
  BookOpen,
  Settings,
  Trophy
} from 'lucide-react';
import { QuickLocationShare } from './QuickLocationShare';
import { UiOpacityControl } from './UiOpacityControl';
import { calculateLevelFromPoints, getCycleForLevel, RESILIENCE_CYCLES } from '../data/resilience100Levels';
import { CompanionMemoryService } from '../utils/companionMemory';

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
  isAuthenticated?: boolean;
  isSyncing?: boolean;
  onLogin?: () => void;
  resiliencePoints?: number;
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
  resiliencePoints = 0,
  isAuthenticated = false,
  isSyncing = false,
  onLogin,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  
  const navItems = [];
  
  const companionProf = CompanionMemoryService.getProfile();
  const currentPts = typeof resiliencePoints === 'number' ? resiliencePoints : companionProf.resiliencePoints;
  const userLevel = companionProf.relationshipLevel || calculateLevelFromPoints(currentPts);
  const isPendingValidation = CompanionMemoryService.isLevelValidationPending(companionProf);
  const userCycleId = getCycleForLevel(userLevel);
  const userCycle = RESILIENCE_CYCLES.find(c => c.id === userCycleId) || RESILIENCE_CYCLES[0];
  
  // Niveau 1: Bilan et Q&A
  navItems.push({ id: 'evaluation', label: 'Bilan & Questions', icon: ClipboardList });

  // Dès qu'on a un peu de points (niveau 2+)
  if (currentPts >= 20) {
    navItems.push({ id: 'wellness', label: 'Soutien & Apprentissage', icon: Heart });
  }
  
  // Niveau 3+
  if (currentPts >= 50) {
    navItems.push({ id: 'network', label: 'Réseau de Secours', icon: Users, badge: contactsCount > 0 ? `${contactsCount}` : undefined });
  }

  // Niveau 4+
  if (currentPts >= 100) {
    navItems.push({ id: 'justice', label: 'Dossier Justice', icon: Scale });
  }


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

        {/* PROMINENT GLOBAL AUDIO & VIDEO CONTROLLER & GUIDE */}
        <div id="header-audio-container" className="flex items-center gap-3">
          {/* Level & Cycle Badge */}
          <button
            onClick={() => onSelectTab('evaluation')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 ${userCycle.badgeBg} ${userCycle.badgeBorder} ${userCycle.badgeText} shadow-2xs`}
            title={`Niveau validé ${userLevel}/100 (${currentPts} pts) - ${userCycle.subtitle}${isPendingValidation ? ' • Question de palier débloquée !' : ''}`}
          >
            <Trophy className="w-3.5 h-3.5 text-[#385117]" />
            <span>Niveau {userLevel}/100</span>
            {isPendingValidation && (
              <span className="w-2 h-2 rounded-full bg-[#9FE870] animate-ping inline-block ml-0.5" />
            )}
            <span className="hidden md:inline font-normal text-[11px] opacity-90">• Cycle {userCycleId}</span>
          </button>

          {/* Guide & Bilan Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 py-1.5 bg-[#F8F7F2] hover:bg-[#E5EAD9] text-[#5A5A40] border border-[#E5E2D9] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <span className="hidden sm:inline">Guide & Bilan</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E5E2D9] overflow-hidden z-50 flex flex-col p-1">
                {/* 1. Bilan Confidentiel */}
                <button
                  id="header-assessment-btn"
                  onClick={() => { onOpenAssessment(); setIsDropdownOpen(false); }}
                  className={`px-3 py-2 text-left rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                    isAssessmentCompleted
                      ? 'text-[#5A5A40] hover:bg-[#E5EAD9]'
                      : 'bg-[#5A5A40] text-white hover:bg-[#4a4a35]'
                  }`}
                  title="Bilan confidentiel chiffré : enfants, impacts, stress & violences subies"
                >
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>{isAssessmentCompleted ? 'Mon Bilan de Sûreté' : 'Faire mon Bilan'}</span>
                </button>

                {/* 2. Guide & Onboarding */}
                <button
                  id="header-onboarding-btn"
                  onClick={() => { onOpenOnboarding(); setIsDropdownOpen(false); }}
                  className="px-3 py-2 text-left hover:bg-[#F5F2ED] text-[#5A5A40] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
                  title="Ouvrir le guide d'accueil et consignes de sécurité"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#8A9A5B]" />
                  <span>Guide d'Utilisation</span>
                </button>

                {/* 3. Camouflage */}
                <button
                  id="header-camouflage-btn"
                  onClick={() => { onActivateCamouflage(); setIsDropdownOpen(false); }}
                  className="px-3 py-2 text-left hover:bg-[#F5F2ED] text-[#5A5A40] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors border-t border-[#F0EEE6] mt-1 pt-2"
                  title="Masquer immédiatement l'écran sous une fausse application de recettes"
                >
                  <EyeOff className="w-3.5 h-3.5 text-[#8A9A5B]" />
                  <span>Camouflage (Recettes)</span>
                </button>
              </div>
            )}
          </div>

          
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Sync/Login Button */}
          {onLogin && (
            <button
              onClick={isAuthenticated ? undefined : onLogin}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
                isNightMode
                  ? 'bg-[#2A2C28] text-[#D8E4C7] border border-[#3E4238] hover:bg-[#343630]'
                  : 'bg-[#F8F7F2] text-[#5A5A40] border border-[#E5E2D9] hover:bg-[#E5EAD9]'
              }`}
              title={isAuthenticated ? 'Sauvegarde Google Drive / Cloud active' : 'Se connecter pour sauvegarder (Drive / Cloud)'}
            >
              {isSyncing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8A9A5B]" />
              ) : isAuthenticated ? (
                <Cloud className="w-3.5 h-3.5 text-[#8A9A5B]" />
              ) : (
                <CloudOff className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline text-[11px]">
                {isSyncing ? 'Sync...' : isAuthenticated ? 'Sauvegardé' : 'Se connecter'}
              </span>
            </button>
          )}
          {/* Quick Geolocation Sharing Button */}
          <QuickLocationShare isNightMode={isNightMode} />

          {/* Paramètres (Gear Menu) for Transparency, Night Mode, and Exit */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
                isNightMode
                  ? 'bg-[#2A2C28] text-[#D8E4C7] border border-[#3E4238] hover:bg-[#343630]'
                  : 'bg-[#F8F7F2] text-[#5A5A40] border border-[#E5E2D9] hover:bg-[#E5EAD9]'
              }`}
              title="Paramètres d'affichage et de sortie"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            
            {isSettingsOpen && (
              <div className={`absolute top-full right-0 mt-2 p-2 rounded-xl shadow-xl z-50 flex flex-col gap-2 min-w-[140px] border ${
                isNightMode ? 'bg-[#1E201B] border-[#3E4633]' : 'bg-white border-[#E5E2D9]'
              }`}>
                {/* UI & Fiches Transparency Controller */}
                <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:justify-center">
                  <UiOpacityControl isNightMode={isNightMode} />
                </div>

                {/* Low-Contrast Night / Discreet Mode Toggle */}
                {onToggleNightMode && (
                  <button
                    type="button"
                    id="header-night-mode-toggle-btn"
                    onClick={() => { onToggleNightMode(); setIsSettingsOpen(false); }}
                    className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs ${
                      isNightMode
                        ? 'bg-[#2A2C28] text-[#D8E4C7] border border-[#3E4238] hover:bg-[#343630]'
                        : 'bg-[#F8F7F2] text-[#5A5A40] border border-[#E5E2D9] hover:bg-[#E5EAD9]'
                    }`}
                    title={isNightMode ? 'Désactiver le Mode Nuit (revenir au thème clair)' : 'Activer le Mode Nuit Discret (contraste réduit pour l\'obscurité)'}
                  >
                    {isNightMode ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-[#E6B800]" />
                        <span className="text-[11px]">Mode Jour</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-[#728642]" />
                        <span className="text-[11px]">Mode Nuit</span>
                      </>
                    )}
                  </button>
                )}
                
                {/* Emergency Quick Exit */}
                <button
                  id="header-quick-exit-btn"
                  onClick={onQuickExit}
                  className="w-full px-2.5 py-1.5 bg-[#F5E6E0] hover:bg-[#EBD3CC] border border-[#A64D4D]/30 text-[#A64D4D] rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                  title="Quitter immédiatement vers un site externe neutre"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Quitter le site</span>
                </button>
              </div>
            )}
          </div>

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
