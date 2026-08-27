const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/wellnessEntries/g, '');
code = code.replace(/set\(data.assessmentProfile\);/g, 'setAssessmentProfile(data.assessmentProfile);');

fs.writeFileSync('src/App.tsx', code);
