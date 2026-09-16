function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export function getLocalDateString(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function getTodayString(): string {
  return getLocalDateString(new Date());
}

export function shiftDateString(dateStr: string, deltaDays: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const shifted = new Date(y, m - 1, d + deltaDays);
  return getLocalDateString(shifted);
}

// Returns date strings from oldest to newest, ending at todayStr.
export function getLastNDateStrings(n: number, todayStr: string = getTodayString()): string[] {
  const dates: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    dates.push(shiftDateString(todayStr, -i));
  }
  return dates;
}
