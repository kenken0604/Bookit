import User from '../models/userModel'
import crypto from 'crypto'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'
import sendEmail from '../utils/sendEmail'

import cloudinary from 'cloudinary'
import absoluteUrl from 'next-absolute-url'

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

// @func    forgot password
// @route   post /api/password/forgot
// @access  public
export const forgotPassword = catchAsyncError(async (req, res) => {
  const user = await User.findOne({ email: req.body })

  if (!user) {
    res.status(404)
    throw new Error('User not found with this email.')
  }

  //得到重置token
  const resetToken = user.getResetPasswordToken()

  //將重設token儲存到user上
  await user.save({ validateBeforeSave: false }) //關閉審查功能

  //取得完整路徑
  const { origin } = absoluteUrl(req)
  const resetURL = `${origin}/password/reset/${resetToken}`

  //準備信件內容 \n代表換行
  const message = `Your password reset url is as follow: \n\n ${resetURL} \n\n\ If you have not requested this email, then ignore it.`

  try {
    //執行送信程式
    await sendEmail({
      email: user.email,
      subject: 'Bookit Password Reset Inform',
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}, please check.`,
    })
  } catch (error) {
    //*將重設token回歸
    user.resetPasswordToken = undefined //*
    user.resetPasswordExpire = undefined //*

    await user.save({ validateBeforeSave: false }) //儲存上面的指定

    res.status(500)
    throw new Error(error.message)
  }
})

// @func    reset password
// @route   post /api/password/reset/:token
// @access  public
export const resetPassword = catchAsyncError(async (req, res) => {
  //因為製造的來源一樣所以也會製成一樣的token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, //*如果此時間大於expire就無法搜尋
  })

  if (user) {
    if (req.body.password !== req.body.confirmPassword) {
      res.status(400)
      throw new Error('Password do not match.')
    }

    user.password = req.body.password

    //將reset回歸
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
      success: true,
      message: `Password updated successfully, redirect to Login Page.`,
    })
  } else {
    res.status(400)
    throw new Error('Password reset token is invalid or has been expired.')
  }
})

// @func    admin get all user
// @route   get /api/admin/users
// @access  private
export const usersList = catchAsyncError(async (req, res) => {
  const users = await User.find({})

  res.status(200).json({
    success: true,
    users,
  })
})

// @func    admin  delete user
// @route   delete /api/users/:id
// @access  private
export const deleteUser = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.query.id)

  if (user) {
    //刪除照片
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    await user.remove()

    res.status(200).json({
      success: true,
      message: 'User deleted',
    })
  } else {
    res.status(404)
    throw new Error('No User found.')
  }
})

// @func    get user details
// @route   get /api/users/:id
// @access  private
export const getUserDetails = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.query.id)

  if (user) {
    res.status(200).json({
      success: true,
      user,
    })
  } else {
    res.status(404)
    throw new Error('No User found.')
  }
})

// @func    update user status
// @route   put /api/users/:id
// @access  private
export const adminUpdateUser = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.query.id)

  if (user) {
    const userData = {
      role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.query.id, userData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })

    res.status(200).json({
      success: true,
      user,
    })
  } else {
    res.status(404)
    throw new Error('No User found.')
  }
})
