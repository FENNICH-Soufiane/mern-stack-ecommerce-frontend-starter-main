import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initalsState
const initialState = {
  coupons: [],
  coupon: null,
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};


//create coupon action
export const createCouponAction = createAsyncThunk(
   "coupons/create",
   async ({code, discount, startDate, endDate}, { rejectWithValue, getState, dispatch }) => {
      // console.log(getState);
      try {
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`
            },
         };
         const { data } = await axios.post(`${baseURL}/coupons`, {code, discount, startDate, endDate} , config);
         return data
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);



//fetch coupons action
export const fetchCouponsAction = createAsyncThunk(
   "coupons/fetch All",
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
const couponsSlices = createSlice({
   name: "coupons",
   initialState,
   extraReducers: (builder) => {
      //create
      builder.addCase(createCouponAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(createCouponAction.fulfilled, (state, action) => {
         state.loading = false;
         state.coupon = action.payload;
         state.isAdded = true;
      });
      builder.addCase(createCouponAction.rejected, (state, action) => {
         state.loading = false;
         state.brand = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      //fetch All
      builder.addCase(fetchCouponsAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchCouponsAction.fulfilled, (state, action) => {
         state.loading = false;
         state.coupons = action.payload;
         state.isAdded = true;
      });
      builder.addCase(fetchCouponsAction.rejected, (state, action) => {
         state.loading = false;
         state.coupons = null;
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
const couponsReducer = couponsSlices.reducer;

export default couponsReducer;