import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import { checkBookedDates } from '../../../controllers/bookingControllers'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.get(checkBookedDates)

export default handler
