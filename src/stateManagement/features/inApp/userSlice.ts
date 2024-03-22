import {createSlice} from '@reduxjs/toolkit';
import {stateType} from '../../types/stateType';

const initialState: stateType['root']['user'] = {
  userData: {
    __v: 0,
    _id: '',
    createdAt: '',
    email: '',
    firstname: '',
    isActive: false,
    isVerified: false,
    lastname: '',
    otp: '',
    otpExpiration: '',
    password: '',
    phonenumber: '',
    token: '',
    updatedAt: '',
    isWalletActive: false,
    wallet: {
      __v: 0,
      _id: '',
      accountname: '',
      balance: 0,
      bank: '',
      createdAt: '',
      pin: '',
      updatedAt: '',
      user: '',
    },
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      return state;
    },
    resetData: state => {
      state.userData = {
        ...initialState.userData,
        _id: 'LoggedOut',
      };

      return state;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {setUserData, resetData} = userSlice.actions;

export const selectUserData = (state: stateType) => state.root.user.userData;
