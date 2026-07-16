import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GradientBackground from './src/components/GradientBackground';
import OnboardingCarousel from './src/screens/onboarding/OnboardingCarousel';
import HomeScreen from './src/screens/home/HomeScreen';
import { AppProvider, useAppState } from './src/state/AppContext';

// These are Expo Go-only development warnings (they never appear in a
// development/production build). Silence them so they don't cover the UI.
LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported in Expo Go',
]);

function Root() {
  const { ready, onboarded, completeOnboarding } = useAppState();

  if (!ready) {
    // Persisted state is still loading; show the gradient to avoid a flash.
    return (
      <GradientBackground>
        <View />
      </GradientBackground>
    );
  }

  return onboarded ? <HomeScreen /> : <OnboardingCarousel onFinish={completeOnboarding} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Root />
      </AppProvider>
    </SafeAreaProvider>
  );
}
