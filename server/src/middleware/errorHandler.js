const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  let errors = null;
  let statusCode = err.statusCode || 500;

  // Log to console for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new Error(message);
    statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new Error(message);
    statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = 'Validation Error';
    errors = Object.values(err.errors).map(val => val.message);
    error = new Error(message);
    statusCode = 400;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again!';
    error = new Error(message);
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Your token has expired! Please log in again.';
    error = new Error(message);
    statusCode = 401;
  }

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Server Error',
    ...(errors && { errors }),
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;
