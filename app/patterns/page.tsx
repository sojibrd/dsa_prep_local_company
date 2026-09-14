import type { Metadata } from "next";
import Link from "next/link";
import { getTopics } from "../lib/patterns";
import { getProblemDays } from "../lib/plan";

export const metadata: Metadata = { title: "প্যাটার্ন" };

/**
 * এই পথের সব প্যাটার্ন, টপিক ধরে। রেফারেন্স — রোজ এখান থেকে শুরু নয়, শুরু
 * "আজ" থেকে। plan-এ কয়টা প্রবলেম আছে তা পাশে, যাতে বাকিগুলো যে জেনেশুনে বাদ, সেটা
 * চোখে পড়ে। 🧠 Pareto principle
 */
export default function PatternsPage() {
  const topics = getTopics();
  const problemDays = getProblemDays();

  return (
    <>
      <header className="flex flex-col gap-2">
        <h1 className="t-title text-2xl sm:text-3xl">প্যাটার্ন</h1>
        <p className="t-body measure text-sm">
          প্রতিটা প্যাটার্নে আগে &ldquo;চিনবেন কীভাবে&rdquo;, তারপর ভাঁজ করা demo, তারপর প্রবলেম। plan-এর বাইরের প্রবলেম
          অসম্পূর্ণ কাজ নয় — এই পথের জন্য দরকার নেই।
        </p>
      </header>

      {topics.map((topic) => (
        <section key={topic.num} className="surface-panel flex flex-col gap-3 p-4 sm:p-6">
          <h2 className="t-title text-base sm:text-lg">
            {topic.num} · {topic.name}
          </h2>
          <ul className="flex flex-col gap-1">
            {topic.patterns.map((pattern) => {
              const inPlan = pattern.problems.filter((problem) => problemDays[problem.key]).length;
              return (
                <li key={pattern.slug}>
                  <Link href={`/pattern/${pattern.slug}/`} className="row flex items-center gap-3 px-3 py-2 text-sm">
                    <span className="t-mono shrink-0 text-xs">{pattern.id}</span>
                    <span className="min-w-0 flex-1 truncate">{pattern.name}</span>
                    {inPlan > 0 && <span className="chip chip--accent shrink-0">plan-এ {inPlan}</span>}
                    <span className="chip shrink-0">{pattern.problems.length}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
