import { View, StyleSheet, useWindowDimensions } from "react-native";
import { AppTile } from "./AppTile";
import { AIApp } from "@/constants/apps";
import { spacing } from "@/constants/theme";

interface AppGridProps {
  apps: AIApp[];
  onNotInstalled?: (appName: string) => void;
}

export function AppGrid({ apps, onNotInstalled }: AppGridProps) {
  const { width } = useWindowDimensions();

  // Calculate tile size based on screen width
  // 3 columns with padding and gaps
  const horizontalPadding = spacing.lg * 2;
  const gaps = spacing.md * 2; // 2 gaps for 3 columns
  const tileSize = Math.min(
    Math.floor((width - horizontalPadding - gaps) / 3),
    100
  );

  return (
    <View style={styles.grid}>
      {apps.map((app) => (
        <View key={app.id} style={styles.tileWrapper}>
          <AppTile app={app} size={tileSize} onNotInstalled={onNotInstalled} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  tileWrapper: {
    alignItems: "center",
  },
});
