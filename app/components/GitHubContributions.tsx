
"use client";

import { useEffect, useMemo, useState } from "react";

type Day = {
  date: string;
  contributionCount: number;
};

type Week = {
  contributionDays: Day[];
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function GitHubContributions() {
  const [weeks, setWeeks] = useState<Week[]>([]);

  useEffect(() => {
    fetch("/gh_contributions.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load contributions");
        return r.json();
      })
      .then(setWeeks)
      .catch(console.error);
  }, []);

  /* ---------------------------------------------
   * Flatten days (chronological)
   * --------------------------------------------- */
  const allDays = useMemo(() => {
    return weeks
      .flatMap((w) => w.contributionDays)
      .filter((d) => d.date)
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [weeks]);

  /* ---------------------------------------------
   * Streak calculations (GitHub-accurate)
   * --------------------------------------------- */
  const { currentStreak, maxStreak } = useMemo(() => {
    let max = 0;
    let temp = 0;

    for (const day of allDays) {
      if (day.contributionCount > 0) {
        temp++;
        max = Math.max(max, temp);
      } else {
        temp = 0;
      }
    }

    let current = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].contributionCount > 0) {
        current++;
      } else if (current > 0) {
        break;
      }
    }

    return { currentStreak: current, maxStreak: max };
  }, [allDays]);

  /* ---------------------------------------------
   * GitHub color scale
   * --------------------------------------------- */
  const color = (count: number) => {
    if (count === 0) return "bg-[#ebedf0] dark:bg-[#161b22]";
    if (count < 3) return "bg-[#9be9a8] dark:bg-[#0e4429]";
    if (count < 6) return "bg-[#40c463] dark:bg-[#006d32]";
    return "bg-[#216e39] dark:bg-[#26a641]";
  };

  /* ---------------------------------------------
   * Normalize weeks to 7 rows
   * --------------------------------------------- */
  const normalizedWeeks = weeks.map((week) => {
    const days = [...week.contributionDays];
    while (days.length < 7) {
      days.push({ date: "", contributionCount: 0 });
    }
    return days;
  });

  /* ---------------------------------------------
   * Month labels
   * --------------------------------------------- */
  const monthLabels = normalizedWeeks.map((week) => {
    const d = week[0]?.date;
    if (!d) return "";
    const date = new Date(d);
    return date.getDate() <= 7
      ? date.toLocaleString("en-US", { month: "short" })
      : "";
  });

  return (
    <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          GitHub Contributions
        </h3>
        <span className="text-xs text-zinc-500">Last 52 weeks</span>
      </div>

      {/* Streaks */}
      <div className="mb-3 flex gap-8 text-sm">
        <div>
          <p className="text-xs text-zinc-500">Current streak</p>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            {currentStreak} days
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Max streak</p>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            {maxStreak} days
          </p>
        </div>
      </div>

      {/* Graph */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-2">
          {/* Day labels */}
          <div className="mr-2 flex flex-col justify-between text-[10px] text-zinc-500">
            {DAYS.map((d, i) =>
              i % 2 === 0 ? (
                <span key={d}>{d}</span>
              ) : (
                <span key={d}>&nbsp;</span>
              )
            )}
          </div>

          <div>
            {/* Month labels */}
            <div className="mb-1 grid grid-flow-col auto-cols-[11px] gap-[3px] text-[10px] text-zinc-500">
              {monthLabels.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="grid grid-flow-col auto-cols-[11px] grid-rows-7 gap-[3px]">
              {normalizedWeeks.map((week, wi) =>
                week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    title={
                      day.date
                        ? `${day.contributionCount} contributions on ${day.date}`
                        : ""
                    }
                    className={`h-[11px] w-[11px] rounded-[2px] ${color(
                      day.contributionCount
                    )}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-2 text-[10px] text-zinc-500">
        <span>Less</span>
        {[0, 1, 3, 6].map((c) => (
          <div
            key={c}
            className={`h-[11px] w-[11px] rounded-[2px] ${color(c)}`}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
