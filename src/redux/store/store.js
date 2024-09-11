import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categoriesSlices";
import brandsReducer from "../slices/categories/brandsSlices";
import colorsReducer from "../slices/categories/colorsSlices";


//store
const store = configureStore({
   reducer: {
      users: usersReducer,
      products: productReducer,
      categories: categoryReducer,
      brands: brandsReducer,
      colors: colorsReducer
   }
});


export default store;