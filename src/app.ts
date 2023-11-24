import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { userRoutes } from './app/modules/user.route';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express + TypeScript + Mongoose  Server');
});

export default app;
