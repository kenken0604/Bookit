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
  ADMIN_BOOKINGLIST_REQUEST,
  ADMIN_BOOKINGLIST_SUCCESS,
  ADMIN_BOOKINGLIST_FAIL,
  ADMIN_BOOKINGLIST_RESET,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_DELETE_RESET,
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

//admin get booking list
export const adminBookinglistReducer = (state = { bookings: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ADMIN_BOOKINGLIST_REQUEST:
      return {
        loading: true,
      }
    case ADMIN_BOOKINGLIST_SUCCESS:
      return {
        loading: false,
        bookings: payload,
      }
    case ADMIN_BOOKINGLIST_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ADMIN_BOOKINGLIST_RESET:
      return {
        bookings: [],
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

//admin get booking list
export const bookingDeleteReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case BOOKING_DELETE_REQUEST:
      return {
        deleteLoading: true,
      }
    case BOOKING_DELETE_SUCCESS:
      return {
        deleteLoading: false,
        deleteSuccess: payload,
      }
    case BOOKING_DELETE_FAIL:
      return {
        deleteLoading: false,
        deleteError: payload,
      }
    case BOOKING_DELETE_RESET:
      return {
        deleteSuccess: false,
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
