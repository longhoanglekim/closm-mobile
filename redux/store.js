import { combineReducers, configureStore } from "@reduxjs/toolkit";
import User from './reducers/User'
import {persistReducer, persistStore} from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
const configuration = {
    key : 'root',
    storage : AsyncStorage,
    version : 1
}

const rootReducer = combineReducers({
    user : User.reducer,
})
const persistedReducer = persistReducer(configuration, rootReducer) // boc rootReducer de redux luu state vao asyncstorage

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // ⚠️ Bỏ qua kiểm tra serializable cho redux-persist
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
          },
        }),

})


export default store;
export const persistor = persistStore(store); // kích hoạt việc lưu trữ state và tải lại khi khởi động