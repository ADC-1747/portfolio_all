
"use client";

import { useEffect, useMemo, useState } from "react";

type Day = {
  date: string; // YYYY-MM-DD
  count: number;
};

type SolvedStats = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TOTAL_WEEKS = 52;

export default function LeetCodeContributions() {
  const [weeks, setWeeks] = useState<Day[][]>([]);
  const [solved, setSolved] = useState<SolvedStats | null>(null);

  useEffect(() => {
    fetch("/lc_contributions.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load LeetCode data");
        return r.json();
      })
      .then((data) => {
        setWeeks(data.weeks ?? []);
        setSolved(data.solved ?? null);
      })
      .catch(console.error);
  }, []);

  /* ---------------------------------------------
   * Pad weeks to 52 using REAL calendar dates
   * --------------------------------------------- */
  const paddedWeeks = useMemo(() => {
    if (!weeks.length) return [];

    // Find earliest real date
    const firstRealDay =
      weeks[0]?.find((d) => d?.date && d.date.length > 0) ?? null;

    if (!firstRealDay) return weeks;

    const startDate = new Date(firstRealDay.date);
    const missing = TOTAL_WEEKS - weeks.length;

    if (missing <= 0) return weeks;

    const padded: Day[][] = [];

    for (let w = missing; w > 0; w--) {
      const week: Day[] = [];

      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() - w * 7 + d);

        week.push({
          date: date.toISOString().slice(0, 10),
          count: 0,
        });
      }

      padded.push(week);
    }

    return [...padded, ...weeks];
  }, [weeks]);

  /* ---------------------------------------------
   * Normalize weeks to exactly 7 days
   * --------------------------------------------- */
  const normalizedWeeks = useMemo(() => {
    return paddedWeeks.map((week) => {
      const days = [...(week ?? [])];
      while (days.length < 7) {
        days.push({ date: "", count: 0 });
      }
      return days;
    });
  }, [paddedWeeks]);

  /* ---------------------------------------------
   * Flatten days (chronological, safe)
   * --------------------------------------------- */
  const allDays = useMemo(() => {
    return normalizedWeeks
      .flat()
      .filter(
        (d): d is Day =>
          !!d && typeof d.date === "string" && d.date.length > 0
      )
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [normalizedWeeks]);

  /* ---------------------------------------------
   * Streaks (GitHub-accurate)
   * --------------------------------------------- */
  const { currentStreak, maxStreak } = useMemo(() => {
    let max = 0;
    let temp = 0;

    for (const day of allDays) {
      if (day.count > 0) {
        temp++;
        max = Math.max(max, temp);
      } else {
        temp = 0;
      }
    }

    let current = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].count > 0) current++;
      else if (current > 0) break;
    }

    return { currentStreak: current, maxStreak: max };
  }, [allDays]);

  /* ---------------------------------------------
   * GitHub-like color scale
   * --------------------------------------------- */
  const color = (count: number) => {
    if (count === 0) return "bg-[#ebedf0] dark:bg-[#161b22]";
    if (count < 2) return "bg-[#9be9a8] dark:bg-[#0e4429]";
    if (count < 4) return "bg-[#40c463] dark:bg-[#006d32]";
    return "bg-[#216e39] dark:bg-[#26a641]";
  };

  /* ---------------------------------------------
   * Month labels (padding-safe, GitHub logic)
   * --------------------------------------------- */
  const monthLabels = useMemo(() => {
    return normalizedWeeks.map((week) => {
      const firstValidDay = week.find(
        (d) => d.date && d.date.length > 0
      );

      if (!firstValidDay) return "";

      const date = new Date(firstValidDay.date);

      return date.getDate() <= 7
        ? date.toLocaleString("en-US", { month: "short" })
        : "";
    });
  }, [normalizedWeeks]);

  return (
    <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          LeetCode Contributions
        </h3>
        <span className="text-xs text-zinc-500">Last 52 weeks</span>
      </div>

      {/* Solved stats */}
      {solved && (
        <div className="mb-3 flex gap-8 text-sm">
          <div>
            <p className="text-xs text-zinc-500">Solved</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              {solved.total}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Easy</p>
            <p className="font-semibold text-green-600">{solved.easy}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Medium</p>
            <p className="font-semibold text-yellow-600">{solved.medium}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Hard</p>
            <p className="font-semibold text-red-600">{solved.hard}</p>
          </div>
        </div>
      )}

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

          {/* Heatmap */}
          <div className="grid grid-flow-col auto-cols-[11px] grid-rows-7 gap-[3px]">
            {normalizedWeeks.map((week, wi) =>
              week.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  title={
                    day.date
                      ? `${day.count} submissions on ${day.date}`
                      : ""
                  }
                  className={`h-[11px] w-[11px] rounded-[2px] ${color(
                    day.count
                  )}`}
                />
              ))
            )}
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
