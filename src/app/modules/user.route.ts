import express from 'express';
import { userControllers } from './user.controller';

const routes = express.Router();

routes.post('/users', userControllers.createUser);

routes.get('/users', userControllers.retrieveAllUsers);

routes.get('/users/:userId', userControllers.getSingleUser);

routes.put('/users/:userId', userControllers.updateSingleUser);

routes.delete('/users/:userId', userControllers.deleteUser);

routes.put('/users/:userId/orders', userControllers.addOrder);

routes.get('/users/:userId/orders', userControllers.getAllOrders);

routes.get(
  '/users/:userId/orders/total-price',
  userControllers.calculateOrders,
);

export const userRoutes = routes;
