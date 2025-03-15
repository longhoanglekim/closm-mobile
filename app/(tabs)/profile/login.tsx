import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

const login = () => {
  return (
    <View className="flex-1 items-center">
      <View>
        <View style={{ marginTop: 120 }}>
          <Text style={{ fontSize: 45 }}>Thật vui khi thấy bạn quay lại</Text>
        </View>
        <View style={{ marginTop: 80, gap: 10, paddingLeft: 20 }}>
          <Text>Email</Text>
          <TextInput
            placeholder="Nhap tai khoan email"
            style={{
              width: 250,
              height: 40,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 30,
              paddingLeft: 15,
            }}
          ></TextInput>
          <Text>Password</Text>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              placeholder="*******"
              secureTextEntry={true}
              style={{
                width: 250,
                height: 40,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 30,
                paddingLeft: 15,
              }}
            ></TextInput>
          </KeyboardAvoidingView>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              style={{
                gap: 10,
                backgroundColor: "orange",
                width: 100,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
              onPress={() => {
                console.log("login");
              }}
            >
              <Text>Đăng nhập</Text>
            </Pressable>
            <View style={{ backgroundColor: "lightgray", borderRadius: 10 }}>
              <Link
                href={"/(tabs)/profile/register"}
                style={{
                  width: "100%",
                  padding: 13,
                }}
              >
                Chưa có tài khoản?
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default login;
