import { Model } from 'mongoose';

export type TOrder = {
  product: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  userName: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TOrder;
};

export type UserModel = {
  isUserExists(id: string): Promise<TUser | null>;
} & Model<TUser>;
