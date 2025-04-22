import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="CategoryOverview"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
       <Tabs.Screen
        name="productDetail"
        options={{
          tabBarStyle: { display: 'none' }, 
          // headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="productDetailModal"
        options={{
          tabBarStyle: { display: 'none' }, 
          headerShown: false, 
        }}
        />
      
    </Tabs>
  );
}