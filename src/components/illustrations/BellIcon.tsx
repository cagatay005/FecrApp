import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../../theme';

type Props = {
  size?: number;
};

/** Line-style ringing bell with golden motion arcs and clapper. */
export default function BellIcon({ size = 72 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Bell body */}
      <Path
        d="M23 46 C23 34 24 22 36 22 C48 22 49 34 49 46 L52 50 L20 50 Z"
        stroke={colors.iconLine}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top knob */}
      <Path
        d="M36 22 L36 16"
        stroke={colors.iconLine}
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Clapper */}
      <Path
        d="M31 50 C31 54 33 56 36 56 C39 56 41 54 41 50"
        stroke={colors.iconGold}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Golden motion arcs */}
      <Path
        d="M52 20 C56 24 58 30 57 36"
        stroke={colors.iconGold}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M20 20 C16 24 14 30 15 36"
        stroke={colors.iconGold}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}
