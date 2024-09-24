import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initalsState
const initialState = {
   brands: [],
   brand: {},
   loading: false,
   error: null,
   isAdded: false,
   isUpdated: false,
   isDelete: false,
};


//create brand action
export const createBrandAction = createAsyncThunk(
   "brand/create",
   async (name, { rejectWithValue, getState, dispatch }) => {
      // console.log(getState);
      try {
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`
            },
         };
         const { data } = await axios.post(`${baseURL}/brands`, {name} , config);
         return data
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);



//create brand action
export const fetchBrandsAction = createAsyncThunk(
   "brands/fetch All",
   async (payload, { rejectWithValue, getState, dispatch }) => {
      // console.log(getState);
      try {
         const { data } = await axios.get(`${baseURL}/brands`);
         return data
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);


//slice
const brandsSlices = createSlice({
   name: "brands",
   initialState,
   extraReducers: (builder) => {
      //create
      builder.addCase(createBrandAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(createBrandAction.fulfilled, (state, action) => {
         state.loading = false;
         state.brand = action.payload;
         state.isAdded = true;
      });
      builder.addCase(createBrandAction.rejected, (state, action) => {
         state.loading = false;
         state.brand = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      //fetch All
      builder.addCase(fetchBrandsAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
         state.loading = false;
         state.brands = action.payload;
         // state.isAdded = true;
      });
      builder.addCase(fetchBrandsAction.rejected, (state, action) => {
         state.loading = false;
         state.brands = null;
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
const brandsReducer = brandsSlices.reducer;

export default brandsReducer;