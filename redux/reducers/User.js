import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import firestore from "@react-native-firebase/firestore"
const initialState = {
    isLoggedIn: false,
    fullname : null,
    token : null,
};
export const User = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        // state : current data, action : sent data
        loginSuccess: (state, action) => {
          state.isLoggedIn = true;
          state.token = action.payload.token;
        },
        logout: () => {
            return initialState; // Reset toàn bộ state về giá trị ban đầu
        }
    }
})
export const { logout , loginSuccess} = User.actions; //destructoring

export default User;