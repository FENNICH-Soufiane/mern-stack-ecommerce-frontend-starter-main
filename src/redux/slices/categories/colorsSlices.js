import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initalsState
const initialState = {
   colors: [],
   color: {},
   loading: false,
   error: null,
   isAdded: false,
   isUpdated: false,
   isDelete: false,
};


//create color action
export const createColorAction = createAsyncThunk(
   "color/create",
   async (name, { rejectWithValue, getState, dispatch }) => {
      // console.log(getState);
      try {
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`
            },
         };
         const { data } = await axios.post(`${baseURL}/colors`, { name }, config);
         return data
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);



//create color action
export const fetchColorsAction = createAsyncThunk(
   "color/fetch All",
   async (payload, { rejectWithValue, getState, dispatch }) => {
      // console.log(getState);
      try {
         const { data } = await axios.get(`${baseURL}/colors`);
         return data
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);


//slice
const colorsSlices = createSlice({
   name: "colors",
   initialState,
   extraReducers: (builder) => {
      //create
      builder.addCase(createColorAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(createColorAction.fulfilled, (state, action) => {
         state.loading = false;
         state.color = action.payload;
         state.isAdded = true;
      });
      builder.addCase(createColorAction.rejected, (state, action) => {
         state.loading = false;
         state.color = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      //fetch All
      builder.addCase(fetchColorsAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
         state.loading = false;
         state.colors = action.payload;
         state.isAdded = true;
      });
      builder.addCase(fetchColorsAction.rejected, (state, action) => {
         state.loading = false;
         state.colors = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      // Reset success
      builder.addCase(resetSuccessAction.pending, (state) => {
         state.error = null;
      });
      // Reset err
      builder.addCase(resetErrAction.pending, (state) => {
         state.isAdded = false;
      });
   }
})

//generate the reducer
const colorsReducer = colorsSlices.reducer;

export default colorsReducer;