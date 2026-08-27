const fs = require('fs');

let lines = fs.readFileSync('src/components/TherapeuticRelaxation.tsx', 'utf8').split('\n');

// Find the line with Art-Thérapie
const artHeaderIndex = lines.findIndex(line => line.includes('Art-Thérapie & Avatars Anonymes de Protection'));

if (artHeaderIndex !== -1) {
  lines[artHeaderIndex] = `              {isAvatarUnlocked ? "Bonus: Art-Thérapie & Avatars Anonymes de Protection" : "Module Verrouillé"}`;
  
  const descIndex = artHeaderIndex + 3;
  lines[descIndex] = `              {isAvatarUnlocked ? "Bravo ! Vous avez débloqué votre espace Bonus. Générez une identité visuelle artistique." : "Ce module ludique se débloquera lorsque vous aurez accumulé au moins 200 points."}`;

  // Find the grid container that has the inputs
  const gridIndex = lines.findIndex((line, i) => i > descIndex && line.includes('<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">'));
  
  if (gridIndex !== -1) {
    lines.splice(gridIndex, 0, "        {isAvatarUnlocked && (");
    
    // Find the end of the grid container.
    // It's before the closing </div> of the section.
    // Looking at the end of the file:
    const fileEndStart = lines.length - 10;
    const endGridIndex = lines.findIndex((line, i) => i > gridIndex && line.trim() === '</>' || (i > fileEndStart && line.trim() === '</div>'));
    
    // Actually let's just replace the broken end of file.
    // Remove the `</>` we added, and add `)}`
    
    const badTagIndex = lines.findIndex(line => line.trim() === '</>');
    if (badTagIndex !== -1) {
      lines[badTagIndex] = "        )}";
    }
  }
}

fs.writeFileSync('src/components/TherapeuticRelaxation.tsx', lines.join('\n'));
