import axios from 'axios'
import absoluteURL from 'next-absolute-url'

import {
  CLEAR_ERRORS,
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
      console.log(error)
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: error.response.data.message,
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
