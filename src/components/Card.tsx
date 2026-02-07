import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";
import { colors, spacing, borderRadius, shadows } from "@/constants/theme";

interface CardProps extends ViewProps {
  variant?: "flat" | "elevated";
  padding?: keyof typeof spacing;
  style?: ViewStyle;
}

export function Card({
  children,
  variant = "elevated",
  padding = "md",
  style,
  ...props
}: CardProps) {
  return (
    <View
      style={[
        styles.base,
        { padding: spacing[padding] },
        variant === "elevated" && shadows.card,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
});
