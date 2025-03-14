import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="dummy" options={{}}></Stack.Screen>
    </Stack>
  );
};

export default StackLayout;
