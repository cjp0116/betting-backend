import User from '../db/models/User.js';
import { createToken } from '../middleware/authMiddleware.js';
import ExpressError from '../ExpressError.js';

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return next(new ExpressError('Invalid input', 404))
    
    const user = await User.findOne({ where: { username } });
    if (!user || !user.correctPassword(password)) {
      return next(new ExpressError("Invalid credentials", 401))
    }

    const token = createToken(user);
    return res.status(200).json({
      ...user.dataValues,
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
      return res.status(401).json({ error: "must be 18 to register " });
    
    const user = await User.create(req.body);
    const token = createToken(user);
    
    return res.status(200).json({
      ...user.dataValues,
      token
    })
  } catch (error) {
    return next(error);
  }
}

export { register, login };