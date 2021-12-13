import { combineReducers } from 'redux'
import { roomDetailsReducer, roomsListReducer } from './roomReducers'
import {
  userPasswordReducer,
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
})

export default allReducers
