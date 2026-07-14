import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import OnboardingCarousel from './src/screens/onboarding/OnboardingCarousel';

// These are Expo Go-only development warnings (they never appear in a
// development/production build). Silence them so they don't cover the UI.
LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported in Expo Go',
]);

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <OnboardingCarousel
        onFinish={() => {
          // TODO: leave onboarding once the main app / navigator exists
        }}
      />
    </SafeAreaProvider>
  );
}
