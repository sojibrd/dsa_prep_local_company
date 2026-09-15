# dsa_prep_*_company — Agent Instructions

DSA-র দিনভিত্তিক তিন সাইটের একটা (`dsa_prep_local_company` · `_remote_company` · `_global_company`)। অবসরপ্রাপ্ত `dsa_prep` workbook থেকে তিনটা কেন্দ্রীভূত পথ (`brainstorming/dsa-prep-how-many-paths.md`) — দিনভিত্তিক plan, `learning_to_learn`-এর নীতি, `switch_local_company_in_6_month`-এর গড়ন। এই ফাইল তিন repo-তে হুবহু এক।

- **তিনটা পথই স্বাধীন** (ব্যবহারকারীর সিদ্ধান্ত ২০২৬-০৯-১৫) — প্রতিটা শূন্য থেকে শেখায়, আগের পথ শেষ করা শর্ত নয়। প্রবলেমের তালিকা কেন্দ্রীভূত (লোকালের ৩০ ⊂ রিমোটের ৫০ ⊂ গ্লোবালের ১১০), কিন্তু উপরের সাইটের দিন নিচের সাইট জানা আছে ধরে লেখা যাবে না।
- **লোকাল** ৪০ দিন, টপিক ১–৫-এর ৩০টা, বাংলা ক্লু (= ৬ মাসের লোকাল plan-এর দিন ০০৮–০৪৭-এর ৩০′ ঘর) · **রিমোট** ৭০ দিন (= রিমোট plan-এর দিন ০০৮–০৭৭), ৫০টা (লোকালের ৩০টা শূন্য থেকে + নতুন ২০), প্রথম দিন থেকে ঘড়ি আর ইংরেজি · **গ্লোবাল** ১৬৮ দিন (= গ্লোবাল plan-এর দিন ০০৮–১৭৫), ১১০টা (রিমোটের ৫০টা শূন্য থেকে + নতুন ৬০), interview-এর পাঁচ ধাপ, সব ১০ টপিক, mock।
- তিন সাইটেই দিন = ৩০′ DSA + ১৫′ ইংরেজি, সোম–শুক্র একটা প্রবলেম, শনি ১৫′, রবি ১০′। রিমোট/গ্লোবালে প্রতি চতুর্থ শনিবার ⚑ ৬০′ মহড়া/mock।
- **তিন repo-র কোড হুবহু এক** — পার্থক্য শুধু `app/lib/site.ts` (নাম, `ldsa`/`rdsa`/`gdsa` prefix, শুরুর প্রস্তাব, Must-do), `next.config.ts`-এর basePath, আর `docs/` + `patterns/`। কোড বদলালে তিনটাতেই একই বদল।
- ফাইলে **তারিখ নেই**, শুধু `### দিন ০০৭ · শিরোনাম` — শুরুর তারিখ ব্যবহারকারী সাইটে বসান (`<prefix>:v1:start`), দিন গোনা কোডে (`lib/dates.ts`)। "আজ" = ক্যালেন্ডারের তারিখ, plan পেছায় না।
- কাজে `(LC 15 · ১.১ …)` = প্রবলেম + প্যাটার্ন; `(LC 49)` = মিশ্র, প্যাটার্নের লিংক টিকের পরে। প্রবলেম `patterns/`-এ (তালিকা বা demo) না মিললে **build ভাঙে** — ইচ্ছাকৃত।
- `patterns/<t>.<n>-<slug>.md` — লোকালে `dsa_prep`-এর বাংলা ফাইল হুবহু; ইংরেজি মূল কপি `dsa_prep_global_company/patterns/` (টপিক ৬ Heaps নতুন লেখা), রিমোটেরটা তার অংশ — বদল আগে গ্লোবালে, তারপর রিমোটে কপি।
- 🧠 নাম → `app/lib/principles.ts`-এ `learning_to_learn`-এর পাঁচ ডকের **সব** বিষয় আছে; নতুন নাম লিখলে তিন repo-তেই যোগ।
- Progress পাঁচ key (`start`, `task`, `check`, `review`, `note`) — একমাত্র `app/hooks/useProgress.ts` দিয়ে। `app/lib/plan.ts` ও `app/lib/patterns.ts` server-only।
- **Theme contract অলঙ্ঘনীয়**, সাইট **dark-only**। plan-এর তথ্য বদলালে ক্রম: `brainstorming/ASSUMPTIONS.md` → `brainstorming/` → ৬ মাসের plan → এই ফোল্ডারগুলো।

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
