import { business } from "@/data/business";

export type OpenStatus = {
  isOpen: boolean;
  label: string;
};

const DAY_INDEX_TO_NAME = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Computes live open/closed status against business.hours, in the shop's
 * local timezone (Australia/Brisbane, which does not observe DST).
 */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const brisbaneNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Australia/Brisbane" })
  );
  const dayName = DAY_INDEX_TO_NAME[brisbaneNow.getDay()];
  const nowMinutes = brisbaneNow.getHours() * 60 + brisbaneNow.getMinutes();

  const today = business.hours.find((h) => h.day === dayName);

  if (today) {
    const opens = toMinutes(today.opens);
    const closes = toMinutes(today.closes);
    if (nowMinutes >= opens && nowMinutes < closes) {
      return { isOpen: true, label: `Open now · closes ${formatTime(today.closes)}` };
    }
  }

  const next = findNextOpening(brisbaneNow, dayName, nowMinutes);
  return { isOpen: false, label: `Closed · opens ${next}` };
}

function findNextOpening(now: Date, todayName: string, nowMinutes: number): string {
  const todayIndex = business.hours.findIndex((h) => h.day === todayName);

  const today = business.hours[todayIndex];
  if (today && nowMinutes < toMinutes(today.opens)) {
    return `${formatTime(today.opens)} today`;
  }

  for (let offset = 1; offset <= 7; offset++) {
    const idx = (todayIndex + offset) % business.hours.length;
    const entry = business.hours[idx];
    if (entry) {
      const dayLabel = offset === 1 ? entry.day : entry.day;
      return `${formatTime(entry.opens)} ${dayLabel}`;
    }
  }

  return "6:00am";
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${period}` : `${hour12}:${String(m).padStart(2, "0")}${period}`;
}
