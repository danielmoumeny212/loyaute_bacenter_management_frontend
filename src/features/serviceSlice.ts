import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../Services/userService";
import { RootState } from "../app/store";
import { getChurchInfo } from "../utils/utilsFn";

interface UserStats {
  total_new_comer: number;
  total_new_convert: number;
  total_services: number;
}

export interface Service {
  service_name: string;
  predicator: string;
  attendance: number;
  new_comer: number;
  new_convert: number;
  offrandes: number;
  tithes: number;
  bacenter_leader: number;
  date: string;
  photo: string;
  bacenter: { id: number; quarter: string };
}
interface ServiceSliceState {
  userStats: UserStats;
  services: Service[];
  isLoading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialData: ServiceSliceState = {
  userStats: {
    total_new_comer: 0,
    total_new_convert: 0,
    total_services: 0,
  },
  isLoading: true,
  status: "idle",
  services: [],
};
const {id: church_id } = getChurchInfo();

export const fetchUserStats = createAsyncThunk(
  "service/getUserStats",
  async (bacenter_id: string, { rejectWithValue }) => {
    try {
      const userService = new UserService(
        `church/${church_id}/bacenters/${bacenter_id}/stats`
      );
      const response = await userService.getUserServiceStats<UserStats>();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
export const fetchServices = createAsyncThunk(
  "service/getServices",
  async (endpoint: string, { rejectWithValue }) => {
    try {
      const userService = new UserService(`church/${church_id}/${endpoint}`);
      const response = await userService.getMany<Service[]>();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.userStats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.error.message;
      })
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.services = [...action.payload];
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.services = [];
      });
  },
});

export const loading = (state: RootState) => state.service.isLoading;
export const userStatsError = (state: RootState) => state.service.error;
export const getUserStats = (state: RootState) => state.service.userStats;
export const getServices = (state: RootState) => state.service.services;
export default serviceSlice.reducer;
