import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import Animated, {
  withDelay,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { fontSize, typography } from '~/consts/theme';

// Configuration for spring animation
const SPRING_CONFIG = {
  duration: 1000,
  overshootClamping: true,
  dampingRatio: 0.8,
};

// Configuration for fade animations
const FADE_CONFIG = {
  duration: 200,
};

const OFFSET = 60;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FloatingActionButton = ({ isExpanded, index, icon, label }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 10;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;

    const opacity = isExpanded.value
      ? withDelay(delay, withTiming(1, FADE_CONFIG))
      : withTiming(0, { ...FADE_CONFIG, duration: 200 });

    const scale = isExpanded.value
      ? withDelay(delay, withTiming(1, SPRING_CONFIG))
      : withTiming(0, { ...SPRING_CONFIG, duration: 200 });

    // Add horizontal translation
    const translateX = withSpring(isExpanded.value ? 0 : -20, SPRING_CONFIG);

    return {
      opacity,
      transform: [{ translateY: translateValue }, { translateX }, { scale }],
    };
  });

  return (
    <AnimatedPressable style={[animatedStyles, styles.button, styles.shadow]}>
      <Link href="/(report)/create">
        <View style={styles.linkContainer}>
          <View style={styles.iconCircle}>{icon}</View>
          <Animated.Text style={[styles.label, { fontFamily: typography.regular }]}>
            {label}
          </Animated.Text>
        </View>
      </Link>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 24,
    zIndex: -2,
    left: 0,
  },
  linkContainer: {
    width: 150,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    backgroundColor: '#82cab2',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#333',
    fontWeight: '500',
    fontSize: fontSize.md,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default FloatingActionButton;
