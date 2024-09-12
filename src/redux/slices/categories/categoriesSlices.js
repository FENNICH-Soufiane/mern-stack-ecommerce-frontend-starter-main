import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initalsState
const initialState = {
   categories: [],
   category: {},
   loading: false,
   error: null,
   isAdded: false,
   isUpdated: false,
   isDelete: false,
};


//create category action
export const createCategoryAction = createAsyncThunk(
   "category/create",
   async (payload, { rejectWithValue, getState, dispatch }) => {
      // console.log(getState);
      try {
         
         const { name, image } = payload;
         console.log(payload);
         // formData
         const formData = new FormData();
         formData.append("name", name);
         formData.append("image", image);
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data",
            },
         };
         const { data } = await axios.post(`${baseURL}/categories`, formData, config);
         return data
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);



//create product action
export const fetchCategoriesAction = createAsyncThunk(
   "category/fetch All",
   async (payload, { rejectWithValue, getState, dispatch }) => {
      // console.log(getState);
      try {
         const { data } = await axios.get(`${baseURL}/categories`);
         return data
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);


//slice
const categorySlices = createSlice({
   name: "categories",
   initialState,
   extraReducers: (builder) => {
      //create
      builder.addCase(createCategoryAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(createCategoryAction.fulfilled, (state, action) => {
         state.loading = false;
         state.category = action.payload;
         state.isAdded = true;
      });
      builder.addCase(createCategoryAction.rejected, (state, action) => {
         state.loading = false;
         state.category = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      //fetch All
      builder.addCase(fetchCategoriesAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
         state.loading = false;
         state.categories = action.payload;
      });
      builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
         state.loading = false;
         state.categories = null;
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
const categoryReducer = categorySlices.reducer;

export default categoryReducer;