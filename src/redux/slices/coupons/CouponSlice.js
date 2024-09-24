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
   async ({ code, discount, startDate, endDate }, { rejectWithValue, getState, dispatch }) => {
      // console.log(getState);
      try {
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`
            },
         };
         const { data } = await axios.post(`${baseURL}/coupons`, { code, discount, startDate, endDate }, config);
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
         const { data } = await axios.get(`${baseURL}/coupons`);
         return data
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);


//fetch coupon action
export const fetchCouponAction = createAsyncThunk(
   "coupons/single",
   async (code, { rejectWithValue, getState, dispatch }) => {
      try {
         const { data } = await axios.get(
            `${baseURL}/coupons/single?code=${code}`,
            { code }
         );
         return data;
      } catch (error) {
         console.log(error);
         return rejectWithValue(error?.response?.data);
      }
   }
);

// update coupon action
export const updateCouponAction = createAsyncThunk(
   "coupons/update",
   async (
      { code, discount, startDate, endDate, id },
      { rejectWithValue, getState, dispatch }
   ) => {
      console.log({ code, discount, startDate, endDate, id });
      try {
         //Token - Authenticated
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };
         //Images
         const { data } = await axios.put(
            `${baseURL}/coupons/update/${id}`,
            {
               code,
               discount,
               startDate,
               endDate,
            },
            config
         );
         return data;
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);

//Delete coupon action
export const deleteCouponAction = createAsyncThunk(
   "coupons/delete",
   async (id, { rejectWithValue, getState, dispatch }) => {
      try {
         //Token - Authenticated
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };
         const { data } = await axios.delete(
            `${baseURL}/coupons/delete/${id}`,
            config
         );
         return data;
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);


//slice
const couponsSlices = createSlice({
   name: "coupons",
   initialState,
   reducers: {
      // Action pour réinitialiser isAdded à false
      resetIsAdded: (state) => {
         state.isAdded = false;
      },
   },
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
         // state.isAdded = true;
      });
      builder.addCase(fetchCouponsAction.rejected, (state, action) => {
         state.loading = false;
         state.coupons = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      //fetch single coupon
      builder.addCase(fetchCouponAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchCouponAction.fulfilled, (state, action) => {
         state.loading = false;
         state.coupon = action.payload;
         // state.isAdded = true;
      });
      builder.addCase(fetchCouponAction.rejected, (state, action) => {
         state.loading = false;
         state.coupon = null;
         state.error = action.payload;
      });
      //update
      builder.addCase(updateCouponAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(updateCouponAction.fulfilled, (state, action) => {
         state.loading = false;
         state.coupon = action.payload;
         state.isUpdated = true;
      });
      builder.addCase(updateCouponAction.rejected, (state, action) => {
         state.loading = false;
         state.coupon = null;
         state.isUpdated = false;
         state.error = action.payload;
      });
      //delete
      builder.addCase(deleteCouponAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(deleteCouponAction.fulfilled, (state, action) => {
         state.loading = false;
         state.isDelete = true;
      });
      builder.addCase(deleteCouponAction.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      });
      // Reset err
      builder.addCase(resetErrAction.pending, (state) => {
         state.isAdded = false;
         state.error = null;
         state.isUpdated = null;
      });
      // Reset success
      builder.addCase(resetSuccessAction.pending, (state) => {
         state.error = null;
         state.isAdded = false;
         state.isUpdated = null;
      });

   }
});

export const { resetIsAdded } = couponsSlices.actions;

//generate the reducer
const couponsReducer = couponsSlices.reducer;

export default couponsReducer;