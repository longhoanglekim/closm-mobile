import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    userInfo : null,
    token : null,
    shippingAddress: null,
};
export const User = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        // state : current data, action : sent data
        loginSuccess: (state, action) => {
          state.isLoggedIn = true;
          state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
        },
        setShippingAddress: (state, action) => {
          state.shippingAddress = action.payload;
        },
        logout: () => {
            console.log("Logout")
            return initialState; // Reset toàn bộ state về giá trị ban đầu
        }
    }
})
export const { logout , loginSuccess, setShippingAddress} = User.actions; //destructoring

export default User;