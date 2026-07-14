import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../../theme';

type Props = {
  size?: number;
};

/** Line-style location pin sitting on a perspective map base. */
export default function LocationIcon({ size = 72 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Map base (perspective trapezoid) */}
      <Path
        d="M20 46 L10 58 L62 58 L52 46"
        stroke={colors.iconLine}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pin body */}
      <Path
        d="M36 12 C25 12 17 20 17 31 C17 43 30 50 36 58 C42 50 55 43 55 31 C55 20 47 12 36 12 Z"
        stroke={colors.iconGold}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pin inner dot */}
      <Circle cx={36} cy={30} r={7} stroke={colors.iconGold} strokeWidth={3} />
    </Svg>
  );
}
