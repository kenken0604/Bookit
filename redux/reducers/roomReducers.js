import {
  ROOMS_LIST_SUCCESS,
  ROOMS_LIST_FAIL,
  CLEAR_ERRORS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
} from '../constants/roomConstants'

//get all rooms
export const roomsListReducer = (state = { rooms: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ROOMS_LIST_SUCCESS:
      return {
        roomCount: payload.roomCount,
        pageSize: payload.pageSize,
        filteredRooms: payload.filteredRooms,
        rooms: payload.rooms,
      }
    case ROOMS_LIST_FAIL:
      return {
        error: payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

//get room detail
export const roomDetailsReducer = (state = { room: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case ROOM_DETAILS_SUCCESS:
      return {
        room: payload,
      }
    case ROOM_DETAILS_FAIL:
      return {
        error: payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
