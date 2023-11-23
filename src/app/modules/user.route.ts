import express from 'express';
import { userControllers } from './user.controller';

const routes = express.Router();

routes.post('/users', userControllers.createUser);

routes.get('/users', userControllers.retrieveAllUsers);

routes.get('/users/:userId', userControllers.getSingleUser);

export const userRoutes = routes;
