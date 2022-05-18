import User from '../db/models/User.js';
import { createToken } from '../middleware/authMiddleware.js';

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" })
    const user = await User.findOne({ where: { username } });
    if (!user || !user.correctPassword(password)) {
      return res.status(401).json({ error: "Wrong username and/or password" });
    }
    const token = createToken(user);
    return res.status(200).json({
      ...user.dataValues,
      token
    })
  } catch (error) {
    return next(error)
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, birthDay, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "Invalid inputs" });
    if (birthDay < Date.now() - 60 * 60 * 24 * 365 * 18)
      return res.status(401).json({ error: "must be 18 to register " });
    const user = await User.create(req.body);
    const token = createToken(user);
    return res.status(200).json({
      ...user.dataValues,
      token
    })
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(401).json({ error: "User already exists" });
    } else if (error.name === "SequelizeValidationError") {
      return res.status(401).json({ error: "Validation error" });
    } else next(error);
  }
}

export { register, login };