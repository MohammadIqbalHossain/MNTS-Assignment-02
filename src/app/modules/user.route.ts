import express from 'express';
import { userControllers } from './user.controller';

const routes = express.Router();

routes.post('/users', userControllers.createUser);

routes.get('/users', userControllers.retrieveAllUsers);

export const userRoutes = routes;
