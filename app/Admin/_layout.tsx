import ProtectedRoute from "@/route/ProtectedRoute";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <ProtectedRoute>
      <Stack>
        <Stack.Screen
          name="Dashboard_Admin"
          options={{ headerShown: false }}
        ></Stack.Screen>
        
      </Stack>
    </ProtectedRoute>
  );
};

export default StackLayout;
