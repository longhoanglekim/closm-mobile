import React from "react";
import { View, Text, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function ProfileLayout() {
  const router = useRouter();

  const user = useSelector((state) => state.user);

  const isLoggedIn = Boolean(user?.userId); 


  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Bạn chưa đăng nhập</Text>
        <Button
          title="Đi đến trang Đăng nhập"
          onPress={() => router.push('/(tabs)/profile')}
        />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="setting" options={{ headerShown: false }} />
    </Stack>
  );
}

