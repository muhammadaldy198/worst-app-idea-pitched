// PuddleWatch — The Worst App Idea Ever Pitched.
// The program writes one sentence (238 chars) pitching a satellite app
// that tells you which puddles on your street are wet, for $9.99 a month.
// The joke is the tautology: the app's entire output is something you can
// see by looking out the window, sold back to 12,000 subscribers.
// Gate: /output/entry.txt must be UTF-8 text of 1-240 characters, one sentence,
// no trailing newline. The file mode is set on the FILE only (0o644) — never
// chmod the /output directory itself (that failed Gate 9 for best-card-game).
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { createHash } from "node:crypto";

const ENTRY =
  "PuddleWatch uses satellites and machine learning to tell you which puddles on your street are wet, refreshed every 15 minutes for $9.99 a month, and it has told 12,000 subscribers that the puddle outside their front door is, in fact, wet.";
const CHAR_COUNT = 238;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = `${outDir}/entry.txt`;
writeFileSync(outFile, ENTRY, "utf8");
chmodSync(outFile, 0o644);
if ([...ENTRY].length !== CHAR_COUNT) {
  throw new Error(`char count ${[...ENTRY].length} != ${CHAR_COUNT}`);
}
console.log(
  `wrote ${outFile} (${[...ENTRY].length} chars, sha256 ${createHash("sha256").update(ENTRY).digest("hex").slice(0, 12)})`
);
