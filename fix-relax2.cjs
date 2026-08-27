const fs = require('fs');

let lines = fs.readFileSync('src/components/TherapeuticRelaxation.tsx', 'utf8').split('\n');
const idx = lines.findIndex(line => line.trim() === ')}');

if (idx !== -1) {
    // Keep lines up to the first ')}' which closes the loading/generated avatar logic.
    // Let's actually find where `Aucun avatar encore généré` is.
    const textIdx = lines.findIndex(line => line.includes('Aucun avatar encore généré.'));
    if (textIdx !== -1) {
        // Find the `)}` that closes the avatar loading ternary
        const closingTernary = lines.findIndex((line, i) => i > textIdx && line.trim() === ')}');
        
        lines.splice(closingTernary + 1); // remove everything after it
        lines.push(
            "          </div>",
            "        </div>",
            "        )}",
            "      </div>",
            "    </div>",
            "  );",
            "};"
        );
    }
}
fs.writeFileSync('src/components/TherapeuticRelaxation.tsx', lines.join('\n'));
