import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="learn/index"
        options={{
          title: "Learn",
          tabBarLabel: "Learn",
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
        }}
      />
      <Tabs.Screen
        name="store/index"
        options={{
          title: "Store",
          tabBarLabel: "Store",
        }}
      />
    </Tabs>
  );
}
