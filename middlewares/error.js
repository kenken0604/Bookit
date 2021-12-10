import ErrorHandler from '../utils/errorHandler'

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  let error = { ...err }

  error.message = err.message

  // Wrong Mongoose Object ID Error
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`
    error = new ErrorHandler(message, 400)
  }

  // Handling mongoose Validation error
  if (err.name === 'ValidationError') {
    const message = err.message //*
    error = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: err.message,
    stack: error.stack,
  })
}
