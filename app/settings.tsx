import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { SelectableAppRow } from "@/components/SelectableAppRow";
import { useStorage } from "@/hooks";
import {
  AI_APPS,
  DEFAULT_APP_IDS,
  MAX_SELECTED_APPS,
  MIN_SELECTED_APPS,
} from "@/constants/apps";
import {
  useThemeColors,
  spacing,
  typography,
  borderRadius,
} from "@/constants/theme";

export default function SettingsScreen() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useStorage<string[]>(
    "selected-apps",
    DEFAULT_APP_IDS
  );

  const atMax = selectedIds.length >= MAX_SELECTED_APPS;
  const atMin = selectedIds.length <= MIN_SELECTED_APPS;

  const handleToggle = (appId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(appId)) {
        // Don't go below minimum
        if (prev.length <= MIN_SELECTED_APPS) return prev;
        return prev.filter((id) => id !== appId);
      } else {
        // Don't exceed maximum
        if (prev.length >= MAX_SELECTED_APPS) return prev;
        return [...prev, appId];
      }
    });
  };

  const handleReset = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setSelectedIds(DEFAULT_APP_IDS);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + spacing.md,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            styles.backButton,
            { backgroundColor: colors.surface },
            pressed && { backgroundColor: colors.surfaceHighlight },
          ]}
        >
          <Text style={[styles.backText, { color: colors.primary }]}>
            ← Back
          </Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Choose Apps</Text>
        <Pressable onPress={handleReset}>
          <Text style={[styles.resetText, { color: colors.textSecondary }]}>
            Reset
          </Text>
        </Pressable>
      </View>

      {/* Selection info */}
      <View style={styles.info}>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Select {MIN_SELECTED_APPS}–{MAX_SELECTED_APPS} apps for your launcher
        </Text>
        <Text
          style={[
            styles.counter,
            {
              color: atMax ? colors.warning : colors.primary,
            },
          ]}
        >
          {selectedIds.length}/{MAX_SELECTED_APPS}
        </Text>
      </View>

      {/* App list */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + spacing.lg },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {AI_APPS.map((app) => (
          <SelectableAppRow
            key={app.id}
            app={app}
            selected={selectedIds.includes(app.id)}
            onToggle={handleToggle}
            disabled={atMax}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  backButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    ...typography.h3,
  },
  resetText: {
    fontSize: 15,
    fontWeight: "500",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  infoText: {
    ...typography.caption,
  },
  counter: {
    fontSize: 15,
    fontWeight: "700",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
});
