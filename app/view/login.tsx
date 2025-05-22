import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { login } from "../../api/auth/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/reducers/User";
import { getUserInfo } from "@/api/user/user";
import Svg, { Path } from "react-native-svg";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await login(email, password);
      if (typeof response === "string") {
        setError(response);
        setLoading(false);
        return;
      }
      if (response.token) {
        const userInfo = await getUserInfo(email);
        if (userInfo) {
          dispatch(loginSuccess({ token: response.token, userInfo }));
          router.replace("/(tabs)");
        } else {
          setError("Không thể lấy thông tin người dùng");
        }
      } else {
        setError(response.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Đã xảy ra lỗi khi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome Back to Closm</Text>
        <Svg
          width="100%"
          height="150"
          viewBox="0 0 1440 320"
          style={styles.wave}
        >
          <Path
            fill="#007AFF"
            d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,165.3C672,139,768,85,864,80C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formWrapper}
      >
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            autoCapitalize="none"
          />

          {error !== "" && <Text style={styles.errorText}>{error}</Text>}

          <Pressable
            style={[
              styles.loginButton,
              (!email || !password || loading) && { opacity: 0.6 },
            ]}
            onPress={handleLogin}
            disabled={!email || !password || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </Pressable>

          <Link href="/(tabs)/profile/register">
            <Text style={styles.registerLink}>
              Don't have an account? Register
            </Text>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#007AFF",
    height: 220,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 10,
  },
  wave: {
    position: "absolute",
    bottom: -1,
  },
  formWrapper: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formContainer: {
    paddingTop: 40,
    gap: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  errorText: {
    color: "#DC2626",
    textAlign: "center",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerLink: {
    marginTop: 16,
    textAlign: "center",
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
