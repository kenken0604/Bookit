import nc from 'next-connect'
import connectDB from '../../../config/db'

import onError from '../../../middlewares/error'

import { checkReviewAvailability } from '../../../controllers/roomControllers'

import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDB()

handler.use(isAuthenticatedUser).get(checkReviewAvailability)

export default handler
