// app/(tabsAdmin)/profile/index.tsx

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { router } from "expo-router";
import LoginScreen from "./login";
import ProfileScreen from "@/components/admin/ProfileAdminComponent";

export default function ProfileWrapper() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.isLoggedIn) {
      console.log("Redirecting inside tab");
    }
  }, [user]);

  if (!user?.isLoggedIn) return <LoginScreen />;
  return <ProfileScreen />;
}
