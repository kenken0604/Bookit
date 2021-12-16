import {
  BOOKING_CHECK_FAIL,
  BOOKING_CHECK_REQUEST,
  BOOKING_CHECK_RESET,
  BOOKING_CHECK_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
  CHECK_DATE_FAIL,
  CHECK_DATE_SUCCESS,
  CLEAR_ERRORS,
  SHOW_MY_BOOKING_FAIL,
  SHOW_MY_BOOKING_SUCCESS,
} from '../constants/bookingConstants'

//create booking
export const bookingCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case BOOKING_CREATE_REQUEST:
      return {
        loading: true,
      }
    case BOOKING_CREATE_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        bookingDetail: payload.booking,
      }
    case BOOKING_CREATE_FAIL:
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

//check booking available
export const bookingCheckReducer = (state = { isAvailable: null }, action) => {
  const { type, payload } = action
  switch (type) {
    case BOOKING_CHECK_REQUEST:
      return {
        checkLoading: true,
      }
    case BOOKING_CHECK_SUCCESS:
      return {
        checkLoading: false,
        isAvailable: payload,
      }
    case BOOKING_CHECK_RESET: //狀態回歸
      return {
        checkLoading: false,
        isAvailable: null,
      }
    case BOOKING_CHECK_FAIL:
      return {
        checkLoading: false,
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

//check booking date
export const bookedDateReducer = (state = { dates: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case CHECK_DATE_SUCCESS:
      return {
        dates: payload,
      }
    case CHECK_DATE_FAIL:
      return {
        error: payload,
      }
    default:
      return state
  }
}

//get personal bookings
export const bookingsGetReducer = (state = { bookings: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case SHOW_MY_BOOKING_SUCCESS:
      return {
        loading: false,
        bookings: payload,
      }
    case SHOW_MY_BOOKING_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

//get booking details
export const bookingDetailsReducer = (state = { booking: null }, action) => {
  const { type, payload } = action
  switch (type) {
    case BOOKING_DETAILS_SUCCESS:
      return {
        loading: false,
        booking: payload,
      }
    case BOOKING_DETAILS_FAIL:
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
