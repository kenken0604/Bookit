import {
  ROOMS_LIST_SUCCESS,
  ROOMS_LIST_FAIL,
  CLEAR_ERRORS,
} from '../constants/roomConstants'

//Get All Rooms
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
