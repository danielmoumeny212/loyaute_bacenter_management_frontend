import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Bacenter } from "../models/bacenter";
import BacenterService from "../Services/bacenterService";
import { getChurchInfo } from "../utils/utilsFn";

interface BacenterState {
  bacenters: Bacenter[];
  isLoading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: BacenterState = {
  bacenters: [],
  isLoading: true,
  status: "idle",
};

const {id: church_id } = getChurchInfo();
const bacenterService = new BacenterService(`church/${church_id}/bacenters`);

export const getBacenters = createAsyncThunk(
  "bacenters/getBacenters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bacenterService.getMany<Bacenter[]>();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const addBacenter = createAsyncThunk(
  "bacenter/addBacenter",
  async (
    bacenter: {
      name: string;
      bacenter_leader: number;
      quarter: string;
      church: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await bacenterService
        .setEndpoint(`church/${church_id}/bacenters/create`)
        .create(bacenter);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBacenter = createAsyncThunk(
  "bacenter/updateBacenter",
  async (bacenter: any, { rejectWithValue }) => {
    // const {name, quarter, deleted, bacenter_leader: {id: bacenter_leader}} = bacenter; 
    try {
      const response = await bacenterService
        .setEndpoint(`church/${church_id}/bacenters/${bacenter.id}`)
        .update<Bacenter>(bacenter);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBacenterServices = createAsyncThunk(
  "bacenters/getBacenterServices",
  async (bacenter_id: string, { rejectWithValue }) => {
    try {
      const response = await bacenterService
        .setEndpoint(`${church_id}/bacenters/${bacenter_id}`)
        .getOne<Bacenter>();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const pending = (state: any) => {
  state.status = "loading";
  state.isLoading = true;
};

const success = (state: any) => {
  state.status = "succeeded";
  state.isLoading = false;
};

const rejected = (state: any) => {
  state.status = "failed";
  state.isLoading = false;
};
const bacenterSlice = createSlice({
  name: "bacenter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBacenter.pending, pending)
      .addCase(addBacenter.fulfilled, (state, action: PayloadAction<any>) => {
        success(state);
        state.bacenters.push(action.payload);
      })
      .addCase(addBacenter.rejected, (state, action) => {
        rejected(state);
        state.error = action.error.message;
      })

      .addCase(getBacenters.pending, pending)
      .addCase(getBacenters.fulfilled, (state, action) => {
        success(state);
        state.bacenters = action.payload;
      })
      .addCase(getBacenters.rejected, (state, action) => {
        rejected(state);
        state.error = action.error.message;
      })
      .addCase(updateBacenter.pending, (state) => {
        pending(state);
      })
      .addCase(updateBacenter.fulfilled, (state, action) => {
        success(state);
        const { deleted, id } = action.payload as any;
        if (!deleted) {
          const updateBacenters = state.bacenters.map((bacenter) => {
            if (bacenter.id === id) {
              return { ...action.payload };
            }
            return bacenter;
          });
          state.bacenters = updateBacenters;
          return;
        }
        const updateBacenters = state.bacenters.filter(
          (bacenter) => bacenter.id !== id
        );
        state.bacenters = updateBacenters;
      })
      .addCase(updateBacenter.rejected, (state, action) => {
        rejected(state);
        state.error = action.error.message;
      });
  },
});

export const allBacenters = (state: RootState) => state.bacenters.bacenters;
export const bacenterLoadingState = (state: RootState) =>
  state.bacenters.isLoading;
export default bacenterSlice.reducer;
