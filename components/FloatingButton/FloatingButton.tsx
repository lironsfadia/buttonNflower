import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { Flower, Bird, Trash } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, I18nManager } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import FloatingActionButton from '~/components/FloatingButton/FloatingActionButton';
import { BUTTONS } from '~/consts/screens';
import { fontSize, typography } from '~/consts/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const buttons = [
  {
    icon: <Trash size={20} color="white" />,
    label: 'פסולת',
  },
  {
    icon: <Bird size={20} color="white" />,
    label: 'בעל חיים פצוע',
  },
  {
    icon: <Flower size={20} color="white" />,
    label: 'פריחה',
  },
];

const FloatingButton = () => {
  const isFocused = useIsFocused();
  const buttonWidth = useSharedValue(56);

  const isExpanded = useSharedValue(false);

  const textState = useSharedValue('none');

  const [textBtn, setTextBtn] = React.useState<{ text: string }>({
    text: '+',
  });

  useEffect(() => {
    if (!isFocused) {
      isExpanded.value = false;
      buttonWidth.value = 56;
      setTextBtn({ text: '+' });
    }
  }, [isFocused]);

  // Create animated style for the button
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: buttonWidth.value,
    };
  });

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;

    textState.value = textBtn.text === '+' ? 'expanded' : 'none';
    setTextBtn({ text: textBtn.text === '+' ? 'הוסף דיווח חדש' : '+' });

    buttonWidth.value = withSpring(buttonWidth.value === 56 ? 150 : 56, {
      damping: 12, // Controls bounce effect
      stiffness: 90, // Controls animation speed/rigidity
    });
  };

  const plusIconStyle = useAnimatedStyle(() => {
    // When expanded, it moves 2 pixels to the right
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);

    return {
      transform: [{ translateX: translateValue }],
    };
  });

  const textReanimatedStyle = useAnimatedStyle(() => {
    if (textState.value === 'expanded') {
      return {
        textDecorationLine: 'none',
      };
    }

    return {
      textDecorationLine: 'none',
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <AnimatedPressable
        onPress={handlePress}
        style={[styles.shadow, mainButtonStyles.button, animatedStyle]}>
        <Animated.Text
          style={[
            plusIconStyle,
            mainButtonStyles.content,
            textReanimatedStyle,
            { fontFamily: typography.bold },
          ]}>
          {textBtn.text}
        </Animated.Text>
      </AnimatedPressable>
      {buttons.map((button, index) => (
        <FloatingActionButton
          key={index + 1}
          isExpanded={isExpanded}
          index={index + 1}
          icon={button.icon}
          label={button.label}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

const mainButtonStyles = StyleSheet.create({
  button: {
    zIndex: 1,
    height: 56,
    borderRadius: 100,
    backgroundColor: BUTTONS.COLORS.FLOATING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: fontSize.lg,
    alignContent: 'flex-start',
    color: '#f8f9ff',
    textAlign: 'right', // Add this for right alignment
    writingDirection: 'rtl', // Add this for RTL text direction
  },
});

export default FloatingButton;
