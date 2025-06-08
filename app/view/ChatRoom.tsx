import ChatScreen from "@/components/ChatRoom";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

export default function ChatRoom() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  console.log("🚀 user:", user);
  useEffect(() => {
    if (!user?.userInfo) {
      router.replace("/profile/login");
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatScreen
        role={user.userInfo.role}
        usernameProp={user.userInfo.fullName}
      />
    </SafeAreaView>
  );
}
