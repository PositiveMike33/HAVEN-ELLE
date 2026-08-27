const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  "        onToggleNightMode={handleToggleNightMode}\n      />",
  "        onToggleNightMode={handleToggleNightMode}\n        isAuthenticated={isAuthenticated}\n        isSyncing={isSyncing}\n        onLogin={async () => {\n          try { await googleSignIn(); } catch(e) { console.error(e); }\n        }}\n      />"
);

fs.writeFileSync('src/App.tsx', code);
