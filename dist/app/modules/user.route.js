"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const routes = express_1.default.Router();
routes.post('/users', user_controller_1.userControllers.createUser);
routes.get('/users', user_controller_1.userControllers.retrieveAllUsers);
routes.get('/users/:userId', user_controller_1.userControllers.getSingleUser);
routes.put('/users/:userId', user_controller_1.userControllers.updateSingleUser);
routes.delete('/users/:userId', user_controller_1.userControllers.deleteUser);
routes.put('/users/:userId/orders', user_controller_1.userControllers.addOrder);
routes.get('/users/:userId/orders', user_controller_1.userControllers.getAllOrders);
// routes.get(
//   '/users/:userId/orders/total-price',
//   userControllers.calculateOrders,
// );
exports.userRoutes = routes;
