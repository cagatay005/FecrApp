export type AlarmTime = {
  /** 0-23 */
  hour: number;
  /** 0-59 */
  minute: number;
};

export type Time12 = {
  hour12: number; // 1-12
  minute: number;
  meridiem: 'AM' | 'PM';
};

export function to12h({ hour, minute }: AlarmTime): Time12 {
  const meridiem: 'AM' | 'PM' = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return { hour12, minute, meridiem };
}

export function to24h({ hour12, minute, meridiem }: Time12): AlarmTime {
  const hour = (hour12 % 12) + (meridiem === 'PM' ? 12 : 0);
  return { hour, minute };
}

export function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

/** "04:22" + "AM" parts for display. */
export function formatTime(time: AlarmTime): { clock: string; meridiem: string } {
  const t = to12h(time);
  return { clock: `${pad2(t.hour12)}:${pad2(t.minute)}`, meridiem: t.meridiem };
}
