import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  cancelAlarmNotification,
  scheduleAlarmNotification,
} from '../services/alarm';
import { Coords, getCoordsIfPermitted } from '../services/prayerTimes';
import { PersistedState, loadState, saveState } from '../services/storage';
import { AlarmTime } from '../utils/time';

export type Alarm = {
  id: string;
  time: AlarmTime;
  enabled: boolean;
  notificationId: string | null;
};

type AppState = {
  /** False until persisted state has been loaded. */
  ready: boolean;
  onboarded: boolean;
  completeOnboarding: () => void;
  /** All alarms, sorted by time of day. */
  alarms: Alarm[];
  /** Adds an alarm (replacing any with the identical time) and schedules it. */
  addAlarm: (time: AlarmTime) => Promise<'scheduled' | 'no-permission' | 'unavailable'>;
  /** Enables/disables one alarm, (un)scheduling its notification. */
  toggleAlarm: (id: string) => Promise<void>;
  /** Device coordinates (null until located / without permission). */
  coords: Coords | null;
  streak: number;
  freezes: number;
};

const AppContext = createContext<AppState | null>(null);

// Placeholder values until the gamification engine lands (PRD §6.2).
const INITIAL_STREAK = 15;
const INITIAL_FREEZES = 2;

function byTimeOfDay(a: Alarm, b: Alarm): number {
  return a.time.hour * 60 + a.time.minute - (b.time.hour * 60 + b.time.minute);
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AppProvider({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [streak] = useState(INITIAL_STREAK);
  const [freezes] = useState(INITIAL_FREEZES);
  const hydrated = useRef(false);

  // Hydrate persisted state and locate the device (if permitted) on launch.
  useEffect(() => {
    (async () => {
      const stored = await loadState();
      if (stored) {
        setOnboarded(stored.onboarded);
        setAlarms(
          stored.alarms
            .map((a) => ({
              id: a.id,
              time: { hour: a.hour, minute: a.minute },
              enabled: a.enabled,
              notificationId: a.notificationId,
            }))
            .sort(byTimeOfDay),
        );
      }
      hydrated.current = true;
      setReady(true);
    })();

    getCoordsIfPermitted().then(setCoords);
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated.current) return;
    const state: PersistedState = {
      onboarded,
      alarms: alarms.map((a) => ({
        id: a.id,
        hour: a.time.hour,
        minute: a.time.minute,
        enabled: a.enabled,
        notificationId: a.notificationId,
      })),
    };
    saveState(state);
  }, [onboarded, alarms]);

  const completeOnboarding = useCallback(() => setOnboarded(true), []);

  const addAlarm = useCallback(async (time: AlarmTime) => {
    // Replace an alarm at the identical minute instead of duplicating it.
    const existing = alarms.find(
      (a) => a.time.hour === time.hour && a.time.minute === time.minute,
    );
    if (existing) await cancelAlarmNotification(existing.notificationId);

    const result = await scheduleAlarmNotification(time);
    const alarm: Alarm = {
      id: existing?.id ?? makeId(),
      time,
      enabled: true,
      notificationId: result.notificationId,
    };
    setAlarms((prev) =>
      [...prev.filter((a) => a.id !== alarm.id), alarm].sort(byTimeOfDay),
    );
    return result.status;
  }, [alarms]);

  const toggleAlarm = useCallback(
    async (id: string) => {
      const alarm = alarms.find((a) => a.id === id);
      if (!alarm) return;

      if (alarm.enabled) {
        await cancelAlarmNotification(alarm.notificationId);
        setAlarms((prev) =>
          prev.map((a) => (a.id === id ? { ...a, enabled: false, notificationId: null } : a)),
        );
      } else {
        const result = await scheduleAlarmNotification(alarm.time);
        setAlarms((prev) =>
          prev.map((a) =>
            a.id === id ? { ...a, enabled: true, notificationId: result.notificationId } : a,
          ),
        );
      }
    },
    [alarms],
  );

  return (
    <AppContext.Provider
      value={{
        ready,
        onboarded,
        completeOnboarding,
        alarms,
        addAlarm,
        toggleAlarm,
        coords,
        streak,
        freezes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
