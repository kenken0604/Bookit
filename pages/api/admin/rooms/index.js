import nc from 'next-connect'
import connectDB from '../../../../config/db'

import onError from '../../../../middlewares/error'

import { roomList } from '../../../../controllers/roomControllers'
import {
  isAuthenticatedUser,
  authorizedRole,
} from '../../../../middlewares/auth'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.use(isAuthenticatedUser, authorizedRole('admin')).get(roomList)

export default handler
