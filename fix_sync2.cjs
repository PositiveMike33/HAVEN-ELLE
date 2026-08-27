const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/if \(data\.\) setWellnessEntries\(data\.\);/g, '');
code = code.replace(/contacts, alerts, incidents, appointments, companionProfile, assessmentProfile, /g, 'contacts, alerts, incidents, appointments, companionProfile, assessmentProfile');

fs.writeFileSync('src/App.tsx', code);
