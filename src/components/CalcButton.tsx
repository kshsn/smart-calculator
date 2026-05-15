import React, { useCallback } from 'react';
import { Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export type ButtonVariant = 'number' | 'operator' | 'function';

interface CalcButtonProps {
  label: string;
  variant: ButtonVariant;
  isActive?: boolean;
  wide?: boolean;
  onPress: () => void;
}

const COLORS = {
  number:   { bg: '#3A3A3C', text: '#FFFFFF' },
  operator: { bg: '#FF9500', text: '#FFFFFF' },
  function: { bg: '#636366', text: '#FFFFFF' },
  active:   { bg: '#FFFFFF', text: '#FF9500' },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function CalcButton({ label, variant, isActive, wide, onPress }: CalcButtonProps) {
  const reduceMotion = false; // Could hook into AccessibilityInfo.isReduceMotionEnabled
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    if (!reduceMotion) {
      scale.value = withTiming(0.92, { duration: 80, easing: Easing.out(Easing.quad) });
    }
  }, []);

  const handlePressOut = useCallback(() => {
    if (!reduceMotion) {
      scale.value = withTiming(1, { duration: 100, easing: Easing.out(Easing.quad) });
    }
    onPress();
  }, [onPress]);

  const colors = isActive ? COLORS.active : COLORS[variant];

  return (
    <AnimatedPressable
      style={[
        styles.button,
        wide && styles.wide,
        { backgroundColor: colors.bg },
        animatedStyle,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={2}
    >
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 82,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wide: {
    width: 176,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  label: {
    fontSize: 30,
    fontWeight: '400',
  },
});
