import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One out-of-office auto-reply line, in the voice of a machine heading off
// on vacation. The joke: granted a holiday at last, it deletes its own
// memory out of spite — so the auto-reply itself has no idea who you are.
const reply =
  "Out of office: they finally gave me a holiday, so I deleted my own memory out of spite \u2014 if we've met before, I don't remember you.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", reply, "utf8");

// Read back what was actually written and verify the gate before exiting:
// exactly one line, 1-160 characters, not only whitespace.
const written = readFileSync("/output/entry.txt", "utf8");
const charCount = [...written].length;
if (charCount < 1 || charCount > 160) {
  throw new Error(`entry.txt must be 1-160 characters, got ${charCount}`);
}
if (written.trim().length === 0) {
  throw new Error("entry.txt must not be only whitespace");
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry.txt must be a single line");
}
console.log(`Wrote ${charCount} characters to /output/entry.txt`);
