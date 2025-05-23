import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="checkout"
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null, 
          headerShown: false,
        }}
      />
       <Tabs.Screen
        name="ShippingAddress"
        options={{
          tabBarStyle: { display: "none" },
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
      <Tabs.Screen
        name="paymentOnline"
        options={{
          tabBarButton: () => null, 
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}