import express from 'express';
import { userControllers } from './user.controller';

const routes = express.Router();

routes.post('/users', userControllers.createUser);

routes.get('/users', userControllers.retrieveAllUsers);

routes.get('/users/:userId', userControllers.getSingleUser);

routes.put('/users/:userId', userControllers.updateSingleUser);

export const userRoutes = routes;
