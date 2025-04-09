
import { createUserWithEmailAndPassword, updateProfile } from "@react-native-firebase/auth";

import store from "@/redux/store";

export const login = async (email : string, password : string) => {
  const response = await fetch("http://172.16.0.2:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  });
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};
export const register = async (fullName : string, email : string, password : string, phone : string) => {
  const response = await fetch("http://172.16.0.2:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({'fullName' : fullName, 'email' : email, 'password' : password, 'phone' : phone}), 
  });
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};