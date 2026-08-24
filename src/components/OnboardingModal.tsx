import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChefHat, 
  Lock, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  EyeOff, 
  AlertTriangle,
  FileCheck2,
  Users,
  Compass
} from 'lucide-react';
import { StorageService } from '../utils/storage';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onNavigateToTab }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      id: 'welcome',
      title: 'Bienvenue dans votre Sanctuaire',
      subtitle: 'Un espace 100% confidentiel, protecteur et pensé pour votre sécurité absolue.',
      icon: ShieldCheck,
      iconBg: 'bg-[#E5EAD9] text-[#5A5A40]',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-[#3E3B39] leading-relaxed">
            <strong>HAVEN-ELLE</strong> est votre alliée de chaque instant. Que vous ayez besoin d'une écoute bienveillante, d'établir un plan d'urgence, ou de sauvegarder des preuves juridiques, chaque outil a été conçu pour préserver votre intégrité et celle de vos proches.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#F8F7F2] border border-[#E5E2D9] flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shrink-0 mt-0.5">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#3E3B39]">Écoute & Soutien 24/7</h4>
                <p className="text-[11px] text-[#8E8B82] mt-0.5">Assistance psychologique et régulation émotionnelle immédiate.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8F7F2] border border-[#E5E2D9] flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#3E3B39]">Réseau d'Alerte Silencieux</h4>
                <p className="text-[11px] text-[#8E8B82] mt-0.5">Déclenchement d'alerte instantanée avec localisation discrète.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'camouflage',
      title: 'Discrétion Absolue & Mode Camouflage',
      subtitle: 'Masquez l’application instantanément en cas d’intrusion ou de regard indiscret.',
      icon: ChefHat,
      iconBg: 'bg-[#8A9A5B]/20 text-[#8A9A5B]',
      content: (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#E5EAD9]/60 border border-[#CED6C1] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#5A5A40] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-[#5A5A40]">Réflexe de protection rapide (Touche Échap)</h4>
              <p className="text-xs text-[#5A5A40]/90 mt-0.5 leading-relaxed">
                Appuyez sur la touche <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#CED6C1] text-[11px] font-mono shadow-2xs">Échap</kbd> de votre clavier ou sur le bouton rouge <strong>« MODE PANIQUE »</strong> pour basculer en un millième de seconde vers notre fausse application culinaire <em>« Saveurs & Douceurs »</em>.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-[#3E3B39]">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A9A5B] shrink-0 mt-0.5" />
              <span><strong>Fausse application réaliste :</strong> Recettes de cuisine, astuces de chef et météo complète.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A9A5B] shrink-0 mt-0.5" />
              <span><strong>Déverrouillage secret par PIN :</strong> Cliquez sur l'icône de clé discrète en haut à droite et tapez votre code PIN (<code>1234</code> par défaut).</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A9A5B] shrink-0 mt-0.5" />
              <span><strong>Effacement de la mémoire visuelle :</strong> Aucune trace de votre session en cours n'apparaît à l'écran.</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'privacy',
      title: 'Protection des Données & Zéro Traçage',
      subtitle: 'Vos secrets, vos contacts et vos preuves restent sous votre contrôle exclusif.',
      icon: Lock,
      iconBg: 'bg-[#5A5A40] text-white',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-[#3E3B39] leading-relaxed">
            HAVEN-ELLE applique une stricte politique de <strong>confidentialité par conception</strong>. Aucune donnée commerciale, aucun cookie publicitaire, aucun partage avec des tiers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9] text-center">
              <EyeOff className="w-5 h-5 text-[#5A5A40] mx-auto mb-1.5" />
              <h5 className="text-xs font-bold text-[#3E3B39]">100% Anonyme</h5>
              <p className="text-[10px] text-[#8E8B82] mt-0.5">Aucun nom réel exigé</p>
            </div>
            <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9] text-center">
              <Lock className="w-5 h-5 text-[#8A9A5B] mx-auto mb-1.5" />
              <h5 className="text-xs font-bold text-[#3E3B39]">Coffre Chiffré</h5>
              <p className="text-[10px] text-[#8E8B82] mt-0.5">Preuves & photos isolées</p>
            </div>
            <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9] text-center">
              <FileCheck2 className="w-5 h-5 text-[#5A5A40] mx-auto mb-1.5" />
              <h5 className="text-xs font-bold text-[#3E3B39]">Purge d'Urgence</h5>
              <p className="text-[10px] text-[#8E8B82] mt-0.5">Effacement en 1 clic</p>
            </div>
          </div>

          <p className="text-xs text-[#8E8B82] italic">
            Conseil de discrétion : Pour une sécurité maximale, utilisez un onglet de navigation privée si vous partagez votre appareil.
          </p>
        </div>
      ),
    },
    {
      id: 'companion',
      title: 'Votre Compagnonne IA & Évolution',
      subtitle: 'Une relation continue, bienveillante et personnalisée qui grandit à vos côtés.',
      icon: Sparkles,
      iconBg: 'bg-[#8A9A5B] text-white',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-[#3E3B39] leading-relaxed">
            HAVEN-ELLE n’est pas un simple automate : elle garde en mémoire votre contexte, vos proches de confiance, les victoires que vous avez accomplies et votre plan de sécurité afin de vous offrir un accompagnement profondément empathique.
          </p>

          <div className="p-3.5 rounded-xl bg-[#F8F7F2] border border-[#E5E2D9] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#5A5A40]">
              <span>Votre alliance avec HAVEN-ELLE</span>
              <span className="bg-[#E5EAD9] text-[#5A5A40] px-2 py-0.5 rounded-full text-[10px] font-semibold">
                Niveau Évolutif
              </span>
            </div>
            <p className="text-xs text-[#3E3B39]">
              Au fil de vos interactions et de vos exercices de sérénité, votre lien de confiance se renforce pour constituer un véritable bouclier protecteur.
            </p>
          </div>

          <div className="text-xs text-[#8E8B82] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8A9A5B] shrink-0" />
            <span>Toutes les mémoires de contexte sont conservées localement dans votre coffre sécurisé.</span>
          </div>
        </div>
      ),
    },
    {
      id: 'ready',
      title: 'Vous êtes prête',
      subtitle: 'Prenez le temps d’explorer vos outils de protection à votre propre rythme.',
      icon: Compass,
      iconBg: 'bg-[#5A5A40] text-white',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-[#3E3B39] leading-relaxed">
            Voici les 3 actions recommandées pour débuter sereinement :
          </p>

          <div className="space-y-2.5">
            <div 
              onClick={() => {
                handleComplete();
                onNavigateToTab?.('contacts');
              }}
              className="p-3 rounded-xl bg-white border border-[#E5E2D9] hover:border-[#8A9A5B] flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center font-bold text-xs">1</div>
                <div>
                  <h4 className="text-xs font-bold text-[#3E3B39] group-hover:text-[#5A5A40]">Ajouter vos Contacts de Confiance</h4>
                  <p className="text-[11px] text-[#8E8B82]">Désignez 1 à 3 proches pour recevoir vos alertes discrètes.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8E8B82] group-hover:text-[#5A5A40] group-hover:translate-x-0.5 transition-all" />
            </div>

            <div 
              onClick={() => {
                handleComplete();
                onNavigateToTab?.('safety_plan');
              }}
              className="p-3 rounded-xl bg-white border border-[#E5E2D9] hover:border-[#8A9A5B] flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center font-bold text-xs">2</div>
                <div>
                  <h4 className="text-xs font-bold text-[#3E3B39] group-hover:text-[#5A5A40]">Construire votre Plan de Sûreté IA</h4>
                  <p className="text-[11px] text-[#8E8B82]">Lieux sûrs, sac de départ et stratégies de communication.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8E8B82] group-hover:text-[#5A5A40] group-hover:translate-x-0.5 transition-all" />
            </div>

            <div 
              onClick={() => {
                handleComplete();
                onNavigateToTab?.('chat');
              }}
              className="p-3 rounded-xl bg-white border border-[#E5E2D9] hover:border-[#8A9A5B] flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center font-bold text-xs">3</div>
                <div>
                  <h4 className="text-xs font-bold text-[#3E3B39] group-hover:text-[#5A5A40]">Échanger avec HAVEN-ELLE</h4>
                  <p className="text-[11px] text-[#8E8B82]">Posez vos questions juridiques ou confiez vos angoisses.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8E8B82] group-hover:text-[#5A5A40] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    StorageService.setOnboardingCompleted(true);
    onClose();
  };

  const current = steps[currentStep];
  const StepIcon = current.icon;

  return (
    <div id="onboarding-modal-backdrop" className="fixed inset-0 bg-[#3E3B39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div 
        id="onboarding-modal-card" 
        className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-[#E5E2D9] flex flex-col justify-between max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E2D9]">
            <div className="flex items-center space-x-3">
              <div className={`w-11 h-11 rounded-2xl ${current.iconBg} flex items-center justify-center shadow-2xs`}>
                <StepIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A5B]">
                  Guide de Sécurité & Bienvenue • {currentStep + 1} / {steps.length}
                </span>
                <h3 className="text-lg font-bold text-[#3E3B39] font-serif-natural tracking-tight">
                  {current.title}
                </h3>
              </div>
            </div>
            
            <button
              id="onboarding-skip-btn"
              onClick={handleComplete}
              className="text-xs text-[#8E8B82] hover:text-[#5A5A40] font-medium px-2.5 py-1 rounded-lg hover:bg-[#F8F7F2] transition-colors"
            >
              Passer
            </button>
          </div>

          <p className="text-xs text-[#8E8B82] mt-2 mb-5">
            {current.subtitle}
          </p>

          {/* Step Body */}
          <div className="min-h-[220px]">
            {current.content}
          </div>
        </div>

        {/* Bottom Navigation & Dots */}
        <div className="pt-6 mt-6 border-t border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                aria-label={`Aller à l'étape ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep 
                    ? 'w-6 bg-[#5A5A40]' 
                    : idx < currentStep 
                    ? 'w-2 bg-[#8A9A5B]' 
                    : 'w-2 bg-[#E5E2D9]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            {currentStep > 0 && (
              <button
                id="onboarding-prev-btn"
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-xl border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F8F7F2] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Précédent
              </button>
            )}

            <button
              id="onboarding-next-btn"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              {currentStep === steps.length - 1 ? (
                <>Accéder à HAVEN-ELLE <CheckCircle2 className="w-4 h-4 text-[#E5EAD9]" /></>
              ) : (
                <>Suivant <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
