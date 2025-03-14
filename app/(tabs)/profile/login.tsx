import React from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";

const login = () => {
  return (
    <View className="flex-1 items-center">
      <View>
        <View style={{ marginTop: 200 }}>
          <Text style={{ fontSize: 45 }}>Thật vui khi thấy bạn quay lại</Text>
        </View>
        <View style={{ marginTop: 100, gap: 10 }}>
          <Text>Email</Text>
          <TextInput
            placeholder="Nhap tai khoan email"
            style={{
              width: 250,
              height: 30,
              borderColor: "black",
              borderWidth: 1,
            }}
          ></TextInput>
          <Text>Password</Text>
          <TextInput
            placeholder="*******"
            secureTextEntry={true}
            style={{
              width: 250,
              height: 30,
              borderColor: "black",
              borderWidth: 1,
            }}
          ></TextInput>
          <Pressable
            style={{
              gap: 10,
              backgroundColor: "orange",
              width: 100,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Đăng nhập</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default login;
