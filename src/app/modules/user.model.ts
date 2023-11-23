/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../config';
import { TUser } from './user.interface';

export const fullNameSchema = new Schema<TUser['fullName']>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    max: [20, 'First name cannot be longer thatn 20 charecters'],
  },
  lastName: {
    type: String,
    max: [15, 'Last name cannot be longer than 20 charectes'],
  },
});

export const AddressSchema = new Schema<TUser['address']>({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

export const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User ID is required.'],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    max: [25, 'User name cannot be longer than 25 charecters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    max: [20, 'Password cannot be longer than 20 charecters'],
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is requried.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: AddressSchema,
    required: [true, 'Address is requried'],
  },
});

//Make userData password hash before saving document.
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//Changing password to an empthy string after saving.
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//Creating a user model.
export const user = model<TUser>('User', userSchema);
