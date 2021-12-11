import { combineReducers } from 'redux'
import { roomDetailsReducer, roomsListReducer } from './roomReducers'
import { userProfileReducer, userRegisterReducer } from './userReducers'

const allReducers = combineReducers({
  roomsList: roomsListReducer,
  roomDetails: roomDetailsReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
})

export default allReducers
