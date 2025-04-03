import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StateProvider } from "@/context/StateContext";
import * as Notification from "expo-notifications";
import "../global.css";
Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
import { Provider } from "react-redux";
import store from "@/redux/store";
import { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
<<<<<<< HEAD
=======
import ProductDetail from "@/components/ProductDP/CategoryOverview";
>>>>>>> 29c1c6d6997a87723af3f2da0f718c28c56bac21
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StateProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
<<<<<<< HEAD
=======
              <Stack.Screen
                name="CategoryOverview"
                options={{ headerShown: false }}
              />
>>>>>>> 29c1c6d6997a87723af3f2da0f718c28c56bac21
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </StateProvider>
      </PersistGate>
    </Provider>
  );
}
