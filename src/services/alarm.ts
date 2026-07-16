import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import { AlarmTime } from '../utils/time';

export type ScheduleResult = {
  status: 'scheduled' | 'no-permission' | 'unavailable';
  notificationId: string | null;
};

/** Cancels a previously scheduled alarm notification. */
export async function cancelAlarmNotification(notificationId: string | null): Promise<void> {
  if (Platform.OS === 'web' || !notificationId) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch {
    /* already fired or cancelled */
  }
}

/**
 * Schedules a local notification for the next occurrence of the given time
 * (today if still ahead, otherwise tomorrow). This is the Expo Go-compatible
 * stand-in for the real alarm engine; the full wake-up protocol (critical
 * alerts, background audio) arrives with the development build.
 */
export async function scheduleAlarmNotification(time: AlarmTime): Promise<ScheduleResult> {
  if (Platform.OS === 'web') return { status: 'unavailable', notificationId: null };

  try {
    let perm = await Notifications.getPermissionsAsync();
    if (!perm.granted && perm.canAskAgain) {
      perm = await Notifications.requestPermissionsAsync();
    }
    if (!perm.granted) return { status: 'no-permission', notificationId: null };

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('alarm', {
        name: 'Alarm',
        importance: Notifications.AndroidImportance.MAX,
        sound: 'default',
        vibrationPattern: [0, 500, 500, 500, 500, 500],
      });
    }

    const next = new Date();
    next.setHours(time.hour, time.minute, 0, 0);
    if (next.getTime() <= Date.now()) {
      next.setDate(next.getDate() + 1);
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Fecr — time to rise',
        body: 'Your un-snoozable alarm is ringing. Wake up with purpose.',
        sound: 'default',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: next,
        channelId: 'alarm',
      },
    });

    return { status: 'scheduled', notificationId };
  } catch {
    return { status: 'unavailable', notificationId: null };
  }
}
