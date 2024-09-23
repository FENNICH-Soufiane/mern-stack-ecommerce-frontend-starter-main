import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../users/globalActions/globalActions";
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
         const { name, description, category, sizes, brand, colors, price, totalQty, files, } = payload;
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data"
            },
         };
         const formData = new FormData();
         formData.append("name", name);
         formData.append("description", description);
         formData.append("category", category);
         formData.append("brand", brand);
         formData.append("price", price);
         formData.append("totalQty", totalQty);

         files.forEach((file) => {
            formData.append("files", file);
         });

         colors.forEach((color) => {
            formData.append("colors", color);
         });

         sizes.forEach((size) => {
            formData.append("sizes", size);
         });

         const { data } = await axios.post(
            `${baseURL}/products`,
            formData,
            config
         );
         return data;
      } catch (error) { return rejectWithValue(error?.response?.data); }
   }
);


//create product action
export const updateProductAction = createAsyncThunk(
   "product/update",
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
            id,
         } = payload;
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.put(
            `${baseURL}/products/${id}`,
            {
               name,
               description,
               category,
               sizes,
               brand,
               colors,
               price,
               totalQty,
            },
            config
         );
         return data;
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);

//fetch product action
export const fetchProductsAction = createAsyncThunk(
   "product/list",
   async (_, { rejectWithValue, getState }) => {  // On n'a plus besoin de l'argument { url }
      try {
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };
         // Utilisation de productUrl directement
         const productUrl = `${baseURL}/products`;
         const { data } = await axios.get(productUrl, config);
         return data;
      } catch (error) {
         return rejectWithValue(error?.response?.data);
      }
   }
);



//fetch product details action
export const fetchProductAction = createAsyncThunk(
   "product/details",
   async (productId, { rejectWithValue, getState, dispatch }) => {
      console.log(productId);
      try {
         const token = getState()?.users?.userAuth?.userInfo?.token;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };
         const { data } = await axios.get(
            `${baseURL}/products/${productId}`,
            config
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
         state.products = action.payload;
         state.isAdded = true;
      });
      builder.addCase(createProductAction.rejected, (state, action) => {
         state.loading = false;
         state.products = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      //update
      builder.addCase(updateProductAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(updateProductAction.fulfilled, (state, action) => {
         state.loading = false;
         state.product = action.payload;
         state.isUpdated = true;
      });
      builder.addCase(updateProductAction.rejected, (state, action) => {
         state.loading = false;
         state.product = null;
         state.isUpdated = false;
         state.error = action.payload;
      });
      
      //fetch all
      builder.addCase(fetchProductsAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
         state.loading = false;
         state.products = action.payload;
         state.isAdded = true;
      });
      builder.addCase(fetchProductsAction.rejected, (state, action) => {
         state.loading = false;
         state.products = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      // 
      builder.addCase(fetchProductAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchProductAction.fulfilled, (state, action) => {
         state.loading = false;
         state.product = action.payload;
         state.isAdded = true;
      });
      builder.addCase(fetchProductAction.rejected, (state, action) => {
         state.loading = false;
         state.product = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      builder.addCase(resetErrAction.pending, (state) => {
         state.isAdded = false;
         state.error = null;
      });
      // Reset success
      builder.addCase(resetSuccessAction.pending, (state) => {
         state.error = null;
         state.isAdded = false;
      });
   }
});

//generate the reducer
const productReducer = productSlices.reducer;

export default productReducer;