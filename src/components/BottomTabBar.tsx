import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../theme';
import { HomeIcon, SettingsIcon, StatsIcon, TrophyIcon } from './illustrations/TabIcons';

export type TabKey = 'home' | 'trophies' | 'stats' | 'settings';

type Props = {
  active: TabKey;
  onSelect: (tab: TabKey) => void;
};

const TABS: Array<{ key: TabKey; Icon: typeof HomeIcon }> = [
  { key: 'home', Icon: HomeIcon },
  { key: 'trophies', Icon: TrophyIcon },
  { key: 'stats', Icon: StatsIcon },
  { key: 'settings', Icon: SettingsIcon },
];

/**
 * Bottom navigation bar. Only "home" has a screen for now; the other tabs
 * are placeholders for the upcoming achievements/stats/settings screens.
 */
export default function BottomTabBar({ active, onSelect }: Props) {
  return (
    <View style={styles.bar}>
      {TABS.map(({ key, Icon }) => (
        <Pressable
          key={key}
          accessibilityRole="tab"
          accessibilityState={{ selected: active === key }}
          onPress={() => onSelect(key)}
          hitSlop={10}
          style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
        >
          <Icon color={active === key ? colors.accent : colors.tabInactive} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.tabBarBackground,
    borderTopWidth: 1,
    borderTopColor: colors.tabBarBorder,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  tab: {
    padding: spacing.sm,
  },
  pressed: {
    opacity: 0.6,
  },
});
