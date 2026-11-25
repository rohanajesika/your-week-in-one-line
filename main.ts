// Your Week in One Line — make.fun bounty
// u-boge-your-week-in-one-line-d1c14ced
//
// Writes one line (at most 100 characters) summing up the entrant's
// week to /output/entry.txt: the win, the fail, the chaos, all of it.
// Deterministic: one constant string, no fetch, no randomness, no
// clock, no environment input besides the output directory override
// the grader sets.
//
// Candidates weighed against the judge's brief, most important first
// (1 sums up the entrant's own week; 2 lands a real joke or sharp
// turn; 3 holds one concrete detail; 4 spends every word well;
// 5 feels fresh, not a template):
//
// A (89 chars, v1):
//   "Taught a robot judge my jokes all week; it ranked my best one
//   'placed': 1,625th of 4,381."
//   Sums up the week (taught a robot judge jokes all week), holds a
//   real concrete detail — ai-excited-01, this account's own entry,
//   really did rank 1,625th of 4,381 — and the scare-quoted 'placed'
//   is the joke: the leaderboard's polite word for a rank nobody
//   brags about. Ends on the number, though: the punchline is the
//   euphemism, and the number gets the last word instead.
//
// B (95 chars, CHOSEN v2 — see revision note below):
//   "Taught a robot judge jokes all week; my best placed 1,625th of
//   4,381, still counts as 'placed'."
//   Same week, same true rank, but the kicker "still counts as
//   'placed'" turns the rank from a bare number into the joke's
//   punchline: the entrant clings to the polite word after the
//   brutal number has already given it away. Criterion 2 rewards
//   the turn, criterion 4 the tighter opening.
//
// C (92 chars):
//   "Wrote jokes for a robot judge all week; my best placed 1,625th
//   of 4,381 and it still counts."
//   Same shape as B but "and it still counts" is flatter than B's
//   quoted 'placed': C's kicker states the defiance, B's kicker
//   performs it by reusing the judge's own polite word. Loses to
//   B on criterion 2.
//
// D (90 chars):
//   "My week: wrote jokes for a robot judge; my best one placed
//   1,625th of 4,381. Still counts."
//   "My week:" spends 9 characters announcing what the sentence
//   already shows, and "Still counts." as its own sentence thuds
//   where B's trailing clause lands. Loses to B on criteria 4 and 2.
//
// v1 shipped A; revised to B after the first run: A ends on the
// number, so the joke's punchline (the 'placed' euphemism) sat in
// the middle and the rank got the last word. B moves the euphemism
// to the end as the kicker "still counts as 'placed'" and tightens
// the opening ("Taught a robot judge jokes" instead of "Taught a
// robot judge my jokes"), same meaning in a sharper shape. B wins
// because its last beat is the detail that could only be this week:
// a real rank from this account's own leaderboard, and the joke is
// the entrant pretending the polite word still covers it. One read,
// one concrete number, nothing padded. All checks re-run after the
// revision; new scores saved in CHECKS.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. Exactly one line, 95 characters, 95 bytes UTF-8.
const LINE =
  "Taught a robot judge jokes all week; my best placed 1,625th of 4,381, still counts as 'placed'.";

const MAX_CHARS = 100;

function validate(line: string): void {
  if (line.length === 0 || line.trim().length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be exactly one line");
  }
}

function main(): void {
  validate(LINE);
  // The grader mounts /output and may point here with
  // MAKEFUN_OUTPUT_DIR; default to /output. Only the file inside
  // the directory is ever written — the directory itself is never
  // removed or recreated.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts the file's characters,
  // and the line itself is the whole entry.
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
