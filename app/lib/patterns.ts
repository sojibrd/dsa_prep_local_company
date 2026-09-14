import fs from "node:fs";
import path from "node:path";
import { slugify } from "./slug";

/**
 * server-only — `patterns/` পড়ে। client component এখান থেকে শুধু `import type`।
 *
 * প্রতিটা প্যাটার্ন ফাইল `dsa_prep` workbook-এর ফাইলের হুবহু কপি (লোকালে বাংলা,
 * রিমোট/গ্লোবালে ইংরেজি)। ফাইলনাম `1.4-hashing-frequency-counting.md` — নম্বর ক্রম
 * ঠিক করে, বাকিটা route (`/pattern/hashing-frequency-counting/`)। টপিকের নাম
 * `patterns/topics.md`-এ।
 *
 * ছাঁচ (দুই ভাষাতেই):
 *   ### 1.4 নাম
 *   **চিনবেন কীভাবে:** / **How to spot it:** …        → clue
 *   **Demo: …** থেকে প্রবলেমের তালিকার আগ পর্যন্ত       → demo (ভাঁজ করা)
 *   **প্রবলেম লিস্ট:** / **Problems:**
 *   - [ ] **নাম** — [LC 1](url) — 🔥 Must-do _(নোট)_   → problem
 *         → Statement: …  /  উদাহরণ: …                 → problem.body
 *         → আমার সমাধান: / → যে সমস্যা হয়েছিল:         → বাদ (নোট সাইটে লেখা হয়)
 */
const PATTERNS_DIR = path.join(process.cwd(), "patterns");
const TOPICS_FILE = "topics.md";
const FILE_RE = /^(\d+)\.(\d+)-(.+)\.md$/;

export type Problem = {
  /** নোট ও plan-এর রেফারেন্সের key — `lc15`, LeetCode না হলে `gfg-activity-selection` */
  key: string;
  lc: number | null;
  name: string;
  url: string;
  /** লিংকের লেখা — "LC 15", "GfG" */
  source: string;
  mustDo: boolean;
  /** ট্যাগের পরের `_(…)_` অংশ, markdown */
  note: string;
  /** Statement ও উদাহরণ, markdown */
  body: string;
};

export type Pattern = {
  /** ASCII, e.g. "1.4" */
  id: string;
  slug: string;
  name: string;
  topicNum: number;
  topicName: string;
  clue: string;
  demo: string;
  /** `**Demo: নাম** — [LC n](url)` — plan-এ demo-ও প্রবলেম হিসেবে আসতে পারে */
  demoProblem: Problem | null;
  problems: Problem[];
  /** তালিকার শেষে অন্য প্যাটার্নের দিকে ইশারা — `Sliding Window Maximum → দেখুন **4.4**` */
  seeAlso: string[];
};

export type ProblemRef = Pick<Problem, "key" | "lc" | "name" | "url" | "source"> & {
  patternId: string;
  patternSlug: string;
  patternName: string;
};

const H3_RE = /^###\s+(\d+\.\d+)\s+(.+)$/;
const CLUE_RE = /^\*\*(?:চিনবেন কীভাবে|How to spot it):\*\*\s*(.*)$/;
const DEMO_RE = /^\*\*Demo\b/;
const DEMO_PROBLEM_RE = /^\*\*Demo:\s*(.+?)\*\*\s+—\s+\[([^\]]+)\]\(([^)]+)\)\s*(.*)$/;
const LIST_RE = /^\*\*(?:প্রবলেম লিস্ট|Problems):\*\*\s*$/;
const PROBLEM_RE = /^-\s+\[[ xX]\]\s+\*\*(.+?)\*\*\s+—\s+\[([^\]]+)\]\(([^)]+)\)(?:\s+—\s+(🔥 Must-do|⚪ Bonus))?\s*(.*)$/;
const NOTE_LINE_RE = /^→\s*(?:আমার সমাধান|যে সমস্যা হয়েছিল|My solution|Where I got stuck):/;

function problemKey(lc: number | null, name: string): string {
  return lc !== null ? `lc${lc}` : `gfg-${slugify(name)}`;
}

function toProblem(name: string, source: string, url: string, tag: string | undefined, note: string): Problem {
  const lcMatch = /^LC\s+(\d+)$/.exec(source.trim());
  const lc = lcMatch ? Number(lcMatch[1]) : null;
  return {
    key: problemKey(lc, name),
    lc,
    name: name.trim(),
    url,
    source: source.trim(),
    mustDo: tag === "🔥 Must-do",
    note: note.trim(),
    body: "",
  };
}

function parseTopics(): Map<number, string> {
  const topics = new Map<number, string>();
  const file = path.join(PATTERNS_DIR, TOPICS_FILE);
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = /^-\s+(\d+)\s+·\s+(.+)$/.exec(line.trim());
    if (match) topics.set(Number(match[1]), match[2].trim());
  }
  return topics;
}

function parsePattern(file: string, slug: string, topics: Map<number, string>): Pattern {
  const lines = fs.readFileSync(path.join(PATTERNS_DIR, file), "utf8").split(/\r?\n/);
  let id = "";
  let name = "";
  let clue = "";
  let demoProblem: Problem | null = null;
  const demo: string[] = [];
  const problems: Problem[] = [];
  const seeAlso: string[] = [];
  let section: "head" | "demo" | "list" = "head";
  let current: { problem: Problem; body: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    current.problem.body = current.body.join("\n").trim();
    problems.push(current.problem);
    current = null;
  };

  for (const line of lines) {
    if (!id) {
      const h3 = H3_RE.exec(line);
      if (h3) {
        id = h3[1];
        name = h3[2].trim();
        continue;
      }
    }

    if (section === "head") {
      const clueMatch = CLUE_RE.exec(line);
      if (clueMatch) {
        clue = clueMatch[1].trim();
        continue;
      }
      if (DEMO_RE.test(line)) section = "demo";
      else continue;
    }

    if (LIST_RE.test(line)) {
      section = "list";
      continue;
    }

    if (section === "demo") {
      const demoMatch = demoProblem ? null : DEMO_PROBLEM_RE.exec(line);
      if (demoMatch) demoProblem = toProblem(demoMatch[1], demoMatch[2], demoMatch[3], undefined, demoMatch[4]);
      demo.push(line);
      continue;
    }

    const problemMatch = PROBLEM_RE.exec(line);
    if (problemMatch) {
      flush();
      const [, problemName, source, url, tag, note] = problemMatch;
      current = { problem: toProblem(problemName, source, url, tag, note), body: [] };
      continue;
    }

    const text = line.trim();
    if (!text) continue;
    /* তালিকার পরে `---` — তার নিচে পরিশিষ্ট বা রুটিন, প্যাটার্নের অংশ নয় */
    if (text === "---") break;

    /* প্রবলেমের Statement আর উদাহরণ indent করা থাকে; বাকি সব লাইন প্রবলেম শেষ করে */
    if (current && /^\s/.test(line)) {
      if (NOTE_LINE_RE.test(text)) continue;
      /* markdown-এ প্রতিটা লাইন আলাদা থাকুক — Statement আর উদাহরণ গুলিয়ে না যায় */
      current.body.push(`${text.replace(/^→\s*/, "")}  `);
      continue;
    }

    flush();
    /* `- _Sliding Window Maximum → দেখুন **4.4**_` — অন্য প্যাটার্নের দিকে ইশারা */
    if (/^-\s+/.test(text)) seeAlso.push(text.replace(/^-\s+/, "").replace(/\\\*/g, "*"));
  }
  flush();

  const topicNum = Number(id.split(".")[0]);
  if (!id) throw new Error(`patterns/${file}: \`### N.N নাম\` heading নেই`);

  return {
    id,
    slug,
    name,
    topicNum,
    topicName: topics.get(topicNum) ?? `টপিক ${topicNum}`,
    clue,
    demo: demo.join("\n").trim(),
    demoProblem,
    problems,
    seeAlso,
  };
}

let cache: Pattern[] | null = null;

export function getPatterns(): Pattern[] {
  if (cache) return cache;
  const topics = parseTopics();

  cache = fs
    .readdirSync(PATTERNS_DIR)
    .map((file) => ({ file, match: FILE_RE.exec(file) }))
    .filter((item): item is { file: string; match: RegExpExecArray } => item.match !== null)
    .sort((a, b) => Number(a.match[1]) - Number(b.match[1]) || Number(a.match[2]) - Number(b.match[2]))
    .map(({ file, match }) => parsePattern(file, match[3], topics));
  return cache;
}

export function getPattern(slug: string): Pattern | undefined {
  return getPatterns().find((pattern) => pattern.slug === slug);
}

/** টপিক → প্যাটার্ন, সূচির পাতার জন্য */
export function getTopics(): { num: number; name: string; patterns: Pattern[] }[] {
  const byTopic = new Map<number, { num: number; name: string; patterns: Pattern[] }>();
  for (const pattern of getPatterns()) {
    const topic = byTopic.get(pattern.topicNum) ?? { num: pattern.topicNum, name: pattern.topicName, patterns: [] };
    topic.patterns.push(pattern);
    byTopic.set(pattern.topicNum, topic);
  }
  return [...byTopic.values()];
}

/**
 * প্রবলেম → প্যাটার্ন। একই প্রবলেম দুই প্যাটার্নে থাকলে প্রথমটা (workbook-এর
 * duplicate নিয়ম: এক জায়গায় পুরো এন্ট্রি)।
 */
export function findProblem(key: string): ProblemRef | undefined {
  for (const pattern of getPatterns()) {
    const problem = [...pattern.problems, ...(pattern.demoProblem ? [pattern.demoProblem] : [])].find(
      (item) => item.key === key,
    );
    if (problem) {
      return {
        key: problem.key,
        lc: problem.lc,
        name: problem.name,
        url: problem.url,
        source: problem.source,
        patternId: pattern.id,
        patternSlug: pattern.slug,
        patternName: pattern.name,
      };
    }
  }
  return undefined;
}

export function problemKeyFor(lc: number | null, name: string): string {
  return problemKey(lc, name);
}
