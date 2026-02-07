import { Pressable, Text, View, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { AIApp } from "@/constants/apps";
import { useThemeColors, spacing, borderRadius } from "@/constants/theme";

interface SelectableAppRowProps {
  app: AIApp;
  selected: boolean;
  onToggle: (appId: string) => void;
  disabled?: boolean;
}

export function SelectableAppRow({
  app,
  selected,
  onToggle,
  disabled = false,
}: SelectableAppRowProps) {
  const colors = useThemeColors();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(app.id);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled && !selected}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: colors.surface,
          opacity: disabled && !selected ? 0.4 : 1,
        },
        pressed && { backgroundColor: colors.surfaceHighlight },
      ]}
    >
      <View style={[styles.icon, { backgroundColor: app.color }]}>
        <Text style={styles.emoji}>{app.emoji}</Text>
      </View>
      <Text style={[styles.name, { color: colors.text }]}>{app.name}</Text>
      <View
        style={[
          styles.checkbox,
          {
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: selected ? colors.primary : "transparent",
          },
        ]}
      >
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  emoji: {
    fontSize: 20,
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: "500",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
