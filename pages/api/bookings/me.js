import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import { getMyBookings } from '../../../controllers/bookingControllers'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.use(isAuthenticatedUser).get(getMyBookings)

export default handler
