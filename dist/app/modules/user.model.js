"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.userSchema = exports.ordersSchema = exports.AddressSchema = exports.fullNameSchema = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
exports.fullNameSchema = new mongoose_1.Schema({
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
exports.AddressSchema = new mongoose_1.Schema({
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
exports.ordersSchema = new mongoose_1.Schema({
    product: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
exports.userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'User ID is required.'],
        unique: true,
    },
    userName: {
        type: String,
        unique: true,
        required: [true, 'User name is required'],
        max: [25, 'User name cannot be longer than 25 charecters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        max: [20, 'Password cannot be longer than 20 charecters'],
    },
    fullName: {
        type: exports.fullNameSchema,
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
        type: exports.AddressSchema,
        required: [true, 'Address is requried'],
    },
    orders: {
        type: exports.ordersSchema,
    },
});
//Excluding password whenever MongoDB returns a response.
exports.userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
//Make userData password hash before saving document.
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
//Define a method to find user.
exports.userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.user.findOne({ userId });
        return existingUser;
    });
};
//Creating a user model.
exports.user = (0, mongoose_1.model)('User', exports.userSchema);
