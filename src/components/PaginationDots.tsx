import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../theme';

type Props = {
  total: number;
  activeIndex: number;
};

/** Row of page-indicator dots; the active page glows gold. */
export default function PaginationDots({ total, activeIndex }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[styles.dot, i === activeIndex && styles.dotActive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.dotInactive,
  },
  dotActive: {
    backgroundColor: colors.dotActive,
  },
});
