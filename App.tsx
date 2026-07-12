import { StatusBar } from 'expo-status-bar';
import React from 'react';

import OnboardingCarousel from './src/screens/onboarding/OnboardingCarousel';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <OnboardingCarousel
        onFinish={() => {
          // TODO: leave onboarding once the main app / navigator exists
        }}
      />
    </>
  );
}
