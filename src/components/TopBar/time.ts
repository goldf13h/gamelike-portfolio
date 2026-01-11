function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function formatHHMMSS(date: Date): string {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(
    date.getSeconds()
  )}`;
}

export function nowWithOffset(offsetMs: number): Date {
  return new Date(Date.now() + offsetMs);
}
