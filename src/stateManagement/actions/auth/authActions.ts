import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {setUserData} from '../../features/inApp/userSlice';
import {apiURL} from '../constants';
import {RegisterResponseType} from '../../types/responseType';
import {setToken} from '../../features/auth/authSlice';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    userData: {email: string; username: string; password: string},
    {dispatch},
  ) => {
    try {
      const response = await axios.post<RegisterResponseType>(
        `${apiURL}auth/register`,
        userData,
      );
      dispatch(setToken(response.data.token));
      return response.data.response;
    } catch (err: any) {
      throw new Error({err}.err.response.data.message || 'Error signing up.');
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userInput: {email: string; password: string}, {dispatch}) => {
    try {
      const response = await axios.post(`${apiURL}auth/login`, userInput);
      dispatch(setUserData(response.data.response));
      return response.data.response;
    } catch (err: any) {
      throw new Error({err}.err.response?.data?.message || 'Error signing in.');
    }
  },
);
