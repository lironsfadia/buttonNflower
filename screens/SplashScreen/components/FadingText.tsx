import React, { useEffect, useMemo } from 'react';
import { Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface FadingTextProps {
  text: string;
  duration?: number;
  repeat?: boolean;
  style?: object;
}

const FadingText: React.FC<FadingTextProps> = ({
  text,
  duration = 1000,
  repeat = false,
  style = {},
}) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = 0;

    if (repeat) {
      // Repeat fade in/out
      opacity.value = withRepeat(
        withTiming(1, { duration }),
        -1, // -1 for infinite repeat
        true // reverse animation
      );
    } else {
      // Single fade in
      opacity.value = withTiming(1, { duration });
    }
  }, []);

  return <AnimatedText style={[style, animatedStyle]}>{text}</AnimatedText>;
};

export default FadingText;
