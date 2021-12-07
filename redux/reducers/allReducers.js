import { combineReducers } from 'redux'
import { roomDetailsReducer, roomsListReducer } from './roomReducers'

const allReducers = combineReducers({
  roomsList: roomsListReducer,
  roomDetails: roomDetailsReducer,
})

export default allReducers
