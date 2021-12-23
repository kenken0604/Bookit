import axios from 'axios'
import absoluteURL from 'next-absolute-url'

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
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  ADMIN_USERLIST_FAIL,
  ADMIN_USERLIST_REQUEST,
  ADMIN_USERLIST_SUCCESS,
} from '../constants/userConstants'

//register an user
export const registerUser = (userInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(`/api/auth/register`, userInfo, config) //config要放在最後

      dispatch({ type: USER_REGISTER_SUCCESS })
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.message, //*
      })
    }
  }
}

//register an user
export const getUserProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_PROFILE_REQUEST })

      const { data } = await axios.get(`/api/me`) //是否需要config加密token

      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data.user, //*
      })
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response.data.message, //*
      })
    }
  }
}

//update an user
export const updateProfile = (updateInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put(`/api/me/update`, updateInfo, config) //是否需要config加密token

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

//forgot password request
export const requestPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(`/api/password/forgot`, email, config) //是否需要config加密token

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

//forgot password request
export const setNewPassword = (token, passwords) => {
  return async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put(
        `/api/password/reset/${token}`,
        passwords,
        config,
      ) //是否需要config加密token

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

//admin get user list
export const getAdminUserlist = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADMIN_USERLIST_REQUEST })

      const { data } = await axios.get(`/api/admin/users`)

      dispatch({
        type: ADMIN_USERLIST_SUCCESS,
        payload: data.users, //*
      })
    } catch (error) {
      dispatch({
        type: ADMIN_USERLIST_FAIL,
        payload: error.response.data.message, //*
      })
    }
  }
}

//delete user
export const adminDeleteUser = (userID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_DELETE_REQUEST })

      const { data } = await axios.delete(`/api/users/${userID}`)

      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: data.success, //*
      })
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload: error.response.data.message, //*
      })
    }
  }
}

//clear errors
export const clearErrors = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    })
  }
}
