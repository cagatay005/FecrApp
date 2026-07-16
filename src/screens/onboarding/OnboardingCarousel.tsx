import React, { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import GradientBackground from '../../components/GradientBackground';
import OnboardingFooter from '../../components/OnboardingFooter';
import { strings } from '../../constants/strings';
import WelcomePage from './WelcomePage';
import SleepInertiaPage from './SleepInertiaPage';
import PermissionsPage from './PermissionsPage';
import SetAlarmPage from './SetAlarmPage';

const TOTAL_DOTS = 4;

type Props = {
  onFinish: () => void;
};

/**
 * Horizontal swipeable onboarding flow. Uses a paging ScrollView (no extra
 * native dependency — safest for Expo Go) and shares a single gradient
 * background, pagination and skip control across all pages. Pages can be
 * advanced either by swiping or by tapping their primary button.
 */
export default function OnboardingCarousel({ onFinish }: Props) {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const pageCount = 4; // implemented pages

  const goToPage = (next: number) => {
    const clamped = Math.max(0, Math.min(next, pageCount - 1));
    scrollRef.current?.scrollTo({ x: clamped * width, animated: true });
    setIndex(clamped);
  };

  const handleNext = () => {
    if (index >= pageCount - 1) {
      onFinish();
      return;
    }
    goToPage(index + 1);
  };

  const syncIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width === 0) return;
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    if (page !== index) setIndex(page);
  };

  return (
    <GradientBackground>
      <View style={styles.flex}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={syncIndex}
          onMomentumScrollEnd={syncIndex}
          scrollEventThrottle={16}
          style={styles.flex}
        >
          <View style={{ width }}>
            <WelcomePage onNext={handleNext} />
          </View>
          <View style={{ width }}>
            <SleepInertiaPage onNext={handleNext} />
          </View>
          <View style={{ width }}>
            <PermissionsPage onNext={handleNext} />
          </View>
          <View style={{ width }}>
            <SetAlarmPage onNext={handleNext} />
          </View>
        </ScrollView>

        <OnboardingFooter
          totalPages={TOTAL_DOTS}
          activeIndex={index}
          skipLabel={strings.onboarding.welcome.skip}
          onSkip={onFinish}
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
