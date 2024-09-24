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

// Ajouter un produit au panier
export const addOrderToCartaction = createAsyncThunk(
   "cart/add-to-cart",
   async (cartItem) => {
      const cartItems = localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [];
      // Ajouter l'élément au stockage
      cartItems.push(cartItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
   }
);

// Récupérer les éléments du panier à partir de LocalStorage
export const getCartItemsFromLocalStorageAction = createAsyncThunk(
   "cart/get-order-items",
   async () => {
      const cartItems = localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [];

      return cartItems;
   }
);

// Changer la quantité d'un article dans le panier
export const changeOrderItemQty = createAsyncThunk(
   "cart/change-item-qty",
   async ({ productId, qty }) => {
      console.log(productId, qty);

      // Vérifier si la quantité est un nombre et supérieure à zéro
      if (typeof qty !== 'number' || qty <= 0) {
         throw new Error("La quantité doit être un nombre valide supérieur à zéro");
      }

      const cartItems = localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [];

      const newCartItems = cartItems?.map((item) => {
         if (item?._id?.toString() === productId?.toString()) {
            // Calculer le nouveau prix
            const newPrice = item?.price * qty;
            item.qty = qty;
            item.totalPrice = newPrice;
            console.log(item);
         }
         return item;
      });

      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return newCartItems;
   }
);

// Supprimer un article du panier
export const removeOrderItemQty = createAsyncThunk(
   "cart/removeOrderItem",
   async (productId) => {
      const cartItems = localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [];
      const newItems = cartItems?.filter((item) => item?._id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
   }
);

// Slice pour gérer le panier
const cartSlice = createSlice({
   name: "carts",
   initialState,
   reducers: {
      emptyCart: (state) => {
         state.cartItems = [];
      },
      // autres reducers
   },
   extraReducers: (builder) => {
      // Ajouter un produit au panier
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
      // Récupérer les articles du panier
      builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(getCartItemsFromLocalStorageAction.fulfilled, (state, action) => {
         state.loading = false;
         state.cartItems = action.payload;
         // state.isAdded = true;
      });
      builder.addCase(getCartItemsFromLocalStorageAction.rejected, (state, action) => {
         state.loading = false;
         state.cartItems = null;
         state.isAdded = false;
         state.error = action.payload;
      });
      // Changer la quantité d'un article
      builder.addCase(changeOrderItemQty.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(changeOrderItemQty.fulfilled, (state, action) => {
         state.loading = false;
         state.cartItems = action.payload;
         state.isUpdated = true;
      });
      builder.addCase(changeOrderItemQty.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
      });
   }
});

export const { emptyCart } = cartSlice.actions;

// Générer le reducer
const cartReducer = cartSlice.reducer;

export default cartReducer;


