import { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { useThemeColors, spacing, borderRadius } from "@/constants/theme";

interface ToastProps {
  message: string | null;
  duration?: number;
  onDismiss: () => void;
}

export function Toast({ message, duration = 2500, onDismiss }: ToastProps) {
  const colors = useThemeColors();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (message) {
      // Fade in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-dismiss
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 20,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => onDismiss());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!message) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    left: spacing.lg,
    right: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});
