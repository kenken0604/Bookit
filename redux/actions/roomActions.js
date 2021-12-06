import axios from 'axios'
import absoluteURL from 'next-absolute-url'

import {
  ROOMS_LIST_SUCCESS,
  ROOMS_LIST_FAIL,
  CLEAR_ERRORS,
} from '../constants/roomConstants'

//list all rooms
export const listRooms = (req) => {
  return async (dispatch) => {
    try {
      const { origin } = absoluteURL(req)
      const { data } = await axios.get(`${origin}/api/rooms`)

      dispatch({
        type: ROOMS_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ROOMS_LIST_FAIL,
        payload: error, //*
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
