import axios from 'axios'
import absoluteURL from 'next-absolute-url'

import {
  BOOKING_CHECK_FAIL,
  BOOKING_CHECK_REQUEST,
  BOOKING_CHECK_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  CHECK_DATE_FAIL,
  CHECK_DATE_SUCCESS,
  SHOW_MY_BOOKING_FAIL,
  SHOW_MY_BOOKING_SUCCESS,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
} from '../constants/bookingConstants'

//create new booking
export const createNewBooking = (detail) => {
  return async (dispatch) => {
    try {
      dispatch({ type: BOOKING_CREATE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(`/api/bookings`, detail, config) //是否需要config加密token

      dispatch({
        type: BOOKING_CREATE_SUCCESS,
        payload: data, //*
      })
    } catch (error) {
      dispatch({
        type: BOOKING_CREATE_FAIL,
        payload: error.response.data.message, //*
      })
    }
  }
}

//check booking available
export const checkBooking = (roomID, checkInDate, checkOutDate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: BOOKING_CHECK_REQUEST })

      const { data } = await axios.get(
        `/api/bookings/check?roomID=${roomID}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
      )

      dispatch({
        type: BOOKING_CHECK_SUCCESS,
        payload: data.isAvailable, //*
      })
    } catch (error) {
      dispatch({
        type: BOOKING_CHECK_FAIL,
        payload: error.response.data.message, //*
      })
    }
  }
}

//check booking date
export const checkBookedDate = (roomID) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/bookings/check_booked_dates?roomID=${roomID}`,
      )

      dispatch({
        type: CHECK_DATE_SUCCESS,
        payload: data.bookingDates, //*
      })
    } catch (error) {
      dispatch({
        type: CHECK_DATE_FAIL,
        payload: error.response.data.message, //*
      })
    }
  }
}

// get personal bookings
export const getBookings = (authCookie, req, id) => {
  return async (dispatch) => {
    try {
      const { origin } = absoluteURL(req)
      const config = {
        headers: {
          cookie: authCookie,
        },
      }

      const { data } = await axios.get(`${origin}/api/bookings/me`, config)

      dispatch({
        type: SHOW_MY_BOOKING_SUCCESS,
        payload: data.mybookings, //*
      })
    } catch (error) {
      dispatch({
        type: SHOW_MY_BOOKING_FAIL,
        payload: error.response.data.message, //*
      })
    }
  }
}

// get booking details
export const bookingDetails = (authCookie, req, id) => {
  return async (dispatch) => {
    try {
      const { origin } = absoluteURL(req)
      const config = {
        headers: {
          cookie: authCookie,
        },
      }

      const { data } = await axios.get(`${origin}/api/bookings/${id}`, config)

      dispatch({
        type: BOOKING_DETAILS_SUCCESS,
        payload: data.booking, //*
      })
    } catch (error) {
      dispatch({
        type: BOOKING_DETAILS_FAIL,
        payload: error.response.data.message, //*
      })
    }
  }
}