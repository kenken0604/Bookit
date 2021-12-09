import User from '../models/userModel'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'

// @func    register an account
// @route   post /api/auth/register
// @access  public
export const registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'PUBLIC_ID',
      url: 'URL',
    },
  })

  res.status(200).json({
    success: true,
    message: 'Account successfully registered.',
  })
})
