/** Local calendar day key YYYY-MM-DD */
export function dateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(key: string, delta: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + delta);
  return dateKey(dt);
}

/** Consecutive days ending today, or yesterday if not yet practiced today. */
export function calcStreak(practiceDates: string[], today = dateKey()): number {
  const set = new Set(practiceDates);
  let cursor = set.has(today) ? today : addDays(today, -1);
  if (!set.has(cursor)) return 0;
  let streak = 0;
  while (set.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function lastNDays(n: number, today = dateKey()): string[] {
  return Array.from({ length: n }, (_, i) => addDays(today, -(n - 1 - i)));
}

export function daysSince(isoDate: string, today = dateKey()): number {
  const then = dateKey(new Date(isoDate));
  let count = 0;
  let cursor = today;
  while (cursor !== then && count < 3650) {
    cursor = addDays(cursor, -1);
    count += 1;
  }
  return count;
}
