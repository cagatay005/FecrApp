import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { strings } from '../constants/strings';
import { colors, spacing, typography } from '../theme';
import { AlarmTime, Time12, formatTime, pad2, to12h, to24h } from '../utils/time';
import GradientBackground from './GradientBackground';
import PrimaryButton from './PrimaryButton';

const ITEM_HEIGHT = 56;
const VISIBLE_ROWS = 5;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ROWS;
const WHEEL_PADDING = ITEM_HEIGHT * 2; // centres first/last items

type WheelProps = {
  values: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  width: number;
};

/** One snap-scrolling column of the time picker. */
function WheelColumn({ values, selectedIndex, onSelect, width }: WheelProps) {
  const ref = useRef<ScrollView>(null);
  const didInit = useRef(false);

  useEffect(() => {
    // Centre the initial value once the ScrollView has laid out.
    if (!didInit.current) return;
    ref.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLayout = () => {
    if (didInit.current) return;
    didInit.current = true;
    ref.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
  };

  const syncFromOffset = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(idx, values.length - 1));
    if (clamped !== selectedIndex) onSelect(clamped);
  };

  return (
    <View style={[styles.wheel, { width }]}>
      <ScrollView
        ref={ref}
        onLayout={handleLayout}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={syncFromOffset}
        onMomentumScrollEnd={syncFromOffset}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: WHEEL_PADDING }}
      >
        {values.map((value, i) => (
          <View key={value} style={styles.wheelItem}>
            <Text style={[styles.wheelText, i === selectedIndex && styles.wheelTextActive]}>
              {value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const HOURS = Array.from({ length: 12 }, (_, i) => pad2(i + 1));
const MINUTES = Array.from({ length: 60 }, (_, i) => pad2(i));
const MERIDIEMS: Array<Time12['meridiem']> = ['AM', 'PM'];

type Props = {
  visible: boolean;
  initialTime: AlarmTime;
  onSave: (time: AlarmTime) => void;
  onCancel: () => void;
};

/**
 * Full-screen, app-themed wake-up time picker: three snap wheels
 * (hour / minute / AM-PM) over the same dawn gradient, with a live preview
 * and a gold save button.
 */
export default function AlarmTimePicker({ visible, initialTime, onSave, onCancel }: Props) {
  const copy = strings.onboarding.setAlarm.picker;
  const initial = to12h(initialTime);
  const [hourIdx, setHourIdx] = useState(initial.hour12 - 1);
  const [minuteIdx, setMinuteIdx] = useState(initial.minute);
  const [meridiemIdx, setMeridiemIdx] = useState(initial.meridiem === 'AM' ? 0 : 1);

  useEffect(() => {
    if (!visible) return;
    const t = to12h(initialTime);
    setHourIdx(t.hour12 - 1);
    setMinuteIdx(t.minute);
    setMeridiemIdx(t.meridiem === 'AM' ? 0 : 1);
  }, [visible, initialTime]);

  const selected = to24h({
    hour12: hourIdx + 1,
    minute: minuteIdx,
    meridiem: MERIDIEMS[meridiemIdx],
  });
  const preview = formatTime(selected);

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent onRequestClose={onCancel}>
      <GradientBackground>
        <View style={styles.container}>
          <Text style={styles.title}>{copy.title}</Text>

          <View style={styles.previewRow}>
            <Text style={styles.previewClock}>{preview.clock}</Text>
            <Text style={styles.previewMeridiem}>{preview.meridiem}</Text>
          </View>

          <View style={styles.wheels}>
            <View style={styles.wheelHighlight} pointerEvents="none" />
            <WheelColumn
              values={HOURS}
              selectedIndex={hourIdx}
              onSelect={setHourIdx}
              width={72}
            />
            <Text style={styles.colon}>:</Text>
            <WheelColumn
              values={MINUTES}
              selectedIndex={minuteIdx}
              onSelect={setMinuteIdx}
              width={72}
            />
            <WheelColumn
              values={MERIDIEMS}
              selectedIndex={meridiemIdx}
              onSelect={setMeridiemIdx}
              width={72}
            />
          </View>

          <View style={styles.spacer} />

          <PrimaryButton label={copy.save} onPress={() => onSave(selected)} />
          <Pressable
            accessibilityRole="button"
            onPress={onCancel}
            style={({ pressed }) => [styles.cancel, pressed && styles.cancelPressed]}
          >
            <Text style={styles.cancelText}>{copy.cancel}</Text>
          </Pressable>
        </View>
      </GradientBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  title: {
    ...typography.headline,
    fontSize: 26,
    lineHeight: 34,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  previewClock: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.accent,
    textShadowColor: colors.timeGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  previewMeridiem: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.accent,
  },
  wheels: {
    height: WHEEL_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  wheelHighlight: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    top: (WHEEL_HEIGHT - ITEM_HEIGHT) / 2,
    height: ITEM_HEIGHT,
    borderRadius: 16,
    backgroundColor: colors.wheelHighlight,
    borderWidth: 1,
    borderColor: colors.wheelHighlightBorder,
  },
  wheel: {
    height: WHEEL_HEIGHT,
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelText: {
    fontSize: 26,
    fontWeight: '500',
    color: colors.textMuted,
  },
  wheelTextActive: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  colon: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  spacer: {
    flex: 1,
  },
  cancel: {
    alignSelf: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  cancelPressed: {
    opacity: 0.6,
  },
  cancelText: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
