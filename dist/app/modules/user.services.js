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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
//Create a user.
const createUserInDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.user.create(userData);
    return result;
});
//Find all documents and field filter.
const retriveAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.user.aggregate([]).project({
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
//Retrive a specific user.
const getSigleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.user.isUserExists(userId)) {
        const result = yield user_model_1.user.findOne({ userId });
        return result;
    }
    throw new Error('user not found.');
});
//Update a user document.
const updateUserinDB = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.user.updateOne({ userId }, updatedUserData, {
        upsert: true,
        new: true,
    });
    return result;
});
//Delete a user document.
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.user.isUserExists(userId)) {
        const result = yield user_model_1.user.deleteOne({ userId });
        return result;
    }
});
//Add orders or append product to it.
const addOrderInDB = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.user.findOneAndUpdate({ userId: userId }, { $addToSet: { orders: order } }, { upsert: true, new: true });
    return result;
});
//Retrieve all orders.
const getAllOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.user.isUserExists(userId)) {
        const result = yield user_model_1.user.aggregate([]).project({
            orders: 1,
        });
        return result;
    }
    else {
        throw new Error('User not found.');
    }
});
// Calculate total price of orders.
// const calculateTotalOrdersPriceFromDB = async (userId: string) => {
//   const result = await user.aggregate([
//     {
//       $match: { userId: userId },
//     },
//     {
//       $unwind: '$orders',
//     },
//     {
//       $group: {
//         _id: '$userId',
//         totalPrice: {
//           $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         totalPrice: 1,
//       },
//     },
//   ]);
//   console.log({ result });
//   return result;
// };
exports.userServices = {
    createUserInDB,
    retriveAllUsersFromDB,
    getSigleUserFromDB,
    updateUserinDB,
    deleteUserFromDB,
    addOrderInDB,
    getAllOrdersFromDB,
};
