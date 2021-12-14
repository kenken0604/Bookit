import axios from 'axios'
import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
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
