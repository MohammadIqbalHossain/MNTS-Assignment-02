import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import config from '../config';
import { userServices } from './user.services';

//Create a user.
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userServices.createUserInDB(userData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      err,
    });
  }
};

//Retrive all users.
const retrieveAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.retriveAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Uses fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      err,
    });
  }
};

//Get a single user.
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSigleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Single User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not Found!',
      },
    });
  }
};

//Update a user.
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;

    if (updatedUserData.password) {
      const hasePassword = await bcrypt.hash(
        updatedUserData.password,
        Number(config.bcrypt_salt_rounds),
      );
      updatedUserData.password = hasePassword;
    }

    const result = await userServices.updateUserinDB(userId, updatedUserData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not Found!',
      },
    });
  }
};

//Delete a user.
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserFromDB(userId);

    res.status(200).json({
      sucess: true,
      message: 'User deleted successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not Found!',
      },
    });
  }
};

//Add order or create order array.
const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const newOrder = req.body;
    const result = await userServices.addOrderInDB(userId, newOrder);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not Found!',
      },
    });
  }
};

//Retrieve all orders.
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getAllOrdersFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not Found!',
      },
    });
  }
};

export const userControllers = {
  createUser,
  retrieveAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  addOrder,
  getAllOrders,
};
