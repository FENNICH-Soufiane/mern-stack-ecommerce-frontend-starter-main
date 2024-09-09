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
        } = payload
      } catch (error) {}
    }
  );

