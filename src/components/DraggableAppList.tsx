import { Text, View, StyleSheet, Pressable } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import * as Haptics from "expo-haptics";
import { AIApp } from "@/constants/apps";
import { useThemeColors, spacing, borderRadius } from "@/constants/theme";

interface DraggableAppListProps {
  apps: AIApp[];
  onReorder: (apps: AIApp[]) => void;
  onRemove: (appId: string) => void;
}

export function DraggableAppList({
  apps,
  onReorder,
  onRemove,
}: DraggableAppListProps) {
  const colors = useThemeColors();

  const renderItem = ({ item, drag, isActive }: RenderItemParams<AIApp>) => {
    return (
      <ScaleDecorator>
        <Pressable
          onLongPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            drag();
          }}
          disabled={isActive}
          style={[
            styles.row,
            {
              backgroundColor: isActive
                ? colors.surfaceHighlight
                : colors.surface,
            },
          ]}
        >
          <View style={styles.dragHandle}>
            <Text style={[styles.dragIcon, { color: colors.textSecondary }]}>
              ☰
            </Text>
          </View>
          <View style={[styles.icon, { backgroundColor: item.color }]}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onRemove(item.id);
            }}
            style={styles.removeButton}
            hitSlop={8}
          >
            <Text style={[styles.removeText, { color: colors.error }]}>✕</Text>
          </Pressable>
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={apps}
      onDragEnd={({ data }) => onReorder(data)}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      containerStyle={styles.list}
      onDragBegin={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  dragHandle: {
    paddingRight: spacing.sm,
  },
  dragIcon: {
    fontSize: 18,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  emoji: {
    fontSize: 18,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  removeButton: {
    padding: spacing.xs,
  },
  removeText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
