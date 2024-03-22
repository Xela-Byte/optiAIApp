import {RegisterResponseType} from './responseType';

export interface RequestStatusType {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface stateType {
  root: {
    auth: {
      freshInstall: boolean;
      registerStatus: RequestStatusType['status'];
      registerError: string;
      registerData: RegisterResponseType['response'];
      loginCredentials: {
        email: string;
        password: string;
      };
      loginStatus: RequestStatusType['status'];
      loginError: string;
      token: string;
    };
    user: {
      userData: RegisterResponseType;
    };
  };
  payment: {
    paymentIntentData: {
      subscriptionId: string;
      clientSecret: string;
    };
    paymentIntentStatus: RequestStatusType['status'];
    paymentIntentError: string;
  };
}
