import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import firestore from "@react-native-firebase/firestore"
const initialState = {
    firstname: "",
    email: "",
    loading: false,
    error: null
};
export const fetchUserFromFirestore = createAsyncThunk(
    "user/fetchUserFromFirestore",
    async (uid, { rejectWithValue }) => {
      try {
        console.log("🚀 Fetching user from Firestore with UID:", uid);
  
        const userDoc = await firestore().collection("users").doc(uid).get();
  
        if (userDoc.exists) {
          const userData = userDoc.data();
          
          // ✅ Chuyển Firestore Timestamp thành milliseconds (số)
          return {
            ...userData,
            createdAt: userData.createdAt?.toMillis() || null, // Tránh lỗi nếu `createdAt` không tồn tại
          };
        } else {
          console.warn("⚠ User not found in Firestore");
          return rejectWithValue("User not found in Firestore");
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        return rejectWithValue(error.message);
      }
    }
  );
export const User = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        // state : current data, action : sent data
        updateFirstname : (state, action) => {
            state.firstname = action.payload.firstname;
            state.testAction= "test";
        },
        logout: () => {
            return initialState; // Reset toàn bộ state về giá trị ban đầu
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserFromFirestore.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserFromFirestore.fulfilled, (state, action) => {
                state.loading = false;
                state.email = action.payload.email;
                state.firstname = action.payload.fullname;
            })
            .addCase(fetchUserFromFirestore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})
export const { logout } = User.actions; //destructoring
// ✅ Tạo action creator (hàm trả về action object)

// 📌 Khi gọi action creator này, nó sẽ tạo ra một action object:
// updateFirstname({ firstname: "someone" }) 
// → Trả về:
// {
//   type: "user/updateFirstname",
//   payload: { firstname: "someone" }
// }

// 📌 Action object này sẽ được gửi đến reducer tương ứng trong slice
// để cập nhật state.

// Thành phần	                                         Chức năng
// User.actions	                                         Chứa các action creators được tự động tạo.
// updateFirstname	                                     Một action creator, khi gọi sẽ trả về action object.
// dispatch(updateFirstname({ firstname: "someone" }))	Gửi action object này đến reducer để cập nhật state.
export default User;