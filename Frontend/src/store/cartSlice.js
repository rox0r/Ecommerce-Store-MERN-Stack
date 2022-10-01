import { createSlice } from "@reduxjs/toolkit";
import cartOperations from "../helper/cartOperations";

const initialState = {
  isLoading: false,
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartAmount: localStorage.getItem("cartAmount")
    ? JSON.parse(localStorage.getItem("cartAmount"))
    : 0,
  cartQuantity: localStorage.getItem("cartQuantity")
    ? JSON.parse(localStorage.getItem("cartQuantity"))
    : 0,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  hasError: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    isLoading(state) {
      state.isLoading = true;
    },

    replaceCart(state, action) {
      state.isLoading = false;
      state.cartItems = [...action.payload.cartItems];
      state.cartQuantity = action.payload.cartQuantity;
      state.cartAmount = action.payload.cartAmount;
    },

    addShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = "Action Failed";
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

// Actions --------------------------
export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      const url = "/api/v1/product/" + productId;
      const response = await fetch(url);
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message);
      }

      //Check if product is already exist in cart
      const productExistsInCart = getState().cart.cartItems.find((p, i) => {
        return p.productId === productId;
      });

      //Prevent quantity in cart greater than stock
      if (productExistsInCart) {
        const allegedQuantity = quantity + productExistsInCart.quantity;
        if (allegedQuantity < resData.product.stock) {
          quantity += productExistsInCart.quantity;
        } else {
          quantity = resData.product.stock;
        }
      }

      const newCartItem = {
        productId: productId,
        quantity: quantity,
        name: resData.product.name,
        price: resData.product.price,
        image: resData.product.images[0].url,
        stock: resData.product.stock,
      };

      let updatedCart = [];

      if (productExistsInCart) {
        updatedCart = getState().cart.cartItems.map((p) => {
          return p.productId === productId ? newCartItem : p;
        });
      } else {
        updatedCart = [...getState().cart.cartItems, newCartItem];
      }

      const updatedCartObj = cartOperations(updatedCart);
      dispatch(cartActions.replaceCart(updatedCartObj));
    } catch (error) {
      dispatch(cartActions.hasError());
    }
  };

export const updateCartQuantity =
  (productId, changeType) => async (dispatch, getState) => {
    const updatedCart = getState().cart.cartItems.map((item) => {
      if (item.productId === productId) {
        if (changeType === "increase" && item.quantity < item.stock) {
          let quantity = item.quantity + 1;
          return { ...item, quantity: quantity };
        }
        if (changeType === "decrease" && item.quantity > 1) {
          let quantity = item.quantity - 1;
          return { ...item, quantity: quantity };
        }
      }
      return item;
    });
    const updatedCartObj = cartOperations(updatedCart);
    dispatch(cartActions.replaceCart(updatedCartObj));
  };

export const deleteCartItem = (productId) => async (dispatch, getState) => {
  const updatedCart = getState().cart.cartItems.filter((item) => {
    return item.productId !== productId;
  });
  const updatedCartObj = cartOperations(updatedCart);
  dispatch(cartActions.replaceCart(updatedCartObj));
};

export const addShippingInfo = (shippingInfo) => async (dispatch) => {
  dispatch(cartActions.addShippingInfo(shippingInfo));
  localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
  return true;
};
