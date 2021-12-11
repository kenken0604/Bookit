import catchAsyncError from './catchAsyncError'
import ErrorHandler from '../utils/errorHandler'
import { getSession } from 'next-auth/client'

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const session = await getSession({ req }) //此時req.headers帶有token

  if (!session) {
    return next(new ErrorHandler('Please login first', 401))
  }
  req.user = session.user

  next()
})
