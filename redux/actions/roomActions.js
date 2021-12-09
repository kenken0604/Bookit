import axios from 'axios'
import absoluteURL from 'next-absolute-url'

import {
  ROOMS_LIST_SUCCESS,
  ROOMS_LIST_FAIL,
  CLEAR_ERRORS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
} from '../constants/roomConstants'

//list all rooms
export const listRooms = (
  req,
  keyword = '',
  pageNumber = 1,
  guest,
  category,
) => {
  return async (dispatch) => {
    try {
      const { origin } = absoluteURL(req)

      let link = `${origin}/api/rooms?location=${keyword}&pageNumber=${pageNumber}` //後端api要用postman設定好的，與前端路由無關

      if (guest) {
        link = link.concat(`&guestCapacity=${guest}`) //*
      }

      if (category) {
        link = link.concat(`&category=${category}`)
      }

      const { data } = await axios.get(link)

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

//get room details
export const getRoomDetails = (req, id) => {
  return async (dispatch) => {
    try {
      const { origin } = absoluteURL(req)
      const { data } = await axios.get(`${origin}/api/rooms/${id}`)

      dispatch({
        type: ROOM_DETAILS_SUCCESS,
        payload: data.room, //*
      })
    } catch (error) {
      dispatch({
        type: ROOM_DETAILS_FAIL,
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
