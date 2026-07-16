import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AlarmTimePicker from '../../components/AlarmTimePicker';
import PrimaryButton from '../../components/PrimaryButton';
import TaskChip from '../../components/TaskChip';
import ThemedDialog from '../../components/ThemedDialog';
import { strings } from '../../constants/strings';
import { useAppState } from '../../state/AppContext';
import { colors, spacing, typography } from '../../theme';
import { AlarmTime, formatTime } from '../../utils/time';

type Props = {
  onNext: () => void;
};

type ConfirmState = { time: AlarmTime; scheduled: boolean } | null;

/**
 * Onboarding page 4 — Commitment.
 * Shows the planned dawn alarm with the wake-up task selector; "Set First
 * Alarm" opens the themed time picker, schedules a local notification for the
 * chosen time, and confirms with a themed dialog before leaving onboarding.
 */
export default function SetAlarmPage({ onNext }: Props) {
  const copy = strings.onboarding.setAlarm;
  const { addAlarm } = useAppState();
  const [alarmTime, setAlarmTime] = useState<AlarmTime>({ hour: 4, minute: 22 });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [premiumInfoOpen, setPremiumInfoOpen] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmState>(null);

  const display = formatTime(alarmTime);

  const handleSave = async (time: AlarmTime) => {
    setAlarmTime(time);
    setPickerOpen(false);
    const status = await addAlarm(time);
    setConfirm({ time, scheduled: status === 'scheduled' });
  };

  const handleConfirmDone = () => {
    setConfirm(null);
    onNext();
  };

  return (
    <View style={styles.content}>
      <View style={styles.timeRow}>
        <Text style={styles.timeClock}>{display.clock}</Text>
        <Text style={styles.timeMeridiem}>{display.meridiem}</Text>
      </View>

      <View style={styles.chips}>
        <TaskChip icon="🧭" label={copy.tasks.qibla} selected onPress={() => {}} />
        <TaskChip icon="📷" label={copy.tasks.rug} locked onPress={() => setPremiumInfoOpen(true)} />
        <TaskChip icon="🗣️" label={copy.tasks.surah} locked onPress={() => setPremiumInfoOpen(true)} />
      </View>

      <View style={styles.spacer} />

      <Text style={styles.title}>{copy.title}</Text>
      <Text style={styles.subtitle}>{copy.subtitle}</Text>

      <View style={styles.spacer} />

      <PrimaryButton label={copy.cta} onPress={() => setPickerOpen(true)} />

      <AlarmTimePicker
        visible={pickerOpen}
        initialTime={alarmTime}
        onSave={handleSave}
        onCancel={() => setPickerOpen(false)}
      />

      <ThemedDialog
        visible={premiumInfoOpen}
        title={copy.premiumTitle}
        message={copy.premiumMessage}
        confirmLabel={copy.ok}
        onConfirm={() => setPremiumInfoOpen(false)}
      />

      <ThemedDialog
        visible={confirm !== null}
        title={`${copy.confirmTitle} ${confirm ? `${formatTime(confirm.time).clock} ${formatTime(confirm.time).meridiem}` : ''}`}
        message={confirm?.scheduled ? copy.confirmScheduled : copy.confirmNoPermission}
        confirmLabel={copy.done}
        onConfirm={handleConfirmDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  timeClock: {
    fontSize: 76,
    fontWeight: '700',
    color: colors.accent,
    textShadowColor: colors.timeGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  timeMeridiem: {
    fontSize: 30,
    fontWeight: '600',
    color: colors.accent,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.headline,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    fontSize: 18,
    lineHeight: 27,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  spacer: {
    flex: 1,
  },
});
