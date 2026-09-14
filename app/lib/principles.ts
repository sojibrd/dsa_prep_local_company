import { slugify } from "./slug";

/**
 * plan-এর 🧠 (…) বন্ধনীর নাম → `learning_to_learn`-এর বিষয়।
 *
 * পাঁচটা ডকের (Principle · Lies · Pillars · Science · Techniques) **সব** বিষয় আছে —
 * DSA-র প্রস্তুতিতে কোনটা কোথায় খাটে, এক লাইনে। ঐ সাইটের ডক থেকে হাতে তোলা,
 * build-এর সময় পড়া নয় — CI-তে শুধু এই repo থাকে। পুরো ব্যাখ্যার লিংক ঐ সাইটের
 * topic anchor-এ নামে।
 *
 * plan-এ নতুন নাম লিখলে এখানে না থাকলে সাইট ভাঙে না — chip দেখায়, ব্যাখ্যা দেখায় না।
 */
export type Principle = {
  /** `learning_to_learn/docs/0n-<doc>.md` → route `/<doc>/` */
  doc: "principle" | "lies" | "pillars" | "science" | "techniques";
  /** ঐ ডকে বুলেটের **নাম** হুবহু — anchor এটা থেকেই */
  topic: string;
  /** DSA-র প্রস্তুতিতে কেন — এক লাইনে */
  line: string;
};

const L2L_SITE = "https://sojibrd.github.io/learning_to_learn";

const ENTRIES: [names: string[], principle: Principle][] = [
  /* --- Principle --------------------------------------------------------- */
  [
    ["Learning vs Winning"],
    {
      doc: "principle",
      topic: "Learning vs Winning",
      line: "জেতার লক্ষ্যে মানুষ সহজ প্রবলেম বাছে। শেখার লক্ষ্যে সীমার একটু বাইরেরটা — আটকালেও কিছু পাওয়া যায়।",
    },
  ],
  [
    ["What is success?"],
    {
      doc: "principle",
      topic: "What is success?",
      line: "এই পথে সফলতা = নিজের লেখা হর পূরণ, অন্যের LeetCode সংখ্যা নয়।",
    },
  ],
  [
    ["The obstacle"],
    {
      doc: "principle",
      topic: "The obstacle",
      line: "যে প্রবলেমে আটকাচ্ছেন, শেখার জিনিসটা ঠিক ওখানেই — এড়ালে শেখাটাও এড়ানো হয়।",
    },
  ],
  [
    ["The dip"],
    {
      doc: "principle",
      topic: "The dip",
      line: "শুরুর উৎসাহ শেষ, দক্ষতা এখনো আসেনি — বেশিরভাগ মানুষ এখানেই ছাড়ে। প্রশ্ন একটাই: dip, নাকি সত্যিই ভুল পথ?",
    },
  ],
  [
    ["Compound learning"],
    {
      doc: "principle",
      topic: "Compound learning",
      line: "দিনে একটা প্রবলেম চক্রবৃদ্ধির মতো জমে — শনিবারে চার ঘণ্টায় যা হয় না, রোজ ৩০ মিনিটে তা হয়।",
    },
  ],
  [
    ["Failures don't count"],
    {
      doc: "principle",
      topic: "Failures don't count",
      line: "না পারা প্রবলেম ক্ষতি নয়, যদি \"যে সমস্যা হয়েছিল\" ঘরে এক লাইন লেখা হয়।",
    },
  ],
  [
    ["Choice vs Chore"],
    {
      doc: "principle",
      topic: "Choice vs Chore",
      line: "\"আজ DSA করতে হবে\" নয়, \"আজ এই একটা ফাঁক বন্ধ করছি\" — কাজ একই, শক্তি আলাদা।",
    },
  ],
  [
    ["It's all in the frame"],
    {
      doc: "principle",
      topic: "It's all in the frame",
      line: "\"আমি DSA-তে দুর্বল\" নয়, \"আমি এখনো ___ প্যাটার্নে\" — দ্বিতীয় ফ্রেমে পরের ধাপটা দেখা যায়।",
    },
  ],
  [
    ["Pareto", "Pareto principle"],
    {
      doc: "principle",
      topic: "Pareto principle",
      line: "৮০% ফল আসে ২০% কাজ থেকে — এই পথের জন্য যে প্যাটার্নগুলো লাগে শুধু সেগুলো।",
    },
  ],
  [
    ["Skill stacking"],
    {
      doc: "principle",
      topic: "Skill stacking",
      line: "DSA একা নয় — DSA + ইংরেজিতে ব্যাখ্যা + নিজের প্রজেক্ট একসাথে যে জায়গা বানায়, তা বিরল।",
    },
  ],
  [
    ["Happiness factors"],
    {
      doc: "principle",
      topic: "Happiness factors",
      line: "ঘুম, স্বাস্থ্য, পরিবার বাদ দিয়ে বেশি প্রবলেম — এটা জেতা নয়।",
    },
  ],
  [
    ["Productivity time", "Your productivity time"],
    {
      doc: "principle",
      topic: "Your productivity time",
      line: "দিনের যে সময়ে মাথা সবচেয়ে ভালো চলে, নতুন প্রবলেম তখন; ঝালাই আর নোট বাকি সময়ে।",
    },
  ],
  [
    ["Self learning paradigm"],
    {
      doc: "principle",
      topic: "Self learning paradigm",
      line: "কোর্স নয় — প্রবলেম, ক্লু, আটকানো আর নিজে বের হওয়া; এই ক্ষমতাটাই পরের পথে যায়।",
    },
  ],

  /* --- Lies -------------------------------------------------------------- */
  [
    ["Follow your passion"],
    {
      doc: "lies",
      topic: "Follow your passion",
      line: "DSA ভালো লাগার অপেক্ষা নয় — কয়েকটা প্রবলেমে হাত চলতে শুরু করলে ভালো লাগা আসে।",
    },
  ],
  [
    ["You can avoid risk"],
    {
      doc: "lies",
      topic: "You can avoid risk",
      line: "\"প্রস্তুত হয়ে তারপর interview\" ঝুঁকি এড়ায় না — সময় হারানোর ঝুঁকিটা নেয়।",
    },
  ],
  [
    ["Trust this one person"],
    {
      doc: "lies",
      topic: "Trust this one person",
      line: "একটা YouTuber-এর তালিকা নয় — কয়েকটা উৎস, আর নিজের বাজারে যাচাই।",
    },
  ],
  [
    ["10,000 hours rule"],
    {
      doc: "lies",
      topic: "10,000 hours rule",
      line: "ঘণ্টা বা প্রবলেমের সংখ্যা দক্ষতা বানায় না, deliberate practice বানায় — ভুল পদ্ধতিতে বেশি মানে শুধু ভুল অভ্যাস পাকা।",
    },
  ],

  /* --- Pillars ----------------------------------------------------------- */
  [
    ["Everything is a game"],
    {
      doc: "pillars",
      topic: "Everything is a game",
      line: "DSA রাউন্ডেরও নিয়ম আছে — জোরে ভাবা, আগে brute force, তারপর উন্নতি। নিয়ম জেনে খেলুন।",
    },
  ],
  [
    ["Feynman", "Feynman technique"],
    {
      doc: "pillars",
      topic: "Feynman technique",
      line: "approach-টা বাচ্চাকে বোঝানোর মতো ৩ লাইনে লিখুন; যেখানে আটকান সেটাই ফাঁক।",
    },
  ],
  [
    ["Trunk based knowledge"],
    {
      doc: "pillars",
      topic: "Trunk based knowledge",
      line: "প্রবলেম পাতা, প্যাটার্ন কাণ্ড — প্যাটার্ন শক্ত থাকলে অচেনা প্রবলেমও চেনা লাগে।",
    },
  ],
  [
    ["Efficiency trumps grit"],
    {
      doc: "pillars",
      topic: "Efficiency trumps grit",
      line: "দুই ঘণ্টা আটকে থাকা বীরত্ব নয় — ২০ মিনিটে demo, তারপর বন্ধ করে নিজে।",
    },
  ],

  /* --- Science ----------------------------------------------------------- */
  [
    ["Focus vs Diffuse", "Focus vs Diffuse mode"],
    {
      doc: "science",
      topic: "Focus vs Diffuse mode",
      line: "১০ মিনিট আটকালে উঠে হাঁটুন — নতুন সংযোগ জোড়া লাগে diffuse মোডে।",
    },
  ],
  [
    ["Sleep", "The science of sleep"],
    {
      doc: "science",
      topic: "The science of sleep",
      line: "আজকের প্রবলেম ঘুমের মধ্যে স্মৃতিতে বসে — রাত জেগে আরেকটা নয়।",
    },
  ],
  [
    ["Brain training"],
    {
      doc: "science",
      topic: "Brain training",
      line: "puzzle অ্যাপ নয় — interview-এর দক্ষতা বাড়ে interview-এর মতো প্রবলেমেই।",
    },
  ],
  [
    ["Feedback", "The science of feedback"],
    {
      doc: "science",
      topic: "The science of feedback",
      line: "সাথে সাথে চালিয়ে দেখা আর \"যে সমস্যা হয়েছিল\" এক লাইন — দ্রুত, নির্দিষ্ট feedback।",
    },
  ],
  [
    ["Procrastination"],
    {
      doc: "science",
      topic: "Procrastination",
      line: "অস্বস্তিটা শুরুর আগেই — শুধু প্রবলেমটা খুলে প্রথম লাইন লিখুন, বাকিটা আসে।",
    },
  ],
  [
    ["Long and short memory"],
    {
      doc: "science",
      topic: "Long and short memory",
      line: "মাথা একবারে ~৪টা জিনিস ধরে — দিনে একটা প্রবলেম, পাতায় শুধু আজ।",
    },
  ],
  [
    ["Active learning", "Active vs Passive learning"],
    {
      doc: "science",
      topic: "Active vs Passive learning",
      line: "সমাধান পড়া চেনা লাগায়; নিজে লেখা আর না দেখে মনে করা শেখায়।",
    },
  ],
  [
    ["Motivation", "The science of motivation"],
    {
      doc: "science",
      topic: "The science of motivation",
      line: "ইচ্ছা আসে প্রথম ৫ মিনিটের পরে — আগে বসুন।",
    },
  ],
  [
    ["Goals"],
    {
      doc: "science",
      topic: "Goals",
      line: "\"DSA-তে ভালো হব\" লক্ষ্য নয় — \"৪০ দিনে ৩০টা, প্রতিটা ঝালাইসহ\" লক্ষ্য।",
    },
  ],
  [
    ["It pays to be not busy"],
    {
      doc: "science",
      topic: "It pays to be not busy",
      line: "সপ্তাহে ফাঁকা দিন রাখা — diffuse মোড কাজ করে ফাঁকা সময়েই।",
    },
  ],
  [
    ["Chunking"],
    {
      doc: "science",
      topic: "Chunking",
      line: "\"sorted + জোড়া খোঁজা → two pointer\" — ছড়ানো প্রবলেম এক গুচ্ছে বাঁধলে মনে থাকে।",
    },
  ],
  [
    ["Deliberate practice"],
    {
      doc: "science",
      topic: "Deliberate practice",
      line: "যা পারেন তার পুনরাবৃত্তি নয় — যা পারেন না ঠিক তার ওপর, সীমার একটু বাইরে, সাথে feedback।",
    },
  ],
  [
    ["Spaced repetition"],
    {
      doc: "science",
      topic: "Spaced repetition",
      line: "একবারে দশবার নয় — ভুলে যাওয়ার ঠিক আগে আবার না দেখে লিখলে স্মৃতি সবচেয়ে শক্ত হয়।",
    },
  ],
  [
    ["Energy saving with habits"],
    {
      doc: "science",
      topic: "Energy saving with habits",
      line: "\"আজ কোনটা করব\" plan আগেই ঠিক করে রেখেছে — ভাবার শক্তিটা প্রবলেমে যায়।",
    },
  ],
  [
    ["Be adventurous"],
    {
      doc: "science",
      topic: "Be adventurous",
      line: "চেনা ভাষার বাইরে একবার সমাধান লেখা, বা অচেনা প্যাটার্নে হাত — নতুনত্ব মাথা সজাগ রাখে।",
    },
  ],
  [
    ["Have an endpoint"],
    {
      doc: "science",
      topic: "Have an endpoint",
      line: "বসার আগে শেষ সময় ঠিক — ৩০′ টাইমার থাকলে তার আগের মিনিটগুলো বেশি কাজ করে।",
    },
  ],
  [
    ["Be bored"],
    {
      doc: "science",
      topic: "Be bored",
      line: "রিকশায় ফোন না খুলে আজকের প্রবলেমটা মাথায় ঘোরান — উত্তর প্রায়ই তখনই আসে।",
    },
  ],

  /* --- Techniques -------------------------------------------------------- */
  [
    ["Pomodoro", "Pomodoro technique"],
    {
      doc: "techniques",
      topic: "Pomodoro technique",
      line: "\"মাত্র ২৫ মিনিট\" — শুরু সহজ হয়; বিরতিতে ফোন নয়।",
    },
  ],
  [
    ["Chunk the subject"],
    {
      doc: "techniques",
      topic: "Chunk the subject",
      line: "\"DSA শিখব\" নয় — \"আজ শুধু sliding window ছোট হওয়ার শর্ত\"।",
    },
  ],
  [
    ["Spaced repetition revisited"],
    {
      doc: "techniques",
      topic: "Spaced repetition revisited",
      line: "১, ৩, ৭, ২১ দিন — হিসাবটা সাইট রাখে, আপনি শুধু না দেখে লেখেন।",
    },
  ],
  [
    ["Deliberate practice revisited"],
    {
      doc: "techniques",
      topic: "Deliberate practice revisited",
      line: "বসার আগে এক লাইন: \"আজ কোন দুর্বলতায় কাজ\" — লক্ষ্যহীন অনুশীলন শুধু সময় খরচ।",
    },
  ],
  [
    ["Create a roadmap"],
    {
      doc: "techniques",
      topic: "Create a roadmap",
      line: "কোন দিনে কোন প্রবলেম আগেই লেখা — প্রতিদিন \"আজ কী\" ভাবতে হয় না।",
    },
  ],
  [
    ["Interleaving"],
    {
      doc: "techniques",
      topic: "Interleaving",
      line: "টপিক মিশিয়ে — interview-তে কেউ বলে দেয় না কোন প্যাটার্ন; চেনাটাই অনুশীলন।",
    },
  ],
  [
    ["Einstellung"],
    {
      doc: "techniques",
      topic: "Einstellung",
      line: "সমাধানের পরে এক মিনিট: আরেকভাবে হয়? প্রথম চেনা পদ্ধতিটাই প্রায়ই ভালোটা আড়াল করে।",
    },
  ],
  [
    ["Community", "Importance of community"],
    {
      doc: "techniques",
      topic: "Importance of community",
      line: "একজন সঙ্গী যে জানে আপনি কোন দিনে আছেন — প্রশ্ন আর জবাবদিহি দুটোই গতি বাড়ায়।",
    },
  ],
  [
    ["Habits revisited"],
    {
      doc: "techniques",
      topic: "Habits revisited",
      line: "সংকেত → কাজ → পুরস্কার: \"___ করার পরেই ল্যাপটপ খুলে আজকের প্রবলেম\"।",
    },
  ],
  [
    ["System vs goal"],
    {
      doc: "techniques",
      topic: "System vs goal",
      line: "\"৩০টা\" লক্ষ্য, \"সোম–শুক্র দিনে একটা\" সিস্টেম — পৌঁছে দেয় সিস্টেম।",
    },
  ],
  [
    ["The power of senses"],
    {
      doc: "techniques",
      topic: "The power of senses",
      line: "কাগজে pointer আঁকা, approach জোরে বলা — প্রতিটা ইন্দ্রিয় স্মৃতির আলাদা পথ।",
    },
  ],
  [
    ["Method of loci"],
    {
      doc: "techniques",
      topic: "Method of loci",
      line: "প্যাটার্নগুলো ঘরের একেকটা কোণে বসান — মনে মনে হেঁটে এসে সবগুলো ফিরিয়ে আনুন।",
    },
  ],
  [
    ["Pareto principle revisited"],
    {
      doc: "techniques",
      topic: "Pareto principle revisited",
      line: "পুরো workbook নয় — এই পথের ২০%, বাকিটা দরকার হলে তখন।",
    },
  ],
  [
    ["Parkinson's law"],
    {
      doc: "techniques",
      topic: "Parkinson's law",
      line: "প্রবলেম যত সময় পায় ততটাই নেয় — টাইমারটাই সীমা।",
    },
  ],
  [
    ["Deep work", "Exercise deep work"],
    {
      doc: "techniques",
      topic: "Exercise deep work",
      line: "notification বন্ধ, ফোন অন্য ঘরে — ৩০ মিনিট টানা, ভাঙা ভাঙা নয়।",
    },
  ],
  [
    ["Stakes & Rewards"],
    {
      doc: "techniques",
      topic: "Stakes & Rewards",
      line: "কাউকে তারিখটা বলে রাখা, বা থামার দিনে ছোট একটা পুরস্কার — কিছু বাজি থাকলে কাজটা হয়।",
    },
  ],
  [
    ["Concepts vs Facts"],
    {
      doc: "techniques",
      topic: "Concepts vs Facts",
      line: "কোডের লাইন fact, \"কেন ছোট দিকের pointer সরাই\" concept — মনে রাখুন concept।",
    },
  ],
  [
    ["Test yourself"],
    {
      doc: "techniques",
      topic: "Test yourself",
      line: "demo বন্ধ রেখে লেখার চেষ্টাই শেখা — যেখানে আটকান, সেটাই দেখায় ফাঁক কোথায়।",
    },
  ],
  [
    ["The first 20 hours", "Exercise: the first 20 hours"],
    {
      doc: "techniques",
      topic: "Exercise: the first 20 hours",
      line: "প্রথম কয়েকটা প্রবলেমের বিচ্ছিরি অনুভূতিটা স্বাভাবিক — ছোট করে, শুরুতেই হাত লাগান।",
    },
  ],
];

const PRINCIPLES = new Map<string, Principle>(
  ENTRIES.flatMap(([names, principle]) => names.map((name) => [name.toLowerCase(), principle] as const)),
);

export function findPrinciple(name: string): Principle | undefined {
  return PRINCIPLES.get(name.trim().toLowerCase());
}

export function principleHref(principle: Principle): string {
  return `${L2L_SITE}/${principle.doc}/#${slugify(principle.topic)}`;
}
