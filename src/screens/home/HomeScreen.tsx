import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AlarmCard from '../../components/AlarmCard';
import AlarmTimePicker from '../../components/AlarmTimePicker';
import BottomTabBar, { TabKey } from '../../components/BottomTabBar';
import FreezeBadge from '../../components/FreezeBadge';
import GradientBackground from '../../components/GradientBackground';
import PrimaryButton from '../../components/PrimaryButton';
import FlameStreak from '../../components/illustrations/FlameStreak';
import { strings } from '../../constants/strings';
import { nearestPrayerName } from '../../services/prayerTimes';
import { useAppState } from '../../state/AppContext';
import { colors, spacing, typography } from '../../theme';
import { AlarmTime, pad2 } from '../../utils/time';

function nextOccurrence(time: AlarmTime, now: Date): Date {
  const next = new Date(now);
  next.setHours(time.hour, time.minute, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next;
}

function formatCountdown(target: Date, now: Date): string {
  const totalMinutes = Math.ceil((target.getTime() - now.getTime()) / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${pad2(hours)}h ${pad2(minutes)}m`;
}

/**
 * Main screen: glowing streak flame, freeze-ticket badge, a live countdown to
 * the soonest enabled alarm, and the stacked list of alarms — each named
 * after the location-based prayer time it is closest to.
 */
export default function HomeScreen() {
  const copy = strings.home;
  const { alarms, coords, streak, freezes, addAlarm, toggleAlarm } = useAppState();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  // Keep the countdown fresh (minute resolution).
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Prayer names are location-based; without permission they fall back to null.
  const prayerNames = useMemo(
    () =>
      new Map(
        alarms.map((a) => [
          a.id,
          coords ? nearestPrayerName(coords, a.time, now) : null,
        ]),
      ),
    [alarms, coords, now],
  );

  // Soonest enabled alarm drives the "Next X in ..." headline.
  const nextUp = useMemo(() => {
    const enabled = alarms.filter((a) => a.enabled);
    if (enabled.length === 0) return null;
    const soonest = enabled.reduce((best, a) =>
      nextOccurrence(a.time, now) < nextOccurrence(best.time, now) ? a : best,
    );
    return {
      name: prayerNames.get(soonest.id) ?? copy.fallbackAlarmName,
      countdown: formatCountdown(nextOccurrence(soonest.time, now), now),
    };
  }, [alarms, prayerNames, now, copy.fallbackAlarmName]);

  const handleSaveAlarm = async (time: AlarmTime) => {
    setPickerOpen(false);
    await addAlarm(time);
  };

  return (
    <GradientBackground>
      <View style={styles.content}>
        <View style={styles.header}>
          <FreezeBadge count={freezes} />
        </View>

        <View style={styles.streak}>
          <FlameStreak count={streak} size={170} />
          <Text style={styles.streakLabel}>{copy.streakLabel}</Text>
        </View>

        {nextUp && (
          <Text style={styles.countdown}>
            <Text style={styles.countdownPrefix}>
              {copy.nextPrefix} {nextUp.name} {copy.nextInfix}{' '}
            </Text>
            {nextUp.countdown}
          </Text>
        )}

        {alarms.length > 0 ? (
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {alarms.map((alarm) => (
              <AlarmCard
                key={alarm.id}
                time={alarm.time}
                prayerName={prayerNames.get(alarm.id)}
                taskLabel={copy.defaultTask}
                enabled={alarm.enabled}
                onToggle={() => toggleAlarm(alarm.id)}
              />
            ))}

            <Pressable
              accessibilityRole="button"
              onPress={() => setPickerOpen(true)}
              style={({ pressed }) => [styles.addButton, pressed && styles.addPressed]}
            >
              <Text style={styles.addLabel}>{copy.addAlarm}</Text>
            </Pressable>
          </ScrollView>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>{copy.noAlarmTitle}</Text>
            <Text style={styles.emptySubtitle}>{copy.noAlarmSubtitle}</Text>
            <PrimaryButton label={copy.setAlarmCta} onPress={() => setPickerOpen(true)} />
          </View>
        )}
      </View>

      <BottomTabBar active={activeTab} onSelect={setActiveTab} />

      <AlarmTimePicker
        visible={pickerOpen}
        initialTime={{ hour: 4, minute: 22 }}
        onSave={handleSaveAlarm}
        onCancel={() => setPickerOpen(false)}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'flex-end',
    marginTop: spacing.md,
  },
  streak: {
    alignItems: 'center',
  },
  streakLabel: {
    ...typography.headline,
    fontSize: 28,
    color: colors.textPrimary,
    marginTop: -spacing.sm,
  },
  countdown: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.accent,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  countdownPrefix: {
    fontWeight: '500',
    color: 'rgba(255, 201, 64, 0.75)',
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  addButton: {
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xs,
  },
  addPressed: {
    opacity: 0.6,
  },
  addLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  empty: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.headline,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
