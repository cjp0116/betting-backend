import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';
import ExpressError from '../ExpressError.js';

const createToken = (user) => {
  return jwt.sign(
    { id: user.id },
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
    else if (req.headers['x-access-token']) {
      token = req.headers['x-access-token']
    }
    if (!token) throw new ExpressError('Unauthorized', 401);
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    const currentUser = await User.findOne({
      where: { id: decoded.id }
    });
    if (currentUser) {
      req.user = currentUser;
      res.locals.user = currentUser;
      return next();
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