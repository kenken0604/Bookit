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
  roomsListReducer,
  roomUpdateReducer,
} from './roomReducers'
import {
  adminUserslistReducer,
  userDeleteReducer,
  userPasswordReducer,
  userPasswordResetReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './userReducers'

const allReducers = combineReducers({
  roomsList: roomsListReducer,
  roomDetails: roomDetailsReducer,
  roomCreate: roomCreateReducer,
  roomUpdate: roomUpdateReducer,
  roomDelete: roomDeleteReducer,
  reviewCreate: reviewCreateReducer,
  reviewAvailable: checkReviewAvailableReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  userPassword: userPasswordReducer,
  userPasswordReset: userPasswordResetReducer,
  userDelete: userDeleteReducer,
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
