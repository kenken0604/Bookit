import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import { createRoomReview } from '../../../controllers/roomControllers'

import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDB()

handler.use(isAuthenticatedUser).put(createRoomReview)

export default handler
