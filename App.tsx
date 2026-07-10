import { StatusBar } from 'expo-status-bar';
import React from 'react';

import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <WelcomeScreen
        onContinue={() => {
          // TODO: navigate to onboarding page 2 (Sleep Inertia)
        }}
        onSkip={() => {
          // TODO: skip onboarding once navigation is in place
        }}
      />
    </>
  );
}
