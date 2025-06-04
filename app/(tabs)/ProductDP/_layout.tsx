import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: { display: "none" },
    }}>
      <Tabs.Screen
        name="CategoryOverview"
        options={{
          tabBarButton: () => null,

        }}
      />
      <Tabs.Screen
        name="productDetail"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ProductDetailModal"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ProductDP"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />

    </Tabs>
  );
}