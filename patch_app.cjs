const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

if (!code.includes('import { ProgressionDashboard }')) {
  code = code.replace(
    "import { BackgroundMusicVideo } from './components/BackgroundMusicVideo';",
    "import { BackgroundMusicVideo } from './components/BackgroundMusicVideo';\nimport { ProgressionDashboard } from './components/ProgressionDashboard';"
  );
}

code = code.replace(
  "{activeTab === 'evaluation' && (\n          <MainScreenVideoAndQuestions onPlanGenerated={() => setActiveTab('wellness')} />\n        )}",
  `{activeTab === 'evaluation' && (
          <div className="space-y-6">
            <ProgressionDashboard resiliencePoints={companionProfile.resiliencePoints} />
            <MainScreenVideoAndQuestions onPlanGenerated={() => setActiveTab('wellness')} />
          </div>
        )}`
);

fs.writeFileSync('src/App.tsx', code);
