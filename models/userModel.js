import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name.'],
    maxLength: [50, 'Your name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    unique: true, //*
    validate: [validator.isEmail, 'Please enter valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password.'],
    minLength: [6, 'Your password must be longer than 6 characters'],
    select: false, //*搜尋時會排除此選項
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String, //*
  resetPasswordExpire: Date, //*
})

//密碼加密
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } else {
    next()
  }
})

//比對密碼
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//產生忘記密碼的token
userSchema.methods.getResetPasswordToken = function () {
  //產生token
  const resetToken = crypto.randomBytes(20).toString('hex')
  //加密方法
  this.resetPasswordToken = crypto
    .createHash('sha256') //演算方法
    .update(resetToken) //加密密碼，使用字串即可
    .digest('hex') //16進位
  //設定過期時間
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 //當下時間再過30分鐘

  return resetToken
}

export default mongoose.models.User || mongoose.model('User', userSchema)
