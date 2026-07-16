import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import * as Location from 'expo-location';

import { AlarmTime } from '../utils/time';

export type Coords = { latitude: number; longitude: number };

export const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
export type PrayerName = (typeof PRAYER_NAMES)[number];

/**
 * Returns the device coordinates if location permission was already granted
 * (asked during onboarding). Never prompts from the home screen.
 */
export async function getCoordsIfPermitted(): Promise<Coords | null> {
  try {
    const perm = await Location.getForegroundPermissionsAsync();
    if (!perm.granted) return null;
    const last = await Location.getLastKnownPositionAsync();
    if (last) {
      return { latitude: last.coords.latitude, longitude: last.coords.longitude };
    }
    const current = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    });
    return { latitude: current.coords.latitude, longitude: current.coords.longitude };
  } catch {
    return null;
  }
}

/**
 * Names an alarm after the prayer whose (location-based) time is closest to
 * the alarm time, measured as circular distance within the day.
 */
export function nearestPrayerName(
  coords: Coords,
  time: AlarmTime,
  date: Date = new Date(),
): PrayerName {
  const prayerTimes = new PrayerTimes(
    new Coordinates(coords.latitude, coords.longitude),
    date,
    CalculationMethod.Turkey(),
  );

  const entries: Array<[PrayerName, Date]> = [
    ['Fajr', prayerTimes.fajr],
    ['Dhuhr', prayerTimes.dhuhr],
    ['Asr', prayerTimes.asr],
    ['Maghrib', prayerTimes.maghrib],
    ['Isha', prayerTimes.isha],
  ];

  const alarmMinutes = time.hour * 60 + time.minute;
  let best: PrayerName = 'Fajr';
  let bestDiff = Infinity;
  for (const [name, prayerDate] of entries) {
    const prayerMinutes = prayerDate.getHours() * 60 + prayerDate.getMinutes();
    const raw = Math.abs(prayerMinutes - alarmMinutes);
    const diff = Math.min(raw, 1440 - raw);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = name;
    }
  }
  return best;
}
