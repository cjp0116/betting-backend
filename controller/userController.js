import User from '../db/models/User.js';
import ExpressError from '../utils/ExpressError.js';
import redisClient from '../redisClient.js';
redisClient.connect();
const DEFAULT_EXPIRATION = 1800;

const getOrSetCache = async (key, cb) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) return reject(err);
      if (data) return resolve(JSON.parse(data));
      const freshData = await cb();
      redisClient.set(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
      resolve(freshData)
    })
  })
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getOrSetCache('users', User.findAll());
    return res.status(200).json({ users })
  } catch (error) {
    return next(error);
  }
}

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    return res.status(200).json({ user })
  } catch (error) {
    return next(error)
  }
}

export { getAllUsers, getUser };