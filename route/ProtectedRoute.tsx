// ProtectedRoute.tsx
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "expo-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state) => state.user);
  const isLoggedIn = false;
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/(tabs)/profile/login");
      // console.log("replace");
    }
  });

  if (!isLoggedIn) {
    // Trong lúc chuyển hướng, bạn có thể hiển thị loading indicator
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
