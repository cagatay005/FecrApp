import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';
import { AlarmTime, formatTime } from '../utils/time';

type Props = {
  time: AlarmTime;
  taskLabel: string;
  enabled: boolean;
  onToggle: () => void;
  /** Prayer this alarm corresponds to (e.g. "Fajr"); hidden when null. */
  prayerName?: string | null;
};

/**
 * Home-screen alarm row: prayer name, big clock, wake-up task label and a
 * gold toggle to enable/disable the alarm.
 */
export default function AlarmCard({ time, taskLabel, enabled, onToggle, prayerName }: Props) {
  const display = formatTime(time);

  return (
    <View style={[styles.card, enabled && styles.cardEnabled]}>
      <View style={styles.info}>
        {prayerName != null && (
          <Text style={[styles.prayerName, !enabled && styles.dimmed]}>{prayerName}</Text>
        )}
        <View style={styles.timeRow}>
          <Text style={[styles.clock, !enabled && styles.dimmed]}>{display.clock}</Text>
          <Text style={[styles.meridiem, !enabled && styles.dimmed]}>{display.meridiem}</Text>
        </View>
        <View style={styles.taskRow}>
          <Text style={styles.taskIcon}>🧭</Text>
          <Text style={[styles.taskLabel, !enabled && styles.dimmed]}>{taskLabel}</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: enabled }}
        onPress={onToggle}
        hitSlop={12}
        style={[styles.track, enabled && styles.trackOn]}
      >
        <View style={[styles.thumb, enabled && styles.thumbOn]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.surfaceCardBorder,
    borderRadius: 24,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  cardEnabled: {
    shadowColor: colors.accent,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  info: {
    flex: 1,
  },
  prayerName: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  clock: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  meridiem: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  taskIcon: {
    fontSize: 14,
  },
  taskLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.accent,
  },
  dimmed: {
    opacity: 0.45,
  },
  track: {
    width: 64,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.toggleTrackOff,
    padding: 3,
    justifyContent: 'center',
  },
  trackOn: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.toggleThumb,
    alignSelf: 'flex-start',
  },
  thumbOn: {
    alignSelf: 'flex-end',
  },
});
