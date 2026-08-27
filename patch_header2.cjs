const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf-8');

code = code.replace(
  "  isNightMode = false,\n  onToggleNightMode,\n  resiliencePoints = 0,\n}) => {",
  "  isNightMode = false,\n  onToggleNightMode,\n  resiliencePoints = 0,\n  isAuthenticated = false,\n  isSyncing = false,\n  onLogin,\n}) => {"
);

fs.writeFileSync('src/components/Header.tsx', code);
