import { TextStyle } from 'react-native';

export const typography = {
  /** Large emotional onboarding headline */
  headline: {
    fontSize: 32,
    lineHeight: 42,
    fontWeight: '700',
    letterSpacing: 0.2,
  } as TextStyle,

  /** Supporting body copy under headlines */
  body: {
    fontSize: 19,
    lineHeight: 29,
    fontWeight: '400',
  } as TextStyle,

  /** Primary CTA button label */
  button: {
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '700',
  } as TextStyle,

  /** Small utility text (e.g. Skip) */
  caption: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
  } as TextStyle,
} as const;
