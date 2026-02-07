import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { DraggableAppList } from "@/components/DraggableAppList";
import { SelectableAppRow } from "@/components/SelectableAppRow";
import { useStorage } from "@/hooks";
import {
  AI_APPS,
  AIApp,
  DEFAULT_APP_IDS,
  MAX_SELECTED_APPS,
  MIN_SELECTED_APPS,
} from "@/constants";
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

  const selectedApps = selectedIds
    .map((id) => AI_APPS.find((a) => a.id === id))
    .filter(Boolean) as AIApp[];

  const availableApps = AI_APPS.filter((a) => !selectedIds.includes(a.id));
  const atMax = selectedIds.length >= MAX_SELECTED_APPS;
  const atMin = selectedIds.length <= MIN_SELECTED_APPS;

  const handleReorder = (reordered: AIApp[]) => {
    setSelectedIds(reordered.map((a) => a.id));
  };

  const handleRemove = (appId: string) => {
    if (atMin) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setSelectedIds((prev) => prev.filter((id) => id !== appId));
  };

  const handleAdd = (appId: string) => {
    if (atMax) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedIds((prev) => [...prev, appId]);
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
          <Text style={[styles.title, { color: colors.text }]}>
            Choose Apps
          </Text>
          <Pressable onPress={handleReset}>
            <Text style={[styles.resetText, { color: colors.textSecondary }]}>
              Reset
            </Text>
          </Pressable>
        </View>

        {/* Counter */}
        <View style={styles.info}>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Long press to drag and reorder
          </Text>
          <Text
            style={[
              styles.counter,
              { color: atMax ? colors.warning : colors.primary },
            ]}
          >
            {selectedIds.length}/{MAX_SELECTED_APPS}
          </Text>
        </View>

        {/* Selected apps — draggable */}
        <Text
          style={[styles.sectionHeader, { color: colors.textSecondary }]}
        >
          YOUR LAUNCHER
        </Text>
        <View style={styles.draggableSection}>
          <DraggableAppList
            apps={selectedApps}
            onReorder={handleReorder}
            onRemove={handleRemove}
          />
        </View>

        {/* Available apps — tap to add */}
        {availableApps.length > 0 && (
          <>
            <Text
              style={[styles.sectionHeader, { color: colors.textSecondary }]}
            >
              ADD MORE
            </Text>
            <ScrollView
              style={styles.availableList}
              contentContainerStyle={{
                paddingHorizontal: spacing.lg,
                paddingBottom: insets.bottom + spacing.lg,
              }}
              showsVerticalScrollIndicator={false}
            >
              {availableApps.map((app) => (
                <SelectableAppRow
                  key={app.id}
                  app={app}
                  selected={false}
                  onToggle={handleAdd}
                  disabled={atMax}
                />
              ))}
            </ScrollView>
          </>
        )}
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
  sectionHeader: {
    ...typography.label,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  draggableSection: {
    flexShrink: 0,
  },
  availableList: {
    flex: 1,
  },
});
