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
  Dimensions,
} from "react-native";
import { register } from "../../../api/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path } from "react-native-svg";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [readyToRegister, setIsReady] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (
      email === "" ||
      password === "" ||
      repeatPassword === "" ||
      fullName === "" ||
      phone === ""
    ) {
      setIsReady(false);
      setInvalidMessage("Haven't filled in all the fields yet!");
    } else if (password !== repeatPassword) {
      setIsReady(false);
      setInvalidMessage("Password and repeat password do not match!");
    } else {
      setInvalidMessage("");
      setIsReady(true);
    }
  }, [
    email,
    password,
    fullName,
    repeatPassword,
    phone,
    errorMessage,
    successMessage,
  ]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center" style={{}}>
            <Svg
              width="100%"
              height="150"
              viewBox="0 0 900 320"
              style={styles.wave}
            >
              <Path
                fill="#007AFF"
                d="M0 81L11.5 89.5C23 98 46 115 69 118.7C92 122.3 115 112.7 138.2 101.2C161.3 89.7 184.7 76.3 207.8 83.7C231 91 254 119 277 136.7C300 154.3 323 161.7 346 153.5C369 145.3 392 121.7 415.2 104.2C438.3 86.7 461.7 75.3 484.8 79.7C508 84 531 104 554 104.8C577 105.7 600 87.3 623 93.2C646 99 669 129 692.2 135.5C715.3 142 738.7 125 761.8 116.8C785 108.7 808 109.3 831 111.2C854 113 877 116 888.5 117.5L900 119L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
              />
            </Svg>
            <View style={{ marginTop: 100 }}>
              <Text style={{ fontSize: 30, textAlign: "center" }}>
                Welcome to Closm!
              </Text>
            </View>

            {/* Form nhập liệu */}
            <View
              style={{ marginTop: 40, width: "100%", paddingHorizontal: 20 }}
            >
              <Text>Full name</Text>
              <TextInput
                placeholder="Enter your full name"
                autoCorrect={false}
                autoComplete="off"
                spellCheck={false}
                keyboardType="default"
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
              />

              <Text>Phone</Text>
              <TextInput
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
              />

              <Text>Email</Text>
              <TextInput
                placeholder="Enter your email"
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

              <Text>Repeat password</Text>
              <TextInput
                placeholder="*******"
                secureTextEntry
                style={styles.input}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
              />

              {invalidMessage !== "" && (
                <Text style={{ color: "red", marginVertical: 5 }}>
                  {invalidMessage}
                </Text>
              )}
              {errorMessage !== "" && (
                <View>
                  <Text style={{ color: "red" }}>{errorMessage}</Text>
                </View>
              )}
              {successMessage !== "" && (
                <View>
                  <Text style={{ color: "green" }}>{successMessage}</Text>
                </View>
              )}

              {/* Nút đăng ký */}
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
                  console.log(
                    "🛠 Bắt đầu đăng ký với:",
                    fullName,
                    email,
                    phone,
                    password
                  );
                  const userCreator = await register(
                    fullName,
                    email,
                    password,
                    phone
                  ); // Nhớ cập nhật hàm register

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
                  Sign up
                </Text>
              </Pressable>

              {/* Chuyển sang đăng nhập */}
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Link href={"/(tabs)/profile/login"}>Have an account?</Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get("window");

const styles = {
  input: {
    width: width - 40,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 5,
  },
  wave: {
    position: "absolute",
    top: 0,
  },
};

export default Register;
