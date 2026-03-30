export function to_iso_utc(date: Date): string {
  return date.toISOString();
}

export function is_before(a: Date, b: Date): boolean {
  return a.getTime() < b.getTime();
}
