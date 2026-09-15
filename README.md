# dsa_prep_local_company

বাংলাদেশি কোম্পানির DSA রাউন্ডের প্রস্তুতি: `dsa_prep` workbook-এর টপিক ১–৫ থেকে ৩০টা প্রবলেম, ৪০ দিনে। দিনে একটা করে, ঝালাইসহ, শেখার বিজ্ঞান মেনে। ৩০টা শেষ হলে থামা।

এটা তিনটা স্বাধীন পথের একটা — [রিমোট](https://sojibrd.github.io/dsa_prep_remote_company/) আর [গ্লোবাল](https://sojibrd.github.io/dsa_prep_global_company/) আলাদা সাইট, প্রতিটা শূন্য থেকে শুরু। প্রবলেমগুলো একটার ভেতরে আরেকটা (এই ৩০টা রিমোটের প্রথম ৩০টা), কিন্তু কোনো সাইট আরেকটার পরে চালাতে হয় না। `switch_local_company_in_6_month`-এর দিন ০০৮–০৪৭-এ ৩০′ DSA-র যে ঘর আছে, এই সাইট সেই ঘরের কাজ।

**লাইভ:** https://sojibrd.github.io/dsa_prep_local_company/

## Functional Requirement

- **আজ (`/`):** প্রথমবার খুললে শুরুর তারিখ জিজ্ঞেস করে। তারপর দেখায় ক্যালেন্ডারের আজকের দিনটা, এই ক্রমে: জমে থাকা ⚑ → আজকের ঝালাই → আজকের দিন।
- **Rail:** সব পাতায় বাঁয়ে rail থাকে, মোবাইলে drawer। তাতে ৪টা পাতার লিংক, plan-এর gauge আর ৩টা ব্লক। শুধু খোলা ব্লকের দিনগুলো দেখায়।
- **দিন (`/day/<nnn>/`) · ব্লক (`/block/<slug>/`):** দিনের কাজ আর দিন বা ব্লক শেষের হ্যাঁ/না।
- **প্রবলেমের কাজ:** LeetCode-এর লিংক, প্যাটার্নের পাতা আর দুই ঘরের নোট (আমার সমাধান · যে সমস্যা হয়েছিল)। মিশ্র দিনে প্যাটার্নের লিংক আসে টিক দেওয়ার পরে।
- **প্যাটার্ন (`/patterns/`, `/pattern/<slug>/`):** উপরে ক্লু, তার নিচে demo ভাঁজ করা, তারপর প্রবলেম। plan-এ যে প্রবলেম আছে, তার পাশে সেই দিনের লিংক।
- **ঝালাই (`/review/`):** প্রতিটা 🔁 কাজ টিকের দিন থেকে ১/৩/৭/২১ দিন পরে ফেরে।
- **নিয়ম (`/rules/`):** `docs/00-rules.md` হুবহু।
- **🧠 chip:** `learning_to_learn`-এর পাঁচটা ডকের সব বিষয় আছে। chip চাপলে এক লাইনে কারণ দেখায়, সাথে ঐ সাইটের লিংক।

## Non-Functional Requirement

- **সত্যের উৎস `docs/` আর `patterns/`।** কোডে কোনো দিন, কাজ বা প্রবলেম হার্ডকোড নেই। কাজের `(LC n · x.y)` যদি `patterns/`-এ না মেলে, **build ভাঙে।**
- **ফাইলে তারিখ নেই।** তারিখ = শুরুর তারিখ + (দিন − ১)। "আজ" মানে ক্যালেন্ডারের তারিখ, plan পেছায় না।
- **Static export → GitHub Pages।** Backend নেই।
- **Progress শুধু `localStorage`-এ,** একমাত্র `app/hooks/useProgress.ts` দিয়ে।
- **`app/lib/plan.ts` আর `app/lib/patterns.ts` server-only।**
- **Theme contract অলঙ্ঘনীয়, সাইট dark-only।** গড়ন `switch_local_company_in_6_month`-এর মতো।
- **তিন পথের কোড একই।** পার্থক্য শুধু `app/lib/site.ts`, `next.config.ts`-এর basePath আর কনটেন্টে।
- **স্ট্যাক:** Next.js 16, React 19, TypeScript, Tailwind v4, react-markdown।

## ডক ইনডেক্স

| ফাইল | Gist |
|---|---|
| [docs/00-rules.md](docs/00-rules.md) | লক্ষ্য (৩০টা, তারপর থামা), সত্যের উৎস, চিহ্ন, "আজ", সপ্তাহের ছন্দ, DSA-র ৩০′-এর বসা, ঝালাই, প্যাটার্নের পাতা, `learning_to_learn`-এর পাঁচ ডক কোথায় খাটে, যা উপেক্ষা করবেন, যা করবেন না, দিন ৪০-এর পরে |
| [docs/01-foundation.md](docs/01-foundation.md) | দিন ০০১–০১৪: Hashing, Two Pointers, Sliding Window, Binary Search — ১০টা, প্যাটার্ন লেখা |
| [docs/02-lists-stacks-trees.md](docs/02-lists-stacks-trees.md) | দিন ০১৫–০২৮: rotated array, answer-এ binary search, linked list, stack, tree — ২০টায় ভিত্তি শেষ; Method of loci |
| [docs/03-mixed.md](docs/03-mixed.md) | দিন ০২৯–০৪০: মিশ্র ১০টা, প্যাটার্ন লেখা নেই; দিন ০৪০-এ থামা |
| [patterns/](patterns/) | `dsa_prep` workbook-এর টপিক ১–৫-এর ২৩টা প্যাটার্ন ফাইল, হুবহু; `topics.md`-এ টপিকের নাম |
| [docs/plans/](docs/plans/) | architect সেশনের প্ল্যান — scanner ছোঁয় না |

## প্রজেক্ট-নির্দিষ্ট নিয়ম

### তথ্য বদলানোর ক্রম

`brainstorming/ASSUMPTIONS.md` → `brainstorming/` (`dsa-prep-*.md`, `how-to-prepare-for-dsa.md`) → `switch_local_company_in_6_month/docs/` → এই ফোল্ডার।

### ব্লক ফাইলের ছাঁচ

- `# ব্লক ১ — নাম` — প্রথম H1। "— "-এর পরের অংশ rail-এ দেখায়।
- `*দিন ০০১–০১৪ · …*` — H1-এর নিচের italic লাইন। শেষে `· dip` থাকলে হোমে সতর্কতা আসে।
- `> **ব্লক শেষে:** …` · `### দিন ০০৭ · শিরোনাম` · `- [ ] ৩০′ …` · `> **দিন শেষে:** …`
- দিনের নম্বর সব ব্লক মিলিয়ে পরপর থাকতে হবে। না থাকলে build ভাঙে।
- কাজে `(LC 15 · ১.১ …)` = প্রবলেম + প্যাটার্ন। `(LC 49)` = মিশ্র, প্যাটার্ন টিকের পরে দেখায়। `(GfG · ১০.১)` = LeetCode-এর বাইরের প্রবলেম, নাম `**…**` থেকে মেলানো হয়।
- `⚑` = মাইলফলক, `🔁` = ঝালাই হবে, শেষে `🧠 (নাম · নাম)`। নতুন 🧠 নাম লিখলে সেটা `app/lib/principles.ts`-এ যোগ করুন।

### প্যাটার্ন ফাইলের ছাঁচ

`patterns/<টপিক>.<n>-<slug>.md` — `### 1.4 নাম`, `**চিনবেন কীভাবে:**`, `**Demo: …**` … `**প্রবলেম লিস্ট:**`, `- [ ] **নাম** — [LC n](url) — 🔥 Must-do|⚪ Bonus`। নিচের `→ আমার সমাধান:` আর `→ যে সমস্যা হয়েছিল:` লাইন বাদ পড়ে, কারণ নোট সাইটে লেখা হয়।

### Progress key

| key | মান |
|---|---|
| `ldsa:v1:start` | শুরুর তারিখ `"YYYY-MM-DD"` |
| `ldsa:v1:task` | কাজ শেষের তারিখ। id = দিন + কাজের **লেখা** থেকে hash |
| `ldsa:v1:check` | দিন শেষ (`d007`) ও ব্লক শেষ (`b1`)-এর হ্যাঁ/না |
| `ldsa:v1:review` | 🔁 ঝালাইয়ের অবস্থা `{ base, step }` |
| `ldsa:v1:note` | প্রবলেমের নোট `{ lc15: { solution, stuck } }` — দিন আর প্যাটার্নের পাতা একই নোট দেখায় |

## চালানো

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

push করলে `.github/workflows/deploy.yml` সাইটটা GitHub Pages-এ তোলে।
