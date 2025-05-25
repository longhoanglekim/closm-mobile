import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StateProvider } from "@/context/StateContext";
import * as Notification from "expo-notifications";

import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

// ✅ Tách component con để gọi useSelector hợp lệ
const AppContent = () => {
  const colorScheme = useColorScheme();
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  useEffect(() => {
    console.log(user.userInfo?.role === "ROLE_ADMIN");
    if (user.userInfo?.role === "ROLE_ADMIN") {
      console.log("Admin");
      router.replace("/(tabsAdmin)");
    }
  }, [user]);
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {user?.userInfo?.role === "ROLE_ADMIN" ? (
          <Stack.Screen name="(tabsAdmin)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StateProvider>
          <AppContent />
        </StateProvider>
      </PersistGate>
    </Provider>
  );
}
