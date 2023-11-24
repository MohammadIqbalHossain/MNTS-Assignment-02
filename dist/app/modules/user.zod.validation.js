"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.orderValdationSchema = void 0;
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .min(1)
        .max(20)
        .refine((i) => i === i.charAt(0).toUpperCase() + i.slice(1).toLowerCase(), {
        message: 'Your first name must be capitalized',
    })
        .refine((data) => !!data, { message: 'First name is required' }),
    lastName: zod_1.z
        .string()
        .trim()
        .max(15, { message: 'Last name cannot be longer than 15 characters' }),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
exports.orderValdationSchema = zod_1.z.object({
    product: zod_1.z.string().trim(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z
        .number()
        .int()
        .positive()
        .refine((data) => !!data, { message: 'User ID is required' }),
    userName: zod_1.z
        .string()
        .trim()
        .min(1)
        .max(25)
        .refine((data) => !!data, { message: 'User name is required' }),
    password: zod_1.z
        .string()
        .trim()
        .min(1)
        .max(30)
        .refine((data) => !!data, { message: 'Password is required' }),
    fullName: fullNameValidationSchema.refine((data) => !!data, {
        message: 'Full name is required',
    }),
    age: zod_1.z
        .number()
        .int()
        .positive()
        .refine((data) => !!data, { message: 'Age is required' }),
    email: zod_1.z
        .string()
        .email('Invalid email address')
        .refine((data) => !!data, { message: 'Email is required' }),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressValidationSchema.refine((data) => !!data, {
        message: 'Address is required',
    }),
});
exports.default = exports.userValidationSchema;
