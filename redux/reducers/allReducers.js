import { combineReducers } from 'redux'
import {
  bookedDateReducer,
  bookingCheckReducer,
  bookingCreateReducer,
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
  bookingCreate: bookingCreateReducer,
  bookingCheck: bookingCheckReducer,
  bookedDate: bookedDateReducer,
  bookingsGet: bookingsGetReducer,
  bookingDetails: bookingDetailsReducer,
  adminRoomlist: adminRoomlistReducer,
})

export default allReducers
