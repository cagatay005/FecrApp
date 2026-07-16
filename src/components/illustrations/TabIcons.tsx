import React from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

type IconProps = {
  color: string;
  size?: number;
};

/** Simple line-style tab bar icons drawn to match the app's icon language. */

export function HomeIcon({ color, size = 26 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Path
        d="M4 12 L13 4 L22 12 L22 22 L4 22 Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10.5 22 L10.5 15.5 L15.5 15.5 L15.5 22" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export function TrophyIcon({ color, size = 26 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Path
        d="M8 4 L18 4 L18 10 C18 13.5 16 16 13 16 C10 16 8 13.5 8 10 Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="M8 6 C5 6 4 8 4.5 10 C5 12 6.5 12.6 8 12.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M18 6 C21 6 22 8 21.5 10 C21 12 19.5 12.6 18 12.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={13} y1={16} x2={13} y2={19.5} stroke={color} strokeWidth={2} />
      <Path d="M9.5 22 L16.5 22" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function StatsIcon({ color, size = 26 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Rect x={4.5} y={12} width={4} height={10} rx={2} stroke={color} strokeWidth={2} />
      <Rect x={11} y={6} width={4} height={16} rx={2} stroke={color} strokeWidth={2} />
      <Rect x={17.5} y={10} width={4} height={12} rx={2} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function SettingsIcon({ color, size = 26 }: IconProps) {
  // Gear: centre ring + eight rounded teeth.
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4;
    const inner = 8.2;
    const outer = 11.2;
    return {
      x1: 13 + inner * Math.cos(angle),
      y1: 13 + inner * Math.sin(angle),
      x2: 13 + outer * Math.cos(angle),
      y2: 13 + outer * Math.sin(angle),
    };
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Circle cx={13} cy={13} r={7.5} stroke={color} strokeWidth={2} />
      <Circle cx={13} cy={13} r={3} stroke={color} strokeWidth={2} />
      {teeth.map((t, i) => (
        <Line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  );
}
