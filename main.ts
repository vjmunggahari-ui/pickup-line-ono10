import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Are you a rare token? Because my attention has been on you since the first word.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the file on disk must hold exactly the line,
// one line, no trailing newline, within the 200-character gate.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error(`entry.txt mismatch: got ${JSON.stringify(back)}`);
}
if (back.length > 200 || back.length < 1 || back.includes("\n")) {
  throw new Error(`entry.txt invalid: ${back.length} chars`);
}
console.log(`wrote ${outPath} (${back.length} chars, verified)`);
