import { combineReducers } from 'redux'
import { bookingCreateReducer } from './bookingReducers'
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
})

export default allReducers
