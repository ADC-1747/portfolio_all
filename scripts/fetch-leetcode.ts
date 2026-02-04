
import fs from "fs";
import path from "path";

const USERNAME = "adc_17";
const OUTPUT_PATH = path.join(process.cwd(), "public/lc_contributions.json");

type Calendar = Record<string, number>;

async function fetchCalendar(): Promise<Calendar> {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query submissionCalendar($username: String!) {
          matchedUser(username: $username) {
            submissionCalendar
          }
        }
      `,
      variables: { username: USERNAME }
    })
  });

  const json = await res.json();
  return JSON.parse(json.data.matchedUser.submissionCalendar);
}

function buildWeeks(calendar: Calendar) {
  const entries = Object.entries(calendar)
    .map(([ts, count]) => ({
      date: new Date(Number(ts) * 1000).toISOString().slice(0, 10),
      count
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const weeks: { days: { date: string; count: number }[] }[] = [];
  let week: any[] = [];

  entries.forEach((day) => {
    if (week.length === 7) {
      weeks.push({ days: week });
      week = [];
    }
    week.push(day);
  });

  if (week.length) weeks.push({ days: week });

  return weeks;
}

async function main() {
  const calendar = await fetchCalendar();
  const weeks = buildWeeks(calendar);

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify({ weeks }, null, 2)
  );

  console.log("LeetCode contributions updated");
}

main().catch(console.error);
