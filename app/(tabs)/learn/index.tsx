import { View, Text } from "react-native";

export default function LearnScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Learn</Text>
      <Text style={{ marginTop: 10, color: "#666" }}>
        Course list and learning interface (NAV-02, NAV-03)
      </Text>
    </View>
  );
}
