import {
  CLEAR_ERRORS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
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
        // isAuthenticated: false,
      }
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        // isAuthenticated: true,
        user: payload,
      }
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        // isAuthenticated: false,
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

//update user profile
export const userUpdateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: payload, //從後端傳送成功訊息
      }
    case USER_UPDATE_FAIL:
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

//forgot password request
export const userPasswordReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        loading: true,
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: payload.success, //從後端傳送成功訊息
        message: payload.message,
      }
    case FORGOT_PASSWORD_FAIL:
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
