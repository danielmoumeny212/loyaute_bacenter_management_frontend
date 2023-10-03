import { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import { RootState } from '../app/store';
import ChurchService from '../Services/churchService';
import { getChurchInfo } from '../utils/utilsFn';
import { reject } from 'lodash';
import { pending, rejected, success } from './common';


interface LastBacenterLeaderAdded{
  last_name: string;
  first_name: string;
  email: string;
  date_joined: string;
}

interface LastBacenterFiveLeaderLoggedIn{
  last_name: string;
  first_name: string;
  last_login: string;
  email: string
}

interface newComerPerBacenter {
  name: string; 
  newcomer_count: number;
}

interface ChurchStats{
  bacenter_count: number,
  bacenter_leader_count: number,
  bacenters_services_count: number,
  services_to_reach: number,
  last_five_users: LastBacenterLeaderAdded[]
  last_five_logged_in: LastBacenterFiveLeaderLoggedIn[]
  newcomers_per_bacenter: newComerPerBacenter[];
}
interface ChurchState {
  bacentersCount: number; 
  bacenterLeaderCount: number;
  bacentersServicesCount: number; 
  bacentersServicesToReach: number;
  lastFiveBacenterLeaderAdded: LastBacenterLeaderAdded[];
  lastFiveBacenterLeaderLoggedIn: LastBacenterFiveLeaderLoggedIn[];
  newComerPerBacenter: newComerPerBacenter[];
  isLoading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}
const initialState: ChurchState = {
    bacentersCount: 0,
    bacenterLeaderCount: 0,
    bacentersServicesToReach: 0,
    bacentersServicesCount: 0,
    lastFiveBacenterLeaderAdded: [],
    lastFiveBacenterLeaderLoggedIn: [],
    newComerPerBacenter: [],
    isLoading: false,
    status: 'idle',
   
}

export const getChurchStats = createAsyncThunk("getChurchStats", async (_, {rejectWithValue}) =>{
  const { id: church_id} = getChurchInfo();
   const churchService = new ChurchService(`church/${church_id}/stats`)
   try {
      const response = await churchService.getOne<ChurchStats>();
      return response.data; 
   }catch (error){
      return rejectWithValue(error);
   }
})

const churchSlice = createSlice({
  name: "church",
  initialState,
  reducers: {

  }, 
  extraReducers: (builder) => {
    builder.addCase(getChurchStats.pending, (state)=> {
      pending(state);
    })
    builder.addCase(getChurchStats.fulfilled, (state, action: PayloadAction<ChurchStats>) => {
      
        success(state);
        state.bacenterLeaderCount = action.payload.bacenter_leader_count
        state.bacentersServicesCount = action.payload.bacenters_services_count
        state.bacentersServicesToReach = action.payload.services_to_reach
        state.bacentersCount = action.payload.bacenter_count
        state.lastFiveBacenterLeaderAdded = action.payload.last_five_users
        state.lastFiveBacenterLeaderLoggedIn = action.payload.last_five_logged_in
        state.newComerPerBacenter = action.payload.newcomers_per_bacenter
    })
    builder.addCase(getChurchStats.rejected, (state, action) => {
        rejected(state, action);
    })
  }

})
export const isLoading = (state: RootState) => state.church.isLoading; 
export const churchStats = (state: RootState) => state.church;
export default churchSlice.reducer;