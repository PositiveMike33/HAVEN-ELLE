const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "import { ShieldCheck, Lock, AlertCircle, HeartHandshake } from 'lucide-react';",
  "import { ShieldCheck, Lock, AlertCircle, HeartHandshake } from 'lucide-react';\nimport { CompanionMemoryService } from './utils/companionMemory';"
);

content = content.replace(
  "const [activeTab, setActiveTab] = useState('network');",
  "const [activeTab, setActiveTab] = useState('evaluation');\n  const [companionProfile, setCompanionProfile] = useState(() => CompanionMemoryService.getProfile());"
);

content = content.replace(
  "contactsCount={contacts.filter((c) => c.isActive).length}",
  "contactsCount={contacts.filter((c) => c.isActive).length}\n        resiliencePoints={companionProfile.resiliencePoints}"
);

// Add the evaluation component
// Wait, is there a MainScreenVideoAndQuestions component in App.tsx? No, it's inside `SoutienBienEtre`.
// We should render it as the `evaluation` tab. Let's add it to App.tsx

content = content.replace(
  "import { CamouflageApp } from './components/CamouflageApp';",
  "import { CamouflageApp } from './components/CamouflageApp';\nimport { MainScreenVideoAndQuestions } from './components/MainScreenVideoAndQuestions';"
);

content = content.replace(
  "{activeTab === 'network' && (",
  `{activeTab === 'evaluation' && (
          <MainScreenVideoAndQuestions onPlanGenerated={() => setActiveTab('wellness')} />
        )}

        {activeTab === 'network' && (`
);

fs.writeFileSync('src/App.tsx', content);
