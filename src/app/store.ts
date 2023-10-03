import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import serviceReducer from "../features/serviceSlice";
import bacenterReducer from "../features/bacenterSlice";
import churchReducer from "../features/churchSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    service: serviceReducer,
    bacenters: bacenterReducer,
    church: churchReducer
  }

}); 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch; 
export default store; 