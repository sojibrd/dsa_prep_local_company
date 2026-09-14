/**
 * সাইটের পরিচয় আর এই পথের সেটিং — plan-এর কনটেন্ট নয়, তাই `docs/`-এ নয়, এখানে।
 *
 * তিনটা পথের (লোকাল · রিমোট · গ্লোবাল) কোড একই; পার্থক্য শুধু এই ফাইল,
 * `next.config.ts`-এর basePath আর `docs/` + `patterns/`-এর কনটেন্ট।
 */
export const SITE = {
  title: "লোকাল কোম্পানির DSA",
  short: "লোকাল DSA",
  emoji: "🧩",
  description:
    "বাংলাদেশি কোম্পানির DSA রাউন্ডের জন্য টপিক ১–৫ থেকে ৩০টা প্রবলেম — দিনে একটা, ঝালাইসহ, learning to learn-এর নীতিতে।",
  /** localStorage key-এর prefix — তিন পথের progress আলাদা থাকে */
  storagePrefix: "ldsa",
  /** শুরুর তারিখ না থাকলে প্রস্তাব — ৬ মাসের plan-এর দিন ০০৮ */
  suggestedStart: "2026-09-21",
  /** 🔥 Must-do ট্যাগ FAANG-এর frequency থেকে — শুধু গ্লোবাল পথে দেখায় */
  showMustDo: false,
  noteLabels: {
    solution: "আমার সমাধান — মূল আইডিয়া ২–৩ লাইনে, ইংরেজিতে",
    stuck: "যে সমস্যা হয়েছিল — কোন trap বা edge case-এ আটকালেন",
  },
} as const;
