import { combineReducers } from 'redux'
import {
  adminBookinglistReducer,
  bookedDateReducer,
  bookingCheckReducer,
  bookingCreateReducer,
  bookingDeleteReducer,
  bookingDetailsReducer,
  bookingsGetReducer,
} from './bookingReducers'
import {
  adminRoomlistReducer,
  checkReviewAvailableReducer,
  reviewCreateReducer,
  roomCreateReducer,
  roomDeleteReducer,
  roomDetailsReducer,
  roomReviewDeleteReducer,
  roomReviewsReducer,
  roomsListReducer,
  roomUpdateReducer,
} from './roomReducers'
import {
  adminUserslistReducer,
  userDeleteReducer,
  userDetailsReducer,
  userPasswordReducer,
  userPasswordResetReducer,
  userProfileReducer,
  userRegisterReducer,
  userStatusUpdateReducer,
  userUpdateReducer,
} from './userReducers'

const allReducers = combineReducers({
  roomsList: roomsListReducer,
  roomDetails: roomDetailsReducer,
  roomCreate: roomCreateReducer,
  roomUpdate: roomUpdateReducer,
  roomDelete: roomDeleteReducer,
  roomReviews: roomReviewsReducer,
  roomReviewDelete: roomReviewDeleteReducer,
  reviewCreate: reviewCreateReducer,
  reviewAvailable: checkReviewAvailableReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  userPassword: userPasswordReducer,
  userPasswordReset: userPasswordResetReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userStatusUpdate: userStatusUpdateReducer,
  bookingCreate: bookingCreateReducer,
  bookingCheck: bookingCheckReducer,
  bookedDate: bookedDateReducer,
  bookingsGet: bookingsGetReducer,
  bookingDetails: bookingDetailsReducer,
  bookingDelete: bookingDeleteReducer,
  adminRoomlist: adminRoomlistReducer,
  adminBookinglist: adminBookinglistReducer,
  adminUserslist: adminUserslistReducer,
})

export default allReducers
