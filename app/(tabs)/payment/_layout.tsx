import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="checkout"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
       <Tabs.Screen
        name="shippingAddress"
        options={{
          tabBarStyle: { display: 'none' }, 
          // headerShown: false, 
        }}
      />
      
    </Tabs>
  );
}