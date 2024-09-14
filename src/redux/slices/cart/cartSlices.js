const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initalsState
const initialState = {
   cartItems: [],
   loading: false,
   error: null,
   isAdded: false,
   isUpdated: false,
   isDelete: false,
};

//add product to cart
export const addOrderToCartaction = createAsyncThunk(
   "cart/add-to-cart",
   async (cartItem) => {
      const cartItems = localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [];
      //push to storage
      cartItems.push(cartItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
   }
);

//add product to cart
export const getCartItemsFromLocalStorageAction = createAsyncThunk(
   "cart/get-order-items",
   async () => {
      const cartItems = localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [];

      return cartItems;
   }
);

//slice
const cartSlice = createSlice({
   name: "carts",
   initialState,
   extraReducers: (builder) => {
      //add to cart
      builder.addCase(addOrderToCartaction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(addOrderToCartaction.fulfilled, (state, action) => {
         state.loading = false;
         state.cartItems = action.payload;
         state.isAdded = true;
      });
      builder.addCase(addOrderToCartaction.rejected, (state, action) => {
         state.loading = false;
         state.cartItems = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      //fetch cart items
      builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(getCartItemsFromLocalStorageAction.fulfilled, (state, action) => {
         state.loading = false;
         state.cartItems = action.payload;
         state.isAdded = true;
      }
      );
      builder.addCase(getCartItemsFromLocalStorageAction.rejected, (state, action) => {
         state.loading = false;
         state.cartItems = null;
         state.isAdded = false;
         state.error = action.payload;
      }
      );
   }
});

//generate the reducer
const cartReducer = cartSlice.reducer;

export default cartReducer;
