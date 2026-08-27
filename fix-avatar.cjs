const fs = require('fs');

let lines = fs.readFileSync('src/components/TherapeuticRelaxation.tsx', 'utf8').split('\n');

// Find index of "</>"
const idx = lines.findIndex(line => line.includes('</>'));
if (idx !== -1) {
  lines = lines.slice(0, idx);
  lines.push(
    "          </>",
    "        )}",
    "      </div>",
    "    </div>",
    "  );",
    "};"
  );
  fs.writeFileSync('src/components/TherapeuticRelaxation.tsx', lines.join('\n'));
}
