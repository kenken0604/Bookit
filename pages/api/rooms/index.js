import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import { createRoom, getAllRooms } from '../../../controllers/roomControllers'
import { isAuthenticatedUser, authorizedRole } from '../../../middlewares/auth'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.get(getAllRooms)
handler.use(isAuthenticatedUser, authorizedRole('admin')).post(createRoom)

export default handler
