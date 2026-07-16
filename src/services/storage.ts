import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'fecr:state:v1';

export type PersistedAlarm = {
  id: string;
  hour: number;
  minute: number;
  enabled: boolean;
  notificationId: string | null;
};

export type PersistedState = {
  onboarded: boolean;
  alarms: PersistedAlarm[];
};

export async function loadState(): Promise<PersistedState | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PersistedState) : null;
  } catch {
    return null;
  }
}

export async function saveState(state: PersistedState): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* best-effort persistence */
  }
}
