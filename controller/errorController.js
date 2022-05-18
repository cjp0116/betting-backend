import ExpressError from "../utils/ExpressError.js";

const handleValidationErrorDB = err => {
  const errors = Object.values(err).map(el => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ExpressError(message, 400)
}

const handleConnectionRefusedError = () => new ExpressError("Unable to connect to db", 500);

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.name === 'ConnectionRefusedError') err = handleConnectionRefusedError();
  if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

export { errorHandler }