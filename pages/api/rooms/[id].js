import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import {
  getRoomByID,
  updateRoom,
  deleteRoom,
} from '../../../controllers/roomControllers'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.get(getRoomByID)
handler.put(updateRoom)
handler.delete(deleteRoom)

export default handler
