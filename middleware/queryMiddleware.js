import ExpressError from '../utils/ExpressError.js';

const validateSortBy = (req, res, next) => {
  const validSortKeys = ['username', 'id', 'createdAt'];
  try {
    if (!req.query.sortBy) {
      req.query.sortBy = 'id'
      return next()
    }
    if (!validSortKeys.includes(req.query.sortBy)) {
      throw new ExpressError('Invalid sort key', 400);
    }
    return next();
  } catch (error) {
    return next(error)
  }
}

const validateDirection = (req, res, next) => {
  const validDirection = ['asc', 'desc'];
  try {
    if (!req.query.direction) {
      req.query.direction = 'asc'
      return next()
    }
    if (!validDirection.includes(req.query.direction)) {
      throw new ExpressError('Invalid sort direction', 400);
    }
    return next();
  } catch (error) {
    return next(error)
  }
}

export { validateDirection, validateSortBy };