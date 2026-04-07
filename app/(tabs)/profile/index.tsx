import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Profile</Text>
      <Text style={{ marginTop: 10, color: "#666" }}>
        User stats and settings (GAME-05, AUTH-02)
      </Text>
    </View>
  );
}
