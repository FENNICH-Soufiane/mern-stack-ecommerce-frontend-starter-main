import axios from "axios";
import baseURL from "../../../utils/baseURL";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initalsState
const initialState = {
   products: [],
   product: {},
   loading: false,
   error: null,
   isAdded: false,
   isUpdated: false,
   isDelete: false,
};


//create product action
export const createProductAction = createAsyncThunk(
   "product/create",
   async (payload, { rejectWithValue, getState, dispatch }) => {
      console.log(payload);
      try {
         const {
            name,
            description,
            category,
            sizes,
            brand,
            colors,
            price,
            totalQty,
            files,
         } = payload;
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`
            },
         };
         const { data } = await axios.post(
            `${baseURL}/products`,
            {
               name,
               description,
               category,
               sizes,
               brand,
               colors,
               price,
               totalQty,
               files,
            }, config
         );
         return data;
      } catch (error) { return rejectWithValue(error?.response?.data); }
   }
);







//slice
const productSlices = createSlice({
   name: "products",
   initialState,
   extraReducers: (builder) => {
      //create
      builder.addCase(createProductAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(createProductAction.fulfilled, (state, action) => {
         state.loading = false;
         state.product = action.payload;
         state.isAdded = true;
      });
      builder.addCase(createProductAction.rejected, (state, action) => {
         state.loading = false;
         state.product = null;
         state.isAdded = false;
         state.error = action.payload;
      });
   }
})

//generate the reducer
const productReducer = productSlices.reducer;

export default productReducer;