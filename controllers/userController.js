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
  const user = await User.findById(req.user._id) //req.user.id是透過middleware的auth取得

  res.status(200).json({
    success: true,
    user,
  })
})

// @func    update user profile
// @route   put /api/me/update
// @access  private
export const updateUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id) //req.user.id是透過middleware的auth取得，因此必須讓authenticate通過

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    //更換密碼
    if (req.body.password) user.password = req.body.password

    //更換圖片***
    if (req.body.avatar !== req.user.avatar.url) {
      const image_id = req.user.avatar.public_id
      await cloudinary.v2.uploader.destroy(image_id) //刪除原照片

      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale',
      })

      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      }
    } else {
      user.avatar = user.avatar
    }
  }

  //整合好資料後儲存
  await user.save()

  res.status(200).json({
    success: true,
  })
})
