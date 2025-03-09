import { View } from "react-native";
import { Image, StyleSheet, Platform, SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ padding: 50 }}>
      <Text style={{ color: "red", fontSize: 20, fontWeight: "bold" }}>
        Nếu màu này đổi, Tailwind đang bị ghi đè!
      </Text>
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
