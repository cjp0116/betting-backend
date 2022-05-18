import User from '../db/models/User.js';
import ExpressError from '../ExpressError.js';

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll()
  } catch (error) {
    return next(error);
  }
}