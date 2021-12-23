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
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DELETE_FAIL,
  ROOM_DELETE_RESET,
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_SUCCESS,
  ROOM_UPDATE_FAIL,
  ROOM_UPDATE_RESET,
  ROOM_DETAILS_RESET,
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
    case ROOM_DETAILS_RESET:
      return {
        ...state,
        room: {},
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

//update room
export const roomUpdateReducer = (state = { room: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case ROOM_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case ROOM_UPDATE_SUCCESS:
      return {
        loading: false,
        isUpdated: payload.success,
        room: payload.updatedRoom,
      }
    case ROOM_UPDATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ROOM_UPDATE_RESET:
      return {
        isUpdated: false,
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

//delete room
export const roomDeleteReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ROOM_DELETE_REQUEST:
      return {
        loading: true,
      }
    case ROOM_DELETE_SUCCESS:
      return {
        loading: false,
        isDeleted: payload,
      }
    case ROOM_DELETE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ROOM_DELETE_RESET:
      return {
        isDeleted: false,
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
