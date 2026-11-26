/** Formats a subscriber count the way YouTube shows it: 12900000 -> "12.9M", 98100 -> "98.1K". */
export function formatSubscribers(n: number, decimals = 2): string {
  const units: [number, string][] = [
    [1_000_000_000, "B"],
    [1_000_000, "M"],
    [1_000, "K"],
  ];
  for (const [size, suffix] of units) {
    if (n >= size) return `${Number((n / size).toFixed(decimals))}${suffix}`;
  }
  return String(Math.round(n));
}
