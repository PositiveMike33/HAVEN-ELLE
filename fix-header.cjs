const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

// Remove HeaderAudioPlayer import and usage
content = content.replace(/import { HeaderAudioPlayer } from '.\/HeaderAudioPlayer';\n/, '');
content = content.replace(/<HeaderAudioPlayer \/>/g, '');

// We need to pass resiliencePoints to Header
// Replace `const navItems = [` with dynamic tabs based on resiliencePoints
content = content.replace(
  "contactsCount: number;\n  isNightMode?: boolean;\n  onToggleNightMode?: () => void;\n}",
  "contactsCount: number;\n  isNightMode?: boolean;\n  onToggleNightMode?: () => void;\n  resiliencePoints?: number;\n}"
);

content = content.replace(
  "({ activeTab, onSelectTab, onActivateCamouflage, onTriggerPanic, onQuickExit, onTriggerSOS, onOpenOnboarding, onOpenAssessment, isAssessmentCompleted, contactsCount, isNightMode, onToggleNightMode }) => {",
  "({ activeTab, onSelectTab, onActivateCamouflage, onTriggerPanic, onQuickExit, onTriggerSOS, onOpenOnboarding, onOpenAssessment, isAssessmentCompleted, contactsCount, isNightMode, onToggleNightMode, resiliencePoints = 0 }) => {"
);

// Modify navItems
const newNavItems = `
  const navItems = [];
  
  // Niveau 1: Bilan et Q&A
  navItems.push({ id: 'evaluation', label: 'Bilan & Questions', icon: ClipboardList });

  // Dès qu'on a un peu de points (niveau 2+)
  if (resiliencePoints >= 20) {
    navItems.push({ id: 'wellness', label: 'Soutien & Apprentissage', icon: Heart });
  }
  
  // Niveau 3+
  if (resiliencePoints >= 50) {
    navItems.push({ id: 'network', label: 'Réseau de Secours', icon: Users, badge: contactsCount > 0 ? \`\${contactsCount}\` : undefined });
  }

  // Niveau 4+
  if (resiliencePoints >= 100) {
    navItems.push({ id: 'justice', label: 'Dossier Justice', icon: Scale });
  }
`;

content = content.replace(
  /const navItems = \[[\s\S]*?\];/,
  newNavItems
);

fs.writeFileSync('src/components/Header.tsx', content);
