import { Request, Response } from 'express';
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
  } catch (err) {
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

export const userControllers = {
  createUser,
  retrieveAllUsers,
  getSingleUser,
};
