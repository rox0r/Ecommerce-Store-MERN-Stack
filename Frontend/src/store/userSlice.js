import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRequesting: false,
  hasError: null,
  success: null,
  userMessage: null,
  user: null,
  token: null,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
    clearErrorAndMsg(state) {
      state.success = null;
      state.hasError = null;
      state.userMessage = null;
    },
    requesting(state) {
      state.isRequesting = true;
      state.hasError = null;
      state.success = null;
      state.userMessage = null;
    },
    requestFailed(state, action) {
      state.isRequesting = false;
      state.hasError = action.payload;
    },
    requestSuccess(state, action) {
      state.isRequesting = false;
      state.success = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    forgotRequestSuccess(state, action) {
      state.isRequesting = false;
      state.success = true;
      state.userMessage = action.payload.message;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;

//Action Creator - Helper Functions
// --------------------------------------------------

export const userRequest = (reqType, registerUser) => async (dispatch) => {
  try {
    dispatch(userActions.requesting());
    const response = await fetch(`/api/v1/${reqType}`, {
      method: "POST",
      body: JSON.stringify(registerUser),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch(userActions.requestSuccess(data));
    return true;
  } catch (error) {
    dispatch(userActions.requestFailed(error.message));
    return false;
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch(userActions.requesting());
    const response = await fetch("/api/v1/logout");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch(userActions.resetState());
  } catch (error) {
    dispatch(userActions.requestFailed(error.message));
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    dispatch(userActions.requesting());
    const response = await fetch("/api/v1/me");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch(userActions.requestSuccess(data));
  } catch (error) {
    dispatch(userActions.requestFailed(error.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(userActions.requesting());
    const response = await fetch(`/api/v1/password/forgot`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    await dispatch(userActions.forgotRequestSuccess(data));
  } catch (error) {
    dispatch(userActions.requestFailed(error.message));
  }
};

export const resetPassword = (passwordsObj, resetToken) => async (dispatch) => {
  try {
    dispatch(userActions.requesting());
    const response = await fetch(`/api/v1/password/reset/:${resetToken}`, {
      method: "POST",
      body: JSON.stringify(passwordsObj),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    await dispatch(userActions.requestSuccess(data));
  } catch (error) {
    dispatch(userActions.requestFailed(error.message));
  }
};
