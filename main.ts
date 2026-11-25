// One Star for Monday — make.fun bounty entry
// Writes a one-star review of Monday, written as if Monday were a restaurant,
// to /output/entry.txt. Gate: 1-180 characters, at most 25 words, one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "One star. Waited forty minutes for a table, the server forgot my order, and the special was just last Friday's leftovers reheated into a Monday.";

// Gate from competition.yaml: /output/entry.txt must be UTF-8 text of
// 1 to 180 characters, not only white space, one line, at most 25 words.
const MIN_CHARS = 1;
const MAX_CHARS = 180;
const MAX_WORDS = 25;

function checkEntry(text: string): string[] {
  const problems: string[] = [];
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    problems.push(`length ${text.length} outside ${MIN_CHARS}-${MAX_CHARS} chars`);
  }
  if (text.trim().length === 0) {
    problems.push("entry is only white space");
  }
  if (text.includes("\n")) {
    problems.push("entry must be a single line");
  }
  const words = text.trim().split(/\s+/).length;
  if (words > MAX_WORDS) {
    problems.push(`${words} words exceeds ${MAX_WORDS}`);
  }
  return problems;
}

function main(): void {
  const problems = checkEntry(ENTRY);
  if (problems.length > 0) {
    throw new Error(`entry fails gate: ${problems.join("; ")}`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  // Read the file back and confirm it matches byte for byte.
  const written = readFileSync("/output/entry.txt");
  if (!written.equals(Buffer.from(ENTRY, "utf8"))) {
    throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
  }
  const words = ENTRY.trim().split(/\s+/).length;
  console.log(`entry (${ENTRY.length} chars, ${words} words): ${ENTRY}`);
}

main();
