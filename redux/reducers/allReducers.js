import { combineReducers } from 'redux'
import {
  bookedDateReducer,
  bookingCheckReducer,
  bookingCreateReducer,
  bookingsGetReducer,
} from './bookingReducers'
import { roomDetailsReducer, roomsListReducer } from './roomReducers'
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
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  userPassword: userPasswordReducer,
  userPasswordReset: userPasswordResetReducer,
  bookingCreate: bookingCreateReducer,
  bookingCheck: bookingCheckReducer,
  bookedDate: bookedDateReducer,
  bookingsGet: bookingsGetReducer,
})

export default allReducers
