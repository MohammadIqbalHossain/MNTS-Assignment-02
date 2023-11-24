import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((data) => !!data, { message: 'First name is required' }),
  lastName: z
    .string()
    .max(15, { message: 'Last name cannot be longer than 15 characters' }),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const userValidationSchema = z.object({
  userId: z
    .number()
    .int()
    .positive()
    .refine((data) => !!data, { message: 'User ID is required' }),
  userName: z
    .string()
    .min(1)
    .max(25)
    .refine((data) => !!data, { message: 'User name is required' }),
  password: z
    .string()
    .min(1)
    .max(30)
    .refine((data) => !!data, { message: 'Password is required' }),
  fullName: fullNameValidationSchema.refine((data) => !!data, {
    message: 'Full name is required',
  }),
  age: z
    .number()
    .int()
    .positive()
    .refine((data) => !!data, { message: 'Age is required' }),
  email: z
    .string()
    .email('Invalid email address')
    .refine((data) => !!data, { message: 'Email is required' }),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: addressValidationSchema.refine((data) => !!data, {
    message: 'Address is required',
  }),
});

export default userValidationSchema;
