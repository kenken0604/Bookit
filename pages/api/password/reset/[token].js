import nc from 'next-connect'
import connectDB from '../../../../config/db'

import onError from '../../../../middlewares/error'

import { resetPassword } from '../../../../controllers/userController'

const handler = nc({ onError }) //必須傳入物件

connectDB()

//路由
handler.put(resetPassword)

export default handler
