import { View, Text, StyleSheet, Pressable } from "react-native";
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
import { useThemeColors, spacing, typography, borderRadius } from "@/constants/theme";

export default function OnboardingScreen() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useStorage<string[]>(
    "selected-apps",
    DEFAULT_APP_IDS
  );
  const [, setOnboarded] = useStorage<boolean>("onboarded", false);

  const atMax = selectedIds.length >= MAX_SELECTED_APPS;

  const handleToggle = (appId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(appId)) {
        if (prev.length <= MIN_SELECTED_APPS) return prev;
        return prev.filter((id) => id !== appId);
      } else {
        if (prev.length >= MAX_SELECTED_APPS) return prev;
        return [...prev, appId];
      }
    });
  };

  const handleContinue = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setOnboarded(true);
    router.replace("/");
  };

  const canContinue = selectedIds.length >= MIN_SELECTED_APPS;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + spacing.xl,
          paddingBottom: insets.bottom + spacing.lg,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.wave}>🚀</Text>
        <Text style={[styles.title, { color: colors.text }]}>
          Pick your AI apps
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Choose {MIN_SELECTED_APPS}–{MAX_SELECTED_APPS} apps for your
          launcher. You can change this later.
        </Text>
      </View>

      {/* Counter */}
      <View style={styles.counterRow}>
        <Text
          style={[
            styles.counter,
            {
              color:
                selectedIds.length >= MAX_SELECTED_APPS
                  ? colors.warning
                  : colors.primary,
            },
          ]}
        >
          {selectedIds.length}/{MAX_SELECTED_APPS} selected
        </Text>
      </View>

      {/* App list */}
      <View style={styles.list}>
        {AI_APPS.map((app) => (
          <SelectableAppRow
            key={app.id}
            app={app}
            selected={selectedIds.includes(app.id)}
            onToggle={handleToggle}
            disabled={atMax}
          />
        ))}
      </View>

      {/* Continue button */}
      <Pressable
        onPress={handleContinue}
        disabled={!canContinue}
        style={({ pressed }) => [
          styles.continueButton,
          { backgroundColor: canContinue ? colors.primary : colors.surface },
          pressed && canContinue && { opacity: 0.8, transform: [{ scale: 0.98 }] },
        ]}
      >
        <Text
          style={[
            styles.continueText,
            {
              color: canContinue ? colors.textInverted : colors.textSecondary,
            },
          ]}
        >
          {canContinue ? "Let's go →" : `Pick at least ${MIN_SELECTED_APPS} apps`}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  wave: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    maxWidth: 300,
  },
  counterRow: {
    alignItems: "flex-end",
    marginBottom: spacing.sm,
  },
  counter: {
    fontSize: 14,
    fontWeight: "700",
  },
  list: {
    flex: 1,
  },
  continueButton: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  continueText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
