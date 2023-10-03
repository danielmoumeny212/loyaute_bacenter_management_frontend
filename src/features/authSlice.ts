import { createSlice } from '@reduxjs/toolkit'; 
import { RootState } from '../app/store';
type AuthState = {
  isAuthenticated: boolean 
 
}
const initialState: AuthState ={
   isAuthenticated: false,
   
}

const authSlice  = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     authenticate: (state) => {
       state.isAuthenticated = true; 
     },
     logout: (state) => {
       state.isAuthenticated = false;
      
     }
  }

})

export const { authenticate, logout } = authSlice.actions; 
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated; 
export default authSlice.reducer;