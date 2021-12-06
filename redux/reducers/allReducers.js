import { combineReducers } from 'redux'
import { roomsListReducer } from './roomReducers'

const allReducers = combineReducers({
  roomsList: roomsListReducer,
})

export default allReducers
