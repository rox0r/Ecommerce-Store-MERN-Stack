import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";

// config store
const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
