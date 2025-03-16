import { auth, db } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "@react-native-firebase/auth";
import { collection, doc, setDoc, serverTimestamp } from "@react-native-firebase/firestore";
import { fetchUserFromFirestore } from "@/redux/reducers/User";
import store from "@/redux/store";
export const createUser = async (fullname: string, email: string, password: string) => {
  try {
    console.log("🚀 Bắt đầu tạo user với:", email);

    // Tạo user trên Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("✅ User đã tạo:", user.uid);

    // Cập nhật displayName
    await updateProfile(user, { displayName: fullname });
    console.log("✅ Cập nhật displayName thành công:", fullname);

    // Lưu user vào Firestore
    console.log("🚀 Đang lưu user vào Firestore...");
    await setDoc(doc(collection(db, "users"), user.uid), {
      fullname,
      email,
      role: "customer",
      createdAt: serverTimestamp(),
    });

    console.log("✅ User đã lưu vào Firestore:", user.uid);
    return user;
  } catch (error) {
    console.error("❌ Lỗi khi tạo user:", error);
    return { error: error.message };
  }
};

export const login = async (email : string, password : string) => {
  try {
 
    const response = await auth.signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();
    const user = auth.currentUser;
    if (user) {
      store.dispatch(fetchUserFromFirestore(user.uid))
    } else {
      throw new Error("Không tìm thấy user trong Firebstore.");
    }
    return {
      status : true,
      data : {
        displayName : response.user.displayName,
        email : email,
        token : token
      }

    }
  } catch (error) {
    return {status : false, message : error.message}
  }
}
