/**
 * Color palette for LibreLingo
 * Used throughout the app for consistent theming
 */

export const colors = {
  // Primary colors
  primary: "#007AFF", // iOS blue
  secondary: "#5AC8FA", // Light blue

  // Semantic colors
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  info: "#5AC8FA",

  // Neutral colors
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Component-specific
  text: {
    primary: "#000000",
    secondary: "#6B7280",
    disabled: "#D1D5DB",
    inverse: "#FFFFFF",
  },
  bg: {
    default: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
  },
};

export type Colors = typeof colors;
