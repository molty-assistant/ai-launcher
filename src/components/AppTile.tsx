import { Pressable, Text, StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { AIApp } from "@/constants/apps";
import { useThemeColors, spacing, shadows } from "@/constants/theme";

interface AppTileProps {
  app: AIApp;
  size?: number;
}

export function AppTile({ app, size = 80 }: AppTileProps) {
  const colors = useThemeColors();

  const handlePress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const supported = await Linking.canOpenURL(app.urlScheme);
      if (supported) {
        await Linking.openURL(app.urlScheme);
      } else {
        // App not installed — open store page
        await Linking.openURL(app.fallbackUrl);
      }
    } catch {
      // Last resort: try the fallback URL
      try {
        await Linking.openURL(app.fallbackUrl);
      } catch {
        // Silently fail — nothing we can do
      }
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { width: size, height: size + 24 },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          shadows.tile,
          {
            width: size,
            height: size,
            borderRadius: size * 0.22,
            backgroundColor: app.color,
          },
        ]}
      >
        <Text style={[styles.emoji, { fontSize: size * 0.45 }]}>
          {app.emoji}
        </Text>
      </View>
      <Text style={[styles.label, { color: colors.text }]} numberOfLines={1}>
        {app.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.92 }],
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    textAlign: "center",
  },
  label: {
    marginTop: spacing.xs,
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF", // overridden by inline style
    textAlign: "center",
    width: "100%",
  },
});
