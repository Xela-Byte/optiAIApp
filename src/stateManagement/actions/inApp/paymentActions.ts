import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiURL} from '../constants';
import {RegisterResponseType} from '../../types/responseType';
import {setRegisterData} from '../../features/auth/authSlice';

export const createSubscription = createAsyncThunk(
  'auth/createSubscription',
  async (paymentIntentData: {customer: string; priceId: string}) => {
    try {
      const response = await axios.post<{
        message: string;
        response: {
          subscriptionId: string;
          clientSecret: string;
        };
      }>(`${apiURL}payment/create-subscription`, paymentIntentData);

      return response.data.response;
    } catch (err: any) {
      throw new Error(
        {err}.err.response.data.message || 'Error creating subscription.',
      );
    }
  },
);

export const updateSubscription = createAsyncThunk(
  'auth/updateSubscription',
  async (
    paymentIntentData: {email: string; subscriptionId: string},
    {dispatch},
  ) => {
    try {
      const response = await axios.patch<{
        message: 'Success';
        response: {
          user: RegisterResponseType['response'];
        };
      }>(`${apiURL}payment/update-subscription`, paymentIntentData);

      dispatch(setRegisterData(response.data.response.user));

      return response.data.response;
    } catch (err: any) {
      throw new Error(
        {err}.err.response.data.message || 'Error creating subscription.',
      );
    }
  },
);
