const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf-8');

// Add Lucide icons
code = code.replace(
  "LogOut,",
  "LogOut,\n  Cloud,\n  CloudOff,\n  RefreshCw,"
);

// Add props to interface
code = code.replace(
  "  isNightMode?: boolean;\n  onToggleNightMode?: () => void;",
  "  isNightMode?: boolean;\n  onToggleNightMode?: () => void;\n  isAuthenticated?: boolean;\n  isSyncing?: boolean;\n  onLogin?: () => void;"
);

// Add props to component
code = code.replace(
  "  resiliencePoints = 0,\n  isNightMode = false,\n  onToggleNightMode,\n}: HeaderProps) => {",
  "  resiliencePoints = 0,\n  isNightMode = false,\n  onToggleNightMode,\n  isAuthenticated = false,\n  isSyncing = false,\n  onLogin,\n}: HeaderProps) => {"
);

// Add the sync button next to the QuickLocationShare button
const oldQuickLoc = "{/* Quick Geolocation Sharing Button */}\n          <QuickLocationShare isNightMode={isNightMode} />";
const newQuickLoc = `{/* Sync/Login Button */}
          {onLogin && (
            <button
              onClick={isAuthenticated ? undefined : onLogin}
              className={\`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs \${
                isNightMode
                  ? 'bg-[#2A2C28] text-[#D8E4C7] border border-[#3E4238] hover:bg-[#343630]'
                  : 'bg-[#F8F7F2] text-[#5A5A40] border border-[#E5E2D9] hover:bg-[#E5EAD9]'
              }\`}
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
          <QuickLocationShare isNightMode={isNightMode} />`;

code = code.replace(oldQuickLoc, newQuickLoc);

fs.writeFileSync('src/components/Header.tsx', code);
