import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import { registerUser } from '../../../controllers/userController'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.post(registerUser)

export default handler
