import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { login } from "../../../api/auth/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/reducers/User";
import { getUserInfo } from "@/api/user/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
const LoginScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setError("");
    try {
      const response = await login(email, password);
      if (response.token) {
        const userInfo = await getUserInfo(email);
        if (userInfo) {
          dispatch(loginSuccess({ token: response.token, userInfo }));
          await AsyncStorage.setItem("email", email);
          router.replace("/(tabs)/cart");
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
      <View>
        <Image
          source={require("../../../assets/images/imgs/logo_app.jpeg")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
      </View>
      <Svg width="100%" height="150" viewBox="0 0 900 320" style={styles.wave}>
        <Path
          fill="#007AFF"
          d="M0 81L11.5 89.5C23 98 46 115 69 118.7C92 122.3 115 112.7 138.2 101.2C161.3 89.7 184.7 76.3 207.8 83.7C231 91 254 119 277 136.7C300 154.3 323 161.7 346 153.5C369 145.3 392 121.7 415.2 104.2C438.3 86.7 461.7 75.3 484.8 79.7C508 84 531 104 554 104.8C577 105.7 600 87.3 623 93.2C646 99 669 129 692.2 135.5C715.3 142 738.7 125 761.8 116.8C785 108.7 808 109.3 831 111.2C854 113 877 116 888.5 117.5L900 119L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
        />
      </Svg>
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

        <Link href="/(tabs)/profile/register">
          <Text style={styles.registerLink}>
            Don't have an account? Register
          </Text>
        </Link>
        <Text style={{ textAlign: "center" }}>Or</Text>
        <Link href="/(tabsAdmin)/profile/login">
          <Text style={styles.registerLink}>Login as Admin?</Text>
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
    // paddingHorizontal: 24,
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
    paddingHorizontal: 24,
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
  wave: {
    position: "absolute",
    top: 0,
  },
});
