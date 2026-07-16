export const colors = {
  // Night-to-dawn dark teal gradient (top → bottom)
  backgroundGradient: ['#22484E', '#152F33', '#0B1E22'] as const,

  // Golden dawn accent
  accent: '#FFC940',
  onAccent: '#17282B',

  // Typography
  textPrimary: '#FFFFFF',
  textSecondary: '#8FA9A9',
  textMuted: '#5E7A7C',

  // Pagination
  dotActive: '#FFC940',
  dotInactive: '#4A6265',

  // Sunrise illustration
  sunCore: '#F8D26A',
  sunEdge: '#EFAF3F',
  rayGold: '#E9B84A',
  mountainLight: '#93A8B0',
  mountainMid: '#7C939C',
  mountainDark: '#5F7A83',

  // Dialog / modal
  overlay: 'rgba(3, 12, 14, 0.72)',
  dialogSurface: '#1C3D43',
  dialogBorder: 'rgba(255, 255, 255, 0.10)',

  // Permission cards
  cardBorder: 'rgba(255, 255, 255, 0.22)',
  cardBorderActive: '#FFC940',
  cardBackgroundActive: 'rgba(255, 201, 64, 0.08)',

  // Task chips & alarm display
  chipBackground: 'rgba(0, 0, 0, 0.30)',
  chipBorder: 'rgba(255, 255, 255, 0.14)',
  chipSelectedBorder: '#FFC940',
  chipSelectedBackground: 'rgba(255, 201, 64, 0.10)',
  timeGlow: 'rgba(255, 201, 64, 0.55)',
  wheelHighlight: 'rgba(255, 201, 64, 0.10)',
  wheelHighlightBorder: 'rgba(255, 201, 64, 0.35)',

  // Home screen
  flame: '#F6D993',
  flameGlow: 'rgba(233, 184, 74, 0.45)',
  freezeBadgeBackground: 'rgba(255, 255, 255, 0.10)',
  freezeIce: '#9AD6F2',
  surfaceCard: 'rgba(10, 28, 32, 0.55)',
  surfaceCardBorder: 'rgba(255, 255, 255, 0.10)',
  toggleTrackOff: 'rgba(255, 255, 255, 0.18)',
  toggleThumb: '#FFFFFF',
  tabBarBackground: 'rgba(8, 22, 25, 0.92)',
  tabBarBorder: 'rgba(255, 255, 255, 0.08)',
  tabInactive: '#6E8890',
  iconGold: '#E9B84A',
  iconLine: '#C7D3D3',

  // Sleep-inertia chart
  chartAxis: '#5E7A7C',
  chartCurve: '#FFFFFF',
  chartDashed: '#7C9698',
  chartDivider: '#E9B84A',
  chartZone: '#E9B84A',
  chartLabelAlert: '#D7E2E2',
  chartLabelZone: '#E9B84A',
  chartAxisTitle: '#8FA9A9',
} as const;
