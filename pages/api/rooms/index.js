import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import { createRoom, getAllRooms } from '../../../controllers/roomControllers'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.get(getAllRooms)
handler.post(createRoom)

export default handler
