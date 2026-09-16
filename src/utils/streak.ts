import { getTodayString, shiftDateString } from './dateUtils';

export function calculateStreak(
  completedDates: string[],
  todayStr: string = getTodayString(),
): number {
  const done = new Set(completedDates);

  let cursor = todayStr;
  if (!done.has(cursor)) {
    cursor = shiftDateString(cursor, -1);
    if (!done.has(cursor)) {
      return 0;
    }
  }

  let count = 0;
  while (done.has(cursor)) {
    count += 1;
    cursor = shiftDateString(cursor, -1);
  }

  return count;
}
