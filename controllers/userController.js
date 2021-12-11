import User from '../models/userModel'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'

import cloudinary from 'cloudinary'

//setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLUOD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// @func    register an account
// @route   post /api/auth/register
// @access  public
export const registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'bookit/avatars',
    width: '150',
    crop: 'scale',
  })

  const existedUser = await User.findOne({ email })
  if (existedUser) {
    res.status(400)
    throw new Error('This email has been taken.')
  }

  await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  })

  res.status(200).json({
    success: true,
    message: 'Account successfully registered.',
  })
})

// @func    get user profile
// @route   get /api/me
// @access  private
export const getUserProfile = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user._id)

  res.status(200).json({
    success: true,
    user,
  })
})
