import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import {
  createRoomReview,
  deleteRoomReviews,
  getRoomReviews,
} from '../../../controllers/roomControllers'

import { authorizedRole, isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDB()

handler.use(isAuthenticatedUser).put(createRoomReview)
handler.use(isAuthenticatedUser, authorizedRole('admin')).get(getRoomReviews)
handler
  .use(isAuthenticatedUser, authorizedRole('admin'))
  .delete(deleteRoomReviews)

export default handler
