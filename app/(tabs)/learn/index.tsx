import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg.primary,
    paddingHorizontal: spacing.gutter,
  },
  heading: {
    ...typography.preset.h1,
    color: colors.text.primary,
  } as any,
  subtitle: {
    ...typography.preset.bodyLg,
    marginTop: spacing.md,
    color: colors.text.secondary,
    textAlign: "center",
  } as any,
});

export default function LearnScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Learn</Text>
      <Text style={styles.subtitle}>
        Course list and learning interface (NAV-02, NAV-03)
      </Text>
    </View>
  );
}
