import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   loading: false,
   error: null,
   users: [],
   user: null,
   profile: {},
   userAuth: {
      loading: false,
      error: null,
      userInfo: {}
   },
};


//register action
export const registerUserAction = createAsyncThunk(
   "users/register",
   async (
      { email, password, fullname },
      { rejectWithValue, getState, dispatch }
   ) => {
      try {
         //make the http request
         const { data } = await axios.post(`${baseURL}/users/register`, {
            email,
            password,
            fullname,
         });
         return data;
      } catch (error) {
         console.log(error);
         return rejectWithValue(error?.response?.data);
      }
   }
);


const usersSlice = createSlice({
   name: "users",
   initialState,
   extraReducers: (builder) => {
      //handle actions
      //login
      builder.addCase(loginUserAction.pending, (state, action) => {
         state.userAuth.loading = true;
      });
      builder.addCase(loginUserAction.fulfilled, (state, action) => {
         state.userAuth.userInfo = action.payload;
         state.userAuth.loading = false;
      });
      builder.addCase(loginUserAction.rejected, (state, action) => {
         state.userAuth.error = action.payload;
         state.userAuth.loading = false;
      });
   }
});