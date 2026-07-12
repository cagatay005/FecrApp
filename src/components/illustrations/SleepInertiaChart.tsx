import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Path, Polygon, Stop } from 'react-native-svg';

import { colors } from '../../theme';
import { strings } from '../../constants/strings';

// The chart is drawn in a 1:1 coordinate space so the SVG graphics and the
// React Native text overlay share the same pixel grid.
const W = 320;
const H = 250;

// Plot geometry.
const AXIS_X = 42; // vertical axis
const AXIS_Y = 188; // horizontal baseline
const RIGHT = 305;
const FULL_ALERT_Y = 46; // dashed "Full-Alert" reference line
const DIVIDER_X = 170; // boundary of the Sleep Inertia Zone

// Brain-activity curve: starts near full alert, plunges into the inertia
// trough, wobbles, then S-curves back up to a full-alert plateau.
const CURVE_PATH =
  'M 50,50 ' +
  'C 62,130 70,160 80,160 ' +
  'C 92,160 97,130 104,128 ' +
  'C 112,127 114,143 120,142 ' +
  'C 138,141 154,102 170,90 ' +
  'C 190,80 200,62 214,55 ' +
  'C 234,47 250,46 268,46 ' +
  'L 305,46';

// Same curve, closed down to the baseline and clipped at the divider —
// this is the gold-filled Sleep Inertia Zone.
const ZONE_PATH =
  'M 50,188 L 50,50 ' +
  'C 62,130 70,160 80,160 ' +
  'C 92,160 97,130 104,128 ' +
  'C 112,127 114,143 120,142 ' +
  'C 138,141 154,102 170,90 ' +
  'L 170,188 Z';

/**
 * Static, clean line chart illustrating how brain activity collapses right
 * after waking (the Sleep Inertia Zone) before climbing back to full alert.
 *
 * Text labels are plain React Native <Text> overlaid on the SVG (rather than
 * SVG <Text>) so the graphic relies only on the same primitives used
 * elsewhere in the app, avoiding native text-measurement edge cases.
 */
export default function SleepInertiaChart() {
  const c = strings.onboarding.sleepInertia.chart;

  return (
    <View style={styles.container}>
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <Defs>
          <LinearGradient id="zoneFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.chartZone} stopOpacity={0.05} />
            <Stop offset="1" stopColor={colors.chartZone} stopOpacity={0.85} />
          </LinearGradient>
        </Defs>

        {/* Gold inertia zone under the curve */}
        <Path d={ZONE_PATH} fill="url(#zoneFill)" />

        {/* Dashed full-alert reference line */}
        <Line
          x1={AXIS_X}
          y1={FULL_ALERT_Y}
          x2={RIGHT}
          y2={FULL_ALERT_Y}
          stroke={colors.chartDashed}
          strokeWidth={1.5}
          strokeDasharray="5 5"
        />

        {/* Vertical divider marking the end of the zone */}
        <Line
          x1={DIVIDER_X}
          y1={FULL_ALERT_Y}
          x2={DIVIDER_X}
          y2={AXIS_Y}
          stroke={colors.chartDivider}
          strokeWidth={2}
        />

        {/* Axes with arrowheads */}
        <Line x1={AXIS_X} y1={30} x2={AXIS_X} y2={AXIS_Y} stroke={colors.chartAxis} strokeWidth={2} />
        <Line x1={AXIS_X} y1={AXIS_Y} x2={RIGHT} y2={AXIS_Y} stroke={colors.chartAxis} strokeWidth={2} />
        <Polygon points="37,36 42,26 47,36" fill={colors.chartAxis} />
        <Polygon points="303,183 313,188 303,193" fill={colors.chartAxis} />

        {/* Brain-activity curve */}
        <Path
          d={CURVE_PATH}
          stroke={colors.chartCurve}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>

      {/* Text overlay (plain RN Text, positioned in the same 320×250 grid) */}
      <Text style={[styles.label, styles.fullAlert]}>{c.fullAlert}</Text>
      <Text style={[styles.label, styles.zone]}>{c.zone}</Text>

      <View style={styles.yAxisColumn} pointerEvents="none">
        <Text style={styles.yAxis} numberOfLines={1}>
          {c.yAxis}
        </Text>
      </View>
      <Text style={[styles.label, styles.xAxis]}>{c.xAxis}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: W,
    height: H,
  },
  label: {
    position: 'absolute',
  },
  fullAlert: {
    top: 26,
    left: 200,
    color: colors.chartLabelAlert,
    fontSize: 12,
    fontWeight: '500',
  },
  zone: {
    top: 88,
    left: 180,
    color: colors.chartLabelZone,
    fontSize: 12,
    fontWeight: '600',
  },
  // A narrow column pinned to the left edge; the rotated title is centred
  // vertically within it.
  yAxisColumn: {
    position: 'absolute',
    left: -50,
    top: 0,
    bottom: 0,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yAxis: {
    color: colors.chartAxisTitle,
    fontSize: 11,
    transform: [{ rotate: '-90deg' }],
  },
  xAxis: {
    bottom: 18,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: colors.chartAxisTitle,
    fontSize: 11,
  },
});
