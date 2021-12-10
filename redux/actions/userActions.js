import axios from 'axios'
import absoluteURL from 'next-absolute-url'

import {
  CLEAR_ERRORS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
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
      console.log(error.response.data)
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
