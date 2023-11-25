import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import config from '../config';
import { userServices } from './user.services';
import userValidationSchema, {
  orderValdationSchema,
} from './user.zod.validation';

//Create a user.
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const validatedData = userValidationSchema.parse(userData);

    const result = await userServices.createUserInDB(validatedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
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
      message: 'User not found.',
      error: {
        code: 404,
        description: 'User not found.',
      },
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
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found!',
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

    const validatedData = userValidationSchema.parse(updatedUserData);

    if (validatedData.password) {
      const hasePassword = await bcrypt.hash(
        validatedData.password,
        Number(config.bcrypt_salt_rounds),
      );
      validatedData.password = hasePassword;
    }

    const result = await userServices.updateUserinDB(userId, validatedData);

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
    await userServices.deleteUserFromDB(userId);

    res.status(200).json({
      sucess: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found!',
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

    const validatedOrdersData = orderValdationSchema.parse(newOrder);

    await userServices.addOrderInDB(userId, validatedOrdersData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
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

//Calculate total price.
const calculateOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.calculateTotalOrdersPriceFromDB(userId);

    if (result.length === 0 || result === undefined) {
      res.status(500).json({
        success: false,
        message: 'Please order something.',
        error: {
          code: 404,
          description: 'Orders not Found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    }

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
  calculateOrders,
};
