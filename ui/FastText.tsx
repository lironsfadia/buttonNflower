import { Animated, Text } from 'react-native';
// @ts-expect-error No types
import { NativeText } from 'react-native/Libraries/Text/TextNativeComponent';
import Reanimated from 'react-native-reanimated';

export const FastText: typeof Text = NativeText;
export const AnimatedFastText = Animated.createAnimatedComponent(FastText);
export const ReanimatedFastText = Reanimated.createAnimatedComponent(FastText);
