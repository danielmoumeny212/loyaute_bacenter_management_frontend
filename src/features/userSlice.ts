import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import UserService from "../Services/userService";
import { User } from "../models/user";
import { getChurchInfo } from "../utils/utilsFn";

interface UserState {
  user: User | null;
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: UserState = {
  user: null,
  users: [],
  status: "idle",
};
export const getCurrentUser = createAsyncThunk(
  "users/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const userService = new UserService("auth/users/me");
      const response = await userService.getUser<User>();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    const { id: church_id } = getChurchInfo();
    try {
      const userService = new UserService(`church/${church_id}/users`);
      const response = await userService.getUsers<User[]>();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: User, { rejectWithValue }) => {
    try {
      const userService = new UserService("auth/users/create");
      const response = await userService.create<User>(user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.user = null;
      state.users = [];
    },
    updateSelectedUser: (state, action: PayloadAction<any>) => {
      const { id, is_staff, email, last_name, first_name, statut, is_active } =
        action.payload;
      const updatedUsers = state.users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            is_staff,
            is_active,
            email,
            last_name,
            first_name,
            profil: { ...user.profil, statut },
          } as User;
        }
        return user;
      });

      state.users = updatedUsers;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.user = { ...action.payload };
          localStorage.setItem(
            "church_info",
            JSON.stringify(action.payload.church)
          );
        }
      )
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const isAdmin = (state: RootState) => state.users.user?.is_staff;
export const getStatus = (state: RootState) => state.users.status;
export const getError = (state: RootState) => state.users.error;
export const Users = (state: RootState) => state.users.users;
export const loggedUser = (state: RootState) => state.users.user;
export const { resetUsers , updateSelectedUser } = userSlice.actions;
export default userSlice.reducer;
