import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';

type Props = {
  count: number;
};

/** Top-right pill showing the remaining streak-freeze tickets. */
export default function FreezeBadge({ count }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.ice}>❄️</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.freezeBadgeBackground,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
  },
  ice: {
    fontSize: 15,
  },
  count: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
