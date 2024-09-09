import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlice";
import productReducer from "../slices/products/productSlices";


//store
const store = configureStore({
   reducer: {
      users: usersReducer,
      products: productReducer,
   }
});


export default store;