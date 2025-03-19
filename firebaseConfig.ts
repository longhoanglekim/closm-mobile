// app/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "@react-native-firebase/app";
import { getAuth, initializeAuth } from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "@react-native-firebase/firestore";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0Uuvnj_Y_Bk5yy9_l7kJlcMh-g8ZV06w",
  authDomain: "closmmanagement.firebaseapp.com",
  projectId: "closmmanagement",
  storageBucket: "closmmanagement.appspot.com",
  messagingSenderId: "1018115783977",
  appId: "1:1018115783977:android:ec3d279761afb4a71ecb38",
};

// Khởi tạo Firebase App
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Khởi tạo Auth với AsyncStorage để lưu trạng thái đăng nhập
const auth = initializeAuth(firebaseApp, {
  persistence: AsyncStorage,
});

// Khởi tạo Firestore
const db = getFirestore(firebaseApp);


export { firebaseApp, auth, db };
