import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import firestore from "@react-native-firebase/firestore"
const initialState = {
    fullname: "",
    email: "",
    loading: false,
    error: null
};
export const fetchUserFromFirestore = createAsyncThunk(
    "user/fetchUserFromFirestore",
    async ({uid, token}, { rejectWithValue }) => {
      try {
        console.log("🚀 Fetching user from Firestore with UID:", uid);
  
        const userDoc = await firestore().collection("users").doc(uid).get();
  
        if (userDoc.exists) {
          const userData = userDoc.data();
          
          // ✅ Chuyển Firestore Timestamp thành milliseconds (số)
          return {
            fullname : userData.fullname, email : userData.email, token, token, role : userData.role
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
                state.fullname = action.payload.fullname;
                state.token = action.payload.token;
            })
            .addCase(fetchUserFromFirestore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})
export const { logout } = User.actions; //destructoring

export default User;