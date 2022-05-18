import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';
import ExpressError from '../utils/ExpressError.js';

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.dataValues.id,
      isAdmin: user.dataValues.isAdmin
    },
    process.env.SESSION_SECRET,
    { expiresIn: 86400 }
  )
};

const validateToken = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    const currentUser = await User.findOne({
      where: { id: decoded.id }
    });
    if (currentUser) {
      req.user = currentUser;
      res.locals.user = currentUser;
    }
    return next();
  } catch (error) {
    return next();
  }
}

const ensureLoggedIn = async (req, res, next) => {
  try {
    if (!res.locals.user || !req.user) throw new ExpressError('Unauthorized', 401);
    return next();
  } catch (error) {
    return next(error);
  }
}

export { createToken, validateToken, ensureLoggedIn };