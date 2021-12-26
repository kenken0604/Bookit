import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import User from '../../../models/userModel'
import connectDB from '../../../config/db'

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        connectDB()

        const { email, password } = credentials

        // Check if email and password is entered
        if (!email || !password) {
          throw new Error('Please enter email or password')
        }

        // Find user in the database
        const user = await User.findOne({ email }).select('+password') //資料需要比對密碼(在userModel預設排除)

        if (!user) {
          throw new Error('Invalid Email or Password')
        }

        // Check if password is correct or not
        const isPasswordMatched = await user.comparePassword(password) //在userModel設置的方法

        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password')
        }

        return Promise.resolve(user) //通過檢查後就返回user
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user)
      return Promise.resolve(token) //返回token
    },
    session: async (session, user) => {
      session.user = user.user
      return Promise.resolve(session) //返回session
    },
  },
})
