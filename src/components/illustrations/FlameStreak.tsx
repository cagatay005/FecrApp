import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../../theme';

type Props = {
  count: number;
  size?: number;
};

// Neon flame outline, open at the bottom corners like the design reference.
const FLAME_PATH =
  'M 60 160 ' +
  'C 38 150 24 128 24 102 ' +
  'C 24 78 38 60 50 42 ' +
  'C 54 56 60 62 66 66 ' +
  'C 64 46 72 28 90 14 ' +
  'C 88 34 96 44 108 54 ' +
  'C 104 40 108 30 116 22 ' +
  'C 118 40 132 52 140 66 ' +
  'C 150 82 156 92 156 106 ' +
  'C 156 130 142 150 120 160';

/**
 * Glowing neon flame with the streak count inside. The glow is faked with
 * progressively wider, fainter strokes of the same path (no SVG filters —
 * they are unreliable on native).
 */
export default function FlameStreak({ count, size = 200 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 180 180" fill="none">
        {/* Glow layers */}
        <Path
          d={FLAME_PATH}
          stroke={colors.flameGlow}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.35}
        />
        <Path
          d={FLAME_PATH}
          stroke={colors.flameGlow}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.6}
        />
        {/* Core neon stroke */}
        <Path
          d={FLAME_PATH}
          stroke={colors.flame}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>

      <View style={styles.countWrap} pointerEvents="none">
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  countWrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18, // optically centre inside the flame body
  },
  count: {
    fontSize: 64,
    fontWeight: '800',
    color: colors.textPrimary,
    textShadowColor: 'rgba(255, 255, 255, 0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },
});
