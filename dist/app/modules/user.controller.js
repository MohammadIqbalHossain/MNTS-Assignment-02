"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const user_services_1 = require("./user.services");
const user_zod_validation_1 = __importStar(require("./user.zod.validation"));
//Create a user.
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const validatedData = user_zod_validation_1.default.parse(userData);
        const result = yield user_services_1.userServices.createUserInDB(validatedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong!',
            err,
        });
    }
});
//Retrive all users.
const retrieveAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.retriveAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Uses fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found.',
            error: {
                code: 404,
                description: 'User not found.',
            },
        });
    }
});
//Get a single user.
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_services_1.userServices.getSigleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found!',
            error: {
                code: 404,
                description: 'User not Found!',
            },
        });
    }
});
//Update a user.
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedUserData = req.body;
        const validatedData = user_zod_validation_1.default.parse(updatedUserData);
        if (validatedData.password) {
            const hasePassword = yield bcrypt_1.default.hash(validatedData.password, Number(config_1.default.bcrypt_salt_rounds));
            validatedData.password = hasePassword;
        }
        const result = yield user_services_1.userServices.updateUserinDB(userId, validatedData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'User not found!',
            error: {
                code: 404,
                description: 'User not Found!',
            },
        });
    }
});
//Delete a user.
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield user_services_1.userServices.deleteUserFromDB(userId);
        res.status(200).json({
            sucess: true,
            message: 'User deleted successfully!',
            data: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found!',
            error: {
                code: 404,
                description: 'User not Found!',
            },
        });
    }
});
//Add order or create order array.
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const newOrder = req.body;
        const validatedOrdersData = user_zod_validation_1.orderValdationSchema.parse(newOrder);
        yield user_services_1.userServices.addOrderInDB(userId, validatedOrdersData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'User not found!',
            error: {
                code: 404,
                description: 'User not Found!',
            },
        });
    }
});
//Retrieve all orders.
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_services_1.userServices.getAllOrdersFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'User not found!',
            error: {
                code: 404,
                description: 'User not Found!',
            },
        });
    }
});
//Calculate total price.
const calculateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_services_1.userServices.calculateTotalOrdersPriceFromDB(userId);
        if (result.length === 0 || result === undefined) {
            res.status(500).json({
                success: false,
                message: 'Please order something.',
                error: {
                    code: 404,
                    description: 'Orders not Found!',
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Total price calculated successfully!',
                data: result,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'User not found!',
            error: {
                code: 404,
                description: 'User not Found!',
            },
        });
    }
});
exports.userControllers = {
    createUser,
    retrieveAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    addOrder,
    getAllOrders,
    calculateOrders,
};
