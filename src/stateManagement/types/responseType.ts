export interface RegisterResponseType {
  message: string;
  token: string;
  response: {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    customer: string;
    role: 'user' | 'admin';
    __v: 0;
    subscription: {
      active: boolean;
      subscriptionId: string;
    };
  };
}
