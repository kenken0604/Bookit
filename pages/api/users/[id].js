import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import {
  adminUpdateUser,
  deleteUser,
  getUserDetails,
} from '../../../controllers/userController'

import { authorizedRole, isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.use(isAuthenticatedUser, authorizedRole('admin')).delete(deleteUser)
handler.use(isAuthenticatedUser, authorizedRole('admin')).get(getUserDetails)
handler.use(isAuthenticatedUser, authorizedRole('admin')).put(adminUpdateUser)

export default handler
