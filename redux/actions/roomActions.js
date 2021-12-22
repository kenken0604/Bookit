import axios from 'axios'
import absoluteURL from 'next-absolute-url'

import {
  ROOMS_LIST_SUCCESS,
  ROOMS_LIST_FAIL,
  CLEAR_ERRORS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_AVAILABLE_REQUEST,
  REVIEW_AVAILABLE_SUCCESS,
  REVIEW_AVAILABLE_FAIL,
  ADMIN_ROOMLIST_REQUEST,
  ADMIN_ROOMLIST_SUCCESS,
  ADMIN_ROOMLIST_FAIL,
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DELETE_FAIL,
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

//create room review
export const createReview = (reviewData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REVIEW_CREATE_REQUEST })

      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put(`/api/reviews`, reviewData, config)

      dispatch({
        type: REVIEW_CREATE_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: REVIEW_CREATE_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

//check review availability
export const checkReviewAvailable = (roomID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REVIEW_AVAILABLE_REQUEST })

      const { data } = await axios.get(
        `/api/reviews/check_review_availability?roomID=${roomID}`,
      )

      dispatch({
        type: REVIEW_AVAILABLE_SUCCESS,
        payload: data.isReviewAvailable,
      })
    } catch (error) {
      dispatch({
        type: REVIEW_AVAILABLE_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

//admin roomlist
export const getAdminRoomlist = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADMIN_ROOMLIST_REQUEST })

      const { data } = await axios.get(`/api/admin/rooms`)

      dispatch({
        type: ADMIN_ROOMLIST_SUCCESS,
        payload: data.rooms,
      })
    } catch (error) {
      dispatch({
        type: ADMIN_ROOMLIST_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

//create new room
export const createNewRoom = (roomData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROOM_CREATE_REQUEST })

      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(`/api/rooms`, roomData, config)

      dispatch({
        type: ROOM_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ROOM_CREATE_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

//delete room
export const adminDeleteRoom = (roomID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROOM_DELETE_REQUEST })

      const { data } = await axios.delete(`/api/rooms/${roomID}`)

      dispatch({
        type: ROOM_DELETE_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: ROOM_DELETE_FAIL,
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
