import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state) => state.user);
  const isLoading = user.loading;
  const isLoggedIn = user.isLoggedIn;
  const router = useRouter();
  const pathname = usePathname();

  // console.log("Protected Route:", { isLoggedIn, isLoading, pathname });

  useFocusEffect(
    React.useCallback(() => {
      if (isLoading) {
        console.log("Redux đang load, không redirect");
        return;
      }

      if (
        !isLoggedIn &&
        pathname !== "/profile/login" &&
        pathname !== "/profile/register"
      ) {
        // console.log("User chưa đăng nhập, chuyển về Login");
        router.replace("/profile/login");
      }
    }, [isLoggedIn, isLoading, pathname])
  );

  useEffect(() => {
    if (!isLoading && isLoggedIn && pathname === "/profile/login") {
      // console.log("Đã đăng nhập, chuyển về Profile");
      router.replace("/profile");
    }
  }, [isLoggedIn, isLoading, pathname]);

  return <>{children}</>;
}
