/**
 * AI Launcher design tokens.
 * Dark-first design — this is a utility app, dark feels right.
 */
import { useColorScheme } from "react-native";

export interface ColorTokens {
  primary: string;
  primaryLight: string;
  background: string;
  surface: string;
  surfaceHighlight: string;
  card: string;
  text: string;
  textSecondary: string;
  textInverted: string;
  border: string;
  separator: string;
  success: string;
  warning: string;
  error: string;
  overlay: string;
}

const darkColors: ColorTokens = {
  primary: "#0A84FF",
  primaryLight: "#4DA3FF",
  background: "#000000",
  surface: "#1C1C1E",
  surfaceHighlight: "#2C2C2E",
  card: "#1C1C1E",
  text: "#FFFFFF",
  textSecondary: "#8E8E93",
  textInverted: "#000000",
  border: "#38383A",
  separator: "#38383A",
  success: "#30D158",
  warning: "#FF9F0A",
  error: "#FF453A",
  overlay: "rgba(0, 0, 0, 0.6)",
};

const lightColors: ColorTokens = {
  primary: "#007AFF",
  primaryLight: "#4DA3FF",
  background: "#F2F2F7",
  surface: "#FFFFFF",
  surfaceHighlight: "#E5E5EA",
  card: "#FFFFFF",
  text: "#000000",
  textSecondary: "#8E8E93",
  textInverted: "#FFFFFF",
  border: "#C6C6C8",
  separator: "#E5E5EA",
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  overlay: "rgba(0, 0, 0, 0.4)",
};

export function useThemeColors(): ColorTokens {
  const scheme = useColorScheme();
  return scheme === "light" ? lightColors : darkColors;
}

export const colors = darkColors;
export { lightColors, darkColors };

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 9999,
} as const;

export const typography = {
  h1: {
    fontSize: 34,
    fontWeight: "700" as const,
    lineHeight: 41,
  },
  h2: {
    fontSize: 22,
    fontWeight: "700" as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 17,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 17,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 15,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 13,
    fontWeight: "400" as const,
    lineHeight: 18,
  },
} as const;

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  tile: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;
