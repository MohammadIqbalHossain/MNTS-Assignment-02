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
exports.userControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const user_services_1 = require("./user.services");
//Create a user.
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = yield user_services_1.userServices.createUserInDB(userData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
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
            message: 'Something went wrong!',
            err,
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
            message: 'Single User fetched successfully!',
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
//Update a user.
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedUserData = req.body;
        if (updatedUserData.password) {
            const hasePassword = yield bcrypt_1.default.hash(updatedUserData.password, Number(config_1.default.bcrypt_salt_rounds));
            updatedUserData.password = hasePassword;
        }
        const result = yield user_services_1.userServices.updateUserinDB(userId, updatedUserData);
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
        const result = yield user_services_1.userServices.deleteUserFromDB(userId);
        res.status(200).json({
            sucess: true,
            message: 'User deleted successfully!',
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
//Add order or create order array.
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const newOrder = req.body;
        const result = yield user_services_1.userServices.addOrderInDB(userId, newOrder);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
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
// const calculateOrders = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     console.log(userId);
//     const result = await userServices.calculateTotalOrdersPriceFromDB(userId);
//     console.log(result);
//     res.status(200).json({
//       success: true,
//       message: 'Total price calculated successfully!',
//       data: result,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'User not found!',
//       error: {
//         code: 404,
//         description: 'User not Found!',
//       },
//     });
//   }
// };
exports.userControllers = {
    createUser,
    retrieveAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    addOrder,
    getAllOrders,
};
