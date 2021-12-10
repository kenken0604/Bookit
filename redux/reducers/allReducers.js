import { combineReducers } from 'redux'
import { roomDetailsReducer, roomsListReducer } from './roomReducers'
import { userRegisterReducer } from './userReducers'

const allReducers = combineReducers({
  roomsList: roomsListReducer,
  roomDetails: roomDetailsReducer,
  userRegister: userRegisterReducer,
})

export default allReducers
