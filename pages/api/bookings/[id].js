import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import {
  getBookingDetail,
  deleteBooking,
} from '../../../controllers/bookingControllers'
import { isAuthenticatedUser, authorizedRole } from '../../../middlewares/auth'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.use(isAuthenticatedUser).get(getBookingDetail)
handler.use(isAuthenticatedUser, authorizedRole('admin')).delete(deleteBooking)

export default handler
