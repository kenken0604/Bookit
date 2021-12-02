import nc from 'next-connect'
import connectDB from '../../../config/db'

import { createRoom, getAllRooms } from '../../../controllers/roomControllers'

const handler = nc()

connectDB()

//路由
handler.get(getAllRooms)
handler.post(createRoom)

export default handler
