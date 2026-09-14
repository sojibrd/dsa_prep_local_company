import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "../../components/Markdown";
import Pager from "../../components/Pager";
import ProblemNotes from "../../components/ProblemNotes";
import { ArrowUpRight } from "../../components/icons";
import { getPattern, getPatterns } from "../../lib/patterns";
import { getProblemDays } from "../../lib/plan";
import { SITE } from "../../lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPatterns().map((pattern) => ({ slug: pattern.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPattern(slug);
  return { title: pattern ? `${pattern.id} ${pattern.name}` : "প্যাটার্ন" };
}

/**
 * একটা প্যাটার্ন: ক্লু আগে, demo ভাঁজ করা, তারপর প্রবলেম।
 *
 * demo খোলা থাকলে চোখ চলে যায় — আর demo দেখে "বুঝেছি" মনে হওয়া আর নিজে লিখতে
 * পারা আলাদা জিনিস। তাই আগে ক্লু পড়ে নিজে চেষ্টা, আটকালে তবে খোলা।
 * 🧠 Test yourself · Active vs Passive learning
 */
export default async function PatternPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const patterns = getPatterns();
  const index = patterns.findIndex((pattern) => pattern.slug === slug);
  if (index === -1) notFound();

  const pattern = patterns[index];
  const problemDays = getProblemDays();
  const prev = patterns[index - 1];
  const next = patterns[index + 1];

  return (
    <>
      <header className="flex flex-col gap-2">
        <div className="t-label flex flex-wrap items-center gap-2">
          <Link href="/patterns/" className="t-accent">
            প্যাটার্ন
          </Link>
          <span>•</span>
          <span>
            টপিক {pattern.topicNum} · {pattern.topicName}
          </span>
        </div>
        <h1 className="t-title text-2xl sm:text-3xl">
          {pattern.id} {pattern.name}
        </h1>
      </header>

      {pattern.clue && (
        <section className="callout callout--accent p-4">
          <div className="t-label mb-1">চিনবেন কীভাবে</div>
          <Markdown inline className="t-body text-sm">
            {pattern.clue}
          </Markdown>
        </section>
      )}

      <details className="surface-panel p-4 sm:p-6">
        <summary className="t-label cursor-pointer select-none">
          Demo · approach · কোড — আগে নিজে চেষ্টা, আটকালে খুলুন
        </summary>
        <Markdown className="measure mt-4">{pattern.demo}</Markdown>
      </details>

      {/* demo-ও plan-এর প্রবলেম হতে পারে — তখন নোট আর দিনের লিংক এখানে, ভাঁজের বাইরে */}
      {pattern.demoProblem && problemDays[pattern.demoProblem.key] && (
        <section className="surface-raised flex flex-col gap-2 p-3 sm:p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="task-text text-sm font-semibold">Demo · {pattern.demoProblem.name}</span>
            <span className="flex flex-wrap gap-1.5">
              {problemDays[pattern.demoProblem.key].map((day) => (
                <Link key={day.code} href={`/day/${day.code}/`} className="chip chip--accent">
                  plan · দিন {day.label}
                </Link>
              ))}
              <a href={pattern.demoProblem.url} target="_blank" rel="noreferrer" className="chip">
                {pattern.demoProblem.source}
                <ArrowUpRight size={10} />
              </a>
            </span>
          </div>
          <ProblemNotes problemKey={pattern.demoProblem.key} />
        </section>
      )}

      <section className="surface-panel flex flex-col gap-4 p-4 sm:p-6">
        <h2 className="t-title text-base sm:text-lg">প্রবলেম</h2>
        <ul className="flex flex-col gap-3">
          {pattern.problems.map((problem) => {
            const days = problemDays[problem.key] ?? [];
            return (
              <li key={problem.key} id={problem.key} className="surface-raised flex flex-col gap-2 p-3 sm:p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="task-text text-sm font-semibold">{problem.name}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {days.map((day) => (
                      <Link key={day.code} href={`/day/${day.code}/`} className="chip chip--accent">
                        plan · দিন {day.label}
                      </Link>
                    ))}
                    {SITE.showMustDo && problem.mustDo && <span className="chip chip--alert">🔥 Must-do</span>}
                    <a href={problem.url} target="_blank" rel="noreferrer" className="chip">
                      {problem.source}
                      <ArrowUpRight size={10} />
                    </a>
                  </span>
                </div>
                {problem.note && (
                  <Markdown inline className="t-caption">
                    {problem.note}
                  </Markdown>
                )}
                {problem.body && <Markdown className="text-sm">{problem.body}</Markdown>}
                <ProblemNotes problemKey={problem.key} />
              </li>
            );
          })}
        </ul>
        {pattern.problems.length === 0 && (
          <div className="surface-well t-caption p-4 text-center">এই প্যাটার্নে আলাদা প্রবলেম নেই — demo-ই মূল প্রবলেম।</div>
        )}
        {pattern.seeAlso.length > 0 && (
          <div className="seam-t flex flex-col gap-1 pt-3">
            <span className="t-label">আরও দেখুন</span>
            {pattern.seeAlso.map((line) => (
              <Markdown key={line} inline className="t-caption">
                {line}
              </Markdown>
            ))}
          </div>
        )}
      </section>

      <Pager
        label="প্যাটার্ন"
        prev={prev && { href: `/pattern/${prev.slug}/`, label: `${prev.id} ${prev.name}` }}
        next={next && { href: `/pattern/${next.slug}/`, label: `${next.id} ${next.name}` }}
      />
    </>
  );
}
