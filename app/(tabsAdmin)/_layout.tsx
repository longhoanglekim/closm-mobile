import { router, Tabs } from "expo-router";
import React from "react";
import { Platform, ViewStyle } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, Text } from "react-native";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 13, fontWeight: "bold", color: color, fontFamily: "YourCustomFont",  }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{ uri: "https://res.cloudinary.com/dwddrjz3b/image/upload/v1746421333/home-button_sbyo9y.png" }}
              style={{
                width: size,
                height: size,
                 // Áp dụng màu sắc nếu cần
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 13, fontWeight: "bold", color: color, fontFamily: "YourCustomFont",  }}>
              Cart
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{ uri: "https://res.cloudinary.com/dwddrjz3b/image/upload/v1746421333/shopping-cart_kes3ai.png" }}
              style={{
                width: size,
                height: size,
                
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: "Sale",
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 13, fontWeight: "bold", color: color, fontFamily: "YourCustomFont",  }}>
              Sale
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{ uri: "https://res.cloudinary.com/dwddrjz3b/image/upload/v1746421333/sales_g4q09f.png" }}
              style={{
                width: size,
                height: size,
                
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 13, fontWeight: "bold", color: color, fontFamily: "YourCustomFont",  }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{ uri: "https://res.cloudinary.com/dwddrjz3b/image/upload/v1746421333/verified_oia5fq.png" }}
              style={{
                width: size,
                height: size,
                
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    
    </Tabs>
  );
}
