import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { AppGrid } from "@/components/AppGrid";
import { useStorage } from "@/hooks";
import { AI_APPS, DEFAULT_APP_IDS } from "@/constants/apps";
import { useThemeColors, spacing, typography, borderRadius } from "@/constants/theme";

export default function HomeScreen() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedIds, , loading] = useStorage<string[]>(
    "selected-apps",
    DEFAULT_APP_IDS
  );

  const selectedApps = selectedIds
    .map((id) => AI_APPS.find((a) => a.id === id))
    .filter(Boolean) as typeof AI_APPS;

  const handleSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/settings");
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]} />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + spacing.lg,
          paddingBottom: insets.bottom + spacing.md,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>AI Launcher</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Tap to launch
          </Text>
        </View>
        <Pressable
          onPress={handleSettings}
          style={({ pressed }) => [
            styles.settingsButton,
            { backgroundColor: colors.surface },
            pressed && { backgroundColor: colors.surfaceHighlight },
          ]}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </Pressable>
      </View>

      {/* App Grid */}
      <View style={styles.gridContainer}>
        <AppGrid apps={selectedApps} />
      </View>

      {/* Footer hint */}
      <Text style={[styles.hint, { color: colors.textSecondary }]}>
        {selectedApps.length} apps • Tap ⚙️ to customise
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: 22,
  },
  gridContainer: {
    flex: 1,
    justifyContent: "center",
  },
  hint: {
    ...typography.caption,
    textAlign: "center",
    paddingBottom: spacing.sm,
  },
});
