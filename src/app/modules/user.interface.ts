import { Model } from 'mongoose';

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
};

export type UserModel = {
  isUserExists(id: string): Promise<TUser | null>;
} & Model<TUser>;
