import {
  CLEAR_ERRORS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

//register an user
export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case USER_REGISTER_FAIL:
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

//get user profile
export const userProfileReducer = (state = { user: null }, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      }
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: payload,
      }
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
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
