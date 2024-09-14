import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categoriesSlices";
import brandsReducer from "../slices/categories/brandsSlices";
import colorsReducer from "../slices/categories/colorsSlices";
import cartReducer from "../slices/cart/cartSlices";


//store
const store = configureStore({
   reducer: {
      users: usersReducer,
      products: productReducer,
      categories: categoryReducer,
      brands: brandsReducer,
      colors: colorsReducer,
      carts: cartReducer
   }
});


export default store;