import {createSlice} from '@reduxjs/toolkit';
import {createSubscription} from '../../actions/inApp/paymentActions';
import {stateType} from '../../types/stateType';

const initialState: stateType['payment'] = {
  paymentIntentData: {
    clientSecret: '',
    subscriptionId: '',
  },
  paymentIntentStatus: 'idle',
  paymentIntentError: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createSubscription.pending, state => {
      state.paymentIntentStatus = 'loading';
      return state;
    });
    builder.addCase(createSubscription.fulfilled, (state, action) => {
      state.paymentIntentStatus = 'succeeded';
      state.paymentIntentData = action.payload;
      return state;
    });
    builder.addCase(createSubscription.rejected, (state, action) => {
      state.paymentIntentStatus = 'failed';
      state.paymentIntentError =
        action.error.message || 'Error creating subscription';
      return state;
    });
  },
});

export const paymentReducer = paymentSlice.reducer;
export const {} = paymentSlice.actions;

export const selectPaymentIntentData = (state: stateType) =>
  state.payment.paymentIntentData;
export const selectPaymentIntentStatus = (state: stateType) =>
  state.payment.paymentIntentStatus;
export const selectPaymentIntentError = (state: stateType) =>
  state.payment.paymentIntentError;
