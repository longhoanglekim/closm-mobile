import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { createUser } from "../../../api/auth/auth";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [readyToRegister, setIsReady] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (
      email === "" ||
      password === "" ||
      repeatPassword === "" ||
      fullName === ""
    ) {
      setIsReady(false);
      setInvalidMessage("Chưa nhập đủ thông tin");
    } else if (password !== repeatPassword) {
      setIsReady(false);
      setInvalidMessage("Mật khẩu nhập lại không khớp nhau");
    } else {
      setInvalidMessage("");
      setIsReady(true);
    }
  }, [email, password, fullName, repeatPassword, errorMessage, successMessage]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Chỉ hoạt động trên iOS
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center" style={{ padding: 20 }}>
            <View style={{ marginTop: 100 }}>
              <Text style={{ fontSize: 30, textAlign: "center" }}>
                Chào mừng bạn đến với Closm
              </Text>
            </View>

            {/* Form nhập liệu */}
            <View style={{ marginTop: 40, width: "100%" }}>
              <Text>Họ tên của bạn</Text>
              <TextInput
                placeholder="Họ tên của bạn"
                autoCorrect={false}
                autoComplete="off"
                spellCheck={false}
                keyboardType="default"
                style={styles.input}
                value={fullName}
                onChangeText={setFullname}
              />

              <Text>Email</Text>
              <TextInput
                placeholder="Nhập email"
                keyboardType="email-address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <Text>Password</Text>
              <TextInput
                placeholder="*******"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />

              <Text>Nhập lại mật khẩu</Text>
              <TextInput
                placeholder="*******"
                secureTextEntry
                style={styles.input}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
              />

              {invalidMessage != "" && (
                <Text style={{ color: "red", marginVertical: 5 }}>
                  {invalidMessage}
                </Text>
              )}
              {errorMessage !== "" && (
                <View>
                  <Text>{errorMessage}</Text>
                </View>
              )}
              {/* Nút đăng ký */}
              {successMessage !== "" && (
                <View>
                  <Text>{successMessage}</Text>
                </View>
              )}
              <Pressable
                disabled={!readyToRegister}
                style={{
                  backgroundColor: readyToRegister ? "orange" : "gray",
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  marginTop: 10,
                }}
                onPress={async () => {
                  console.log("🛠 Bắt đầu đăng ký với:", email, password);
                  const userCreator = await createUser(
                    fullName,
                    email,
                    password
                  );

                  if (userCreator.error) {
                    console.log("❌ Lỗi đăng ký:", userCreator.error);
                    setErrorMessage(userCreator.error);
                  } else {
                    console.log("✅ Đăng ký thành công:", userCreator);
                    setSuccessMessage(
                      "Đăng ký thành công! Chuyển hướng sau 2 giây..."
                    );
                    setTimeout(() => {
                      router.back();
                    }, 2000);
                  }
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Đăng ký
                </Text>
              </Pressable>

              {/* Chuyển sang đăng nhập */}
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Link href={"/(tabs)/profile/login"}>Đã có tài khoản?</Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = {
  input: {
    width: width - 40, // Trừ 40px để tránh sát viền màn hình
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 5,
  },
};

export default Register;
