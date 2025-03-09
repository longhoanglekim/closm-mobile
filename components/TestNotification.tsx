import { Image, StyleSheet, Platform, SafeAreaView, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useStateContext } from "@/context/StateContext";

export default function NotificationScreen() {
  const { expoPushToken, notification, error } = useStateContext();
  if (error) {
    return (
      <>
        <Text>Error : {error.message}</Text>
      </>
    );
  }
  return (
    <SafeAreaView style={{ padding: 50 }}>
      <Text style={{ fontSize: 20 }}>
        Hello, expoPushToken la {expoPushToken}
      </Text>
      <ThemedText>
        CO THONG BAO SAU : {notification?.request.content.title}
      </ThemedText>
      <ThemedText>
        {JSON.stringify(notification?.request.content.data, null, 2)}
      </ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
