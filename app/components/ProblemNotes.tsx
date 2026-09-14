"use client";

import { SITE } from "../lib/site";
import { useMounted, useProgress } from "../hooks/useProgress";

/**
 * একটা প্রবলেমের দুই ঘরের নোট — "আমার সমাধান" আর "যে সমস্যা হয়েছিল"।
 *
 * key = প্রবলেমের key (`lc15`), তাই দিনের কাজ আর প্যাটার্নের পাতা একই নোট দেখায়।
 * পুরো কোড নয়: মূল আইডিয়া ২–৩ লাইনে, আর যে trap-এ আটকেছিলেন — সপ্তাহ শেষে
 * দ্বিতীয় ঘরটাই বলে দেয় কোন দুর্বলতায় কাজ করতে হবে। 🧠 Feedback
 */
export default function ProblemNotes({ problemKey }: { problemKey: string }) {
  const mounted = useMounted();
  const { noteFor, setNote } = useProgress();

  const note = mounted ? noteFor(problemKey) : { solution: "", stuck: "" };
  const filled = Boolean(note.solution.trim() || note.stuck.trim());

  return (
    <details className="mt-2">
      <summary className="t-label cursor-pointer select-none" suppressHydrationWarning>
        নোট · {filled ? "লেখা আছে" : "ফাঁকা"}
      </summary>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="t-caption">{SITE.noteLabels.solution}</span>
          <textarea
            rows={3}
            value={note.solution}
            disabled={!mounted}
            onChange={(event) => setNote(problemKey, "solution", event.target.value)}
            className="surface-well t-body w-full resize-y p-2 text-xs"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="t-caption">{SITE.noteLabels.stuck}</span>
          <textarea
            rows={3}
            value={note.stuck}
            disabled={!mounted}
            onChange={(event) => setNote(problemKey, "stuck", event.target.value)}
            className="surface-well t-body w-full resize-y p-2 text-xs"
          />
        </label>
      </div>
    </details>
  );
}
