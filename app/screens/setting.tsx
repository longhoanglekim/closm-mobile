import { SafeAreaView, Text, Button } from "react-native";
import { useRouter } from "expo-router"; 

export default function SettingScreen() {
  const router = useRouter(); 

  return (
    <SafeAreaView>
      <Text>Cài đặt tài khoản</Text>
      <Button title="Quay lại Profile" onPress={() => router.back()} />
    </SafeAreaView>
  );
}

