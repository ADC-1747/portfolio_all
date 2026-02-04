
"use client";

import { useEffect, useState } from "react";

type Day = {
  date: string;
  count: number;
};

type SolvedStats = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
};

export default function LeetCodeContributions() {
  const [weeks, setWeeks] = useState<Day[][]>([]);
  const [solved, setSolved] = useState<SolvedStats | null>(null);

  useEffect(() => {
    fetch("/lc_contributions.json")
      .then(res => res.json())
      .then(data => {
        setWeeks(data.weeks);
        setSolved(data.solved);
      })
      .catch(console.error);
  }, []);

  const color = (count: number) => {
    if (count === 0) return "bg-zinc-200 dark:bg-zinc-800";
    if (count < 2) return "bg-green-300";
    if (count < 4) return "bg-green-400";
    if (count < 6) return "bg-green-500";
    return "bg-green-600";
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-black">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          LeetCode Activity
        </h3>
        <p className="text-xs text-zinc-500">
          Submissions over the last year
        </p>
      </div>

      {/* Solved stats */}
      {solved && (
        <div className="mb-4 flex flex-wrap gap-6 text-sm">
          <div>
            <p className="text-xs text-zinc-500">Total solved</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              {solved.total}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Easy</p>
            <p className="font-semibold text-green-600">
              {solved.easy}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Medium</p>
            <p className="font-semibold text-yellow-600">
              {solved.medium}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Hard</p>
            <p className="font-semibold text-red-600">
              {solved.hard}
            </p>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-2">
          {weeks.map((week, i) => (
            <div key={i} className="mr-2 flex flex-col gap-2">
              {week.map(day => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.count} submissions`}
                  className={`h-3 w-3 rounded-sm ${color(day.count)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <a
        href="https://leetcode.com/u/adc_17/"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-xs font-medium text-zinc-900 hover:underline dark:text-zinc-100"
      >
        View LeetCode profile →
      </a>
    </div>
  );
}
