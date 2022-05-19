import User from '../db/models/User.js';
import { createToken } from '../middleware/authMiddleware.js';
import ExpressError from '../utils/ExpressError.js';

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return next(new ExpressError('Invalid input', 404))
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if (!user || !user.correctPassword(password)) {
      return next(new ExpressError("Invalid credentials", 401))
    }
    const token = createToken(user);
    const { dataValues } = user;
    delete dataValues.password;
    delete dataValues.salt;
    return res.status(200).json({
      ...dataValues,
      token
    })
  }
  catch (error) {
    return next(error)
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, birthDay, password } = req.body;
    if (!username || !email || !password)
      return next(new ExpressError('Invalid input', 404));

    if (birthDay > Date.now() - 60 * 24 * 365 * 18)
      return next(new ExpressError('Must be 18 or older', 404));

    const user = await User.create(req.body);
    const token = createToken(user);
    delete dataValues.password;
    delete dataValues.salt;
    return res.status(200).json({
      ...user.dataValues,
      token
    })
  } catch (error) {
    return next(error);
  }
}

export { register, login };