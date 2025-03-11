import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    firstname : 'Long',
    lastname : "Hoang",
    userId : 1 
}

export const User = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        // state : current data, message : sent data
        updateFirstname : (state, message) => {
            state.firstname = message.payload.firstname;
        }
    }
})
export const { updateFirstname } = User.actions; //destructoring
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