import { View, Text } from "react-native";

export default function StoreScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Store</Text>
      <Text style={{ marginTop: 10, color: "#666" }}>
        Community course marketplace (STORE-02, STORE-03)
      </Text>
    </View>
  );
}
