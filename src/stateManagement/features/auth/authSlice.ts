import {createSlice} from '@reduxjs/toolkit';
import {stateType} from '../../types/stateType';
import {loginUser, registerUser} from '../../actions/auth/authActions';
import {RegisterResponseType} from '../../types/responseType';

const initialState: stateType['root']['auth'] = {
  freshInstall: true,
  registerStatus: 'idle',
  registerError: '',
  loginCredentials: {
    email: '',
    password: '',
  },
  registerData: <RegisterResponseType['response']>{},
  loginError: '',
  loginStatus: 'idle',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFreshInstall: state => {
      state.freshInstall = false;
      return state;
    },
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
      return state;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      return state;
    },
    setLoginCredentials: (state, action) => {
      state.loginCredentials = action.payload;
      return state;
    },
    setRegisterStatus: (state, action) => {
      state.registerStatus = action.payload;
      return state;
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
      return state;
    },
    resetRegisterData: state => {
      state.registerData = {
        ...initialState.registerData,
        _id: 'LoggedOut',
      };

      return state;
    },
    resetAuthState: state => {
      state.loginStatus = initialState.loginStatus;
      state.registerStatus = initialState.registerStatus;

      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, state => {
      state.registerStatus = 'loading';
      return state;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registerStatus = 'succeeded';
      state.registerData = action.payload;
      return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerStatus = 'failed';
      state.registerError = action.error.message || 'Error signing up';
      return state;
    });

    builder.addCase(loginUser.pending, state => {
      state.loginStatus = 'loading';
      return state;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginStatus = 'succeeded';
      state.registerData = action.payload;
      return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginStatus = 'failed';
      state.loginError = action.error.message || 'Error signing in';
      return state;
    });
  },
});

export const authReducer = authSlice.reducer;
export const {
  setFreshInstall,
  setRegisterData,
  setRegisterStatus,
  setLoginCredentials,
  setLoginStatus,
  resetRegisterData,
  setToken,
  resetAuthState,
} = authSlice.actions;

export const selectFreshInstall = (state: stateType) =>
  state.root.auth.freshInstall;

export const selectRegisterData = (state: stateType) =>
  state.root.auth.registerData;

export const selectAuthToken = (state: stateType) => state.root.auth.token;

export const selectLoginCredentials = (state: stateType) =>
  state.root.auth.loginCredentials;
export const selectRegisterStatus = (state: stateType) =>
  state.root.auth.registerStatus;
export const selectRegisterError = (state: stateType) =>
  state.root.auth.registerError;

export const selectLoginStatus = (state: stateType) =>
  state.root.auth.loginStatus;
export const selectLoginError = (state: stateType) =>
  state.root.auth.loginError;
