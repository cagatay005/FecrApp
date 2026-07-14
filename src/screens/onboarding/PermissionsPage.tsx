import React, { useCallback, useEffect, useState } from 'react';
import { AppState, Linking, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

import PermissionCard from '../../components/PermissionCard';
import PrimaryButton from '../../components/PrimaryButton';
import ThemedDialog from '../../components/ThemedDialog';
import BellIcon from '../../components/illustrations/BellIcon';
import LocationIcon from '../../components/illustrations/LocationIcon';
import { strings } from '../../constants/strings';
import { colors, spacing, typography } from '../../theme';

type Props = {
  onNext: () => void;
};

/**
 * Onboarding page 3 — Permissions.
 *
 * Each card triggers the real OS permission dialog. Because Android/iOS refuse
 * to show the dialog again once a permission has been denied, a card whose
 * permission is blocked (`canAskAgain === false`) instead sends the user to the
 * system Settings. Statuses are refreshed whenever the app returns to the
 * foreground, so returning from Settings updates the cards.
 */
export default function PermissionsPage({ onNext }: Props) {
  const copy = strings.onboarding.permissions;
  const [locationGranted, setLocationGranted] = useState(false);
  const [notificationsGranted, setNotificationsGranted] = useState(false);
  // Which permission (if any) is currently blocked and prompting for Settings.
  const [blockedLabel, setBlockedLabel] = useState<string | null>(null);

  const refreshStatuses = useCallback(async () => {
    try {
      const loc = await Location.getForegroundPermissionsAsync();
      setLocationGranted(loc.granted);
    } catch {
      /* ignore */
    }
    try {
      const notif = await Notifications.getPermissionsAsync();
      setNotificationsGranted(notif.granted);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    refreshStatuses();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') refreshStatuses();
    });
    return () => sub.remove();
  }, [refreshStatuses]);

  const closeBlockedDialog = () => setBlockedLabel(null);
  const openSettingsFromDialog = () => {
    setBlockedLabel(null);
    Linking.openSettings();
  };

  const requestLocation = async () => {
    try {
      const current = await Location.getForegroundPermissionsAsync();
      if (current.granted) {
        setLocationGranted(true);
        return true;
      }
      if (!current.canAskAgain) {
        setBlockedLabel(copy.locationLabel);
        return false;
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setLocationGranted(granted);
      return granted;
    } catch {
      return false;
    }
  };

  const requestNotifications = async () => {
    try {
      const current = await Notifications.getPermissionsAsync();
      if (current.granted) {
        setNotificationsGranted(true);
        return true;
      }
      if (!current.canAskAgain) {
        setBlockedLabel(copy.notificationsLabel);
        return false;
      }
      const { status } = await Notifications.requestPermissionsAsync();
      const granted = status === 'granted';
      setNotificationsGranted(granted);
      return granted;
    } catch {
      return false;
    }
  };

  const grantAll = async () => {
    // The OS shows the dialogs one at a time; request any still-missing
    // permission, then continue regardless of the final choice.
    if (!locationGranted) await requestLocation();
    if (!notificationsGranted) await requestNotifications();
    onNext();
  };

  return (
    <View style={styles.content}>
      <View style={styles.cards}>
        <PermissionCard
          icon={<LocationIcon />}
          label={copy.locationLabel}
          granted={locationGranted}
          onPress={requestLocation}
        />
        <PermissionCard
          icon={<BellIcon />}
          label={copy.notificationsLabel}
          granted={notificationsGranted}
          onPress={requestNotifications}
        />
      </View>

      <Text style={styles.title}>{copy.title}</Text>
      <Text style={styles.subtitle}>{copy.subtitle}</Text>

      <View style={styles.spacer} />

      <PrimaryButton label={copy.cta} onPress={grantAll} />

      <ThemedDialog
        visible={blockedLabel !== null}
        title={`${blockedLabel ?? ''} ${copy.blockedSuffix}`}
        message={copy.blockedMessage}
        cancelLabel={copy.notNow}
        confirmLabel={copy.openSettings}
        onCancel={closeBlockedDialog}
        onConfirm={openSettingsFromDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  cards: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.headline,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  spacer: {
    flex: 1,
  },
});
