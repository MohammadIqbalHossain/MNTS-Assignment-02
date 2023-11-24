import { TOrder, TUser } from './user.interface';
import { user } from './user.model';

//Create a user.
const createUserInDB = async (userData: TUser) => {
  const result = await user.create(userData);
  return result;
};

//Find all documents and field filter.
const retriveAllUsersFromDB = async () => {
  const result = await user.aggregate([]).project({
    userName: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

//Retrive a specific user.
const getSigleUserFromDB = async (userId: string) => {
  if (await user.isUserExists(userId)) {
    const result = await user.findOne({ userId });
    return result;
  }

  throw new Error('user not found.');
};

//Update a user document.
const updateUserinDB = async (userId: string, updatedUserData: TUser) => {
  if (await user.isUserExists(userId)) {
    const result = await user.findOneAndUpdate({ userId }, updatedUserData, {
      new: true,
      select: '-_id',
    });
    return result;
  } else {
    throw new Error('User not found.');
  }
};

//Delete a user document.
const deleteUserFromDB = async (userId: string) => {
  if (await user.isUserExists(userId)) {
    const result = await user.deleteOne({ userId });
    return result;
  } else {
    throw new Error('User not found.');
  }
};

//Add orders or append product to it.
const addOrderInDB = async (userId: string, order: TOrder) => {
  if (await user.isUserExists(userId)) {
    const result = await user.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { orders: order } },
      { upsert: true, new: true },
    );
    return result;
  } else {
    throw new Error('User not found!');
  }
};

//Retrieve all orders.
const getAllOrdersFromDB = async (userId: string) => {
  if (await user.isUserExists(userId)) {
    const intID = parseInt(userId);

    const result = await user.aggregate([
      { $match: { userId: intID } },
      { $project: { orders: 1, _id: 0 } },
    ]);
    return result;
  } else {
    throw new Error('User not found.');
  }
};

// Calculate total price of orders.
const calculateTotalOrdersPriceFromDB = async (userId: string) => {
  const intID = parseInt(userId);

  if (await user.isUserExists(userId)) {
    const result = user.aggregate([
      {
        $match: { userId: intID },
      },
      {
        $unwind: '$orders',
      },
      {
        $group: {
          _id: '$userId',
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      {
        $project: { totalPrice: 1, _id: 0 },
      },
    ]);
    return result;
  } else {
    throw new Error('User not found.');
  }
};

export const userServices = {
  createUserInDB,
  retriveAllUsersFromDB,
  getSigleUserFromDB,
  updateUserinDB,
  deleteUserFromDB,
  addOrderInDB,
  getAllOrdersFromDB,
  calculateTotalOrdersPriceFromDB,
};
