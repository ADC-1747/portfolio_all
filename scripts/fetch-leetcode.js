
import fs from "fs";
import path from "path";

const USERNAME = "adc_17";
const OUTPUT_PATH = path.join(
  process.cwd(),
  "public/lc_contributions.json"
);

function buildWeeks(calendar) {
  const days = Object.entries(calendar)
    .map(([ts, count]) => ({
      date: new Date(Number(ts) * 1000),
      count
    }))
    .sort((a, b) => a.date - b.date);

  if (!days.length) return [];

  const start = new Date(days[0].date);
  start.setDate(start.getDate() - start.getDay());

  const end = new Date(days[days.length - 1].date);
  end.setDate(end.getDate() + (6 - end.getDay()));

  const map = new Map(
    days.map(d => [d.date.toISOString().slice(0, 10), d.count])
  );

  const weeks = [];
  let current = new Date(start);

  while (current <= end) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const key = current.toISOString().slice(0, 10);
      week.push({
        date: key,
        count: map.get(key) ?? 0
      });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

async function main() {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            submissionCalendar
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
      variables: { username: USERNAME }
    })
  });

  const json = await res.json();

  const calendar = JSON.parse(
    json.data.matchedUser.submissionCalendar
  );

  const stats = json.data.matchedUser.submitStats.acSubmissionNum;

  const solved = {
    total: stats.find(s => s.difficulty === "All")?.count ?? 0,
    easy: stats.find(s => s.difficulty === "Easy")?.count ?? 0,
    medium: stats.find(s => s.difficulty === "Medium")?.count ?? 0,
    hard: stats.find(s => s.difficulty === "Hard")?.count ?? 0
  };

  const weeks = buildWeeks(calendar);

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify({ weeks, solved }, null, 2)
  );

  console.log("LeetCode contributions updated");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
