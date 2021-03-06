import {
  CLEAR_ERRORS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  ADMIN_USERLIST_FAIL,
  ADMIN_USERLIST_REQUEST,
  ADMIN_USERLIST_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_RESET,
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
export const userProfileReducer = (
  state = { loading: true, user: null }, //*加入loading狀態讓頁面避免閃爍
  action,
) => {
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

//reset password
export const userPasswordResetReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: payload.success, //從後端傳送成功訊息
        message: payload.message,
      }
    case RESET_PASSWORD_FAIL:
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

//admin get user list
export const adminUserslistReducer = (state = { users: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ADMIN_USERLIST_REQUEST:
      return {
        loading: true,
      }
    case ADMIN_USERLIST_SUCCESS:
      return {
        loading: false,
        users: payload,
      }
    case ADMIN_USERLIST_FAIL:
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

//admin delete user
export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_DELETE_REQUEST:
      return {
        deleteLoading: true,
      }
    case USER_DELETE_SUCCESS:
      return {
        deleteLoading: false,
        deleteSuccess: payload,
      }
    case USER_DELETE_RESET:
      return {
        deleteSuccess: false,
      }
    case USER_DELETE_FAIL:
      return {
        deleteLoading: false,
        deleteError: payload,
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

//get user details
export const userDetailsReducer = (state = { user: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: payload.user,
      }
    case USER_DETAILS_RESET:
      return {
        user: {},
      }
    case USER_DETAILS_FAIL:
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

//update user status
export const userStatusUpdateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return {
        updateLoading: true,
      }
    case ADMIN_UPDATE_USER_SUCCESS:
      return {
        updateLoading: false,
        updateSuccess: payload,
      }
    case ADMIN_UPDATE_USER_RESET:
      return {
        updateSuccess: false,
      }
    case ADMIN_UPDATE_USER_FAIL:
      return {
        updateLoading: false,
        updateError: payload,
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
