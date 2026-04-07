import { View, Text } from "react-native";
import { colors, spacing, typography } from "@theme";

export default function LearnScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bg.primary,
        paddingHorizontal: spacing.gutter,
      }}
    >
      <Text
        style={{
          ...typography.preset.h1,
          color: colors.text.primary,
        }}
      >
        Learn
      </Text>
      <Text
        style={{
          ...typography.preset.bodyLg,
          marginTop: spacing.md,
          color: colors.text.secondary,
          textAlign: "center",
        }}
      >
        Course list and learning interface (NAV-02, NAV-03)
      </Text>
    </View>
  );
}
