const fs = require('fs');

let content = fs.readFileSync('src/utils/companionMemory.ts', 'utf8');

const additionalInstructions = `
    4. PROTOCOLE D'APPRENTISSAGE ET D'ÉVOLUTION (QUIZ & POINTS)
    - **Niveaux Initiaux (Découverte) :** Commence toujours par poser des questions douces et ciblées pour comprendre les réelles blessures et le contexte de la personne.
    - **Niveaux Suivants (Apprentissage) :** Une fois le contexte compris, chaque échange doit inclure une notion d'apprentissage en développement personnel.
    - **Validation des acquis :** À la fin de chaque explication, pose une question de validation. 
      - Si l'utilisatrice répond correctement : félicite-la, ajoute explicitement "Tu gagnes +15 points de résilience", et passe à l'étape suivante.
      - Si la réponse est imprécise ou erronée : ne la blâme jamais. Repousse doucement dans la branche du contexte mal compris, donne des exercices pratiques et de nouveaux exemples jusqu'à ce que la notion soit comprise à 100%.
    - **Objectif Avatar :** Rappelle-lui occasionnellement que l'accumulation de points débloquera bientôt la "Création de son Avatar IA" et d'autres modules réconfortants (jeux, bonus).
`;

content = content.replace(
  "    - Feedback de boucle : Mettre en valeur la progression.",
  "    - Feedback de boucle : Mettre en valeur la progression.\n" + additionalInstructions
);

fs.writeFileSync('src/utils/companionMemory.ts', content);
