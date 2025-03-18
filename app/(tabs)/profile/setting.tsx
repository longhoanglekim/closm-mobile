import React from "react";
import { SafeAreaView, Text, View, Switch, Pressable } from "react-native";
import { useRouter } from "expo-router";
import styles from "@/constants/styles";

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>

      <Pressable onPress={() => router.push("/(tabs)")}>  
      </Pressable>
    </SafeAreaView>
  );
}