const fs = require('fs');
let content = fs.readFileSync('src/components/SoutienBienEtre.tsx', 'utf8');

content = content.replace("import { HistoryOfViolenceVideo } from './HistoryOfViolenceVideo';", "import { WellnessPodcastSection } from './WellnessPodcastSection';");
content = content.replace("<HistoryOfViolenceVideo />", "<WellnessPodcastSection />");

fs.writeFileSync('src/components/SoutienBienEtre.tsx', content);
