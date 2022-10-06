import { createSlice } from "@reduxjs/toolkit";

// create slice
const initialState = {
  isLoading: false,
  product: {},
  products: [],
  productsCount: 0,
  resultsPerPage: 0,
  filteredProductsCount: 0,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    isLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    productsFetchSuccess(state, action) {
      state.isLoading = false;
      state.products = [...action.payload.products];
      state.productsCount = action.payload.productsCount;
      state.resultsPerPage = action.payload.resultsPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    productDetailsFetchSuccess(state, action) {
      state.product = action.payload.product;
      state.isLoading = false;
    },
    productFetchFailed(state, action) {
      state.isLoading = false;
      state.error = "Failed to load Products";
    },
  },
});

//export actions
export const productActions = productSlice.actions;
export default productSlice;

// Action Creator - Helper Functions
export const getProducts =
  (query = "", activePage = 1, price, category) =>
  async (dispatch) => {
    try {
      let url = `/api/v1/products?keyword=${query}&page=${activePage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      if (category) {
        url += `&category=${category}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch(productActions.productsFetchSuccess(data));
    } catch (error) {
      dispatch(productActions.productFetchFailed());
      console.log(error);
    }
  };

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    await dispatch(productActions.isLoading());
    const url = "/api/v1/product/" + productId;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch(productActions.productDetailsFetchSuccess(data));
  } catch (error) {
    dispatch(productActions.productFetchFailed());
    console.log(error);
  }
};
