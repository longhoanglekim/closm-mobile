import { Link, router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { loginAdmin } from "../../../api/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/redux/reducers/User";
import { getUserInfo } from "@/api/user/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user.isLoggedIn && user.userInfo.role === "ROLE_ADMIN") {
      console.log("Admin already logged in, redirecting...");
      router.replace("/(tabsAdmin)/profile");
    }
  }, [user]);
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setError("");
    try {
      console.log("bat dau dang nhap admin");
      const response = await loginAdmin(email, password);
      if (response.token) {
        const userInfo = await getUserInfo(email);
        if (userInfo) {
          dispatch(loginSuccess({ token: response.token, userInfo }));
          await AsyncStorage.setItem("email", email);
          console.log("dang nhap admin thanh cong");
          router.replace("/(tabsAdmin)");
        }
      } else {
        setError(response.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error("Login error", err);
      setError("Có lỗi xảy ra khi đăng nhập");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.form}
      >
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          style={styles.input}
        />

        {error !== "" && <Text style={styles.error}>{error}</Text>}

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>


        <Text style={{ textAlign: "center" }}>Or</Text>
        <Link href="/(tabs)/profile/login">
          <Text style={styles.registerLink}>Login as user?</Text>
        </Link>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 16,
    textAlign: "center",
    color: "#007AFF",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
