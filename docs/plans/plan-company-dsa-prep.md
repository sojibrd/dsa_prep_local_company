## Implementation Plan — `dsa_prep` ভেঙে তিনটা পথের প্রজেক্ট

*২০২৬-০৯-১৪ · architect সেশন থেকে*

### আমরা কী তৈরি করছি

`dsa_prep` (লোকাল ফোল্ডার + GitHub repo + লাইভ সাইট) মুছে তার জায়গায় তিনটা স্বতন্ত্র প্রজেক্ট — `local_company_dsa_prep`, `remote_company_dsa_prep`, `global_company_dsa_prep` — প্রতিটা নিজের ফোল্ডার, নিজের public repo, নিজের GitHub Pages সাইট। প্রতিটা `switch_local_company_in_6_month`-এর **পুরো গড়ন** মানে: `docs/`-এ দিনভিত্তিক plan, "আজ"-এর পাতা, rail + মোবাইলে drawer, `/day/`, `/block/`, `/review/` (🔁 ১/৩/৭/২১), `/rules/`, 🧠 নীতির chip, ⚑ মাইলফলক, Theme contract, dark-only। কনটেন্ট `brainstorming/dsa-prep-how-many-paths.md`-এর তিনটা পথ, আর প্রতিটা কাজ `learning_to_learn`-এর নীতি (principle, lies, pillars, science, techniques) থেকে। পাশাপাশি `switch_local_company_in_6_month` থেকে প্রবলেমের তালিকা সরে গিয়ে শুধু ৩০′-এর DSA ঘর থাকবে।

### যে পরিভাষাগুলোতে আমরা সম্মত হয়েছি

* **`dsa_prep` delete:** লোকাল ফোল্ডার + GitHub repo (`gh repo delete`) + লাইভ সাইট। মোছার আগে ক্লু, JS demo, প্রবলেমের তালিকা নতুন তিন প্রজেক্টে কপি; simulation engine যায় না।
* **লোকাল / রিমোট / গ্লোবাল:** `dsa-prep-how-many-paths.md`-এর তিনটা কেন্দ্রীভূত পথ, শুধু বাজারের নাম নয়।
  * লোকাল — টপিক ১–৫, ২৩ প্যাটার্ন, ৩০ প্রবলেম, বাংলা ক্লু, ৩০′ নিজের ঘড়ি।
  * রিমোট — লোকাল + Graph BFS/DFS + ২–৩টা সহজ DP + Heaps, ~৫০, ইংরেজি বাধ্যতামূলক, কড়া টাইমার।
  * গ্লোবাল — সব ১০ টপিক, ৯১ + hard, ইংরেজিতে মুখে বলা, mock।
* **`learning_to_learn` মেনে চলা:** `switch_local_company_in_6_month`-এর মতো — কাজের শেষে `🧠 (নাম · নাম)`, 🔁 স্বয়ংক্রিয় ঝালাই, বসার নিয়মে interleaving/Feynman/deliberate practice; ব্যাখ্যা `app/lib/principles.ts`-এ, লিংক `learning_to_learn` সাইটে। কনটেন্ট কপি নয়।
* **design system:** চেহারা নয়, পুরো গড়ন (উপরে বর্ণিত)।
* **project:** আলাদা ফোল্ডার + আলাদা repo + আলাদা Pages সাইট + root `README.md` ও `AGENTS.md`-এ আলাদা সারি।

### নেওয়া সিদ্ধান্তসমূহ

* **১ · তারিখের উৎস:** ফাইলে শুধু দিনের নম্বর (`### দিন ০০৭ · শিরোনাম`), তারিখ নয়। শুরুর তারিখ ইউজার সাইটে একবার বসান (`localStorage`); "আজ" = শুরু + দিনের নম্বর। শুরুর তারিখ না থাকলে হোমে শুধু "কবে শুরু করবেন?"। লোকালের প্রস্তাবিত শুরু **২০২৬-০৯-২১** (= `switch_local_company_in_6_month`-এর দিন ০০৮)। *কারণ:* রিমোট/গ্লোবালের তারিখ কোথাও লেখা নেই, বানানো যাবে না; তিন প্রজেক্টে এক নিয়ম। `switch_local_company_in_6_month`-এর "দিন গোনা কোডে নয়" নিয়ম এখানে জেনেবুঝে ভাঙা।
* **২ · লোকালের ৩০টা প্রবলেমের মালিক:** শুধু `local_company_dsa_prep`। `switch_local_company_in_6_month`-এ প্রবলেমের নাম ও 🔁 সরে `- [ ] ৩০′ DSA — আজকের প্রবলেম local_company_dsa_prep-এ` হবে; `00-rules.md`-এর "DSA-র বসা" লোকাল প্রজেক্টের নিয়মে সরে এক লাইনের লিংক। *কারণ:* টিক ও ঝালাই এক জায়গায়। DSA শুরু ০৯-২১, তাই হারানোর মতো টিক নেই।
* **৩ · প্যাটার্নের কনটেন্ট:** প্রতিটা প্রজেক্টে নিজের পথের প্যাটার্ন কপি — `patterns/<nn>-<slug>.md`, সাইটে `/pattern/<slug>/`। demo ভাঁজ করা, "চেষ্টার পরে খুলুন"। রিমোট ও গ্লোবালে ক্লু ইংরেজিতে। বাদ: simulation, Export/Import, সামগ্রিক শতাংশ; 🔥 Must-do শুধু গ্লোবালে। *কারণ:* আলাদা repo-তে ভাগ করা ফোল্ডার সম্ভব নয়; কনটেন্ট প্রায় স্থির।
* **৪ · পথের পুনরাবৃত্তি:** উপরের পথ শুরু হয় নিচের পথের প্রবলেম দিয়ে — দিনে ২টা, ২০′ কড়া টাইমার, ইংরেজিতে ৩ লাইন, AI/demo বন্ধ, টপিক মিশিয়ে; না পারলে 🔁। তারপর নতুন প্রবলেম দিনে ১টা; সপ্তাহে একবার ৯০′-এ টানা ৩টা। গ্লোবাল একই ছাঁচে রিমোটের ~৫০ দিয়ে শুরু। *কারণ:* রিমোট শুরু হবে মাস পরে; পরীক্ষা ঘড়ি ও ভাষায়।
* **৫ · কনটেন্টের গভীরতা:** তিনটা পথই **এখন সম্পূর্ণ** — সব দিন, সব কাজ, 🧠 chip, Heaps, hard প্রবলেমের তালিকা, mock-এর দিন।
* **কাজের ক্রম:** নতুন তিনটা লাইভ → `switch_local_company_in_6_month` বদল → রেফারেন্স হালনাগাদ → **সবার শেষে** `dsa_prep` মোছা, মোছার ঠিক আগে আবার অনুমতি।
* **repo:** তিনটাই public।
* **Progress key:** `ldsa:v1:*`, `rdsa:v1:*`, `gdsa:v1:*` — `task` (শেষের তারিখ), `check`, `review` (`{ base, step }`), আর নতুন `start` (শুরুর তারিখ)। সব একমাত্র `app/hooks/useProgress.ts` দিয়ে।
* **অমিল:** `brainstorming/thought-map.md`-এ "মীমাংসিত — ২০২৬-০৯-১৪" — `dsa-prep-how-many-paths.md` ("তিনটা অ্যাপ লাগে না"), `dsa-prep-what-to-ignore-for-local.md` ("মুছবেন না"), `00-rules.md` ("নতুন repo — dip-এর ছদ্মবেশ") বনাম ইউজারের সিদ্ধান্ত।

### অনুমানসমূহ (Assumptions)

* **দিনের সংখ্যা আনুমানিক** — লোকাল ~৪০ দিন (সপ্তাহে ৫ প্রবলেম × ৬ সপ্তাহ, ০৯-২১ → ১০-৩০), রিমোট ~৪৫–৫০ দিন (৩০টা × দিনে ২ + ~২০ নতুন), গ্লোবাল ~১৫০ দিন (brainstorming-এর "+৪ মাস")। লেখার সময় চূড়ান্ত।
* সপ্তাহের ছন্দ `00-rules.md`-এর মতো — সোম–শুক্র প্রবলেম, শনি মিশ্র/টাইমড সেট, রবি সপ্তাহের হিসাব + ঝালাই।
* লোকালের ৩০টা প্রবলেম = `switch_local_company_in_6_month/docs/01-ignition.md` ও `02-stories.md`-এর বর্তমান তালিকা হুবহু, একই ক্রমে।
* নতুন কনটেন্ট (Heaps প্যাটার্ন, ইংরেজি ক্লু, রিমোটের ~২০ ও গ্লোবালের hard বাছাই, mock-এর দিন) সাধারণ DSA জ্ঞান থেকে লেখা; ফাইলে `dsa_prep` থেকে নেওয়া আর নতুন লেখা চিহ্নে আলাদা।
* ব্যক্তিগত তথ্য লাগে এমন জায়গায় (কখন বসবেন, কোন ভেটিং প্ল্যাটফর্ম, mock-এর সঙ্গী) "⏳ আপনার উত্তর বাকি"।
* GitHub-এ pin তালিকা (`how-many-projects-do-i-need.md`, `00-rules.md`: `dsa_prep`, `system_design`, `srdtube`) — কোনটা pin হবে, ইমপ্লিমেন্টেশনের সময় জিজ্ঞেস করা হবে।
* brainstorming-এর `dsa-prep-*.md` ফাইলগুলোর বিষয়বস্তু ঐতিহাসিক হিসাবে থাকবে; নাম বদলে লেখা নয় — শুধু thought-map-এ নোট।
* `soft_skill_learning/docs/plans/plan-dsa-prep-shell.md` পুরনো প্ল্যান — অক্ষত।

### যেভাবে এটি তৈরি করতে হবে

1. **ভিত তৈরি (লোকাল):** `switch_local_company_in_6_month`-এর `app/`, config, workflow কপি করে `local_company_dsa_prep` বানানো (create-next-app নয় — এই plan ফাইল ফোল্ডারে আছে, আর গড়ন হুবহু লাগবে)। `node_modules/next/dist/docs/` দেখে নেওয়া।
2. **parser বদল (`app/lib/plan.ts`):** দিনের heading থেকে তারিখ বাদ; `patterns/` স্ক্যান ও পার্স (নাম, ক্লু, approach, demo, complexity); কাজের লেখায় প্যাটার্ন-রেফারেন্স (`১.৪` ধরনের) থেকে লিংক।
3. **তারিখ-লজিক:** `useProgress`-এ `start` key; `app/lib/dates.ts`-এ শুরু + দিন → তারিখ; `TodayView` শুরুর তারিখ না থাকলে প্রশ্ন দেখায়; ঝালাই আগের মতো আসল টিকের তারিখ থেকে।
4. **নতুন পাতা:** `/pattern/[slug]/` — ক্লু আগে, demo ভাঁজ করা; rail-এ প্যাটার্নের তালিকা।
5. **লোকালের কনটেন্ট:** `docs/00-rules.md` (DSA-র বসা, ঝালাই, যা করবেন না — `switch_local_company_in_6_month` থেকে সরানো), ব্লক ফাইল, `patterns/`-এ টপিক ১–৫-এর ২৩টা প্যাটার্ন; `principles.ts`-এ দরকারি নাম।
6. **লোকাল build, README, `.github/workflows/deploy.yml`** → `gh repo create sojibrd/local_company_dsa_prep --public` → push → Pages চালু → লাইভ যাচাই।
7. **রিমোট:** লোকালের কোড কপি (key prefix `rdsa`), কনটেন্ট — ইংরেজি ক্লু, Heaps + Graph ভিত্তি + সহজ DP প্যাটার্ন, ব্লক ১ "আবার, ঘড়ি ধরে", তারপর নতুন ~২০, সাপ্তাহিক ৯০′ সেট → build → repo → deploy।
8. **গ্লোবাল:** একই (prefix `gdsa`), সব প্যাটার্ন ইংরেজিতে + 🔥 Must-do, রিমোটের ~৫০ ঘড়ি ধরে, বাকি টপিক, hard, mock → build → repo → deploy।
9. **`switch_local_company_in_6_month` বদল:** `01-ignition.md`, `02-stories.md`, `03-applications.md`-এ DSA কাজ → ৩০′ ঘর + লিংক; `00-rules.md`-এর DSA অংশ → লিংক; `dsa_prep` উল্লেখ (README, কম্পোনেন্টের মন্তব্য) হালনাগাদ → build → push।
10. **Workspace রেফারেন্স:** root `README.md` টেবিল (`dsa_prep` সারি সরিয়ে তিনটা), root `AGENTS.md` (প্রজেক্ট ৩ বদলে তিনটা, "`dsa_prep`-এর গড়ন" উল্লেখগুলো), `switch_company_in_24_month` কম্পোনেন্টের মন্তব্য, `legacy_and_wisdom/docs/stages/stage-01-switch.md`, `memory.md`; `brainstorming/thought-map.md`-এ অমিল ও ফাইল নোট।
11. **`dsa_prep` মোছা (শেষে, অনুমতি নিয়ে):** তিন সাইট লাইভ নিশ্চিত → অনুমতি → `gh repo delete sojibrd/dsa_prep` → লোকাল ফোল্ডার মোছা।
12. **reviews** skill দিয়ে যাচাই।
