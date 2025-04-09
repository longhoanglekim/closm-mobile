import React from "react";
import { SafeAreaView, Text, View, Switch, Pressable, Button } from "react-native";
import { useRouter } from "expo-router";
import styles from "@/constants/styles";
import { settingClass } from "@/constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/User";

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={settingClass.backButton}>Back</Text>
        </Pressable>
      </View>

      <View>
        <Text>Enable Notifications</Text>

        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>
      <Pressable>
        <Text>Change Password</Text>
      </Pressable>
      <Button
        title="Log out"
        onPress={async () => {
          // await auth.signOut();
          dispatch(logout());
          router.push("/(tabs)/profile/login");
        }}
      />

      <Pressable onPress={() => router.push("/(tabs)")}>
      </Pressable>
    </SafeAreaView>
  );
}