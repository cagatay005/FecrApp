import React from 'react';
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Polygon,
  RadialGradient,
  Stop,
} from 'react-native-svg';

import { colors } from '../../theme';

type Props = {
  width?: number;
  height?: number;
};

/** Golden sun rising behind mountain peaks — the Fecr (dawn) motif. */
export default function SunriseIllustration({ width = 260, height = 170 }: Props) {
  // Rays fan out from the sun centre, skipping the area hidden by mountains.
  const rayAngles = [-150, -125, -100, -80, -55, -30, -165, -15];
  const sunCx = 130;
  const sunCy = 108;
  const rayInner = 58;
  const rayOuter = 82;

  return (
    <Svg width={width} height={height} viewBox="0 0 260 170" fill="none">
      <Defs>
        <RadialGradient id="sunFill" cx="50%" cy="42%" r="60%">
          <Stop offset="0%" stopColor={colors.sunCore} />
          <Stop offset="100%" stopColor={colors.sunEdge} />
        </RadialGradient>
        <LinearGradient id="mountainSide" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={colors.mountainLight} />
          <Stop offset="100%" stopColor={colors.mountainMid} />
        </LinearGradient>
        <LinearGradient id="mountainCenter" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={colors.mountainMid} />
          <Stop offset="100%" stopColor={colors.mountainDark} />
        </LinearGradient>
      </Defs>

      {rayAngles.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <Line
            key={deg}
            x1={sunCx + rayInner * Math.cos(rad)}
            y1={sunCy + rayInner * Math.sin(rad)}
            x2={sunCx + rayOuter * Math.cos(rad)}
            y2={sunCy + rayOuter * Math.sin(rad)}
            stroke={colors.rayGold}
            strokeWidth={5}
            strokeLinecap="round"
          />
        );
      })}

      <Circle cx={sunCx} cy={sunCy} r={44} fill="url(#sunFill)" />

      {/* Side peaks sit behind the taller centre peak */}
      <Polygon points="20,170 88,104 156,170" fill="url(#mountainSide)" />
      <Polygon points="104,170 172,104 240,170" fill="url(#mountainSide)" />
      <Polygon points="58,170 130,92 202,170" fill="url(#mountainCenter)" />
    </Svg>
  );
}
