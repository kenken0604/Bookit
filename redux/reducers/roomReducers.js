import {
  ROOMS_LIST_SUCCESS,
  ROOMS_LIST_FAIL,
  CLEAR_ERRORS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_RESET,
  REVIEW_AVAILABLE_REQUEST,
  REVIEW_AVAILABLE_SUCCESS,
  REVIEW_AVAILABLE_FAIL,
  ADMIN_ROOMLIST_REQUEST,
  ADMIN_ROOMLIST_SUCCESS,
  ADMIN_ROOMLIST_FAIL,
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_CREATE_RESET,
} from '../constants/roomConstants'

//get all rooms
export const roomsListReducer = (state = { rooms: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ROOMS_LIST_SUCCESS:
      return {
        rooms: payload.rooms,
        pageNumber: payload.pageNumber,
        roomsCount: payload.roomsCount,
        pageSize: payload.pageSize,
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

//create room review
export const reviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case REVIEW_CREATE_REQUEST:
      return {
        loading: true,
      }
    case REVIEW_CREATE_SUCCESS:
      return {
        loading: false,
        success: payload,
      }
    case REVIEW_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case REVIEW_CREATE_RESET:
      return {
        success: false,
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

//check review availabilty
export const checkReviewAvailableReducer = (
  state = { isReviewAvailable: null },
  action,
) => {
  const { type, payload } = action
  switch (type) {
    case REVIEW_AVAILABLE_REQUEST:
      return {
        loading: true,
      }
    case REVIEW_AVAILABLE_SUCCESS:
      return {
        loading: false,
        isReviewAvailable: payload,
      }
    case REVIEW_AVAILABLE_FAIL:
      return {
        loading: false,
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

//admin roomlist
export const adminRoomlistReducer = (state = { rooms: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ADMIN_ROOMLIST_REQUEST:
      return {
        loading: true,
      }
    case ADMIN_ROOMLIST_SUCCESS:
      return {
        loading: false,
        rooms: payload,
      }
    case ADMIN_ROOMLIST_FAIL:
      return {
        loading: false,
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

//create new room
export const roomCreateReducer = (state = { room: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case ROOM_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ROOM_CREATE_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        room: payload.room,
      }
    case ROOM_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ROOM_CREATE_RESET:
      return {
        success: false,
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
