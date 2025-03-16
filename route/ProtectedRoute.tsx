// ProtectedRoute.tsx
import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { usePathname, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state) => state.user);
  console.log(user);
  const isLoggedIn = user.firstname !== "";
  const router = useRouter();
  const pathname = usePathname();
  // console.log(" path " + pathname);
  useFocusEffect(
    React.useCallback(() => {
      if (
        !isLoggedIn &&
        pathname !== "/profile/login" &&
        pathname !== "/profile/register"
      ) {
        router.replace("/profile/login");
      }
      console.log("Callback");
    }, [isLoggedIn, pathname])
  );
  console.log("dang load");

  return <>{children}</>;
}
