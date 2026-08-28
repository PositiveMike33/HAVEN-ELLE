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
  Trophy,
  Headphones
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
  
  // Main Tabs:
  // 1. Violentomètre (Violentomètre & 8 Questionnaires Interactifs)
  navItems.push({ 
    id: 'violentometre', 
    label: 'Violentomètre', 
    icon: ClipboardList 
  });

  // 2. Les 111 Vérités (111 Paliers, Flashcards Toltèques, Validation & Progression)
  navItems.push({ 
    id: 'truths111', 
    label: 'Les 111 Vérités', 
    icon: Sparkles,
    badge: isPendingValidation ? 'Palier' : undefined
  });

  // 3. Soutien & Bien-Être (Psychanalyste IA, Respiration, Méditations)
  navItems.push({ 
    id: 'wellness', 
    label: 'Soutien & Bien-Être', 
    icon: Heart 
  });
  
  // 4. Sécurité & Protection (Réseau de Secours, Dossier Justice & Alertes)
  navItems.push({ 
    id: 'security', 
    label: 'Sécurité & Protection', 
    icon: ShieldCheck, 
    badge: contactsCount > 0 ? `${contactsCount}` : undefined 
  });


  return (
    <header className="bg-white text-[#0F172A] sticky top-0 z-40 shadow-xs border-b-2 border-[#CBD5E1]">
      {/* Top Urgent Action Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#F1F5F9]">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#15803D] text-white flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-[#0F172A] font-serif-natural">HAVEN-ELLE</span>
              <span className="text-[10px] bg-[#DCFCE7] text-[#14532D] font-extrabold px-2.5 py-0.5 rounded-full border border-[#86EFAC]">
                Sanctuaire Sécurisé
              </span>
            </div>
            <p className="text-xs text-[#475569] font-medium hidden sm:block">Protection, Écoute & Réseau d'Alerte pour Femmes</p>
          </div>
        </div>

        {/* PROMINENT GLOBAL AUDIO & VIDEO CONTROLLER & GUIDE */}
        <div id="header-audio-container" className="flex items-center gap-3">
          {/* Level & Cycle Badge */}
          <button
            onClick={() => onSelectTab('truths111')}
            className={`px-3.5 py-1.5 rounded-xl border-2 text-xs font-black flex items-center gap-1.5 transition-all hover:scale-105 ${userCycle.badgeBg} ${userCycle.badgeBorder} ${userCycle.badgeText} shadow-xs`}
            title={`Niveau validé ${userLevel}/111 (${currentPts} pts) - ${userCycle.subtitle}${isPendingValidation ? ' • Question de palier débloquée !' : ''}`}
          >
            <Trophy className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Niveau {userLevel}/111</span>
            {isPendingValidation && (
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping inline-block ml-0.5" />
            )}
            <span className="hidden md:inline font-bold text-[11px] opacity-90">• Cycle {userCycleId}</span>
          </button>

          {/* Guide & Bilan Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3.5 py-1.5 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border-2 border-[#CBD5E1] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#15803D]" />
              <span className="hidden sm:inline">Guide & Bilan</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 w-56 bg-white rounded-xl shadow-xl border-2 border-[#CBD5E1] overflow-hidden z-50 flex flex-col p-1.5">
                {/* 1. Bilan Confidentiel */}
                <button
                  id="header-assessment-btn"
                  onClick={() => { onOpenAssessment(); setIsDropdownOpen(false); }}
                  className={`px-3 py-2 text-left rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                    isAssessmentCompleted
                      ? 'text-[#0F172A] hover:bg-[#F1F5F9]'
                      : 'bg-[#15803D] text-white hover:bg-[#14532D]'
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
                  className="px-3 py-2 text-left hover:bg-[#F1F5F9] text-[#0F172A] rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
                  title="Ouvrir le guide d'accueil et consignes de sécurité"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Guide d'Utilisation</span>
                </button>

                {/* 3. Camouflage */}
                <button
                  id="header-camouflage-btn"
                  onClick={() => { onActivateCamouflage(); setIsDropdownOpen(false); }}
                  className="px-3 py-2 text-left hover:bg-[#F1F5F9] text-[#0F172A] rounded-lg text-xs font-bold flex items-center gap-2 transition-colors border-t border-[#E2E8F0] mt-1 pt-2"
                  title="Masquer immédiatement l'écran sous une fausse application de recettes"
                >
                  <EyeOff className="w-3.5 h-3.5 text-[#15803D]" />
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs border-2 ${
                isNightMode
                  ? 'bg-[#1E293B] text-[#F8FAFC] border-[#475569] hover:bg-[#334155]'
                  : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F8FAFC]'
              }`}
              title={isAuthenticated ? 'Sauvegarde Google Drive / Cloud active' : 'Se connecter pour sauvegarder (Drive / Cloud)'}
            >
              {isSyncing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#15803D]" />
              ) : isAuthenticated ? (
                <Cloud className="w-3.5 h-3.5 text-[#15803D]" />
              ) : (
                <CloudOff className="w-3.5 h-3.5 text-[#475569]" />
              )}
              <span className="hidden sm:inline text-xs font-bold">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs border-2 ${
                isNightMode
                  ? 'bg-[#1E293B] text-[#F8FAFC] border-[#475569] hover:bg-[#334155]'
                  : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F8FAFC]'
              }`}
              title="Paramètres d'affichage et de sortie"
            >
              <Settings className="w-4 h-4 text-[#0F172A]" />
            </button>
            
            {isSettingsOpen && (
              <div className={`absolute top-full right-0 mt-2 p-2 rounded-xl shadow-xl z-50 flex flex-col gap-2 min-w-[160px] border-2 ${
                isNightMode ? 'bg-[#1E293B] border-[#475569]' : 'bg-white border-[#CBD5E1]'
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
                    className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs border-2 ${
                      isNightMode
                        ? 'bg-[#0F172A] text-[#F8FAFC] border-[#475569] hover:bg-[#1E293B]'
                        : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F8FAFC]'
                    }`}
                    title={isNightMode ? 'Désactiver le Mode Nuit (revenir au thème clair)' : 'Activer le Mode Nuit'}
                  >
                    {isNightMode ? (
                      <>
                        <Sun className="w-4 h-4 text-[#EAB308]" />
                        <span>Mode Jour</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 text-[#15803D]" />
                        <span>Mode Nuit</span>
                      </>
                    )}
                  </button>
                )}
                
                {/* Emergency Quick Exit */}
                <button
                  id="header-quick-exit-btn"
                  onClick={onQuickExit}
                  className="w-full px-3 py-2 bg-[#FEE2E2] hover:bg-[#FECACA] border-2 border-[#FCA5A5] text-[#DC2626] rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  title="Quitter immédiatement vers un site externe neutre"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Quitter le site</span>
                </button>
              </div>
            )}
          </div>

          {/* Immediate Panic Mode Button with integrated SOS Réseau quick option */}
          <div className="flex items-center gap-1.5">
            <button
              id="header-panic-mode-btn"
              onClick={onTriggerPanic}
              className="px-3.5 py-1.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 border border-[#EF4444]"
              title="SOS : Basculer instantanément en camouflage d'urgence et couper le son (Touche Échap)"
            >
              <AlertOctagon className="w-4 h-4 animate-pulse" />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center space-x-2 overflow-x-auto py-2.5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap flex items-center gap-2 transition-all shrink-0 border-2 ${
                  isActive
                    ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm font-black'
                    : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F8FAFC] font-bold'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#15803D]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-white/30 text-white' : 'bg-[#DCFCE7] text-[#14532D]'
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
