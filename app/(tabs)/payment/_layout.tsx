import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="checkout"
        options={{
          tabBarButton: () => null, 
          headerShown: false,
        }}
      />
       <Tabs.Screen
        name="shippingAddress"
        options={{
          tabBarButton: () => null, 
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="useCheckoutLogic"
        options={{
          tabBarButton: () => null, 
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}